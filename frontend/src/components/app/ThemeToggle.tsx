"use client";

import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme } from "@/lib/theme";
import { Icons } from "@/components/icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(getStoredTheme() === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next ? "dark" : "light");
  };

  return (
    <div className="theme-toggle" onClick={toggle} role="switch" aria-checked={dark} tabIndex={0}>
      <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        {dark ? <Icons.Sparkle size={15} /> : <Icons.Clock size={15} />}
        {dark ? "Morning mode" : "Evening mode"}
      </span>
      <span className="switch" data-on={dark} />
    </div>
  );
}
