import fs from "fs/promises";
import path from "path";
import pica from "pica";

export async function getBlobFromImageUrl(imageSrc: string) {
  const blob = await fetch(imageSrc).then((r) => r.blob());

  return blob;
}

export const createHtmlString = ({
  body,
  styles,
}: {
  body: string;
  styles: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${styles}
        </style>
      </head>
      <body>
        ${body}
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
