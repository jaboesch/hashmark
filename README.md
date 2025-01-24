# Hashmark

Hashmark is an open-source blogging platform designed with two unique constraints:  
- **Completely free to use**: No ads, paywalls, or upgrades.  
- **Modular and customizable**: Easily integrate into any website with full control over styling, themes, and presentation.  

Hashmark leverages decentralized storage on [Arweave](https://www.arweave.org) to make data hosting free for end-users. Developers can use Hashmark’s interactive HTML editor while managing blog presentation on their own domain.

## Technologies & Hosting

Hashmark is built with the following technologies:  
- **Frontend:** React, TypeScript, Next.js, TailwindCSS  
- **Editor:** ProseMirror and TipTap  
- **Storage:** Decentralized hosting on Arweave  
- **Hosting:** Vercel at [hashmark.xyz](https://hashmark.xyz)

## Post Editor

The Hashmark rich-text editor is inspired by Notion, offering an intuitive writing experience that is highly usable for technical and non-technical users alike. Key features include:
### Key Features:
- **Markdown Commands**: Format text quickly using commands like `**bold**` or `# heading`.
- **Slash Command Menu**: Add blocks, images, links, and more with the slash command menu.
- **Bubble Menu**: Contextual formatting options appear when text is highlighted.
- **Customizable Themes**: Adjust colors and styles using the built-in customization form.

The editor is built with TipTap (powered by ProseMirror) to deliver a rich editing experience. Output HTML files are fully optimized for SEO, with:
* Optimized metadata for social sharing and search engines  
* Semantically correct HTML tags  
* Image alt tags  
  
   
![Hashmark Editor](https://jboesch.com/assets/hashmark/editor.png)  
*The Hashmark editor interface.*

![Slash Commands](https://jboesch.com/assets/hashmark/slash-commands.png)  
*The slash command menu for block insertion.*

## Post Viewer

Hashmark makes it easy to load blog posts directly into your website.  
### Steps:
1. Query the Arweave storage network using the wallet address used to sign and upload the blog post.  
2. Fetch the raw HTML from Arweave.  
3. Sanitize the HTML and wrap it in a custom `<style>` tag to match your website’s theme.  

A complete implementation example using Next.js is available in this repository.  
Here’s a truncated example:

```jsx
const Page = async ({ params }) => {
  const blogPost = await getBlogPost({
    authorAddress: params.authorAddress,
    slug: params.slug,
  });

  const processedResult = await processHtml(blogPost.resourceUrl);
  const { theme, style, content } = processedResult;

  return (
    <>
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
```
*Sample page to fetch and render a blog post. See full implementation with Next.js and SEO optimizations in the codebase.*

```js
export async function processHtml(url: string) {
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
}
```
*Sample function to sanitize and extract components from blog post HTML. See full implementation in the codebase.*

![Slash Commands](https://jboesch.com/assets/hashmark/output.png)  
*Example output HTML page wrapped and styled within a custom Next.js site.*