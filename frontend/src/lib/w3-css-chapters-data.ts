import { ChapterItem, SidebarSection, W3ChapterData, ChapterExercise, ChapterChallenge } from "./w3-html-chapters-data";

const makeCssSubItems = (name: string, slug: string) => [
  { name: name.replace(/^CSS\s+/i, ""), slug: slug },
  { name: "Exercise", slug: "exercises" },
];

export const CSS_SECTIONS: SidebarSection[] = [
  {
    title: "CSS TUTORIAL",
    items: [
      { name: "CSS HOME", slug: "home" },
      { name: "CSS Introduction", slug: "introduction", hasCaret: true, subItems: makeCssSubItems("Introduction", "introduction") },
      { name: "CSS Syntax", slug: "syntax", hasCaret: true, subItems: makeCssSubItems("Syntax", "syntax") },
      { name: "CSS Selectors", slug: "selectors", hasCaret: true, subItems: makeCssSubItems("Selectors", "selectors") },
      { name: "CSS How To", slug: "how-to", hasCaret: true, subItems: makeCssSubItems("How To", "how-to") },
      { name: "CSS Comments", slug: "comments", hasCaret: true, subItems: makeCssSubItems("Comments", "comments") },
      { name: "CSS Colors", slug: "colors", hasCaret: true, subItems: makeCssSubItems("Colors", "colors") },
      { name: "CSS Backgrounds", slug: "backgrounds", hasCaret: true, subItems: makeCssSubItems("Backgrounds", "backgrounds") },
      { name: "CSS Borders", slug: "borders", hasCaret: true, subItems: makeCssSubItems("Borders", "borders") },
      { name: "CSS Margins", slug: "margins", hasCaret: true, subItems: makeCssSubItems("Margins", "margins") },
      { name: "CSS Padding", slug: "padding", hasCaret: true, subItems: makeCssSubItems("Padding", "padding") },
      { name: "CSS Height/Width", slug: "height-width", hasCaret: true, subItems: makeCssSubItems("Height/Width", "height-width") },
      { name: "CSS Box Model", slug: "box-model", hasCaret: true, subItems: makeCssSubItems("Box Model", "box-model") },
      { name: "CSS Outline", slug: "outline", hasCaret: true, subItems: makeCssSubItems("Outline", "outline") },
      { name: "CSS Text", slug: "text", hasCaret: true, subItems: makeCssSubItems("Text", "text") },
      { name: "CSS Fonts", slug: "fonts", hasCaret: true, subItems: makeCssSubItems("Fonts", "fonts") },
      { name: "CSS Icons", slug: "icons", hasCaret: true, subItems: makeCssSubItems("Icons", "icons") },
      { name: "CSS Links", slug: "links", hasCaret: true, subItems: makeCssSubItems("Links", "links") },
      { name: "CSS Lists", slug: "lists", hasCaret: true, subItems: makeCssSubItems("Lists", "lists") },
      { name: "CSS Tables", slug: "tables", hasCaret: true, subItems: makeCssSubItems("Tables", "tables") },
      { name: "CSS Display", slug: "display", hasCaret: true, subItems: makeCssSubItems("Display", "display") },
      { name: "CSS Max-width", slug: "max-width", hasCaret: true, subItems: makeCssSubItems("Max-width", "max-width") },
      { name: "CSS Position", slug: "position", hasCaret: true, subItems: makeCssSubItems("Position", "position") },
      { name: "CSS Z-index", slug: "z-index", hasCaret: true, subItems: makeCssSubItems("Z-index", "z-index") },
      { name: "CSS Overflow", slug: "overflow", hasCaret: true, subItems: makeCssSubItems("Overflow", "overflow") },
      { name: "CSS Float", slug: "float", hasCaret: true, subItems: makeCssSubItems("Float", "float") },
      { name: "CSS Inline-block", slug: "inline-block", hasCaret: true, subItems: makeCssSubItems("Inline-block", "inline-block") },
      { name: "CSS Align", slug: "align", hasCaret: true, subItems: makeCssSubItems("Align", "align") },
      { name: "CSS Combinators", slug: "combinators", hasCaret: true, subItems: makeCssSubItems("Combinators", "combinators") },
      { name: "CSS Pseudo-class", slug: "pseudo-class", hasCaret: true, subItems: makeCssSubItems("Pseudo-class", "pseudo-class") },
      { name: "CSS Pseudo-element", slug: "pseudo-element", hasCaret: true, subItems: makeCssSubItems("Pseudo-element", "pseudo-element") },
      { name: "CSS Opacity", slug: "opacity", hasCaret: true, subItems: makeCssSubItems("Opacity", "opacity") },
      { name: "CSS Navigation Bar", slug: "navigation-bar", hasCaret: true, subItems: makeCssSubItems("Navigation Bar", "navigation-bar") },
      { name: "CSS Dropdowns", slug: "dropdowns", hasCaret: true, subItems: makeCssSubItems("Dropdowns", "dropdowns") },
      { name: "CSS Image Gallery", slug: "image-gallery", hasCaret: true, subItems: makeCssSubItems("Image Gallery", "image-gallery") },
      { name: "CSS Forms", slug: "forms", hasCaret: true, subItems: makeCssSubItems("Forms", "forms") },
      { name: "CSS Website Layout", slug: "website-layout", hasCaret: true, subItems: makeCssSubItems("Website Layout", "website-layout") },
    ],
  },
  {
    title: "CSS ADVANCED",
    items: [
      { name: "CSS Rounded Corners", slug: "rounded-corners", hasCaret: true, subItems: makeCssSubItems("Rounded Corners", "rounded-corners") },
      { name: "CSS Border Images", slug: "border-images", hasCaret: true, subItems: makeCssSubItems("Border Images", "border-images") },
      { name: "CSS Gradients", slug: "gradients", hasCaret: true, subItems: makeCssSubItems("Gradients", "gradients") },
      { name: "CSS Shadows", slug: "shadows", hasCaret: true, subItems: makeCssSubItems("Shadows", "shadows") },
      { name: "CSS Text Effects", slug: "text-effects", hasCaret: true, subItems: makeCssSubItems("Text Effects", "text-effects") },
      { name: "CSS Web Fonts", slug: "web-fonts", hasCaret: true, subItems: makeCssSubItems("Web Fonts", "web-fonts") },
      { name: "CSS 2D Transforms", slug: "2d-transforms", hasCaret: true, subItems: makeCssSubItems("2D Transforms", "2d-transforms") },
      { name: "CSS 3D Transforms", slug: "3d-transforms", hasCaret: true, subItems: makeCssSubItems("3D Transforms", "3d-transforms") },
      { name: "CSS Transitions", slug: "transitions", hasCaret: true, subItems: makeCssSubItems("Transitions", "transitions") },
      { name: "CSS Animations", slug: "animations", hasCaret: true, subItems: makeCssSubItems("Animations", "animations") },
      { name: "CSS Tooltips", slug: "tooltips", hasCaret: true, subItems: makeCssSubItems("Tooltips", "tooltips") },
      { name: "CSS Style Images", slug: "style-images", hasCaret: true, subItems: makeCssSubItems("Style Images", "style-images") },
      { name: "CSS Image Reflection", slug: "image-reflection" },
      { name: "CSS object-fit", slug: "object-fit" },
      { name: "CSS Masking", slug: "masking", hasCaret: true, subItems: makeCssSubItems("Masking", "masking") },
      { name: "CSS Buttons", slug: "css-buttons", hasCaret: true, subItems: makeCssSubItems("Buttons", "css-buttons") },
      { name: "CSS Pagination", slug: "pagination", hasCaret: true, subItems: makeCssSubItems("Pagination", "pagination") },
      { name: "CSS Multiple Columns", slug: "multiple-columns", hasCaret: true, subItems: makeCssSubItems("Multiple Columns", "multiple-columns") },
      { name: "CSS User Interface", slug: "user-interface", hasCaret: true, subItems: makeCssSubItems("User Interface", "user-interface") },
      { name: "CSS Variables", slug: "variables", hasCaret: true, subItems: makeCssSubItems("Variables", "variables") },
      { name: "CSS Box Sizing", slug: "box-sizing", hasCaret: true, subItems: makeCssSubItems("Box Sizing", "box-sizing") },
      { name: "CSS Media Queries", slug: "media-queries", hasCaret: true, subItems: makeCssSubItems("Media Queries", "media-queries") },
    ],
  },
  {
    title: "CSS RESPONSIVE",
    items: [
      { name: "RWD Intro", slug: "rwd-intro" },
      { name: "RWD Viewport", slug: "rwd-viewport" },
      { name: "RWD Grid View", slug: "rwd-grid" },
      { name: "RWD Media Queries", slug: "rwd-mediaqueries" },
      { name: "RWD Images", slug: "rwd-images" },
      { name: "RWD Videos", slug: "rwd-videos" },
      { name: "RWD Frameworks", slug: "rwd-frameworks" },
      { name: "RWD Templates", slug: "rwd-templates" },
    ],
  },
  {
    title: "CSS GRID & FLEXBOX",
    items: [
      { name: "CSS Flexbox", slug: "flexbox", hasCaret: true, subItems: makeCssSubItems("Flexbox", "flexbox") },
      { name: "CSS Grid", slug: "grid", hasCaret: true, subItems: makeCssSubItems("Grid", "grid") },
    ],
  },
  {
    title: "CSS EXAMPLES",
    items: [
      { name: "CSS Examples", slug: "css-examples" },
      { name: "CSS Editor", slug: "css-editor" },
      { name: "CSS Snippets", slug: "css-snippets" },
      { name: "CSS Quiz", slug: "css-quiz" },
      { name: "CSS Exercises", slug: "css-exercises" },
      { name: "CSS Challenges", slug: "css-challenges" },
    ],
  },
  {
    title: "CSS REFERENCES",
    items: [
      { name: "CSS Reference", slug: "css-ref" },
      { name: "CSS Selectors Reference", slug: "css-selectors-ref" },
      { name: "CSS Functions", slug: "css-functions-ref" },
      { name: "CSS Animatable", slug: "css-animatable-ref" },
      { name: "CSS Units", slug: "css-units-ref" },
      { name: "CSS Colors", slug: "css-colors-ref" },
      { name: "CSS Browser Support", slug: "css-browser-support" },
    ],
  },
];

