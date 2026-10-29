import { ChapterItem, SidebarSection, W3ChapterData, ChapterExercise, ChapterChallenge } from "./w3-html-chapters-data";

const makeSqlSubItems = (name: string, slug: string) => [
  { name: name.replace(/^SQL\s+/i, ""), slug: slug },
  { name: "Exercise", slug: "exercises" },
];

export const SQL_SECTIONS: SidebarSection[] = [
  {
    title: "SQL TUTORIAL",
    items: [
      { name: "SQL HOME", slug: "home" },
      { name: "SQL Intro", slug: "introduction", hasCaret: true, subItems: makeSqlSubItems("Introduction", "introduction") },
      { name: "SQL Syntax", slug: "syntax", hasCaret: true, subItems: makeSqlSubItems("Syntax", "syntax") },
      { name: "SQL SELECT", slug: "select", hasCaret: true, subItems: makeSqlSubItems("SELECT", "select") },
      { name: "SQL SELECT DISTINCT", slug: "select-distinct", hasCaret: true, subItems: makeSqlSubItems("SELECT DISTINCT", "select-distinct") },
      { name: "SQL WHERE", slug: "where", hasCaret: true, subItems: makeSqlSubItems("WHERE", "where") },
      { name: "SQL ORDER BY", slug: "order-by", hasCaret: true, subItems: makeSqlSubItems("ORDER BY", "order-by") },
      { name: "SQL AND, OR, NOT", slug: "and-or-not", hasCaret: true, subItems: makeSqlSubItems("AND, OR, NOT", "and-or-not") },
      { name: "SQL INSERT INTO", slug: "insert-into", hasCaret: true, subItems: makeSqlSubItems("INSERT INTO", "insert-into") },
      { name: "SQL NULL Values", slug: "null-values", hasCaret: true, subItems: makeSqlSubItems("NULL Values", "null-values") },
      { name: "SQL UPDATE", slug: "update", hasCaret: true, subItems: makeSqlSubItems("UPDATE", "update") },
      { name: "SQL DELETE", slug: "delete", hasCaret: true, subItems: makeSqlSubItems("DELETE", "delete") },
      { name: "SQL TOP / LIMIT", slug: "top-limit", hasCaret: true, subItems: makeSqlSubItems("TOP / LIMIT", "top-limit") },
      { name: "SQL Aggregate Functions", slug: "aggregate-functions", hasCaret: true, subItems: makeSqlSubItems("Aggregate Functions", "aggregate-functions") },
      { name: "SQL MIN and MAX", slug: "min-max", hasCaret: true, subItems: makeSqlSubItems("MIN and MAX", "min-max") },
      { name: "SQL COUNT, AVG, SUM", slug: "count-avg-sum", hasCaret: true, subItems: makeSqlSubItems("COUNT, AVG, SUM", "count-avg-sum") },
      { name: "SQL LIKE", slug: "like", hasCaret: true, subItems: makeSqlSubItems("LIKE", "like") },
      { name: "SQL Wildcards", slug: "wildcards", hasCaret: true, subItems: makeSqlSubItems("Wildcards", "wildcards") },
      { name: "SQL IN", slug: "in", hasCaret: true, subItems: makeSqlSubItems("IN", "in") },
      { name: "SQL BETWEEN", slug: "between", hasCaret: true, subItems: makeSqlSubItems("BETWEEN", "between") },
      { name: "SQL Aliases", slug: "aliases", hasCaret: true, subItems: makeSqlSubItems("Aliases", "aliases") },
      { name: "SQL Joins", slug: "joins", hasCaret: true, subItems: makeSqlSubItems("Joins", "joins") },
      { name: "SQL INNER JOIN", slug: "inner-join", hasCaret: true, subItems: makeSqlSubItems("INNER JOIN", "inner-join") },
      { name: "SQL LEFT JOIN", slug: "left-join", hasCaret: true, subItems: makeSqlSubItems("LEFT JOIN", "left-join") },
      { name: "SQL RIGHT JOIN", slug: "right-join", hasCaret: true, subItems: makeSqlSubItems("RIGHT JOIN", "right-join") },
      { name: "SQL FULL JOIN", slug: "full-join", hasCaret: true, subItems: makeSqlSubItems("FULL JOIN", "full-join") },
      { name: "SQL GROUP BY", slug: "group-by", hasCaret: true, subItems: makeSqlSubItems("GROUP BY", "group-by") },
      { name: "SQL HAVING", slug: "having", hasCaret: true, subItems: makeSqlSubItems("HAVING", "having") },
    ],
  },
];

