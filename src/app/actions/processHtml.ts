"use server";

import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

// Set up DOMPurify with jsdom for Node.js environment
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export async function processHtml(url: string) {
  try {
    // Fetch the HTML
    const response = await fetch(url);
    const htmlText = await response.text();

    // Parse the HTML
    const $ = cheerio.load(htmlText);

    // Remove script tags
    $("script").remove();

    // Retrieve specific style tags and the body content
    const unsafeTheme = $("#hashmark-theme").html() || "";
    const unsafeStyle = $("#hashmark-style").html() || "";
    const unsafeContent = $("#hashmark-body").html() || "";

    // Sanitize the HTML
    const theme = DOMPurify.sanitize(unsafeTheme);
    const style = DOMPurify.sanitize(unsafeStyle);
    const content = DOMPurify.sanitize(unsafeContent, {
      ADD_ATTR: ["target", "rel"],
    });

    return {
      theme,
      style,
      content,
    };
  } catch (error) {
    console.error("Error fetching and sanitizing HTML:", error);
    return null;
  }
}