export const ALL_CSS_CHAPTERS: ChapterItem[] = CSS_SECTIONS.flatMap(s => s.items);

export const W3_CSS_CHAPTERS: Record<string, W3ChapterData> = {
  introduction: {
    title: "CSS Introduction",
    subtitle: "CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed.",
    prevSlug: "home",
    nextSlug: "syntax",
    sections: [
      {
        title: "What is CSS?",
        paragraphs: [
          "CSS stands for Cascading Style Sheets.",
          "CSS describes how HTML elements are to be displayed on screen, paper, or in other media.",
          "CSS saves a lot of work. It can control the layout of multiple web pages all at once.",
          "External stylesheets are stored in CSS files (.css).",
        ],
        codeSnippet: {
          code: `body {\n  background-color: lightblue;\n}\n\nh1 {\n  color: white;\n  text-align: center;\n}\n\np {\n  font-family: verdana;\n  font-size: 20px;\n}`,
          liveHtml: `<div style="background-color: #e0f2fe; padding: 18px; border-radius: 6px;"><h2 style="color: #0369a1; text-align: center; margin: 0 0 10px;">My First CSS Example</h2><p style="font-family: verdana; font-size: 15px; color: #334155; margin: 0; text-align: center;">This is a styled paragraph.</p></div>`,
        },
      },
      {
        title: "Why Use CSS?",
        paragraphs: [
          "CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.",
        ],
        tip: "Before CSS, tags like <font>, color attributes, and tables were used for styling, making HTML complex and unmaintainable. CSS solved this big problem by separating content from presentation.",
      },
    ],
  },
  syntax: {
    title: "CSS Syntax",
    subtitle: "A CSS rule-set consists of a selector and a declaration block.",
    prevSlug: "introduction",
    nextSlug: "selectors",
    sections: [
      {
        title: "CSS Syntax Breakdown",
        paragraphs: [
          "The selector points to the HTML element you want to style.",
          "The declaration block contains one or more declarations separated by semicolons.",
          "Each declaration includes a CSS property name and a value, separated by a colon.",
        ],
        codeSnippet: {
          code: `p {\n  color: red;\n  text-align: center;\n}`,
          liveHtml: `<p style="color: red; text-align: center; margin: 0; font-weight: 600;">This text is styled with red color and centered alignment.</p>`,
        },
      },
    ],
  },
  selectors: {
    title: "CSS Selectors",
    subtitle: "CSS selectors are used to find (or select) the HTML elements you want to style.",
    prevSlug: "syntax",
    nextSlug: "how-to",
    sections: [
      {
        title: "CSS Element Selector",
        paragraphs: [
          "The element selector selects HTML elements based on the element name.",
        ],
        codeSnippet: {
          code: `p {\n  text-align: center;\n  color: #04aa6d;\n}`,
          liveHtml: `<p style="text-align: center; color: #04aa6d; font-weight: 700; margin: 0;">Every <p> element is affected by this selector.</p>`,
        },
      },
    ],
  },
  colors: {
    title: "CSS Colors",
    subtitle: "Colors are specified using predefined color names, RGB, HEX, HSL, RGBA, HSLA values.",
    prevSlug: "comments",
    nextSlug: "backgrounds",
    sections: [
      {
        title: "CSS Color Names",
        paragraphs: [
          "In CSS, a color can be specified by using a predefined color name like Tomato, Orange, DodgerBlue, MediumSeaGreen.",
        ],
        codeSnippet: {
          code: `<h1 style="color:DodgerBlue;">Hello World</h1>`,
          liveHtml: `<h2 style="color: DodgerBlue; margin: 0;">Hello World in DodgerBlue</h2>`,
        },
      },
    ],
  },
  flexbox: {
    title: "CSS Flexbox",
    subtitle: "The Flexible Box Layout Module makes it easier to design flexible responsive layout structure.",
    prevSlug: "website-layout",
    nextSlug: "grid",
    sections: [
      {
        title: "The CSS Flexbox Container",
        paragraphs: [
          "To use flexbox, set the display property of the parent container to flex.",
        ],
        codeSnippet: {
          code: `.flex-container {\n  display: flex;\n  gap: 12px;\n}`,
          liveHtml: `<div style="display: flex; gap: 10px;"><div style="background: #04aa6d; color: white; padding: 12px 20px; border-radius: 4px; font-weight: 700;">1</div><div style="background: #04aa6d; color: white; padding: 12px 20px; border-radius: 4px; font-weight: 700;">2</div><div style="background: #04aa6d; color: white; padding: 12px 20px; border-radius: 4px; font-weight: 700;">3</div></div>`,
        },
      },
    ],
  },
  grid: {
    title: "CSS Grid Layout",
    subtitle: "CSS Grid Layout offers a grid-based layout system, with rows and columns.",
    prevSlug: "flexbox",
    nextSlug: "css-examples",
    sections: [
      {
        title: "Grid Container",
        paragraphs: [
          "An HTML element becomes a grid container when its display property is set to grid.",
        ],
        codeSnippet: {
          code: `.grid-container {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n}`,
          liveHtml: `<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;"><div style="background: #1e293b; color: white; padding: 16px; border-radius: 4px; text-align: center;">Item 1</div><div style="background: #1e293b; color: white; padding: 16px; border-radius: 4px; text-align: center;">Item 2</div><div style="background: #1e293b; color: white; padding: 16px; border-radius: 4px; text-align: center;">Item 3</div></div>`,
        },
      },
    ],
  },
  "how-to": {
    title: "How to Add CSS",
    subtitle: "When a browser reads a style sheet, it will format the HTML document according to the information in the style sheet.",
    prevSlug: "selectors",
    nextSlug: "comments",
    sections: [
      {
        title: "Three Ways to Insert CSS",
        paragraphs: [
          "There are three ways of inserting a style sheet into an HTML document:",
        ],
        bullets: [
          "External CSS (via <link rel=\"stylesheet\" href=\"mystyle.css\"> in <head>)",
          "Internal CSS (via <style> element in <head>)",
          "Inline CSS (via style attribute in HTML elements)",
        ],
        codeSnippet: {
          code: `<!-- External CSS Example -->\n<head>\n  <link rel="stylesheet" href="mystyle.css">\n</head>`,
        },
        tip: "An external style sheet can be written in any text editor, and must be saved with a .css extension. External style sheets are the recommended professional standard.",
      },
    ],
  },
  comments: {
    title: "CSS Comments",
    subtitle: "CSS comments are not displayed in the browser, but they can help document your source code.",
    prevSlug: "how-to",
    nextSlug: "colors",
    sections: [
      {
        title: "CSS Comment Syntax",
        paragraphs: [
          "A CSS comment is placed inside the <style> element, and starts with /* and ends with */:",
        ],
        codeSnippet: {
          code: `/* This is a single-line comment */\np {\n  color: red;\n}\n\n/* This is\na multi-line\ncomment */`,
          liveHtml: `<p style="color: red; margin: 0; font-weight: 600;">This text is red. The comment was ignored by the browser.</p>`,
        },
      },
    ],
  },
  backgrounds: {
    title: "CSS Backgrounds",
    subtitle: "The CSS background properties are used to add background effects for elements.",
    prevSlug: "colors",
    nextSlug: "borders",
    sections: [
      {
        title: "CSS background-color",
        paragraphs: [
          "The background-color property specifies the background color of an element.",
        ],
        codeSnippet: {
          code: `body {\n  background-color: lightblue;\n}\n\nh1 {\n  background-color: green;\n}`,
          liveHtml: `<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 6px;"><h3 style="background-color: #04aa6d; color: white; padding: 8px 12px; margin: 0 0 8px; border-radius: 4px;">Green Header</h3><p style="margin: 0; color: #166534;">Light background area</p></div>`,
        },
      },
      {
        title: "CSS Background Properties",
        table: {
          headers: ["Property", "Description"],
          rows: [
            ["background", "Sets all the background properties in one declaration"],
            ["background-attachment", "Sets whether a background image is fixed or scrolls with the page"],
            ["background-color", "Sets the background color of an element"],
            ["background-image", "Sets the background image for an element"],
            ["background-position", "Sets the starting position of a background image"],
            ["background-repeat", "Sets how a background image will be repeated"],
          ],
        },
      },
    ],
  },
  borders: {
    title: "CSS Borders",
    subtitle: "The CSS border properties allow you to specify the style, width, and color of an element's border.",
    prevSlug: "backgrounds",
    nextSlug: "margins",
    sections: [
      {
        title: "CSS Border Style",
        paragraphs: [
          "The border-style property specifies what kind of border to display.",
          "The following values are allowed:",
        ],
        bullets: [
          "dotted - Defines a dotted border",
          "dashed - Defines a dashed border",
          "solid - Defines a solid border",
          "double - Defines a double border",
          "groove - Defines a 3D grooved border",
          "ridge - Defines a 3D ridged border",
          "inset - Defines a 3D inset border",
          "outset - Defines a 3D outset border",
          "none - Defines no border",
          "hidden - Defines a hidden border",
        ],
        codeSnippet: {
          code: `p.dotted {border-style: dotted;}\np.dashed {border-style: dashed;}\np.solid {border-style: solid;}\np.double {border-style: double;}`,
          liveHtml: `<div style="display: flex; flex-direction: column; gap: 8px;"><div style="border: 2px dotted #04aa6d; padding: 8px;">A dotted border.</div><div style="border: 2px dashed #04aa6d; padding: 8px;">A dashed border.</div><div style="border: 2px solid #04aa6d; padding: 8px;">A solid border.</div><div style="border: 4px double #04aa6d; padding: 8px;">A double border.</div></div>`,
        },
      },
      {
        title: "CSS Border Shorthand",
        paragraphs: [
          "The border property is a shorthand for border-width, border-style, and border-color:",
        ],
        codeSnippet: {
          code: `p {\n  border: 5px solid red;\n}`,
        },
      },
    ],
  },
  margins: {
    title: "CSS Margins",
    subtitle: "The CSS margin properties are used to create space around elements, outside of any defined borders.",
    prevSlug: "borders",
    nextSlug: "padding",
    sections: [
      {
        title: "Margin - Individual Sides",
        paragraphs: [
          "CSS has properties for specifying the margin for each side of an element:",
        ],
        bullets: [
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
        ],
        codeSnippet: {
          code: `p {\n  margin-top: 100px;\n  margin-bottom: 100px;\n  margin-right: 150px;\n  margin-left: 80px;\n}`,
        },
      },
      {
        title: "Margin Shorthand Property",
        paragraphs: [
          "To shorten the code, it is possible to specify all the margin properties in one property:",
          "margin: 25px 50px 75px 100px; (top, right, bottom, left)",
        ],
        tip: "You can set margin: auto; to horizontally center the element within its container!",
      },
    ],
  },
  padding: {
    title: "CSS Padding",
    subtitle: "The CSS padding properties are used to generate space around an element's content, inside of any defined borders.",
    prevSlug: "margins",
    nextSlug: "height-width",
    sections: [
      {
        title: "Padding - Individual Sides",
        paragraphs: [
          "CSS has properties for specifying the padding for each side of an element:",
        ],
        bullets: [
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
        ],
        codeSnippet: {
          code: `div {\n  padding-top: 50px;\n  padding-right: 30px;\n  padding-bottom: 50px;\n  padding-left: 80px;\n}`,
        },
      },
      {
        title: "Padding and Element Width",
        paragraphs: [
          "The CSS width property specifies the width of the element's content area. If an element has a specified width, the padding added to that element will be added to the total width of the element.",
        ],
        note: "To keep the width at 300px, no matter the amount of padding, use the box-sizing: border-box; property.",
      },
    ],
  },
  "height-width": {
    title: "CSS Height and Width",
    subtitle: "The CSS height and width properties are used to set the height and width of an element.",
    prevSlug: "padding",
    nextSlug: "box-model",
    sections: [
      {
        title: "CSS Setting height and width",
        paragraphs: [
          "The height and width properties do not include padding, borders, or margins. They set the height/width of the area inside the padding, border, and margin of the element.",
        ],
        codeSnippet: {
          code: `div {\n  height: 200px;\n  width: 50%;\n  background-color: powderblue;\n}`,
          liveHtml: `<div style="height: 80px; width: 60%; background-color: powderblue; padding: 12px; border-radius: 4px;">This div has height: 80px and width: 60%.</div>`,
        },
      },
    ],
  },
  "box-model": {
    title: "CSS Box Model",
    subtitle: "All HTML elements can be considered as boxes. In CSS, the term 'box model' is used when talking about design and layout.",
    prevSlug: "height-width",
    nextSlug: "outline",
    sections: [
      {
        title: "The CSS Box Model Components",
        paragraphs: [
          "The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.",
        ],
        bullets: [
          "Content - The content of the box, where text and images appear",
          "Padding - Clears an area around the content. The padding is transparent",
          "Border - A border that goes around the padding and content",
          "Margin - Clears an area outside the border. The margin is transparent",
        ],
        codeSnippet: {
          code: `div {\n  width: 300px;\n  border: 15px solid green;\n  padding: 50px;\n  margin: 20px;\n}`,
          liveHtml: `<div style="background: #e2e8f0; padding: 16px; border: 4px solid #04aa6d; margin: 10px; border-radius: 4px; font-weight: 600; text-align: center;">Box Model Demonstration</div>`,
        },
      },
    ],
  },
  outline: {
    title: "CSS Outline",
    subtitle: "An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element 'stand out'.",
    prevSlug: "box-model",
    nextSlug: "text",
    sections: [
      {
        title: "CSS Outline vs Border",
        paragraphs: [
          "Outline differs from borders! Unlike border, the outline is drawn outside the element's border, and may overlap other content. Also, the outline is NOT a part of the element's dimensions; the element's total width and height is not affected by the width of the outline.",
        ],
        codeSnippet: {
          code: `p {\n  border: 1px solid black;\n  outline: 5px solid green;\n  outline-offset: 4px;\n}`,
          liveHtml: `<div style="padding: 12px;"><p style="border: 1px solid black; outline: 3px solid #04aa6d; outline-offset: 3px; padding: 6px; margin: 0;">This element has an outline outside its border.</p></div>`,
        },
      },
    ],
  },
  text: {
    title: "CSS Text",
    subtitle: "CSS has a lot of properties for formatting text: color, alignment, decoration, transformation, spacing, and shadow.",
    prevSlug: "outline",
    nextSlug: "fonts",
    sections: [
      {
        title: "Text Alignment & Transformation",
        paragraphs: [
          "The text-align property is used to set the horizontal alignment of a text (left, right, center, justify).",
          "The text-transform property is used to specify uppercase and lowercase letters in a text (uppercase, lowercase, capitalize).",
        ],
        codeSnippet: {
          code: `h1 { text-align: center; text-transform: uppercase; }\np { text-align: justify; text-decoration: underline; }`,
          liveHtml: `<div><h3 style="text-align: center; text-transform: uppercase; color: #04aa6d; margin: 0 0 6px;">Centered & Uppercase</h3><p style="text-align: center; text-decoration: underline; margin: 0;">Underlined text demonstration.</p></div>`,
        },
      },
    ],
  },
  fonts: {
    title: "CSS Fonts",
    subtitle: "Choosing the right font for your website is extraordinarily important for readable and professional design.",
    prevSlug: "text",
    nextSlug: "icons",
    sections: [
      {
        title: "Generic Font Families",
        paragraphs: [
          "In CSS there are five generic font families:",
        ],
        bullets: [
          "Serif - fonts have small strokes at the edges of each letter (e.g. Times New Roman, Georgia)",
          "Sans-serif - fonts have clean lines (no strokes attached, e.g. Arial, Inter, Roboto, Helvetica)",
          "Monospace - all letters have the same fixed width (e.g. Courier New, Lucida Console, Consolas)",
          "Cursive - fonts imitate human handwriting",
          "Fantasy - decorative / playful fonts",
        ],
        codeSnippet: {
          code: `.p1 { font-family: "Times New Roman", Times, serif; }\n.p2 { font-family: Arial, Helvetica, sans-serif; }\n.p3 { font-family: "Lucida Console", "Courier New", monospace; }`,
          liveHtml: `<div><p style="font-family: 'Times New Roman', serif; margin: 0 0 6px;">Serif: Times New Roman font</p><p style="font-family: Arial, sans-serif; margin: 0 0 6px;">Sans-serif: Arial font</p><p style="font-family: monospace; margin: 0;">Monospace: Monospace font</p></div>`,
        },
      },
    ],
  },
  position: {
    title: "CSS Layout - The position Property",
    subtitle: "The position property specifies the type of positioning method used for an element.",
    prevSlug: "max-width",
    nextSlug: "z-index",
    sections: [
      {
        title: "The position Property Values",
        paragraphs: [
          "There are five different position values:",
        ],
        bullets: [
          "static - Default. Elements render in order, as they appear in the normal flow of the page",
          "relative - Positioned relative to its normal position",
          "fixed - Positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled",
          "absolute - Positioned relative to the nearest positioned ancestor (instead of relative to the viewport)",
          "sticky - Positioned based on the user's scroll position (toggles between relative and fixed)",
        ],
        codeSnippet: {
          code: `div.relative {\n  position: relative;\n  left: 30px;\n  border: 3px solid #73AD21;\n}`,
          liveHtml: `<div style="position: relative; left: 20px; border: 2px solid #04aa6d; padding: 10px; border-radius: 4px; width: fit-content;">This div element has position: relative;</div>`,
        },
      },
    ],
  },
  "z-index": {
    title: "CSS Layout - The z-index Property",
    subtitle: "The z-index property specifies the stack order of an element.",
    prevSlug: "position",
    nextSlug: "overflow",
    sections: [
      {
        title: "Stack Order",
        paragraphs: [
          "When elements are positioned, they can overlap other elements.",
          "An element with greater stack order is always in front of an element with a lower stack order.",
        ],
        codeSnippet: {
          code: `img {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  z-index: -1;\n}`,
        },
        note: "z-index only works on positioned elements (position: absolute, position: relative, position: fixed, or position: sticky) and flex items.",
      },
    ],
  },
  transitions: {
    title: "CSS Transitions",
    subtitle: "CSS transitions allows you to change property values smoothly, over a given duration.",
    prevSlug: "3d-transforms",
    nextSlug: "animations",
    sections: [
      {
        title: "How to Use CSS Transitions",
        paragraphs: [
          "To create a transition effect, you must specify two things:",
          "1. The CSS property you want to add an effect to",
          "2. The duration of the effect",
        ],
        codeSnippet: {
          code: `div {\n  width: 100px;\n  height: 100px;\n  background: red;\n  transition: width 2s, height 2s, transform 2s;\n}\n\ndiv:hover {\n  width: 300px;\n  height: 300px;\n  transform: rotate(180deg);\n}`,
          liveHtml: `<div style="background: #04aa6d; color: white; padding: 10px 16px; border-radius: 6px; width: fit-content; cursor: pointer; transition: transform 0.3s ease, background 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'; this.style.background='#038555';" onmouseout="this.style.transform='scale(1)'; this.style.background='#04aa6d';">Hover me! (Smooth Transition)</div>`,
        },
      },
    ],
  },
  animations: {
    title: "CSS Animations",
    subtitle: "CSS allows animation of HTML elements without using JavaScript or Flash!",
    prevSlug: "transitions",
    nextSlug: "tooltips",
    sections: [
      {
        title: "The @keyframes Rule",
        paragraphs: [
          "An animation lets an element gradually change from one style to another.",
          "When you specify CSS styles inside the @keyframes rule, the animation will gradually change from the current style to the new style at certain times.",
        ],
        codeSnippet: {
          code: `@keyframes example {\n  from {background-color: red;}\n  to {background-color: yellow;}\n}\n\ndiv {\n  width: 100px;\n  height: 100px;\n  background-color: red;\n  animation-name: example;\n  animation-duration: 4s;\n}`,
          liveHtml: `<div style="background: #3b82f6; color: white; padding: 12px; border-radius: 6px; text-align: center; font-weight: bold;">CSS Keyframes Animation</div>`,
        },
      },
    ],
  },
};

