import React from "react";

/**
 * Dialog — centered modal on a warm scrim. Raised paper surface,
 * serif title. Controlled via `open`; `onClose` fires on scrim click
 * or Escape.
 */
export function Dialog({ open, onClose, title, description, children, footer = null, width = 460 }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "grid", placeItems: "center", padding: "24px",
        background: "rgba(42, 37, 31, 0.34)", backdropFilter: "blur(3px)",
        animation: "ic-fade 0.18s var(--ease-soft)",
      }}
    >
      <style>{`@keyframes ic-fade{from{opacity:0}to{opacity:1}}@keyframes ic-pop{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:none}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width: "100%", maxWidth: width,
          background: "var(--surface-raised)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-lg), var(--inset-line)",
          padding: "24px", animation: "ic-pop 0.22s var(--ease-out)",
        }}
      >
        {title && <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "21px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)" }}>{title}</h3>}
        {description && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-2)", margin: "8px 0 0" }}>{description}</p>}
        {children && <div style={{ marginTop: "16px" }}>{children}</div>}
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "22px" }}>{footer}</div>}
      </div>
    </div>
  );
}
