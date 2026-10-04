import { ALL_140_PRODUCTS, CATALOGUE_CATEGORIES, CatalogueProduct } from './catalogueData';

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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
        return data;
      }
      if (data && data.success && !Array.isArray(data.data) && data.data) {
        return data;
      }
    }
  } catch {
    // If backend is not running or timeout occurs, fallback gracefully to authoritative 140-product catalogue
  }

  // Graceful Fallback Handler for Categories and Products
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (cleanEndpoint.startsWith('/categories') || cleanEndpoint.startsWith('/api/categories')) {
    return {
      success: true,
      data: CATALOGUE_CATEGORIES.map((c) => ({
        _id: `cat-${c.id}`,
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: `/images/categories/${c.slug}.svg`,
        displayOrder: c.id,
        isActive: true,
      })) as unknown as T,
      total: CATALOGUE_CATEGORIES.length,
    };
  }

  if (cleanEndpoint.startsWith('/products') || cleanEndpoint.startsWith('/api/products')) {
    const urlObj = new URL(`http://dummy.com${cleanEndpoint}`);
    const q = (urlObj.searchParams.get('q') || '').toLowerCase().trim();
    const category = (urlObj.searchParams.get('category') || '').toLowerCase().trim();
    const minPrice = parseFloat(urlObj.searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(urlObj.searchParams.get('maxPrice') || '999999');
    const sort = urlObj.searchParams.get('sort') || 'default';
    const page = parseInt(urlObj.searchParams.get('page') || '1', 10);
    const limit = parseInt(urlObj.searchParams.get('limit') || '12', 10);
    const featured = urlObj.searchParams.get('featured') === 'true';

    let filtered = [...ALL_140_PRODUCTS];

    if (featured) {
      filtered = filtered.filter((p) => p.featured);
    }

    if (category) {
      filtered = filtered.filter(
        (p) =>
          p.categorySlug.toLowerCase() === category ||
          p.category.toLowerCase() === category
      );
    }

    if (q) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q) ||
          p.categorySlug.replace(/-/g, ' ').toLowerCase().includes(q) ||
          (p.company && p.company.toLowerCase().includes(q))
      );
    }

    if (minPrice > 0) {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }

    if (maxPrice < 999999) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    // Sorting
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Default: order by original catalogue item number (1 to 140)
      filtered.sort((a, b) => a.id - b.id);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    const formattedData = paginated.map((p) => ({
      _id: `prod-${p.id}`,
      id: p.id,
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: p.category,
      categorySlug: p.categorySlug,
      company: p.company,
      packQuantity: p.packQuantity,
      price: p.price,
      image: p.image || `/images/products/${p.categorySlug}.png`,
      images: [p.image || `/images/products/${p.categorySlug}.png`],
      isFeatured: !!p.featured,
      stockStatus: 'IN_STOCK',
      description: `Authentic ${p.name} (${p.packQuantity}) by Sri Sai Traders Sivakasi. Tested quality celebration fireworks for Diwali and all grand occasions.`,
    }));

    return {
      success: true,
      data: formattedData as unknown as T,
      total,
      page,
      totalPages,
      limit,
    };
  }

  // Handle single product by slug or id
  if (cleanEndpoint.startsWith('/products/') || cleanEndpoint.startsWith('/api/products/')) {
    const slug = cleanEndpoint.split('/').pop()?.split('?')[0];
    const found = ALL_140_PRODUCTS.find(
      (p) =>
        p.id.toString() === slug ||
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
    );
    if (found) {
      return {
        success: true,
        data: {
          _id: `prod-${found.id}`,
          id: found.id,
          name: found.name,
          slug: found.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          category: found.category,
          categorySlug: found.categorySlug,
          company: found.company,
          packQuantity: found.packQuantity,
          price: found.price,
          image: found.image || `/images/products/${found.categorySlug}.png`,
          images: [found.image || `/images/products/${found.categorySlug}.png`],
          isFeatured: !!found.featured,
          stockStatus: 'IN_STOCK',
          description: `Authentic ${found.name} (${found.packQuantity}) by Sri Sai Traders Sivakasi. Tested quality celebration fireworks for Diwali and all grand occasions.`,
        } as unknown as T,
      };
    }
  }

  return {
    success: false,
    message: 'Data not available',
  };
}

export function getImageUrl(imagePath?: string): string {
  if (!imagePath) return '/images/products/sparkles.svg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/images/')) return imagePath;
  if (imagePath.startsWith('/uploads/categories/')) {
    const filename = imagePath.split('/').pop();
    return `/images/categories/${filename}`;
  }
  return `${API_BASE}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}