export const ALL_SQL_CHAPTERS: ChapterItem[] = SQL_SECTIONS.flatMap(s => s.items);

export const W3_SQL_CHAPTERS: Record<string, W3ChapterData> = {
  introduction: {
    title: "SQL Introduction",
    subtitle: "SQL is a standard language for storing, manipulating and retrieving data in databases.",
    prevSlug: "home",
    nextSlug: "syntax",
    sections: [
      {
        title: "What is SQL?",
        paragraphs: [
          "SQL stands for Structured Query Language.",
          "SQL lets you access and manipulate databases.",
          "SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987.",
        ],
        bullets: [
          "SQL can execute queries against a database",
          "SQL can retrieve data from a database",
          "SQL can insert records in a database",
          "SQL can update records in a database",
          "SQL can delete records from a database",
          "SQL can create new databases, tables, and views",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9; text-align: left;"><th style="padding: 8px; border: 1px solid #cbd5e1;">CustomerID</th><th style="padding: 8px; border: 1px solid #cbd5e1;">CustomerName</th><th style="padding: 8px; border: 1px solid #cbd5e1;">Country</th></tr><tr><td style="padding: 8px; border: 1px solid #cbd5e1;">1</td><td style="padding: 8px; border: 1px solid #cbd5e1;">Alfreds Futterkiste</td><td style="padding: 8px; border: 1px solid #cbd5e1;">Germany</td></tr><tr><td style="padding: 8px; border: 1px solid #cbd5e1;">2</td><td style="padding: 8px; border: 1px solid #cbd5e1;">Ana Trujillo</td><td style="padding: 8px; border: 1px solid #cbd5e1;">Mexico</td></tr></table>`,
        },
      },
    ],
  },
  syntax: {
    title: "SQL Syntax",
    subtitle: "Database tables hold data. A table is divided into rows and columns.",
    prevSlug: "introduction",
    nextSlug: "select",
    sections: [
      {
        title: "Database Tables",
        paragraphs: [
          "A database most often contains one or more tables. Each table is identified by a name (e.g. 'Customers' or 'Orders'). Tables contain records (rows) with data.",
          "In DevAcademy, we will use the well known Northwind sample database.",
        ],
        codeSnippet: {
          code: `SELECT CustomerName, City FROM Customers;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">CustomerName</th><th style="padding: 6px; border: 1px solid #cbd5e1;">City</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Alfreds Futterkiste</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Berlin</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Ana Trujillo Emparedados</td><td style="padding: 6px; border: 1px solid #cbd5e1;">México D.F.</td></tr></table>`,
        },
        note: "SQL keywords are NOT case sensitive: select is the same as SELECT.",
      },
      {
        title: "Semicolon after SQL Statements?",
        paragraphs: [
          "Some database systems require a semicolon at the end of each SQL statement.",
          "Semicolon is the standard way to separate each SQL statement in database systems that allow more than one SQL statement to be executed in the same call to the server.",
        ],
        tip: "DevAcademy and standard relational databases recommend putting a semicolon at the end of every statement.",
      },
    ],
  },
  select: {
    title: "SQL SELECT Statement",
    subtitle: "The SELECT statement is used to select data from a database.",
    prevSlug: "syntax",
    nextSlug: "select-distinct",
    sections: [
      {
        title: "The SQL SELECT Statement",
        paragraphs: [
          "The data returned is stored in a result table, called the result-set.",
        ],
        codeSnippet: {
          code: `SELECT CustomerName, City, Country FROM Customers;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">CustomerName</th><th style="padding: 6px; border: 1px solid #cbd5e1;">City</th><th style="padding: 6px; border: 1px solid #cbd5e1;">Country</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Alfreds Futterkiste</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Berlin</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Germany</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Antonio Moreno Taquería</td><td style="padding: 6px; border: 1px solid #cbd5e1;">México D.F.</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Mexico</td></tr></table>`,
        },
      },
      {
        title: "Select ALL Columns",
        paragraphs: [
          "If you want to select all columns, use the following syntax with an asterisk (*):",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers;`,
        },
      },
    ],
  },
  "select-distinct": {
    title: "SQL SELECT DISTINCT Statement",
    subtitle: "The SELECT DISTINCT statement is used to return only distinct (different) values.",
    prevSlug: "select",
    nextSlug: "where",
    sections: [
      {
        title: "The SELECT DISTINCT Statement",
        paragraphs: [
          "Inside a table, a column often contains many duplicate values; and sometimes you only want to list the different (distinct) values.",
        ],
        codeSnippet: {
          code: `SELECT DISTINCT Country FROM Customers;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">Country</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Germany</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Mexico</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">UK</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Sweden</td></tr></table>`,
        },
      },
    ],
  },
  where: {
    title: "SQL WHERE Clause",
    subtitle: "The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition.",
    prevSlug: "select-distinct",
    nextSlug: "order-by",
    sections: [
      {
        title: "WHERE Clause Syntax",
        paragraphs: [
          "The WHERE clause is not only used in SELECT statements, it is also used in UPDATE, DELETE, etc.!",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers\nWHERE Country = 'Mexico';`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">CustomerID</th><th style="padding: 6px; border: 1px solid #cbd5e1;">CustomerName</th><th style="padding: 6px; border: 1px solid #cbd5e1;">Country</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">2</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Ana Trujillo Emparedados</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Mexico</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">3</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Antonio Moreno Taquería</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Mexico</td></tr></table>`,
        },
        note: "SQL requires single quotes around text values (most database systems will also allow double quotes). Numeric fields should not be enclosed in quotes.",
      },
      {
        title: "Operators in The WHERE Clause",
        paragraphs: [
          "The following operators can be used in the WHERE clause:",
        ],
        table: {
          headers: ["Operator", "Description"],
          rows: [
            ["=", "Equal"],
            [">", "Greater than"],
            ["<", "Less than"],
            [">=", "Greater than or equal"],
            ["<=", "Less than or equal"],
            ["<>", "Not equal (also written as !=)"],
            ["BETWEEN", "Between a certain range"],
            ["LIKE", "Search for a pattern"],
            ["IN", "To specify multiple possible values for a column"],
          ],
        },
      },
    ],
  },
  "order-by": {
    title: "SQL ORDER BY Keyword",
    subtitle: "The ORDER BY keyword is used to sort the result-set in ascending or descending order.",
    prevSlug: "where",
    nextSlug: "and-or-not",
    sections: [
      {
        title: "The ORDER BY Keyword",
        paragraphs: [
          "The ORDER BY keyword sorts the records in ascending order by default. To sort the records in descending order, use the DESC keyword.",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers\nORDER BY Country DESC;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">CustomerName</th><th style="padding: 6px; border: 1px solid #cbd5e1;">Country</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Furia Bacalhau e Frutos</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Venezuela</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">White Clover Markets</td><td style="padding: 6px; border: 1px solid #cbd5e1;">USA</td></tr></table>`,
        },
      },
      {
        title: "ORDER BY Several Columns",
        paragraphs: [
          "The following SQL statement selects all customers from the 'Customers' table, sorted by the 'Country' and the 'CustomerName' column:",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers\nORDER BY Country ASC, CustomerName DESC;`,
        },
      },
    ],
  },
  "and-or-not": {
    title: "SQL AND, OR and NOT Operators",
    subtitle: "The WHERE clause can be combined with AND, OR, and NOT operators.",
    prevSlug: "order-by",
    nextSlug: "insert-into",
    sections: [
      {
        title: "AND, OR and NOT Syntax",
        paragraphs: [
          "The AND operator displays a record if all the conditions separated by AND are TRUE.",
          "The OR operator displays a record if any of the conditions separated by OR is TRUE.",
          "The NOT operator displays a record if the condition(s) is NOT TRUE.",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers\nWHERE Country = 'Germany' AND (City = 'Berlin' OR City = 'Stuttgart');`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Returned 2 matching records.</div>`,
        },
      },
    ],
  },
  "insert-into": {
    title: "SQL INSERT INTO Statement",
    subtitle: "The INSERT INTO statement is used to insert new records in a table.",
    prevSlug: "and-or-not",
    nextSlug: "null-values",
    sections: [
      {
        title: "INSERT INTO Syntax",
        paragraphs: [
          "It is possible to write the INSERT INTO statement in two ways:",
          "1. Specify both the column names and the values to be inserted:",
        ],
        codeSnippet: {
          code: `INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)\nVALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">1 row affected. Inserted CustomerID: 92.</div>`,
        },
      },
    ],
  },
  "null-values": {
    title: "SQL NULL Values",
    subtitle: "A field with a NULL value is a field with no value.",
    prevSlug: "insert-into",
    nextSlug: "update",
    sections: [
      {
        title: "What is a NULL Value?",
        paragraphs: [
          "If a field in a table is optional, it is possible to insert a new record or update a record without adding a value to this field. Then, the field will be saved with a NULL value.",
          "A NULL value is different from a zero value or a field that contains spaces. A field with a NULL value is one that has been left blank during record creation!",
        ],
        codeSnippet: {
          code: `SELECT CustomerName, ContactName, Address\nFROM Customers\nWHERE Address IS NULL;`,
        },
        tip: "Always use IS NULL and IS NOT NULL to look for NULL values; you cannot use comparison operators like = or !=.",
      },
    ],
  },
  update: {
    title: "SQL UPDATE Statement",
    subtitle: "The UPDATE statement is used to modify the existing records in a table.",
    prevSlug: "null-values",
    nextSlug: "delete",
    sections: [
      {
        title: "UPDATE Syntax",
        paragraphs: [
          "Notice the WHERE clause in the UPDATE statement. The WHERE clause specifies which record(s) that should be updated.",
        ],
        codeSnippet: {
          code: `UPDATE Customers\nSET ContactName = 'Alfred Schmidt', City = 'Frankfurt'\nWHERE CustomerID = 1;`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 12px; border-radius: 4px;">Query OK, 1 row affected.</div>`,
        },
        note: "Be careful when updating records. If you omit the WHERE clause, ALL records in the table will be updated!",
      },
    ],
  },
  delete: {
    title: "SQL DELETE Statement",
    subtitle: "The DELETE statement is used to delete existing records in a table.",
    prevSlug: "update",
    nextSlug: "top-limit",
    sections: [
      {
        title: "DELETE Syntax",
        paragraphs: [
          "Notice the WHERE clause in the DELETE statement. The WHERE clause specifies which record(s) should be deleted.",
        ],
        codeSnippet: {
          code: `DELETE FROM Customers\nWHERE CustomerName = 'Alfreds Futterkiste';`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #ef4444; padding: 12px; border-radius: 4px;">1 row deleted.</div>`,
        },
        note: "If you omit the WHERE clause, all records in the table will be deleted!",
      },
    ],
  },
  "top-limit": {
    title: "SQL TOP, LIMIT, or FETCH FIRST Clause",
    subtitle: "The SELECT TOP clause is used to specify the number of records to return.",
    prevSlug: "delete",
    nextSlug: "aggregate-functions",
    sections: [
      {
        title: "SQL TOP / LIMIT Syntax",
        paragraphs: [
          "The SELECT TOP clause is useful on large tables with thousands of records. Returning a large number of records can impact performance.",
          "Different databases use different syntax:",
        ],
        bullets: [
          "SQL Server / MS Access: SELECT TOP 3 * FROM Customers;",
          "MySQL: SELECT * FROM Customers LIMIT 3;",
          "Oracle: SELECT * FROM Customers FETCH FIRST 3 ROWS ONLY;",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers\nLIMIT 3;`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 10px; border-radius: 4px;">Top 3 records returned from database.</div>`,
        },
      },
    ],
  },
  "aggregate-functions": {
    title: "SQL Aggregate Functions",
    subtitle: "An aggregate function is a function that performs a calculation on a set of values, and returns a single value.",
    prevSlug: "top-limit",
    nextSlug: "min-max",
    sections: [
      {
        title: "Most Used SQL Aggregate Functions",
        paragraphs: [
          "Aggregate functions are often used with the GROUP BY clause of the SELECT statement.",
        ],
        table: {
          headers: ["Function", "Description"],
          rows: [
            ["MIN()", "returns the smallest value of the selected column"],
            ["MAX()", "returns the largest value of the selected column"],
            ["COUNT()", "returns the number of rows that matches a specified criterion"],
            ["SUM()", "returns the total sum of a numeric column"],
            ["AVG()", "returns the average value of a numeric column"],
          ],
        },
      },
    ],
  },
  "min-max": {
    title: "SQL MIN() and MAX() Functions",
    subtitle: "The MIN() function returns the smallest value of the selected column. The MAX() function returns the largest value.",
    prevSlug: "aggregate-functions",
    nextSlug: "count-avg-sum",
    sections: [
      {
        title: "MIN() and MAX() Examples",
        paragraphs: [
          "The following SQL statement finds the price of the cheapest product and the most expensive product:",
        ],
        codeSnippet: {
          code: `SELECT MIN(Price) AS SmallestPrice\nFROM Products;\n\nSELECT MAX(Price) AS LargestPrice\nFROM Products;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">SmallestPrice</th><th style="padding: 6px; border: 1px solid #cbd5e1;">LargestPrice</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">2.50</td><td style="padding: 6px; border: 1px solid #cbd5e1;">263.50</td></tr></table>`,
        },
      },
    ],
  },
  "count-avg-sum": {
    title: "SQL COUNT(), AVG() and SUM() Functions",
    subtitle: "The COUNT(), AVG() and SUM() functions return row counts, averages, and sums.",
    prevSlug: "min-max",
    nextSlug: "like",
    sections: [
      {
        title: "Examples",
        paragraphs: [
          "COUNT() returns the number of rows.",
          "AVG() returns the average value of a numeric column.",
          "SUM() returns the total sum of a numeric column.",
        ],
        codeSnippet: {
          code: `SELECT COUNT(ProductID)\nFROM Products;\n\nSELECT AVG(Price)\nFROM Products;\n\nSELECT SUM(Quantity)\nFROM OrderDetails;`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">COUNT: 77 | AVG: 28.86 | SUM: 12743</div>`,
        },
      },
    ],
  },
  like: {
    title: "SQL LIKE Operator",
    subtitle: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.",
    prevSlug: "count-avg-sum",
    nextSlug: "in",
    sections: [
      {
        title: "SQL Wildcards in LIKE",
        paragraphs: [
          "There are two wildcards often used in conjunction with the LIKE operator:",
        ],
        bullets: [
          "The percent sign (%) represents zero, one, or multiple characters",
          "The underscore sign (_) represents one, single character",
        ],
        table: {
          headers: ["LIKE Operator", "Description"],
          rows: [
            ["WHERE CustomerName LIKE 'a%'", "Finds any values that start with 'a'"],
            ["WHERE CustomerName LIKE '%a'", "Finds any values that end with 'a'"],
            ["WHERE CustomerName LIKE '%or%'", "Finds any values that have 'or' in any position"],
            ["WHERE CustomerName LIKE '_r%'", "Finds any values that have 'r' in the second position"],
            ["WHERE CustomerName LIKE 'a_%'", "Finds any values that start with 'a' and are at least 2 characters in length"],
          ],
        },
        codeSnippet: {
          code: `SELECT * FROM Customers\nWHERE CustomerName LIKE 'a%';`,
        },
      },
    ],
  },
  in: {
    title: "SQL IN Operator",
    subtitle: "The IN operator allows you to specify multiple values in a WHERE clause.",
    prevSlug: "like",
    nextSlug: "between",
    sections: [
      {
        title: "IN Operator Syntax",
        paragraphs: [
          "The IN operator is a shorthand for multiple OR conditions.",
        ],
        codeSnippet: {
          code: `SELECT * FROM Customers\nWHERE Country IN ('Germany', 'France', 'UK');`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Returned 29 records from Germany, France, and UK.</div>`,
        },
      },
    ],
  },
  between: {
    title: "SQL BETWEEN Operator",
    subtitle: "The BETWEEN operator selects values within a given range. The values can be numbers, text, or dates.",
    prevSlug: "in",
    nextSlug: "aliases",
    sections: [
      {
        title: "BETWEEN Syntax",
        paragraphs: [
          "The BETWEEN operator is inclusive: begin and end values are included.",
        ],
        codeSnippet: {
          code: `SELECT * FROM Products\nWHERE Price BETWEEN 10 AND 20;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">ProductName</th><th style="padding: 6px; border: 1px solid #cbd5e1;">Price</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Chai</td><td style="padding: 6px; border: 1px solid #cbd5e1;">18.00</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Chang</td><td style="padding: 6px; border: 1px solid #cbd5e1;">19.00</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Aniseed Syrup</td><td style="padding: 6px; border: 1px solid #cbd5e1;">10.00</td></tr></table>`,
        },
      },
    ],
  },
  aliases: {
    title: "SQL Aliases",
    subtitle: "SQL aliases are used to give a table, or a column in a table, a temporary name.",
    prevSlug: "between",
    nextSlug: "joins",
    sections: [
      {
        title: "Alias Column Syntax",
        paragraphs: [
          "Aliases are often used to make column names more readable. An alias only exists for the duration of that query.",
          "An alias is created with the AS keyword.",
        ],
        codeSnippet: {
          code: `SELECT CustomerID AS ID, CustomerName AS Customer\nFROM Customers;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">ID</th><th style="padding: 6px; border: 1px solid #cbd5e1;">Customer</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">1</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Alfreds Futterkiste</td></tr></table>`,
        },
      },
    ],
  },
  joins: {
    title: "SQL Joins",
    subtitle: "A JOIN clause is used to combine rows from two or more tables, based on a related column between them.",
    prevSlug: "aliases",
    nextSlug: "inner-join",
    sections: [
      {
        title: "Different Types of SQL JOINs",
        paragraphs: [
          "Here are the different types of the JOINs in SQL:",
        ],
        bullets: [
          "(INNER) JOIN: Returns records that have matching values in both tables",
          "LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table",
          "RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table",
          "FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table",
        ],
        codeSnippet: {
          code: `SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate\nFROM Orders\nINNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">OrderID</th><th style="padding: 6px; border: 1px solid #cbd5e1;">CustomerName</th><th style="padding: 6px; border: 1px solid #cbd5e1;">OrderDate</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">10248</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Wilman Kala</td><td style="padding: 6px; border: 1px solid #cbd5e1;">1996-07-04</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">10249</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Tóth</td><td style="padding: 6px; border: 1px solid #cbd5e1;">1996-07-05</td></tr></table>`,
        },
      },
    ],
  },
  "inner-join": {
    title: "SQL INNER JOIN Keyword",
    subtitle: "The INNER JOIN keyword selects records that have matching values in both tables.",
    prevSlug: "joins",
    nextSlug: "left-join",
    sections: [
      {
        title: "INNER JOIN Syntax",
        paragraphs: [
          "The INNER JOIN keyword selects all rows from both tables as long as there is a match between the columns.",
        ],
        codeSnippet: {
          code: `SELECT Customers.CustomerName, Orders.OrderID\nFROM Customers\nINNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;`,
        },
      },
    ],
  },
  "left-join": {
    title: "SQL LEFT JOIN Keyword",
    subtitle: "The LEFT JOIN keyword returns all records from the left table (table1), and the matching records from the right table (table2).",
    prevSlug: "inner-join",
    nextSlug: "right-join",
    sections: [
      {
        title: "LEFT JOIN Syntax",
        paragraphs: [
          "The result is 0 records from the right side, if there is no match.",
        ],
        codeSnippet: {
          code: `SELECT Customers.CustomerName, Orders.OrderID\nFROM Customers\nLEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID\nORDER BY Customers.CustomerName;`,
        },
      },
    ],
  },
  "right-join": {
    title: "SQL RIGHT JOIN Keyword",
    subtitle: "The RIGHT JOIN keyword returns all records from the right table (table2), and the matching records from the left table (table1).",
    prevSlug: "left-join",
    nextSlug: "full-join",
    sections: [
      {
        title: "RIGHT JOIN Syntax",
        paragraphs: [
          "The result is 0 records from the left side, if there is no match.",
        ],
        codeSnippet: {
          code: `SELECT Orders.OrderID, Employees.LastName, Employees.FirstName\nFROM Orders\nRIGHT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID\nORDER BY Orders.OrderID;`,
        },
      },
    ],
  },
  "full-join": {
    title: "SQL FULL OUTER JOIN Keyword",
    subtitle: "The FULL OUTER JOIN keyword returns all records when there is a match in left (table1) or right (table2) table records.",
    prevSlug: "right-join",
    nextSlug: "group-by",
    sections: [
      {
        title: "FULL OUTER JOIN Syntax",
        paragraphs: [
          "FULL OUTER JOIN and FULL JOIN are the same.",
        ],
        codeSnippet: {
          code: `SELECT Customers.CustomerName, Orders.OrderID\nFROM Customers\nFULL OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID\nORDER BY Customers.CustomerName;`,
        },
      },
    ],
  },
  "group-by": {
    title: "SQL GROUP BY Statement",
    subtitle: "The GROUP BY statement groups rows that have the same values into summary rows.",
    prevSlug: "full-join",
    nextSlug: "having",
    sections: [
      {
        title: "GROUP BY Syntax",
        paragraphs: [
          "The GROUP BY statement is often used with aggregate functions (COUNT(), MAX(), MIN(), SUM(), AVG()) to group the result-set by one or more columns.",
        ],
        codeSnippet: {
          code: `SELECT COUNT(CustomerID), Country\nFROM Customers\nGROUP BY Country\nORDER BY COUNT(CustomerID) DESC;`,
          liveHtml: `<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1;">COUNT(CustomerID)</th><th style="padding: 6px; border: 1px solid #cbd5e1;">Country</th></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">13</td><td style="padding: 6px; border: 1px solid #cbd5e1;">USA</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">11</td><td style="padding: 6px; border: 1px solid #cbd5e1;">France</td></tr><tr><td style="padding: 6px; border: 1px solid #cbd5e1;">11</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Germany</td></tr></table>`,
        },
      },
    ],
  },
  having: {
    title: "SQL HAVING Clause",
    subtitle: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.",
    prevSlug: "group-by",
    nextSlug: "home",
    sections: [
      {
        title: "HAVING Syntax",
        paragraphs: [
          "Aggregate functions cannot be used in a WHERE clause, so HAVING is used instead:",
        ],
        codeSnippet: {
          code: `SELECT COUNT(CustomerID), Country\nFROM Customers\nGROUP BY Country\nHAVING COUNT(CustomerID) > 5\nORDER BY COUNT(CustomerID) DESC;`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #4ade80; padding: 10px; border-radius: 4px;">Returned countries with more than 5 customers (USA, France, Germany, Brazil, UK).</div>`,
        },
      },
    ],
  },
};

