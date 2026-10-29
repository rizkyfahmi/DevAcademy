import { ChapterItem, SidebarSection, W3ChapterData, ChapterExercise, ChapterChallenge } from "./w3-html-chapters-data";

const makeJsSubItems = (name: string, slug: string) => [
  { name: name.replace(/^JS\s+/i, ""), slug: slug },
  { name: "Exercise", slug: "exercises" },
];

export const JS_SECTIONS: SidebarSection[] = [
  {
    title: "JS TUTORIAL",
    items: [
      { name: "JS HOME", slug: "home" },
      { name: "JS Introduction", slug: "introduction", hasCaret: true, subItems: makeJsSubItems("Introduction", "introduction") },
      { name: "JS Where To", slug: "where-to", hasCaret: true, subItems: makeJsSubItems("Where To", "where-to") },
      { name: "JS Output", slug: "output", hasCaret: true, subItems: makeJsSubItems("Output", "output") },
      { name: "JS Statements", slug: "statements", hasCaret: true, subItems: makeJsSubItems("Statements", "statements") },
      { name: "JS Syntax", slug: "syntax", hasCaret: true, subItems: makeJsSubItems("Syntax", "syntax") },
      { name: "JS Comments", slug: "comments", hasCaret: true, subItems: makeJsSubItems("Comments", "comments") },
      { name: "JS Variables", slug: "variables", hasCaret: true, subItems: makeJsSubItems("Variables", "variables") },
      { name: "JS Let", slug: "let", hasCaret: true, subItems: makeJsSubItems("Let", "let") },
      { name: "JS Const", slug: "const", hasCaret: true, subItems: makeJsSubItems("Const", "const") },
      { name: "JS Operators", slug: "operators", hasCaret: true, subItems: makeJsSubItems("Operators", "operators") },
      { name: "JS Arithmetic", slug: "arithmetic", hasCaret: true, subItems: makeJsSubItems("Arithmetic", "arithmetic") },
      { name: "JS Assignment", slug: "assignment", hasCaret: true, subItems: makeJsSubItems("Assignment", "assignment") },
      { name: "JS Data Types", slug: "data-types", hasCaret: true, subItems: makeJsSubItems("Data Types", "data-types") },
      { name: "JS Functions", slug: "functions", hasCaret: true, subItems: makeJsSubItems("Functions", "functions") },
      { name: "JS Objects", slug: "objects", hasCaret: true, subItems: makeJsSubItems("Objects", "objects") },
      { name: "JS Events", slug: "events", hasCaret: true, subItems: makeJsSubItems("Events", "events") },
      { name: "JS Strings", slug: "strings", hasCaret: true, subItems: makeJsSubItems("Strings", "strings") },
      { name: "JS String Methods", slug: "string-methods", hasCaret: true, subItems: makeJsSubItems("String Methods", "string-methods") },
      { name: "JS String Search", slug: "string-search", hasCaret: true, subItems: makeJsSubItems("String Search", "string-search") },
      { name: "JS Numbers", slug: "numbers", hasCaret: true, subItems: makeJsSubItems("Numbers", "numbers") },
      { name: "JS BigInt", slug: "bigint", hasCaret: true, subItems: makeJsSubItems("BigInt", "bigint") },
      { name: "JS Number Methods", slug: "number-methods", hasCaret: true, subItems: makeJsSubItems("Number Methods", "number-methods") },
      { name: "JS Arrays", slug: "arrays", hasCaret: true, subItems: makeJsSubItems("Arrays", "arrays") },
      { name: "JS Array Methods", slug: "array-methods", hasCaret: true, subItems: makeJsSubItems("Array Methods", "array-methods") },
      { name: "JS Array Sort", slug: "array-sort", hasCaret: true, subItems: makeJsSubItems("Array Sort", "array-sort") },
      { name: "JS Dates", slug: "dates", hasCaret: true, subItems: makeJsSubItems("Dates", "dates") },
      { name: "JS Math", slug: "math", hasCaret: true, subItems: makeJsSubItems("Math", "math") },
      { name: "JS Random", slug: "random", hasCaret: true, subItems: makeJsSubItems("Random", "random") },
      { name: "JS Booleans", slug: "booleans", hasCaret: true, subItems: makeJsSubItems("Booleans", "booleans") },
      { name: "JS Comparisons", slug: "comparisons", hasCaret: true, subItems: makeJsSubItems("Comparisons", "comparisons") },
      { name: "JS If Else", slug: "if-else", hasCaret: true, subItems: makeJsSubItems("If Else", "if-else") },
      { name: "JS Switch", slug: "switch", hasCaret: true, subItems: makeJsSubItems("Switch", "switch") },
      { name: "JS Loop For", slug: "loop-for", hasCaret: true, subItems: makeJsSubItems("Loop For", "loop-for") },
      { name: "JS Loop While", slug: "loop-while", hasCaret: true, subItems: makeJsSubItems("Loop While", "loop-while") },
      { name: "JS Break", slug: "break", hasCaret: true, subItems: makeJsSubItems("Break", "break") },
      { name: "JS Sets", slug: "sets", hasCaret: true, subItems: makeJsSubItems("Sets", "sets") },
      { name: "JS Maps", slug: "maps", hasCaret: true, subItems: makeJsSubItems("Maps", "maps") },
      { name: "JS Typeof", slug: "typeof", hasCaret: true, subItems: makeJsSubItems("Typeof", "typeof") },
      { name: "JS Scope", slug: "scope", hasCaret: true, subItems: makeJsSubItems("Scope", "scope") },
      { name: "JS Arrow Function", slug: "arrow-function", hasCaret: true, subItems: makeJsSubItems("Arrow Function", "arrow-function") },
      { name: "JS Classes", slug: "classes", hasCaret: true, subItems: makeJsSubItems("Classes", "classes") },
      { name: "JS Modules", slug: "modules", hasCaret: true, subItems: makeJsSubItems("Modules", "modules") },
      { name: "JS JSON", slug: "json", hasCaret: true, subItems: makeJsSubItems("JSON", "json") },
    ],
  },
  {
    title: "JS OBJECTS",
    items: [
      { name: "JS Object Definitions", slug: "object-definitions", hasCaret: true, subItems: makeJsSubItems("Object Definitions", "object-definitions") },
      { name: "JS Object Properties", slug: "object-properties", hasCaret: true, subItems: makeJsSubItems("Object Properties", "object-properties") },
      { name: "JS Object Methods", slug: "object-methods", hasCaret: true, subItems: makeJsSubItems("Object Methods", "object-methods") },
      { name: "JS Object Constructors", slug: "object-constructors", hasCaret: true, subItems: makeJsSubItems("Object Constructors", "object-constructors") },
    ],
  },
  {
    title: "JS FUNCTIONS",
    items: [
      { name: "JS Function Definitions", slug: "function-definitions", hasCaret: true, subItems: makeJsSubItems("Function Definitions", "function-definitions") },
      { name: "JS Function Parameters", slug: "function-parameters", hasCaret: true, subItems: makeJsSubItems("Function Parameters", "function-parameters") },
      { name: "JS Function Closures", slug: "function-closures", hasCaret: true, subItems: makeJsSubItems("Function Closures", "function-closures") },
    ],
  },
  {
    title: "JS ASYNC",
    items: [
      { name: "JS Callbacks", slug: "callbacks", hasCaret: true, subItems: makeJsSubItems("Callbacks", "callbacks") },
      { name: "JS Promises", slug: "promises", hasCaret: true, subItems: makeJsSubItems("Promises", "promises") },
      { name: "JS Async/Await", slug: "async-await", hasCaret: true, subItems: makeJsSubItems("Async/Await", "async-await") },
    ],
  },
  {
    title: "JS HTML DOM",
    items: [
      { name: "DOM Intro", slug: "dom-intro", hasCaret: true, subItems: makeJsSubItems("DOM Intro", "dom-intro") },
      { name: "DOM Methods", slug: "dom-methods", hasCaret: true, subItems: makeJsSubItems("DOM Methods", "dom-methods") },
      { name: "DOM Elements", slug: "dom-elements", hasCaret: true, subItems: makeJsSubItems("DOM Elements", "dom-elements") },
      { name: "DOM HTML", slug: "dom-html", hasCaret: true, subItems: makeJsSubItems("DOM HTML", "dom-html") },
      { name: "DOM Forms", slug: "dom-forms", hasCaret: true, subItems: makeJsSubItems("DOM Forms", "dom-forms") },
      { name: "DOM CSS", slug: "dom-css", hasCaret: true, subItems: makeJsSubItems("DOM CSS", "dom-css") },
      { name: "DOM Events", slug: "dom-events", hasCaret: true, subItems: makeJsSubItems("DOM Events", "dom-events") },
      { name: "DOM Event Listener", slug: "dom-event-listener", hasCaret: true, subItems: makeJsSubItems("DOM Event Listener", "dom-event-listener") },
    ],
  },
  {
    title: "JS BROWSER BOM",
    items: [
      { name: "JS Window", slug: "bom-window" },
      { name: "JS Screen", slug: "bom-screen" },
      { name: "JS Location", slug: "bom-location" },
      { name: "JS History", slug: "bom-history" },
      { name: "JS Navigator", slug: "bom-navigator" },
      { name: "JS Popup Alert", slug: "bom-alert" },
      { name: "JS Timing", slug: "bom-timing" },
      { name: "JS Cookies", slug: "bom-cookies" },
    ],
  },
  {
    title: "JS WEB APIS",
    items: [
      { name: "Web API Intro", slug: "js-web-api-intro" },
      { name: "Web Storage API", slug: "js-web-storage" },
      { name: "Web Fetch API", slug: "js-fetch-api" },
      { name: "Web Geolocation API", slug: "js-geolocation" },
    ],
  },
  {
    title: "JS EXAMPLES",
    items: [
      { name: "JS Examples", slug: "js-examples" },
      { name: "JS Exercises", slug: "js-exercises" },
      { name: "JS Quiz", slug: "js-quiz" },
      { name: "JS Challenges", slug: "js-challenges" },
    ],
  },
  {
    title: "JS REFERENCES",
    items: [
      { name: "JavaScript Reference", slug: "js-reference" },
      { name: "HTML DOM Reference", slug: "dom-reference" },
    ],
  },
];