export const W3_CSS_EXERCISES: Record<string, ChapterExercise> = {
  syntax: {
    question: "In CSS syntax, what separates each property declaration in a rule block?",
    options: ["Semicolon (;)", "Colon (:)", "Comma (,)", "Period (.)"],
    correctIndex: 0,
    explanation: "Declarations in CSS are separated by semicolons (;), while properties and their values are separated by colons (:).",
  },
  selectors: {
    question: "Which selector is used to select an element with a specific id in CSS?",
    options: ["# (hash)", ". (period)", "* (asterisk)", ": (colon)"],
    correctIndex: 0,
    explanation: "The id selector uses the hash (#) character, while class selectors use a period (.).",
  },
  colors: {
    question: "Which CSS property specifies the text color of an element?",
    options: ["color", "text-color", "font-color", "fg-color"],
    correctIndex: 0,
    explanation: "The 'color' property in CSS specifies the text color.",
  },
  backgrounds: {
    question: "Which CSS property is used to set the background color of an element?",
    options: ["background-color", "bgcolor", "color-background", "background: color"],
    correctIndex: 0,
    explanation: "The 'background-color' property sets the background color.",
  },
  borders: {
    question: "Which CSS property sets the width, style, and color of a border in a single shorthand?",
    options: ["border", "border-all", "outline", "box-border"],
    correctIndex: 0,
    explanation: "The 'border' shorthand property sets border-width, border-style, and border-color.",
  },
  flexbox: {
    question: "What CSS display property value turns an element into a flex container?",
    options: ["display: flex", "display: box", "display: flexbox", "display: grid"],
    correctIndex: 0,
    explanation: "Setting 'display: flex' activates the flexbox layout module on that container.",
  },
  grid: {
    question: "Which CSS property defines the number and sizing of columns in a CSS grid?",
    options: ["grid-template-columns", "grid-columns", "columns", "grid-template-rows"],
    correctIndex: 0,
    explanation: "'grid-template-columns' defines column tracks in a CSS grid container.",
  },
};

