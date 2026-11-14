/**
 * Search client wrapper for Lux.raw.
 * Abstracts Algolia (or fallback full-text search) with luxury product filters and faceting.
 *
 * Install: pnpm add algoliasearch
 */

import algoliasearch, { type SearchClient } from 'algoliasearch';

// ---------------------------------------------------------------------------
// Client initialization (singleton)
// ---------------------------------------------------------------------------

let searchClient: SearchClient | null = null;

export function getSearchClient(): SearchClient {
  if (searchClient) return searchClient;

  const appId = process.env.ALGOLIA_APP_ID;
  const apiKey =
    typeof window === 'undefined'
      ? process.env.ALGOLIA_ADMIN_API_KEY    // server: admin key
      : process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY; // client: search-only key

  if (!appId || !apiKey) {
    throw new Error('Algolia credentials are not configured. Set ALGOLIA_APP_ID and the appropriate API key.');
  }

  searchClient = algoliasearch(appId, apiKey);
  return searchClient;
}

// ---------------------------------------------------------------------------
// Index names
// ---------------------------------------------------------------------------

export const INDICES = {
  PRODUCTS: 'lux_products',
  PRODUCTS_PRICE_ASC: 'lux_products_price_asc',
  PRODUCTS_PRICE_DESC: 'lux_products_price_desc',
  COLLECTIONS: 'lux_collections',
  BRANDS: 'lux_brands',
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductSearchFilters {
  brand?: string | string[];
  category?: string | string[];
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  isExclusive?: boolean;
  inStock?: boolean;
}

export interface SearchOptions {
  query: string;
  filters?: ProductSearchFilters;
  page?: number;
  hitsPerPage?: number;
  sortBy?: keyof typeof INDICES;
}

export interface SearchFacets {
  brands: Record<string, number>;
  categories: Record<string, number>;
  priceRanges: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Product search
// ---------------------------------------------------------------------------

/**
 * Search luxury products with filters and faceting.
 */
export async function searchProducts(options: SearchOptions) {
  const { query, filters = {}, page = 0, hitsPerPage = 24, sortBy } = options;
  const client = getSearchClient();
  const indexName = sortBy ? INDICES[sortBy] : INDICES.PRODUCTS;
  const index = client.initIndex(indexName);

  const algoliaFilters = buildAlgoliaFilters(filters);

  const result = await index.search(query, {
    page,
    hitsPerPage,
    filters: algoliaFilters,
    facets: ['brand', 'categories', 'currency'],
    attributesToRetrieve: [
      'objectID',
      'name',
      'slug',
      'brand',
      'price',
      'currency',
      'imageUrl',
      'isExclusive',
      'inStock',
      'categories',
    ],
    attributesToHighlight: ['name', 'brand'],
    snippetEllipsisText: '…',
  });

  return result;
}

/**
 * Build Algolia filter string from structured filter object.
 */
function buildAlgoliaFilters(filters: ProductSearchFilters): string {
  const parts: string[] = [];

  if (filters.brand) {
    const brands = Array.isArray(filters.brand) ? filters.brand : [filters.brand];
    parts.push(`(${brands.map((b) => `brand:"${b}"`).join(' OR ')})`);
  }

  if (filters.category) {
    const cats = Array.isArray(filters.category) ? filters.category : [filters.category];
    parts.push(`(${cats.map((c) => `categories:"${c}"`).join(' OR ')})`);
  }

  if (filters.collection) {
    parts.push(`collection:"${filters.collection}"`);
  }

  if (filters.minPrice !== undefined) {
    parts.push(`price >= ${filters.minPrice}`);
  }

  if (filters.maxPrice !== undefined) {
    parts.push(`price <= ${filters.maxPrice}`);
  }

  if (filters.isExclusive === true) {
    parts.push('isExclusive:true');
  }

  if (filters.inStock === true) {
    parts.push('inStock:true');
  }

  return parts.join(' AND ');
}

/**
 * Fetch search suggestions / autocomplete results.
 */
export async function getSearchSuggestions(query: string, limit = 5): Promise<string[]> {
  if (!query || query.length < 2) return [];

  const client = getSearchClient();
  const index = client.initIndex(INDICES.PRODUCTS);
  const result = await index.search<{ name: string }>(query, {
    hitsPerPage: limit,
    attributesToRetrieve: ['name'],
    attributesToHighlight: [],
  });

  return result.hits.map((hit) => hit.name);
}