export const ALL_JS_CHAPTERS: ChapterItem[] = JS_SECTIONS.flatMap(s => s.items);

export const W3_JS_CHAPTERS: Record<string, W3ChapterData> = {
  introduction: {
    title: "JavaScript Introduction",
    subtitle: "JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web.",
    prevSlug: "home",
    nextSlug: "where-to",
    sections: [
      {
        title: "What Can JavaScript Do?",
        paragraphs: [
          "JavaScript can change HTML content, attribute values, CSS styles, and can hide or show HTML elements.",
          "One of many JavaScript HTML methods is getElementById().",
        ],
        codeSnippet: {
          code: `document.getElementById("demo").innerHTML = "Hello JavaScript!";`,
          liveHtml: `<div style="padding: 12px; background: #fefce8; border: 1px solid #fef08a; border-radius: 6px;"><p style="margin: 0; font-weight: 700; color: #854d0e;">Hello JavaScript!</p></div>`,
        },
      },
      {
        title: "JavaScript Can Change HTML Styles",
        paragraphs: [
          "Changing the style of an HTML element is a variant of changing an HTML attribute.",
        ],
        codeSnippet: {
          code: `document.getElementById("demo").style.fontSize = "25px";\ndocument.getElementById("demo").style.color = "red";`,
          liveHtml: `<p style="font-size: 20px; color: red; font-weight: 700; margin: 0;">This styled text was manipulated via JavaScript.</p>`,
        },
        tip: "JavaScript accepts both double and single quotes for strings: 'John Doe' is the same as \"John Doe\".",
      },
    ],
  },
  "where-to": {
    title: "JavaScript Where To",
    subtitle: "In HTML, JavaScript code is inserted between <script> and </script> tags.",
    prevSlug: "introduction",
    nextSlug: "output",
    sections: [
      {
        title: "The <script> Tag",
        paragraphs: [
          "In HTML, JavaScript code is inserted between <script> and </script> tags.",
          "Old JavaScript examples may use a type attribute: <script type=\"text/javascript\">. The type attribute is not required. JavaScript is the default scripting language in HTML.",
        ],
        codeSnippet: {
          code: `<script>\ndocument.getElementById("demo").innerHTML = "My First JavaScript";\n</script>`,
          liveHtml: `<div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;"><p style="margin: 0; font-weight: 600; color: #1e293b;">My First JavaScript</p></div>`,
        },
      },
      {
        title: "JavaScript in <head> or <body>",
        paragraphs: [
          "You can place any number of scripts in an HTML document.",
          "Scripts can be placed in the <body>, or in the <head> section of an HTML page, or in both.",
        ],
        tip: "Placing scripts at the bottom of the <body> element improves the display speed, because script interpretation slows down the display.",
      },
      {
        title: "External JavaScript",
        paragraphs: [
          "Scripts can also be placed in external files. External scripts are practical when the same code is used in many different web pages.",
          "JavaScript files have the file extension .js.",
        ],
        codeSnippet: {
          code: `<script src="myScript.js"></script>`,
        },
        note: "External scripts cannot contain <script> tags.",
      },
    ],
  },
  output: {
    title: "JavaScript Output",
    subtitle: "JavaScript can display data in different ways: innerHTML, document.write(), window.alert(), console.log().",
    prevSlug: "where-to",
    nextSlug: "statements",
    sections: [
      {
        title: "Writing into an HTML element",
        paragraphs: [
          "To access an HTML element, JavaScript can use the document.getElementById(id) method.",
          "The id attribute defines the HTML element. The innerHTML property defines the HTML content:",
        ],
        codeSnippet: {
          code: `document.getElementById("demo").innerHTML = 5 + 6;`,
          liveHtml: `<div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;"><p id="demo-js-out" style="margin: 0; font-weight: 700; color: #04aa6d;">11</p></div>`,
        },
      },
      {
        title: "Using console.log()",
        paragraphs: [
          "For debugging purposes, you can call the console.log() method in the browser to display data.",
        ],
        codeSnippet: {
          code: `console.log(5 + 6);`,
        },
        tip: "Activate the browser console with F12 to view console outputs.",
      },
    ],
  },
  statements: {
    title: "JavaScript Statements",
    subtitle: "A computer program is a list of 'instructions' to be 'executed' by a computer.",
    prevSlug: "output",
    nextSlug: "syntax",
    sections: [
      {
        title: "JavaScript Programs",
        paragraphs: [
          "In a programming language, these programming instructions are called statements.",
          "A JavaScript program is a list of programming statements.",
        ],
        codeSnippet: {
          code: `let x, y, z;    // Statement 1\nx = 5;          // Statement 2\ny = 6;          // Statement 3\nz = x + y;      // Statement 4`,
        },
      },
      {
        title: "Semicolons ;",
        paragraphs: [
          "Semicolons separate JavaScript statements. Add a semicolon at the end of each executable statement:",
        ],
        codeSnippet: {
          code: `let a, b, c;\na = 1;\nb = 2;\nc = a + b;`,
        },
        tip: "Ending statements with semicolon is not required, but highly recommended.",
      },
      {
        title: "JavaScript Code Blocks",
        paragraphs: [
          "JavaScript statements can be grouped together in code blocks, inside curly brackets {...}.",
          "The purpose of code blocks is to define statements to be executed together.",
        ],
        codeSnippet: {
          code: `function myFunction() {\n  document.getElementById("demo1").innerHTML = "Hello Dolly!";\n  document.getElementById("demo2").innerHTML = "How are you?";\n}`,
        },
      },
    ],
  },
  syntax: {
    title: "JavaScript Syntax",
    subtitle: "JavaScript syntax is the set of rules, how JavaScript programs are constructed.",
    prevSlug: "statements",
    nextSlug: "comments",
    sections: [
      {
        title: "JavaScript Values",
        paragraphs: [
          "The JavaScript syntax defines two types of values: Fixed values and Variable values.",
          "Fixed values are called Literals. Variable values are called Variables.",
        ],
        bullets: [
          "Numbers are written with or without decimals: 10.50, 1001",
          "Strings are text, written within double or single quotes: \"John Doe\", 'John Doe'",
        ],
        codeSnippet: {
          code: `// Numbers:\n10.50\n1001\n\n// Strings:\n"John Doe"\n'John Doe'`,
        },
      },
      {
        title: "JavaScript is Case Sensitive",
        paragraphs: [
          "All JavaScript identifiers are case sensitive. The variables lastName and lastname, are two different variables:",
        ],
        codeSnippet: {
          code: `let lastName = "Doe";\nlet lastname = "Peterson";`,
        },
        note: "JavaScript does not interpret LET or Let as the keyword let.",
      },
    ],
  },
  comments: {
    title: "JavaScript Comments",
    subtitle: "JavaScript comments can be used to explain JavaScript code, and to make it more readable.",
    prevSlug: "syntax",
    nextSlug: "variables",
    sections: [
      {
        title: "Single Line Comments",
        paragraphs: [
          "Single line comments start with //.",
          "Any text between // and the end of the line will be ignored by JavaScript (will not be executed).",
        ],
        codeSnippet: {
          code: `// Change heading:\ndocument.getElementById("myH").innerHTML = "My First Page";\n\n// Change paragraph:\ndocument.getElementById("myP").innerHTML = "My first paragraph.";`,
        },
      },
      {
        title: "Multi-line Comments",
        paragraphs: [
          "Multi-line comments start with /* and end with */.",
          "Any text between /* and */ will be ignored by JavaScript.",
        ],
        codeSnippet: {
          code: `/*\nThe code below will change\nthe heading and the paragraph\n*/\ndocument.getElementById("myH").innerHTML = "My First Page";`,
        },
        tip: "Comments can also be used to prevent execution when testing alternative code.",
      },
    ],
  },
  variables: {
    title: "JavaScript Variables",
    subtitle: "Variables are containers for storing data (storing data values).",
    prevSlug: "comments",
    nextSlug: "let",
    sections: [
      {
        title: "Declaring Variables in JavaScript",
        paragraphs: [
          "In JavaScript, there are 4 ways to declare a variable:",
          "1. Using var",
          "2. Using let",
          "3. Using const",
          "4. Using nothing (undeclared)",
        ],
        codeSnippet: {
          code: `let x = 5;\nlet y = 6;\nlet z = x + y;\nconsole.log(z);`,
          liveHtml: `<p style="margin: 0; font-weight: 600; color: #1e293b;">let z = 5 + 6 => <strong>11</strong></p>`,
        },
      },
    ],
  },
  let: {
    title: "JavaScript Let",
    subtitle: "The let keyword was introduced in ES6 (2015). Variables defined with let cannot be redeclared and must be declared before use.",
    prevSlug: "variables",
    nextSlug: "const",
    sections: [
      {
        title: "Block Scope",
        paragraphs: [
          "Before ES6 (2015), JavaScript had Global Scope and Function Scope.",
          "ES6 introduced two important new JavaScript keywords: let and const. These two keywords provide Block Scope in JavaScript.",
          "Variables declared inside a { } block cannot be accessed from outside the block:",
        ],
        codeSnippet: {
          code: `{\n  let x = 2;\n}\n// x can NOT be used here`,
        },
      },
      {
        title: "Cannot be Redeclared",
        paragraphs: [
          "Variables defined with let cannot be redeclared. You cannot accidentally redeclare a variable declared with let.",
        ],
        codeSnippet: {
          code: `let x = "John Doe";\n\nlet x = 0;\n// SyntaxError: 'x' has already been declared`,
        },
        note: "Variables defined with var CAN be redeclared at any time.",
      },
    ],
  },
  const: {
    title: "JavaScript Const",
    subtitle: "The const keyword was introduced in ES6 (2015). Variables defined with const cannot be Redeclared or Reassigned.",
    prevSlug: "let",
    nextSlug: "operators",
    sections: [
      {
        title: "Cannot be Reassigned",
        paragraphs: [
          "A const variable cannot be reassigned:",
        ],
        codeSnippet: {
          code: `const PI = 3.141592653589793;\nPI = 3.14;      // This will give an error\nPI = PI + 10;   // This will also give an error`,
        },
      },
      {
        title: "When to use JavaScript const?",
        paragraphs: [
          "Always declare a variable with const unless you know that the value will change.",
          "Use const when you declare:",
        ],
        bullets: [
          "A new Array",
          "A new Object",
          "A new Function",
          "A new RegExp",
        ],
      },
      {
        title: "Constant Objects and Arrays",
        paragraphs: [
          "The keyword const is a little misleading. It does NOT define a constant value. It defines a constant reference to a value.",
          "Because of this you can NOT reassign a constant value, but you CAN change the elements of constant array, or properties of constant object:",
        ],
        codeSnippet: {
          code: `const cars = ["Saab", "Volvo", "BMW"];\n// You can change an element:\ncars[0] = "Toyota";\n// You can add an element:\ncars.push("Audi");`,
          liveHtml: `<div style="font-family: monospace; background: #f8fafc; padding: 10px; border-radius: 4px; color: #04aa6d;">cars: ["Toyota", "Volvo", "BMW", "Audi"]</div>`,
        },
      },
    ],
  },
  operators: {
    title: "JavaScript Operators",
    subtitle: "JavaScript operators are used to perform different types of mathematical and logical computations.",
    prevSlug: "const",
    nextSlug: "data-types",
    sections: [
      {
        title: "JavaScript Assignment and Arithmetic",
        paragraphs: [
          "The Assignment Operator (=) assigns values to variables.",
          "The Addition Operator (+) adds numbers or concatenates strings.",
          "The Multiplication Operator (*) multiplies numbers.",
        ],
        codeSnippet: {
          code: `let x = 10;\nlet y = 5;\nlet sum = x + y;       // 15\nlet product = x * y;   // 50`,
        },
      },
      {
        title: "Comparison and Logical Operators",
        paragraphs: [
          "Comparison operators are used in logical statements to determine equality or difference between variables or values.",
        ],
        table: {
          headers: ["Operator", "Description", "Example"],
          rows: [
            ["==", "equal to", "x == 8"],
            ["===", "equal value and equal type", "x === 5"],
            ["!=", "not equal", "x != 8"],
            ["!==", "not equal value or not equal type", "x !== 5"],
            [">", "greater than", "x > 8"],
            ["<", "less than", "x < 8"],
            ["&&", "logical and", "(x < 10 && y > 1)"],
            ["||", "logical or", "(x == 5 || y == 5)"],
            ["!", "logical not", "!(x == y)"],
          ],
        },
      },
    ],
  },
  "data-types": {
    title: "JavaScript Data Types",
    subtitle: "JavaScript variables can hold different data types: numbers, strings, objects and more.",
    prevSlug: "operators",
    nextSlug: "functions",
    sections: [
      {
        title: "JavaScript has 8 Datatypes",
        paragraphs: [
          "1. String",
          "2. Number",
          "3. Bigint",
          "4. Boolean",
          "5. Undefined",
          "6. Null",
          "7. Symbol",
          "8. Object",
        ],
        codeSnippet: {
          code: `// Numbers:\nlet length = 16;\nlet weight = 7.5;\n\n// Strings:\nlet color = "Yellow";\nlet lastName = "Johnson";\n\n// Booleans:\nlet x = true;\nlet y = false;\n\n// Object:\nconst person = {firstName:"John", lastName:"Doe"};\n\n// Array object:\nconst cars = ["Saab", "Volvo", "BMW"];\n\n// Date object:\nconst date = new Date("2022-03-25");`,
        },
        tip: "A JavaScript variable can hold any type of data, dynamic typing allows reassigning different types.",
      },
      {
        title: "The typeof Operator",
        paragraphs: [
          "You can use the JavaScript typeof operator to find the type of a JavaScript variable:",
        ],
        codeSnippet: {
          code: `typeof ""             // Returns "string"\ntypeof "John"         // Returns "string"\ntypeof 314            // Returns "number"\ntypeof true           // Returns "boolean"`,
        },
      },
    ],
  },
  functions: {
    title: "JavaScript Functions",
    subtitle: "A JavaScript function is a block of code designed to perform a particular task.",
    prevSlug: "data-types",
    nextSlug: "objects",
    sections: [
      {
        title: "JavaScript Function Syntax",
        paragraphs: [
          "A JavaScript function is defined with the function keyword, followed by a name, followed by parentheses ().",
          "Function names can contain letters, digits, underscores, and dollar signs (same rules as variables).",
          "The parentheses may include parameter names separated by commas: (parameter1, parameter2, ...)",
        ],
        codeSnippet: {
          code: `function myFunction(p1, p2) {\n  return p1 * p2;   // The function returns the product of p1 and p2\n}`,
          liveHtml: `<div style="background: #f1f5f9; padding: 10px; border-radius: 4px;"><code>myFunction(4, 3) returns: 12</code></div>`,
        },
      },
      {
        title: "Function Return",
        paragraphs: [
          "When JavaScript reaches a return statement, the function will stop executing.",
          "If the function was invoked from a statement, JavaScript will 'return' to execute the code after the invoking statement.",
        ],
        codeSnippet: {
          code: `let x = toCelsius(77);\n\nfunction toCelsius(fahrenheit) {\n  return (5/9) * (fahrenheit-32);\n}`,
        },
      },
    ],
  },
  objects: {
    title: "JavaScript Objects",
    subtitle: "Real Life Objects, Properties, and Methods.",
    prevSlug: "functions",
    nextSlug: "events",
    sections: [
      {
        title: "JavaScript Object Definition",
        paragraphs: [
          "You define (and create) a JavaScript object with an object literal:",
        ],
        codeSnippet: {
          code: `const car = {\n  type: "Fiat",\n  model: "500",\n  color: "white"\n};`,
          liveHtml: `<div style="padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;"><code>car.type = Fiat, car.model = 500</code></div>`,
        },
      },
      {
        title: "Accessing Object Properties",
        paragraphs: [
          "You can access object properties in two ways:",
          "objectName.propertyName OR objectName[\"propertyName\"]",
        ],
        codeSnippet: {
          code: `person.lastName;\nperson["lastName"];`,
        },
      },
      {
        title: "Object Methods",
        paragraphs: [
          "Objects can also have methods. Methods are actions that can be performed on objects.",
          "Methods are stored in properties as function definitions.",
        ],
        codeSnippet: {
          code: `const person = {\n  firstName: "John",\n  lastName: "Doe",\n  fullName: function() {\n    return this.firstName + " " + this.lastName;\n  }\n};`,
        },
        note: "In a function definition, 'this' refers to the 'owner' of the function.",
      },
    ],
  },
  events: {
    title: "JavaScript Events",
    subtitle: "HTML events are 'things' that happen to HTML elements.",
    prevSlug: "objects",
    nextSlug: "strings",
    sections: [
      {
        title: "Common HTML Events",
        paragraphs: [
          "An HTML event can be something the browser does, or something a user does.",
        ],
        table: {
          headers: ["Event", "Description"],
          rows: [
            ["onchange", "An HTML element has been changed"],
            ["onclick", "The user clicks an HTML element"],
            ["onmouseover", "The user moves the mouse over an HTML element"],
            ["onmouseout", "The user moves the mouse away from an HTML element"],
            ["onkeydown", "The user pushes a keyboard key"],
            ["onload", "The browser has finished loading the page"],
          ],
        },
        codeSnippet: {
          code: `<button onclick="document.getElementById('demo').innerHTML = Date()">The time is?</button>`,
          liveHtml: `<button onclick="this.innerHTML = new Date().toLocaleTimeString()" style="background: #04aa6d; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 700; cursor: pointer;">Click to show Time</button>`,
        },
      },
    ],
  },
  strings: {
    title: "JavaScript Strings",
    subtitle: "JavaScript strings are for storing and manipulating text.",
    prevSlug: "events",
    nextSlug: "string-methods",
    sections: [
      {
        title: "String Length",
        paragraphs: [
          "To find the length of a string, use the built-in length property:",
        ],
        codeSnippet: {
          code: `let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";\nlet length = text.length;\nconsole.log(length); // 26`,
          liveHtml: `<p style="margin: 0; font-weight: 600; color: #1e293b;">Length of alphabet string: <strong>26</strong></p>`,
        },
      },
      {
        title: "Escape Characters",
        paragraphs: [
          "Because strings must be written within quotes, JavaScript will misunderstand this string: let text = \"We are the so-called \"Vikings\" from the north.\";",
          "To solve this problem, you can use the backslash escape character (\\):",
        ],
        codeSnippet: {
          code: `let text = "We are the so-called \\"Vikings\\" from the north.";`,
        },
      },
    ],
  },
  "string-methods": {
    title: "JavaScript String Methods",
    subtitle: "Basic string methods help you to manipulate strings efficiently.",
    prevSlug: "strings",
    nextSlug: "numbers",
    sections: [
      {
        title: "Extracting String Parts",
        paragraphs: [
          "There are 3 methods for extracting a part of a string:",
        ],
        bullets: [
          "slice(start, end)",
          "substring(start, end)",
          "substr(start, length)",
        ],
        codeSnippet: {
          code: `let text = "Apple, Banana, Kiwi";\nlet part = text.slice(7, 13); // "Banana"`,
        },
      },
      {
        title: "Replacing String Content",
        paragraphs: [
          "The replace() method replaces a specified value with another value in a string:",
        ],
        codeSnippet: {
          code: `let text = "Please visit Microsoft!";\nlet newText = text.replace("Microsoft", "W3Schools");`,
          liveHtml: `<p style="margin: 0; font-weight: 600; color: #04aa6d;">Please visit W3Schools!</p>`,
        },
        tip: "By default, the replace() method replaces only the first match.",
      },
    ],
  },
  numbers: {
    title: "JavaScript Numbers",
    subtitle: "JavaScript has only one type of number. Numbers can be written with or without decimals.",
    prevSlug: "string-methods",
    nextSlug: "arrays",
    sections: [
      {
        title: "JavaScript Numbers are 64-bit Floating Point",
        paragraphs: [
          "Unlike many other programming languages, JavaScript does not define different types of numbers, like integers, short, long, floating-point etc.",
          "JavaScript numbers are always stored as double precision floating point numbers, following the international IEEE 754 standard.",
        ],
        codeSnippet: {
          code: `let x = 3.14;    // A number with decimals\nlet y = 3;       // A number without decimals`,
        },
      },
      {
        title: "NaN - Not a Number",
        paragraphs: [
          "NaN is a JavaScript reserved word indicating that a number is not a legal number.",
          "Trying to do arithmetic with a non-numeric string will result in NaN:",
        ],
        codeSnippet: {
          code: `let x = 100 / "Apple";\nconsole.log(isNaN(x)); // true`,
        },
      },
    ],
  },
  arrays: {
    title: "JavaScript Arrays",
    subtitle: "An array is a special variable, which can hold more than one value.",
    prevSlug: "numbers",
    nextSlug: "array-methods",
    sections: [
      {
        title: "Creating an Array",
        paragraphs: [
          "Using an array literal is the easiest way to create a JavaScript Array:",
        ],
        codeSnippet: {
          code: `const cars = ["Saab", "Volvo", "BMW"];`,
          liveHtml: `<div style="padding: 10px; background: #f8fafc; border-radius: 4px;"><code>cars[0] = "Saab", cars[1] = "Volvo"</code></div>`,
        },
      },
      {
        title: "Accessing Array Elements",
        paragraphs: [
          "You access an array element by referring to the index number. Array indexes start with 0:",
        ],
        codeSnippet: {
          code: `const cars = ["Saab", "Volvo", "BMW"];\nlet car = cars[0]; // "Saab"`,
        },
      },
      {
        title: "The length Property",
        paragraphs: [
          "The length property of an array returns the length of an array (the number of array elements).",
        ],
        codeSnippet: {
          code: `const fruits = ["Banana", "Orange", "Apple", "Mango"];\nlet size = fruits.length; // 4`,
        },
      },
    ],
  },
  "array-methods": {
    title: "JavaScript Array Methods",
    subtitle: "Array methods allow you to work with arrays cleanly and perform common operations.",
    prevSlug: "arrays",
    nextSlug: "dates",
    sections: [
      {
        title: "Popping and Pushing",
        paragraphs: [
          "When you work with arrays, it is easy to remove elements and add new elements.",
          "The pop() method removes the last element from an array.",
          "The push() method adds a new element to an array (at the end).",
        ],
        codeSnippet: {
          code: `const fruits = ["Banana", "Orange", "Apple", "Mango"];\nfruits.pop();       // Removes "Mango"\nfruits.push("Kiwi"); // Adds "Kiwi"`,
          liveHtml: `<div style="padding: 10px; background: #f1f5f9; border-radius: 4px; font-family: monospace;">["Banana", "Orange", "Apple", "Kiwi"]</div>`,
        },
      },
      {
        title: "Shifting Elements",
        paragraphs: [
          "The shift() method removes the first array element and 'shifts' all other elements to a lower index.",
          "The unshift() method adds a new element to an array (at the beginning), and 'unshifts' older elements.",
        ],
        codeSnippet: {
          code: `fruits.shift();    // Removes the first element\nfruits.unshift("Lemon"); // Adds to beginning`,
        },
      },
    ],
  },
  dates: {
    title: "JavaScript Dates",
    subtitle: "JavaScript Date objects let us work with dates: year, month, day, hour, minute, second, and millisecond.",
    prevSlug: "array-methods",
    nextSlug: "math",
    sections: [
      {
        title: "Creating Date Objects",
        paragraphs: [
          "Date objects are created with the new Date() constructor.",
        ],
        codeSnippet: {
          code: `const d = new Date();\nconsole.log(d.toISOString());`,
          liveHtml: `<div style="font-family: monospace; padding: 10px; background: #f8fafc; border-radius: 4px; color: #04aa6d;">Current Date: ${new Date().toDateString()}</div>`,
        },
      },
    ],
  },
  math: {
    title: "JavaScript Math Object",
    subtitle: "The JavaScript Math object allows you to perform mathematical tasks on numbers.",
    prevSlug: "dates",
    nextSlug: "booleans",
    sections: [
      {
        title: "Math Methods",
        paragraphs: [
          "Unlike other objects, the Math object has no constructor. The Math object is static.",
          "All methods and properties can be used without creating a Math object first.",
        ],
        codeSnippet: {
          code: `Math.round(4.6);  // Returns 5\nMath.ceil(4.2);   // Returns 5\nMath.floor(4.9);  // Returns 4\nMath.trunc(4.9);  // Returns 4\nMath.pow(8, 2);   // Returns 64\nMath.sqrt(64);    // Returns 8\nMath.min(0, 150, 30, 20, -8, -200); // Returns -200\nMath.max(0, 150, 30, 20, -8, -200); // Returns 150\nMath.random();    // Returns random number between 0 and 1`,
        },
      },
    ],
  },
  booleans: {
    title: "JavaScript Booleans",
    subtitle: "A JavaScript Boolean represents one of two values: true or false.",
    prevSlug: "math",
    nextSlug: "comparisons",
    sections: [
      {
        title: "Boolean Values",
        paragraphs: [
          "Very often, in programming, you will need a data type that can only have one of two values, like: YES / NO, ON / OFF, TRUE / FALSE.",
          "For this, JavaScript has a Boolean data type. It can only take the values true or false.",
        ],
        codeSnippet: {
          code: `Boolean(10 > 9);   // returns true`,
          liveHtml: `<p style="margin: 0; font-weight: 700; color: #04aa6d;">10 > 9 is true</p>`,
        },
      },
      {
        title: "Everything With a 'Value' is True",
        paragraphs: [
          "Everything without a 'Value' is False: 0, -0, \"\", undefined, null, false, NaN.",
        ],
        codeSnippet: {
          code: `Boolean(100);        // true\nBoolean("Hello");    // true\nBoolean(0);          // false\nBoolean("");         // false\nBoolean(null);       // false`,
        },
      },
    ],
  },
  comparisons: {
    title: "JavaScript Comparison and Logical Operators",
    subtitle: "Comparison and Logical operators are used to test for true or false.",
    prevSlug: "booleans",
    nextSlug: "if-else",
    sections: [
      {
        title: "The Ternary Operator",
        paragraphs: [
          "JavaScript also contains a conditional operator that assigns a value to a variable based on some condition.",
          "variablename = (condition) ? value1 : value2",
        ],
        codeSnippet: {
          code: `let voteable = (age < 18) ? "Too young" : "Old enough";`,
        },
      },
    ],
  },
  "if-else": {
    title: "JavaScript If Else",
    subtitle: "Conditional statements are used to perform different actions based on different conditions.",
    prevSlug: "comparisons",
    nextSlug: "switch",
    sections: [
      {
        title: "Conditional Statements",
        paragraphs: [
          "In JavaScript we have the following conditional statements:",
        ],
        bullets: [
          "Use if to specify a block of code to be executed, if a specified condition is true",
          "Use else to specify a block of code to be executed, if the same condition is false",
          "Use else if to specify a new condition to test, if the first condition is false",
          "Use switch to specify many alternative blocks of code to be executed",
        ],
        codeSnippet: {
          code: `let hour = 14;\nlet greeting;\nif (hour < 18) {\n  greeting = "Good day";\n} else {\n  greeting = "Good evening";\n}`,
          liveHtml: `<p style="margin: 0; font-weight: 700; color: #04aa6d;">Good day</p>`,
        },
      },
    ],
  },
  switch: {
    title: "JavaScript Switch Statement",
    subtitle: "The switch statement is used to perform different actions based on different conditions.",
    prevSlug: "if-else",
    nextSlug: "loop-for",
    sections: [
      {
        title: "The JavaScript Switch Statement",
        paragraphs: [
          "Use the switch statement to select one of many code blocks to be executed.",
        ],
        codeSnippet: {
          code: `switch (new Date().getDay()) {\n  case 0:\n    day = "Sunday";\n    break;\n  case 1:\n    day = "Monday";\n    break;\n  case 2:\n    day = "Tuesday";\n    break;\n  case 3:\n    day = "Wednesday";\n    break;\n  case 4:\n    day = "Thursday";\n    break;\n  case 5:\n    day = "Friday";\n    break;\n  case 6:\n    day = "Saturday";\n}`,
        },
        tip: "When JavaScript reaches a break keyword, it breaks out of the switch block. This will stop the execution of more code.",
      },
    ],
  },
  "loop-for": {
    title: "JavaScript For Loop",
    subtitle: "Loops can execute a block of code a number of times.",
    prevSlug: "switch",
    nextSlug: "loop-while",
    sections: [
      {
        title: "The For Loop",
        paragraphs: [
          "The for statement creates a loop that is executed as long as a condition is true.",
        ],
        codeSnippet: {
          code: `for (let i = 0; i < 5; i++) {\n  console.log("The number is " + i);\n}`,
          liveHtml: `<div style="font-family: monospace; padding: 10px; background: #0f172a; color: #38bdf8; border-radius: 4px;">The number is 0<br/>The number is 1<br/>The number is 2<br/>The number is 3<br/>The number is 4</div>`,
        },
      },
    ],
  },
  "loop-while": {
    title: "JavaScript While Loop",
    subtitle: "Loops can execute a block of code as long as a specified condition is true.",
    prevSlug: "loop-for",
    nextSlug: "arrow-function",
    sections: [
      {
        title: "The While Loop",
        paragraphs: [
          "The while loop loops through a block of code as long as a specified condition is true.",
        ],
        codeSnippet: {
          code: `let i = 0;\nwhile (i < 10) {\n  text += "The number is " + i;\n  i++;\n}`,
        },
        note: "If you forget to increase the variable used in the condition, the loop will never end. This will crash your browser.",
      },
    ],
  },
  "arrow-function": {
    title: "JavaScript Arrow Function",
    subtitle: "Arrow functions were introduced in ES6. Arrow functions allow us to write shorter function syntax.",
    prevSlug: "loop-while",
    nextSlug: "classes",
    sections: [
      {
        title: "Arrow Function Syntax",
        paragraphs: [
          "Before arrow functions, you wrote regular function expressions:",
        ],
        codeSnippet: {
          code: `// Before:\nlet hello = function() {\n  return "Hello World!";\n}\n\n// With Arrow Function:\nlet helloArrow = () => "Hello World!";`,
          liveHtml: `<p style="margin: 0; font-weight: 700; color: #04aa6d;">Hello World!</p>`,
        },
        tip: "If the function has only one statement, and the statement returns a value, you can remove the brackets and the return keyword.",
      },
    ],
  },
  classes: {
    title: "JavaScript Classes",
    subtitle: "JavaScript Classes are templates for JavaScript Objects.",
    prevSlug: "arrow-function",
    nextSlug: "json",
    sections: [
      {
        title: "JavaScript Class Syntax",
        paragraphs: [
          "Use the keyword class to create a class. Always add a method named constructor():",
        ],
        codeSnippet: {
          code: `class Car {\n  constructor(name, year) {\n    this.name = name;\n    this.year = year;\n  }\n  age() {\n    const date = new Date();\n    return date.getFullYear() - this.year;\n  }\n}\n\nconst myCar = new Car("Ford", 2014);`,
          liveHtml: `<div style="padding: 10px; background: #f8fafc; border-radius: 4px;"><code>myCar.name = "Ford", age: 10+ years</code></div>`,
        },
      },
    ],
  },
  json: {
    title: "JavaScript JSON",
    subtitle: "JSON is a format for storing and transporting data. JSON is text, and text can easily be sent between computers.",
    prevSlug: "classes",
    nextSlug: "callbacks",
    sections: [
      {
        title: "JSON.parse() and JSON.stringify()",
        paragraphs: [
          "JSON.parse() converts a JSON text string into a JavaScript object.",
          "JSON.stringify() converts a JavaScript object into a JSON string.",
        ],
        codeSnippet: {
          code: `// Converting JSON String to JS Object:\nconst obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');\n\n// Converting JS Object to JSON String:\nconst jsonStr = JSON.stringify(obj);`,
          liveHtml: `<div style="font-family: monospace; padding: 10px; background: #f1f5f9; border-radius: 4px;">JSON string: {"name":"John","age":30,"city":"New York"}</div>`,
        },
      },
    ],
  },
  callbacks: {
    title: "JavaScript Callbacks",
    subtitle: "A callback is a function passed as an argument to another function.",
    prevSlug: "json",
    nextSlug: "promises",
    sections: [
      {
        title: "Callback Functions",
        paragraphs: [
          "A callback function can run after another function has finished.",
          "Where callbacks really shine are in asynchronous functions, where one function has to wait for another function (like waiting for a file to load).",
        ],
        codeSnippet: {
          code: `function myDisplayer(some) {\n  console.log(some);\n}\n\nfunction myCalculator(num1, num2, myCallback) {\n  let sum = num1 + num2;\n  myCallback(sum);\n}\n\nmyCalculator(5, 5, myDisplayer);`,
        },
      },
    ],
  },
  promises: {
    title: "JavaScript Promises",
    subtitle: "A Promise is an Object that links Producing code and Consuming code.",
    prevSlug: "callbacks",
    nextSlug: "async-await",
    sections: [
      {
        title: "Promise Syntax",
        paragraphs: [
          "A JavaScript Promise object contains both the producing code and calls to the consuming code:",
        ],
        codeSnippet: {
          code: `let myPromise = new Promise(function(myResolve, myReject) {\n  // "Producing Code" (May take some time)\n  myResolve("Success!"); // when successful\n  myReject("Error");  // when error\n});\n\n// "Consuming Code" (Must wait for a fulfilled Promise)\nmyPromise.then(\n  function(value) { console.log(value); },\n  function(error) { console.log(error); }\n);`,
        },
        tip: "A Promise can be in 3 states: Pending, Fulfilled, or Rejected.",
      },
    ],
  },
  "async-await": {
    title: "JavaScript Async / Await",
    subtitle: "async and await make promises easier to write. async makes a function return a Promise, await makes a function wait for a Promise.",
    prevSlug: "promises",
    nextSlug: "dom-intro",
    sections: [
      {
        title: "Async / Await Syntax",
        paragraphs: [
          "The keyword async before a function makes the function return a promise.",
          "The await keyword can only be used inside an async function. The await keyword makes the function pause the execution and wait for a resolved promise before it continues.",
        ],
        codeSnippet: {
          code: `async function myDisplay() {\n  let myPromise = new Promise(function(resolve) {\n    resolve("I love W3Schools !!");\n  });\n  let result = await myPromise;\n  console.log(result);\n}\n\nmyDisplay();`,
          liveHtml: `<div style="padding: 10px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; color: #166534; font-weight: 700;">I love W3Schools !!</div>`,
        },
      },
    ],
  },
  "dom-intro": {
    title: "JavaScript HTML DOM",
    subtitle: "With the HTML DOM, JavaScript can access and change all the elements of an HTML document.",
    prevSlug: "async-await",
    nextSlug: "dom-methods",
    sections: [
      {
        title: "The HTML DOM Tree of Objects",
        paragraphs: [
          "When a web page is loaded, the browser creates a Document Object Model of the page.",
          "With the object model, JavaScript gets all the power it needs to create dynamic HTML:",
        ],
        bullets: [
          "JavaScript can change all the HTML elements in the page",
          "JavaScript can change all the HTML attributes in the page",
          "JavaScript can change all the CSS styles in the page",
          "JavaScript can remove existing HTML elements and attributes",
          "JavaScript can add new HTML elements and attributes",
          "JavaScript can react to all existing HTML events in the page",
        ],
        codeSnippet: {
          code: `document.getElementById("demo").innerHTML = "Hello World!";`,
        },
      },
    ],
  },
};

