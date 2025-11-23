"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = doc.querySelectorAll("h2, h3");
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      return {
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setHeadings(extractedHeadings);

    // Add IDs to headings in the actual DOM after render
    const addIdsToHeadings = () => {
      const articleHeadings = document.querySelectorAll("article h2, article h3");
      articleHeadings.forEach((heading, index) => {
        if (index < extractedHeadings.length) {
          heading.id = extractedHeadings[index].id;
        }
      });
    };

    // Wait for content to render
    setTimeout(addIdsToHeadings, 100);
    
    // Scroll spy
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (let i = extractedHeadings.length - 1; i >= 0; i--) {
        const element = document.getElementById(extractedHeadings[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(extractedHeadings[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Re-run after a delay to ensure DOM is ready
    setTimeout(handleScroll, 200);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-tedx-red" />
        <h3 className="font-bold text-lg text-tedx-black">Table of Contents</h3>
      </div>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`cursor-pointer block w-full text-left text-sm transition-colors ${
              heading.level === 3 ? "pl-4" : ""
            } ${
              activeId === heading.id
                ? "text-tedx-red font-semibold"
                : "text-gray-600 hover:text-tedx-red"
            }`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </motion.div>
  );
}

