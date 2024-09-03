export const DEFAULT_STYLES = `
  :root {
      --primary: #111; /* Set the primary color variable */
    }

   /* Body */
  .content {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    box-sizing: border-box;
    width: 100%;
    color: #333;
  }

  /* Paragraph */
  p {
    margin-bottom: 0.6em;
  }

  /* Links */
  .default-link {
    text-decoration: underline;
    text-underline-offset: 2px;
    color: #777;
    cursor: pointer;
  }

  .button-link {
    background-color: var(--primary);
    color: #ffffff;
    padding: 10px 20px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: fit-content;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
  }

  /* Heading 1 */
  h1 {
    font-size: 1.875em;
    font-weight: 600;
    margin-bottom: 0.6em;
  }

  /* Heading 2 */
  h2 {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  /* Heading 3 */
  h3 {
    font-size: 1.25em;
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  /* Code - Inline */
  code {
    background-color: #e2e2e2;
    padding: 2px 4px;
    font-family: monospace;
    border-radius: 3px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Code - Block */
  pre code {
    display: block;
    padding: 0.5em;
    overflow-x: auto;
    white-space: pre-wrap;
    background-color: #e2e2e2;
    border-left: 3px solid #bbb;
  }

  /* Bold text */
  strong,
  b {
    font-weight: bold;
  }

  /* Italic text */
  em,
  i {
    font-style: italic;
  }

  /* Underlined text */
  u {
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* Strikethrough text */
  s {
    text-decoration: line-through;
  }

  /* Bullet list */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  /* Blockquote */
  blockquote {
    font-family: "Monaco", monospace;
    font-size: 16px;
    color: #666666;
    background-color: #f9f9f9;
    border-left: 4px solid #bbb;
    margin: 20px 0;
    padding: 10px;

    * {
      margin: 0;
    }
  }

  /* Horizontal rule */
  hr {
    border: none;
    height: 1px;
    background-color: #ccc;
    margin: 2em 0;
  }

  img {
    max-width: 100%;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    table-layout: fixed;
    border-collapse: collapse;
  }

  td {
    border: 1px solid transparent;
    border-right: 10px solid white; /* Create a gap between columns */
    border-bottom: 10px solid white; /* Create a gap between rows */
  }

  tr:last-child td {
    border-bottom: 0;
  }

  td:last-child {
    border-right: 0;
  }

  .caption {
    display: inline-block;
    color: #777;
    font-weight: lighter;
    text-align: center;
    width: 100%;
  }

  .tag {
    display: block;
    color: #333;
    width: fit-content;
    border: 1px solid #333;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 15px;
    margin-top: 20px;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    .content {
      padding: 1rem;
    }
  
    p,
    h1,
    h2,
    h3 {
      margin-bottom: 0.5em;
    }

    h1 {
      font-size: 1.5em;
    }

    h2 {
      font-size: 1.3em;
    }

    h3 {
      font-size: 1.1em;
    }

    p {
      font-size: 0.9em;
    }

    blockquote {
      padding-left: 0.5rem;
    }
  }

`;

