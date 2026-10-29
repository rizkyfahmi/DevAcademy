import { ChapterItem, SidebarSection, W3ChapterData, ChapterExercise, ChapterChallenge } from "./w3-html-chapters-data";

const makePySubItems = (name: string, slug: string) => [
  { name: name.replace(/^Python\s+/i, ""), slug: slug },
  { name: "Exercise", slug: "exercises" },
];

export const PYTHON_SECTIONS: SidebarSection[] = [
  {
    title: "PYTHON TUTORIAL",
    items: [
      { name: "Python HOME", slug: "home" },
      { name: "Python Intro", slug: "introduction", hasCaret: true, subItems: makePySubItems("Introduction", "introduction") },
      { name: "Python Get Started", slug: "get-started", hasCaret: true, subItems: makePySubItems("Get Started", "get-started") },
      { name: "Python Syntax", slug: "syntax", hasCaret: true, subItems: makePySubItems("Syntax", "syntax") },
      { name: "Python Comments", slug: "comments", hasCaret: true, subItems: makePySubItems("Comments", "comments") },
      { name: "Python Variables", slug: "variables", hasCaret: true, subItems: makePySubItems("Variables", "variables") },
      { name: "Python Data Types", slug: "data-types", hasCaret: true, subItems: makePySubItems("Data Types", "data-types") },
      { name: "Python Numbers", slug: "numbers", hasCaret: true, subItems: makePySubItems("Numbers", "numbers") },
      { name: "Python Casting", slug: "casting", hasCaret: true, subItems: makePySubItems("Casting", "casting") },
      { name: "Python Strings", slug: "strings", hasCaret: true, subItems: makePySubItems("Strings", "strings") },
      { name: "Python Booleans", slug: "booleans", hasCaret: true, subItems: makePySubItems("Booleans", "booleans") },
      { name: "Python Operators", slug: "operators", hasCaret: true, subItems: makePySubItems("Operators", "operators") },
      { name: "Python Lists", slug: "lists", hasCaret: true, subItems: makePySubItems("Lists", "lists") },
      { name: "Python Tuples", slug: "tuples", hasCaret: true, subItems: makePySubItems("Tuples", "tuples") },
      { name: "Python Sets", slug: "sets", hasCaret: true, subItems: makePySubItems("Sets", "sets") },
      { name: "Python Dictionaries", slug: "dictionaries", hasCaret: true, subItems: makePySubItems("Dictionaries", "dictionaries") },
      { name: "Python If...Else", slug: "if-else", hasCaret: true, subItems: makePySubItems("If...Else", "if-else") },
      { name: "Python While Loops", slug: "while-loops", hasCaret: true, subItems: makePySubItems("While Loops", "while-loops") },
      { name: "Python For Loops", slug: "for-loops", hasCaret: true, subItems: makePySubItems("For Loops", "for-loops") },
      { name: "Python Functions", slug: "functions", hasCaret: true, subItems: makePySubItems("Functions", "functions") },
      { name: "Python Lambda", slug: "lambda", hasCaret: true, subItems: makePySubItems("Lambda", "lambda") },
      { name: "Python Arrays", slug: "arrays", hasCaret: true, subItems: makePySubItems("Arrays", "arrays") },
      { name: "Python Classes/Objects", slug: "classes", hasCaret: true, subItems: makePySubItems("Classes", "classes") },
      { name: "Python Inheritance", slug: "inheritance", hasCaret: true, subItems: makePySubItems("Inheritance", "inheritance") },
      { name: "Python Iterators", slug: "iterators", hasCaret: true, subItems: makePySubItems("Iterators", "iterators") },
      { name: "Python Scope", slug: "scope", hasCaret: true, subItems: makePySubItems("Scope", "scope") },
      { name: "Python Modules", slug: "modules", hasCaret: true, subItems: makePySubItems("Modules", "modules") },
      { name: "Python Dates", slug: "dates", hasCaret: true, subItems: makePySubItems("Dates", "dates") },
      { name: "Python Math", slug: "math", hasCaret: true, subItems: makePySubItems("Math", "math") },
      { name: "Python JSON", slug: "json", hasCaret: true, subItems: makePySubItems("JSON", "json") },
      { name: "Python RegEx", slug: "regex", hasCaret: true, subItems: makePySubItems("RegEx", "regex") },
      { name: "Python PIP", slug: "pip", hasCaret: true, subItems: makePySubItems("PIP", "pip") },
      { name: "Python Try...Except", slug: "try-except", hasCaret: true, subItems: makePySubItems("Try...Except", "try-except") },
      { name: "Python User Input", slug: "user-input", hasCaret: true, subItems: makePySubItems("User Input", "user-input") },
      { name: "Python String Formatting", slug: "string-formatting", hasCaret: true, subItems: makePySubItems("String Formatting", "string-formatting") },
    ],
  },
];

