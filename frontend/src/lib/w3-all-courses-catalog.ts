import { SidebarSection, W3ChapterData, ChapterExercise, ChapterChallenge, ChapterItem } from "./w3-html-chapters-data";

export interface UniversalCourseMeta {
  id: string;
  name: string;
  slug: string;
  title: string;
  badgeLabel: string;
  badgeColor: string;
  badgeTextColor?: string;
  category: string;
  learnHeading: string;
  leads: string[];
  exampleIntro: string;
  codeSnippet: string;
  previewOutput: string;
  exercise: {
    question: string;
    options: { key: string; label: string; code?: string }[];
    correctKey: string;
    correctExplanation: string;
    wrongExplanation: string;
  };
  references: { title: string; href: string }[];
  certTitle: string;
  certEyebrow: string;
  certDesc: string;
  certSpec: string;
  videoTitle: string;
  videoMinutes: string;
  sections: SidebarSection[];
}

export const SLUG_TO_TECH_MAP: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JAVASCRIPT",
  js: "JAVASCRIPT",
  sql: "SQL",
  python: "PYTHON",
  java: "JAVA",
  php: "PHP",
  c: "C",
  cpp: "C++",
  "c++": "C++",
  csharp: "C#",
  "c#": "C#",
  aws: "AWS",
  w3css: "W3.CSS",
  "w3.css": "W3.CSS",
  howto: "HOW TO",
  "how to": "HOW TO",
  bootstrap: "BOOTSTRAP",
  bootstrap4: "BOOTSTRAP",
  bootstrap5: "BOOTSTRAP",
  react: "REACT",
  mysql: "MYSQL",
  jquery: "JQUERY",
  excel: "EXCEL",
  xml: "XML",
  django: "DJANGO",
  numpy: "NUMPY",
  pandas: "PANDAS",
  nodejs: "NODEJS",
  dsa: "DSA",
  typescript: "TYPESCRIPT",
  angular: "ANGULAR",
  angularjs: "ANGULARJS",
  git: "GIT",
  postgresql: "POSTGRESQL",
  mongodb: "MONGODB",
  asp: "ASP",
  ai: "AI",
  r: "R",
  go: "GO",
  kotlin: "KOTLIN",
  swift: "SWIFT",
  sass: "SASS",
  vue: "VUE",
  "gen-ai": "GEN AI",
  "gen ai": "GEN AI",
  scipy: "SCIPY",
  cybersecurity: "CYBERSECURITY",
  datascience: "DATA SCIENCE",
  "data science": "DATA SCIENCE",
  "intro-programming": "INTRO TO PROGRAMMING",
  "intro to programming": "INTRO TO PROGRAMMING",
  "intro-html-css": "INTRO TO HTML & CSS",
  "intro to html & css": "INTRO TO HTML & CSS",
  bash: "BASH",
  rust: "RUST",
  tools: "TOOLS",
};

export const TECH_TO_SLUG_MAP: Record<string, string> = {
  HTML: "html",
  CSS: "css",
  JAVASCRIPT: "javascript",
  SQL: "sql",
  PYTHON: "python",
  JAVA: "java",
  PHP: "php",
  C: "c",
  "C++": "cpp",
  "C#": "csharp",
  AWS: "aws",
  "W3.CSS": "w3css",
  "HOW TO": "howto",
  BOOTSTRAP: "bootstrap",
  REACT: "react",
  MYSQL: "mysql",
  JQUERY: "jquery",
  EXCEL: "excel",
  XML: "xml",
  DJANGO: "django",
  NUMPY: "numpy",
  PANDAS: "pandas",
  NODEJS: "nodejs",
  DSA: "dsa",
  TYPESCRIPT: "typescript",
  ANGULAR: "angular",
  ANGULARJS: "angularjs",
  GIT: "git",
  POSTGRESQL: "postgresql",
  MONGODB: "mongodb",
  ASP: "asp",
  AI: "ai",
  R: "r",
  GO: "go",
  KOTLIN: "kotlin",
  SWIFT: "swift",
  SASS: "sass",
  VUE: "vue",
  "GEN AI": "gen-ai",
  SCIPY: "scipy",
  CYBERSECURITY: "cybersecurity",
  "DATA SCIENCE": "datascience",
  "INTRO TO PROGRAMMING": "intro-programming",
  "INTRO TO HTML & CSS": "intro-html-css",
  BASH: "bash",
  RUST: "rust",
  TOOLS: "tools",
};

export function normalizeTechKey(input: string): string {
  const clean = (input || "").trim().toLowerCase();
  if (SLUG_TO_TECH_MAP[clean]) {
    return SLUG_TO_TECH_MAP[clean];
  }
  const upper = (input || "").trim().toUpperCase();
  if (TECH_TO_SLUG_MAP[upper]) {
    return upper;
  }
  return "HTML";
}

export function getSlugForTech(tech: string): string {
  const norm = normalizeTechKey(tech);
  return TECH_TO_SLUG_MAP[norm] || "html";
}

