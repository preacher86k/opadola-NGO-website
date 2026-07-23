"use client"

import { useEffect, useRef } from "react"

function parseColor(c: string): [number, number, number] {
  if (!c) return [0.4, 0.4, 0.4]
  const m = c.match(/rgba?\(([^)]+)\)/i)
  if (m) {
    const p = m[1].split(",").map((v) => parseFloat(v))
    return [(p[0] || 0) / 255, (p[1] || 0) / 255, (p[2] || 0) / 255]
  }
  let h = c.replace("#", "").trim()
  if (h.length === 3)
    h = h
      .split("")
      .map((x) => x + x)
      .join("")
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  return [r || 0, g || 0, b || 0]
}

const BRAND_COLORS: [number, number, number][] = [
  [0.039, 0.361, 0.212],
  [0.161, 0.502, 0.725],
]

const SPLAT_FORCE = 4000
const PRESSURE_ITERATIONS = 20
const CURL_STRENGTH = 20
const SIM_RESOLUTION_DESKTOP = 128
const SIM_RESOLUTION_MOBILE = 64
const DYE_RESOLUTION_DESKTOP = 1024
const DYE_RESOLUTION_MOBILE = 512

const VS = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FS_ADVECT = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_texel;
uniform float u_dt;
uniform float u_dissipation;
uniform float u_outward;
out vec4 outColor;
void main() {
    vec2 coord = v_uv - u_dt * texture(u_velocity, v_uv).xy * u_texel;
    if (u_outward > 0.0) coord -= (v_uv - vec2(0.5)) * u_outward;
    outColor = u_dissipation * texture(u_source, coord);
}`

const FS_SPLAT = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_target;
uniform vec2 u_point;
uniform vec3 u_color;
uniform float u_radius;
uniform float u_aspect;
uniform float u_radial;
out vec4 outColor;
void main() {
    vec2 p = v_uv - u_point;
    p.x *= u_aspect;
    float falloff = exp(-dot(p, p) / u_radius);
    vec3 splat = falloff * u_color;
    float plen = length(p);
    vec2 rdir = plen > 0.0001 ? p / plen : vec2(0.0);
    float rmag = length(u_color.xy) * 1.5;
    splat.xy += u_radial * rdir * falloff * rmag;
    vec3 base = texture(u_target, v_uv).xyz;
    outColor = vec4(base + splat, 1.0);
}`

