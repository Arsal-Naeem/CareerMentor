import React, { useMemo } from "react";
import { createEditor, htmlFromJSON } from "prosekit/core";
import { defineExtension } from "./extension";
import "prosekit/basic/style.css";
import "prosekit/basic/typography.css";
import { sanitizeHTML } from "@/utils/helpers";

export default function ProseKitRenderer({ contentString, className = "" }) {
  const editor = useMemo(
    () => createEditor({ extension: defineExtension() }),
    []
  );
  const parsed = JSON.parse(contentString);

  const rawHtml = htmlFromJSON(parsed, editor);

  const cleanHtml = sanitizeHTML(rawHtml);

  return (
    <div
      className={`prose prose-neutral max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
