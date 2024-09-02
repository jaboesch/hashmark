export const DEFAULT_STYLES = `
  /* Paragraph */
  p {
    margin-bottom: 0.6em;
  }

  /* Links */
  a {
    text-decoration: underline;
    text-underline-offset: 2px;
    color: #777;
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
    border-left: 3px solid #bbb;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  /* Horizontal rule */
  hr {
    border: none;
    height: 1px;
    background-color: #ccc;
    margin: 2em 0;
  }
`

export const SAMPLE_CONTENT = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding-left: 5px;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }

        .content {
            padding-right: 20px;
        }

        .header {
            width: 100%;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }

        .header img {
            max-width: 100%;
            height: auto;
        }

        img {
            max-width: 100%;
            height: auto;
        }

        h1 {
            font-size: 24px;
            margin-top: 10px;
            color: #333333;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
        }

        a {
            color: #0066FF;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .section-title {
            display: inline-block;
            background-color: #0066FF;
            color: #ffffff;
            padding: 4px 8px;
            border-style: solid;
            border-radius: 4px;
            font-size: 12px;
            margin-top: 20px;
        }

        blockquote {
            font-family: "Monaco", monospace;
            font-size: 16px;
            color: #666666;
            padding: 10px 20px;
            border-left: 4px solid #0066FF;
            margin: 20px 0;
            background-color: #f9f9f9;
            border-radius: 4px;
        }

        ul {
            list-style-type: disc;
            padding-left: 20px;
            color: #666666;
        }

        .divider {
            height: 2px;
            background-color: #0066FF;
            margin: 20px 0;
            border-radius: 4px;
        }

        .footer {
            background-color: #f4f4f4;
            color: #999999;
            font-size: 14px;
            padding: 10px 20px;
            text-align: center;
            border-top: 1px solid #dddddd;
        }
    </style>
</head>

<body>

    <div class="container">

        <!-- Header Section -->
        <div class="header">
            <img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F95c69ba8-535a-4cc8-be7b-81a2e3fecafb_1402x319.png?utm_source=substack&utm_medium=email" alt="Ensemble: In The Process">
        </div>

        <!-- Content Section -->
        <div class="content">
            <!-- Section 1: Define an Artifact Type -->
            <div class="section">
                <span class="section-title">ARTIFACT TYPE</span>
                <h1>Storyboards: The Blueprint of Visual Storytelling</h1>
                <p>
                    Storyboards are a crucial element in the pre-production phase of filmmaking, serving as the visual blueprint for scenes, camera angles, and timing. Whether you're planning a short film, a commercial, or an animated sequence, storyboards help you visualize the entire narrative flow before the cameras start rolling.
                </p>
                <div class="divider"></div>
                <ul>
                    <li>Helps visualize complex sequences</li>
                    <li>Ensures consistency in scenes</li>
                    <li>Guides camera angles and timing</li>
                    <li>Facilitates communication among the production team</li>
                </ul>
            </div>

            <!-- Section 2: Historical Examples -->
            <div class="section">
                <span class="section-title">HISTORICAL EXAMPLES</span>
                <h1>Iconic Storyboards: From Planet of the Apes to Star Wars</h1>
                <p>
                    Some of the most famous storyboards in cinema history come from classics like <em>Planet of the Apes</em> (1968) and <em>Star Wars</em> (1977). These early visual representations provided directors with a clear guide to execute their vision, making complex sequences manageable and ensuring consistency in visual storytelling.
                </p>
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 20px;">
    <tr>
        <td>
            <img src="https://via.placeholder.com/290x200?text=Image+1" alt="Image 1" style="width: 100%; display: block;">
        </td>
<td><div style="width: 10px;"/></td>
        <td>
            <img src="https://via.placeholder.com/290x200?text=Image+2" alt="Image 2" style="width: 100%; display: block;">
        </td>
    </tr>
</table>
            </div>

            <!-- Section 3: Relevant Examples on Ensemble -->
            <div class="section">
                <span class="section-title">FEATURED ON ENSEMBLE</span>
                <h1>Modern Interpretations: Storyboards from Fini Sketches</h1>
                <p>
                    At Ensemble, we're proud to feature stunning storyboard collections from contemporary digital artists like Fini Sketches. These works blend traditional techniques with digital innovation, providing a fresh take on a classic art form.
                </p>
                <img src="https://via.placeholder.com/400x200?text=Fini+Sketches+1" alt="Fini Sketches Storyboard">
            </div>

            <!-- Section 4: Creativity Tip -->
            <div class="section">
                <span class="section-title">CREATIVITY TIP</span>
                <h1>How to Create Your Own Storyboards</h1>
                <p>
                    Ready to start your own storyboarding journey? Begin by sketching simple frames to outline your narrative. Focus on key moments, camera angles, and character actions. Don't worry about perfection—storyboards are meant to evolve. Tools like digital tablets or software like Storyboard That can help you refine your ideas.
                </p>
                <blockquote>
                    "The storyboard is the heart of the pre-production process. It’s where your story starts to come to life, even before the first scene is shot."
                </blockquote>
            </div>

<div style="text-align: center; margin: 20px 0;">
    <a href="https://yourwebsite.com" style="background-color: #0066FF; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px;">
        Visit Ensemble
    </a>