export const W3_JS_EXERCISES: Record<string, ChapterExercise> = {
  output: {
    question: "Which JavaScript method is used to write data into the browser console?",
    options: ["console.log()", "window.print()", "document.write()", "terminal.write()"],
    correctIndex: 0,
    explanation: "console.log() writes output directly into the browser debugging console.",
  },
  variables: {
    question: "Which keyword is used to declare a variable with block scope that cannot be redeclared?",
    options: ["let", "var", "variable", "set"],
    correctIndex: 0,
    explanation: "'let' declares block-scoped variables that cannot be redeclared in the same scope.",
  },
  const: {
    question: "Which keyword creates a block-scoped constant reference that cannot be reassigned?",
    options: ["const", "immutable", "let", "fixed"],
    correctIndex: 0,
    explanation: "Variables defined with 'const' cannot be reassigned after declaration.",
  },
  functions: {
    question: "Which keyword is used to define a function in JavaScript?",
    options: ["function", "def", "fn", "method"],
    correctIndex: 0,
    explanation: "The 'function' keyword is the standard keyword for defining functions in JavaScript.",
  },
  arrays: {
    question: "Which array method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "append()"],
    correctIndex: 0,
    explanation: "push() adds elements to the end of an array and returns the new length.",
  },
};

export const W3_JS_CHALLENGES: Record<string, ChapterChallenge> = {
  output: {
    instruction: "Use console.log to output 'Hello World' in JavaScript.",
    beforeCode: "console.",
    placeholder: "log('Hello World')",
    afterCode: ";",
    correctAnswer: ["log('hello world')", 'log("hello world")', "log('Hello World')", 'log("Hello World")'],
    hint: "Use log('Hello World')",
    previewSnippet: () =>
      `<p style="margin: 0; color: #04aa6d; font-family: monospace; font-weight: 700;">> Hello World</p>`,
  },
  variables: {
    instruction: "Declare a variable named carName and assign the value 'Volvo' to it using let.",
    beforeCode: "let ",
    placeholder: 'carName = "Volvo"',
    afterCode: ";",
    correctAnswer: ['carname = "volvo"', "carname = 'volvo'", 'carName = "Volvo"', "carName = 'Volvo'"],
    hint: 'Type: carName = "Volvo"',
    previewSnippet: (val) =>
      val.toLowerCase().includes("volvo")
        ? `<div style="font-family: monospace; color: #04aa6d;">let carName = "Volvo" (Valid variable assignment)</div>`
        : `<div style="font-family: monospace; color: #94a3b8;">Assign variable...</div>`,
  },
  functions: {
    instruction: "Create a function named greet that returns 'Hello!'.",
    beforeCode: "function greet() {\n  return ",
    placeholder: '"Hello!"',
    afterCode: ";\n}",
    correctAnswer: ['"hello!"', "'hello!'", '"Hello!"', "'Hello!'"],
    hint: 'Return the string "Hello!"',
    previewSnippet: () =>
      `<div style="font-family: monospace; color: #04aa6d;">greet() => "Hello!"</div>`,
  },
};

