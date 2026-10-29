export interface Lesson {
  slug: string;
  title: string;
  description: string;
  order: number;
  language: string;
  starterCode: string;
  content: string;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  badge: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Quiz {
  slug: string;
  title: string;
  courseSlug: string;
  questions: QuizQuestion[];
}

export interface Exercise {
  slug: string;
  title: string;
  courseSlug: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructions: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
}

export const SYNTAXLAB_COURSES: Course[] = [
  {
    slug: "html",
    title: "HTML Tutorial",
    description: "The standard markup language for structuring modern web pages.",
    category: "Web Development",
    icon: "FileCode",
    badge: "Fundamental",
    lessons: [
      {
        slug: "introduction",
        title: "Introduction to HTML",
        description: "Understand what HTML is and how web documents function.",
        order: 1,
        language: "html",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h1 style="color: #04aa6d;">Welcome to DevAcademy!</h1>
  <p>This is your very first HTML document. You can edit this text live in the editor!</p>
  <button style="background: #04aa6d; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
    Click Me
  </button>
</body>
</html>`,
        content: `### What is HTML?
HTML stands for **HyperText Markup Language**. It is the standard authoring language used to create and structure documents across the World Wide Web.

#### Core Building Blocks:
1. **HyperText**: Documents linked together via clickable references (hyperlinks).
2. **Markup Tags**: Semantic elements that instruct web browsers how to render text, images, media, and input controls.
3. **Document Object Model (DOM)**: A structured tree representing HTML elements from the root document to individual nodes.

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Browser Tab Title</title>
  </head>
  <body>
    <h1>Main Heading</h1>
    <p>This is a paragraph of text.</p>
  </body>
</html>
\`\`\`

Use the editor on the right or click **Try it Yourself** to experiment with this live code!`
      },
      {
        slug: "elements-tags",
        title: "HTML Elements & Attributes",
        description: "Learn opening tags, inner content, closing tags, and element attributes.",
        order: 2,
        language: "html",
        starterCode: `<div style="border: 2px dashed #04aa6d; padding: 16px; border-radius: 8px; font-family: sans-serif;">
  <h2>Elements & Attributes</h2>
  <p>Most HTML elements feature opening and closing tags enclosing content.</p>
  <a href="https://devacademy.dev" target="_blank" style="color: #04aa6d; font-weight: bold;">Visit DevAcademy</a>
</div>`,
        content: `### HTML Element Structure
Most HTML elements follow the pattern:
\`<tagname attribute="value">Your Content</tagname>\`

#### Common Element Types:
- \`<h1>\` to \`<h6>\`: Hierarchical headings
- \`<p>\`: Body paragraphs
- \`<a>\`: Anchor hyperlinks with the \`href\` attribute
- \`<img>\`: Inline images with \`src\` and \`alt\` attributes
- \`<div>\`: Generic flow container`
      },
      {
        slug: "forms-inputs",
        title: "Forms and Inputs",
        description: "Collect user input with forms, text controls, emails, and buttons.",
        order: 3,
        language: "html",
        starterCode: `<form style="font-family: sans-serif; max-width: 300px; padding: 16px; border: 1px solid #ccc; border-radius: 8px;">
  <label style="display: block; margin-bottom: 4px; font-weight: bold;">Name:</label>
  <input type="text" placeholder="Enter your name..." style="width: 100%; padding: 8px; margin-bottom: 12px; box-sizing: border-box; border: 1px solid #aaa; border-radius: 4px;" />

  <label style="display: block; margin-bottom: 4px; font-weight: bold;">Email:</label>
  <input type="email" placeholder="name@email.com" style="width: 100%; padding: 8px; margin-bottom: 12px; box-sizing: border-box; border: 1px solid #aaa; border-radius: 4px;" />

  <button type="button" onclick="alert('Form submitted successfully!')" style="background: #04aa6d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
    Submit Data
  </button>
</form>`,
        content: `### Interactive Forms
HTML forms allow visitors to submit data to backend web servers and APIs.

Key input element attributes:
- \`type\`: Determines the control type (\`text\`, \`email\`, \`password\`, \`checkbox\`)
- \`placeholder\`: Gray hint displayed when empty
- \`required\`: Enforces validation before form submission`
      }
    ]
  },
  {
    slug: "css",
    title: "CSS Tutorial",
    description: "Master visual layouts, colors, selectors, flexbox, and modern typography.",
    category: "Styling & Design",
    icon: "Palette",
    badge: "Popular",
    lessons: [
      {
        slug: "selectors-boxmodel",
        title: "Selectors & The Box Model",
        description: "Understand margins, borders, padding, and class/id selectors.",
        order: 1,
        language: "css",
        starterCode: `<style>
  .card-box {
    background: #1e1b4b;
    color: #e0e7ff;
    padding: 24px;
    margin: 20px;
    border: 3px solid #6366f1;
    border-radius: 12px;
    font-family: sans-serif;
  }
</style>

<div class="card-box">
  <h3>CSS Box Model</h3>
  <p>Padding provides internal breathing room, while margin spaces out neighboring elements.</p>
</div>`,
        content: `### The CSS Box Model
Every HTML element is rendered as a rectangular box comprising:
1. **Content**: The inner text or nested media.
2. **Padding**: Transparent clearance surrounding the content.
3. **Border**: A decorative border surrounding the padding.
4. **Margin**: Transparent clearance outside the border.`
      },
      {
        slug: "flexbox-layout",
        title: "Modern Flexbox Layout",
        description: "Align and distribute elements along horizontal or vertical axes.",
        order: 2,
        language: "css",
        starterCode: `<style>
  .flex-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    font-family: sans-serif;
  }
  .flex-item {
    background: #04aa6d;
    color: white;
    padding: 16px 24px;
    border-radius: 6px;
    font-weight: bold;
  }
</style>

<div class="flex-container">
  <div class="flex-item">1. HTML</div>
  <div class="flex-item">2. CSS</div>
  <div class="flex-item">3. JavaScript</div>
</div>`,
        content: `### Flexible Layouts with Flexbox
With \`display: flex\`, you gain powerful alignment controls:
- Align along the main axis with \`justify-content\`
- Align along the cross axis with \`align-items\`
- Specify gutter gaps between items with \`gap\``
      }
    ]
  },
  {
    slug: "javascript",
    title: "JavaScript Tutorial",
    description: "The programming language of the Web for interactivity, logic, and APIs.",
    category: "Programming",
    icon: "Terminal",
    badge: "Essential",
    lessons: [
      {
        slug: "variables-functions",
        title: "Variables and Functions",
        description: "Variable declarations with let/const, data types, DOM manipulation, and event handling.",
        order: 1,
        language: "javascript",
        starterCode: `<div style="font-family: sans-serif; text-align: center; padding: 30px;">
  <h2 id="counter" style="font-size: 48px; color: #04aa6d; margin: 0;">0</h2>
  <div style="margin-top: 16px;">
    <button id="minus-btn" style="padding: 10px 20px; margin: 4px; font-size: 18px; border-radius: 6px; cursor: pointer;">-</button>
    <button id="plus-btn" style="padding: 10px 20px; margin: 4px; font-size: 18px; border-radius: 6px; cursor: pointer; background: #04aa6d; color: white; border: none;">+</button>
  </div>
</div>

<script>
  let count = 0;
  const counterDisplay = document.getElementById('counter');
  
  document.getElementById('plus-btn').addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
  });

  document.getElementById('minus-btn').addEventListener('click', () => {
    count--;
    counterDisplay.textContent = count;
  });
</script>`,
        content: `### Web Interactivity with JavaScript
JavaScript runs directly within client web browsers to power dynamic UI updates.

Key language features:
- **Variables**: Store data using \`let\` (mutable) or \`const\` (immutable reference).
- **Functions**: Reusable blocks of code that execute tasks or calculate values.
- **Event Listeners**: Detect user actions such as clicks (\`click\`), keystrokes (\`keydown\`), and form inputs.`
      }
    ]
  },
  {
    slug: "python",
    title: "Python Tutorial",
    description: "A clean, intuitive, and versatile programming language for scripting, backend, & AI.",
    category: "General Programming",
    icon: "Cpu",
    badge: "Popular",
    lessons: [
      {
        slug: "basics-syntax",
        title: "Python Basic Syntax",
        description: "Variables, control flow with for/while loops, and functions in Python.",
        order: 1,
        language: "python",
        starterCode: `# Running Python scripts at DevAcademy
platform = "DevAcademy"
topics = ["HTML", "CSS", "JavaScript", "Python"]

print(f"Welcome to {platform}!")
for i, item in enumerate(topics, start=1):
    print(f"{i}. Learn {item}")`,
        content: `### Clean Code with Python
Python relies on indentation (whitespace) to define code blocks, making syntax clean, readable, and ideal for learners before tackling complex algorithms.`
      }
    ]
  },
  {
    slug: "sql",
    title: "SQL Tutorial",
    description: "The standard language for storing, manipulating, and querying relational databases.",
    category: "Database & Backend",
    icon: "Database",
    badge: "Essential",
    lessons: [
      {
        slug: "basics-syntax",
        title: "SQL Fundamental Queries",
        description: "SELECT, WHERE, INSERT, UPDATE, and DELETE query syntax.",
        order: 1,
        language: "sql",
        starterCode: `-- SQL query example at DevAcademy
SELECT CustomerName, City, Country 
FROM Customers 
WHERE Country = 'Indonesia' 
ORDER BY CustomerName ASC;`,
        content: `### What is SQL?
SQL (Structured Query Language) is the global standard for interacting with relational database management systems (RDBMS) like PostgreSQL, MySQL, SQL Server, and SQLite.`
      }
    ]
  }
];

export const SYNTAXLAB_QUIZZES: Quiz[] = [
  {
    slug: "html-fundamentals",
    title: "HTML Fundamentals Quiz",
    courseSlug: "html",
    questions: [
      {
        id: 1,
        question: "What does the HTML acronym stand for?",
        options: [
          "Hyperlinks and Text Markup Language",
          "HyperText Markup Language",
          "Home Tool Markup Language",
          "Hyper Technical Modern Language"
        ],
        answer: 1,
        explanation: "HTML officially stands for HyperText Markup Language."
      },
      {
        id: 2,
        question: "Which tag is used to create the top-level, most important heading in an HTML document?",
        options: ["<head>", "<h6>", "<h1>", "<heading>"],
        answer: 2,
        explanation: "The <h1> tag defines the highest-level and most important heading on a page."
      },
      {
        id: 3,
        question: "Which attribute is required on an <a> tag to specify the destination URL?",
        options: ["src", "href", "link", "target_url"],
        answer: 1,
        explanation: "The href (Hypertext Reference) attribute specifies the target URL destination."
      }
    ]
  },
  {
    slug: "css-fundamentals",
    title: "CSS Selectors & Flexbox Quiz",
    courseSlug: "css",
    questions: [
      {
        id: 1,
        question: "Which CSS property is used to create space INSIDE an element's border?",
        options: ["margin", "padding", "spacing", "gap"],
        answer: 1,
        explanation: "Padding is the space between the content of an element and its border."
      },
      {
        id: 2,
        question: "Which justify-content value centers flex child items along the main axis?",
        options: ["center", "middle", "space-between", "align-center"],
        answer: 0,
        explanation: "justify-content: center positions flex items at the center of the main axis."
      }
    ]
  }
];

export const SYNTAXLAB_EXERCISES: Exercise[] = [
  {
    slug: "html-create-heading-paragraph",
    title: "Exercise 1: Creating Headings & Paragraphs",
    courseSlug: "html",
    difficulty: "Beginner",
    instructions: "Add an <h1> tag with the text 'Hello World' and a <p> tag with the text 'Learning to code at DevAcademy is fun!'.",
    starterCode: `<!-- Add your HTML code below -->\n`,
    solutionCode: `<h1>Hello World</h1>\n<p>Learning to code at DevAcademy is fun!</p>`,
    hint: "Use an <h1>Hello World</h1> tag and a <p>Learning to code at DevAcademy is fun!</p> tag."
  },
  {
    slug: "css-style-button",
    title: "Exercise 2: Styling a Modern Button",
    courseSlug: "css",
    difficulty: "Beginner",
    instructions: "Create a .my-button class with a blue background-color (#2563eb), white text color, padding 12px 24px, and border-radius 8px.",
    starterCode: `<style>\n  .my-button {\n    /* Write your CSS styles here */\n  }\n</style>\n\n<button class="my-button">Click Me</button>`,
    solutionCode: `<style>\n  .my-button {\n    background-color: #2563eb;\n    color: white;\n    padding: 12px 24px;\n    border-radius: 8px;\n  }\n</style>\n\n<button class="my-button">Click Me</button>`,
    hint: "Apply background-color, color, padding, and border-radius properties to the .my-button selector."
  }
];
