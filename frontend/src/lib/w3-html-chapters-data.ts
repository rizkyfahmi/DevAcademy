export interface ChapterSection {
  title: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
  codeSnippet?: {
    code: string;
    liveHtml?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  note?: string;
  tip?: string;
}

export interface W3ChapterData {
  title: string;
  subtitle: string;
  prevSlug: string;
  prevSubSlug?: string;
  nextSlug: string;
  nextSubSlug?: string;
  sections: ChapterSection[];
}

export interface ChapterItem {
  name: string;
  slug: string;
  hasCaret?: boolean;
  subItems?: { name: string; slug: string }[];
}

export interface SidebarSection {
  title: string;
  items: ChapterItem[];
}

export interface ChapterExercise {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface ChapterChallenge {
  instruction: string;
  beforeCode: string;
  placeholder: string;
  afterCode: string;
  correctAnswer: string | string[];
  hint: string;
  previewSnippet: (userInput: string) => string;
}

// Helper to generate the sub-items for any chapter that has a caret
const makeCaretSubItems = (name: string, slug: string) => [
  { name: name.replace(/^HTML\s+/i, ""), slug: slug },
  { name: "Exercise", slug: "exercises" },
];

export const HTML_SECTIONS: SidebarSection[] = [
  {
    title: "HTML TUTORIAL",
    items: [
      { name: "HTML HOME", slug: "home" },
      { 
        name: "HTML Introduction", 
        slug: "introduction", 
        hasCaret: true,
        subItems: makeCaretSubItems("Introduction", "introduction"),
      },
      { name: "HTML Editors", slug: "editors" },
      { name: "HTML Basic", slug: "basic", hasCaret: true, subItems: makeCaretSubItems("HTML Basic", "basic") },
      { name: "HTML Elements", slug: "elements", hasCaret: true, subItems: makeCaretSubItems("HTML Elements", "elements") },
      { name: "HTML Attributes", slug: "attributes", hasCaret: true, subItems: makeCaretSubItems("HTML Attributes", "attributes") },
      { name: "HTML Headings", slug: "headings", hasCaret: true, subItems: makeCaretSubItems("HTML Headings", "headings") },
      { name: "HTML Paragraphs", slug: "paragraphs", hasCaret: true, subItems: makeCaretSubItems("HTML Paragraphs", "paragraphs") },
      { name: "HTML Styles", slug: "styles", hasCaret: true, subItems: makeCaretSubItems("HTML Styles", "styles") },
      { name: "HTML Formatting", slug: "formatting", hasCaret: true, subItems: makeCaretSubItems("HTML Formatting", "formatting") },
      { name: "HTML Quotations", slug: "quotations", hasCaret: true, subItems: makeCaretSubItems("HTML Quotations", "quotations") },
      { name: "HTML Comments", slug: "comments", hasCaret: true, subItems: makeCaretSubItems("HTML Comments", "comments") },
      { name: "HTML Colors", slug: "colors", hasCaret: true, subItems: makeCaretSubItems("HTML Colors", "colors") },
      { name: "HTML CSS", slug: "css", hasCaret: true, subItems: makeCaretSubItems("HTML CSS", "css") },
      { name: "HTML Links", slug: "links", hasCaret: true, subItems: makeCaretSubItems("HTML Links", "links") },
      { name: "HTML Images", slug: "images", hasCaret: true, subItems: makeCaretSubItems("HTML Images", "images") },
      { name: "HTML Project", slug: "project" },
      { name: "HTML Favicon", slug: "favicon", hasCaret: true, subItems: makeCaretSubItems("HTML Favicon", "favicon") },
      { name: "HTML Page Title", slug: "page-title", hasCaret: true, subItems: makeCaretSubItems("HTML Page Title", "page-title") },
      { name: "HTML Tables", slug: "tables", hasCaret: true, subItems: makeCaretSubItems("HTML Tables", "tables") },
      { name: "HTML Lists", slug: "lists", hasCaret: true, subItems: makeCaretSubItems("HTML Lists", "lists") },
      { name: "HTML Block & Inline", slug: "block-inline", hasCaret: true, subItems: makeCaretSubItems("Block & Inline", "block-inline") },
      { name: "HTML Div", slug: "div", hasCaret: true, subItems: makeCaretSubItems("HTML Div", "div") },
      { name: "HTML Classes", slug: "classes", hasCaret: true, subItems: makeCaretSubItems("HTML Classes", "classes") },
      { name: "HTML Id", slug: "id", hasCaret: true, subItems: makeCaretSubItems("HTML Id", "id") },
      { name: "HTML Buttons", slug: "buttons", hasCaret: true, subItems: makeCaretSubItems("HTML Buttons", "buttons") },
      { name: "HTML Iframes", slug: "iframes", hasCaret: true, subItems: makeCaretSubItems("HTML Iframes", "iframes") },
      { name: "HTML JavaScript", slug: "javascript", hasCaret: true, subItems: makeCaretSubItems("HTML JavaScript", "javascript") },
      { name: "HTML File Paths", slug: "file-paths", hasCaret: true, subItems: makeCaretSubItems("File Paths", "file-paths") },
      { name: "HTML Head", slug: "head", hasCaret: true, subItems: makeCaretSubItems("HTML Head", "head") },
      { name: "HTML Layout", slug: "layout", hasCaret: true, subItems: makeCaretSubItems("HTML Layout", "layout") },
      { name: "HTML Responsive", slug: "responsive", hasCaret: true, subItems: makeCaretSubItems("Responsive", "responsive") },
      { name: "HTML Computercode", slug: "computercode", hasCaret: true, subItems: makeCaretSubItems("Computercode", "computercode") },
      { name: "HTML Semantics", slug: "semantics", hasCaret: true, subItems: makeCaretSubItems("Semantics", "semantics") },
      { name: "HTML Style Guide", slug: "style-guide" },
      { name: "HTML Entities", slug: "entities", hasCaret: true, subItems: makeCaretSubItems("Entities", "entities") },
      { name: "HTML Symbols", slug: "symbols" },
      { name: "HTML Emojis", slug: "emojis" },
      { name: "HTML Charsets", slug: "charsets" },
      { name: "HTML URL Encode", slug: "url-encode" },
      { name: "HTML vs. XHTML", slug: "html-vs-xhtml" },
    ],
  },
  {
    title: "HTML FORMS",
    items: [
      { name: "HTML Forms", slug: "forms", hasCaret: true, subItems: makeCaretSubItems("HTML Forms", "forms") },
      { name: "HTML Form Attributes", slug: "form-attributes", hasCaret: true, subItems: makeCaretSubItems("Form Attributes", "form-attributes") },
      { name: "HTML Form Elements", slug: "form-elements", hasCaret: true, subItems: makeCaretSubItems("Form Elements", "form-elements") },
      { name: "HTML Input Types", slug: "input-types", hasCaret: true, subItems: makeCaretSubItems("Input Types", "input-types") },
      { name: "HTML Input Attributes", slug: "input-attributes", hasCaret: true, subItems: makeCaretSubItems("Input Attributes", "input-attributes") },
      { name: "Input Form Attributes", slug: "input-form-attributes", hasCaret: true, subItems: makeCaretSubItems("Input Form Attributes", "input-form-attributes") },
    ],
  },
  {
    title: "HTML GRAPHICS",
    items: [
      { name: "HTML Canvas", slug: "canvas", hasCaret: true, subItems: makeCaretSubItems("HTML Canvas", "canvas") },
      { name: "HTML SVG", slug: "svg", hasCaret: true, subItems: makeCaretSubItems("HTML SVG", "svg") },
    ],
  },
  {
    title: "HTML MEDIA",
    items: [
      { name: "HTML Media", slug: "media" },
      { name: "HTML Video", slug: "video", hasCaret: true, subItems: makeCaretSubItems("HTML Video", "video") },
      { name: "HTML Audio", slug: "audio", hasCaret: true, subItems: makeCaretSubItems("HTML Audio", "audio") },
      { name: "HTML Plug-ins", slug: "plug-ins" },
      { name: "HTML YouTube", slug: "youtube" },
    ],
  },
  {
    title: "WEB APIS",
    items: [
      { name: "Web APIs", slug: "web-apis" },
      { name: "Geolocation API", slug: "geolocation-api" },
      { name: "Drag and Drop API", slug: "drag-drop-api" },
      { name: "Popover API", slug: "popover-api" },
      { name: "Web Storage API", slug: "web-storage-api" },
      { name: "Web Workers API", slug: "web-workers-api" },
      { name: "Server-Sent Events API", slug: "sse-api" },
    ],
  },
  {
    title: "HTML EXAMPLES",
    items: [
      { name: "HTML Examples", slug: "examples" },
      { name: "HTML Editor", slug: "editor-example" },
      { name: "HTML Quiz", slug: "quiz" },
      { name: "HTML Exercises", slug: "exercises" },
      { name: "HTML Challenges", slug: "challenges" },
      { name: "HTML Website", slug: "website" },
      { name: "HTML Syllabus", slug: "syllabus" },
      { name: "HTML Study Plan", slug: "study-plan" },
      { name: "HTML Interview Prep", slug: "interview-prep" },
      { name: "HTML Summary", slug: "summary" },
      { name: "HTML Accessibility", slug: "accessibility" },
    ],
  },
  {
    title: "HTML REFERENCES",
    items: [
      { name: "HTML Tag List", slug: "tag-list" },
      { name: "HTML Attributes", slug: "ref-attributes" },
      { name: "HTML Global Attributes", slug: "global-attributes" },
      { name: "HTML Browser Support", slug: "browser-support" },
      { name: "HTML Event Attributes", slug: "event-attributes" },
      { name: "HTML Colors", slug: "ref-colors" },
      { name: "HTML Canvas", slug: "ref-canvas" },
      { name: "HTML Audio/Video", slug: "audio-video-ref" },
      { name: "HTML Doctypes", slug: "doctypes" },
      { name: "HTML Character Sets", slug: "character-sets" },
      { name: "HTML URL Encode", slug: "ref-url-encode" },
      { name: "HTML Language Codes", slug: "language-codes" },
      { name: "HTML Country Codes", slug: "country-codes" },
      { name: "HTTP Status Codes", slug: "status-codes" },
      { name: "HTTP Request Methods", slug: "request-methods" },
      { name: "PX to EM Converter", slug: "px-to-em" },
      { name: "Keyboard Shortcuts", slug: "keyboard-shortcuts" },
    ],
  },
];

export const ALL_HTML_CHAPTERS: ChapterItem[] = HTML_SECTIONS.flatMap(s => s.items);

export const W3_HTML_CHAPTERS: Record<string, W3ChapterData> = {
  basic: {
    title: "HTML Basic Examples",
    subtitle: "In this chapter we will show some basic HTML examples.",
    prevSlug: "editors",
    nextSlug: "elements",
    sections: [
      {
        title: "HTML Documents",
        paragraphs: [
          "All HTML documents must start with a document type declaration: <!DOCTYPE html>.",
          "The HTML document itself begins with <html> and ends with </html>.",
          "The visible part of the HTML document is between <body> and </body>.",
        ],
        codeSnippet: {
          code: `<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n\n</body>\n</html>`,
          liveHtml: `<h1 style="font-size: 26px; font-weight: 700; margin: 0 0 10px; color: #111827;">My First Heading</h1><p style="margin: 0; color: #374151; font-size: 15px;">My first paragraph.</p>`,
        },
        tip: "Don't worry if these examples use tags you have not learned about yet. You will learn about them in the next chapters.",
      },
      {
        title: "HTML Headings",
        paragraphs: [
          "HTML headings are defined with the <h1> to <h6> tags.",
          "<h1> defines the most important heading. <h6> defines the least important heading:",
        ],
        codeSnippet: {
          code: `<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>\n<h3>This is heading 3</h3>`,
          liveHtml: `<h1 style="font-size: 24px; font-weight: 700; margin: 0 0 6px;">This is heading 1</h1><h2 style="font-size: 20px; font-weight: 700; margin: 0 0 6px;">This is heading 2</h2><h3 style="font-size: 17px; font-weight: 700; margin: 0;">This is heading 3</h3>`,
        },
      },
      {
        title: "HTML Paragraphs",
        paragraphs: ["HTML paragraphs are defined with the <p> tag:"],
        codeSnippet: {
          code: `<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>`,
          liveHtml: `<p style="margin: 0 0 8px; color: #374151;">This is a paragraph.</p><p style="margin: 0; color: #374151;">This is another paragraph.</p>`,
        },
      },
      {
        title: "HTML Links",
        paragraphs: [
          "HTML links are defined with the <a> tag:",
          "The link's destination is specified in the href attribute.",
          "Attributes are used to provide additional information about HTML elements.",
        ],
        codeSnippet: {
          code: `<a href="https://devacademy.id">This is a link</a>`,
          liveHtml: `<a href="#" style="color: #0284c7; text-decoration: underline; font-weight: 600;">This is a link</a>`,
        },
      },
      {
        title: "HTML Images",
        paragraphs: [
          "HTML images are defined with the <img> tag.",
          "The source file (src), alternative text (alt), width, and height are provided as attributes:",
        ],
        codeSnippet: {
          code: `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300" alt="DevAcademy.id" width="280" height="175">`,
          liveHtml: `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300" alt="DevAcademy" style="border-radius: 6px; max-width: 100%; height: auto;" />`,
        },
      },
      {
        title: "How to View HTML Source",
        paragraphs: [
          "Have you ever seen a Web page and wondered 'Hey! How did they do that?'",
          "View HTML Source Code: Right-click on any HTML page and select 'View Page Source' (in Chrome) or 'View Source' (in Edge). This will open a window containing the HTML source code of the page.",
          "Inspect an HTML Element: Right-click on an element (or a blank area), and choose 'Inspect' to see what elements are made up of (you will see both the HTML and the CSS).",
        ],
      },
    ],
  },

  elements: {
    title: "HTML Elements",
    subtitle: "An HTML element is defined by a start tag, some content, and an end tag.",
    prevSlug: "basic",
    nextSlug: "attributes",
    sections: [
      {
        title: "HTML Elements",
        paragraphs: [
          "The HTML element is everything from the start tag to the end tag:",
          "<tagname>Content goes here...</tagname>",
        ],
        table: {
          headers: ["Start tag", "Element content", "End tag"],
          rows: [
            ["<h1>", "My First Heading", "</h1>"],
            ["<p>", "My first paragraph.", "</p>"],
            ["<br>", "none", "none"],
          ],
        },
        note: "Some HTML elements have no content (like the <br> element). These elements are called empty elements. Empty elements do not have an end tag!",
      },
      {
        title: "Nested HTML Elements",
        paragraphs: [
          "HTML elements can be nested (this means that elements can contain other elements).",
          "All HTML documents consist of nested HTML elements.",
          "The following example contains four HTML elements (<html>, <body>, <h1> and <p>):",
        ],
        codeSnippet: {
          code: `<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n\n</body>\n</html>`,
          liveHtml: `<h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">My First Heading</h1><p style="margin: 0; color: #4b5563;">My first paragraph.</p>`,
        },
      },
      {
        title: "Never Skip the End Tag",
        paragraphs: [
          "Some HTML elements will display correctly, even if you forget the end tag:",
          "However, never rely on this! Unexpected results and errors may occur if you forget the end tag!",
        ],
        codeSnippet: {
          code: `<html>\n<body>\n<p>This is a paragraph\n<p>This is a paragraph\n</body>\n</html>`,
        },
      },
      {
        title: "Empty HTML Elements",
        paragraphs: [
          "HTML elements with no content are called empty elements.",
          "The <br> tag defines a line break, and is an empty element without a closing tag:",
        ],
        codeSnippet: {
          code: `<p>This is a <br> paragraph with a line break.</p>`,
          liveHtml: `<p style="margin: 0;">This is a <br> paragraph with a line break.</p>`,
        },
      },
    ],
  },

  attributes: {
    title: "HTML Attributes",
    subtitle: "HTML attributes provide additional information about HTML elements.",
    prevSlug: "elements",
    nextSlug: "headings",
    sections: [
      {
        title: "HTML Attributes",
        bullets: [
          "All HTML elements can have attributes",
          "Attributes provide additional information about elements",
          "Attributes are always specified in the start tag",
          "Attributes usually come in name/value pairs like: name=\"value\"",
        ],
      },
      {
        title: "The href Attribute",
        paragraphs: [
          "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
        ],
        codeSnippet: {
          code: `<a href="https://devacademy.id">Visit DevAcademy</a>`,
          liveHtml: `<a href="#" style="color: #04aa6d; font-weight: 700; text-decoration: underline;">Visit DevAcademy</a>`,
        },
      },
      {
        title: "The src Attribute",
        paragraphs: [
          "The <img> tag is used to embed an image in an HTML page. The src attribute specifies the path to the image to be displayed:",
        ],
        codeSnippet: {
          code: `<img src="img_girl.jpg">`,
        },
        note: "There are two ways to specify the URL in the src attribute: Absolute URL or Relative URL.",
      },
      {
        title: "The width and height Attributes",
        paragraphs: [
          "The <img> tag should also contain the width and height attributes (in pixels):",
        ],
        codeSnippet: {
          code: `<img src="img_girl.jpg" width="500" height="600">`,
        },
      },
      {
        title: "The alt Attribute",
        paragraphs: [
          "The required alt attribute for the <img> tag specifies an alternate text for an image.",
        ],
        codeSnippet: {
          code: `<img src="img_girl.jpg" alt="Girl with a jacket">`,
        },
      },
      {
        title: "The style Attribute",
        paragraphs: [
          "The style attribute is used to add styles to an element, such as color, font, size, and more.",
        ],
        codeSnippet: {
          code: `<p style="color:red;">This is a red paragraph.</p>`,
          liveHtml: `<p style="color: red; margin: 0; font-weight: 600;">This is a red paragraph.</p>`,
        },
      },
      {
        title: "The title Attribute",
        paragraphs: [
          "The title attribute defines some extra information about an element, displayed as a tooltip on hover.",
        ],
        codeSnippet: {
          code: `<p title="I'm a tooltip">This is a paragraph.</p>`,
          liveHtml: `<p title="I'm a tooltip" style="margin: 0; cursor: help; border-bottom: 1px dotted #666; display: inline-block;">Hover over this text to see the tooltip.</p>`,
        },
      },
    ],
  },

  headings: {
    title: "HTML Headings",
    subtitle: "HTML headings are titles or subtitles that you want to display on a webpage.",
    prevSlug: "attributes",
    nextSlug: "paragraphs",
    sections: [
      {
        title: "HTML Headings",
        paragraphs: [
          "HTML headings are defined with the <h1> to <h6> tags.",
          "<h1> defines the most important heading. <h6> defines the least important heading.",
        ],
        codeSnippet: {
          code: `<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>`,
          liveHtml: `<div><h1 style="font-size: 28px; margin: 0 0 4px;">Heading 1</h1><h2 style="font-size: 24px; margin: 0 0 4px;">Heading 2</h2><h3 style="font-size: 20px; margin: 0 0 4px;">Heading 3</h3><h4 style="font-size: 16px; margin: 0 0 4px;">Heading 4</h4><h5 style="font-size: 14px; margin: 0 0 4px;">Heading 5</h5><h6 style="font-size: 12px; margin: 0;">Heading 6</h6></div>`,
        },
      },
      {
        title: "Headings Are Important",
        paragraphs: [
          "Search engines use headings to index the structure and content of your web pages.",
          "Users often skim a page by its headings. It is important to use headings to show the document structure.",
        ],
        tip: "Use HTML headings for headings only. Don't use headings to make text BIG or bold.",
      },
    ],
  },

  paragraphs: {
    title: "HTML Paragraphs",
    subtitle: "A paragraph always starts on a new line, and is usually a block of text.",
    prevSlug: "headings",
    nextSlug: "styles",
    sections: [
      {
        title: "HTML Paragraphs",
        paragraphs: [
          "The HTML <p> element defines a paragraph.",
          "A paragraph always starts on a new line, and browsers automatically add some margin before and after.",
        ],
        codeSnippet: {
          code: `<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>`,
          liveHtml: `<p style="margin: 0 0 10px; color: #374151;">This is a paragraph.</p><p style="margin: 0; color: #374151;">This is another paragraph.</p>`,
        },
      },
      {
        title: "HTML Line Breaks",
        paragraphs: [
          "The HTML <br> element defines a line break without starting a new paragraph.",
        ],
        codeSnippet: {
          code: `<p>This is<br>a paragraph<br>with line breaks.</p>`,
          liveHtml: `<p style="margin: 0; color: #374151;">This is<br>a paragraph<br>with line breaks.</p>`,
        },
      },
    ],
  },

  styles: {
    title: "HTML Styles",
    subtitle: "The HTML style attribute is used to add styles to an element, such as color, font, size, and more.",
    prevSlug: "paragraphs",
    nextSlug: "formatting",
    sections: [
      {
        title: "The HTML Style Attribute",
        paragraphs: [
          "Setting the style of an HTML element, can be done with the style attribute.",
          "The HTML style attribute has the following syntax:",
          "<tagname style=\"property:value;\">",
        ],
        note: "The property is a CSS property. The value is a CSS value. You will learn more about CSS later in this tutorial.",
      },
      {
        title: "Background Color",
        paragraphs: [
          "The CSS background-color property defines the background color for an HTML element.",
          "Set the background color for a page to powderblue:",
        ],
        codeSnippet: {
          code: `<body style="background-color:powderblue;">\n\n<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n\n</body>`,
          liveHtml: `<div style="background-color: powderblue; padding: 16px; border-radius: 4px;"><h2 style="margin: 0 0 8px;">This is a heading</h2><p style="margin: 0;">This is a paragraph.</p></div>`,
        },
      },
      {
        title: "Text Color",
        paragraphs: [
          "The CSS color property defines the text color for an HTML element:",
        ],
        codeSnippet: {
          code: `<h1 style="color:blue;">This is a heading</h1>\n<p style="color:red;">This is a paragraph.</p>`,
          liveHtml: `<h2 style="color: blue; margin: 0 0 8px;">This is a heading</h2><p style="color: red; margin: 0;">This is a paragraph.</p>`,
        },
      },
      {
        title: "Fonts",
        paragraphs: [
          "The CSS font-family property defines the font to be used for an HTML element:",
        ],
        codeSnippet: {
          code: `<h1 style="font-family:verdana;">This is a heading</h1>\n<p style="font-family:courier;">This is a paragraph.</p>`,
          liveHtml: `<h2 style="font-family: verdana; margin: 0 0 8px;">This is a heading</h2><p style="font-family: courier, monospace; margin: 0;">This is a paragraph.</p>`,
        },
      },
      {
        title: "Text Size",
        paragraphs: [
          "The CSS font-size property defines the text size for an HTML element:",
        ],
        codeSnippet: {
          code: `<h1 style="font-size:300%;">This is a heading</h1>\n<p style="font-size:160%;">This is a paragraph.</p>`,
          liveHtml: `<h2 style="font-size: 200%; margin: 0 0 8px;">This is a heading</h2><p style="font-size: 130%; margin: 0;">This is a paragraph.</p>`,
        },
      },
      {
        title: "Text Alignment",
        paragraphs: [
          "The CSS text-align property defines the horizontal text alignment for an HTML element:",
        ],
        codeSnippet: {
          code: `<h1 style="text-align:center;">Centered Heading</h1>\n<p style="text-align:center;">Centered paragraph.</p>`,
          liveHtml: `<div style="text-align: center;"><h2 style="margin: 0 0 8px;">Centered Heading</h2><p style="margin: 0;">Centered paragraph.</p></div>`,
        },
      },
      {
        title: "Chapter Summary",
        table: {
          headers: ["Property", "Description"],
          rows: [
            ["style", "Use the style attribute for styling HTML elements"],
            ["background-color", "Use background-color for background color"],
            ["color", "Use color for text colors"],
            ["font-family", "Use font-family for text fonts"],
            ["font-size", "Use font-size for text sizes"],
            ["text-align", "Use text-align for text alignment"],
          ],
        },
      },
    ],
  },

  formatting: {
    title: "HTML Text Formatting",
    subtitle: "HTML contains several elements for defining text with a special meaning.",
    prevSlug: "styles",
    nextSlug: "quotations",
    sections: [
      {
        title: "HTML Formatting Elements",
        paragraphs: [
          "Formatting elements were designed to display special types of text:",
        ],
        bullets: [
          "<b> - Bold text",
          "<strong> - Important text",
          "<i> - Italic text",
          "<em> - Emphasized text",
          "<mark> - Marked text",
          "<small> - Smaller text",
          "<del> - Deleted text",
          "<ins> - Inserted text",
          "<sub> - Subscript text",
          "<sup> - Superscript text",
        ],
      },
      {
        title: "HTML <b> and <strong> Elements",
        paragraphs: [
          "The HTML <b> element defines bold text, without any extra importance.",
          "The HTML <strong> element defines text with strong importance. The content inside is typically displayed in bold.",
        ],
        codeSnippet: {
          code: `<b>This text is bold</b>\n<strong>This text is important!</strong>`,
          liveHtml: `<p style="margin: 0 0 8px;"><b>This text is bold</b></p><p style="margin: 0;"><strong>This text is important!</strong></p>`,
        },
        tip: "Always use <strong> when the text has semantic importance, and <b> only for visual presentation.",
      },
      {
        title: "HTML <i> and <em> Elements",
        paragraphs: [
          "The HTML <i> element defines a part of text in an alternate voice or mood. The content inside is typically displayed in italic.",
          "The HTML <em> element defines emphasized text. The content inside is typically displayed in italic.",
        ],
        codeSnippet: {
          code: `<i>This text is italic</i>\n<em>This text is emphasized</em>`,
          liveHtml: `<p style="margin: 0 0 8px;"><i>This text is italic</i></p><p style="margin: 0;"><em>This text is emphasized</em></p>`,
        },
      },
      {
        title: "HTML <small>, <mark>, <del>, <ins>",
        codeSnippet: {
          code: `<p>This is some <small>smaller text</small>.</p>\n<p>Do not forget to buy <mark>milk</mark> today.</p>\n<p>My favorite color is <del>blue</del> <ins>red</ins>.</p>`,
          liveHtml: `<div><p style="margin: 0 0 6px;">This is some <small>smaller text</small>.</p><p style="margin: 0 0 6px;">Do not forget to buy <mark>milk</mark> today.</p><p style="margin: 0;">My favorite color is <del>blue</del> <ins>red</ins>.</p></div>`,
        },
      },
      {
        title: "HTML <sub> and <sup> Elements",
        paragraphs: [
          "The HTML <sub> element defines subscript text. Subscript text appears half a character below the normal line, and is sometimes rendered in a smaller font.",
          "The HTML <sup> element defines superscript text. Superscript text appears half a character above the normal line.",
        ],
        codeSnippet: {
          code: `<p>This is <sub>subscripted</sub> text.</p>\n<p>This is <sup>superscripted</sup> text.</p>`,
          liveHtml: `<p style="margin: 0 0 6px;">This is <sub>subscripted</sub> text (H<sub>2</sub>O).</p><p style="margin: 0;">This is <sup>superscripted</sup> text (E = mc<sup>2</sup>).</p>`,
        },
      },
    ],
  },

  quotations: {
    title: "HTML Quotation and Citation Elements",
    subtitle: "In this chapter we will go through the <blockquote>, <q>, <abbr>, <address>, <cite>, and <bdo> HTML elements.",
    prevSlug: "formatting",
    nextSlug: "comments",
    sections: [
      {
        title: "HTML <blockquote> for Quotations",
        paragraphs: [
          "The HTML <blockquote> element defines a section that is quoted from another source.",
          "Browsers usually indent <blockquote> elements.",
        ],
        codeSnippet: {
          code: `<p>Here is a quote from WWF's website:</p>\n<blockquote cite="http://www.worldwildlife.org/who/index.html">\nFor 60 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries.\n</blockquote>`,
          liveHtml: `<p style="margin: 0 0 8px;">Here is a quote from WWF's website:</p><blockquote style="margin: 0 0 0 20px; padding-left: 12px; border-left: 3px solid #cbd5e1; color: #475569; font-style: italic;">For 60 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries.</blockquote>`,
        },
      },
      {
        title: "HTML <q> for Short Quotations",
        paragraphs: [
          "The HTML <q> tag defines a short quotation.",
          "Browsers normally insert quotation marks around the quotation.",
        ],
        codeSnippet: {
          code: `<p>WWF's goal is to: <q>Build a future where people live in harmony with nature.</q></p>`,
          liveHtml: `<p style="margin: 0;">WWF's goal is to: <q>Build a future where people live in harmony with nature.</q></p>`,
        },
      },
      {
        title: "HTML <abbr> for Abbreviations",
        paragraphs: [
          "The HTML <abbr> tag defines an abbreviation or an acronym, like \"HTML\", \"CSS\", \"Mr.\", \"Dr.\", \"ASAP\", \"ATM\".",
          "Marking abbreviations can give useful information to browsers, translation systems and search-engines.",
        ],
        codeSnippet: {
          code: `<p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>`,
          liveHtml: `<p style="margin: 0;">The <abbr title="World Health Organization" style="text-decoration: underline dotted; cursor: help;">WHO</abbr> was founded in 1948.</p>`,
        },
        tip: "Use the global title attribute to show the description for abbreviation on hover.",
      },
      {
        title: "HTML <address> for Contact Information",
        paragraphs: [
          "The HTML <address> tag defines the contact information for the author/owner of a document or an article.",
          "The text in the <address> element usually renders in italic, and browsers will always add a line break before and after the <address> element.",
        ],
        codeSnippet: {
          code: `<address>\nWritten by John Doe.<br>\nVisit us at:<br>\nExample.com<br>\nBox 564, Disneyland<br>\nUSA\n</address>`,
          liveHtml: `<address style="font-style: italic; color: #334155; line-height: 1.5;">Written by John Doe.<br>Visit us at:<br>Example.com<br>Box 564, Disneyland<br>USA</address>`,
        },
      },
    ],
  },

  comments: {
    title: "HTML Comments",
    subtitle: "HTML comments are not displayed in the browser, but they can help document your HTML source code.",
    prevSlug: "quotations",
    nextSlug: "colors",
    sections: [
      {
        title: "HTML Comment Tag",
        paragraphs: [
          "You can add comments to your HTML source by using the following syntax:",
          "<!-- Write your comments here -->",
          "Notice that there is an exclamation point (!) in the start tag, but not in the end tag.",
        ],
        note: "Comments are not displayed by the browser, but they can help document your HTML source code.",
        codeSnippet: {
          code: `<!-- This is a comment -->\n<p>This is a paragraph.</p>\n<!-- Remember to add more information here -->`,
          liveHtml: `<p style="margin: 0;">This is a paragraph.</p>`,
        },
      },
      {
        title: "Hide Content",
        paragraphs: [
          "Comments can be used to hide content from being displayed in the browser. This can be helpful if you want to hide content temporarily:",
        ],
        codeSnippet: {
          code: `<p>This is a paragraph.</p>\n<!-- <p>This is another paragraph </p> -->\n<p>This is a paragraph too.</p>`,
          liveHtml: `<p style="margin: 0 0 8px;">This is a paragraph.</p><p style="margin: 0;">This is a paragraph too.</p>`,
        },
      },
      {
        title: "Hide Inline Content",
        paragraphs: [
          "Comments can be used to hide parts in the middle of the HTML code:",
        ],
        codeSnippet: {
          code: `<p>This <!-- is a comment --> text.</p>`,
          liveHtml: `<p style="margin: 0;">This text.</p>`,
        },
      },
    ],
  },

  colors: {
    title: "HTML Colors",
    subtitle: "HTML colors are specified with predefined color names, or with RGB, HEX, HSL, RGBA, or HSLA values.",
    prevSlug: "comments",
    nextSlug: "css",
    sections: [
      {
        title: "Color Names",
        paragraphs: [
          "In HTML, a color can be specified by using a color name. HTML supports 140 standard color names.",
        ],
        codeSnippet: {
          code: `<h1 style="background-color:Tomato;">Tomato</h1>\n<h1 style="background-color:Orange;">Orange</h1>\n<h1 style="background-color:DodgerBlue;">DodgerBlue</h1>\n<h1 style="background-color:MediumSeaGreen;">MediumSeaGreen</h1>`,
          liveHtml: `<div style="display: flex; flex-direction: column; gap: 6px;"><div style="background-color: Tomato; color: white; padding: 10px; font-weight: bold; text-align: center;">Tomato</div><div style="background-color: Orange; color: white; padding: 10px; font-weight: bold; text-align: center;">Orange</div><div style="background-color: DodgerBlue; color: white; padding: 10px; font-weight: bold; text-align: center;">DodgerBlue</div><div style="background-color: MediumSeaGreen; color: white; padding: 10px; font-weight: bold; text-align: center;">MediumSeaGreen</div></div>`,
        },
      },
      {
        title: "Color Values: RGB, HEX, and HSL",
        paragraphs: [
          "In HTML, colors can also be specified using RGB values, HEX values, HSL values, RGBA values, and HSLA values.",
          "The following three HTML elements have their background color set with RGB, HEX, and HSL values:",
        ],
        codeSnippet: {
          code: `<p style="background-color:rgb(255, 99, 71);">rgb(255, 99, 71)</p>\n<p style="background-color:#ff6347;">#ff6347</p>\n<p style="background-color:hsl(9, 100%, 64%);">hsl(9, 100%, 64%)</p>`,
          liveHtml: `<div style="display: flex; flex-direction: column; gap: 6px;"><div style="background-color: rgb(255, 99, 71); color: white; padding: 8px 12px; font-weight: 600;">rgb(255, 99, 71)</div><div style="background-color: #ff6347; color: white; padding: 8px 12px; font-weight: 600;">#ff6347</div><div style="background-color: hsl(9, 100%, 64%); color: white; padding: 8px 12px; font-weight: 600;">hsl(9, 100%, 64%)</div></div>`,
        },
        tip: "All three values above represent the exact same vibrant tomato color!",
      },
    ],
  },

  css: {
    title: "HTML Styles - CSS",
    subtitle: "CSS stands for Cascading Style Sheets. CSS saves a lot of work. It can control the layout of multiple web pages all at once.",
    prevSlug: "colors",
    nextSlug: "links",
    sections: [
      {
        title: "What is CSS?",
        paragraphs: [
          "Cascading Style Sheets (CSS) is used to format the layout of a webpage.",
          "With CSS, you can control the color, font, the size of text, the spacing between elements, how elements are positioned and laid out, what background images or background colors are to be used, different displays for different devices and screen sizes, and much more!",
        ],
        tip: "The word cascading means that a style applied to a parent element will also apply to all children elements inside the parent.",
      },
      {
        title: "Using CSS (3 Ways)",
        paragraphs: [
          "CSS can be added to HTML documents in 3 ways:",
        ],
        bullets: [
          "Inline - by using the style attribute inside HTML elements",
          "Internal - by using a <style> element in the <head> section",
          "External - by using a <link> element to link to an external CSS file",
        ],
      },
      {
        title: "External CSS",
        paragraphs: [
          "An external style sheet is used to define the style for many HTML pages.",
          "To use an external style sheet, add a link to it in the <head> section of each HTML page:",
        ],
        codeSnippet: {
          code: `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\n<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>`,
        },
        note: "An external style sheet can be written in any text editor, and must be saved with a .css extension.",
      },
    ],
  },

  links: {
    title: "HTML Links",
    subtitle: "HTML links are hyperlinks. You can click on a link and jump to another document.",
    prevSlug: "css",
    nextSlug: "images",
    sections: [
      {
        title: "HTML Links - Syntax",
        paragraphs: [
          "The HTML <a> tag defines a hyperlink. It has the following syntax:",
          "<a href=\"url\">link text</a>",
          "The most important attribute of the <a> element is the href attribute, which indicates the link's destination.",
        ],
        codeSnippet: {
          code: `<a href="https://www.w3schools.com/">Visit W3Schools.com!</a>`,
          liveHtml: `<a href="#" style="color: #04aa6d; font-weight: bold; text-decoration: underline;">Visit W3Schools.com!</a>`,
        },
      },
      {
        title: "The target Attribute",
        paragraphs: [
          "By default, the linked page will be displayed in the current browser window. To change this, you must specify another target for the link.",
          "The target attribute specifies where to open the linked document:",
        ],
        bullets: [
          "_self - Default. Opens the document in the same window/tab as it was clicked",
          "_blank - Opens the document in a new window or tab",
          "_parent - Opens the document in the parent frame",
          "_top - Opens the document in the full body of the window",
        ],
        codeSnippet: {
          code: `<a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a>`,
          liveHtml: `<a href="#" target="_blank" style="color: #04aa6d; font-weight: bold; text-decoration: underline;">Visit W3Schools!</a>`,
        },
      },
      {
        title: "Absolute URLs vs. Relative URLs",
        paragraphs: [
          "Both examples above are using an absolute URL (a full web address in the href attribute).",
          "A local link (a link to a page within the same website) is specified with a relative URL (without the \"https://www\" part):",
        ],
        codeSnippet: {
          code: `<h2>Absolute URLs</h2>\n<p><a href="https://www.w3.org/">W3C</a></p>\n<p><a href="https://www.google.com/">Google</a></p>\n\n<h2>Relative URLs</h2>\n<p><a href="html_images.asp">HTML Images</a></p>\n<p><a href="/css/default.asp">CSS Tutorial</a></p>`,
        },
      },
    ],
  },

  images: {
    title: "HTML Images",
    subtitle: "Images can improve the design and the appearance of a web page.",
    prevSlug: "links",
    nextSlug: "tables",
    sections: [
      {
        title: "HTML Images Syntax",
        paragraphs: [
          "The HTML <img> tag is used to embed an image in a web page.",
          "Images are not technically inserted into a web page; images are linked to web pages. The <img> tag creates a holding space for the referenced image.",
          "The <img> tag is empty, it contains attributes only, and does not have a closing tag.",
        ],
        codeSnippet: {
          code: `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" alt="Laptop on desk" width="360" height="220">`,
          liveHtml: `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" alt="Laptop on desk" style="width: 360px; height: auto; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />`,
        },
      },
      {
        title: "The alt Attribute",
        paragraphs: [
          "The required alt attribute provides an alternate text for an image, if the user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).",
        ],
        note: "The alt attribute is required for web accessibility (WCAG). A web page without alt attributes will fail accessibility audits.",
      },
      {
        title: "Image Size - Width and Height",
        paragraphs: [
          "You can use the style attribute to specify the width and height of an image, or use the width and height attributes directly:",
        ],
        codeSnippet: {
          code: `<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">`,
        },
        tip: "Always specify the width and height of an image. If width and height are not specified, the web page might flicker while the image loads.",
      },
    ],
  },

  tables: {
    title: "HTML Tables",
    subtitle: "HTML tables allow web developers to arrange data into rows and columns.",
    prevSlug: "images",
    nextSlug: "lists",
    sections: [
      {
        title: "Define an HTML Table",
        paragraphs: [
          "A table in HTML consists of table cells inside rows and columns.",
        ],
        bullets: [
          "<table> - Defines an HTML table",
          "<tr> - Defines a table row",
          "<th> - Defines a table header cell (bold and centered by default)",
          "<td> - Defines a table data cell (regular text, left-aligned by default)",
        ],
        codeSnippet: {
          code: `<table>\n  <tr>\n    <th>Company</th>\n    <th>Contact</th>\n    <th>Country</th>\n  </tr>\n  <tr>\n    <td>Alfreds Futterkiste</td>\n    <td>Maria Anders</td>\n    <td>Germany</td>\n  </tr>\n  <tr>\n    <td>Centro comercial Moctezuma</td>\n    <td>Francisco Chang</td>\n    <td>Mexico</td>\n  </tr>\n</table>`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 14px;"><tr style="background: #e7e9eb;"><th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Company</th><th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Contact</th><th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Country</th></tr><tr><td style="padding: 8px 10px; border: 1px solid #ddd;">Alfreds Futterkiste</td><td style="padding: 8px 10px; border: 1px solid #ddd;">Maria Anders</td><td style="padding: 8px 10px; border: 1px solid #ddd;">Germany</td></tr><tr style="background: #f9f9f9;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Centro comercial Moctezuma</td><td style="padding: 8px 10px; border: 1px solid #ddd;">Francisco Chang</td><td style="padding: 8px 10px; border: 1px solid #ddd;">Mexico</td></tr></table>`,
        },
      },
      {
        title: "Collapsed Table Borders",
        paragraphs: [
          "To collapse the double borders into a single border, add the CSS border-collapse property:",
        ],
        codeSnippet: {
          code: `table, th, td {\n  border: 1px solid white;\n  border-collapse: collapse;\n}`,
        },
      },
    ],
  },

  lists: {
    title: "HTML Lists",
    subtitle: "HTML lists allow web developers to group a set of related items in lists.",
    prevSlug: "tables",
    nextSlug: "block-inline",
    sections: [
      {
        title: "Unordered HTML List",
        paragraphs: [
          "An unordered list starts with the <ul> tag. Each list item starts with the <li> tag.",
          "The list items will be marked with bullets (small black circles) by default:",
        ],
        codeSnippet: {
          code: `<ul>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ul>`,
          liveHtml: `<ul style="margin: 0; padding-left: 20px;"><li>Coffee</li><li>Tea</li><li>Milk</li></ul>`,
        },
      },
      {
        title: "Ordered HTML List",
        paragraphs: [
          "An ordered list starts with the <ol> tag. Each list item starts with the <li> tag.",
          "The list items will be marked with numbers by default:",
        ],
        codeSnippet: {
          code: `<ol>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ol>`,
          liveHtml: `<ol style="margin: 0; padding-left: 20px;"><li>Coffee</li><li>Tea</li><li>Milk</li></ol>`,
        },
      },
      {
        title: "HTML Description Lists",
        paragraphs: [
          "HTML also supports description lists. A description list is a list of terms, with a description of each term.",
          "The <dl> tag defines the description list, the <dt> tag defines the term (name), and the <dd> tag describes each term:",
        ],
        codeSnippet: {
          code: `<dl>\n  <dt>Coffee</dt>\n  <dd>- black hot drink</dd>\n  <dt>Milk</dt>\n  <dd>- white cold drink</dd>\n</dl>`,
          liveHtml: `<dl style="margin: 0;"><dt style="font-weight: bold;">Coffee</dt><dd style="margin-left: 20px; color: #4b5563;">- black hot drink</dd><dt style="font-weight: bold; margin-top: 8px;">Milk</dt><dd style="margin-left: 20px; color: #4b5563;">- white cold drink</dd></dl>`,
        },
      },
    ],
  },

  "block-inline": {
    title: "HTML Block and Inline Elements",
    subtitle: "Every HTML element has a default display value, depending on what type of element it is.",
    prevSlug: "lists",
    nextSlug: "div",
    sections: [
      {
        title: "Block-level Elements",
        paragraphs: [
          "A block-level element always starts on a new line, and the browsers automatically add some space (a margin) before and after the element.",
          "A block-level element always takes up the full width available (stretches out to the left and right as far as it can).",
          "Two common block elements are: <p> and <div>.",
        ],
        codeSnippet: {
          code: `<p>Hello World</p>\n<div>Hello World</div>`,
          liveHtml: `<div style="border: 1px solid #cbd5e1; padding: 8px;"><p style="background: #e2e8f0; margin: 0 0 8px; padding: 8px;">Paragraph (Block element)</p><div style="background: #e2e8f0; padding: 8px;">Div (Block element)</div></div>`,
        },
      },
      {
        title: "Inline Elements",
        paragraphs: [
          "An inline element does not start on a new line.",
          "An inline element only takes up as much width as necessary.",
          "This is an <span> element inside a paragraph.",
        ],
        codeSnippet: {
          code: `<p>This is <span style="border: 1px solid red; color: red;">an inline span</span> inside a paragraph.</p>`,
          liveHtml: `<p style="margin: 0;">This is <span style="border: 1px solid red; color: red; padding: 2px 4px;">an inline span</span> inside a paragraph.</p>`,
        },
      },
    ],
  },

  div: {
    title: "HTML The <div> Element",
    subtitle: "The <div> element is often used as a container for other HTML elements.",
    prevSlug: "block-inline",
    nextSlug: "classes",
    sections: [
      {
        title: "The <div> Element",
        paragraphs: [
          "The <div> element has no required attributes, but style, class and id are common.",
          "When used together with CSS, the <div> element can be used to style blocks of content:",
        ],
        codeSnippet: {
          code: `<div style="background-color:#FFF4A3; color:#000000; padding:20px;">\n  <h2>London</h2>\n  <p>London is the capital city of England.</p>\n  <p>London has over 13 million inhabitants.</p>\n</div>`,
          liveHtml: `<div style="background-color: #FFF4A3; color: #000000; padding: 20px; border-radius: 6px;"><h3 style="margin: 0 0 8px;">London</h3><p style="margin: 0 0 6px;">London is the capital city of England.</p><p style="margin: 0;">London has over 13 million inhabitants.</p></div>`,
        },
      },
    ],
  },

  classes: {
    title: "HTML The class Attribute",
    subtitle: "The HTML class attribute is used to specify a class for an HTML element.",
    prevSlug: "div",
    nextSlug: "id",
    sections: [
      {
        title: "Using The class Attribute",
        paragraphs: [
          "The class attribute is often used to point to a class name in a style sheet. It can also be used by JavaScript to access and manipulate elements with the specific class name.",
          "In the following example we have three <div> elements that point to the same class name (.city):",
        ],
        codeSnippet: {
          code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n.city {\n  background-color: tomato;\n  color: white;\n  padding: 10px;\n}\n</style>\n</head>\n<body>\n\n<div class="city">\n  <h2>London</h2>\n  <p>London is the capital of England.</p>\n</div>\n\n</body>\n</html>`,
          liveHtml: `<div style="background-color: tomato; color: white; padding: 12px; border-radius: 4px;"><h3 style="margin: 0 0 6px;">London</h3><p style="margin: 0;">London is the capital of England.</p></div>`,
        },
      },
      {
        title: "Multiple Classes",
        paragraphs: [
          "HTML elements can have more than one class. To specify multiple classes, separate the class names with a space, e.g. <div class=\"city main\">.",
        ],
      },
    ],
  },

  id: {
    title: "HTML The id Attribute",
    subtitle: "The HTML id attribute is used to specify a unique id for an HTML element.",
    prevSlug: "classes",
    nextSlug: "iframes",
    sections: [
      {
        title: "Using The id Attribute",
        paragraphs: [
          "The id attribute specifies a unique id for an HTML element. The value of the id attribute must be unique within the HTML document.",
          "The id attribute is used to point to a specific style declaration in a style sheet. It is also used by JavaScript to access and manipulate the element with the specific id.",
          "The syntax for id is: write a hash character (#), followed by an id name.",
        ],
        codeSnippet: {
          code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n#myHeader {\n  background-color: lightblue;\n  color: black;\n  padding: 40px;\n  text-align: center;\n}\n</style>\n</head>\n<body>\n\n<h1 id="myHeader">My Header</h1>\n\n</body>\n</html>`,
          liveHtml: `<h2 style="background-color: lightblue; color: black; padding: 24px; text-align: center; border-radius: 4px; margin: 0;">My Header</h2>`,
        },
        note: "The id name is case sensitive! An id name must contain at least one character, and cannot start with a number.",
      },
      {
        title: "Difference Between Class and ID",
        paragraphs: [
          "A class name can be used by multiple HTML elements, while an id name must only be used by one HTML element within the page!",
        ],
      },
    ],
  },

  iframes: {
    title: "HTML Iframes",
    subtitle: "An HTML iframe is used to display a web page within a web page.",
    prevSlug: "id",
    nextSlug: "javascript",
    sections: [
      {
        title: "HTML Iframe Syntax",
        paragraphs: [
          "The HTML <iframe> tag specifies an inline frame.",
          "An inline frame is used to embed another document within the current HTML document.",
          "<iframe src=\"url\" title=\"description\"></iframe>",
        ],
        codeSnippet: {
          code: `<iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials" width="100%" height="300" style="border: 1px solid #ccd3da; border-radius: 6px;"></iframe>`,
        },
        tip: "Always include a title attribute for accessibility so screen readers can explain what the iframe contains.",
      },
    ],
  },

  javascript: {
    title: "HTML JavaScript",
    subtitle: "JavaScript makes HTML pages more dynamic and interactive.",
    prevSlug: "iframes",
    nextSlug: "file-paths",
    sections: [
      {
        title: "The HTML <script> Tag",
        paragraphs: [
          "The HTML <script> tag is used to define a client-side script (JavaScript).",
          "The <script> element either contains script statements, or it points to an external script file through the src attribute.",
          "Common uses for JavaScript are image manipulation, form validation, and dynamic changes of content.",
        ],
        codeSnippet: {
          code: `<button type="button" onclick="document.getElementById('demo').innerHTML = Date()">Click me to display Date and Time.</button>\n\n<p id="demo"></p>`,
          liveHtml: `<div><button type="button" onclick="this.nextElementSibling.innerHTML = new Date().toLocaleTimeString()" style="background: #04aa6d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Click me to display Time</button><p style="margin-top: 8px; font-weight: bold; color: #1e3a8a;"></p></div>`,
        },
      },
      {
        title: "The HTML <noscript> Tag",
        paragraphs: [
          "The HTML <noscript> tag is used to provide an alternate content for users that have disabled scripts in their browser or have a browser that doesn't support script.",
        ],
        codeSnippet: {
          code: `<noscript>Sorry, your browser does not support JavaScript!</noscript>`,
        },
      },
    ],
  },

  "file-paths": {
    title: "HTML File Paths",
    subtitle: "A file path describes the location of a file in a web site's folder structure.",
    prevSlug: "javascript",
    nextSlug: "head",
    sections: [
      {
        title: "HTML File Path Examples",
        table: {
          headers: ["Path", "Description"],
          rows: [
            ['<img src="picture.jpg">', 'The "picture.jpg" file is located in the same folder as the current page'],
            ['<img src="images/picture.jpg">', 'The "picture.jpg" file is located in the images folder in the current folder'],
            ['<img src="/images/picture.jpg">', 'The "picture.jpg" file is located in the images folder at the root of the current web'],
            ['<img src="../picture.jpg">', 'The "picture.jpg" file is located in the folder one level up from the current folder'],
          ],
        },
        tip: "It is best practice to use relative file paths (if possible). When using relative file paths, your web pages will not be bound to your current base URL.",
      },
    ],
  },

  head: {
    title: "HTML - The Head Element",
    subtitle: "The HTML <head> element is a container for metadata (data about data) and is placed between the <html> tag and the <body> tag.",
    prevSlug: "file-paths",
    nextSlug: "layout",
    sections: [
      {
        title: "The HTML <head> Element",
        paragraphs: [
          "HTML metadata is data about the HTML document. Metadata is not displayed.",
          "Metadata typically define the document title, character set, styles, scripts, and other meta information.",
          "The following tags describe metadata: <title>, <style>, <meta>, <link>, <script>, and <base>.",
        ],
        codeSnippet: {
          code: `<!DOCTYPE html>\n<html>\n<head>\n  <title>A Meaningful Page Title</title>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link rel="stylesheet" href="mystyle.css">\n</head>\n<body>\n\n<p>The content of the document...</p>\n\n</body>\n</html>`,
        },
      },
    ],
  },

  layout: {
    title: "HTML Layout Elements and Techniques",
    subtitle: "Websites often display content in multiple columns (like a magazine or newspaper).",
    prevSlug: "head",
    nextSlug: "responsive",
    sections: [
      {
        title: "HTML Semantic Layout Elements",
        paragraphs: [
          "HTML has several semantic elements that define the different parts of a web page:",
        ],
        bullets: [
          "<header> - Defines a header for a document or a section",
          "<nav> - Defines a set of navigation links",
          "<section> - Defines a section in a document",
          "<article> - Defines an independent, self-contained content",
          "<aside> - Defines content aside from the content (like a sidebar)",
          "<footer> - Defines a footer for a document or a section",
          "<details> - Defines additional details that the user can open and close on demand",
          "<summary> - Defines a heading for the <details> element",
        ],
        codeSnippet: {
          code: `<header style="background:#666;padding:20px;text-align:center;color:white;">\n  <h2>Cities</h2>\n</header>\n<nav style="background:#ccc;padding:10px;">\n  <a href="#">London</a> | <a href="#">Paris</a> | <a href="#">Tokyo</a>\n</nav>\n<footer style="background:#777;padding:10px;text-align:center;color:white;">\n  <p>Footer</p>\n</footer>`,
          liveHtml: `<div><header style="background:#334155;padding:14px;text-align:center;color:white;border-radius:4px 4px 0 0;"><h3 style="margin:0;">Cities</h3></header><nav style="background:#f1f5f9;padding:8px 12px;font-weight:600;"><span style="color:#04aa6d;">London</span> | <span style="color:#04aa6d;">Paris</span> | <span style="color:#04aa6d;">Tokyo</span></nav><footer style="background:#475569;padding:10px;text-align:center;color:white;border-radius:0 0 4px 4px;"><p style="margin:0;font-size:13px;">Footer</p></footer></div>`,
        },
      },
    ],
  },

  responsive: {
    title: "HTML Responsive Web Design",
    subtitle: "Responsive web design is about creating web pages that look good on all devices!",
    prevSlug: "layout",
    nextSlug: "semantics",
    sections: [
      {
        title: "Setting The Viewport",
        paragraphs: [
          "To create a responsive website, add the following <meta> tag to all your web pages:",
          "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
          "This gives the browser instructions on how to control the page's dimensions and scaling.",
        ],
        note: "width=device-width sets the width of the page to follow the screen-width of the device. initial-scale=1.0 sets the initial zoom level when the page is first loaded by the browser.",
      },
      {
        title: "Responsive Images",
        paragraphs: [
          "Responsive images are images that scale nicely to fit any browser size.",
          "If you want an image to scale down if it has to, but never scale up to be larger than its original size, use max-width: 100%; height: auto;:",
        ],
        codeSnippet: {
          code: `<img src="img_girl.jpg" style="max-width:100%;height:auto;">`,
        },
      },
    ],
  },

  semantics: {
    title: "HTML Semantic Elements",
    subtitle: "Semantic elements = elements with a meaning.",
    prevSlug: "responsive",
    nextSlug: "forms",
    sections: [
      {
        title: "What are Semantic Elements?",
        paragraphs: [
          "A semantic element clearly describes its meaning to both the browser and the developer.",
          "Examples of non-semantic elements: <div> and <span> - Tells nothing about its content.",
          "Examples of semantic elements: <form>, <table>, and <article> - Clearly defines its content.",
        ],
        table: {
          headers: ["Semantic Element", "Description"],
          rows: [
            ["<article>", "Defines independent, self-contained content"],
            ["<aside>", "Defines content aside from the page content"],
            ["<details>", "Defines additional details that the user can view or hide"],
            ["<figcaption>", "Defines a caption for a <figure> element"],
            ["<figure>", "Specifies self-contained content, like illustrations, photos, diagrams"],
            ["<footer>", "Defines a footer for a document or section"],
            ["<header>", "Specifies a header for a document or section"],
            ["<main>", "Specifies the main content of a document"],
            ["<mark>", "Defines marked/highlighted text"],
            ["<nav>", "Defines navigation links"],
            ["<section>", "Defines a section in a document"],
            ["<summary>", "Defines a visible heading for a <details> element"],
            ["<time>", "Defines a date/time"],
          ],
        },
      },
    ],
  },

  forms: {
    title: "HTML Forms",
    subtitle: "An HTML form is used to collect user input. The user input is most often sent to a server for processing.",
    prevSlug: "semantics",
    nextSlug: "form-attributes",
    sections: [
      {
        title: "The <form> Element",
        paragraphs: [
          "The HTML <form> element is used to create an HTML form for user input:",
          "<form>\n.form elements\n</form>",
          "The <form> element is a container for different types of input elements, such as: text fields, checkboxes, radio buttons, submit buttons, etc.",
        ],
      },
      {
        title: "The <input> Element",
        paragraphs: [
          "The HTML <input> element is the most used form element.",
          "An <input> element can be displayed in many ways, depending on the type attribute:",
        ],
        table: {
          headers: ["Type", "Description"],
          rows: [
            ['<input type="text">', "Displays a single-line text input field"],
            ['<input type="radio">', "Displays a radio button (for selecting one of many choices)"],
            ['<input type="checkbox">', "Displays a checkbox (for selecting zero or more of many choices)"],
            ['<input type="submit">', "Displays a submit button (for submitting the form)"],
            ['<input type="button">', "Displays a clickable button"],
          ],
        },
        codeSnippet: {
          code: `<form action="/action_page.php">\n  <label for="fname">First name:</label><br>\n  <input type="text" id="fname" name="fname" value="John"><br>\n  <label for="lname">Last name:</label><br>\n  <input type="text" id="lname" name="lname" value="Doe"><br><br>\n  <input type="submit" value="Submit">\n</form>`,
          liveHtml: `<form style="font-family: inherit;"><label style="font-weight: 600; font-size: 14px;">First name:</label><br><input type="text" value="John" style="padding: 6px 10px; border: 1px solid #ccd3da; border-radius: 4px; margin: 4px 0 12px; width: 220px;"><br><label style="font-weight: 600; font-size: 14px;">Last name:</label><br><input type="text" value="Doe" style="padding: 6px 10px; border: 1px solid #ccd3da; border-radius: 4px; margin: 4px 0 16px; width: 220px;"><br><button type="button" style="background: #04aa6d; color: white; border: none; padding: 8px 18px; border-radius: 4px; font-weight: bold; cursor: pointer;">Submit</button></form>`,
        },
      },
    ],
  },

  "form-attributes": {
    title: "HTML Form Attributes",
    subtitle: "This chapter describes the different attributes for the HTML <form> element.",
    prevSlug: "forms",
    nextSlug: "home",
    sections: [
      {
        title: "The Action Attribute",
        paragraphs: [
          "The action attribute defines the action to be performed when the form is submitted.",
          "Usually, the form data is sent to a file on the server when the user clicks on the submit button.",
        ],
        codeSnippet: {
          code: `<form action="/action_page.php">\n  <label for="fname">First name:</label><br>\n  <input type="text" id="fname" name="fname" value="John"><br><br>\n  <input type="submit" value="Submit">\n</form>`,
        },
      },
      {
        title: "The Method Attribute",
        paragraphs: [
          "The method attribute specifies the HTTP method to be used when submitting the form data.",
          "The form-data can be sent as URL variables (with method=\"get\") or as HTTP post transaction (with method=\"post\").",
        ],
        bullets: [
          "GET - Appends the form data to the URL, in name/value pairs. NEVER use GET to send sensitive data!",
          "POST - Appends the form data inside the body of the HTTP request. Good for sensitive data like passwords.",
        ],
        note: "Always use POST if the form data contains sensitive or personal information!",
      },
    ],
  },
};

// Database of interactive multiple-choice exercises matching W3Schools
export const W3_CHAPTER_EXERCISES: Record<string, ChapterExercise> = {
  introduction: {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlink Transfer Markup Language",
    ],
    correctIndex: 0,
    explanation: "HTML stands for Hyper Text Markup Language. It is the standard markup language for documents designed to be displayed in a web browser.",
  },
  basic: {
    question: "All HTML documents must start with which declaration?",
    options: [
      "<!DOCTYPE html>",
      "<html doctype>",
      "<head>",
      "<?xml version='1.0'?>",
    ],
    correctIndex: 0,
    explanation: "All HTML documents must start with a <!DOCTYPE html> declaration to tell the browser what document type to expect.",
  },
  elements: {
    question: "Which of the following is an empty HTML element with no closing tag?",
    options: [
      "<br>",
      "<p>",
      "<h1>",
      "<div>",
    ],
    correctIndex: 0,
    explanation: "The <br> tag defines a line break and is an empty element that has no content and no closing tag.",
  },
  attributes: {
    question: "Which attribute specifies an alternate text for an image if it cannot be displayed?",
    options: [
      "alt",
      "title",
      "src",
      "description",
    ],
    correctIndex: 0,
    explanation: "The required 'alt' attribute provides an alternate text for an image for accessibility and when images fail to load.",
  },
  headings: {
    question: "Which HTML tag is used for the largest and most important heading?",
    options: [
      "<h1>",
      "<h6>",
      "<head>",
      "<heading>",
    ],
    correctIndex: 0,
    explanation: "<h1> defines the most important heading. <h6> defines the least important heading.",
  },
  paragraphs: {
    question: "Which HTML tag defines a paragraph?",
    options: [
      "<p>",
      "<para>",
      "<pg>",
      "<paragraph>",
    ],
    correctIndex: 0,
    explanation: "The HTML <p> element defines a paragraph block.",
  },
  styles: {
    question: "Which HTML attribute is used to apply inline CSS styles to an element?",
    options: [
      "style",
      "css",
      "class",
      "styles",
    ],
    correctIndex: 0,
    explanation: "The style attribute allows you to specify CSS properties and values directly on an HTML element.",
  },
  formatting: {
    question: "Which HTML tag defines text with strong importance (typically rendered in bold)?",
    options: [
      "<strong>",
      "<important>",
      "<b>",
      "<em>",
    ],
    correctIndex: 0,
    explanation: "The <strong> element gives text strong semantic importance, which browsers display in bold by default.",
  },
  quotations: {
    question: "Which HTML tag defines a section that is quoted from another source?",
    options: [
      "<blockquote>",
      "<q>",
      "<quote>",
      "<cite>",
    ],
    correctIndex: 0,
    explanation: "<blockquote> defines a section quoted from another source and is typically indented by browsers.",
  },
  comments: {
    question: "How does an HTML comment begin?",
    options: [
      "<!--",
      "//",
      "/*",
      "<!comment",
    ],
    correctIndex: 0,
    explanation: "HTML comments start with <!-- and end with -->.",
  },
  colors: {
    question: "Which of the following is a valid HTML color specification?",
    options: [
      "rgb(255, 99, 71)",
      "color(red, 100)",
      "#redcolor",
      "hsl-color(120)",
    ],
    correctIndex: 0,
    explanation: "Colors in HTML can be defined using RGB values like rgb(255, 99, 71), HEX codes (#ff6347), or standard color names.",
  },
  css: {
    question: "Which tag is used inside the <head> element to link to an external CSS stylesheet?",
    options: [
      "<link>",
      "<style>",
      "<css>",
      "<script>",
    ],
    correctIndex: 0,
    explanation: "The <link> element with rel='stylesheet' is used to connect an external CSS file.",
  },
  links: {
    question: "Which HTML attribute specifies the URL destination of a hyperlink?",
    options: [
      "href",
      "src",
      "link",
      "url",
    ],
    correctIndex: 0,
    explanation: "The href (Hypertext Reference) attribute of the <a> tag specifies the URL of the link target.",
  },
  images: {
    question: "Which HTML tag is used to embed an image into a web page?",
    options: [
      "<img>",
      "<picture>",
      "<image>",
      "<photo>",
    ],
    correctIndex: 0,
    explanation: "The <img> tag embeds images into HTML documents.",
  },
  tables: {
    question: "Which HTML tag defines a table row?",
    options: [
      "<tr>",
      "<td>",
      "<th>",
      "<row>",
    ],
    correctIndex: 0,
    explanation: "<tr> stands for 'table row'. <td> is table data, and <th> is table header.",
  },
  lists: {
    question: "Which HTML tag is used to create an ordered (numbered) list?",
    options: [
      "<ol>",
      "<ul>",
      "<li>",
      "<list>",
    ],
    correctIndex: 0,
    explanation: "<ol> defines an ordered list, while <ul> defines an unordered (bulleted) list.",
  },
  forms: {
    question: "Which input type displays a single-line text input field?",
    options: [
      "text",
      "button",
      "input",
      "textfield",
    ],
    correctIndex: 0,
    explanation: "<input type='text'> displays a standard single-line text entry field.",
  },
};

// Database of interactive code fill-in challenges matching W3Schools
export const W3_CHAPTER_CHALLENGES: Record<string, ChapterChallenge> = {
  introduction: {
    instruction: "Complete the HTML5 document type declaration in the code below.",
    beforeCode: "<!DOCTYPE ",
    placeholder: "html",
    afterCode: ">\n<html>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
    correctAnswer: "html",
    hint: "The HTML5 doctype declaration simply uses the word 'html'.",
    previewSnippet: (val) =>
      val.toLowerCase() === "html"
        ? `<h2 style="margin: 0; color: #04aa6d;">Hello World</h2><p style="margin: 4px 0 0; color: #475569;">Valid HTML5 Document Rendered</p>`
        : `<p style="color: #64748b; font-style: italic;">Complete doctype to render document...</p>`,
  },
  basic: {
    instruction: "Add the correct HTML heading tag to create the main title 'My First Heading'.",
    beforeCode: "<",
    placeholder: "h1",
    afterCode: ">My First Heading</h1>\n<p>My first paragraph.</p>",
    correctAnswer: "h1",
    hint: "The largest and most important heading in HTML is h1.",
    previewSnippet: (val) =>
      val.toLowerCase() === "h1"
        ? `<h1 style="font-size: 26px; font-weight: 700; margin: 0 0 6px; color: #111827;">My First Heading</h1><p style="margin: 0; color: #4b5563;">My first paragraph.</p>`
        : `<p style="margin: 0; color: #4b5563;">My first paragraph.</p>`,
  },
  elements: {
    instruction: "Insert an empty line-break element between the two lines of text.",
    beforeCode: "<p>This is the first line.",
    placeholder: "<br>",
    afterCode: "This is the second line.</p>",
    correctAnswer: ["<br>", "<br/>", "<br />"],
    hint: "The empty line break tag is <br>.",
    previewSnippet: (val) =>
      val.toLowerCase().includes("br")
        ? `<p style="margin: 0; line-height: 1.5;">This is the first line.<br/>This is the second line.</p>`
        : `<p style="margin: 0;">This is the first line. This is the second line.</p>`,
  },
  attributes: {
    instruction: "Add the title attribute with the value 'DevAcademy' to the paragraph.",
    beforeCode: "<p ",
    placeholder: 'title="DevAcademy"',
    afterCode: ">Hover over this paragraph to see the tooltip.</p>",
    correctAnswer: ['title="devacademy"', 'title="DevAcademy"', "title='DevAcademy'", "title='devacademy'"],
    hint: 'Type title="DevAcademy" into the attribute position.',
    previewSnippet: (val) =>
      val.toLowerCase().includes("title")
        ? `<p title="DevAcademy" style="margin: 0; cursor: help; border-bottom: 1px dotted #04aa6d; display: inline-block;">Hover over this paragraph to see the tooltip.</p>`
        : `<p style="margin: 0;">Hover over this paragraph to see the tooltip.</p>`,
  },
  headings: {
    instruction: "Use the correct HTML tag to create a sub-heading (Level 2 Heading).",
    beforeCode: "<",
    placeholder: "h2",
    afterCode: ">London</h2>\n<p>London is the capital of Great Britain.</p>",
    correctAnswer: "h2",
    hint: "Use h2 for level 2 headings.",
    previewSnippet: (val) =>
      val.toLowerCase() === "h2"
        ? `<h2 style="font-size: 22px; font-weight: 700; margin: 0 0 6px;">London</h2><p style="margin: 0; color: #4b5563;">London is the capital of Great Britain.</p>`
        : `<p style="margin: 0; color: #4b5563;">London is the capital of Great Britain.</p>`,
  },
  paragraphs: {
    instruction: "Wrap the text below in a paragraph element using the correct closing tag.",
    beforeCode: "<p>This is a paragraph.",
    placeholder: "</p>",
    afterCode: "",
    correctAnswer: "</p>",
    hint: "The closing tag for a paragraph is </p>.",
    previewSnippet: (val) =>
      val.toLowerCase() === "</p>"
        ? `<p style="margin: 0; color: #1e293b; font-weight: 500;">This is a paragraph.</p>`
        : `<span style="color: #64748b;">This is a paragraph... (tag unclosed)</span>`,
  },
  styles: {
    instruction: "Set the color of the heading to 'red' using the style attribute.",
    beforeCode: '<h1 style="color:',
    placeholder: "red",
    afterCode: ';">A Red Heading</h1>',
    correctAnswer: "red",
    hint: "Type the color value: red",
    previewSnippet: (val) =>
      val.toLowerCase() === "red"
        ? `<h2 style="color: red; margin: 0;">A Red Heading</h2>`
        : `<h2 style="color: #94a3b8; margin: 0;">A Red Heading</h2>`,
  },
  formatting: {
    instruction: "Mark the word 'important' as emphasized text using the <em> tag.",
    beforeCode: "<p>This is ",
    placeholder: "<em>important</em>",
    afterCode: " information.</p>",
    correctAnswer: ["<em>important</em>", "<em> important </em>"],
    hint: "Wrap 'important' with <em> and </em> tags.",
    previewSnippet: (val) =>
      val.toLowerCase().includes("em")
        ? `<p style="margin: 0;">This is <em>important</em> information.</p>`
        : `<p style="margin: 0;">This is important information.</p>`,
  },
  comments: {
    instruction: "Create an HTML comment containing the text 'TODO: Add header'.",
    beforeCode: "<!-- ",
    placeholder: "TODO: Add header",
    afterCode: " -->\n<p>Visible page content</p>",
    correctAnswer: ["todo: add header", "TODO: Add header"],
    hint: "Type 'TODO: Add header'",
    previewSnippet: () =>
      `<p style="margin: 0; color: #334155;">Visible page content <span style="font-size: 12px; color: #64748b;">(Comment is hidden in browser!)</span></p>`,
  },
  links: {
    instruction: "Add the href attribute to create a link to 'https://devacademy.id'.",
    beforeCode: "<a ",
    placeholder: 'href="https://devacademy.id"',
    afterCode: ">Visit DevAcademy</a>",
    correctAnswer: [
      'href="https://devacademy.id"',
      "href='https://devacademy.id'",
      'href="https://devacademy.id/"',
    ],
    hint: 'Enter href="https://devacademy.id"',
    previewSnippet: (val) =>
      val.toLowerCase().includes("href")
        ? `<a href="#" style="color: #04aa6d; font-weight: 700; text-decoration: underline;">Visit DevAcademy</a>`
        : `<span style="color: #94a3b8;">Visit DevAcademy (unlinked)</span>`,
  },
  images: {
    instruction: "Add the src attribute pointing to 'laptop.jpg' for the image element.",
    beforeCode: "<img ",
    placeholder: 'src="laptop.jpg"',
    afterCode: ' alt="Laptop" width="160">',
    correctAnswer: ['src="laptop.jpg"', "src='laptop.jpg'"],
    hint: 'Type src="laptop.jpg"',
    previewSnippet: (val) =>
      val.toLowerCase().includes("src")
        ? `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=240" alt="Laptop" style="border-radius: 6px; width: 160px; height: auto;" />`
        : `<span style="border: 1px dashed #cbd5e1; padding: 12px; border-radius: 4px; display: inline-block; color: #94a3b8;">[Image placeholder: specify src]</span>`,
  },
  tables: {
    instruction: "Create a table data cell with the content 'Active'.",
    beforeCode: "<tr><",
    placeholder: "td",
    afterCode: ">Active</td></tr>",
    correctAnswer: "td",
    hint: "Standard table cells use the <td> tag.",
    previewSnippet: (val) =>
      val.toLowerCase() === "td"
        ? `<table style="border: 1px solid #cbd5e1; border-collapse: collapse;"><tr style="background:#f1f5f9;"><td style="padding: 6px 14px; border: 1px solid #cbd5e1; color: #04aa6d; font-weight: 700;">Active</td></tr></table>`
        : `<span style="color: #94a3b8;">Table cell unrendered</span>`,
  },
  lists: {
    instruction: "Insert an unordered list tag to group the bulleted items.",
    beforeCode: "<",
    placeholder: "ul",
    afterCode: ">\n  <li>Coffee</li>\n  <li>Tea</li>\n</ul>",
    correctAnswer: "ul",
    hint: "Use ul for unordered (bulleted) lists.",
    previewSnippet: (val) =>
      val.toLowerCase() === "ul"
        ? `<ul style="margin: 0 0 0 20px; padding: 0;"><li>Coffee</li><li>Tea</li></ul>`
        : `<span style="color: #94a3b8;">List unrendered</span>`,
  },
  forms: {
    instruction: "Set the input type to 'text' for a username field.",
    beforeCode: '<input type="',
    placeholder: "text",
    afterCode: '" name="username" placeholder="Username">',
    correctAnswer: "text",
    hint: "Use type='text'",
    previewSnippet: (val) =>
      val.toLowerCase() === "text"
        ? `<input type="text" placeholder="Username" style="padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px;" />`
        : `<span style="color: #94a3b8;">Input type not set</span>`,
  },
};

export function getChapterExercise(slug: string): ChapterExercise {
  if (W3_CHAPTER_EXERCISES[slug]) {
    return W3_CHAPTER_EXERCISES[slug];
  }

  const currentItem = ALL_HTML_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    question: `What is the primary role of ${title} in HTML5?`,
    options: [
      `To structure and present ${title} according to W3C standards`,
      `To replace all CSS stylesheets on the page`,
      `To run server-side database queries directly`,
      `To disable browser JavaScript execution`,
    ],
    correctIndex: 0,
    explanation: `${title} is standardized by the W3C to structure content cleanly and semantically across all modern web browsers.`,
  };
}

