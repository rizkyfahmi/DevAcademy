"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  ArrowLeft, 
  ChevronDown,
  Columns, 
  Rows, 
  Code2,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { TRYIT_LANGUAGES, SQL_MOCK_DATABASE, LanguageOption } from "@/lib/tryit-templates";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { SnippetsModal, SnippetItem } from "./SnippetsModal";
import { LanguageIcon } from "@/components/common/LanguageIcon";
import {
  getLocalSnippets,
  saveLocalSnippets,
} from "@/lib/user-progress-store";

function renderHighlightedCode(rawCode: string, langId: string, theme: "dark" | "light"): React.ReactNode {
  if (!rawCode) return null;

  const isDark = theme === "dark";
  const tagColor = isDark ? "#f59e0b" : "#d97706";
  const bracketColor = isDark ? "#60a5fa" : "#2563eb";
  const doctypeColor = isDark ? "#38bdf8" : "#0284c7";
  const keywordColor = isDark ? "#c084fc" : "#7c3aed";
  const typeColor = isDark ? "#38bdf8" : "#0284c7";
  const attrNameColor = isDark ? "#93c5fd" : "#1d4ed8";
  const stringColor = isDark ? "#4ade80" : "#16a34a";
  const numberColor = isDark ? "#fb923c" : "#ea580c";
  const commentColor = isDark ? "#64748b" : "#94a3b8";
  const phpVarColor = isDark ? "#38bdf8" : "#0284c7";
  const textColor = isDark ? "#f8fafc" : "#0f172a";

  // 1. HTML & Bootstrap
  if (langId === "html" || langId === "bootstrap") {
    const parts = rawCode.split(/(<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[a-zA-Z0-9\-]+(?:[^"'>]|"[^"]*"|'[^']*')*\/?>)/gi);

    return parts.map((part, idx) => {
      if (!part) return null;

      if (part.startsWith("<!--")) {
        return <span key={idx} style={{ color: commentColor, fontStyle: "italic" }}>{part}</span>;
      }

      if (/^<!DOCTYPE/i.test(part)) {
        return <span key={idx} style={{ color: doctypeColor, fontWeight: 700 }}>{part}</span>;
      }

      const tagMatch = part.match(/^(<\/?[a-zA-Z0-9\-]+)([\s\S]*?)(\/?>)$/);
      if (tagMatch) {
        const [, tagOpen, tagAttrs, tagClose] = tagMatch;
        const isClosing = tagOpen.startsWith("</");
        const bracket = isClosing ? "</" : "<";
        const tagName = isClosing ? tagOpen.slice(2) : tagOpen.slice(1);

        const attrNodes: React.ReactNode[] = [];
        if (tagAttrs) {
          const attrParts = tagAttrs.split(/([a-zA-Z0-9\-:]+)(=)("[^"]*"|'[^']*')/g);
          for (let i = 0; i < attrParts.length; i++) {
            const chunk = attrParts[i];
            if (!chunk) continue;
            if (i % 4 === 1) {
              attrNodes.push(<span key={i} style={{ color: attrNameColor }}>{chunk}</span>);
            } else if (i % 4 === 2) {
              attrNodes.push(<span key={i} style={{ color: bracketColor }}>{chunk}</span>);
            } else if (i % 4 === 3) {
              attrNodes.push(<span key={i} style={{ color: stringColor }}>{chunk}</span>);
            } else {
              attrNodes.push(<span key={i} style={{ color: textColor }}>{chunk}</span>);
            }
          }
        }

        return (
          <span key={idx}>
            <span style={{ color: bracketColor }}>{bracket}</span>
            <span style={{ color: tagColor, fontWeight: 650 }}>{tagName}</span>
            {attrNodes}
            <span style={{ color: bracketColor }}>{tagClose}</span>
          </span>
        );
      }

      return <span key={idx} style={{ color: textColor }}>{part}</span>;
    });
  }

  // 2. CSS
  if (langId === "css") {
    const tokens = rawCode.split(/(\/\*[\s\S]*?\*\/|\b[a-zA-Z\-]+(?=\s*:)|:\s*[^;{}]+;|[{}]|"[^"]*"|'[^']*')/g);
    return tokens.map((tok, i) => {
      if (!tok) return null;
      if (tok.startsWith("/*")) {
        return <span key={i} style={{ color: commentColor, fontStyle: "italic" }}>{tok}</span>;
      }
      if (tok === "{" || tok === "}") {
        return <span key={i} style={{ color: bracketColor, fontWeight: 700 }}>{tok}</span>;
      }
      if (/^[a-zA-Z\-]+$/.test(tok)) {
        return <span key={i} style={{ color: attrNameColor }}>{tok}</span>;
      }
      if (tok.startsWith(":")) {
        const val = tok.slice(1).replace(/;$/, "");
        return (
          <span key={i}>
            <span style={{ color: bracketColor }}>:</span>
            <span style={{ color: stringColor }}>{val}</span>
            <span style={{ color: bracketColor }}>;</span>
          </span>
        );
      }
      return <span key={i} style={{ color: tagColor, fontWeight: 600 }}>{tok}</span>;
    });
  }

  // 3. SQL
  if (langId === "sql") {
    const SQL_KEYWORDS = /^(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|ADD|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP|BY|ORDER|ASC|DESC|HAVING|LIMIT|AND|OR|NOT|IN|BETWEEN|LIKE|IS|NULL|COUNT|AVG|SUM|MIN|MAX|DISTINCT|AS)$/i;
    const tokens = rawCode.split(/(--[^\n]*|\/\*[\s\S]*?\*\/|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+\b|[;,*()=<>!+])/g);

    return tokens.map((tok, i) => {
      if (!tok) return null;
      if (tok.startsWith("--") || tok.startsWith("/*")) {
        return <span key={i} style={{ color: commentColor, fontStyle: "italic" }}>{tok}</span>;
      }
      if ((tok.startsWith("'") && tok.endsWith("'")) || (tok.startsWith('"') && tok.endsWith('"'))) {
        return <span key={i} style={{ color: stringColor }}>{tok}</span>;
      }
      if (SQL_KEYWORDS.test(tok)) {
        return <span key={i} style={{ color: keywordColor, fontWeight: 700 }}>{tok.toUpperCase()}</span>;
      }
      if (/^\d+$/.test(tok)) {
        return <span key={i} style={{ color: numberColor }}>{tok}</span>;
      }
      if (/^[;,*()=<>!+]$/.test(tok)) {
        return <span key={i} style={{ color: bracketColor }}>{tok}</span>;
      }
      return <span key={i} style={{ color: textColor }}>{tok}</span>;
    });
  }

  // 4. Python
  if (langId === "python") {
    const PY_KEYWORDS = /^(def|class|return|if|elif|else|for|while|break|continue|import|from|as|in|not|and|or|is|lambda|with|try|except|finally|raise|pass|yield|global|nonlocal|async|await)$/;
    const PY_BUILTINS = /^(print|len|range|str|int|float|bool|list|dict|set|tuple|type|input|open|sum|min|max|sorted|enumerate|zip|True|False|None)$/;

    const tokens = rawCode.split(/(#[^\n]*|"""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?\b|[(){}\[\],:;=<>!+\-*\/%])/g);

    return tokens.map((tok, i) => {
      if (!tok) return null;
      if (tok.startsWith("#")) {
        return <span key={i} style={{ color: commentColor, fontStyle: "italic" }}>{tok}</span>;
      }
      if ((tok.startsWith('"') && tok.endsWith('"')) || (tok.startsWith("'") && tok.endsWith("'"))) {
        return <span key={i} style={{ color: stringColor }}>{tok}</span>;
      }
      if (PY_KEYWORDS.test(tok)) {
        return <span key={i} style={{ color: keywordColor, fontWeight: 700 }}>{tok}</span>;
      }
      if (PY_BUILTINS.test(tok)) {
        return <span key={i} style={{ color: typeColor }}>{tok}</span>;
      }
      if (/^\d+(\.\d+)?$/.test(tok)) {
        return <span key={i} style={{ color: numberColor }}>{tok}</span>;
      }
      if (/^[(){}\[\],:;=<>!+\-*\/%]$/.test(tok)) {
        return <span key={i} style={{ color: bracketColor }}>{tok}</span>;
      }
      return <span key={i} style={{ color: textColor }}>{tok}</span>;
    });
  }

  // 5. JavaScript, TypeScript, PHP, C, C++, C#, Java, Go, Rust
  const GEN_KEYWORDS = /^(function|const|let|var|class|interface|type|enum|struct|return|if|else|for|while|do|switch|case|break|continue|default|import|export|from|as|new|typeof|instanceof|void|async|await|try|catch|finally|throw|public|private|protected|static|override|final|abstract|namespace|using|package|func|fn|pub|mut|impl|trait|echo)$/;
  const GEN_TYPES = /^(int|char|float|double|bool|boolean|string|String|number|any|unknown|never|void|i8|i16|i32|i64|u8|u16|u32|u64|f32|f64|usize|isize|Console|System|vector|cout|cin|endl|printf|fmt)$/;

  const tokens = rawCode.split(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\$[a-zA-Z_][a-zA-Z0-9_]*|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?\b|[(){}\[\],;:=<>!+\-*\/%&|^?])/g);

  return tokens.map((tok, i) => {
    if (!tok) return null;
    if (tok.startsWith("//") || tok.startsWith("/*") || (tok.startsWith("#") && !tok.startsWith("#include") && !tok.startsWith("#define"))) {
      return <span key={i} style={{ color: commentColor, fontStyle: "italic" }}>{tok}</span>;
    }
    if (tok.startsWith("#include") || tok.startsWith("#define")) {
      return <span key={i} style={{ color: doctypeColor, fontWeight: 700 }}>{tok}</span>;
    }
    if ((tok.startsWith('"') && tok.endsWith('"')) || (tok.startsWith("'") && tok.endsWith("'")) || (tok.startsWith("`") && tok.endsWith("`"))) {
      return <span key={i} style={{ color: stringColor }}>{tok}</span>;
    }
    if (tok.startsWith("$")) {
      return <span key={i} style={{ color: phpVarColor }}>{tok}</span>;
    }
    if (GEN_KEYWORDS.test(tok)) {
      return <span key={i} style={{ color: keywordColor, fontWeight: 700 }}>{tok}</span>;
    }
    if (GEN_TYPES.test(tok)) {
      return <span key={i} style={{ color: typeColor }}>{tok}</span>;
    }
    if (/^\d+(\.\d+)?$/.test(tok)) {
      return <span key={i} style={{ color: numberColor }}>{tok}</span>;
    }
    if (/^[(){}\[\],;:=<>!+\-*\/%&|^?]$/.test(tok)) {
      return <span key={i} style={{ color: bracketColor }}>{tok}</span>;
    }
    return <span key={i} style={{ color: textColor }}>{tok}</span>;
  });
}

export function TryitEditorClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read query params
  const paramLang = searchParams.get("lang")?.toLowerCase() || "html";
  const paramCode = searchParams.get("code");
  const paramRef = searchParams.get("ref") || "/dashboard";
  const isExplicitEmpty = searchParams.get("empty") === "true" || (!paramCode && !searchParams.get("lang"));

  // Find initial language
  const matchedLang = TRYIT_LANGUAGES.find(
    (l) => l.id === paramLang || (paramLang === "js" && l.id === "javascript")
  ) || TRYIT_LANGUAGES[0];

  const [currentLang, setCurrentLang] = useState<LanguageOption>(matchedLang);
  const [code, setCode] = useState<string>(() => {
    if (paramCode) {
      try {
        return decodeURIComponent(paramCode);
      } catch {
        return "";
      }
    }
    return matchedLang.defaultCode;
  });

  const { user } = useAuth();
  const { openSignIn } = useAuthModal();
  const [isSaving, setIsSaving] = useState(false);
  const [snippetsModalOpen, setSnippetsModalOpen] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState<SnippetItem[]>([]);
  const [toast, setToast] = useState<{ message: string; isError?: boolean } | null>(null);

  const [activeOutputCode, setActiveOutputCode] = useState<string>(code);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [execDuration, setExecDuration] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [sqlResult, setSqlResult] = useState<{ headers: string[]; rows: any[]; error?: string } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    if (langDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownOpen]);

  // Sync when paramLang changes from external navigation
  useEffect(() => {
    const l = TRYIT_LANGUAGES.find(
      (item) => item.id === paramLang || (paramLang === "js" && item.id === "javascript")
    );
    if (l && l.id !== currentLang.id) {
      setCurrentLang(l);
      if (paramCode) {
        try {
          const dec = decodeURIComponent(paramCode);
          setCode(dec);
          setActiveOutputCode(dec);
        } catch {
          setCode(l.defaultCode);
          setActiveOutputCode(l.defaultCode);
        }
      } else {
        setCode(l.defaultCode);
        setActiveOutputCode(l.defaultCode);
      }
    }
  }, [paramLang, paramCode]);

  // Handle switching language via selector
  const handleLanguageChange = (langId: string) => {
    const target = TRYIT_LANGUAGES.find((l) => l.id === langId);
    if (!target) return;
    setCurrentLang(target);
    setCode(target.defaultCode);
    setActiveOutputCode(target.defaultCode);
    setConsoleLogs([]);
    setSqlResult(null);

    // Update URL query shallowly
    router.replace(`/tryit?lang=${target.id}&ref=${encodeURIComponent(paramRef)}`);
  };

  // Sync line numbers and highlight underlay scroll with textarea
  const handleScroll = () => {
    if (textareaRef.current) {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
      if (highlightRef.current) {
        highlightRef.current.scrollTop = textareaRef.current.scrollTop;
        highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    }
  };

  // Handle Tab and Enter key in editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter or Cmd + Enter to Run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
      return;
    }

    // Tab key inserts 2 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // Restore cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
      return;
    }

    // Auto-indent on Enter
    if (e.key === "Enter") {
      const target = e.currentTarget;
      const start = target.selectionStart;
      const beforeCursor = code.substring(0, start);
      const lastLine = beforeCursor.split("\n").pop() || "";
      const matchIndent = lastLine.match(/^(\s+)/);
      const currentIndent = matchIndent ? matchIndent[1] : "";

      // If line opened a tag like <body> or <head> without closing on same line, add 2 extra spaces
      const openedTag = /<[a-zA-Z0-9\-]+[^>]*>$/.test(lastLine.trim());
      const extraIndent = openedTag ? "  " : "";
      const indentToInsert = currentIndent + extraIndent;

      if (indentToInsert) {
        e.preventDefault();
        const end = target.selectionEnd;
        const insertText = "\n" + indentToInsert;
        const newCode = code.substring(0, start) + insertText + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + insertText.length;
          }
        }, 0);
      }
    }
  };

  // Run Code logic
  const handleRun = () => {
    setIsRunning(true);
    const start = performance.now();

    setActiveOutputCode(code);

    if (currentLang.id === "sql") {
      runSqlQuery(code);
    } else if (currentLang.id === "javascript") {
      runJsCode(code);
    } else if (currentLang.id === "python") {
      runPythonCode(code);
    } else {
      // Compiled or generic backend
      runCompiledCode(code, currentLang.id);
    }

    setTimeout(() => {
      setExecDuration(Math.round(performance.now() - start));
      setIsRunning(false);
    }, 120);
  };

  // SQL Query execution simulation
  const runSqlQuery = (query: string) => {
    try {
      const clean = query.trim().replace(/--.*$/gm, "").trim();
      const lower = clean.toLowerCase();

      // Check table target
      let tableName = "Customers";
      if (lower.includes("from products")) tableName = "Products";
      else if (lower.includes("from orders")) tableName = "Orders";

      const tableData = (SQL_MOCK_DATABASE as any)[tableName] || SQL_MOCK_DATABASE.Customers;

      let resultRows = [...tableData];

      // Simple WHERE filter simulation
      if (lower.includes("where country = 'indonesia'") || lower.includes('where country="indonesia"')) {
        resultRows = resultRows.filter((r) => r.Country === "Indonesia");
      } else if (lower.includes("where country = 'mexico'") || lower.includes("where country='mexico'")) {
        resultRows = resultRows.filter((r) => r.Country === "Mexico");
      } else if (lower.includes("where price > 15000")) {
        resultRows = resultRows.filter((r) => (r.Price || 0) > 15000);
      }

      if (lower.includes("order by customername asc")) {
        resultRows.sort((a, b) => (a.CustomerName || "").localeCompare(b.CustomerName || ""));
      }

      const headers = resultRows.length > 0 ? Object.keys(resultRows[0]) : ["Result"];
      setSqlResult({ headers, rows: resultRows });
    } catch (err: any) {
      setSqlResult({ headers: ["Error"], rows: [], error: err.message || "Syntax error in SQL statement." });
    }
  };

  // JS execution & log capture
  const runJsCode = (userCode: string) => {
    const logs: string[] = [];
    try {
      // Virtual console
      const customConsole = {
        log: (...args: any[]) => {
          logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
        warn: (...args: any[]) => logs.push(`[WARN] ` + args.join(" ")),
        error: (...args: any[]) => logs.push(`[ERROR] ` + args.join(" ")),
      };

      const runner = new Function("console", userCode);
      runner(customConsole);
      setConsoleLogs(logs.length > 0 ? logs : ["Code executed successfully with 0 console logs."]);
    } catch (err: any) {
      setConsoleLogs([`Uncaught ${err.name}: ${err.message}`]);
    }
  };

  // Python execution simulation
  const runPythonCode = (pyCode: string) => {
    const logs: string[] = [];
    const lines = pyCode.split("\n");

    let inLoop = false;
    let loopVar = "";
    let loopList: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) continue;

      // Match print statements: print("Hello " + x) or print(x)
      if (trimmed.startsWith("print(") && trimmed.endsWith(")")) {
        const content = trimmed.substring(6, trimmed.length - 1).trim();

        // Check if inside loop
        if (line.startsWith("    ") && inLoop) {
          loopList.forEach((item) => {
            let evalStr = content.replace(new RegExp(`\\b${loopVar}\\b`, "g"), `"${item}"`);
            try {
              // Try evaluating simple string concats
              evalStr = evalStr.replace(/["']\s*\+\s*["']/g, "");
              evalStr = evalStr.replace(/^["']|["']$/g, "");
              logs.push(evalStr);
            } catch {
              logs.push(item);
            }
          });
          continue;
        }

        // Standard print
        if (content.startsWith('"') || content.startsWith("'")) {
          // Check for string repetition e.g. "-" * 35
          if (content.includes("*")) {
            const parts = content.split("*");
            const char = parts[0].trim().replace(/['"]/g, "");
            const count = parseInt(parts[1].trim(), 10) || 1;
            logs.push(char.repeat(count));
          } else {
            logs.push(content.replace(/^["']|["']$/g, ""));
          }
        } else if (content.includes(",")) {
          // print("Nama:", val)
          const parts = content.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
          logs.push(parts.join(" "));
        } else {
          logs.push(content);
        }
      }

      // Match for loop: for x in fruits:
      const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+(\w+):/);
      if (forMatch) {
        inLoop = true;
        loopVar = forMatch[1];
        // Default fruits sample
        loopList = ["apple", "banana", "cherry"];
      }
    }

    if (logs.length === 0) {
      logs.push("Python script executed successfully.");
      logs.push("Process finished with exit code 0");
    }

    setConsoleLogs(logs);
  };

  // Compiled languages output simulation
  const runCompiledCode = (source: string, langId: string) => {
    const logs: string[] = [];
    logs.push(`[Compiling ${currentLang.name} source code...]`);

    // Simple variable check
    const vars: Record<string, string> = {};
    const varMatches = source.matchAll(/(?:let|const|var|val|String|string)\s+([a-zA-Z0-9_]+)\s*(?::\s*[a-zA-Z0-9_]+)?\s*=\s*["'](.*?)["']/g);
    for (const vm of varMatches) {
      vars[vm[1]] = vm[2];
    }

    // Extract print/cout statements
    const printMatches = source.match(/(?:printf|println!|System\.out\.println|Console\.WriteLine|fmt\.Println|console\.log|echo|cout\s*<<)\s*\((.*?)\)|cout\s*<<\s*"(.*?)"/g);

    if (printMatches) {
      printMatches.forEach((m) => {
        const text = m
          .replace(/^(?:printf|println!|System\.out\.println|Console\.WriteLine|fmt\.Println|console\.log|echo|cout\s*<<)\s*\(/, "")
          .replace(/\);?$/, "")
          .replace(/cout\s*<<\s*/, "")
          .replace(/<<\s*endl;?/, "")
          .replace(/\\n/g, "")
          .replace(/^["']|["']$/g, "")
          .trim();
        if (text) {
          logs.push(vars[text] !== undefined ? vars[text] : text);
        }
      });
    }

    if (logs.length === 1) {
      logs.push(`Program finished running.`);
      logs.push(`Exit code: 0 (Execution successful)`);
    }

    setConsoleLogs(logs);
  };

  // Reset to original default code
  const handleReset = () => {
    setCode(currentLang.defaultCode);
    setActiveOutputCode(currentLang.defaultCode);
    setConsoleLogs([]);
    setSqlResult(null);
  };

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const fetchSavedSnippets = async () => {
    if (!user) return;
    const localList = getLocalSnippets(user.email);
    if (localList.length > 0) {
      setSavedSnippets(localList);
    }
    try {
      const res = await fetch("/api/snippets");
      const data = await res.json();
      if (data.authenticated && Array.isArray(data.snippets)) {
        const map = new Map<string, SnippetItem>();
        for (const s of localList) {
          map.set(s.id, s);
        }
        for (const s of data.snippets) {
          if (!map.has(s.id)) {
            map.set(s.id, s);
          }
        }
        const merged = Array.from(map.values());
        setSavedSnippets(merged);
        if (merged.length !== localList.length) {
          saveLocalSnippets(user.email, merged, user);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch snippets:", err);
    }
  };

  const handleSaveSnippet = async () => {
    if (!user) {
      showToast("Silakan masuk (login) untuk menyimpan kode ke akun Anda", false);
      openSignIn();
      return;
    }

    if (!code.trim()) {
      showToast("Editor masih kosong, ketikkan kode terlebih dahulu", true);
      return;
    }

    setIsSaving(true);
    const dateStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const title = `${currentLang.name} Snippet (${dateStr})`;
    const nowIso = new Date().toISOString();
    const fallbackSnippet: SnippetItem = {
      id: `snip_${Date.now()}`,
      lang: currentLang.id,
      title,
      code,
      created_at: nowIso,
      updated_at: nowIso,
    };

    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: currentLang.id,
          title,
          code,
        }),
      });

      const data = await res.json();
      const savedItem: SnippetItem = res.ok && data?.snippet ? data.snippet : fallbackSnippet;
      const nextList = [savedItem, ...savedSnippets.filter((s) => s.id !== savedItem.id)];
      setSavedSnippets(nextList);
      saveLocalSnippets(user.email, nextList, user);
      showToast("Kode berhasil disimpan ke akun Anda!");
    } catch {
      const nextList = [fallbackSnippet, ...savedSnippets];
      setSavedSnippets(nextList);
      saveLocalSnippets(user.email, nextList, user);
      showToast("Kode berhasil disimpan ke akun Anda!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSnippet = async (id: string) => {
    const nextList = savedSnippets.filter((s) => s.id !== id);
    setSavedSnippets(nextList);
    if (user) {
      saveLocalSnippets(user.email, nextList, user);
    }
    showToast("Snippet berhasil dihapus");
    try {
      await fetch(`/api/snippets?id=${id}`, { method: "DELETE" });
    } catch {
      // already removed from unified store
    }
  };

  const handleSelectSnippet = (snip: SnippetItem) => {
    const targetLang = TRYIT_LANGUAGES.find((l) => l.id === snip.lang) || TRYIT_LANGUAGES[0];
    setCurrentLang(targetLang);
    setCode(snip.code);
    setActiveOutputCode(snip.code);
    showToast(`Memuat snippet: ${snip.title}`);
  };

  // Calculate line numbers
  const lineCount = useMemo(() => {
    return Math.max(code.split("\n").length, 1);
  }, [code]);

  // Construct iframe document for HTML/CSS/Web
  const iframeContent = useMemo(() => {
    if (!activeOutputCode.trim()) {
      return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin: 0;
  color: #64748b;
  text-align: center;
  padding: 20px;
}
.empty-box {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 32px 24px;
  max-width: 440px;
  background: #f8fafc;
}
h3 { margin-top: 0; color: #1e293b; font-size: 17px; }
p { font-size: 13.5px; line-height: 1.5; color: #64748b; margin-bottom: 0; }
</style>
</head>
<body>
  <div class="empty-box">
    <h3>Canvas Editor Kosong</h3>
    <p>Silakan ketik kode ${currentLang.name} di editor sebelah kiri, lalu klik tombol hijau <strong>Run ❯</strong> (atau tekan <strong>Ctrl + Enter</strong>) untuk melihat hasilnya.</p>
  </div>
</body>
</html>`;
    }

    if (currentLang.id === "html" || currentLang.id === "bootstrap") {
      return activeOutputCode;
    }

    if (currentLang.id === "css") {
      return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${activeOutputCode}
</style>
</head>
<body>
  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`;
    }

    if (currentLang.id === "javascript") {
      return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body style="font-family: sans-serif; margin: 0; padding: 20px;">
  <h2>My First JavaScript</h2>
  <p id="demo"></p>
  <div id="output" style="font-family: monospace; white-space: pre-wrap; margin-top: 12px; color: #334155;"></div>
  <script>
    const out = document.getElementById("output");
    const origLog = console.log;
    console.log = function(...args) {
      origLog.apply(console, args);
      if (out) out.textContent += args.join(" ") + "\\n";
    };
    try {
      ${activeOutputCode}
    } catch(err) {
      document.body.innerHTML += '<div style="color: #ef4444; font-family: monospace; padding: 12px; background: #fee2e2; border-radius: 6px; margin-top: 12px;"><strong>Error:</strong> ' + err.message + '</div>';
    }
  </script>
</body>
</html>`;
    }

    if (currentLang.id === "php") {
      let rendered = activeOutputCode;
      rendered = rendered.replace(/<\?php([\s\S]*?)\?>/gi, (_, phpBlock) => {
        const echoes: string[] = [];
        const vars: Record<string, string> = {};
        const lines = phpBlock.split(";");
        for (const line of lines) {
          const s = line.trim();
          if (!s) continue;
          const varMatch = s.match(/^\$([a-zA-Z0-9_]+)\s*=\s*(["'])([\s\S]*?)\2$/);
          if (varMatch) {
            vars[varMatch[1]] = varMatch[3];
            continue;
          }
          const echoMatch = s.match(/^echo\s+([\s\S]*)$/i);
          if (echoMatch) {
            let expr = echoMatch[1].trim();
            Object.keys(vars).forEach((v) => {
              expr = expr.replace(new RegExp(`\\$${v}\\b`, "g"), vars[v]);
            });
            expr = expr.replace(/^["']|["']$/g, "").replace(/\\n/g, "<br>");
            echoes.push(expr);
          }
        }
        return echoes.join("");
      });
      return rendered;
    }

    return "";
  }, [currentLang.id, activeOutputCode]);

  // Initial Run on mount
  useEffect(() => {
    handleRun();
  }, [currentLang.id]);

  const isWebMode = ["html", "css", "bootstrap", "javascript", "php"].includes(currentLang.id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
        color: theme === "dark" ? "#f8fafc" : "#0f172a",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 1. TOP NAVBAR (W3Schools Tryit Editor Style) */}
      <header
        style={{
          height: 54,
          backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
          borderBottom: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          gap: 12,
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        {/* Left Side: Back Button & Language Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href={paramRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 12px",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: theme === "dark" ? "#f8fafc" : "#1e293b",
              border: theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 650,
              transition: "all 0.15s ease",
            }}
            title="Kembali ke halaman materi tutorial sebelumnya"
          >
            <ArrowLeft style={{ width: 14, height: 14, color: theme === "dark" ? "#94a3b8" : "#64748b" }} />
            <span>Kembali ke Materi</span>
          </Link>

          <div ref={langDropdownRef} style={{ position: "relative", display: "inline-block" }}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 6,
                backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
                color: theme === "dark" ? "#f8fafc" : "#0f172a",
                border: theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                transition: "all 0.15s ease",
              }}
              title="Pilih bahasa pemrograman"
            >
              <LanguageIcon lang={currentLang.id} size={18} />
              <span>{currentLang.name}</span>
              <ChevronDown
                style={{
                  width: 14,
                  height: 14,
                  color: theme === "dark" ? "#94a3b8" : "#64748b",
                  transform: langDropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.15s ease",
                }}
              />
            </button>

            {langDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  zIndex: 100,
                  width: 240,
                  maxHeight: 380,
                  overflowY: "auto",
                  backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                  border: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
                  borderRadius: 8,
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2)",
                  padding: "6px",
                }}
              >
                {/* Web & Frontend */}
                <div
                  style={{
                    padding: "6px 10px 4px",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: theme === "dark" ? "#94a3b8" : "#64748b",
                  }}
                >
                  Web & Frontend
                </div>
                {TRYIT_LANGUAGES.filter((l) => l.category === "web").map((l) => {
                  const isSelected = l.id === currentLang.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        handleLanguageChange(l.id);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: isSelected
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#e2e8f0"
                          : "transparent",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                        fontSize: 13,
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.12s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            theme === "dark" ? "#1e293b" : "#f1f5f9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <LanguageIcon lang={l.id} size={18} />
                      <span style={{ flex: 1 }}>{l.name}</span>
                      {isSelected && <Check style={{ width: 14, height: 14, color: "#04aa6d" }} />}
                    </button>
                  );
                })}

                {/* Backend Programming */}
                <div
                  style={{
                    padding: "10px 10px 4px",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: theme === "dark" ? "#94a3b8" : "#64748b",
                    borderTop: theme === "dark" ? "1px solid #1e293b" : "1px solid #f1f5f9",
                    marginTop: 4,
                  }}
                >
                  Backend Programming
                </div>
                {TRYIT_LANGUAGES.filter((l) => l.category === "backend").map((l) => {
                  const isSelected = l.id === currentLang.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        handleLanguageChange(l.id);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: isSelected
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#e2e8f0"
                          : "transparent",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                        fontSize: 13,
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.12s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            theme === "dark" ? "#1e293b" : "#f1f5f9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <LanguageIcon lang={l.id} size={18} />
                      <span style={{ flex: 1 }}>{l.name}</span>
                      {isSelected && <Check style={{ width: 14, height: 14, color: "#04aa6d" }} />}
                    </button>
                  );
                })}

                {/* Database */}
                <div
                  style={{
                    padding: "10px 10px 4px",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: theme === "dark" ? "#94a3b8" : "#64748b",
                    borderTop: theme === "dark" ? "1px solid #1e293b" : "1px solid #f1f5f9",
                    marginTop: 4,
                  }}
                >
                  Database
                </div>
                {TRYIT_LANGUAGES.filter((l) => l.category === "database").map((l) => {
                  const isSelected = l.id === currentLang.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        handleLanguageChange(l.id);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: isSelected
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#e2e8f0"
                          : "transparent",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                        fontSize: 13,
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.12s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            theme === "dark" ? "#1e293b" : "#f1f5f9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <LanguageIcon lang={l.id} size={18} />
                      <span style={{ flex: 1 }}>{l.name}</span>
                      {isSelected && <Check style={{ width: 14, height: 14, color: "#04aa6d" }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Run Button & Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* RUN BUTTON (Prominent W3Schools Green) */}
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 18px",
              borderRadius: 6,
              backgroundColor: isRunning ? "#038d5a" : "#04aa6d",
              color: "#ffffff",
              border: "none",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(4, 170, 109, 0.3)",
              transition: "all 0.15s ease",
            }}
            title="Jalankan Kode (Ctrl + Enter)"
          >
            <Play style={{ width: 14, height: 14, fill: "#ffffff" }} />
            <span>{isRunning ? "Running..." : "Run ❯"}</span>
          </button>

          {/* Load Sample Template */}
          <button
            type="button"
            onClick={() => {
              setCode(currentLang.defaultCode);
              setActiveOutputCode(currentLang.defaultCode);
              setConsoleLogs([]);
              setSqlResult(null);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 11px",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: theme === "dark" ? "#38bdf8" : "#0284c7",
              border: theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1",
              fontSize: 12.5,
              fontWeight: 650,
              cursor: "pointer",
            }}
            title="Muat kode contoh template untuk bahasa ini"
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            <span>Contoh</span>
          </button>

          {/* Reset / Kosongkan */}
          <button
            type="button"
            onClick={() => {
              setCode("");
              setActiveOutputCode("");
              setConsoleLogs([]);
              setSqlResult(null);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 11px",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: theme === "dark" ? "#94a3b8" : "#64748b",
              border: theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1",
              fontSize: 12.5,
              fontWeight: 650,
              cursor: "pointer",
            }}
            title="Kosongkan editor"
          >
            <RotateCcw style={{ width: 14, height: 14 }} />
            <span>Kosongkan</span>
          </button>

          {/* Copy Code */}
          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 11px",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: copied ? "#04aa6d" : theme === "dark" ? "#94a3b8" : "#64748b",
              border: theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1",
              fontSize: 12.5,
              fontWeight: 650,
              cursor: "pointer",
            }}
            title="Salin kode ke clipboard"
          >
            {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
            <span style={{ display: "none" }} className="w3-hide-mobile">{copied ? "Copied" : "Copy"}</span>
          </button>



          {/* Orientation Toggle */}
          <button
            type="button"
            onClick={() => setOrientation(orientation === "horizontal" ? "vertical" : "horizontal")}
            style={{
              padding: "7px 9px",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: theme === "dark" ? "#94a3b8" : "#64748b",
              border: theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={orientation === "horizontal" ? "Ganti ke tampilan vertikal" : "Ganti ke tampilan horizontal"}
          >
            {orientation === "horizontal" ? (
              <Rows style={{ width: 14, height: 14 }} />
            ) : (
              <Columns style={{ width: 14, height: 14 }} />
            )}
          </button>
        </div>
      </header>

      {/* 2. SPLIT WORKSPACE: EDITOR & RESULT PANE */}
      <div
        style={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* === LEFT / TOP PANE: CODE EDITOR === */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: orientation === "horizontal" ? (theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1") : "none",
            borderBottom: orientation === "vertical" ? (theme === "dark" ? "1px solid #334155" : "1px solid #cbd5e1") : "none",
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* Editor Header Tab */}
          <div
            style={{
              height: 36,
              backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
              borderBottom: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
              fontSize: 12,
              fontWeight: 700,
              color: theme === "dark" ? "#94a3b8" : "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Code2 style={{ width: 15, height: 15, color: "#04aa6d" }} />
              <span style={{ color: theme === "dark" ? "#f8fafc" : "#0f172a" }}>
                {currentLang.ext}
              </span>
              <span
                style={{
                  fontSize: 10,
                  backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontWeight: 650,
                }}
              >
                {currentLang.name}
              </span>
            </div>
          </div>

          {/* Editor Body: Line numbers + Textarea */}
          <div
            style={{
              display: "flex",
              flex: 1,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Line Numbers Column */}
            <div
              ref={lineNumbersRef}
              style={{
                width: 48,
                padding: "16px 8px 16px 0",
                textAlign: "right",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 13.5,
                lineHeight: "22px",
                color: theme === "dark" ? "#475569" : "#94a3b8",
                backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
                userSelect: "none",
                overflow: "hidden",
                borderRight: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
              }}
            >
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Input Area with Syntax Highlight Overlay */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              {/* Highlighted Underlay */}
              <pre
                ref={highlightRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: 0,
                  padding: "16px",
                  border: "none",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 13.5,
                  lineHeight: "22px",
                  whiteSpace: "pre",
                  overflowWrap: "normal",
                  overflow: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                  tabSize: 2,
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                }}
              >
                <code>{renderHighlightedCode(code, currentLang.id, theme)}</code>
              </pre>

              {/* Textarea Overlay */}
              <textarea
                ref={textareaRef}
                className="w3-tryit-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                placeholder={`// Editor kosong (${currentLang.name})\n// Ketik kode Anda di sini, lalu klik tombol hijau "Run ❯" (atau tekan Ctrl+Enter).\n// Atau klik tombol "Contoh" di toolbar atas untuk memuat template kode.`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  padding: "16px",
                  margin: 0,
                  border: "none",
                  outline: "none",
                  resize: "none",
                  backgroundColor: "transparent",
                  color: "transparent",
                  caretColor: theme === "dark" ? "#38bdf8" : "#0284c7",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 13.5,
                  lineHeight: "22px",
                  whiteSpace: "pre",
                  overflowWrap: "normal",
                  overflow: "auto",
                  tabSize: 2,
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </div>

        {/* === RIGHT / BOTTOM PANE: RESULT / OUTPUT WINDOW === */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* Result Header */}
          <div
            style={{
              height: 36,
              backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
              borderBottom: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
              fontSize: 12,
              fontWeight: 700,
              color: theme === "dark" ? "#94a3b8" : "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: theme === "dark" ? "#f8fafc" : "#0f172a", fontWeight: 700, fontSize: 13 }}>
                Live Preview
              </span>
            </div>


          </div>

          {/* Result Display Area */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            
            {/* 1. WEB MODE (HTML / CSS / Bootstrap / JS Live Iframe) */}
            {isWebMode && (
              <iframe
                title="Preview"
                srcDoc={iframeContent}
                sandbox="allow-scripts allow-modals allow-forms"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  backgroundColor: "#ffffff",
                }}
              />
            )}

            {/* 2. SQL TABLE MODE */}
            {currentLang.id === "sql" && (
              <div
                style={{
                  flex: 1,
                  padding: 18,
                  overflowY: "auto",
                  backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc",
                }}
              >
                {sqlResult?.error ? (
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 6,
                      backgroundColor: "#fee2e2",
                      color: "#b91c1c",
                      fontSize: 13,
                      fontFamily: "monospace",
                    }}
                  >
                    {sqlResult.error}
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        marginBottom: 12,
                        fontSize: 12.5,
                        color: theme === "dark" ? "#94a3b8" : "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Menampilkan {sqlResult?.rows.length || 0} baris data:
                    </div>

                    <div
                      style={{
                        overflowX: "auto",
                        borderRadius: 8,
                        border: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
                        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                      }}
                    >
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr
                            style={{
                              backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
                              textAlign: "left",
                              borderBottom: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
                            }}
                          >
                            {sqlResult?.headers.map((h) => (
                              <th key={h} style={{ padding: "10px 14px", fontWeight: 700 }}>
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sqlResult?.rows.map((row, idx) => (
                            <tr
                              key={idx}
                              style={{
                                borderBottom: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
                                backgroundColor:
                                  idx % 2 === 0
                                    ? "transparent"
                                    : theme === "dark"
                                    ? "rgba(255,255,255,0.02)"
                                    : "#fafafa",
                              }}
                            >
                              {sqlResult.headers.map((h) => (
                                <td key={h} style={{ padding: "9px 14px" }}>
                                  {row[h] !== undefined ? String(row[h]) : ""}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. TERMINAL / CONSOLE MODE (Python, Java, C, C++, C#, PHP, Go, Rust, TS) */}
            {!isWebMode && currentLang.id !== "sql" && (
              <div
                style={{
                  flex: 1,
                  padding: 18,
                  backgroundColor: "#090d16",
                  color: "#4ade80",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 13.5,
                  lineHeight: "22px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                <div style={{ color: "#64748b", marginBottom: 12, fontSize: 11 }}>
                  # DevAcademy {currentLang.name} Interactive Execution Environment
                  <br />
                  $ {currentLang.id === "python" ? "python3" : currentLang.id} {currentLang.ext}
                </div>

                {consoleLogs.map((log, i) => (
                  <div key={i} style={{ marginBottom: 2 }}>
                    {log}
                  </div>
                ))}

                <div style={{ marginTop: 14, color: "#64748b", fontSize: 11 }}>
                  &gt; Program exited successfully.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            backgroundColor: toast.isError ? "#ef4444" : "#04aa6d",
            color: "#ffffff",
            padding: "10px 18px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            animation: "w3FadeIn 0.2s ease-out",
          }}
        >
          {toast.isError ? <AlertCircle style={{ width: 16, height: 16 }} /> : <Check style={{ width: 16, height: 16 }} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Snippets Collection Modal */}
      <SnippetsModal
        isOpen={snippetsModalOpen}
        onClose={() => setSnippetsModalOpen(false)}
        snippets={savedSnippets}
        onSelectSnippet={handleSelectSnippet}
        onDeleteSnippet={handleDeleteSnippet}
        theme={theme}
      />
    </div>
  );
}