export const W3_CSS_CHALLENGES: Record<string, ChapterChallenge> = {
  syntax: {
    instruction: "Complete the CSS rule to change paragraph text color to red.",
    beforeCode: "p {\n  ",
    placeholder: "color: red;",
    afterCode: "\n}",
    correctAnswer: ["color: red;", "color:red;", "color: red", "color:red"],
    hint: "Use property 'color' and value 'red;'",
    previewSnippet: (val) =>
      val.toLowerCase().includes("red")
        ? `<p style="color: red; margin: 0; font-weight: 700;">This text is red.</p>`
        : `<p style="color: #64748b; margin: 0;">This text is not red yet.</p>`,
  },
  selectors: {
    instruction: "Write the CSS selector to target the element with id 'header'.",
    beforeCode: "",
    placeholder: "#header",
    afterCode: " {\n  background-color: lightblue;\n}",
    correctAnswer: ["#header", "#header "],
    hint: "Use # followed by the id name.",
    previewSnippet: (val) =>
      val.toLowerCase().includes("#header")
        ? `<div style="background: lightblue; padding: 12px; border-radius: 4px; font-weight: 700;">#header element selected!</div>`
        : `<div style="padding: 12px; border: 1px dashed #cbd5e1; color: #94a3b8;">Enter #header</div>`,
  },
  colors: {
    instruction: "Set text color to DodgerBlue in the CSS declaration.",
    beforeCode: "h1 {\n  color: ",
    placeholder: "dodgerblue",
    afterCode: ";\n}",
    correctAnswer: ["dodgerblue", "dodgerblue;"],
    hint: "Type dodgerblue",
    previewSnippet: (val) =>
      val.toLowerCase().includes("dodgerblue")
        ? `<h2 style="color: dodgerblue; margin: 0;">Heading in DodgerBlue</h2>`
        : `<h2 style="color: #94a3b8; margin: 0;">Heading</h2>`,
  },
  flexbox: {
    instruction: "Activate flexbox layout by setting the display property to flex.",
    beforeCode: ".container {\n  display: ",
    placeholder: "flex",
    afterCode: ";\n}",
    correctAnswer: ["flex", "flex;"],
    hint: "Use the value flex",
    previewSnippet: (val) =>
      val.toLowerCase().includes("flex")
        ? `<div style="display: flex; gap: 8px;"><div style="background:#04aa6d;color:#fff;padding:8px 16px;border-radius:4px;">Flex 1</div><div style="background:#04aa6d;color:#fff;padding:8px 16px;border-radius:4px;">Flex 2</div></div>`
        : `<div><div>Flex 1</div><div>Flex 2</div></div>`,
  },
};

