import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

export function LessonContent({ source }: { source: string }) {
  const lines = source.replace(/\r/g, "").split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index++; continue; }
    if (line.startsWith("```")) {
      const code: string[] = [];
      index++;
      while (index < lines.length && !lines[index].trim().startsWith("```")) code.push(lines[index++]);
      if (index < lines.length) index++;
      nodes.push(<pre key={nodes.length}><code>{code.join("\n")}</code></pre>);
      continue;
    }
    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) { nodes.push(<h2 key={nodes.length}>{inline(heading[2])}</h2>); index++; continue; }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) items.push(lines[index++].replace(/^\s*[-*]\s+/, ""));
      nodes.push(<ul key={nodes.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) items.push(lines[index++].replace(/^\s*\d+\.\s+/, ""));
      nodes.push(<ol key={nodes.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ol>);
      continue;
    }
    const paragraph = [line]; index++;
    while (index < lines.length && lines[index].trim() && !/^(#{2,4}\s|```|[-*]\s+|\d+\.\s+)/.test(lines[index].trim())) paragraph.push(lines[index++].trim());
    nodes.push(<p key={nodes.length}>{inline(paragraph.join(" "))}</p>);
  }
  return <div className="lesson-copy">{nodes}</div>;
}