export const PLACEHOLDER_IMAGE_ROW = {
  type: "table",
  content: [
    {
      type: "tableRow",
      content: [
        {
          type: "tableCell",
          content: [
            {
              type: "image",
              attrs: {
                src: "https://i.imgur.com/Qa2Q3eY.png",
                alt: "Placeholder Image",
              },
            },
            {
              type: "customSpan",
              attrs: {
                class: "caption",
              },
              content: [
                {
                  type: "text",
                  text: "Caption #1",
                },
              ],
            },
          ],
        },
        {
          type: "tableCell",
          content: [
            {
              type: "image",
              attrs: {
                src: "https://i.imgur.com/Qa2Q3eY.png",
                alt: "Placeholder Image",
              },
            },
            {
              type: "customSpan",
              attrs: {
                class: "caption",
              },
              content: [
                {
                  type: "text",
                  text: "Caption #2",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const SAMPLE_CONTENT = `
  <body>
        <div class="content">
          <h1>Welcome to HashMark!</h1><h2>Overview</h2><p><a href="https://www.hashmark.xyz" target="_blank" rel="noopener noreferrer nofollow" class="default-link">HashMark</a> is a decentralized blogging tool designed to simplify the writing and publishing process. It is intentionally designed with<strong> no business model</strong>, completely free of advertisements, subscriptions, and paywalls. Posts on HashMark are stored on the decentralized service Arweave and signed by the author's Ethereum wallet for authenticity.&nbsp;</p><h2>Usage</h2><p>HashMark offers a fully functional rich text editor with support for a variety of components. The editor can be used in a variety of ways, such as:</p><ol><li><p><strong>The Control Bar </strong>is&nbsp;located on the top of the editor. Use the icons to style your text, add new components to the page, and utilize undo/redo functions.</p></li><li><p><strong>The Bubble Menu</strong>&nbsp;is shown when you highlight text. This provides quick way to style the selected text.</p></li><li><p><strong>The Slash Menu</strong>&nbsp;can be activated by typing a forward slash&nbsp;<code>/</code>&nbsp;on a new line. You can scroll through the options or type and use arrow keys to make a selection.</p></li><li><p><strong>Keyboard and Markdown Shortcuts</strong>&nbsp;such as <code>CMD+C</code>&nbsp;for copy and <code># Heading 1</code>&nbsp;can be used throughout the editor. This should feel familiar for users who have experience with other popular text editors.</p></li></ol><h2>Examples</h2><h3>Paragraph and Headings</h3><p>Have you noticed? Paragraph, H1, H2, and H3 components have already been used in this document!</p><h3>Lists</h3><p><strong>Bullet List:</strong></p><ul><li><p>First Bullet</p></li><li><p>Second Bullet</p></li><li><p>Third Bullet</p></li></ul><p><strong>Numbered List:</strong></p><ol><li><p>First Item</p></li><li><p>Second Item</p></li><li><p>Third Item</p></li></ol><h3>Code Block</h3><pre><code>// This is a block of code
function helloWorld() {
  console.log("Hello, world!");
}</code></pre><p></p><h3>Blockquote</h3><blockquote><p>This is a blockquote which may be used to include neat quotations from any number of sources.</p></blockquote><h3>Tags</h3><span class="tag">This is a tag!</span><p></p><h3>Image</h3><img src="https://i.imgur.com/Qa2Q3eY.png" alt="Image 1"><span class="caption">The URL of an image may be replaced via the link icon in the bubble menu.</span><p></p><h3>Image Row</h3><table style="min-width: 50px"><colgroup><col><col></colgroup><tbody><tr><td colspan="1" rowspan="1"><img src="https://i.imgur.com/Qa2Q3eY.png" alt="Placeholder Image"><span class="caption">Caption #1</span></td><td colspan="1" rowspan="1"><img src="https://i.imgur.com/Qa2Q3eY.png" alt="Placeholder Image"><span class="caption">Caption #2</span></td></tr></tbody></table><h3>Divider</h3><hr><h3>Text Styles</h3><ul><li><p>Text can be<strong> bold</strong></p></li><li><p>Or it can be<em> italic</em></p></li><li><p>Potentially it could be <u>underlined</u></p></li><li><p>Maybe even <s>crossed out</s></p></li><li><p>Technical users may appreciate <code>inline code</code></p></li><li><p>You can even link to your <a href="https://www.hashmark.xyz" target="_blank" rel="noopener noreferrer nofollow" class="default-link">favorite website</a></p></li><li><p>Text styles can be <strong><em><u>stacked</u></em></strong> to <a href="https://www.hashmark.xyz" target="_blank" rel="noopener noreferrer nofollow" class="default-link"><strong><em><s><u>ridiculous levels</u></s></em></strong></a></p></li></ul><span class="tag">Styles can also be <strong>applied</strong> within other <em>components!</em></span><hr><h1>Helpful Tips</h1><span class="tag">Uploading Images</span><p>HashMark is not currently supporting image uploads, so you will need to upload your images to another service and include the URL in HashMark.</p><p><a href="https://postimages.org/" target="_blank" rel="noopener noreferrer nofollow" class="default-link">PostImages</a> offers a free, stable image upload service. Follow the link, upload your image, and copy the<strong> Direct Link</strong>. Make sure to get the direct link or the image will not load properly - it should end in a file extension.</p><p>Example:&nbsp;&nbsp;<code>https://i.postimg.cc/yYTJycCF/placeholder.png</code>&nbsp;</p><p></p><p><a href="https://www.hashmark.xyz" target="_blank" rel="noopener noreferrer nofollow" class="button-link">Action Button</a></p><span class="caption">Thanks for using HashMark!</span>
        </div>
      </body>
      `;