export function getChapterCssExercise(slug: string): ChapterExercise {
  if (W3_CSS_EXERCISES[slug]) {
    return W3_CSS_EXERCISES[slug];
  }

  const currentItem = ALL_CSS_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    question: `What is the primary purpose of ${title} in CSS?`,
    options: [
      `To style and control visual presentation of ${title}`,
      `To replace JavaScript event handlers`,
      `To execute database queries`,
      `To disable CSS styles`,
    ],
    correctIndex: 0,
    explanation: `${title} is an essential part of the modern CSS specification for styling web documents.`,
  };
}

export function getChapterCssChallenge(slug: string): ChapterChallenge {
  if (W3_CSS_CHALLENGES[slug]) {
    return W3_CSS_CHALLENGES[slug];
  }

  const currentItem = ALL_CSS_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();
  const cleanProp = slug.replace(/^css-/, "").toLowerCase();

  return {
    instruction: `Write the correct CSS property declaration for ${title}.`,
    beforeCode: `.element {\n  `,
    placeholder: `${cleanProp}: initial;`,
    afterCode: `\n}`,
    correctAnswer: [`${cleanProp}: initial;`, `${cleanProp}: initial`, cleanProp],
    hint: `Specify the ${cleanProp} property.`,
    previewSnippet: () =>
      `<div style="padding: 12px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; color: #166534; font-weight: 600;">Demonstrating ${title}</div>`,
  };
}