export const W3_SQL_EXERCISES: Record<string, ChapterExercise> = {
  introduction: {
    question: "Which SQL statement is used to extract data from a database?",
    options: ["SELECT", "EXTRACT", "GET"],
    correctIndex: 0,
    explanation: "The SELECT statement is used to query data from database tables.",
  },
  syntax: {
    question: "Which SQL statement is used to update data in a database?",
    options: ["UPDATE", "SAVE", "MODIFY"],
    correctIndex: 0,
    explanation: "The UPDATE statement is used to modify existing records in a table.",
  },
};

export const W3_SQL_CHALLENGES: Record<string, ChapterChallenge> = {
  introduction: {
    instruction: "Write the SQL command to select all columns from the 'Users' table.",
    beforeCode: "",
    placeholder: "SELECT * FROM Users;",
    afterCode: "",
    correctAnswer: ["SELECT * FROM Users;", "SELECT * FROM Users", "select * from users;"],
    hint: "Use SELECT with an asterisk (*) to select all columns.",
    previewSnippet: () => `<div style="padding: 12px; background: #0f172a; color: #38bdf8; font-family: monospace; border-radius: 4px;">Returned all rows from Users</div>`,
  },
};

export function getChapterSqlData(slug: string): W3ChapterData {
  const currentIndex = ALL_SQL_CHAPTERS.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? ALL_SQL_CHAPTERS[currentIndex - 1] : ALL_SQL_CHAPTERS[0];
  const nextChapter = currentIndex >= 0 && currentIndex < ALL_SQL_CHAPTERS.length - 1 
    ? ALL_SQL_CHAPTERS[currentIndex + 1] 
    : ALL_SQL_CHAPTERS[ALL_SQL_CHAPTERS.length - 1];

  if (W3_SQL_CHAPTERS[slug]) {
    return {
      ...W3_SQL_CHAPTERS[slug],
      prevSlug: prevChapter ? prevChapter.slug : "home",
      nextSlug: nextChapter ? nextChapter.slug : "syntax",
    };
  }

  const currentItem = ALL_SQL_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.replace(/-/g, " ").toUpperCase();

  return {
    title: title,
    subtitle: `Learn about ${title} in SQL with syntax examples and sample database queries.`,
    prevSlug: prevChapter ? prevChapter.slug : "home",
    nextSlug: nextChapter ? nextChapter.slug : "syntax",
    sections: [
      {
        title: `Understanding ${title}`,
        paragraphs: [
          `${title} is a fundamental operation in Structured Query Language (SQL).`,
          `It allows database developers to manipulate, organize, and inspect relational database records effectively.`,
        ],
        codeSnippet: {
          code: `-- Example of ${title}\nSELECT * FROM TableName\nWHERE condition = 1;`,
          liveHtml: `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px;">Executing ${title} on DevAcademy DB</div>`,
        },
        tip: `Always test queries with LIMIT or WHERE clauses on development servers before running updates on production databases.`,
      },
    ],
  };
}