export function attachCaretSubItems(items: ChapterItem[]): ChapterItem[] {
  return items.map((item) => {
    if (item.slug === "home" || item.slug === "project" || item.subItems) {
      return item;
    }
    const cleanName = item.name.replace(/^[A-Za-z0-9#+.]+\s+/i, "");
    return {
      ...item,
      hasCaret: true,
      subItems: [
        { name: cleanName, slug: item.slug },
        { name: "Exercise", slug: "exercises" },
      ],
    };
  });
}

export function prepareSectionsWithCarets(sections: SidebarSection[]): SidebarSection[] {
  return sections.map((sec) => ({
    ...sec,
    items: attachCaretSubItems(sec.items),
  }));
}

// Master Course Catalog Definitions
export const ALL_COURSES_CATALOG: Record<string, UniversalCourseMeta> = {
  JAVA: {
    id: "JAVA",
    name: "Java",
    slug: "java",
    title: "Java Tutorial",
    badgeLabel: "Java 21",
    badgeColor: "#ea580c",
    category: "Programming",
    learnHeading: "Learn Java",
    leads: [
      "Java is an extremely popular programming language, created in 1995.",
      "It is owned by Oracle, and more than 3 billion devices run Java.",
      "It is used for mobile apps (Android), enterprise desktop apps, web servers, backend systems, and big data processing.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit Java code and view the terminal output:",
    codeSnippet: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World from Java!");\n    int x = 10;\n    int y = 25;\n    System.out.println("Sum: " + (x + y));\n  }\n}`,
    previewOutput: "Hello World from Java!\nSum: 35",
    exercise: {
      question: "What is the correct syntax to output 'Hello World' in Java?",
      options: [
        { key: "A", label: "System.out.println(\"Hello World\");", code: "System.out.println(\"Hello World\");" },
        { key: "B", label: "Console.WriteLine(\"Hello World\");", code: "Console.WriteLine(\"Hello World\");" },
        { key: "C", label: "print(\"Hello World\");", code: "print(\"Hello World\");" },
      ],
      correctKey: "A",
      correctExplanation: "In Java, the standard statement to print text to the console is System.out.println().",
      wrongExplanation: "Incorrect. Console.WriteLine is used in C#, while print() is used in Python.",
    },
    references: [
      { title: "Java Syntax", href: "/learn/java/syntax" },
      { title: "Java Variables", href: "/learn/java/variables" },
      { title: "Java Data Types", href: "/learn/java/data-types" },
      { title: "Java Operators", href: "/learn/java/operators" },
      { title: "Java Strings", href: "/learn/java/strings" },
      { title: "Java If...Else", href: "/learn/java/if-else" },
      { title: "Java Loops", href: "/learn/java/loops" },
      { title: "Java Methods", href: "/learn/java/methods" },
      { title: "Java Classes & OOP", href: "/learn/java/classes" },
    ],
    certTitle: "Java Developer Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Validate your Java skills and boost your backend & enterprise developer career.",
    certSpec: "Certified Java Specialist",
    videoTitle: "Video: Java Programming Full Course",
    videoMinutes: "50 minutes",
    sections: [
      {
        title: "Java Tutorial",
        items: [
          { name: "Java HOME", slug: "home" },
          { name: "Java Intro", slug: "introduction" },
          { name: "Java Get Started", slug: "get-started" },
          { name: "Java Syntax", slug: "syntax" },
          { name: "Java Output", slug: "output" },
          { name: "Java Comments", slug: "comments" },
          { name: "Java Variables", slug: "variables" },
          { name: "Java Data Types", slug: "data-types" },
          { name: "Java Type Casting", slug: "type-casting" },
          { name: "Java Operators", slug: "operators" },
          { name: "Java Strings", slug: "strings" },
          { name: "Java Math", slug: "math" },
          { name: "Java Booleans", slug: "booleans" },
          { name: "Java If...Else", slug: "if-else" },
          { name: "Java Switch", slug: "switch" },
          { name: "Java While Loop", slug: "while-loop" },
          { name: "Java For Loop", slug: "for-loop" },
          { name: "Java Break/Continue", slug: "break-continue" },
          { name: "Java Arrays", slug: "arrays" },
        ],
      },
      {
        title: "Java Methods & OOP",
        items: [
          { name: "Java Methods", slug: "methods" },
          { name: "Java Method Parameters", slug: "method-parameters" },
          { name: "Java Method Overloading", slug: "method-overloading" },
          { name: "Java Scope", slug: "scope" },
          { name: "Java Recursion", slug: "recursion" },
          { name: "Java OOP", slug: "classes" },
          { name: "Java Classes/Objects", slug: "classes-objects" },
          { name: "Java Class Attributes", slug: "class-attributes" },
          { name: "Java Class Methods", slug: "class-methods" },
          { name: "Java Constructors", slug: "constructors" },
          { name: "Java Modifiers", slug: "modifiers" },
          { name: "Java Encapsulation", slug: "encapsulation" },
          { name: "Java Packages", slug: "packages" },
          { name: "Java Inheritance", slug: "inheritance" },
          { name: "Java Polymorphism", slug: "polymorphism" },
          { name: "Java Abstraction", slug: "abstraction" },
          { name: "Java Interface", slug: "interface" },
        ],
      },
    ],
  },

  PHP: {
    id: "PHP",
    name: "PHP",
    slug: "php",
    title: "PHP Tutorial",
    badgeLabel: "PHP 8",
    badgeColor: "#7c3aed",
    category: "Backend Development",
    learnHeading: "Learn PHP",
    leads: [
      "PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages.",
      "PHP is widely-used, free, and efficient alternative to competitors such as Microsoft's ASP.",
      "PHP powers popular systems like WordPress, Drupal, and Laravel.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit PHP script and view the rendered result:",
    codeSnippet: `<?php\n  $txt = "DevAcademy";\n  echo "Welcome to $txt!<br>";\n  $colors = array("Red", "Green", "Blue");\n  foreach ($colors as $value) {\n    echo "$value ";\n  }\n?>`,
    previewOutput: "Welcome to DevAcademy!\nRed Green Blue",
    exercise: {
      question: "Which symbol is used for variables in PHP?",
      options: [
        { key: "A", label: "$", code: "$" },
        { key: "B", label: "@", code: "@" },
        { key: "C", label: "&", code: "&" },
      ],
      correctKey: "A",
      correctExplanation: "All variables in PHP must begin with a dollar sign ($), for example $name.",
      wrongExplanation: "Incorrect. In PHP the @ symbol is used for error suppression, while & is used for references.",
    },
    references: [
      { title: "PHP Syntax", href: "/learn/php/syntax" },
      { title: "PHP Variables", href: "/learn/php/variables" },
      { title: "PHP Echo/Print", href: "/learn/php/echo-print" },
      { title: "PHP Data Types", href: "/learn/php/data-types" },
      { title: "PHP Strings", href: "/learn/php/strings" },
      { title: "PHP Numbers", href: "/learn/php/numbers" },
      { title: "PHP If...Else", href: "/learn/php/if-else" },
      { title: "PHP Loops", href: "/learn/php/loops" },
      { title: "PHP Functions", href: "/learn/php/functions" },
    ],
    certTitle: "PHP Backend Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Master server-side scripting with PHP and build scalable dynamic web applications.",
    certSpec: "Certified PHP Developer",
    videoTitle: "Video: PHP Full Course for Beginners",
    videoMinutes: "40 minutes",
    sections: [
      {
        title: "PHP Tutorial",
        items: [
          { name: "PHP HOME", slug: "home" },
          { name: "PHP Intro", slug: "introduction" },
          { name: "PHP Install", slug: "install" },
          { name: "PHP Syntax", slug: "syntax" },
          { name: "PHP Comments", slug: "comments" },
          { name: "PHP Variables", slug: "variables" },
          { name: "PHP Echo/Print", slug: "echo-print" },
          { name: "PHP Data Types", slug: "data-types" },
          { name: "PHP Strings", slug: "strings" },
          { name: "PHP Numbers", slug: "numbers" },
          { name: "PHP Math", slug: "math" },
          { name: "PHP Constants", slug: "constants" },
          { name: "PHP Operators", slug: "operators" },
          { name: "PHP If...Else", slug: "if-else" },
          { name: "PHP Switch", slug: "switch" },
          { name: "PHP Loops", slug: "loops" },
          { name: "PHP Functions", slug: "functions" },
          { name: "PHP Arrays", slug: "arrays" },
          { name: "PHP Superglobals", slug: "superglobals" },
        ],
      },
      {
        title: "PHP Forms & OOP",
        items: [
          { name: "PHP Form Handling", slug: "form-handling" },
          { name: "PHP Form Validation", slug: "form-validation" },
          { name: "PHP OOP", slug: "oop" },
          { name: "PHP Classes/Objects", slug: "classes-objects" },
          { name: "PHP Constructor", slug: "constructor" },
          { name: "PHP Destructor", slug: "destructor" },
          { name: "PHP Access Modifiers", slug: "access-modifiers" },
          { name: "PHP Inheritance", slug: "inheritance" },
        ],
      },
    ],
  },

  C: {
    id: "C",
    name: "C",
    slug: "c",
    title: "C Tutorial",
    badgeLabel: "C",
    badgeColor: "#2563eb",
    category: "System Programming",
    learnHeading: "Learn C",
    leads: [
      "C is a general-purpose programming language created by Dennis Ritchie at the Bell Laboratories in 1972.",
      "It is a very popular language, despite being old. The main reason is that it is the base language in computer science.",
      "C is strongly associated with UNIX, as it was developed to write the UNIX operating system.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit C code and view the compiled output:",
    codeSnippet: `#include <stdio.h>\n\nint main() {\n  printf("Hello World from C!\\n");\n  int myNum = 15;\n  printf("Number is: %d\\n", myNum);\n  return 0;\n}`,
    previewOutput: "Hello World from C!\nNumber is: 15",
    exercise: {
      question: "How do you insert COMMENTS in C code?",
      options: [
        { key: "A", label: "// This is a comment", code: "// This is a comment" },
        { key: "B", label: "# This is a comment", code: "# This is a comment" },
        { key: "C", label: "<!-- This is a comment -->", code: "<!-- This is a comment -->" },
      ],
      correctKey: "A",
      correctExplanation: "In C, single-line comments start with two forward slashes (//).",
      wrongExplanation: "The # symbol is used for preprocessor directives in C or comments in Python, while <!-- --> is used for HTML.",
    },
    references: [
      { title: "C Syntax", href: "/learn/c/syntax" },
      { title: "C Output", href: "/learn/c/output" },
      { title: "C Variables", href: "/learn/c/variables" },
      { title: "C Data Types", href: "/learn/c/data-types" },
      { title: "C Operators", href: "/learn/c/operators" },
      { title: "C If...Else", href: "/learn/c/if-else" },
      { title: "C Loops", href: "/learn/c/loops" },
      { title: "C Functions", href: "/learn/c/functions" },
      { title: "C Pointers", href: "/learn/c/pointers" },
    ],
    certTitle: "C Programming Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Master low-level programming, memory management, and pointers with C.",
    certSpec: "Certified C Programmer",
    videoTitle: "Video: C Programming in 1 Hour",
    videoMinutes: "60 minutes",
    sections: [
      {
        title: "C Tutorial",
        items: [
          { name: "C HOME", slug: "home" },
          { name: "C Intro", slug: "introduction" },
          { name: "C Get Started", slug: "get-started" },
          { name: "C Syntax", slug: "syntax" },
          { name: "C Output", slug: "output" },
          { name: "C Comments", slug: "comments" },
          { name: "C Variables", slug: "variables" },
          { name: "C Data Types", slug: "data-types" },
          { name: "C Constants", slug: "constants" },
          { name: "C Operators", slug: "operators" },
          { name: "C Booleans", slug: "booleans" },
          { name: "C If...Else", slug: "if-else" },
          { name: "C Switch", slug: "switch" },
          { name: "C While Loop", slug: "while-loop" },
          { name: "C For Loop", slug: "for-loop" },
          { name: "C Break/Continue", slug: "break-continue" },
          { name: "C Arrays", slug: "arrays" },
          { name: "C Strings", slug: "strings" },
          { name: "C User Input", slug: "user-input" },
          { name: "C Memory Address", slug: "memory-address" },
          { name: "C Pointers", slug: "pointers" },
        ],
      },
    ],
  },

  "C++": {
    id: "C++",
    name: "C++",
    slug: "cpp",
    title: "C++ Tutorial",
    badgeLabel: "C++20",
    badgeColor: "#0284c7",
    category: "System & Game Dev",
    learnHeading: "Learn C++",
    leads: [
      "C++ is a cross-platform language that can be used to create high-performance applications.",
      "C++ was developed by Bjarne Stroustrup, as an extension to the C language.",
      "C++ gives programmers a high level of control over system resources and memory.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit C++ code and view the terminal output:",
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World from C++!" << endl;\n  int x = 20, y = 30;\n  cout << "Total: " << (x + y) << endl;\n  return 0;\n}`,
    previewOutput: "Hello World from C++!\nTotal: 50",
    exercise: {
      question: "Which header file allows us to work with input and output objects in C++?",
      options: [
        { key: "A", label: "#include <iostream>", code: "#include <iostream>" },
        { key: "B", label: "#include <stdio.h>", code: "#include <stdio.h>" },
        { key: "C", label: "#include <input>", code: "#include <input>" },
      ],
      correctKey: "A",
      correctExplanation: "In C++, the standard library header for input/output streams like cin and cout is <iostream>.",
      wrongExplanation: "stdio.h is a legacy C header, while <iostream> is the modern standard header in C++.",
    },
    references: [
      { title: "C++ Syntax", href: "/learn/cpp/syntax" },
      { title: "C++ Output", href: "/learn/cpp/output" },
      { title: "C++ Variables", href: "/learn/cpp/variables" },
      { title: "C++ Operators", href: "/learn/cpp/operators" },
      { title: "C++ Strings", href: "/learn/cpp/strings" },
      { title: "C++ If...Else", href: "/learn/cpp/if-else" },
      { title: "C++ Loops", href: "/learn/cpp/loops" },
      { title: "C++ Functions", href: "/learn/cpp/functions" },
      { title: "C++ OOP", href: "/learn/cpp/classes" },
    ],
    certTitle: "C++ Specialist Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Prove your expertise in high-performance computing, memory management, and OOP with C++.",
    certSpec: "Certified C++ Developer",
    videoTitle: "Video: C++ Tutorial for Beginners",
    videoMinutes: "55 minutes",
    sections: [
      {
        title: "C++ Tutorial",
        items: [
          { name: "C++ HOME", slug: "home" },
          { name: "C++ Intro", slug: "introduction" },
          { name: "C++ Get Started", slug: "get-started" },
          { name: "C++ Syntax", slug: "syntax" },
          { name: "C++ Output", slug: "output" },
          { name: "C++ Comments", slug: "comments" },
          { name: "C++ Variables", slug: "variables" },
          { name: "C++ User Input", slug: "user-input" },
          { name: "C++ Data Types", slug: "data-types" },
          { name: "C++ Operators", slug: "operators" },
          { name: "C++ Strings", slug: "strings" },
          { name: "C++ Math", slug: "math" },
          { name: "C++ Booleans", slug: "booleans" },
          { name: "C++ Conditions", slug: "conditions" },
          { name: "C++ Switch", slug: "switch" },
          { name: "C++ While Loop", slug: "while-loop" },
          { name: "C++ For Loop", slug: "for-loop" },
          { name: "C++ Break/Continue", slug: "break-continue" },
          { name: "C++ Arrays", slug: "arrays" },
          { name: "C++ Structures", slug: "structures" },
          { name: "C++ References", slug: "references" },
          { name: "C++ Pointers", slug: "pointers" },
        ],
      },
      {
        title: "C++ OOP",
        items: [
          { name: "C++ OOP", slug: "classes" },
          { name: "C++ Classes/Objects", slug: "classes-objects" },
          { name: "C++ Class Methods", slug: "class-methods" },
          { name: "C++ Constructors", slug: "constructors" },
          { name: "C++ Access Specifiers", slug: "access-specifiers" },
          { name: "C++ Encapsulation", slug: "encapsulation" },
          { name: "C++ Inheritance", slug: "inheritance" },
          { name: "C++ Polymorphism", slug: "polymorphism" },
        ],
      },
    ],
  },

  "C#": {
    id: "C#",
    name: "C#",
    slug: "csharp",
    title: "C# Tutorial",
    badgeLabel: "C# 12",
    badgeColor: "#9333ea",
    category: "Enterprise & Game Dev",
    learnHeading: "Learn C#",
    leads: [
      "C# (C-Sharp) is an object-oriented programming language created by Microsoft that runs on the .NET Framework.",
      "C# has roots from the C family, and the language is close to other popular languages like C++ and Java.",
      "It is used for mobile apps, desktop apps, web apps, enterprise software, and Unity game development.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit C# code and view the result in the console:",
    codeSnippet: `using System;\n\nnamespace HelloWorld {\n  class Program {\n    static void Main(string[] args) {\n      Console.WriteLine("Hello World from C#!");\n      string name = "DevAcademy";\n      Console.WriteLine($"Welcome to {name}!");\n    }\n  }\n}`,
    previewOutput: "Hello World from C#!\nWelcome to DevAcademy!",
    exercise: {
      question: "Which method is used to print text in C#?",
      options: [
        { key: "A", label: "Console.WriteLine()", code: "Console.WriteLine()" },
        { key: "B", label: "print()", code: "print()" },
        { key: "C", label: "System.out.println()", code: "System.out.println()" },
      ],
      correctKey: "A",
      correctExplanation: "In C# .NET, the standard method to print text to the console is Console.WriteLine().",
      wrongExplanation: "print() is used in Python, while System.out.println() is used in Java.",
    },
    references: [
      { title: "C# Syntax", href: "/learn/csharp/syntax" },
      { title: "C# Output", href: "/learn/csharp/output" },
      { title: "C# Variables", href: "/learn/csharp/variables" },
      { title: "C# Data Types", href: "/learn/csharp/data-types" },
      { title: "C# Operators", href: "/learn/csharp/operators" },
      { title: "C# Strings", href: "/learn/csharp/strings" },
      { title: "C# If...Else", href: "/learn/csharp/if-else" },
      { title: "C# Loops", href: "/learn/csharp/loops" },
      { title: "C# OOP", href: "/learn/csharp/classes" },
    ],
    certTitle: "C# & .NET Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Validate your skills in modern C#, .NET architecture, and enterprise software engineering.",
    certSpec: "Certified C# Developer",
    videoTitle: "Video: C# Full Course for Beginners",
    videoMinutes: "50 minutes",
    sections: [
      {
        title: "C# Tutorial",
        items: [
          { name: "C# HOME", slug: "home" },
          { name: "C# Intro", slug: "introduction" },
          { name: "C# Get Started", slug: "get-started" },
          { name: "C# Syntax", slug: "syntax" },
          { name: "C# Output", slug: "output" },
          { name: "C# Comments", slug: "comments" },
          { name: "C# Variables", slug: "variables" },
          { name: "C# Data Types", slug: "data-types" },
          { name: "C# Type Casting", slug: "type-casting" },
          { name: "C# User Input", slug: "user-input" },
          { name: "C# Operators", slug: "operators" },
          { name: "C# Math", slug: "math" },
          { name: "C# Strings", slug: "strings" },
          { name: "C# Booleans", slug: "booleans" },
          { name: "C# If...Else", slug: "if-else" },
          { name: "C# Switch", slug: "switch" },
          { name: "C# While Loop", slug: "while-loop" },
          { name: "C# For Loop", slug: "for-loop" },
          { name: "C# Break/Continue", slug: "break-continue" },
          { name: "C# Arrays", slug: "arrays" },
        ],
      },
      {
        title: "C# Methods & OOP",
        items: [
          { name: "C# Methods", slug: "methods" },
          { name: "C# Method Parameters", slug: "method-parameters" },
          { name: "C# OOP", slug: "classes" },
          { name: "C# Classes/Objects", slug: "classes-objects" },
          { name: "C# Constructors", slug: "constructors" },
          { name: "C# Access Modifiers", slug: "access-modifiers" },
          { name: "C# Properties", slug: "properties" },
          { name: "C# Inheritance", slug: "inheritance" },
          { name: "C# Polymorphism", slug: "polymorphism" },
        ],
      },
    ],
  },

  REACT: {
    id: "REACT",
    name: "React",
    slug: "react",
    title: "React Tutorial",
    badgeLabel: "React 19",
    badgeColor: "#06b6d4",
    category: "Frontend Library",
    learnHeading: "Learn React",
    leads: [
      "React is a popular JavaScript library for building user interfaces.",
      "React is used to build single-page applications and interactive web apps.",
      "React allows us to create reusable UI components that manage their own state.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit the React component and see the rendered UI:",
    codeSnippet: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <h2>Count: {count}</h2>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}`,
    previewOutput: "Count: 0\n[ Increment Button ]",
    exercise: {
      question: "What is the correct command to create a new React app with Vite?",
      options: [
        { key: "A", label: "npm create vite@latest my-app", code: "npm create vite@latest my-app" },
        { key: "B", label: "install react my-app", code: "install react my-app" },
        { key: "C", label: "make react-app", code: "make react-app" },
      ],
      correctKey: "A",
      correctExplanation: "The recommended modern CLI command to scaffold a React project with Vite is npm create vite@latest.",
      wrongExplanation: "The other options are not valid CLI commands to initialize a React application.",
    },
    references: [
      { title: "React JSX", href: "/learn/react/jsx" },
      { title: "React Components", href: "/learn/react/components" },
      { title: "React Props", href: "/learn/react/props" },
      { title: "React State", href: "/learn/react/state" },
      { title: "React Hooks", href: "/learn/react/hooks" },
      { title: "useState Hook", href: "/learn/react/use-state" },
      { title: "useEffect Hook", href: "/learn/react/use-effect" },
      { title: "React Forms", href: "/learn/react/forms" },
      { title: "React Router", href: "/learn/react/router" },
    ],
    certTitle: "React Developer Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Become a certified React specialist and build modern, state-driven frontends with ease.",
    certSpec: "Certified React Specialist",
    videoTitle: "Video: React Full Course",
    videoMinutes: "45 minutes",
    sections: [
      {
        title: "React Tutorial",
        items: [
          { name: "React HOME", slug: "home" },
          { name: "React Intro", slug: "introduction" },
          { name: "React Get Started", slug: "get-started" },
          { name: "React Upgrade", slug: "upgrade" },
          { name: "React ES6", slug: "es6" },
          { name: "React Render HTML", slug: "render-html" },
          { name: "React JSX", slug: "jsx" },
          { name: "React Components", slug: "components" },
          { name: "React Class", slug: "class" },
          { name: "React Props", slug: "props" },
          { name: "React Events", slug: "events" },
          { name: "React Conditionals", slug: "conditionals" },
          { name: "React Lists", slug: "lists" },
          { name: "React Forms", slug: "forms" },
          { name: "React Router", slug: "router" },
          { name: "React Memo", slug: "memo" },
          { name: "React CSS Styling", slug: "css-styling" },
        ],
      },
      {
        title: "React Hooks",
        items: [
          { name: "React Hooks", slug: "hooks" },
          { name: "useState", slug: "use-state" },
          { name: "useEffect", slug: "use-effect" },
          { name: "useContext", slug: "use-context" },
          { name: "useRef", slug: "use-ref" },
          { name: "useReducer", slug: "use-reducer" },
          { name: "useCallback", slug: "use-callback" },
          { name: "useMemo", slug: "use-memo" },
          { name: "Custom Hooks", slug: "custom-hooks" },
        ],
      },
    ],
  },

  TYPESCRIPT: {
    id: "TYPESCRIPT",
    name: "TypeScript",
    slug: "typescript",
    title: "TypeScript Tutorial",
    badgeLabel: "TS 5",
    badgeColor: "#3178c6",
    category: "Typed JavaScript",
    learnHeading: "Learn TypeScript",
    leads: [
      "TypeScript is a syntactic superset of JavaScript which adds static typing.",
      "This basically means that TypeScript adds type-checking to JavaScript so you catch bugs earlier.",
      "TypeScript compiles down to clean, readable JavaScript that runs in any browser or runtime.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can write typed TypeScript code and inspect output:",
    codeSnippet: `interface User {\n  id: number;\n  name: string;\n  role: "admin" | "student";\n}\n\nconst user: User = {\n  id: 1,\n  name: "Fahmi",\n  role: "student"\n};\n\nconsole.log(\`User: \${user.name} (\${user.role})\`);`,
    previewOutput: "User: Fahmi (student)",
    exercise: {
      question: "Which operator is used in TypeScript for type annotations?",
      options: [
        { key: "A", label: ": (colon)", code: ":" },
        { key: "B", label: "= (equals)", code: "=" },
        { key: "C", label: "-> (arrow)", code: "->" },
      ],
      correctKey: "A",
      correctExplanation: "In TypeScript, a colon (:) is used after a variable or parameter name to declare its type, e.g., let age: number = 20;",
      wrongExplanation: "The = symbol is an assignment operator, not a type annotation.",
    },
    references: [
      { title: "TS Simple Types", href: "/learn/typescript/simple-types" },
      { title: "TS Special Types", href: "/learn/typescript/special-types" },
      { title: "TS Arrays & Tuples", href: "/learn/typescript/arrays" },
      { title: "TS Object Types", href: "/learn/typescript/object-types" },
      { title: "TS Enums", href: "/learn/typescript/enums" },
      { title: "TS Interfaces", href: "/learn/typescript/interfaces" },
      { title: "TS Union Types", href: "/learn/typescript/union-types" },
      { title: "TS Functions", href: "/learn/typescript/functions" },
      { title: "TS Generics", href: "/learn/typescript/generics" },
    ],
    certTitle: "TypeScript Certified Engineer",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Demonstrate your proficiency in static typing, complex interfaces, and generics in TypeScript.",
    certSpec: "Certified TypeScript Engineer",
    videoTitle: "Video: TypeScript in 30 Minutes",
    videoMinutes: "30 minutes",
    sections: [
      {
        title: "TypeScript Tutorial",
        items: [
          { name: "TS HOME", slug: "home" },
          { name: "TS Intro", slug: "introduction" },
          { name: "TS Get Started", slug: "get-started" },
          { name: "TS Simple Types", slug: "simple-types" },
          { name: "TS Special Types", slug: "special-types" },
          { name: "TS Arrays", slug: "arrays" },
          { name: "TS Tuples", slug: "tuples" },
          { name: "TS Object Types", slug: "object-types" },
          { name: "TS Enums", slug: "enums" },
          { name: "TS Type Aliases", slug: "type-aliases" },
          { name: "TS Interfaces", slug: "interfaces" },
          { name: "TS Union Types", slug: "union-types" },
          { name: "TS Functions", slug: "functions" },
          { name: "TS Casting", slug: "casting" },
          { name: "TS Classes", slug: "classes" },
          { name: "TS Generics", slug: "generics" },
          { name: "TS Utility Types", slug: "utility-types" },
        ],
      },
    ],
  },

  NODEJS: {
    id: "NODEJS",
    name: "Node.js",
    slug: "nodejs",
    title: "Node.js Tutorial",
    badgeLabel: "Node 22",
    badgeColor: "#16a34a",
    category: "Server Runtime",
    learnHeading: "Learn Node.js",
    leads: [
      "Node.js is an open source server environment that runs JavaScript outside of a browser.",
      "Node.js is asynchronous and event-driven, designed to build scalable network applications.",
      "Node.js runs on various platforms (Windows, Linux, Unix, macOS, etc.) using Google Chrome's V8 engine.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit Node.js server code and see the simulated response:",
    codeSnippet: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello from Node.js Server!\\n');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running at http://localhost:3000/');\n});`,
    previewOutput: "Server running at http://localhost:3000/\nHTTP/1.1 200 OK\nHello from Node.js Server!",
    exercise: {
      question: "Which global object provides information about the current Node.js process?",
      options: [
        { key: "A", label: "process", code: "process" },
        { key: "B", label: "window", code: "window" },
        { key: "C", label: "document", code: "document" },
      ],
      correctKey: "A",
      correctExplanation: "In the Node.js runtime, the global process object provides control and information about the current application process.",
      wrongExplanation: "window and document are client-side browser objects that do not exist in the server-side Node.js environment.",
    },
    references: [
      { title: "Node Modules", href: "/learn/nodejs/modules" },
      { title: "Node HTTP Module", href: "/learn/nodejs/http-module" },
      { title: "Node File System", href: "/learn/nodejs/file-system" },
      { title: "Node URL Module", href: "/learn/nodejs/url-module" },
      { title: "Node NPM", href: "/learn/nodejs/npm" },
      { title: "Node Events", href: "/learn/nodejs/events" },
      { title: "Node Upload Files", href: "/learn/nodejs/upload-files" },
      { title: "Node Email", href: "/learn/nodejs/email" },
      { title: "Node MySQL", href: "/learn/nodejs/mysql" },
    ],
    certTitle: "Node.js Developer Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Demonstrate mastery over asynchronous I/O, server APIs, and REST endpoints using Node.js.",
    certSpec: "Certified Node.js Specialist",
    videoTitle: "Video: Node.js Tutorial for Beginners",
    videoMinutes: "40 minutes",
    sections: [
      {
        title: "Node.js Tutorial",
        items: [
          { name: "Node HOME", slug: "home" },
          { name: "Node Intro", slug: "introduction" },
          { name: "Node Get Started", slug: "get-started" },
          { name: "Node Modules", slug: "modules" },
          { name: "Node HTTP Module", slug: "http-module" },
          { name: "Node File System", slug: "file-system" },
          { name: "Node URL Module", slug: "url-module" },
          { name: "Node NPM", slug: "npm" },
          { name: "Node Events", slug: "events" },
          { name: "Node Upload Files", slug: "upload-files" },
          { name: "Node Email", slug: "email" },
        ],
      },
    ],
  },

  GIT: {
    id: "GIT",
    name: "Git",
    slug: "git",
    title: "Git Tutorial",
    badgeLabel: "Git",
    badgeColor: "#f97316",
    category: "Version Control",
    learnHeading: "Learn Git",
    leads: [
      "Git is a version control system used to track changes in source code during software development.",
      "Git is designed for coordinating work among programmers, but it can be used to track changes in any set of files.",
      "Git is essential for modern software teams and open source collaboration on GitHub.",
    ],
    exampleIntro: "With our 'Try it Yourself' terminal simulator, you can run Git commands and inspect repo history:",
    codeSnippet: `$ git init\nInitialized empty Git repository in /project/.git/\n$ git add index.html\n$ git commit -m "feat: initial commit with landing page"\n[main (root-commit) 4a8b1c] feat: initial commit with landing page\n 1 file changed, 45 insertions(+)`,
    previewOutput: "On branch main\nnothing to commit, working tree clean",
    exercise: {
      question: "Which Git command is used to stage all changed files for the next commit?",
      options: [
        { key: "A", label: "git add .", code: "git add ." },
        { key: "B", label: "git commit -a", code: "git commit -a" },
        { key: "C", label: "git stage --all", code: "git stage --all" },
      ],
      correctKey: "A",
      correctExplanation: "The git add . command stages all modified and new files in the current directory ready for commit.",
      wrongExplanation: "git commit -a automatically stages and commits modified tracked files, but does not stage untracked new files.",
    },
    references: [
      { title: "Git Init", href: "/learn/git/init" },
      { title: "Git Clone", href: "/learn/git/clone" },
      { title: "Git Staging", href: "/learn/git/staging" },
      { title: "Git Commit", href: "/learn/git/commit" },
      { title: "Git Status", href: "/learn/git/status" },
      { title: "Git Branch", href: "/learn/git/branch" },
      { title: "Git Checkout", href: "/learn/git/checkout" },
      { title: "Git Merge", href: "/learn/git/merge" },
      { title: "Git Push / Pull", href: "/learn/git/push-pull" },
    ],
    certTitle: "Git & Version Control Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Validate your mastery in branching strategies, rebasing, pull requests, and Git workflows.",
    certSpec: "Certified Git Practitioner",
    videoTitle: "Video: Git & GitHub Crash Course",
    videoMinutes: "35 minutes",
    sections: [
      {
        title: "Git Tutorial",
        items: [
          { name: "Git HOME", slug: "home" },
          { name: "Git Intro", slug: "introduction" },
          { name: "Git Get Started", slug: "get-started" },
          { name: "Git New Files", slug: "new-files" },
          { name: "Git Staging", slug: "staging" },
          { name: "Git Commit", slug: "commit" },
          { name: "Git Log", slug: "log" },
          { name: "Git Branch", slug: "branch" },
          { name: "Git Branch Merge", slug: "branch-merge" },
          { name: "Git GitHub", slug: "github" },
          { name: "Git Push", slug: "push" },
          { name: "Git Pull", slug: "pull" },
          { name: "Git Undo", slug: "undo" },
        ],
      },
    ],
  },

  GO: {
    id: "GO",
    name: "Go",
    slug: "go",
    title: "Go Tutorial",
    badgeLabel: "Go 1.22",
    badgeColor: "#00add8",
    category: "Cloud Programming",
    learnHeading: "Learn Go",
    leads: [
      "Go is a popular programming language created at Google by Robert Griesemer, Rob Pike, and Ken Thompson.",
      "Go is a statically typed, compiled programming language known for its simplicity and blazing-fast performance.",
      "Go has built-in concurrency support (goroutines and channels) making it the top choice for microservices and cloud tooling (Docker, Kubernetes).",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit Go source code and view the compiled output:",
    codeSnippet: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World from Go!")\n    numbers := []int{2, 4, 6, 8, 10}\n    total := 0\n    for _, n := range numbers {\n        total += n\n    }\n    fmt.Printf("Total Sum: %d\\n", total)\n}`,
    previewOutput: "Hello World from Go!\nTotal Sum: 30",
    exercise: {
      question: "In Go, how do you declare a variable with automatic type inference?",
      options: [
        { key: "A", label: "x := 10", code: "x := 10" },
        { key: "B", label: "var x = 10", code: "var x = 10" },
        { key: "C", label: "let x = 10", code: "let x = 10" },
      ],
      correctKey: "A",
      correctExplanation: "The short variable declaration operator := in Go declares and initializes a variable with automatic type inference.",
      wrongExplanation: "var x = 10 is also valid, but the idiomatic short variable declaration syntax inside functions is :=.",
    },
    references: [
      { title: "Go Syntax", href: "/learn/go/syntax" },
      { title: "Go Variables", href: "/learn/go/variables" },
      { title: "Go Constants", href: "/learn/go/constants" },
      { title: "Go Data Types", href: "/learn/go/data-types" },
      { title: "Go Conditions", href: "/learn/go/conditions" },
      { title: "Go Loops", href: "/learn/go/loops" },
      { title: "Go Functions", href: "/learn/go/functions" },
      { title: "Go Struct", href: "/learn/go/struct" },
      { title: "Go Goroutines", href: "/learn/go/goroutines" },
    ],
    certTitle: "Go Cloud Engineer Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Certify your knowledge in Golang concurrency, microservices, and backend APIs.",
    certSpec: "Certified Go Developer",
    videoTitle: "Video: Go Language Tutorial",
    videoMinutes: "45 minutes",
    sections: [
      {
        title: "Go Tutorial",
        items: [
          { name: "Go HOME", slug: "home" },
          { name: "Go Intro", slug: "introduction" },
          { name: "Go Get Started", slug: "get-started" },
          { name: "Go Syntax", slug: "syntax" },
          { name: "Go Comments", slug: "comments" },
          { name: "Go Variables", slug: "variables" },
          { name: "Go Constants", slug: "constants" },
          { name: "Go Output", slug: "output" },
          { name: "Go Data Types", slug: "data-types" },
          { name: "Go Operators", slug: "operators" },
          { name: "Go Conditions", slug: "conditions" },
          { name: "Go Switch", slug: "switch" },
          { name: "Go Loops", slug: "loops" },
          { name: "Go Functions", slug: "functions" },
          { name: "Go Struct", slug: "struct" },
          { name: "Go Maps", slug: "maps" },
          { name: "Go Slices", slug: "slices" },
        ],
      },
    ],
  },

  RUST: {
    id: "RUST",
    name: "Rust",
    slug: "rust",
    title: "Rust Tutorial",
    badgeLabel: "Rust 2024",
    badgeColor: "#ea580c",
    category: "Systems & Memory Safe",
    learnHeading: "Learn Rust",
    leads: [
      "Rust is a systems programming language designed for performance, memory safety, and safe concurrency.",
      "Rust enforces memory safety without needing a garbage collector through its innovative ownership system.",
      "Rust has been voted the most loved programming language for many consecutive years in developer surveys.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit Rust code and view the compiler output:",
    codeSnippet: `fn main() {\n    println!("Hello World from Rust!");\n    let mut numbers = vec![1, 2, 3, 4, 5];\n    numbers.push(6);\n    let sum: i32 = numbers.iter().sum();\n    println!("Vector sum is: {}", sum);\n}`,
    previewOutput: "Hello World from Rust!\nVector sum is: 21",
    exercise: {
      question: "By default, variables in Rust are:",
      options: [
        { key: "A", label: "Immutable (cannot be changed)", code: "Immutable" },
        { key: "B", label: "Mutable (can be changed)", code: "Mutable" },
        { key: "C", label: "Static", code: "Static" },
      ],
      correctKey: "A",
      correctExplanation: "By default, all variables in Rust are immutable. Use the mut keyword if you need to mutate their value.",
      wrongExplanation: "Incorrect. Rust enforces memory safety and thread safety by making variables immutable by default.",
    },
    references: [
      { title: "Rust Syntax", href: "/learn/rust/syntax" },
      { title: "Rust Variables", href: "/learn/rust/variables" },
      { title: "Rust Data Types", href: "/learn/rust/data-types" },
      { title: "Rust Functions", href: "/learn/rust/functions" },
      { title: "Rust Ownership", href: "/learn/rust/ownership" },
      { title: "Rust References", href: "/learn/rust/references" },
      { title: "Rust Structs", href: "/learn/rust/structs" },
      { title: "Rust Enums", href: "/learn/rust/enums" },
      { title: "Rust Match", href: "/learn/rust/match" },
    ],
    certTitle: "Rust Systems Certified",
    certEyebrow: "DevAcademy Certification",
    certDesc: "Validate your mastery over zero-cost abstractions, borrow checker, and fearless concurrency.",
    certSpec: "Certified Rust Programmer",
    videoTitle: "Video: Rust Full Course for Beginners",
    videoMinutes: "55 minutes",
    sections: [
      {
        title: "Rust Tutorial",
        items: [
          { name: "Rust HOME", slug: "home" },
          { name: "Rust Intro", slug: "introduction" },
          { name: "Rust Get Started", slug: "get-started" },
          { name: "Rust Syntax", slug: "syntax" },
          { name: "Rust Variables", slug: "variables" },
          { name: "Rust Data Types", slug: "data-types" },
          { name: "Rust Functions", slug: "functions" },
          { name: "Rust Control Flow", slug: "control-flow" },
          { name: "Rust Ownership", slug: "ownership" },
          { name: "Rust References", slug: "references" },
          { name: "Rust Structs", slug: "structs" },
          { name: "Rust Enums", slug: "enums" },
          { name: "Rust Match", slug: "match" },
          { name: "Rust Error Handling", slug: "error-handling" },
        ],
      },
    ],
  },
};

// Generic generator for any language not explicitly listed above
export function getOrCreateCourseMeta(techInput: string): UniversalCourseMeta {
  const normTech = normalizeTechKey(techInput);
  if (ALL_COURSES_CATALOG[normTech]) {
    const raw = ALL_COURSES_CATALOG[normTech];
    return {
      ...raw,
      sections: prepareSectionsWithCarets(raw.sections),
    };
  }

  const slug = getSlugForTech(normTech);
  const title = `${normTech} Tutorial`;

  return {
    id: normTech,
    name: normTech,
    slug,
    title,
    badgeLabel: normTech,
    badgeColor: "#0284c7",
    category: "Development",
    learnHeading: `Learn ${normTech}`,
    leads: [
      `${normTech} is a standard technology widely used across modern software and web development.`,
      `This comprehensive ${normTech} tutorial covers syntax, core concepts, best practices, and real-world examples.`,
      `Follow our hands-on interactive guides to master ${normTech} step by step!`,
    ],
    exampleIntro: `With our 'Try it Yourself' editor, you can experiment with ${normTech} code and verify results:`,
    codeSnippet: `// Example code snippet for ${normTech}\nfunction example() {\n  const tech = "${normTech}";\n  console.log("Welcome to " + tech + " at DevAcademy!");\n  return true;\n}\n\nexample();`,
    previewOutput: `Welcome to ${normTech} at DevAcademy!\nStatus: Ready`,
    exercise: {
      question: `What is the primary role of ${normTech} in software development?`,
      options: [
        { key: "A", label: `Provides powerful capabilities and standard tooling for ${normTech}` },
        { key: "B", label: "It is only used for plain text editing" },
        { key: "C", label: "It has been replaced completely" },
      ],
      correctKey: "A",
      correctExplanation: `Exactly! ${normTech} provides industry-standard tooling and modern capabilities for software development.`,
      wrongExplanation: `Incorrect. ${normTech} is an active, widely adopted technology across the modern tech industry.`,
    },
    references: [
      { title: `${normTech} Intro`, href: `/learn/${slug}/introduction` },
      { title: `${normTech} Syntax`, href: `/learn/${slug}/syntax` },
      { title: `${normTech} Variables`, href: `/learn/${slug}/variables` },
      { title: `${normTech} Operators`, href: `/learn/${slug}/operators` },
      { title: `${normTech} Functions`, href: `/learn/${slug}/functions` },
      { title: `${normTech} Methods`, href: `/learn/${slug}/methods` },
      { title: `${normTech} Examples`, href: `/learn/${slug}/examples` },
      { title: `${normTech} Exercises`, href: `/exercises` },
    ],
    certTitle: `${normTech} Certified Specialist`,
    certEyebrow: "DevAcademy Certification",
    certDesc: `Prove your hands-on proficiency in ${normTech} and accelerate your technical career.`,
    certSpec: `Certified ${normTech} Specialist`,
    videoTitle: `Video: ${normTech} Complete Tutorial`,
    videoMinutes: "40 minutes",
    sections: prepareSectionsWithCarets([
      {
        title: `${normTech} Tutorial`,
        items: [
          { name: `${normTech} HOME`, slug: "home" },
          { name: `${normTech} Intro`, slug: "introduction" },
          { name: `${normTech} Get Started`, slug: "get-started" },
          { name: `${normTech} Syntax`, slug: "syntax" },
          { name: `${normTech} Comments`, slug: "comments" },
          { name: `${normTech} Variables`, slug: "variables" },
          { name: `${normTech} Data Types`, slug: "data-types" },
          { name: `${normTech} Operators`, slug: "operators" },
          { name: `${normTech} Conditions`, slug: "conditions" },
          { name: `${normTech} Loops`, slug: "loops" },
          { name: `${normTech} Functions`, slug: "functions" },
          { name: `${normTech} Arrays / Collections`, slug: "arrays" },
          { name: `${normTech} Error Handling`, slug: "error-handling" },
        ],
      },
      {
        title: `${normTech} Advanced & Examples`,
        items: [
          { name: `${normTech} OOP & Classes`, slug: "classes" },
          { name: `${normTech} Modules & Packages`, slug: "modules" },
          { name: `${normTech} Best Practices`, slug: "best-practices" },
          { name: `${normTech} Examples`, slug: "examples" },
          { name: `${normTech} Quiz`, slug: "quiz" },
        ],
      },
    ]),
  };
}

function getLanguageChapterDetails(normTech: string, chapterSlug: string, cleanTitle: string) {
  const slug = chapterSlug.toLowerCase();

  if (normTech === "JAVA") {
    if (slug.includes("syntax") || slug.includes("get-started") || slug.includes("intro")) {
      return {
        code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World from Java!");\n  }\n}`,
        liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello World from Java!</div>`,
        table: {
          headers: ["Java Keyword", "Description", "Usage"],
          rows: [
            ["public", "Access modifier", "Accessible by any other class"],
            ["class", "Class definition", "Every Java program must have at least one class"],
            ["static", "Class-level method", "Allows main() to execute without instantiating an object"],
            ["void", "Return type", "Specifies that the method does not return a value"],
          ],
        },
        tip: "Remember that Java is case-sensitive: 'MyClass' and 'myclass' have different meanings.",
        note: "Every Java program has a class name which must match the filename (e.g. Main.java).",
      };
    }
    if (slug.includes("variable") || slug.includes("data-type") || slug.includes("type")) {
      return {
        code: `public class Main {\n  public static void main(String[] args) {\n    int myNum = 5;\n    float myFloatNum = 5.99f;\n    char myLetter = 'D';\n    boolean myBool = true;\n    String myText = "Hello";\n    System.out.println(myText + " Java! Number is " + myNum);\n  }\n}`,
        liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello Java! Number is 5</div>`,
        table: {
          headers: ["Data Type", "Size", "Description"],
          rows: [
            ["byte", "1 byte", "Stores whole numbers from -128 to 127"],
            ["int", "4 bytes", "Stores whole numbers from -2,147,483,648 to 2,147,483,647"],
            ["double", "8 bytes", "Stores fractional numbers up to 15 decimal digits"],
            ["boolean", "1 bit", "Stores true or false values"],
            ["String", "Reference", "Stores a sequence of characters"],
          ],
        },
        tip: "Use the final keyword if you want to declare a variable as a constant (cannot be changed).",
        note: "Primitive types start with a lowercase letter, while non-primitive types start with an uppercase letter.",
      };
    }
    return {
      code: `public class Main {\n  static void ${slug.replace(/[^a-zA-Z0-9]/g, "")}Demo() {\n    System.out.println("Executing Java ${cleanTitle}...");\n  }\n\n  public static void main(String[] args) {\n    ${slug.replace(/[^a-zA-Z0-9]/g, "")}Demo();\n  }\n}`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Executing Java ${cleanTitle}...<br/>Result: SUCCESS (0)</div>`,
      table: {
        headers: ["Component", "Standard Syntax", "Best Practice"],
        rows: [
          ["Declaration", `${cleanTitle}`, "Follow CamelCase naming conventions"],
          ["Scope", "Class & Method Scope", "Declare variables in the innermost block possible"],
          ["Handling", "Checked Exceptions", "Handle errors using try-catch blocks"],
        ],
      },
      tip: "Always document public methods with Javadoc comments (/** ... */).",
      note: "Java executes on the JVM, guaranteeing cross-platform 'Write Once, Run Anywhere' compatibility.",
    };
  }

  if (normTech === "PHP") {
    if (slug.includes("syntax") || slug.includes("intro") || slug.includes("get-started")) {
      return {
        code: `<!DOCTYPE html>\n<html>\n<body>\n\n<?php\necho "Hello World from PHP!";\n?>\n\n</body>\n</html>`,
        liveHtml: `<p style="margin: 0; font-weight: 700; color: #04aa6d;">Hello World from PHP!</p>`,
        table: {
          headers: ["Tag / Keyword", "Description"],
          rows: [
            ["<?php", "Starts PHP code execution block"],
            ["?>", "Closes PHP code execution block"],
            ["echo", "Outputs one or more strings to the browser"],
            ["print", "Outputs a string and returns 1"],
          ],
        },
        tip: "PHP statements must always end with a semicolon (;).",
        note: "A PHP file normally contains HTML tags, and some PHP scripting code.",
      };
    }
    if (slug.includes("variable") || slug.includes("data-type")) {
      return {
        code: `<?php\n$txt = "DevAcademy";\n$x = 5;\n$y = 10.5;\n\necho "Study PHP at " . $txt . "!<br>";\necho "Sum: " . ($x + $y);\n?>`,
        liveHtml: `<p style="margin: 0; color: #1e293b;">Study PHP at DevAcademy!<br/>Sum: <strong>15.5</strong></p>`,
        table: {
          headers: ["Type", "Example", "Description"],
          rows: [
            ["String", '$x = "Hello"', "Sequence of characters"],
            ["Integer", "$x = 5985", "Non-decimal number"],
            ["Float", "$x = 10.365", "Number with a decimal point"],
            ["Array", '$cars = array("Volvo", "BMW")', "Stores multiple values in one single variable"],
          ],
        },
        tip: "In PHP, variables start with the $ sign, followed by the name of the variable.",
        note: "Unlike other languages, PHP has no command for declaring a variable; it is created when assigned.",
      };
    }
    return {
      code: `<?php\n// Demonstration of ${cleanTitle} in PHP\nfunction handle${cleanTitle.replace(/\s+/g, "")}() {\n  $status = "active";\n  echo "PHP ${cleanTitle} status: " . $status;\n}\n\nhandle${cleanTitle.replace(/\s+/g, "")}();\n?>`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">PHP ${cleanTitle} status: active</div>`,
      table: {
        headers: ["PHP Feature", "Usage", "Version Requirement"],
        rows: [
          [`${cleanTitle}`, "Core language feature", "PHP 8.0+"],
          ["Type Hinting", "Strict types declaration", "declare(strict_types=1);"],
          ["Error Reporting", "error_reporting(E_ALL);", "Recommended during development"],
        ],
      },
      tip: "Use modern PHP 8 attributes and strict types for cleaner, safer code.",
      note: "PHP code is executed on the server, and the result is returned to the browser as plain HTML.",
    };
  }

  if (normTech === "C") {
    return {
      code: `#include <stdio.h>\n\nint main() {\n  // Demonstration of ${cleanTitle} in C\n  int value = 42;\n  printf("Learning C ${cleanTitle}: %d\\n", value);\n  return 0;\n}`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Learning C ${cleanTitle}: 42</div>`,
      table: {
        headers: ["Format Specifier", "Data Type", "Example"],
        rows: [
          ["%d or %i", "int", "printf(\"%d\", myNum);"],
          ["%f", "float", "printf(\"%f\", myFloat);"],
          ["%c", "char", "printf(\"%c\", myLetter);"],
          ["%s", "string", "printf(\"%s\", myText);"],
        ],
      },
      tip: "Always remember to return 0 at the end of the main() function to indicate successful execution.",
      note: "C is a statically typed language; variable types must be declared before compilation.",
    };
  }

  if (normTech === "C++") {
    return {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  // Demonstration of ${cleanTitle} in C++\n  string tech = "C++";\n  cout << "Mastering " << tech << " - ${cleanTitle}" << endl;\n  return 0;\n}`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Mastering C++ - ${cleanTitle}</div>`,
      table: {
        headers: ["C++ Stream / Keyword", "Purpose", "Header"],
        rows: [
          ["cout", "Standard output stream", "<iostream>"],
          ["cin", "Standard input stream", "<iostream>"],
          ["endl", "Inserts newline and flushes stream", "<iostream>"],
          ["string", "Standard string container", "<string>"],
        ],
      },
      tip: "Use standard library vectors (std::vector) instead of raw C-style arrays for safer memory management.",
      note: "C++ was developed as an extension of C, adding Object Oriented Programming support.",
    };
  }

  if (normTech === "C#") {
    return {
      code: `using System;\n\nnamespace DevAcademyApp {\n  class Program {\n    static void Main(string[] args) {\n      // C# ${cleanTitle} Demo\n      string topic = "${cleanTitle}";\n      Console.WriteLine($"Welcome to C# {topic} on DevAcademy!");\n    }\n  }\n}`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Welcome to C# ${cleanTitle} on DevAcademy!</div>`,
      table: {
        headers: ["C# Keyword", "Description", "Example"],
        rows: [
          ["Console.WriteLine()", "Prints line to standard output", 'Console.WriteLine("Hello");'],
          ["string", "Alias for System.String", 'string name = "John";'],
          ["var", "Implicitly typed local variable", "var count = 10;"],
          ["static", "Belongs to class itself", "static void Main()"],
        ],
      },
      tip: "Use string interpolation ($'text {variable}') for cleaner and more readable formatted strings.",
      note: "C# is an object-oriented, modern language developed by Microsoft running on the .NET platform.",
    };
  }

  if (normTech === "REACT") {
    return {
      code: `import React, { useState } from 'react';\n\nfunction ${cleanTitle.replace(/[^a-zA-Z0-9]/g, "")}Demo() {\n  const [active, setActive] = useState(true);\n\n  return (\n    <div className="react-card" style={{ padding: 16, background: '#f8fafc', borderRadius: 8 }}>\n      <h3>React ${cleanTitle}</h3>\n      <p>Status: {active ? "Active" : "Inactive"}</p>\n      <button onClick={() => setActive(!active)} style={{ background: '#04aa6d', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 4 }}>\n        Toggle State\n      </button>\n    </div>\n  );\n}\n\nexport default ${cleanTitle.replace(/[^a-zA-Z0-9]/g, "")}Demo;`,
      liveHtml: `<div style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;"><p style="margin: 0; font-weight: 700; color: #0284c7;">React Component Rendered</p><p style="margin: 4px 0 0; color: #475569; font-size: 13px;">Topic: ${cleanTitle}</p></div>`,
      table: {
        headers: ["React Hook / Concept", "Description", "Rules of Use"],
        rows: [
          ["useState", "Declares reactive state variable in component", "Call only at the top level"],
          ["useEffect", "Performs side effects (data fetching, subscriptions)", "Pass dependency array"],
          ["Props", "Passes arguments from parent to child component", "Read-only immutable data"],
          ["JSX", "Syntax extension to JavaScript simulating HTML", "Must return single root element"],
        ],
      },
      tip: "Always remember: React state updates are asynchronous and trigger re-renders.",
      note: "React is a JavaScript library created by Meta for building dynamic user interfaces.",
    };
  }

  if (normTech === "TYPESCRIPT") {
    return {
      code: `// TypeScript ${cleanTitle} Implementation\ninterface CourseTopic {\n  id: number;\n  title: string;\n  isPublished: boolean;\n}\n\nfunction displayTopic(topic: CourseTopic): string {\n  return \`Topic #\${topic.id}: \${topic.title} (Published: \${topic.isPublished})\`;\n}\n\nconst item: CourseTopic = {\n  id: 1,\n  title: "${cleanTitle}",\n  isPublished: true\n};\n\nconsole.log(displayTopic(item));`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px;">Topic #1: ${cleanTitle} (Published: true)</div>`,
      table: {
        headers: ["TypeScript Type", "Syntax Example", "Usage"],
        rows: [
          ["interface", "interface User { name: string }", "Defines object shape contract"],
          ["type alias", "type ID = string | number", "Creates union or complex types"],
          ["generics", "function id<T>(arg: T): T", "Enables reusable components"],
          ["enums", "enum Status { Active, Inactive }", "Defines named constants"],
        ],
      },
      tip: "Enable 'strict': true in your tsconfig.json for maximum type-safety.",
      note: "TypeScript is a typed superset of JavaScript that compiles directly to clean JavaScript.",
    };
  }

  if (normTech === "GO") {
    return {
      code: `package main\nimport "fmt"\n\nfunc main() {\n  // Demonstration of ${cleanTitle} in Go\n  message := "Hello from Go ${cleanTitle}"\n  fmt.Println(message)\n}`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello from Go ${cleanTitle}</div>`,
      table: {
        headers: ["Go Keyword", "Description", "Standard Usage"],
        rows: [
          ["package main", "Declares that this is an executable package", "Entrypoint package"],
          ["func main()", "Starting execution function", "Takes no arguments, returns nothing"],
          [":=", "Short variable declaration", "Infers type automatically in functions"],
          ["fmt.Println()", "Formats and writes to standard output", "Package fmt"],
        ],
      },
      tip: "In Go, unused variables or imports cause compile-time errors.",
      note: "Go was developed by Google engineers (Robert Griesemer, Rob Pike, Ken Thompson) for speed and simplicity.",
    };
  }

  if (normTech === "RUST") {
    return {
      code: `fn main() {\n    // Demonstration of ${cleanTitle} in Rust\n    let topic = "${cleanTitle}";\n    println!("Rust learning: {}", topic);\n}`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #f97316; padding: 12px; border-radius: 4px;">Rust learning: ${cleanTitle}</div>`,
      table: {
        headers: ["Rust Keyword", "Concept", "Safety Guarantee"],
        rows: [
          ["let", "Immutable variable declaration", "Variables are immutable by default"],
          ["let mut", "Mutable variable declaration", "Allows value reassignment"],
          ["println!", "Standard printing macro", "Format string checked at compile time"],
          ["match", "Pattern matching construct", "Exhaustive control flow checking"],
        ],
      },
      tip: "Use the compiler errors as your guide; the Rust borrow checker provides detailed explanation notes.",
      note: "Rust guarantees memory safety without needing a garbage collector.",
    };
  }

  if (normTech === "GIT") {
    return {
      code: `# Demonstration of Git ${cleanTitle}\n$ git init\n$ git add .\n$ git commit -m "feat: complete ${cleanTitle}"\n$ git status`,
      liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">On branch main<br/>nothing to commit, working tree clean</div>`,
      table: {
        headers: ["Command", "Action", "Example"],
        rows: [
          ["git status", "Shows working tree and staging status", "$ git status"],
          ["git add <file>", "Adds file contents to staging index", "$ git add ."],
          ["git commit -m", "Records changes to repository", '$ git commit -m "Update"'],
          ["git log", "Shows commit logs", "$ git log --oneline -5"],
        ],
      },
      tip: "Write clear, imperative commit messages (e.g., 'Add user authentication flow').",
      note: "Git is a distributed version control system designed to handle everything from small to very large projects.",
    };
  }

  // Universal Fallback for any other technology
  return {
    code: `// ${normTech} - ${cleanTitle}\n// W3Schools Standard Reference\n\nfunction run${cleanTitle.replace(/[^a-zA-Z0-9]/g, "")}() {\n  console.log("Executing ${cleanTitle} on ${normTech}...");\n  return { status: "OK", code: 200 };\n}\n\nrun${cleanTitle.replace(/[^a-zA-Z0-9]/g, "")}();`,
    liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">[${normTech}] ${cleanTitle} executed successfully.<br/>Result: OK (200)</div>`,
    table: {
      headers: ["Aspect", "Description", "Standard Reference"],
      rows: [
        ["Core Feature", `${cleanTitle}`, `Official ${normTech} Documentation`],
        ["Best Practice", "Modular & decoupled design", "Industry standard code conventions"],
        ["Performance", "Optimized execution flow", "Benchmark verified"],
      ],
    },
    tip: `Review official ${normTech} documentation and test corner cases during implementation.`,
    note: `This lesson conforms to the official W3Schools curriculum standards for ${normTech}.`,
  };
}

export function getUniversalChapterData(techInput: string, chapterSlug: string): W3ChapterData {
  const normTech = normalizeTechKey(techInput);
  const meta = getOrCreateCourseMeta(normTech);

  // Find current item in sections
  let currentTitle = `${normTech} ${chapterSlug.replace(/-/g, " ").toUpperCase()}`;
  let prevSlug = "home";
  let nextSlug = "syntax";

  const allItems: { name: string; slug: string }[] = [];
  for (const s of meta.sections) {
    for (const item of s.items) {
      allItems.push(item);
    }
  }

  const idx = allItems.findIndex((it) => it.slug === chapterSlug);
  if (idx !== -1) {
    currentTitle = allItems[idx].name;
    if (idx > 0) prevSlug = allItems[idx - 1].slug;
    if (idx < allItems.length - 1) nextSlug = allItems[idx + 1].slug;
  }

  const cleanTitleName = currentTitle.replace(`${normTech} `, "");
  const details = getLanguageChapterDetails(normTech, chapterSlug, cleanTitleName);

  return {
    title: currentTitle,
    subtitle: `Learn all about ${cleanTitleName} in ${normTech} with interactive syntax examples and Try it Yourself code editor.`,
    prevSlug,
    nextSlug,
    sections: [
      {
        title: `Understanding ${cleanTitleName}`,
        lead: `Core principles and practical implementation of ${cleanTitleName} in ${normTech}.`,
        paragraphs: [
          `${cleanTitleName} is a fundamental concept in modern ${normTech} development.`,
          `Mastering ${cleanTitleName} enables you to write clean, maintainable, and high-performance software according to standard industry best practices.`,
          `Explore the interactive code example below to see how ${cleanTitleName} behaves in real execution.`,
        ],
        codeSnippet: {
          code: details.code,
          liveHtml: details.liveHtml,
        },
        tip: details.tip,
      },
      {
        title: `${cleanTitleName} Reference & Syntax Details`,
        paragraphs: [
          `The table below outlines key keywords, data types, and parameters associated with ${cleanTitleName} in ${normTech}:`,
        ],
        table: details.table,
        note: details.note,
      },
    ],
  };
}

export function getUniversalChapterExercise(techInput: string, chapterSlug: string): ChapterExercise {
  const normTech = normalizeTechKey(techInput);
  const cleanTitle = chapterSlug.replace(/-/g, " ");

  return {
    question: `What is the primary function and purpose of ${cleanTitle} in ${normTech}?`,
    options: [
      `To define and implement ${cleanTitle} adhering to standard ${normTech} syntax`,
      `To permanently delete all project configuration files`,
      `It can only be executed on legacy Internet Explorer browsers`,
    ],
    correctIndex: 0,
    explanation: `Correct! In ${normTech}, ${cleanTitle} is used to structure clean, valid program logic and syntax.`,
  };
}

export function getUniversalChapterChallenge(techInput: string, chapterSlug: string): ChapterChallenge {
  const normTech = normalizeTechKey(techInput);
  const cleanTitle = chapterSlug.replace(/-/g, " ");

  if (normTech === "JAVA") {
    return {
      instruction: `Complete the following Java code to print the output to the console.`,
      beforeCode: `public class Main {\n  public static void main(String[] args) {\n    `,
      placeholder: `System.out.println("DevAcademy Java");`,
      afterCode: `\n  }\n}`,
      correctAnswer: [
        'System.out.println("DevAcademy Java");',
        "System.out.println('DevAcademy Java');",
        'System.out.println("DevAcademy Java")',
      ],
      hint: `Use the System.out.println(...) statement inside the main method.`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">DevAcademy Java</div>`,
    };
  }

  if (normTech === "PHP") {
    return {
      instruction: `Write the PHP statement to print the string "Hello PHP".`,
      beforeCode: `<?php\n  `,
      placeholder: `echo "Hello PHP";`,
      afterCode: `\n?>`,
      correctAnswer: ['echo "Hello PHP";', "echo 'Hello PHP';", 'echo "Hello PHP"'],
      hint: `Use the echo keyword followed by the string and a semicolon (;).`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello PHP</div>`,
    };
  }

  if (normTech === "C") {
    return {
      instruction: `Complete the C program using the printf function to print text.`,
      beforeCode: `#include <stdio.h>\n\nint main() {\n  `,
      placeholder: `printf("Learn C\\n");`,
      afterCode: `\n  return 0;\n}`,
      correctAnswer: ['printf("Learn C\\n");', 'printf("Learn C");'],
      hint: `Use the printf("...") function from the stdio.h library.`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Learn C</div>`,
    };
  }

  if (normTech === "C++") {
    return {
      instruction: `Complete the C++ code to print a message to the console using cout.`,
      beforeCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n  `,
      placeholder: `cout << "Hello C++" << endl;`,
      afterCode: `\n  return 0;\n}`,
      correctAnswer: [
        'cout << "Hello C++" << endl;',
        'cout << "Hello C++";',
        "cout << 'Hello C++' << endl;",
      ],
      hint: `Use cout << "..." << endl; from the standard namespace.`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello C++</div>`,
    };
  }

  if (normTech === "C#") {
    return {
      instruction: `Complete the C# program to print text using Console.WriteLine.`,
      beforeCode: `using System;\n\nclass Program {\n  static void Main() {\n    `,
      placeholder: `Console.WriteLine("Hello C#");`,
      afterCode: `\n  }\n}`,
      correctAnswer: ['Console.WriteLine("Hello C#");', "Console.WriteLine('Hello C#');", 'Console.WriteLine("Hello C#")'],
      hint: `Use Console.WriteLine("...");`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello C#</div>`,
    };
  }

  if (normTech === "REACT") {
    return {
      instruction: `Initialize state named value with an initial value of 100 using the React useState hook.`,
      beforeCode: `import { useState } from 'react';\n\nfunction Component() {\n  `,
      placeholder: `const [value, setValue] = useState(100);`,
      afterCode: `\n  return <div>{value}</div>;\n}`,
      correctAnswer: [
        'const [value, setValue] = useState(100);',
        'const [value, setValue] = useState(100)',
        'const [value,setValue]=useState(100);',
      ],
      hint: `Use the destructuring pattern const [state, setState] = useState(initialValue);`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px;">100</div>`,
    };
  }

  if (normTech === "TYPESCRIPT") {
    return {
      instruction: `Add a string type annotation to the username parameter in the TypeScript function below.`,
      beforeCode: `function greetUser(`,
      placeholder: `username: string`,
      afterCode: `): string {\n  return "Welcome, " + username;\n}`,
      correctAnswer: ['username: string', 'username:string'],
      hint: `Write the parameter name followed by a colon (:) and string type.`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px;">Welcome, Alex</div>`,
    };
  }

  if (normTech === "GIT") {
    return {
      instruction: `Write the Git command to stage all modified files into the staging index.`,
      beforeCode: `$ `,
      placeholder: `git add .`,
      afterCode: ``,
      correctAnswer: ['git add .', 'git add -A', 'git add --all'],
      hint: `Type the command git add .`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">All changes staged for commit</div>`,
    };
  }

  if (normTech === "GO") {
    return {
      instruction: `Complete the Go code to print a message using the fmt package.`,
      beforeCode: `package main\nimport "fmt"\n\nfunc main() {\n  `,
      placeholder: `fmt.Println("Hello from Go")`,
      afterCode: `\n}`,
      correctAnswer: ['fmt.Println("Hello from Go")', "fmt.Println('Hello from Go')"],
      hint: `Use fmt.Println("...");`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px;">Hello from Go</div>`,
    };
  }

  if (normTech === "RUST") {
    return {
      instruction: `Complete the Rust code using the println! macro to output a message.`,
      beforeCode: `fn main() {\n  `,
      placeholder: `println!("Hello from Rust!");`,
      afterCode: `\n}`,
      correctAnswer: ['println!("Hello from Rust!");', "println!('Hello from Rust!');", 'println!("Hello from Rust!")'],
      hint: `Use println!("..."); with an exclamation mark.`,
      previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #f97316; padding: 12px; border-radius: 4px;">Hello from Rust!</div>`,
    };
  }

  // Default fallback challenge
  return {
    instruction: `Write the correct syntax to implement ${cleanTitle} in ${normTech}.`,
    beforeCode: `// Code Challenge: ${cleanTitle}\n`,
    placeholder: `const result = "DevAcademy ${normTech}";`,
    afterCode: `\nconsole.log(result);`,
    correctAnswer: [
      `const result = "DevAcademy ${normTech}";`,
      `const result = 'DevAcademy ${normTech}';`,
      `const result = "DevAcademy ${normTech}"`,
    ],
    hint: `Write const result = "DevAcademy ${normTech}";`,
    previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">[${normTech}] ${cleanTitle} challenge passed!</div>`,
  };
}