</div>
<div style="text-align: center; margin: 20px 0;">
    <a href="https://twitter.com/yourprofile" style="margin-right: 10px;">
        <img src="https://via.placeholder.com/32x32?text=Twitter" alt="Twitter" style="width: 32px; height: 32px;">
    </a>
    <a href="https://instagram.com/yourprofile" style="margin-right: 10px;">
        <img src="https://via.placeholder.com/32x32?text=Instagram" alt="Instagram" style="width: 32px; height: 32px;">
    </a>
    <a href="https://linkedin.com/in/yourprofile" style="margin-right: 10px;">
        <img src="https://via.placeholder.com/32x32?text=LinkedIn" alt="LinkedIn" style="width: 32px; height: 32px;">
    </a>
</div>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            You are receiving this email because you subscribed to our newsletter. If you no longer wish to receive these emails, you can <a href="#">unsubscribe here</a>.
        </div>

    </div>

</body>

</html>

`

export const SAMPLE_CONTENT_1 = `
        <h1>Welcome to Our Editor</h1>
  <p>This is a simple paragraph to test the text styling similar to <strong>Notion</strong>. Here's a link to <a href="https://www.example.com">Example Website</a>.</p>
  
  <h2>Subheading Level 2</h2>
  <p>Additional text under a subheading. This text includes <em>italic</em>, <strong>bold</strong>, and <u>underline</u> styles.</p>
  
  <h3>Subheading Level 3</h3>
  <p>Even more text under a smaller subheading. Here's some <s>strikethrough</s> text.</p>

  <p>Inline <code>code</code> snippet.</p>
  <pre><code>// This is a block of code
function helloWorld() {
  console.log("Hello, world!");
}</code></pre>

  <ul>
    <li>Bullet list item 1</li>
    <li>Bullet list item 2</li>
    <li>Bullet list item 3</li>
  </ul>

  <hr>

  <blockquote>This is a blockquote. It's a great way to highlight important information.</blockquote>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere urna nec tincidunt. Massa tempor nec feugiat nisl pretium fusce. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Commodo viverra maecenas accumsan lacus vel facilisis. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Penatibus et magnis dis parturient. Integer vitae justo eget magna fermentum iaculis eu. Sed cras ornare arcu dui vivamus. Justo donec enim diam vulputate ut. Urna neque viverra justo nec ultrices dui sapien eget. Donec ac odio tempor orci dapibus ultrices in iaculis. Integer malesuada nunc vel risus commodo viverra maecenas. Ultricies mi eget mauris pharetra et ultrices neque ornare. Iaculis eu non diam phasellus vestibulum lorem. Nec ullamcorper sit amet risus. A condimentum vitae sapien pellentesque habitant morbi. Cum sociis natoque penatibus et magnis dis.</p>

<p>Mi quis hendrerit dolor magna. Pharetra et ultrices neque ornare aenean euismod. Arcu bibendum at varius vel pharetra. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Sociis natoque penatibus et magnis dis parturient montes. Sit amet facilisis magna etiam tempor. Dignissim sodales ut eu sem integer vitae justo eget. Aliquam nulla facilisi cras fermentum. Dignissim suspendisse in est ante in nibh. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Nulla aliquet porttitor lacus luctus accumsan. Suspendisse potenti nullam ac tortor vitae purus. Tincidunt tortor aliquam nulla facilisi cras. Arcu dictum varius duis at consectetur lorem. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Id donec ultrices tincidunt arcu. Enim facilisis gravida neque convallis a. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Auctor eu augue ut lectus.</p>

<p>Et ultrices neque ornare aenean euismod elementum nisi. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit duis tristique sollicitudin nibh sit. Bibendum est ultricies integer quis auctor. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Ultricies leo integer malesuada nunc vel risus commodo viverra. Vestibulum mattis ullamcorper velit sed. Pharetra et ultrices neque ornare aenean euismod elementum nisi quis. Gravida cum sociis natoque penatibus et magnis dis parturient. Id venenatis a condimentum vitae sapien pellentesque habitant. Lectus sit amet est placerat in egestas erat imperdiet. Eu volutpat odio facilisis mauris sit amet massa. Sed arcu non odio euismod. Quis hendrerit dolor magna eget.</p>

<p>Commodo ullamcorper a lacus vestibulum sed arcu non odio. Libero volutpat sed cras ornare arcu dui vivamus. Amet volutpat consequat mauris nunc congue nisi vitae. Dui id ornare arcu odio ut. Blandit cursus risus at ultrices. Enim praesent elementum facilisis leo vel fringilla est. Donec massa sapien faucibus et molestie ac feugiat sed. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Pellentesque nec nam aliquam sem. At auctor urna nunc id cursus metus aliquam. Dolor magna eget est lorem. Leo in vitae turpis massa sed elementum. Ut venenatis tellus in metus vulputate eu. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Suscipit adipiscing bibendum est ultricies integer.</p>

<p>Auctor augue mauris augue neque gravida in. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Enim nec dui nunc mattis enim ut tellus elementum. Nulla facilisi cras fermentum odio. Libero volutpat sed cras ornare arcu dui. At imperdiet dui accumsan sit amet nulla facilisi morbi. Nunc sed id semper risus in hendrerit gravida rutrum quisque. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Purus in massa tempor nec feugiat nisl pretium. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Feugiat in fermentum posuere urna nec tincidunt praesent. Enim ut sem viverra aliquet eget sit amet tellus. Interdum posuere lorem ipsum dolor sit. Sed nisi lacus sed viverra tellus.</p>
      `;