const FS_DIVERGENCE = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_velocity;
uniform vec2 u_texel;
out vec4 outColor;
void main() {
    float L = texture(u_velocity, v_uv - vec2(u_texel.x, 0.0)).x;
    float R = texture(u_velocity, v_uv + vec2(u_texel.x, 0.0)).x;
    float B = texture(u_velocity, v_uv - vec2(0.0, u_texel.y)).y;
    float T = texture(u_velocity, v_uv + vec2(0.0, u_texel.y)).y;
    vec2 C = texture(u_velocity, v_uv).xy;
    if (v_uv.x < u_texel.x) L = -C.x;
    if (v_uv.x > 1.0 - u_texel.x) R = -C.x;
    if (v_uv.y < u_texel.y) B = -C.y;
    if (v_uv.y > 1.0 - u_texel.y) T = -C.y;
    outColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`

const FS_CURL = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_velocity;
uniform vec2 u_texel;
out vec4 outColor;
void main() {
    float L = texture(u_velocity, v_uv - vec2(u_texel.x, 0.0)).y;
    float R = texture(u_velocity, v_uv + vec2(u_texel.x, 0.0)).y;
    float B = texture(u_velocity, v_uv - vec2(0.0, u_texel.y)).x;
    float T = texture(u_velocity, v_uv + vec2(0.0, u_texel.y)).x;
    outColor = vec4(R - L - T + B, 0.0, 0.0, 1.0);
}`

const FS_VORTICITY = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_curl;
uniform vec2 u_texel;
uniform float u_curlStrength;
uniform float u_dt;
out vec4 outColor;
void main() {
    float L = texture(u_curl, v_uv - vec2(u_texel.x, 0.0)).x;
    float R = texture(u_curl, v_uv + vec2(u_texel.x, 0.0)).x;
    float B = texture(u_curl, v_uv - vec2(0.0, u_texel.y)).x;
    float T = texture(u_curl, v_uv + vec2(0.0, u_texel.y)).x;
    float C = texture(u_curl, v_uv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(L) - abs(R));
    force /= length(force) + 0.0001;
    force *= u_curlStrength * C;
    force.y *= -1.0;
    vec2 vel = texture(u_velocity, v_uv).xy;
    vel += force * u_dt;
    vel = clamp(vel, -1000.0, 1000.0);
    outColor = vec4(vel, 0.0, 1.0);
}`

const FS_PRESSURE = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
uniform vec2 u_texel;
out vec4 outColor;
void main() {
    float L = texture(u_pressure, v_uv - vec2(u_texel.x, 0.0)).x;
    float R = texture(u_pressure, v_uv + vec2(u_texel.x, 0.0)).x;
    float B = texture(u_pressure, v_uv - vec2(0.0, u_texel.y)).x;
    float T = texture(u_pressure, v_uv + vec2(0.0, u_texel.y)).x;
    float d = texture(u_divergence, v_uv).x;
    outColor = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
}`

const FS_GRADIENT_SUB = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_pressure;
uniform sampler2D u_velocity;
uniform vec2 u_texel;
out vec4 outColor;
void main() {
    float L = texture(u_pressure, v_uv - vec2(u_texel.x, 0.0)).x;
    float R = texture(u_pressure, v_uv + vec2(u_texel.x, 0.0)).x;
    float B = texture(u_pressure, v_uv - vec2(0.0, u_texel.y)).x;
    float T = texture(u_pressure, v_uv + vec2(0.0, u_texel.y)).x;
    vec2 v = texture(u_velocity, v_uv).xy;
    v -= 0.5 * vec2(R - L, T - B);
    outColor = vec4(v, 0.0, 1.0);
}`

const FS_DISPLAY = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_tex;
out vec4 outColor;
void main() {
    vec3 c = texture(u_tex, v_uv).rgb;
    float a = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0);
    outColor = vec4(c, a);
}`

const FS_CLEAR = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_value;
out vec4 outColor;
void main() {
    outColor = u_value * texture(u_tex, v_uv);
}`

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

function buildProgram(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc)
  if (!vs || !fs) return null
  const p = gl.createProgram()
  if (!p) return null
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p))
    gl.deleteProgram(p)
    return null
  }
  return p
}

function createFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  filter: number
) {
  const tex = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)
  const fbo = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.viewport(0, 0, w, h)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  return {
    tex,
    fbo,
    w,
    h,
    texel: [1 / w, 1 / h] as [number, number],
    attach(unit: number) {
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      return unit
    },
  }
}

function createDoubleFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  filter: number
) {
  let read = createFBO(gl, w, h, internalFormat, format, type, filter)
  let write = createFBO(gl, w, h, internalFormat, format, type, filter)
  return {
    get read() { return read },
    get write() { return write },
    swap() { const t = read; read = write; write = t },
    w,
    h,
    texel: read.texel,
  }
}

function isMobile() {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function lissajousPoint(t: number, speed: number): { x: number; y: number } {
  return {
    x: 0.5 + 0.3 * Math.sin(t * speed * 0.7),
    y: 0.5 + 0.25 * Math.cos(t * speed * 0.5),
  }
}

export default function FluidSim({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null
    if (!gl) return

    gl.getExtension("EXT_color_buffer_float")
    gl.getExtension("OES_texture_float_linear")

    const quad = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const pAdvect = buildProgram(gl, VS, FS_ADVECT)!
    const pSplat = buildProgram(gl, VS, FS_SPLAT)!
    const pDiv = buildProgram(gl, VS, FS_DIVERGENCE)!
    const pCurl = buildProgram(gl, VS, FS_CURL)!
    const pVort = buildProgram(gl, VS, FS_VORTICITY)!
    const pPressure = buildProgram(gl, VS, FS_PRESSURE)!
    const pGradSub = buildProgram(gl, VS, FS_GRADIENT_SUB)!
    const pDisplay = buildProgram(gl, VS, FS_DISPLAY)!
    const pClear = buildProgram(gl, VS, FS_CLEAR)!

    const programs = [pAdvect, pSplat, pDiv, pCurl, pVort, pPressure, pGradSub, pDisplay, pClear]

    for (const p of programs) {
      gl.useProgram(p)
      const loc = gl.getAttribLocation(p, "a_pos")
      if (loc >= 0) {
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      }
    }

    const SIM_RES = isMobile() ? SIM_RESOLUTION_MOBILE : SIM_RESOLUTION_DESKTOP
    const DYE_RES = isMobile() ? DYE_RESOLUTION_MOBILE : DYE_RESOLUTION_DESKTOP

    let velocity: ReturnType<typeof createDoubleFBO>
    let dye: ReturnType<typeof createDoubleFBO>
    let pressure: ReturnType<typeof createDoubleFBO>
    let divergence: ReturnType<typeof createFBO>
    let curl: ReturnType<typeof createFBO>

    function getResolution(target: number) {
      const aspect = canvas!.clientWidth / Math.max(1, canvas!.clientHeight)
      const w = aspect >= 1 ? Math.round(target * aspect) : target
      const h = aspect >= 1 ? target : Math.round(target / aspect)
      return { w, h }
    }

    function initFBOs() {
      const sim = getResolution(SIM_RES)
      const dyeR = getResolution(DYE_RES)
      const ext = gl as WebGL2RenderingContext
      velocity = createDoubleFBO(ext, sim.w, sim.h, ext.RG16F, ext.RG, ext.HALF_FLOAT, ext.LINEAR)
      dye = createDoubleFBO(ext, dyeR.w, dyeR.h, ext.RGBA16F, ext.RGBA, ext.HALF_FLOAT, ext.LINEAR)
      pressure = createDoubleFBO(ext, sim.w, sim.h, ext.R16F, ext.RED, ext.HALF_FLOAT, ext.NEAREST)
      divergence = createFBO(ext, sim.w, sim.h, ext.R16F, ext.RED, ext.HALF_FLOAT, ext.NEAREST)
      curl = createFBO(ext, sim.w, sim.h, ext.R16F, ext.RED, ext.HALF_FLOAT, ext.NEAREST)
    }

    function blit(target: ReturnType<typeof createFBO> | null) {
      if (target) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo)
        gl!.viewport(0, 0, target.w, target.h)
      } else {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
        gl!.viewport(0, 0, canvas!.width, canvas!.height)
      }
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.floor(canvas!.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas!.clientHeight * dpr))
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w
        canvas!.height = h
        initFBOs()
      }
    }

    resize()
    initFBOs()

    const pointer = {
      x: 0.5, y: 0.5,
      prevX: 0.5, prevY: 0.5,
      dx: 0, dy: 0,
      color: BRAND_COLORS[0],
      moved: false,
      colorIdx: 0,
    }

    function updatePointer(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect()
      const nx = (clientX - rect.left) / rect.width
      const ny = 1 - (clientY - rect.top) / rect.height
      if (nx < -0.1 || nx > 1.1 || ny < -0.1 || ny > 1.1) return
      pointer.dx = nx - pointer.x
      pointer.dy = ny - pointer.y
      pointer.prevX = pointer.x
      pointer.prevY = pointer.y
      pointer.x = nx
      pointer.y = ny
      pointer.moved = Math.abs(pointer.dx) > 0 || Math.abs(pointer.dy) > 0
    }

    const onMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY)

    window.addEventListener("pointermove", onMove)

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    let lastTime = performance.now()
    let visible = true
    let autoDrift = true
    let autoDriftTimer: ReturnType<typeof setTimeout> | null = null
    let autoDriftT = 0
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches

    const intersectionObs = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    intersectionObs.observe(canvas)

    function correctRadius(r: number, aspect: number) {
      return aspect > 1 ? r * aspect : r
    }

    function splatAt(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
      const aspect = canvas!.width / canvas!.height
      const mr = isMobile() ? 16 : 12
      const radius = correctRadius((mr * 0.005) / 100, aspect)

      gl!.useProgram(pSplat)
      gl!.uniform1i(gl!.getUniformLocation(pSplat, "u_target")!, velocity.read.attach(0))
      gl!.uniform1f(gl!.getUniformLocation(pSplat, "u_aspect")!, aspect)
      gl!.uniform2f(gl!.getUniformLocation(pSplat, "u_point")!, x, y)
      gl!.uniform3f(gl!.getUniformLocation(pSplat, "u_color")!, dx, dy, 0)
      gl!.uniform1f(gl!.getUniformLocation(pSplat, "u_radius")!, radius)
      gl!.uniform1f(gl!.getUniformLocation(pSplat, "u_radial")!, 1.0)
      blit(velocity.write)
      velocity.swap()

      gl!.useProgram(pSplat)
      gl!.uniform1i(gl!.getUniformLocation(pSplat, "u_target")!, dye.read.attach(0))
      gl!.uniform1f(gl!.getUniformLocation(pSplat, "u_aspect")!, aspect)
      gl!.uniform2f(gl!.getUniformLocation(pSplat, "u_point")!, x, y)
      gl!.uniform3f(gl!.getUniformLocation(pSplat, "u_color")!, color[0], color[1], color[2])
      gl!.uniform1f(gl!.getUniformLocation(pSplat, "u_radius")!, radius)
      gl!.uniform1f(gl!.getUniformLocation(pSplat, "u_radial")!, 0.0)
      blit(dye.write)
      dye.swap()
    }

    function applyPointerInput() {
      if (pointer.moved) {
        const c = BRAND_COLORS[pointer.colorIdx % BRAND_COLORS.length]
        const col: [number, number, number] = [c[0] * 0.5, c[1] * 0.5, c[2] * 0.5]
        pointer.colorIdx++
        splatAt(pointer.x, pointer.y, pointer.dx * SPLAT_FORCE, pointer.dy * SPLAT_FORCE, col)
        pointer.moved = false
      }
    }

    function applyAutoDrift() {
      if (!autoDrift) return
      autoDriftT += 0.016
      const pos = lissajousPoint(autoDriftT, 1)
      const prevPos = lissajousPoint(autoDriftT - 0.016, 1)
      const dx = (pos.x - prevPos.x) * SPLAT_FORCE * 0.2
      const dy = (pos.y - prevPos.y) * SPLAT_FORCE * 0.2
      const c = BRAND_COLORS[Math.floor(autoDriftT) % BRAND_COLORS.length]
      const col: [number, number, number] = [c[0] * 0.25, c[1] * 0.25, c[2] * 0.25]
      splatAt(pos.x, pos.y, dx, dy, col)
    }

    function resetAutoDrift() {
      autoDrift = false
      if (autoDriftTimer) clearTimeout(autoDriftTimer)
      autoDriftTimer = setTimeout(() => { autoDrift = true }, 3000)
    }

    canvas.addEventListener("pointerdown", resetAutoDrift)
    canvas.addEventListener("pointerleave", resetAutoDrift)
    window.addEventListener("pointerdown", resetAutoDrift)
    window.addEventListener("pointermove", resetAutoDrift)

    function step(dt: number) {
      gl!.useProgram(pCurl)
      gl!.uniform2f(gl!.getUniformLocation(pCurl, "u_texel")!, velocity.texel[0], velocity.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pCurl, "u_velocity")!, velocity.read.attach(0))
      blit(curl)

      gl!.useProgram(pVort)
      gl!.uniform2f(gl!.getUniformLocation(pVort, "u_texel")!, velocity.texel[0], velocity.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pVort, "u_velocity")!, velocity.read.attach(0))
      gl!.uniform1i(gl!.getUniformLocation(pVort, "u_curl")!, curl.attach(1))
      gl!.uniform1f(gl!.getUniformLocation(pVort, "u_curlStrength")!, CURL_STRENGTH)
      gl!.uniform1f(gl!.getUniformLocation(pVort, "u_dt")!, dt)
      blit(velocity.write)
      velocity.swap()

      gl!.useProgram(pDiv)
      gl!.uniform2f(gl!.getUniformLocation(pDiv, "u_texel")!, velocity.texel[0], velocity.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pDiv, "u_velocity")!, velocity.read.attach(0))
      blit(divergence)

      gl!.useProgram(pClear)
      gl!.uniform1i(gl!.getUniformLocation(pClear, "u_tex")!, pressure.read.attach(0))
      gl!.uniform1f(gl!.getUniformLocation(pClear, "u_value")!, 0.8)
      blit(pressure.write)
      pressure.swap()

      gl!.useProgram(pPressure)
      gl!.uniform2f(gl!.getUniformLocation(pPressure, "u_texel")!, velocity.texel[0], velocity.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pPressure, "u_divergence")!, divergence.attach(0))
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl!.uniform1i(gl!.getUniformLocation(pPressure, "u_pressure")!, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      gl!.useProgram(pGradSub)
      gl!.uniform2f(gl!.getUniformLocation(pGradSub, "u_texel")!, velocity.texel[0], velocity.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pGradSub, "u_pressure")!, pressure.read.attach(0))
      gl!.uniform1i(gl!.getUniformLocation(pGradSub, "u_velocity")!, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      gl!.useProgram(pAdvect)
      gl!.uniform2f(gl!.getUniformLocation(pAdvect, "u_texel")!, velocity.texel[0], velocity.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pAdvect, "u_velocity")!, velocity.read.attach(0))
      gl!.uniform1i(gl!.getUniformLocation(pAdvect, "u_source")!, velocity.read.attach(0))
      gl!.uniform1f(gl!.getUniformLocation(pAdvect, "u_dt")!, dt)
      gl!.uniform1f(gl!.getUniformLocation(pAdvect, "u_dissipation")!, 1 - 0.2 * dt)
      gl!.uniform1f(gl!.getUniformLocation(pAdvect, "u_outward")!, 0)
      blit(velocity.write)
      velocity.swap()

      gl!.useProgram(pAdvect)
      gl!.uniform2f(gl!.getUniformLocation(pAdvect, "u_texel")!, dye.texel[0], dye.texel[1])
      gl!.uniform1i(gl!.getUniformLocation(pAdvect, "u_velocity")!, velocity.read.attach(0))
      gl!.uniform1i(gl!.getUniformLocation(pAdvect, "u_source")!, dye.read.attach(1))
      gl!.uniform1f(gl!.getUniformLocation(pAdvect, "u_dt")!, dt)
      const dur = isMobile() ? 3 : 4
      const dyeDiss = 3 / dur
      gl!.uniform1f(gl!.getUniformLocation(pAdvect, "u_dissipation")!, 1 - dyeDiss * dt)
      gl!.uniform1f(gl!.getUniformLocation(pAdvect, "u_outward")!, 0.3 * dt)
      blit(dye.write)
      dye.swap()
    }

    function render() {
      gl!.useProgram(pDisplay)
      gl!.uniform1i(gl!.getUniformLocation(pDisplay, "u_tex")!, dye.read.attach(0))
      blit(null)
    }

    let raf = 0
    const loop = (now: number) => {
      if (visible) {
        const dt = Math.min(0.0166, (now - lastTime) / 1000)
        lastTime = now
        if (isTouchDevice) {
          applyAutoDrift()
        }
        applyPointerInput()
        step(dt)
        render()
      } else {
        lastTime = now
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      intersectionObs.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", resetAutoDrift)
      window.removeEventListener("pointermove", resetAutoDrift)
      canvas.removeEventListener("pointerdown", resetAutoDrift)
      canvas.removeEventListener("pointerleave", resetAutoDrift)
      if (autoDriftTimer) clearTimeout(autoDriftTimer)
      for (const p of programs) gl.deleteProgram(p)
      gl.deleteBuffer(quad)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  )
}
