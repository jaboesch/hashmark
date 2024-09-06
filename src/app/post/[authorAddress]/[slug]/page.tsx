import { processHtml } from "@/app/actions/processHtml";
import { getBlogPost } from "@/lib/irys";
import { getIsoDateFromUnixMs } from "@/utils/dateUtils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    authorAddress: string;
    slug: string;
  };
};

/**
 * Revalidate the page every 30 minutes.
 */
export const revalidate = 1800;

/**
 * Generate page metadata by looking up the given post.
 */
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const blogPost = await getBlogPost({
    authorAddress: params.authorAddress,
    slug: params.slug,
  });
  if (!blogPost) {
    return notFound();
  }
  const isoCreatedDate = getIsoDateFromUnixMs(blogPost.datePublishedInMs);

  return {
    /**
     * Application constants
     */
    applicationName: "Hashmark",

    /**
     * SEO Meta Tags
     */
    title: blogPost.title,
    description: blogPost.description,
    keywords: blogPost.keywords,
    authors: [{ name: blogPost.authorName }],
    creator: blogPost.authorName,
    robots: "index, follow",

    /**
     * Canonical Tag
     */
    alternates: {
      canonical: `${blogPost.canonicalUrlPrefix}/${blogPost.slug}`,
    },

    /**
     * OpenGraph Metadata for Social Sharing
     */
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      images: [blogPost.coverImageUrl],
      url: `${blogPost.canonicalUrlPrefix}${blogPost.slug}`,
      type: "article",
      authors: [blogPost.authorName],
      modifiedTime: isoCreatedDate,
      publishedTime: isoCreatedDate,
    },

    /**
     * Twitter Card Metadata
     */
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.description,
      images: [blogPost.coverImageUrl],
    },
  };
};

/**
 * Generate page content by looking up the given post.
 */
const Page = async ({ params }: Props) => {
  const blogPost = await getBlogPost({
    authorAddress: params.authorAddress,
    slug: params.slug,
  });
  if (!blogPost) {
    return notFound();
  }
  const processedResult = await processHtml(blogPost.resourceUrl);
  if (!processedResult) {
    return notFound();
  }
  const { theme, style, content } = processedResult;

  const isoCreatedDate = getIsoDateFromUnixMs(blogPost.datePublishedInMs);

  /**
   * @link https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogPost.title,
    description: blogPost.description,
    image: blogPost.coverImageUrl,
    author: {
      "@type": "Person",
      name: blogPost.authorName,
    },
    datePublished: isoCreatedDate,
    dateModified: isoCreatedDate,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style id="hashmark-theme" dangerouslySetInnerHTML={{ __html: theme }} />
      <style id="hashmark-style" dangerouslySetInnerHTML={{ __html: style }} />
      <div
        id="hashmark-body"
        className="w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default Page;