export function getChapterChallenge(slug: string): ChapterChallenge {
  if (W3_CHAPTER_CHALLENGES[slug]) {
    return W3_CHAPTER_CHALLENGES[slug];
  }

  const currentItem = ALL_HTML_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();
  const cleanTag = slug.replace(/^ref-/, "").replace(/-.*$/, "").toLowerCase();

  return {
    instruction: `Add the correct HTML tag to demonstrate ${title} in the snippet below.`,
    beforeCode: `<`,
    placeholder: cleanTag || "div",
    afterCode: ` class="demo-${slug}">Content for ${title}</${cleanTag || "div"}>`,
    correctAnswer: [cleanTag || "div", `<${cleanTag || "div"}>`],
    hint: `Use the ${cleanTag || "div"} tag.`,
    previewSnippet: (val) =>
      val.toLowerCase().includes(cleanTag || "div")
        ? `<div style="padding: 12px 16px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; color: #166534; font-weight: 600;">Demonstrating ${title}</div>`
        : `<div style="padding: 12px; color: #94a3b8; font-style: italic;">Enter tag to render...</div>`,
  };
}

const HTML_SPECIFIC_REFERENCES: Record<string, {
  title: string;
  subtitle: string;
  lead: string;
  code: string;
  liveHtml: string;
  tableHeaders: string[];
  tableRows: string[][];
  tip: string;
  note: string;
}> = {
  "tag-list": {
    title: "HTML Tag List (Alphabetical & Categorized)",
    subtitle: "Complete reference of all valid HTML5 elements and semantic markup tags.",
    lead: "HTML tags are element names surrounded by angle brackets like <p>, <a>, and <div>. Most tags come in pairs with opening and closing tags.",
    code: `<!-- Essential HTML Elements -->\n<header>\n  <h1>DevAcademy Learning Portal</h1>\n  <nav>\n    <a href="/learn/html">HTML</a>\n    <a href="/learn/css">CSS</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Modern HTML5 Elements</h2>\n    <p>Semantic tags give meaning to structure.</p>\n  </article>\n</main>`,
    liveHtml: `<div style="font-family: sans-serif; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px;"><h3 style="margin: 0 0 6px; color: #04aa6d;">DevAcademy Portal</h3><p style="margin: 0; color: #475569;">Semantic tags give meaning to structure.</p></div>`,
    tableHeaders: ["Tag", "Description", "Category"],
    tableRows: [
      ["<a>", "Defines a hyperlink to another page or location", "Inline"],
      ["<abbr>", "Defines an abbreviation or an acronym", "Inline"],
      ["<article>", "Defines self-contained, independent article content", "Semantic Block"],
      ["<aside>", "Defines content tangentially related to content around it (sidebar)", "Semantic Block"],
      ["<button>", "Defines a clickable button control", "Form / Control"],
      ["<canvas>", "Used to draw 2D/3D graphics on the fly via JavaScript", "Graphics"],
      ["<div>", "Generic block-level division container for flow content", "Structure"],
      ["<form>", "Defines an interactive form for user input submission", "Form"],
      ["<h1> - <h6>", "Defines HTML headings from highest level (h1) to lowest (h6)", "Typography"],
      ["<img>", "Embeds an image using src and accessible alt attribute", "Media"],
      ["<input>", "Defines an input control (text, checkbox, radio, date, etc.)", "Form / Control"],
      ["<nav>", "Defines a section containing navigation links", "Semantic Block"],
      ["<p>", "Defines a block-level paragraph of text", "Typography"],
      ["<span>", "Generic inline container for phrasing content", "Inline"],
      ["<table>", "Defines tabular multi-column, multi-row data", "Data Display"],
      ["<ul> / <ol>", "Defines unordered (bulleted) or ordered (numbered) lists", "Lists"],
    ],
    tip: "Always prefer semantic elements like <main>, <nav>, and <article> over generic <div> tags to maximize SEO and accessibility.",
    note: "All elements listed conform to W3C and WHATWG HTML Living Standard specification.",
  },
  "ref-attributes": {
    title: "HTML Attributes Reference",
    subtitle: "Complete reference of standard HTML attributes that provide metadata and configure elements.",
    lead: "Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like name='value'.",
    code: `<a href="https://devacademy.id" target="_blank" rel="noopener" title="Visit DevAcademy">\n  Explore All Tutorials\n</a>\n\n<img src="/logo.png" alt="DevAcademy Logo" width="200" height="50" loading="lazy" />`,
    liveHtml: `<div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;"><a href="#" style="color: #04aa6d; font-weight: 700; text-decoration: none;">Explore All Tutorials &raquo;</a></div>`,
    tableHeaders: ["Attribute", "Applies To", "Description"],
    tableRows: [
      ["href", "<a>, <link>, <base>", "Specifies the target hyperlink URL"],
      ["src", "<img>, <script>, <iframe>, <video>", "Specifies the URL of the external resource to embed"],
      ["alt", "<img>, <area>, <input>", "Specifies alternate text description for accessibility"],
      ["width / height", "<img>, <canvas>, <video>, <iframe>", "Specifies the rendered dimension in pixels"],
      ["target", "<a>, <form>", "Specifies where to open the linked document (_blank, _self)"],
      ["type", "<input>, <button>, <link>, <script>", "Specifies the input control type or MIME type"],
      ["value", "<input>, <button>, <li>, <option>", "Specifies default or submitted value of control"],
      ["placeholder", "<input>, <textarea>", "Displays transient hint inside empty text input"],
      ["required", "<input>, <select>, <textarea>", "Specifies that input field must be filled before submit"],
      ["disabled", "<button>, <input>, <select>, <textarea>", "Disables the control so user cannot interact"],
    ],
    tip: "Always provide meaningful alt text for images to ensure blind or visually-impaired screen reader users can understand your content.",
    note: "Attribute names are case-insensitive, but W3C recommends lowercase attribute names.",
  },
  "global-attributes": {
    title: "HTML Global Attributes Reference",
    subtitle: "Attributes that can be specified on any valid HTML element.",
    lead: "Global attributes are attributes common to all HTML elements; they can be used on all elements, though they may have no effect on some.",
    code: `<div id="main-card" class="card shadow active" data-user-id="101" tabindex="0" title="Profile Details">\n  <p contenteditable="true">Click here to edit this text in real-time!</p>\n</div>`,
    liveHtml: `<div style="padding: 14px; background: #ffffff; border: 1.5px solid #04aa6d; border-radius: 8px;"><p style="margin: 0; font-weight: 600; color: #19232e;">Click here to edit this text in real-time!</p></div>`,
    tableHeaders: ["Attribute", "Description"],
    tableRows: [
      ["class", "Specifies one or more CSS class names for styling and JS DOM queries"],
      ["id", "Specifies a unique document-wide identifier for an element"],
      ["style", "Specifies inline CSS style rules directly on the element"],
      ["title", "Specifies extra tooltip information displayed on mouse hover"],
      ["data-*", "Stores custom private data attributes for JavaScript applications"],
      ["hidden", "Hides the element from display until conditions are met"],
      ["tabindex", "Specifies the focus order when navigating with the Tab key"],
      ["contenteditable", "Allows the user to edit element text directly in the browser"],
      ["dir", "Specifies reading direction (ltr: left-to-right, rtl: right-to-left)"],
      ["lang", "Specifies the primary language code of the element's content"],
    ],
    tip: "Use data-* attributes to store custom metadata without inventing invalid non-standard HTML attributes.",
    note: "Global attributes are fully supported across all modern web browsers.",
  },
  "browser-support": {
    title: "HTML Browser Support & Compatibility",
    subtitle: "Compatibility matrix for modern HTML5 features across major desktop and mobile browsers.",
    lead: "All modern evergreen browsers (Chrome, Edge, Firefox, Safari, and Opera) support modern HTML5 specifications natively.",
    code: `<!-- Modern feature detection -->\n<picture>\n  <source srcset="photo.webp" type="image/webp">\n  <img src="photo.jpg" alt="Scenic Landscape" loading="lazy">\n</picture>`,
    liveHtml: `<div style="padding: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; color: #065f46; font-weight: 600;">HTML5 Native Standards Fully Supported</div>`,
    tableHeaders: ["Feature", "Chrome", "Edge", "Firefox", "Safari", "Opera"],
    tableRows: [
      ["HTML5 Semantic Tags", "Full (v1.0+)", "Full (v12+)", "Full (v4.0+)", "Full (v5.0+)", "Full (v11+)"],
      ["<canvas> 2D/WebGL", "Full (v4.0+)", "Full (v12+)", "Full (v2.0+)", "Full (v3.1+)", "Full (v9.0+)"],
      ["<audio> & <video>", "Full (v3.0+)", "Full (v12+)", "Full (v3.5+)", "Full (v3.1+)", "Full (v10.5+)"],
      ["Web Storage (localStorage)", "Full (v4.0+)", "Full (v12+)", "Full (v3.5+)", "Full (v4.0+)", "Full (v11.5+)"],
      ["Geolocation API", "Full (v5.0+)", "Full (v12+)", "Full (v3.5+)", "Full (v5.0+)", "Full (v10.6+)"],
      ["Responsive <picture>", "Full (v38+)", "Full (v13+)", "Full (v38+)", "Full (v9.1+)", "Full (v25+)"],
    ],
    tip: "Use progressive enhancement so your core content remains readable even on legacy browsers.",
    note: "Data source: WHATWG, MDN Browser Compatibility Matrix, and CanIUse database.",
  },
  "event-attributes": {
    title: "HTML Event Attributes Reference",
    subtitle: "Standard event attributes that listen for user interactions and trigger JavaScript handlers.",
    lead: "HTML event handler attributes allow you to execute JavaScript code when events happen on specific elements.",
    code: `<button onclick="alert('Hello from DevAcademy!')">\n  Click Me\n</button>\n\n<input type="text" onfocus="this.style.borderColor='#04aa6d'" onblur="this.style.borderColor='#cbd5e1'" placeholder="Type here..." />`,
    liveHtml: `<div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;"><button style="padding: 8px 16px; background: #04aa6d; color: #fff; border: none; border-radius: 4px; font-weight: 700; cursor: pointer;">Interactive Button</button></div>`,
    tableHeaders: ["Event Attribute", "Trigger Condition", "Target Elements"],
    tableRows: [
      ["onclick", "Fires when element is clicked with mouse or keyboard Enter", "All visible elements"],
      ["ondblclick", "Fires when element is double-clicked", "All visible elements"],
      ["onchange", "Fires when input or selection value committed change", "<input>, <select>, <textarea>"],
      ["onsubmit", "Fires when a form is submitted", "<form>"],
      ["onkeydown / onkeyup", "Fires when a keyboard key is pressed or released", "Focusable elements"],
      ["onfocus / onblur", "Fires when element gains or loses user focus", "<input>, <a>, <button>"],
      ["onmouseover / onmouseout", "Fires when cursor enters or leaves element bounds", "All elements"],
      ["onload", "Fires after page or media completes full loading", "<body>, <img>, <iframe>"],
    ],
    tip: "In modern production applications, addEventListener() in JavaScript is preferred over inline onclick attributes for clean separation of concerns.",
    note: "Event attribute values can contain inline JS expressions or function calls.",
  },
  "ref-colors": {
    title: "HTML Color Names & Palette Reference",
    subtitle: "Comprehensive guide to 140 standard CSS/HTML color names, HEX codes, and RGB values.",
    lead: "Colors in HTML can be expressed by standard color names, HEX codes (#RRGGBB), RGB values rgb(r, g, b), or HSL hsl(h, s%, l%).",
    code: `<div style="background-color: #04aa6d; color: #ffffff; padding: 16px; border-radius: 6px;">\n  DevAcademy Signature Green (#04AA6D)\n</div>\n<p style="color: rgb(234, 45, 46);">Java Crimson (#EA2D2E)</p>\n<p style="color: hsl(207, 90%, 54%);">Python Cerulean (#387EB8)</p>`,
    liveHtml: `<div style="display: flex; gap: 8px; flex-wrap: wrap;"><div style="padding: 8px 14px; background: #04aa6d; color: #fff; border-radius: 4px; font-weight: 700;">#04AA6D</div><div style="padding: 8px 14px; background: #387eb8; color: #fff; border-radius: 4px; font-weight: 700;">#387EB8</div><div style="padding: 8px 14px; background: #ea2d2e; color: #fff; border-radius: 4px; font-weight: 700;">#EA2D2E</div><div style="padding: 8px 14px; background: #f59e0b; color: #000; border-radius: 4px; font-weight: 700;">#F59E0B</div></div>`,
    tableHeaders: ["Color Name", "HEX Code", "RGB Value", "Swatch"],
    tableRows: [
      ["DevAcademy Green", "#04AA6D", "rgb(4, 170, 109)", "Brand Primary"],
      ["Black", "#000000", "rgb(0, 0, 0)", "Standard"],
      ["White", "#FFFFFF", "rgb(255, 255, 255)", "Standard"],
      ["Red", "#FF0000", "rgb(255, 0, 0)", "Primary"],
      ["Lime", "#00FF00", "rgb(0, 255, 0)", "Primary"],
      ["Blue", "#0000FF", "rgb(0, 0, 255)", "Primary"],
      ["Dark Slate Gray", "#2F4F4F", "rgb(47, 79, 79)", "Theme Dark"],
      ["Dodger Blue", "#1E90FF", "rgb(30, 144, 255)", "Web Standard"],
      ["Gold", "#FFD700", "rgb(255, 215, 0)", "Accent"],
      ["Tomato", "#FF6347", "rgb(255, 99, 71)", "Warm Accent"],
    ],
    tip: "Check color contrast ratios (WCAG 4.5:1 minimum) between text and background for high readability.",
    note: "All 140 standard color names are supported by HTML5 and all modern browsers.",
  },
  "status-codes": {
    title: "HTTP Status Codes & Messages Reference",
    subtitle: "Complete reference of HTTP status codes returned by web servers to web browsers.",
    lead: "Every time your browser requests a web page, image, or API endpoint, the web server responds with a 3-digit HTTP status code.",
    code: `// Fetch request inspecting response status\nfetch("/api/auth/me")\n  .then(res => {\n    if (res.status === 200) console.log("Success: OK");\n    else if (res.status === 401) console.log("Unauthorized: Please sign in");\n    else if (res.status === 404) console.log("Not Found");\n  });`,
    liveHtml: `<div style="padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-family: monospace; color: #166534;">HTTP/1.1 200 OK<br/>Content-Type: text/html; charset=UTF-8</div>`,
    tableHeaders: ["Status Code", "Message", "Class", "Description"],
    tableRows: [
      ["200", "OK", "2xx Success", "The request has succeeded and the payload was returned"],
      ["201", "Created", "2xx Success", "The request succeeded and a new resource was created"],
      ["204", "No Content", "2xx Success", "Request succeeded with no body returned"],
      ["301", "Moved Permanently", "3xx Redirection", "Resource has been assigned a new permanent URI"],
      ["304", "Not Modified", "3xx Redirection", "Client cached copy is up to date, no download needed"],
      ["400", "Bad Request", "4xx Client Error", "The server cannot process request due to malformed syntax"],
      ["401", "Unauthorized", "4xx Client Error", "Authentication credentials are required or failed"],
      ["403", "Forbidden", "4xx Client Error", "Server understood request but refuses authorization"],
      ["404", "Not Found", "4xx Client Error", "The server has not found anything matching the requested URI"],
      ["500", "Internal Server Error", "5xx Server Error", "The server encountered an unexpected error"],
      ["502", "Bad Gateway", "5xx Server Error", "Server received an invalid response from upstream"],
      ["503", "Service Unavailable", "5xx Server Error", "The server is currently unable to handle request (overloaded/down)"],
    ],
    tip: "Always handle 401, 403, and 404 gracefully in frontend fetch calls to provide great user feedback.",
    note: "HTTP status codes are standardized by IETF in RFC 9110.",
  },
  "px-to-em": {
    title: "PX to EM & REM Converter Reference",
    subtitle: "Reference table and conversion guide between pixels (px), relative ems (em), and root rems (rem).",
    lead: "EM and REM are scalable, accessible CSS units. 1em or 1rem equals the computed font size of the parent or root element (default 16px in browsers).",
    code: `/* Relative typography in CSS */\nhtml {\n  font-size: 16px; /* 1rem = 16px */\n}\nh1 {\n  font-size: 2rem; /* 32px */\n  margin-bottom: 0.5em; /* 16px */\n}\np {\n  font-size: 1rem; /* 16px */\n  line-height: 1.5; /* 24px */\n}`,
    liveHtml: `<div style="font-size: 16px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px;"><div style="font-size: 1.5rem; font-weight: 700; color: #04aa6d;">1.5rem = 24px Heading</div><div style="font-size: 1rem; color: #475569;">1.0rem = 16px Body Paragraph</div></div>`,
    tableHeaders: ["Pixels (px)", "Base 16px (em/rem)", "Percentage (%)", "Typical Usage"],
    tableRows: [
      ["10px", "0.625em", "62.5%", "Fine print / badges"],
      ["12px", "0.75em", "75%", "Captions, secondary labels"],
      ["14px", "0.875em", "87.5%", "UI buttons, tables, small body"],
      ["16px", "1.0em", "100%", "Standard Browser Body Default"],
      ["18px", "1.125em", "112.5%", "Lead paragraphs, large buttons"],
      ["20px", "1.25em", "125%", "Sub-headings (h4)"],
      ["24px", "1.5em", "150%", "Section headings (h3)"],
      ["32px", "2.0em", "200%", "Page titles (h2)"],
      ["48px", "3.0em", "300%", "Hero headlines (h1)"],
    ],
    tip: "Using rem units for fonts and padding ensures your site respects the user's custom browser font size preferences.",
    note: "Formula: EM = Desired Pixels / Parent Base Pixels (e.g. 24 / 16 = 1.5em).",
  },
  "keyboard-shortcuts": {
    title: "Developer Keyboard Shortcuts Reference",
    subtitle: "Essential productivity shortcuts for VS Code, browser DevTools, and code editing.",
    lead: "Mastering keyboard shortcuts accelerates coding velocity, debugging, and terminal navigation.",
    code: `// Tip: In DevAcademy Tryit Editor\n// Press Ctrl + S (or Cmd + S) to execute code instantly!`,
    liveHtml: `<div style="padding: 12px; background: #0f172a; color: #38bdf8; border-radius: 6px; font-family: monospace;">$ press Ctrl + Shift + I to inspect element</div>`,
    tableHeaders: ["Windows / Linux", "macOS", "Action / Command"],
    tableRows: [
      ["Ctrl + S", "Cmd + S", "Save current file / Run code in Tryit editor"],
      ["Ctrl + Shift + I (or F12)", "Cmd + Option + I", "Open Browser Developer Tools (Inspect)"],
      ["Ctrl + P", "Cmd + P", "Quick Open files by filename in VS Code"],
      ["Ctrl + /", "Cmd + /", "Toggle line comment (HTML, CSS, JS, Python)"],
      ["Ctrl + D", "Cmd + D", "Select next matching occurrence of highlighted word"],
      ["Alt + Up / Down", "Option + Up / Down", "Move current line of code up or down"],
      ["Ctrl + Shift + K", "Cmd + Shift + K", "Delete entire current line"],
      ["Ctrl + \` (Backtick)", "Cmd + \` (Backtick)", "Toggle Integrated Terminal"],
      ["Ctrl + Space", "Cmd + Space", "Trigger autocomplete & IntelliSense suggestions"],
      ["F5 / Ctrl + R", "Cmd + R", "Reload current webpage"],
    ],
    tip: "Customize keybindings in VS Code via File > Preferences > Keyboard Shortcuts.",
    note: "Shortcuts apply across VS Code, DevAcademy Code Editor, Chrome DevTools, and Edge DevTools.",
  },
};