export const ALL_PYTHON_CHAPTERS: ChapterItem[] = PYTHON_SECTIONS.flatMap(s => s.items);

export const W3_PYTHON_CHAPTERS: Record<string, W3ChapterData> = {
  introduction: {
    title: "Python Introduction",
    subtitle: "Python is a popular programming language created by Guido van Rossum, and released in 1991.",
    prevSlug: "home",
    nextSlug: "get-started",
    sections: [
      {
        title: "What is Python?",
        paragraphs: [
          "Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.",
          "Its high-level built in data structures, combined with dynamic typing and dynamic binding, make it very attractive for Rapid Application Development.",
        ],
        bullets: [
          "Web development (server-side, e.g. Django, Flask, FastAPI)",
          "Software development & desktop applications",
          "Mathematics, Data Science, and Machine Learning",
          "System scripting and automation",
        ],
        codeSnippet: {
          code: `print("Hello, World!")`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 14px; border-radius: 6px;"><span style="color: #94a3b8;">$ python main.py</span><br/><span style="color: #4ade80;">Hello, World!</span></div>`,
        },
      },
      {
        title: "Why Python?",
        paragraphs: [
          "Python works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc).",
          "Python has a simple syntax similar to the English language.",
          "Python has syntax that allows developers to write programs with fewer lines than some other programming languages.",
          "Python runs on an interpreter system, meaning that code can be executed as soon as it is written. This means that prototyping can be very quick.",
        ],
        tip: "Python relies on indentation, using whitespace, to define scope; such as the scope of loops, functions and classes. Other programming languages often use curly-brackets for this purpose.",
      },
    ],
  },
  "get-started": {
    title: "Python Getting Started",
    subtitle: "Python install and getting started with Python command line or IDE.",
    prevSlug: "introduction",
    nextSlug: "syntax",
    sections: [
      {
        title: "Python Install",
        paragraphs: [
          "Many PCs and Macs will have Python already installed.",
          "To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):",
        ],
        codeSnippet: {
          code: `C:\\Users\\Your Name>python --version\nPython 3.12.0`,
        },
      },
      {
        title: "Python Quickstart",
        paragraphs: [
          "Python is an interpreted programming language, this means that as a developer you write Python (.py) files in a text editor and then put those files into the python interpreter to be executed.",
          "Let's write our first Python file, called helloworld.py:",
        ],
        codeSnippet: {
          code: `print("Hello, World!")`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello, World!</div>`,
        },
        tip: "You can run Python code interactively in the terminal by simply typing 'python' and hitting Enter.",
      },
    ],
  },
  syntax: {
    title: "Python Syntax",
    subtitle: "Python syntax can be executed by writing directly in the Command Line, or by creating a python file on the server.",
    prevSlug: "get-started",
    nextSlug: "comments",
    sections: [
      {
        title: "Python Indentation",
        paragraphs: [
          "Indentation refers to the spaces at the beginning of a code line.",
          "Where in other programming languages the indentation in code is for readability only, the indentation in Python is very important. Python uses indentation to indicate a block of code.",
        ],
        codeSnippet: {
          code: `if 5 > 2:\n    print("Five is greater than two!")`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 14px; border-radius: 6px;">Five is greater than two!</div>`,
        },
        note: "Python will give you an error if you skip the indentation: SyntaxError: expected an indented block.",
      },
      {
        title: "Python Variables",
        paragraphs: [
          "In Python, variables are created when you assign a value to it:",
        ],
        codeSnippet: {
          code: `x = 5\ny = "Hello, World!"`,
        },
      },
    ],
  },
  comments: {
    title: "Python Comments",
    subtitle: "Comments can be used to explain Python code, make the code more readable, and prevent execution when testing code.",
    prevSlug: "syntax",
    nextSlug: "variables",
    sections: [
      {
        title: "Creating a Comment",
        paragraphs: [
          "Comments starts with a #, and Python will ignore them:",
        ],
        codeSnippet: {
          code: `# This is a comment\nprint("Hello, World!")\n\nprint("Hello, World!") # This is also a comment`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello, World!</div>`,
        },
      },
      {
        title: "Multiline Comments",
        paragraphs: [
          "Python does not really have a syntax for multiline comments.",
          "To add a multiline comment you could insert a # for each line, or use a multiline string triple quotes \"\"\" :",
        ],
        codeSnippet: {
          code: `"""\nThis is a comment\nwritten in\nmore than just one line\n"""\nprint("Hello, World!")`,
        },
      },
    ],
  },
  variables: {
    title: "Python Variables",
    subtitle: "Variables are containers for storing data values.",
    prevSlug: "comments",
    nextSlug: "data-types",
    sections: [
      {
        title: "Creating Variables",
        paragraphs: [
          "Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.",
        ],
        codeSnippet: {
          code: `x = 5\ny = "John"\nprint(x)\nprint(y)`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 14px; border-radius: 6px;">5<br/>John</div>`,
        },
      },
      {
        title: "Casting & Getting the Type",
        paragraphs: [
          "If you want to specify the data type of a variable, this can be done with casting.",
          "You can get the data type of a variable with the type() function:",
        ],
        codeSnippet: {
          code: `x = str(3)    # x will be '3'\ny = int(3)    # y will be 3\nz = float(3)  # z will be 3.0\n\nprint(type(x)) # <class 'str'>\nprint(type(y)) # <class 'int'>`,
        },
        tip: "Variable names are case-sensitive: a = 4 and A = 'Sally' are two different variables.",
      },
    ],
  },
  "data-types": {
    title: "Python Data Types",
    subtitle: "Variables can store data of different types, and different types can do different things.",
    prevSlug: "variables",
    nextSlug: "numbers",
    sections: [
      {
        title: "Built-in Data Types",
        paragraphs: [
          "Python has the following data types built-in by default, in these categories:",
        ],
        table: {
          headers: ["Category", "Type Names", "Example"],
          rows: [
            ["Text Type", "str", 'x = "Hello World"'],
            ["Numeric Types", "int, float, complex", "x = 20, x = 20.5, x = 1j"],
            ["Sequence Types", "list, tuple, range", 'x = ["apple", "banana"], x = ("apple",)'],
            ["Mapping Type", "dict", 'x = {"name" : "John", "age" : 36}'],
            ["Set Types", "set, frozenset", 'x = {"apple", "banana", "cherry"}'],
            ["Boolean Type", "bool", "x = True"],
            ["Binary Types", "bytes, bytearray", 'x = b"Hello"'],
            ["None Type", "NoneType", "x = None"],
          ],
        },
      },
      {
        title: "Getting the Data Type",
        paragraphs: [
          "You can print the data type of any object by using the type() function:",
        ],
        codeSnippet: {
          code: `x = 5\nprint(type(x))`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 10px; border-radius: 4px;">&lt;class 'int'&gt;</div>`,
        },
      },
    ],
  },
  numbers: {
    title: "Python Numbers",
    subtitle: "There are three numeric types in Python: int, float, and complex.",
    prevSlug: "data-types",
    nextSlug: "casting",
    sections: [
      {
        title: "int, float, and complex",
        paragraphs: [
          "Int, or integer, is a whole number, positive or negative, without decimals, of unlimited length.",
          "Float, or 'floating point number' is a number, positive or negative, containing one or more decimals.",
          "Complex numbers are written with a 'j' as the imaginary part.",
        ],
        codeSnippet: {
          code: `x = 1    # int\ny = 2.8  # float\nz = 1j   # complex`,
        },
      },
      {
        title: "Random Number",
        paragraphs: [
          "Python does not have a random() function to make a random number, but Python has a built-in module called random that can be used to make random numbers:",
        ],
        codeSnippet: {
          code: `import random\nprint(random.randrange(1, 10))`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">7</div>`,
        },
      },
    ],
  },
  casting: {
    title: "Python Casting",
    subtitle: "Specify a Variable Type using constructor functions.",
    prevSlug: "numbers",
    nextSlug: "strings",
    sections: [
      {
        title: "Specify a Type",
        paragraphs: [
          "There may be times when you want to specify a type on to a variable. This can be done with casting.",
          "int() - constructs an integer number from an integer literal, a float literal, or a string literal.",
          "float() - constructs a float number from an integer literal, a float literal or a string literal.",
          "str() - constructs a string from a wide variety of data types, including strings, integer literals and float literals.",
        ],
        codeSnippet: {
          code: `x = int(1)     # x will be 1\ny = int(2.8)   # y will be 2\nz = int("3")   # z will be 3\nw = float("4.2") # w will be 4.2`,
        },
      },
    ],
  },
  strings: {
    title: "Python Strings",
    subtitle: "Strings in python are surrounded by either single quotation marks, or double quotation marks.",
    prevSlug: "casting",
    nextSlug: "booleans",
    sections: [
      {
        title: "Strings are Arrays",
        paragraphs: [
          "Like many other popular programming languages, strings in Python are arrays of bytes representing unicode characters.",
          "Square brackets can be used to access elements of the string.",
        ],
        codeSnippet: {
          code: `a = "Hello, World!"\nprint(a[1])  # 'e'`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">e</div>`,
        },
      },
      {
        title: "String Length & Slicing",
        paragraphs: [
          "To get the length of a string, use the len() function.",
          "You can return a range of characters by using the slice syntax:",
        ],
        codeSnippet: {
          code: `b = "Hello, World!"\nprint(len(b))       # 13\nprint(b[2:5])       # "llo"\nprint(b.upper())    # "HELLO, WORLD!"\nprint(b.replace("H", "J")) # "Jello, World!"`,
        },
      },
      {
        title: "F-Strings (String Formatting)",
        paragraphs: [
          "F-Strings are the preferred way of formatting strings in modern Python:",
        ],
        codeSnippet: {
          code: `age = 36\ntxt = f"My name is John, I am {age}"\nprint(txt)`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">My name is John, I am 36</div>`,
        },
      },
    ],
  },
  booleans: {
    title: "Python Booleans",
    subtitle: "Booleans represent one of two values: True or False.",
    prevSlug: "strings",
    nextSlug: "operators",
    sections: [
      {
        title: "Boolean Values",
        paragraphs: [
          "In programming you often need to know if an expression is True or False.",
          "When you compare two values, the expression is evaluated and Python returns the Boolean answer:",
        ],
        codeSnippet: {
          code: `print(10 > 9)   # True\nprint(10 == 9)  # False\nprint(10 < 9)   # False`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">True<br/>False<br/>False</div>`,
        },
      },
      {
        title: "Most Values are True",
        paragraphs: [
          "Almost any value is evaluated to True if it has some sort of content.",
          "Any string is True, except empty strings.",
          "Any number is True, except 0.",
          "Any list, tuple, set, and dictionary are True, except empty ones.",
        ],
        codeSnippet: {
          code: `bool("abc")  # True\nbool(123)    # True\nbool(["apple", "cherry", "banana"]) # True\nbool(False)  # False\nbool(None)   # False\nbool(0)      # False\nbool("")     # False`,
        },
      },
    ],
  },
  operators: {
    title: "Python Operators",
    subtitle: "Operators are used to perform operations on variables and values.",
    prevSlug: "booleans",
    nextSlug: "lists",
    sections: [
      {
        title: "Python Arithmetic Operators",
        paragraphs: [
          "Arithmetic operators are used with numeric values to perform common mathematical operations:",
        ],
        table: {
          headers: ["Operator", "Name", "Example"],
          rows: [
            ["+", "Addition", "x + y"],
            ["-", "Subtraction", "x - y"],
            ["*", "Multiplication", "x * y"],
            ["/", "Division", "x / y"],
            ["%", "Modulus", "x % y"],
            ["**", "Exponentiation", "x ** y"],
            ["//", "Floor division", "x // y"],
          ],
        },
      },
      {
        title: "Python Logical & Membership Operators",
        paragraphs: [
          "Logical operators: and, or, not.",
          "Membership operators: in, not in.",
        ],
        codeSnippet: {
          code: `x = 5\nprint(x > 3 and x < 10)  # True\n\nfruits = ["apple", "banana"]\nprint("banana" in fruits) # True`,
        },
      },
    ],
  },
  lists: {
    title: "Python Lists",
    subtitle: "Lists are used to store multiple items in a single variable.",
    prevSlug: "operators",
    nextSlug: "tuples",
    sections: [
      {
        title: "List Items",
        paragraphs: [
          "Lists are created using square brackets [].",
          "List items are ordered, changeable, and allow duplicate values.",
          "List items are indexed, the first item has index [0], the second item has index [1] etc.",
        ],
        codeSnippet: {
          code: `thislist = ["apple", "banana", "cherry"]\nprint(thislist)\nprint(len(thislist))\nprint(thislist[0])`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">['apple', 'banana', 'cherry']<br/>3<br/>apple</div>`,
        },
      },
      {
        title: "Add and Remove List Items",
        paragraphs: [
          "To add an item to the end of the list, use the append() method.",
          "To insert a list item at a specified index, use the insert() method.",
          "The remove() method removes the specified item.",
          "The pop() method removes the specified index (or the last item if index is not specified).",
        ],
        codeSnippet: {
          code: `thislist = ["apple", "banana", "cherry"]\nthislist.append("orange")\nthislist.insert(1, "blueberry")\nthislist.remove("banana")\nprint(thislist)`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">['apple', 'blueberry', 'cherry', 'orange']</div>`,
        },
      },
      {
        title: "List Comprehension",
        paragraphs: [
          "List comprehension offers a shorter syntax when you want to create a new list based on the values of an existing list:",
        ],
        codeSnippet: {
          code: `fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = [x for x in fruits if "a" in x]\nprint(newlist) # ['apple', 'banana', 'mango']`,
        },
      },
    ],
  },
  tuples: {
    title: "Python Tuples",
    subtitle: "Tuples are used to store multiple items in a single variable. A tuple is a collection which is ordered and unchangeable.",
    prevSlug: "lists",
    nextSlug: "sets",
    sections: [
      {
        title: "Tuple Syntax",
        paragraphs: [
          "Tuples are written with round brackets ().",
          "Tuple items are ordered, unchangeable, and allow duplicate values.",
        ],
        codeSnippet: {
          code: `thistuple = ("apple", "banana", "cherry")\nprint(thistuple)\nprint(len(thistuple))`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">('apple', 'banana', 'cherry')<br/>3</div>`,
        },
        note: "To create a tuple with only one item, you have to add a comma after the item, otherwise Python will not recognize it as a tuple: thistuple = ('apple',)",
      },
    ],
  },
  sets: {
    title: "Python Sets",
    subtitle: "Sets are used to store multiple items in a single variable. A set is a collection which is unordered, unchangeable, and unindexed.",
    prevSlug: "tuples",
    nextSlug: "dictionaries",
    sections: [
      {
        title: "Set Syntax",
        paragraphs: [
          "Sets are written with curly brackets {}.",
          "Set items are unordered, unchangeable, and do not allow duplicate values.",
        ],
        codeSnippet: {
          code: `thisset = {"apple", "banana", "cherry"}\nprint(thisset)\n\n# Adding items:\nthisset.add("orange")\n\n# Removing items:\nthisset.remove("banana")`,
        },
      },
    ],
  },
  dictionaries: {
    title: "Python Dictionaries",
    subtitle: "Dictionaries are used to store data values in key:value pairs.",
    prevSlug: "sets",
    nextSlug: "if-else",
    sections: [
      {
        title: "Dictionary Syntax",
        paragraphs: [
          "Dictionaries are written with curly brackets, and have keys and values:",
        ],
        codeSnippet: {
          code: `thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(thisdict["brand"])\nprint(thisdict.get("model"))`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Ford<br/>Mustang</div>`,
        },
      },
      {
        title: "Looping Dictionaries",
        paragraphs: [
          "You can loop through a dictionary by using a for loop. Use .keys(), .values(), or .items():",
        ],
        codeSnippet: {
          code: `for x, y in thisdict.items():\n    print(x, y)`,
        },
      },
    ],
  },
  "if-else": {
    title: "Python If ... Else",
    subtitle: "Python supports the usual logical conditions from mathematics.",
    prevSlug: "dictionaries",
    nextSlug: "while-loops",
    sections: [
      {
        title: "The if, elif, and else Statements",
        paragraphs: [
          "An 'if statement' is written by using the if keyword.",
          "The elif keyword is Python's way of saying 'if the previous conditions were not true, then try this condition'.",
          "The else keyword catches anything which isn't caught by the preceding conditions.",
        ],
        codeSnippet: {
          code: `a = 200\nb = 33\nif b > a:\n    print("b is greater than a")\nelif a == b:\n    print("a and b are equal")\nelse:\n    print("a is greater than b")`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">a is greater than b</div>`,
        },
      },
      {
        title: "Short Hand If ... Else (Ternary)",
        paragraphs: [
          "If you have only one statement to execute, one for if, and one for else, you can put it all on the same line:",
        ],
        codeSnippet: {
          code: `a = 2\nb = 330\nprint("A") if a > b else print("B")`,
        },
      },
    ],
  },
  "while-loops": {
    title: "Python While Loops",
    subtitle: "With the while loop we can execute a set of statements as long as a condition is true.",
    prevSlug: "if-else",
    nextSlug: "for-loops",
    sections: [
      {
        title: "The while Loop",
        paragraphs: [
          "The while loop executes a set of statements as long as a condition is true.",
        ],
        codeSnippet: {
          code: `i = 1\nwhile i < 6:\n    print(i)\n    i += 1`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">1<br/>2<br/>3<br/>4<br/>5</div>`,
        },
        note: "Remember to increment i, or else the loop will continue forever.",
      },
      {
        title: "The break and continue Statements",
        paragraphs: [
          "With the break statement we can stop the loop even if the while condition is true.",
          "With the continue statement we can stop the current iteration, and continue with the next.",
        ],
        codeSnippet: {
          code: `i = 0\nwhile i < 6:\n    i += 1\n    if i == 3:\n        continue\n    print(i)`,
        },
      },
    ],
  },
  "for-loops": {
    title: "Python For Loops",
    subtitle: "A for loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).",
    prevSlug: "while-loops",
    nextSlug: "functions",
    sections: [
      {
        title: "Iterating Through a List",
        paragraphs: [
          "With the for loop we can execute a set of statements, once for each item in a list, tuple, set etc.",
        ],
        codeSnippet: {
          code: `fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n    print(x)`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">apple<br/>banana<br/>cherry</div>`,
        },
      },
      {
        title: "The range() Function",
        paragraphs: [
          "To loop through a set of code a specified number of times, we can use the range() function.",
          "The range() function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and ends at a specified number.",
        ],
        codeSnippet: {
          code: `for x in range(6):\n    print(x)    # prints 0 to 5\n\nfor x in range(2, 6):\n    print(x)    # prints 2 to 5`,
        },
      },
    ],
  },
  functions: {
    title: "Python Functions",
    subtitle: "A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.",
    prevSlug: "for-loops",
    nextSlug: "lambda",
    sections: [
      {
        title: "Creating and Calling a Function",
        paragraphs: [
          "In Python a function is defined using the def keyword:",
        ],
        codeSnippet: {
          code: `def my_function():\n    print("Hello from a function")\n\nmy_function()`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Hello from a function</div>`,
        },
      },
      {
        title: "Arguments & Return Values",
        paragraphs: [
          "Information can be passed into functions as arguments.",
          "To let a function return a value, use the return statement:",
        ],
        codeSnippet: {
          code: `def my_function(x):\n    return 5 * x\n\nprint(my_function(3))\nprint(my_function(5))`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">15<br/>25</div>`,
        },
        tip: "If you do not know how many arguments will be passed into your function, add a * before the parameter name (*args).",
      },
    ],
  },
  lambda: {
    title: "Python Lambda",
    subtitle: "A lambda function is a small anonymous function. A lambda function can take any number of arguments, but can only have one expression.",
    prevSlug: "functions",
    nextSlug: "classes",
    sections: [
      {
        title: "Lambda Syntax",
        paragraphs: [
          "Syntax: lambda arguments : expression",
          "The expression is executed and the result is returned:",
        ],
        codeSnippet: {
          code: `x = lambda a : a + 10\nprint(x(5))      # 15\n\nmultiply = lambda a, b : a * b\nprint(multiply(5, 6)) # 30`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">15<br/>30</div>`,
        },
      },
    ],
  },
  classes: {
    title: "Python Classes and Objects",
    subtitle: "Python is an object oriented programming language. Almost everything in Python is an object, with its properties and methods.",
    prevSlug: "lambda",
    nextSlug: "inheritance",
    sections: [
      {
        title: "The __init__() Function",
        paragraphs: [
          "All classes have a function called __init__(), which is always executed when the class is being initiated.",
          "Use the __init__() function to assign values to object properties:",
        ],
        codeSnippet: {
          code: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def myfunc(self):\n        print("Hello my name is " + self.name)\n\np1 = Person("John", 36)\np1.myfunc()`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Hello my name is John</div>`,
        },
        note: "The self parameter is a reference to the current instance of the class, and is used to access variables that belong to the class.",
      },
    ],
  },
  inheritance: {
    title: "Python Inheritance",
    subtitle: "Inheritance allows us to define a class that inherits all the methods and properties from another class.",
    prevSlug: "classes",
    nextSlug: "modules",
    sections: [
      {
        title: "Parent and Child Class",
        paragraphs: [
          "Parent class is the class being inherited from, also called base class.",
          "Child class is the class that inherits from another class, also called derived class.",
        ],
        codeSnippet: {
          code: `class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    def __init__(self, fname, lname, year):\n        super().__init__(fname, lname)\n        self.graduationyear = year\n\nx = Student("Mike", "Olsen", 2019)\nx.printname()`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Mike Olsen</div>`,
        },
      },
    ],
  },
  modules: {
    title: "Python Modules",
    subtitle: "Consider a module to be the same as a code library. A file containing a set of functions you want to include in your application.",
    prevSlug: "inheritance",
    nextSlug: "try-except",
    sections: [
      {
        title: "Use a Module",
        paragraphs: [
          "Now we can use the module we just created, by using the import statement:",
        ],
        codeSnippet: {
          code: `import platform\n\nx = platform.system()\nprint(x)`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Windows</div>`,
        },
      },
    ],
  },
  "try-except": {
    title: "Python Try Except",
    subtitle: "The try block lets you test a block of code for errors. The except block lets you handle the error.",
    prevSlug: "modules",
    nextSlug: "user-input",
    sections: [
      {
        title: "Exception Handling",
        paragraphs: [
          "When an error occurs, or exception as we call it, Python will normally stop and generate an error message.",
          "These exceptions can be handled using the try statement:",
        ],
        codeSnippet: {
          code: `try:\n    print(x)\nexcept:\n    print("An exception occurred")\nfinally:\n    print("The 'try except' is finished")`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #ef4444; padding: 10px; border-radius: 4px;">An exception occurred<br/><span style="color: #94a3b8;">The 'try except' is finished</span></div>`,
        },
      },
    ],
  },
};

