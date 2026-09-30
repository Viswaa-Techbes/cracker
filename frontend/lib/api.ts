const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
  page?: number;
  totalPages?: number;
  limit?: number;
  count?: number;
  errors?: any[];
  token?: string;
  user?: any;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Attach admin token if stored in browser
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('cracker_admin_token');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.warn(`[API] Received non-JSON response from ${url} (status ${res.status}):`, text.slice(0, 100));
      return {
        success: false,
        message: `Server returned ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    return {
      success: false,
      message: error.message || 'Network request failed. Is the server running?',
    };
  }
}

export function getImageUrl(imagePath?: string): string {
  if (!imagePath) return '/uploads/categories/default.svg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}
