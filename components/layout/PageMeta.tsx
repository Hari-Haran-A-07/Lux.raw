import React from 'react';
import Head from 'next/head';

interface ProductStructuredData {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  brand: string;
  sku: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
}

interface PageMetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  product?: ProductStructuredData;
}

/**
 * PageMeta — SEO meta component with Open Graph, Twitter Card, and
 * JSON-LD structured data for luxury products.
 *
 * Place at the top level of each page component.
 */
export const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  product,
}) => {
  const siteName = 'Lux.raw';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        sku: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency,
          availability: `https://schema.org/${product.availability}`,
          seller: {
            '@type': 'Organization',
            name: siteName,
          },
        },
      }
    : null;

  return (
    <Head>
      {/* Primary meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content="@luxraw" />

      {/* Structured Data (JSON-LD) */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
    </Head>
  );
};

export default PageMeta;