export const W3_PYTHON_EXERCISES: Record<string, ChapterExercise> = {
  introduction: {
    question: "What is a correct syntax to output 'Hello World' in Python?",
    options: ["print('Hello World')", "echo 'Hello World'", "console.log('Hello World')"],
    correctIndex: 0,
    explanation: "In Python, the print() function is used to output text or values to the screen.",
  },
  syntax: {
    question: "How do you start writing an if statement in Python?",
    options: ["if x > y:", "if (x > y)", "if x > y then:"],
    correctIndex: 0,
    explanation: "In Python, if statements end with a colon (:) and do not require parentheses around the condition.",
  },
};

export const W3_PYTHON_CHALLENGES: Record<string, ChapterChallenge> = {
  introduction: {
    instruction: "Write code to print 'Python is awesome!' to the console.",
    beforeCode: "",
    placeholder: 'print("Python is awesome!")',
    afterCode: "",
    correctAnswer: ['print("Python is awesome!")', "print('Python is awesome!')"],
    hint: "Use the print() function with parentheses and quotes.",
    previewSnippet: () => `<div style="padding: 12px; background: #0f172a; color: #4ade80; font-family: monospace; border-radius: 4px;">Python is awesome!</div>`,
  },
};

export function getChapterPythonData(slug: string): W3ChapterData {
  const currentIndex = ALL_PYTHON_CHAPTERS.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? ALL_PYTHON_CHAPTERS[currentIndex - 1] : ALL_PYTHON_CHAPTERS[0];
  const nextChapter = currentIndex >= 0 && currentIndex < ALL_PYTHON_CHAPTERS.length - 1 
    ? ALL_PYTHON_CHAPTERS[currentIndex + 1] 
    : ALL_PYTHON_CHAPTERS[ALL_PYTHON_CHAPTERS.length - 1];

  if (W3_PYTHON_CHAPTERS[slug]) {
    return {
      ...W3_PYTHON_CHAPTERS[slug],
      prevSlug: prevChapter ? prevChapter.slug : "home",
      nextSlug: nextChapter ? nextChapter.slug : "syntax",
    };
  }

  const currentItem = ALL_PYTHON_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    title: title,
    subtitle: `Learn about ${title} in Python with interactive examples and code runner.`,
    prevSlug: prevChapter ? prevChapter.slug : "home",
    nextSlug: nextChapter ? nextChapter.slug : "syntax",
    sections: [
      {
        title: `Understanding ${title}`,
        paragraphs: [
          `${title} is an essential part of the Python programming language.`,
          `It follows clean Pythonic design principles (PEP 8) for readable and maintainable software.`,
        ],
        codeSnippet: {
          code: `# Example of ${title}\nvalue = 42\nprint(f"${title}: {value}")`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">${title}: 42</div>`,
        },
        tip: `Python is known for its readability and simplicity. Always write clean code with proper indentation.`,
      },
    ],
  };
}

export function getChapterPythonExercise(slug: string): ChapterExercise {
  if (W3_PYTHON_EXERCISES[slug]) {
    return W3_PYTHON_EXERCISES[slug];
  }
  const currentItem = ALL_PYTHON_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.toUpperCase();
  return {
    question: `What is the primary role of ${title} in Python?`,
    options: [
      `To provide standard syntax and functions for ${title}.`,
      `To compile Python code directly to assembly.`,
      `To render HTML elements in web browsers.`,
    ],
    correctIndex: 0,
    explanation: `${title} is a core feature of Python designed for clean, concise, and readable script execution.`,
  };
}

export function getChapterPythonChallenge(slug: string): ChapterChallenge {
  if (W3_PYTHON_CHALLENGES[slug]) {
    return W3_PYTHON_CHALLENGES[slug];
  }
  const currentItem = ALL_PYTHON_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.toUpperCase();
  return {
    instruction: `Complete the Python code demonstrating ${title}.`,
    beforeCode: `# Python Challenge\n`,
    placeholder: `result = 100`,
    afterCode: `\nprint(result)`,
    correctAnswer: ["result = 100", "result=100"],
    hint: "Assign 100 to variable result.",
    previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">100</div>`,
  };
}