export function getChapterCssData(slug: string): W3ChapterData {
  const currentIndex = ALL_CSS_CHAPTERS.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? ALL_CSS_CHAPTERS[currentIndex - 1] : ALL_CSS_CHAPTERS[0];
  const nextChapter = currentIndex >= 0 && currentIndex < ALL_CSS_CHAPTERS.length - 1 
    ? ALL_CSS_CHAPTERS[currentIndex + 1] 
    : ALL_CSS_CHAPTERS[ALL_CSS_CHAPTERS.length - 1];

  if (W3_CSS_CHAPTERS[slug]) {
    const existing = W3_CSS_CHAPTERS[slug];
    return {
      ...existing,
      prevSlug: prevChapter.slug,
      nextSlug: nextChapter.slug,
    };
  }

  const currentItem = ALL_CSS_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    title: title,
    subtitle: `Learn all about ${title} in CSS with interactive syntax examples and Try it Yourself code editor.`,
    prevSlug: prevChapter ? prevChapter.slug : "home",
    nextSlug: nextChapter ? nextChapter.slug : "syntax",
    sections: [
      {
        title: `Understanding ${title}`,
        paragraphs: [
          `${title} is a core styling technique in Cascading Style Sheets (CSS).`,
          `It enables front-end engineers to format typography, spacing, dimensions, and responsive behaviors cleanly across all display devices.`,
        ],
        codeSnippet: {
          code: `/* Example of ${title} */\n.example {\n  margin: 10px;\n  padding: 15px;\n  background-color: #f1f3f5;\n  border-radius: 6px;\n}`,
          liveHtml: `<div style="margin: 10px 0; padding: 15px; background: #f1f3f5; border-radius: 6px; font-weight: 600; color: #19232e;">Demonstrating ${title} on DevAcademy</div>`,
        },
        tip: `Always use standard CSS properties and inspect computed styles in browser developer tools for debugging.`,
      },
    ],
  };
}