export function getChapterData(slug: string): W3ChapterData {
  const currentIndex = ALL_HTML_CHAPTERS.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? ALL_HTML_CHAPTERS[currentIndex - 1] : ALL_HTML_CHAPTERS[0];
  const nextChapter = currentIndex >= 0 && currentIndex < ALL_HTML_CHAPTERS.length - 1 
    ? ALL_HTML_CHAPTERS[currentIndex + 1] 
    : ALL_HTML_CHAPTERS[ALL_HTML_CHAPTERS.length - 1];

  if (W3_HTML_CHAPTERS[slug]) {
    const existing = W3_HTML_CHAPTERS[slug];
    return {
      ...existing,
      prevSlug: prevChapter.slug,
      nextSlug: nextChapter.slug,
    };
  }

  if (HTML_SPECIFIC_REFERENCES[slug]) {
    const refItem = HTML_SPECIFIC_REFERENCES[slug];
    return {
      title: refItem.title,
      subtitle: refItem.subtitle,
      prevSlug: prevChapter ? prevChapter.slug : "home",
      nextSlug: nextChapter ? nextChapter.slug : "introduction",
      sections: [
        {
          title: `Overview: ${refItem.title}`,
          lead: refItem.lead,
          paragraphs: [refItem.lead],
          codeSnippet: {
            code: refItem.code,
            liveHtml: refItem.liveHtml,
          },
          tip: refItem.tip,
        },
        {
          title: "Complete Reference Table",
          paragraphs: [
            `Detailed reference specifications for ${refItem.title} on DevAcademy:`,
          ],
          table: {
            headers: refItem.tableHeaders,
            rows: refItem.tableRows,
          },
          note: refItem.note,
        },
      ],
    };
  }

  const currentItem = ALL_HTML_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();
  
  return {
    title: title,
    subtitle: `Learn all about ${title} in HTML with practical examples, syntax guides, and interactive try-it-yourself demonstrations.`,
    prevSlug: prevChapter ? prevChapter.slug : "home",
    nextSlug: nextChapter ? nextChapter.slug : "introduction",
    sections: [
      {
        title: `Understanding ${title}`,
        paragraphs: [
          `${title} is an essential part of modern HTML web development.`,
          `It enables web developers to structure web documents efficiently, improve accessibility, and provide rich interactive experiences across all web browsers.`,
        ],
        codeSnippet: {
          code: `<!-- Example of ${title} -->\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>${title} Demonstration</h2>\n<p>This is an authentic HTML example demonstrating ${title}.</p>\n\n</body>\n</html>`,
          liveHtml: `<div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;"><h3 style="margin: 0 0 8px; color: #04aa6d;">${title} Demonstration</h3><p style="margin: 0; color: #4b5563;">This is a live rendered preview demonstrating ${title} on DevAcademy.</p></div>`,
        },
        tip: `Always adhere to W3C standards and clean semantic HTML when using ${title}.`,
      },
      {
        title: "Syntax and Usage",
        paragraphs: [
          `When implementing ${title}, ensure all tags are properly closed, attributes are surrounded by quotes, and modern browser standards are respected.`,
        ],
        table: {
          headers: ["Property / Element", "Description", "Standard"],
          rows: [
            ["Default", `Standard implementation for ${title}`, "HTML5"],
            ["Supported", "Chrome, Edge, Firefox, Safari, Opera", "Universal"],
            ["Accessibility", "WCAG 2.1 AA Compliant", "Recommended"],
          ],
        },
        note: `For the latest updates and browser compatibility tables, check the HTML references section.`,
      },
    ],
  };
}