export function getChapterSqlExercise(slug: string): ChapterExercise {
  if (W3_SQL_EXERCISES[slug]) {
    return W3_SQL_EXERCISES[slug];
  }
  const currentItem = ALL_SQL_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.toUpperCase();
  return {
    question: `What is the purpose of ${title} in SQL?`,
    options: [
      `To execute database operations relating to ${title}.`,
      `To style web pages in the browser.`,
      `To compile backend machine code.`,
    ],
    correctIndex: 0,
    explanation: `${title} is an ANSI SQL standard syntax for relational database systems.`,
  };
}

export function getChapterSqlChallenge(slug: string): ChapterChallenge {
  if (W3_SQL_CHALLENGES[slug]) {
    return W3_SQL_CHALLENGES[slug];
  }
  const currentItem = ALL_SQL_CHAPTERS.find(c => c.slug === slug);
  const title = currentItem ? currentItem.name : slug.toUpperCase();
  return {
    instruction: `Write a query demonstrating ${title}.`,
    beforeCode: `-- SQL Challenge\n`,
    placeholder: `SELECT * FROM Orders;`,
    afterCode: ``,
    correctAnswer: ["SELECT * FROM Orders;", "SELECT * FROM Orders", "select * from orders;"],
    hint: "Write SELECT * FROM Orders;",
    previewSnippet: () => `<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px;">Executed ${title}</div>`,
  };
}
