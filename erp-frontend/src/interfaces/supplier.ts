// Define a reusable interface for the Supplier object
export interface Supplier {
  id: number;
  supplier_code: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email: string;
  gst_number?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  is_active: boolean; // Using boolean to match backend
  created_at: string;
  updated_at: string;
}

// Interface for the paginated API response
export interface PaginatedSuppliersResponse {
  data: Supplier[];
  total: number;
}