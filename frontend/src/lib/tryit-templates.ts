export interface LanguageOption {
  id: string;
  name: string;
  ext: string;
  category: "web" | "backend" | "database" | "other";
  icon: string;
  defaultCode: string;
}

export const TRYIT_LANGUAGES: LanguageOption[] = [
  {
    id: "html",
    name: "HTML",
    ext: "index.html",
    category: "web",
    icon: "🌐",
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>

    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>

  </body>
</html>`,
  },
  {
    id: "css",
    name: "CSS",
    ext: "style.css",
    category: "web",
    icon: "🎨",
    defaultCode: `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    ext: "script.js",
    category: "web",
    icon: "⚡",
    defaultCode: `document.getElementById("demo").innerHTML = "Hello JavaScript!";`,
  },
  {
    id: "python",
    name: "Python",
    ext: "main.py",
    category: "backend",
    icon: "🐍",
    defaultCode: `print("Hello, World!")`,
  },
  {
    id: "sql",
    name: "SQL",
    ext: "query.sql",
    category: "database",
    icon: "🗄️",
    defaultCode: `SELECT * FROM Customers;`,
  },
  {
    id: "java",
    name: "Java",
    ext: "Main.java",
    category: "backend",
    icon: "☕",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    id: "c",
    name: "C",
    ext: "main.c",
    category: "backend",
    icon: "⚙️",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  {
    id: "cpp",
    name: "C++",
    ext: "main.cpp",
    category: "backend",
    icon: "🚀",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    id: "csharp",
    name: "C#",
    ext: "Program.cs",
    category: "backend",
    icon: "🟣",
    defaultCode: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  },
  {
    id: "php",
    name: "PHP",
    ext: "index.php",
    category: "backend",
    icon: "🐘",
    defaultCode: `<!DOCTYPE html>
<html>
<body>

<?php
echo "Hello, World!";
?>

</body>
</html>`,
  },
  {
    id: "go",
    name: "Go",
    ext: "main.go",
    category: "backend",
    icon: "🐹",
    defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  },
  {
    id: "rust",
    name: "Rust",
    ext: "main.rs",
    category: "backend",
    icon: "🦀",
    defaultCode: `fn main() {
    println!("Hello, World!");
}`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    ext: "index.ts",
    category: "web",
    icon: "📘",
    defaultCode: `let message: string = "Hello, World!";
console.log(message);`,
  },
  {
    id: "bootstrap",
    name: "Bootstrap 5",
    ext: "bootstrap.html",
    category: "web",
    icon: "🅱️",
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootstrap 5</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

  <div class="container mt-5">
    <h1>My First Bootstrap Page</h1>
    <p>This is some text.</p>
  </div>

</body>
</html>`,
  },
];

// Sample database for SQL runner
export const SQL_MOCK_DATABASE = {
  Customers: [
    { CustomerID: 1, CustomerName: "Alfreds Futterkiste", ContactName: "Maria Anders", City: "Berlin", Country: "Germany" },
    { CustomerID: 2, CustomerName: "Ana Trujillo Emparedados", ContactName: "Ana Trujillo", City: "México D.F.", Country: "Mexico" },
    { CustomerID: 3, CustomerName: "Antonio Moreno Taquería", ContactName: "Antonio Moreno", City: "México D.F.", Country: "Mexico" },
    { CustomerID: 4, CustomerName: "Nusantara Digital Tech", ContactName: "Rizky Fahmi", City: "Jakarta", Country: "Indonesia" },
    { CustomerID: 5, CustomerName: "Bandung Creative Lab", ContactName: "Siti Rahma", City: "Bandung", Country: "Indonesia" },
    { CustomerID: 6, CustomerName: "Surabaya Data Solusi", ContactName: "Budi Santoso", City: "Surabaya", Country: "Indonesia" },
    { CustomerID: 7, CustomerName: "Around the Horn", ContactName: "Thomas Hardy", City: "London", Country: "UK" },
    { CustomerID: 8, CustomerName: "Berglunds snabbköp", ContactName: "Christina Berglund", City: "Luleå", Country: "Sweden" },
  ],
  Products: [
    { ProductID: 1, ProductName: "Chai Tea", Category: "Beverages", Price: 18000, Unit: "10 boxes x 20 bags" },
    { ProductID: 2, ProductName: "Chang Beer", Category: "Beverages", Price: 19000, Unit: "24 - 12 oz bottles" },
    { ProductID: 3, ProductName: "Aniseed Syrup", Category: "Condiments", Price: 10000, Unit: "12 - 550 ml bottles" },
    { ProductID: 4, ProductName: "Chef Anton Cajun Seasoning", Category: "Condiments", Price: 22000, Unit: "48 - 6 oz jars" },
    { ProductID: 5, ProductName: "Kopi Luwak Premium", Category: "Beverages", Price: 120000, Unit: "500 gram bag" },
    { ProductID: 6, ProductName: "Indomie Goreng Box", Category: "Food", Price: 115000, Unit: "40 packs x 85g" },
  ],
  Orders: [
    { OrderID: 10248, CustomerID: 4, OrderDate: "2026-07-04", Amount: 350000, Status: "Shipped" },
    { OrderID: 10249, CustomerID: 5, OrderDate: "2026-07-05", Amount: 780000, Status: "Delivered" },
    { OrderID: 10250, CustomerID: 1, OrderDate: "2026-07-08", Amount: 240000, Status: "Processing" },
    { OrderID: 10251, CustomerID: 6, OrderDate: "2026-07-09", Amount: 510000, Status: "Delivered" },
  ],
};
