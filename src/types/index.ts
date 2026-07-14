export interface VolunteerData {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  skills?: string;
  interestArea?: string;
  availability?: string;
  motivation?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface DonationData {
  name?: string;
  email?: string;
  amount: number;
}

export interface MediaData {
  publicId: string;
  url: string;
  folder: string;
  uploadedBy?: string;
}

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type DonationStatus = 'pending' | 'success' | 'failed' | 'abandoned';
export type VolunteerStatus = 'pending' | 'approved' | 'active' | 'inactive';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
