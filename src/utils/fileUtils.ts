import pica from "pica";
import { getCurrentIsoDate } from "./dateUtils";
import { BlogPostMetadata } from "./applicationTypes";
import { DEFAULT_STYLES } from "@/lib/tiptap/constants";

export async function getBlobFromImageUrl(imageSrc: string) {
  const blob = await fetch(imageSrc).then((r) => r.blob());

  return blob;
}

export const createSeoMetadataString = ({
  title,
  description,
  keywords,
  canonicalUrlPrefix,
  slug,
  coverImageUrl,
  authorName,
}: BlogPostMetadata) => {
  const currentDate = getCurrentIsoDate();
  const canonicalUrl = `${canonicalUrlPrefix}${slug}`;
  return `
    <!-- SEO Meta Tags -->
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="${authorName}">
    <meta name="datePublished" content="${currentDate}">
    <meta name="robots" content="index, follow">
    
    <!-- Canonical Tag -->
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- OpenGraph Metadata for Social Sharing -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${coverImageUrl}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="article">
    
    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${coverImageUrl}">

    <!-- Schema.org Metadata (BlogPosting) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${title}",
        "description": "${description}",
        "image": "${coverImageUrl}",
        "author": {
            "@type": "Person",
            "name": "${authorName}"
        },
        "datePublished": "${currentDate}",
        "dateModified": "${currentDate}"
    }
    </script>
`;
};

const createHtmlString = ({
  body,
  styles,
  theme,
  seoMetadataString,
}: {
  body: string;
  styles: string;
  theme: string;
  seoMetadataString: string;
}) => {
  // handle the case where the body is already wrapped in a hashmark-container (likely from a template)
  const bodyContent = body.includes("hashmark-container")
    ? body
    : `<main class="hashmark-container">
          <div class="hashmark-content">
            ${body}
          </div>
        </main>`;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${seoMetadataString}
        <style id="hashmark-theme">
          ${theme}
        </style>
        <style id="hashmark-style">
          ${styles}
        </style>
      </head>
      <body id="hashmark-body">
        ${bodyContent}
      </body>
    </html>
  `;
};

export async function resizeImage(
  originalBlob: Blob,
  targetSizeKb = 100
): Promise<Blob> {
  const MAX_SIZE = targetSizeKb * 1024; // Convert KiB to bytes

  // Create an image to read the dimensions of the original blob
  const image = new Image();
  const originalUrl = URL.createObjectURL(originalBlob);
  image.src = originalUrl;
  await new Promise((resolve) => {
    image.onload = () => {
      URL.revokeObjectURL(originalUrl);
      resolve(null);
    };
  });

  // Calculate new size while maintaining aspect ratio
  const scaleFactor = Math.sqrt(MAX_SIZE / originalBlob.size);
  const newWidth = image.width * scaleFactor;
  const newHeight = image.height * scaleFactor;

  // Create a canvas and use pica to resize the image
  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;

  await pica().resize(image, canvas);

  // Convert the resized image on the canvas to a blob
  let resizedBlob = await pica().toBlob(canvas, "image/jpeg", 0.9); // Start with high quality

  // Adjust quality if necessary
  let quality = 0.9;
  while (resizedBlob.size > MAX_SIZE && quality > 0.1) {
    quality -= 0.05; // Decrease quality incrementally
    resizedBlob = await pica().toBlob(canvas, "image/jpeg", quality);
  }

  return resizedBlob;
}

export async function createHtmlFile(htmlString: string): Promise<string> {
  const blob = new Blob([htmlString], { type: "text/html" });

  const url = URL.createObjectURL(blob);

  return url;
}

export const prepareHtmlFile = async ({
  htmlContent,
  theme,
  metadata,
}: {
  htmlContent: string;
  theme: string;
  metadata: BlogPostMetadata;
}) => {
  const styledHtml = createHtmlString({
    body: htmlContent,
    styles: DEFAULT_STYLES,
    theme: theme,
    seoMetadataString: createSeoMetadataString(metadata),
  });
  const htmlFilepath = await createHtmlFile(styledHtml);
  return htmlFilepath;
};