export function getChapterJsExercise(slug: string): ChapterExercise {
  if (W3_JS_EXERCISES[slug]) {
    return W3_JS_EXERCISES[slug];
  }

  const currentItem = ALL_JS_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    question: `What is the primary role of ${title} in JavaScript?`,
    options: [
      `To handle program logic, data, or DOM interaction for ${title}`,
      `To define CSS media queries`,
      `To compile server binaries`,
      `To validate HTML doctype`,
    ],
    correctIndex: 0,
    explanation: `${title} is a core feature of the ECMAScript standard for client-side and server-side JavaScript.`,
  };
}

export function getChapterJsChallenge(slug: string): ChapterChallenge {
  if (W3_JS_CHALLENGES[slug]) {
    return W3_JS_CHALLENGES[slug];
  }

  const currentItem = ALL_JS_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();
  const cleanKeyword = slug.replace(/^js-/, "").toLowerCase();

  return {
    instruction: `Write the correct JavaScript statement for ${title}.`,
    beforeCode: `// Example of ${title}\n`,
    placeholder: `${cleanKeyword}Result();`,
    afterCode: `\nconsole.log("Done");`,
    correctAnswer: [`${cleanKeyword}result();`, `${cleanKeyword}Result();`, cleanKeyword],
    hint: `Execute or declare ${cleanKeyword}.`,
    previewSnippet: () =>
      `<div style="padding: 12px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 4px; color: #166534; font-family: monospace;">// Executed ${title} successfully</div>`,
  };
}

