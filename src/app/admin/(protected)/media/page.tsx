"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MediaItem {
  id: string;
  publicId: string;
  url: string;
  folder: string;
  uploadedBy: string | null;
  createdAt: string;
}

const FOLDERS = [
  { value: "opadola/gallery", label: "Gallery page" },
  { value: "opadola/team", label: "Team page" },
  { value: "opadola/events", label: "Events page" },
  { value: "opadola/programs", label: "Programs page" },
  { value: "opadola/general", label: "Media library only" },
];

export default function AdminMedia() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState("opadola/gallery");
  const [filterFolder, setFilterFolder] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    try {
      const url = filterFolder ? `/api/media?folder=${encodeURIComponent(filterFolder)}` : "/api/media";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch {
      console.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }, [filterFolder]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);
    setError("");

    const total = files.length;
    let done = 0;

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", selectedFolder);

        const res = await fetch("/api/media", { method: "POST", body: formData });
        const data = await res.json();
        if (!data.success) setError(data.error || "Upload failed");
      } catch {
        setError("Upload failed for " + file.name);
      }
      done++;
      setUploadProgress(Math.round((done / total) * 100));
    }

    setUploading(false);
    setUploadProgress(0);
    fetchMedia();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  }

  async function handleDelete(id: string, publicId: string) {
    if (!confirm("Delete this media permanently?")) return;
    try {
      const res = await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, publicId }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        setSelected((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    } catch {
      console.error("Delete failed");
    }
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} items permanently?`)) return;

    for (const id of selected) {
      const item = items.find((i) => i.id === id);
      if (item) {
        await fetch("/api/media/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, publicId: item.publicId }),
        });
      }
    }
    setSelected(new Set());
    fetchMedia();
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((i) => i.id)));
    }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary-900)" }}>Media Library</h1>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {selected.size > 0 && (
            <button onClick={handleBulkDelete} style={{ padding: "0.5rem 1rem", background: "#dc3545", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", fontWeight: 500, cursor: "pointer" }}>
              Delete ({selected.size})
            </button>
          )}
          <button onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ padding: "0.5rem 1.25rem" }}>
            + Upload
          </button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf" style={{ display: "none" }} onChange={(e) => handleUpload(e.target.files)} />

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "var(--color-primary)" : "var(--border-light)"}`,
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          background: dragOver ? "var(--color-primary-50, rgba(10,92,54,0.05))" : "var(--bg-secondary)",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        {uploading ? (
          <div>
            <p style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Uploading... {uploadProgress}%</p>
            <div style={{ background: "var(--border-light)", borderRadius: "var(--radius-full)", height: "6px", overflow: "hidden" }}>
              <div style={{ background: "var(--color-primary)", height: "100%", width: `${uploadProgress}%`, transition: "width 0.3s" }} />
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "var(--text-lg)", fontWeight: 500, marginBottom: "0.5rem" }}>Drop files here or click to upload</p>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Images, videos, PDFs up to 10MB. Gallery, Team, Events, and Programs folders publish to their pages.</p>
          </div>
        )}
      </div>

      {error && (
        <div style={{ padding: "0.75rem 1rem", background: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", borderRadius: "var(--radius-md)", color: "#dc3545", fontSize: "var(--text-sm)", marginBottom: "1.5rem" }}>
          {error}
        </div>
      )}

      {/* Folder controls */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <label style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>Publish to:</label>
        <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} style={{ padding: "0.5rem 0.75rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
          {FOLDERS.map((folder) => <option key={folder.value} value={folder.value}>{folder.label}</option>)}
        </select>
        <span style={{ width: "1px", height: "20px", background: "var(--border-light)" }} />
        <label style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>Filter:</label>
        <select value={filterFolder} onChange={(e) => { setFilterFolder(e.target.value); setLoading(true); }} style={{ padding: "0.5rem 0.75rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
          <option value="">All folders</option>
          {FOLDERS.map((folder) => <option key={folder.value} value={folder.value}>{folder.label}</option>)}
        </select>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{items.length} items</span>
      </div>

      {/* Media grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>Loading media...</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-lg)" }}>No media files yet</p>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Upload images, videos, or documents to get started.</p>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <input type="checkbox" checked={selected.size === items.length && items.length > 0} onChange={toggleSelectAll} style={{ cursor: "pointer" }} />
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Select all</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {items.map((item) => (
              <div key={item.id} style={{ position: "relative", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: `2px solid ${selected.has(item.id) ? "var(--color-primary)" : "var(--border-light)"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
                <div onClick={() => setPreviewUrl(item.url)} style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer", background: "#f0f0f0" }}>
                  {item.url.match(/\.(mp4|webm|ogg)$/i) || item.url.includes("video") ? (
                    <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} preload="metadata" muted />
                  ) : (
                    <img src={item.url} alt={item.publicId} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                  )}
                </div>

                <div style={{ padding: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleSelect(item.id)} onClick={(e) => e.stopPropagation()} style={{ cursor: "pointer" }} />
                    <button onClick={() => handleDelete(item.id, item.publicId)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545", fontSize: "var(--text-xs)", padding: "2px 6px", borderRadius: "var(--radius-sm)" }} title="Delete">
                      &#128465;
                    </button>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "4px" }}>{item.publicId.split("/").pop()}</p>
                  <p style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{formatDate(item.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview modal */}
      {previewUrl && (
        <div onClick={() => setPreviewUrl(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <button onClick={() => setPreviewUrl(null)} style={{ position: "absolute", top: "-2rem", right: 0, background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>&#10005;</button>
            {previewUrl.match(/\.(mp4|webm|ogg)$/i) || previewUrl.includes("video") ? (
              <video src={previewUrl} controls style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: "var(--radius-md)" }} />
            ) : (
              <img src={previewUrl} style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: "var(--radius-md)" }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}