export function getChapterJsData(slug: string): W3ChapterData {
  const currentIndex = ALL_JS_CHAPTERS.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? ALL_JS_CHAPTERS[currentIndex - 1] : ALL_JS_CHAPTERS[0];
  const nextChapter = currentIndex >= 0 && currentIndex < ALL_JS_CHAPTERS.length - 1 
    ? ALL_JS_CHAPTERS[currentIndex + 1] 
    : ALL_JS_CHAPTERS[ALL_JS_CHAPTERS.length - 1];

  if (W3_JS_CHAPTERS[slug]) {
    const existing = W3_JS_CHAPTERS[slug];
    return {
      ...existing,
      prevSlug: prevChapter.slug,
      nextSlug: nextChapter.slug,
    };
  }

  const currentItem = ALL_JS_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    title: title,
    subtitle: `Learn all about ${title} in JavaScript with interactive examples and Try it Yourself code editor.`,
    prevSlug: prevChapter ? prevChapter.slug : "home",
    nextSlug: nextChapter ? nextChapter.slug : "introduction",
    sections: [
      {
        title: `Understanding ${title}`,
        paragraphs: [
          `${title} is an essential concept in modern JavaScript programming.`,
          `It allows web developers to manipulate dynamic page data, respond to user actions, and write maintainable logic for modern web applications.`,
        ],
        codeSnippet: {
          code: `// Demonstration of ${title}\nlet demo = "${title}";\nconsole.log("Learning " + demo);`,
          liveHtml: `<div style="padding: 14px; background: #1e293b; color: #38bdf8; border-radius: 6px; font-family: monospace;">// Console Output:<br/>&gt; Learning ${title} on DevAcademy</div>`,
        },
        tip: `Always use modern ES6+ syntax (let, const, arrow functions) when writing JavaScript.`,
      },
    ],
  };
}
