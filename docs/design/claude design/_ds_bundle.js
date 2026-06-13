/* @ds-bundle: {"format":3,"namespace":"InterviewCopilotDesignSystem_d59c8c","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Meter","sourcePath":"components/feedback/Meter.jsx"},{"name":"ReadinessRing","sourcePath":"components/feedback/ReadinessRing.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"a0a4baff7882","components/core/Badge.jsx":"d16100a3290d","components/core/Button.jsx":"40e29b5ed6b3","components/core/Card.jsx":"5e3e5e60e3bd","components/core/IconButton.jsx":"00abc3b78334","components/core/Tag.jsx":"e2fa92b00d34","components/feedback/EmptyState.jsx":"fa8e95cfb2c1","components/feedback/Meter.jsx":"6cebdaebf55f","components/feedback/ReadinessRing.jsx":"e742021b491b","components/feedback/Skeleton.jsx":"c94a30f6738e","components/feedback/Spinner.jsx":"10c24864cff0","components/forms/Checkbox.jsx":"ce78c4cd2974","components/forms/Input.jsx":"2eaa97ee2438","components/forms/Select.jsx":"3aae3b9ace23","components/forms/Switch.jsx":"8e3a20cf107b","components/forms/Textarea.jsx":"f953006701f0","components/navigation/NavItem.jsx":"3e14aee4668c","components/navigation/Tabs.jsx":"31042d2b9a52","components/overlay/Dialog.jsx":"70b9dbb5ce4a","components/overlay/Toast.jsx":"405b6a4b1978","ui_kits/app/AppShell.jsx":"8e5273e55761","ui_kits/app/Chat.jsx":"8121efe5c569","ui_kits/app/Dashboard.jsx":"3ef401b8ab7c","ui_kits/app/Icons.jsx":"1b55a544854b","ui_kits/app/JobAnalysis.jsx":"b849d3653f6c","ui_kits/app/ResumeAnalysis.jsx":"5e90c591ac4e","ui_kits/app/app.jsx":"e4af915d3ddf","ui_kits/marketing/Landing.jsx":"afe6ad6e1238","ui_kits/marketing/Login.jsx":"0c9ee8e58011"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.InterviewCopilotDesignSystem_d59c8c = window.InterviewCopilotDesignSystem_d59c8c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
/**
 * Avatar — initials on a warm clay ground, or an image.
 * Serif initials echo the brand mark.
 */
function Avatar({
  name = "",
  src = null,
  size = 36,
  style = {}
}) {
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      flexShrink: 0,
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      background: src ? "var(--surface)" : "linear-gradient(160deg, var(--accent), var(--accent-deep))",
      color: "var(--text-on-accent)",
      fontFamily: "var(--font-serif)",
      fontWeight: 500,
      fontSize: size * 0.4,
      boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.2)",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — a small status pill for state on cards & list rows.
 * tone maps to the warm status palette; "outline" is the quiet default.
 */
function Badge({
  children,
  tone = "outline",
  icon = null,
  style = {}
}) {
  const tones = {
    outline: {
      color: "var(--text-3)",
      background: "transparent",
      border: "1px solid var(--border)"
    },
    accent: {
      color: "var(--accent)",
      background: "var(--accent-softer)",
      border: "1px solid var(--accent-ring)"
    },
    success: {
      color: "var(--success)",
      background: "var(--success-soft)",
      border: "1px solid transparent"
    },
    warning: {
      color: "var(--warning)",
      background: "var(--warning-soft)",
      border: "1px solid transparent"
    },
    danger: {
      color: "var(--danger)",
      background: "var(--danger-soft)",
      border: "1px solid transparent"
    },
    info: {
      color: "var(--info)",
      background: "var(--info-soft)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontFamily: "var(--font-sans)",
      fontSize: "10.5px",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      padding: "3px 9px",
      borderRadius: "var(--radius-pill)",
      ...tones[tone],
      ...style
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the primary action control.
 * Warm, tactile: primary uses the clay gradient with a top inset
 * highlight; it lifts on hover and presses down on click.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "7px 13px",
      fontSize: "12.5px",
      radius: "var(--radius-sm)",
      gap: "6px"
    },
    md: {
      padding: "9px 18px",
      fontSize: "13.5px",
      radius: "var(--radius-md)",
      gap: "8px"
    },
    lg: {
      padding: "11px 22px",
      fontSize: "14.5px",
      radius: "var(--radius-md)",
      gap: "9px"
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semi)",
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
    whiteSpace: "nowrap",
    userSelect: "none"
  };
  const variants = {
    primary: {
      background: "linear-gradient(180deg, var(--accent), var(--accent-deep))",
      color: "var(--text-on-accent)",
      boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.2)"
    },
    secondary: {
      background: "var(--surface-raised)",
      color: "var(--text)",
      borderColor: "var(--border-strong)",
      boxShadow: "var(--shadow-xs)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-2)",
      borderColor: "var(--border-strong)"
    },
    subtle: {
      background: "var(--accent-soft)",
      color: "var(--accent-deep)",
      borderColor: "var(--accent-ring)"
    },
    danger: {
      background: "var(--danger)",
      color: "#FBFAF7",
      boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.15)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverStyle = hover && !disabled ? variant === "primary" ? {
    boxShadow: "var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.2)",
    transform: "translateY(-1px)"
  } : variant === "ghost" ? {
    background: "var(--hover)",
    color: "var(--text)"
  } : variant === "secondary" ? {
    borderColor: "var(--border-strong)",
    boxShadow: "var(--shadow-sm)"
  } : {
    filter: "brightness(0.97)"
  } : {};
  const activeStyle = active && !disabled ? {
    transform: "translateY(1px) scale(0.99)"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      ...activeStyle,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the foundational raised surface. Optional hover-lift for
 * interactive cards. Composes everything: stat tiles, topic cards,
 * panels. Pads by default; set padded={false} for list panels.
 */
function Card({
  children,
  interactive = false,
  padded = true,
  as = "div",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: hover ? "var(--surface-raised)" : "var(--surface)",
      border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"),
      borderRadius: "var(--radius-xl)",
      boxShadow: hover ? "var(--shadow-md), var(--inset-line)" : "var(--shadow-sm), var(--inset-line)",
      padding: padded ? "var(--space-5)" : 0,
      transform: hover ? "translateY(-3px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — a square, quiet control for a single glyph
 * (close, more, theme toggle). Pass an SVG/icon as children.
 */
function IconButton({
  children,
  size = "md",
  variant = "ghost",
  label,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 28,
    md: 34,
    lg: 40
  }[size] || 34;
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: {
      background: hover ? "var(--hover)" : "transparent",
      color: hover ? "var(--text)" : "var(--text-2)",
      border: "1px solid transparent"
    },
    outline: {
      background: hover ? "var(--hover)" : "var(--surface)",
      color: "var(--text-2)",
      border: "1px solid var(--border)"
    },
    soft: {
      background: "var(--accent-soft)",
      color: "var(--accent-deep)",
      border: "1px solid var(--accent-ring)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dims,
      height: dims,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Tag — a soft, mixed-case chip for skills, categories, filters.
 * Lower-key than Badge: not uppercase, optional removable affordance.
 */
function Tag({
  children,
  tone = "neutral",
  removable = false,
  onRemove,
  style = {}
}) {
  const tones = {
    neutral: {
      color: "var(--text-2)",
      background: "var(--surface)",
      border: "1px solid var(--border)"
    },
    accent: {
      color: "var(--accent-deep)",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-ring)"
    },
    matched: {
      color: "var(--success)",
      background: "var(--success-soft)",
      border: "1px solid transparent"
    },
    gap: {
      color: "var(--danger)",
      background: "var(--danger-soft)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-sans)",
      fontSize: "12px",
      fontWeight: "var(--weight-medium)",
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      ...tones[tone],
      ...style
    }
  }, children, removable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      padding: 0,
      display: "grid",
      placeItems: "center",
      color: "currentColor",
      opacity: 0.6,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/**
 * EmptyState — calm, editorial blank slate. A serif headline, a line
 * of guidance, an optional action. Used before the first resume / JD /
 * plan exists.
 */
function EmptyState({
  icon = null,
  title,
  description,
  action = null,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "48px 32px",
      gap: "6px",
      maxWidth: "420px",
      margin: "0 auto",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "52px",
      height: "52px",
      borderRadius: "var(--radius-lg)",
      display: "grid",
      placeItems: "center",
      marginBottom: "8px",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-ring)",
      color: "var(--accent)"
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "19px",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      color: "var(--text)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      lineHeight: 1.55,
      color: "var(--text-2)",
      margin: "2px 0 10px",
      maxWidth: "40ch"
    }
  }, description), action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Meter.jsx
try { (() => {
/**
 * Meter — the slim progress bar used everywhere (plans, tracks,
 * skill match). Clay gradient fill on a warm track.
 */
function Meter({
  value = 0,
  max = 100,
  height = 5,
  tone = "accent",
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    accent: "linear-gradient(90deg, var(--accent), var(--accent-deep))",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: "var(--radius-pill)",
      background: "var(--track)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      borderRadius: "var(--radius-pill)",
      background: fills[tone] || fills.accent,
      transition: "width 0.6s var(--ease-out)"
    }
  }));
}
Object.assign(__ds_scope, { Meter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Meter.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ReadinessRing.jsx
try { (() => {
/**
 * ReadinessRing — the signature circular progress used for the
 * candidate's readiness score. Animates the stroke on mount.
 */
function ReadinessRing({
  value = 0,
  size = 130,
  stroke = 9,
  label = "Readiness",
  caption = null,
  style = {}
}) {
  const r = (size - stroke) / 2 - 2;
  const C = 2 * Math.PI * r;
  const [offset, setOffset] = React.useState(C);
  React.useEffect(() => {
    const t = setTimeout(() => setOffset(C * (1 - Math.max(0, Math.min(100, value)) / 100)), 150);
    return () => clearTimeout(t);
  }, [value, C]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--track)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: C,
    strokeDashoffset: offset,
    style: {
      transition: "stroke-dashoffset 1s var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: size * 0.23,
      fontWeight: 500,
      letterSpacing: "-0.02em",
      color: "var(--text)"
    }
  }, value, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10.5px",
      color: "var(--text-3)",
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      marginTop: "1px"
    }
  }, label))), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12.5px",
      color: "var(--text-2)",
      textAlign: "center"
    }
  }, caption));
}
Object.assign(__ds_scope, { ReadinessRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ReadinessRing.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
/**
 * Skeleton — shimmering placeholder block for loading states while
 * AI work (parsing, analysis, generation) is in flight.
 */
function Skeleton({
  width = "100%",
  height = 14,
  radius = "var(--radius-sm)",
  style = {}
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `@keyframes ic-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: radius,
      background: "linear-gradient(90deg, var(--track) 25%, var(--hover) 37%, var(--track) 63%)",
      backgroundSize: "200% 100%",
      animation: "ic-shimmer 1.4s var(--ease-soft) infinite",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
/**
 * Spinner — quiet circular loading indicator in the accent color.
 */
function Spinner({
  size = 18,
  stroke = 2.2,
  style = {}
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `@keyframes ic-spin{to{transform:rotate(360deg)}}`), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      animation: "ic-spin 0.7s linear infinite",
      ...style
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "var(--track)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 0-9-9",
    stroke: "var(--accent)",
    strokeWidth: stroke,
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox — square check with a clay fill when on. Pairs a label.
 */
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const inputId = id || "cb-" + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "18px",
      flexShrink: 0,
      borderRadius: "var(--radius-xs)",
      display: "grid",
      placeItems: "center",
      background: checked ? "var(--accent)" : "var(--surface-raised)",
      border: "1px solid " + (checked ? "var(--accent)" : "var(--border-strong)"),
      boxShadow: checked ? "none" : "var(--shadow-xs)",
      transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-on-accent)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 13l4 4L19 7"
  }))), /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      color: "var(--text)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field with optional label, leading icon,
 * hint and error. Calm by default; clay focus ring on focus.
 */
function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || "in-" + Math.random().toString(36).slice(2, 8);
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "12.5px",
      fontWeight: "var(--weight-semi)",
      color: "var(--text)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "12px",
      display: "grid",
      placeItems: "center",
      color: "var(--text-3)",
      pointerEvents: "none"
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      color: "var(--text)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-raised)",
      border: "1px solid " + borderColor,
      borderRadius: "var(--radius-md)",
      padding: icon ? "9px 13px 9px 36px" : "9px 13px",
      outline: "none",
      boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "11.5px",
      color: error ? "var(--danger)" : "var(--text-3)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — styled native dropdown with a custom chevron, matching
 * the Input look. Keeps native a11y/keyboard behavior.
 */
function Select({
  label,
  hint,
  id,
  value,
  onChange,
  children,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || "sel-" + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "12.5px",
      fontWeight: "var(--weight-semi)",
      color: "var(--text)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: inputId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      appearance: "none",
      WebkitAppearance: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      color: "var(--text)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-raised)",
      border: "1px solid " + (focus ? "var(--accent)" : "var(--border-strong)"),
      borderRadius: "var(--radius-md)",
      padding: "9px 36px 9px 13px",
      outline: "none",
      cursor: "pointer",
      boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "12px",
      pointerEvents: "none",
      color: "var(--text-3)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  })))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "11.5px",
      color: "var(--text-3)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Switch — the pill toggle used for theme & settings. Clay track when on.
 */
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const inputId = id || "sw-" + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "13px",
      color: "var(--text-2)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: "34px",
      height: "19px",
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      position: "relative",
      background: checked ? "var(--accent)" : "var(--track)",
      border: "1px solid " + (checked ? "var(--accent)" : "var(--border-strong)"),
      transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "1.5px",
      left: "2px",
      width: "13px",
      height: "13px",
      borderRadius: "50%",
      background: "var(--surface-raised)",
      boxShadow: "0 1px 2px rgba(var(--shadow-color), 0.25)",
      transform: checked ? "translateX(14px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: checked,
    onChange: e => onChange && onChange(e.target.checked),
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — multi-line field. Used for JD paste, notes, STAR answers.
 */
function Textarea({
  label,
  hint,
  error,
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || "ta-" + Math.random().toString(36).slice(2, 8);
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "12.5px",
      fontWeight: "var(--weight-semi)",
      color: "var(--text)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      lineHeight: 1.55,
      color: "var(--text)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-raised)",
      border: "1px solid " + borderColor,
      borderRadius: "var(--radius-md)",
      padding: "11px 13px",
      outline: "none",
      resize: "vertical",
      boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "11.5px",
      color: error ? "var(--danger)" : "var(--text-3)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
/**
 * NavItem — a sidebar row. Active state raises the surface, shows a
 * clay edge marker, and tints the icon. Optional trailing count.
 */
function NavItem({
  icon = null,
  children,
  active = false,
  count = null,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      padding: "8px 12px",
      borderRadius: "var(--radius-sm)",
      position: "relative",
      cursor: "pointer",
      userSelect: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      fontWeight: active ? "var(--weight-semi)" : "var(--weight-book)",
      color: active || hover ? "var(--text)" : "var(--text-2)",
      background: active ? "var(--surface-raised)" : hover ? "var(--hover)" : "transparent",
      border: "1px solid " + (active ? "var(--border)" : "transparent"),
      boxShadow: active ? "var(--shadow-xs)" : "none",
      transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "-17px",
      top: "7px",
      bottom: "7px",
      width: "3px",
      borderRadius: "0 3px 3px 0",
      background: "var(--accent)"
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      color: active ? "var(--accent)" : "currentColor",
      opacity: active || hover ? 1 : 0.8,
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      fontWeight: 500,
      color: active ? "var(--accent)" : "var(--text-3)",
      background: active ? "var(--accent-soft)" : "var(--accent-softer)",
      border: "1px solid " + (active ? "transparent" : "var(--border)"),
      padding: "1px 7px",
      borderRadius: "var(--radius-pill)"
    }
  }, count));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Tabs — underline-style segmented navigation. Controlled via `value`.
 * items: [{ id, label, count? }]. The active tab shows a clay underline.
 */
function Tabs({
  items = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "4px",
      borderBottom: "1px solid var(--border)",
      ...style
    }
  }, items.map(it => {
    const active = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      style: {
        position: "relative",
        border: "none",
        background: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "13.5px",
        fontWeight: active ? "var(--weight-semi)" : "var(--weight-book)",
        color: active ? "var(--text)" : "var(--text-2)",
        padding: "10px 14px",
        marginBottom: "-1px",
        borderBottom: "2px solid " + (active ? "var(--accent)" : "transparent"),
        transition: "color var(--dur-fast) var(--ease-out)",
        display: "inline-flex",
        alignItems: "center",
        gap: "7px"
      }
    }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "11px",
        fontWeight: 500,
        color: active ? "var(--accent)" : "var(--text-3)",
        background: "var(--accent-softer)",
        border: "1px solid var(--border)",
        padding: "0 6px",
        borderRadius: "var(--radius-pill)"
      }
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
/**
 * Dialog — centered modal on a warm scrim. Raised paper surface,
 * serif title. Controlled via `open`; `onClose` fires on scrim click
 * or Escape.
 */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer = null,
  width = 460
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "grid",
      placeItems: "center",
      padding: "24px",
      background: "rgba(42, 37, 31, 0.34)",
      backdropFilter: "blur(3px)",
      animation: "ic-fade 0.18s var(--ease-soft)"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes ic-fade{from{opacity:0}to{opacity:1}}@keyframes ic-pop{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:none}}`), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)",
      boxShadow: "var(--shadow-lg), var(--inset-line)",
      padding: "24px",
      animation: "ic-pop 0.22s var(--ease-out)"
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "21px",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      color: "var(--text)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "13.5px",
      lineHeight: 1.55,
      color: "var(--text-2)",
      margin: "8px 0 0"
    }
  }, description), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "22px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
/**
 * Toast — a single transient notification card. tone tints the leading
 * accent rail. Render in a fixed bottom-right stack.
 */
function Toast({
  title,
  message,
  tone = "accent",
  icon = null,
  onDismiss,
  style = {}
}) {
  const rail = {
    accent: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    info: "var(--info)"
  }[tone] || "var(--accent)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      width: "320px",
      padding: "14px 16px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border)",
      borderLeft: "3px solid " + rail,
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg), var(--inset-line)",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: rail,
      display: "grid",
      placeItems: "center",
      marginTop: "1px"
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "13px",
      fontWeight: "var(--weight-semi)",
      color: "var(--text)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "12.5px",
      color: "var(--text-2)",
      marginTop: "2px",
      lineHeight: 1.45
    }
  }, message)), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "var(--text-3)",
      padding: 0,
      lineHeight: 0,
      marginTop: "1px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
/* AppShell — the product frame: sidebar nav, plan card, theme toggle,
   and a topbar. Composes NavItem / Avatar / Meter from the DS bundle. */
const {
  NavItem,
  Avatar,
  Meter,
  IconButton
} = window.InterviewCopilotDesignSystem_d59c8c || {};
function ThemeToggle() {
  const [dark, setDark] = React.useState(document.documentElement.getAttribute("data-theme") === "dark");
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setDark(!dark);
  };
  const I = window.ICIcons;
  return /*#__PURE__*/React.createElement("div", {
    className: "theme-toggle",
    onClick: toggle,
    role: "switch",
    "aria-checked": dark
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "9px"
    }
  }, dark ? /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 15
  }) : /*#__PURE__*/React.createElement(I.Clock, {
    size: 15
  }), dark ? "Morning mode" : "Evening mode"), /*#__PURE__*/React.createElement("span", {
    className: "switch",
    "data-on": dark
  }));
}
function AppShell({
  active,
  onNavigate,
  title,
  eyebrow,
  subtitle,
  actions,
  children
}) {
  const I = window.ICIcons;
  const nav = [{
    group: "Workspace",
    items: [{
      id: "dashboard",
      label: "Dashboard",
      icon: I.Home
    }, {
      id: "schedule",
      label: "Schedule",
      icon: I.Calendar,
      count: 3
    }]
  }, {
    group: "Prepare",
    items: [{
      id: "resume",
      label: "Resume Analysis",
      icon: I.Doc
    }, {
      id: "jobs",
      label: "Job Descriptions",
      icon: I.Briefcase,
      count: 4
    }, {
      id: "company",
      label: "Company Research",
      icon: I.Building
    }, {
      id: "plan",
      label: "Preparation Plan",
      icon: I.Target
    }]
  }, {
    group: "Practice",
    items: [{
      id: "mock",
      label: "Mock Interview",
      icon: I.Mic
    }, {
      id: "assistant",
      label: "AI Assistant",
      icon: I.Chat
    }, {
      id: "progress",
      label: "Progress",
      icon: I.Chart
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "app ic-grain"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-mark"
  }, "i", /*#__PURE__*/React.createElement("span", null, "c")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "brand-name"
  }, "Interview\xA0Copilot"), /*#__PURE__*/React.createElement("div", {
    className: "brand-sub"
  }, "Career Prep"))), nav.map(sec => /*#__PURE__*/React.createElement(React.Fragment, {
    key: sec.group
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-label"
  }, sec.group), sec.items.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.id,
    active: active === it.id,
    count: it.count,
    onClick: () => onNavigate(it.id),
    icon: /*#__PURE__*/React.createElement(it.icon, {
      size: 16
    })
  }, it.label)))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "plan-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "plan-title"
  }, "Stripe loop \u2014 14-day plan"), /*#__PURE__*/React.createElement("div", {
    className: "plan-meta"
  }, "Day 9 of 14 \xB7 on track"), /*#__PURE__*/React.createElement(Meter, {
    value: 64
  }), /*#__PURE__*/React.createElement("div", {
    className: "plan-pct"
  }, "64% complete")), /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement("div", {
    className: "user-row",
    onClick: () => onNavigate("profile")
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Coder Codern",
    size: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, "Coder Codern"), /*#__PURE__*/React.createElement("div", {
    className: "user-mail"
  }, "coder@example.com")), /*#__PURE__*/React.createElement(IconButton, {
    label: "Sign out",
    variant: "ghost",
    size: "sm",
    onClick: e => {
      e.stopPropagation();
      window.location.href = "../marketing/login.html";
    }
  }, /*#__PURE__*/React.createElement(I.Logout, {
    size: 15
  }))))), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "topbar-sub"
  }, subtitle)), actions), children));
}
window.AppShell = AppShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Chat.jsx
try { (() => {
/* Chat — the AI conversation surface, used for both the live Mock
   Interview and the AI Assistant. Streaming-style typing indicator,
   suggestion pills, and a soft composer. */
const {
  Button,
  Badge,
  IconButton
} = window.InterviewCopilotDesignSystem_d59c8c || {};
const SCRIPTS = {
  mock: {
    persona: "System Design · Stripe persona",
    greeting: "Let's begin. Design a payments ledger that stays correct under retries and partial failures. Start with the core data model — what are your entities and their invariants?",
    suggestions: ["Walk through the data model", "Ask about scale targets", "I'd like a hint"],
    reply: "Good — double-entry with append-only transactions is the right instinct. Now: a client retries a charge after a timeout but the original actually succeeded. How does your design guarantee it isn't applied twice?"
  },
  assistant: {
    persona: "AI Assistant",
    greeting: "I've read your resume, the Stripe JD, and your prep notes. Ask me anything — I can draft STAR stories, explain a concept, or quiz you.",
    suggestions: ["Draft a STAR story for conflict", "Explain idempotency keys", "Quiz me on consistency"],
    reply: "Here's a STAR frame from your billing migration:\n\nSituation — a 40k req/min legacy system needed a zero-downtime cutover.\nTask — migrate without dropping or double-charging.\nAction — dual writes behind a feature flag, idempotency keys, shadow reconciliation.\nResult — cut over with zero incidents; p95 latency dropped 30%."
  }
};
function Chat({
  mode = "assistant"
}) {
  const I = window.ICIcons;
  const cfg = SCRIPTS[mode];
  const [messages, setMessages] = React.useState([{
    from: "ai",
    text: cfg.greeting
  }]);
  const [draft, setDraft] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const streamRef = React.useRef(null);
  React.useEffect(() => {
    setMessages([{
      from: "ai",
      text: cfg.greeting
    }]);
  }, [mode]);
  React.useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages, typing]);
  const send = text => {
    const t = (text || draft).trim();
    if (!t) return;
    setMessages(m => [...m, {
      from: "user",
      text: t
    }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        from: "ai",
        text: cfg.reply
      }]);
    }, 1400);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 168px)",
      minHeight: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread",
    style: {
      paddingBottom: "16px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: "11px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "msg-avatar",
    style: {
      width: 34,
      height: 34
    }
  }, mode === "mock" ? /*#__PURE__*/React.createElement(I.Mic, {
    size: 16
  }) : /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "14px"
    }
  }, mode === "mock" ? "Mock Interview" : "Copilot Assistant"), /*#__PURE__*/React.createElement("div", {
    className: "dim",
    style: {
      fontSize: "11.5px"
    }
  }, cfg.persona))), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: "10px"
    }
  }, mode === "mock" && /*#__PURE__*/React.createElement(Badge, {
    tone: "danger"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor",
      display: "inline-block"
    }
  }), " Recording"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Settings",
    variant: "outline",
    size: "sm"
  }, /*#__PURE__*/React.createElement(I.Settings, {
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    className: "chat-stream",
    ref: streamRef
  }, messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "msg " + m.from,
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "msg-avatar"
  }, m.from === "ai" ? mode === "mock" ? /*#__PURE__*/React.createElement(I.Mic, {
    size: 15
  }) : /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 15
  }) : "C"), /*#__PURE__*/React.createElement("div", {
    className: "msg-bubble"
  }, m.from === "ai" && /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, mode === "mock" ? "Interviewer" : "Copilot"), /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: "pre-line"
    }
  }, m.text)))), typing && /*#__PURE__*/React.createElement("div", {
    className: "msg ai"
  }, /*#__PURE__*/React.createElement("div", {
    className: "msg-avatar"
  }, mode === "mock" ? /*#__PURE__*/React.createElement(I.Mic, {
    size: 15
  }) : /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    className: "msg-bubble"
  }, /*#__PURE__*/React.createElement("div", {
    className: "typing-dots"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))))), messages.length <= 1 && /*#__PURE__*/React.createElement("div", {
    className: "pills"
  }, cfg.suggestions.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "pill",
    key: i,
    onClick: () => send(s)
  }, s))), /*#__PURE__*/React.createElement("div", {
    className: "chat-composer",
    style: {
      marginTop: "14px"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "chat-input",
    rows: 1,
    placeholder: mode === "mock" ? "Type your answer…" : "Ask the Copilot anything…",
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => send(),
    iconRight: /*#__PURE__*/React.createElement(I.Send, {
      size: 13
    })
  }, "Send")));
}
window.Chat = Chat;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Chat.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Dashboard.jsx
try { (() => {
/* Dashboard — the home screen. Today's focus hero, stat strip,
   study tracks, upcoming sessions and recent notes. */
const {
  ReadinessRing,
  Meter,
  Button,
  Badge
} = window.InterviewCopilotDesignSystem_d59c8c || {};
function Dashboard({
  onNavigate
}) {
  const I = window.ICIcons;
  const tracks = [{
    icon: I.Layers,
    badge: ["In focus", "accent"],
    title: "System Design",
    desc: "Ledgers, rate limiters, queues. Two exercises left in the payments module.",
    value: 58,
    pct: "7 / 12",
    last: "Last studied today"
  }, {
    icon: I.Activity,
    badge: ["Steady", "outline"],
    title: "Coding Drills",
    desc: "Graphs and dynamic programming this week. Strong run on medium difficulty.",
    value: 73,
    pct: "35 / 48",
    last: "Last studied yesterday"
  }, {
    icon: I.User,
    badge: ["✓ Strong", "success"],
    title: "Behavioral",
    desc: "All STAR stories drafted and rehearsed. One final pass on the leadership set.",
    value: 92,
    pct: "22 / 24",
    last: "Last studied Mon"
  }];
  const sessions = [{
    d: "10",
    m: "Jun",
    now: true,
    title: "Deep work: payment ledger design",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "live"
    }, "In progress"), " \xB7 90 min \xB7 System Design")
  }, {
    d: "11",
    m: "Jun",
    title: "Mock interview — system design w/ Priya",
    meta: "4:00 pm · 60 min · recorded for review"
  }, {
    d: "12",
    m: "Jun",
    title: "Graph drills + spaced repetition review",
    meta: "Morning block · 75 min · Coding track"
  }, {
    d: "14",
    m: "Jun",
    title: "Final review: STAR stories & questions",
    meta: "Evening · 45 min · light session"
  }];
  const notes = [{
    done: true,
    title: "Idempotency keys — retry semantics",
    ex: "Client-generated keys, server-side dedup window, partial failure…",
    meta: "Reviewed today · System Design"
  }, {
    done: false,
    title: "Double-entry ledger invariants",
    ex: "Debits = credits per transaction. Never mutate, only append…",
    meta: "Draft · needs examples · System Design"
  }, {
    done: true,
    title: "STAR: migrating the billing service",
    ex: "Situation: 40k req/min legacy system. Task: zero-downtime cutover…",
    meta: "Rehearsed Mon · Behavioral"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-tag"
  }, /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 12
  }), " Today's focus"), /*#__PURE__*/React.createElement("h2", null, "System design: payment ledgers & idempotent retries"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "You marked consistency trade-offs as shaky on Monday. Today pairs two ledger design exercises with your annotated notes from the Stripe engineering blog."), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(I.Arrow, {
      size: 13
    }),
    onClick: () => onNavigate("mock")
  }, "Resume session"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onNavigate("resume")
  }, "Review notes"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-right"
  }, /*#__PURE__*/React.createElement(ReadinessRing, {
    value: 72,
    caption: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text)"
      }
    }, "+6%"), " since last week", /*#__PURE__*/React.createElement("br", null), "Strongest: behavioral \xB7 Focus: system design")
  }))), /*#__PURE__*/React.createElement("section", {
    className: "stats"
  }, [["Questions completed", /*#__PURE__*/React.createElement(React.Fragment, null, "142 ", /*#__PURE__*/React.createElement("small", null, "/ 210")), "+11 this week", ""], ["Study time", /*#__PURE__*/React.createElement(React.Fragment, null, "31", /*#__PURE__*/React.createElement("small", null, "h"), " 40", /*#__PURE__*/React.createElement("small", null, "m")), "+4h 20m this week", ""], ["Mock interviews", /*#__PURE__*/React.createElement(React.Fragment, null, "7 ", /*#__PURE__*/React.createElement("small", null, "/ 10")), "Next: Thu 4:00 pm", ""], ["Avg. mock score", /*#__PURE__*/React.createElement(React.Fragment, null, "8.2 ", /*#__PURE__*/React.createElement("small", null, "/ 10")), "Stable · last 3 sessions", "muted"]].map(([label, value, delta, cls], i) => /*#__PURE__*/React.createElement("div", {
    className: "stat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "stat-delta " + cls
  }, delta)))), /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Study tracks"), /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate("plan")
  }, "View all tracks \u2192")), /*#__PURE__*/React.createElement("section", {
    className: "grid-3"
  }, tracks.map((t, i) => /*#__PURE__*/React.createElement("div", {
    className: "surface topic",
    style: {
      padding: "20px"
    },
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon"
  }, /*#__PURE__*/React.createElement(t.icon, {
    size: 17
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: t.badge[1]
  }, t.badge[0])), /*#__PURE__*/React.createElement("h4", null, t.title), /*#__PURE__*/React.createElement("p", {
    className: "desc"
  }, t.desc), /*#__PURE__*/React.createElement("div", {
    className: "topic-progress"
  }, /*#__PURE__*/React.createElement(Meter, {
    value: t.value,
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "pct"
  }, t.pct)), /*#__PURE__*/React.createElement("div", {
    className: "card-foot"
  }, /*#__PURE__*/React.createElement("span", null, t.last), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontWeight: 550
    }
  }, "Continue \u2192"))))), /*#__PURE__*/React.createElement("section", {
    className: "cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Upcoming sessions"), /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "This week")), sessions.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "session" + (s.now ? " now" : ""),
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "session-date"
  }, /*#__PURE__*/React.createElement("b", null, s.d), /*#__PURE__*/React.createElement("span", null, s.m)), /*#__PURE__*/React.createElement("div", {
    className: "session-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "session-title"
  }, s.title), /*#__PURE__*/React.createElement("div", {
    className: "session-meta"
  }, s.meta))))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Recent notes"), /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "Notebook")), notes.map((n, i) => /*#__PURE__*/React.createElement("div", {
    className: "note",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "note-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "note-check" + (n.done ? "" : " open")
  }, n.done && /*#__PURE__*/React.createElement(I.Check, {
    size: 9,
    stroke: 3
  })), n.title), /*#__PURE__*/React.createElement("div", {
    className: "note-excerpt"
  }, n.ex), /*#__PURE__*/React.createElement("div", {
    className: "note-meta"
  }, n.meta))))), /*#__PURE__*/React.createElement("p", {
    className: "foot-quote"
  }, "\"Slow is smooth, smooth is fast.\" \u2014 keep the streak, not the pace."));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Interview Copilot — icon set.
   Lucide-style line glyphs (stroke 1.8, rounded), authored to match
   the product codebase's inline-SVG iconography. Each is a small
   React component taking { size, stroke }. Exposed on window for use
   across the UI-kit screen scripts. */
const Icon = ({
  size = 18,
  stroke = 1.8,
  children,
  fill = "none"
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: fill,
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    flexShrink: 0
  }
}, children);
const Icons = {
  Home: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 12l9-8 9 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"
  })),
  Doc: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M14 3v5h5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 3h8l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
  })),
  Briefcase: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "7",
    width: "18",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 13h18"
  })),
  Building: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "16",
    height: "18",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"
  })),
  Calendar: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "17",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 2v4M16 2v4M3 9h18"
  })),
  Mic: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "3",
    width: "6",
    height: "11",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 11a7 7 0 0014 0M12 18v3"
  })),
  Chat: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a8 8 0 01-11.6 7.1L3 21l1.9-6.4A8 8 0 1121 12z"
  })),
  Chart: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 17l5-5 4 4 8-8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 8h5v5"
  })),
  User: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 8a3 3 0 100-6 3 3 0 000 6zM5 22v-5a7 7 0 0114 0v5"
  })),
  Shield: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z"
  })),
  Layers: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "9",
    height: "8",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "13",
    width: "9",
    height: "8",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 11v3a2 2 0 002 2H13"
  })),
  Arrow: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  Clock: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 3"
  })),
  Check: p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
    stroke: p?.stroke || 2.4
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  })),
  Plus: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  Search: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  })),
  Sparkle: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"
  })),
  Bell: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"
  })),
  Settings: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 01-4 0v-.1A1.6 1.6 0 005 19.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00-1.1-2.7H1a2 2 0 010-4h.1A1.6 1.6 0 002.6 5l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H7a1.6 1.6 0 001-1.5V1a2 2 0 014 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V7a1.6 1.6 0 001.5 1H23a2 2 0 010 4h-.1a1.6 1.6 0 00-1.5 1z"
  })),
  Upload: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V4M7 9l5-5 5 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20h14"
  })),
  Target: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.4",
    fill: "currentColor",
    stroke: "none"
  })),
  Logout: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
  })),
  Activity: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M22 12h-4l-3 9L9 3l-3 9H2"
  })),
  Send: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
  }))
};
window.ICIcons = Icons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/JobAnalysis.jsx
try { (() => {
/* JobAnalysis — a parsed job description: extracted requirements in a
   table with per-requirement match status, plus an overall skill-gap
   match score. */
const {
  Badge,
  Meter,
  Button,
  ReadinessRing,
  Tag
} = window.InterviewCopilotDesignSystem_d59c8c || {};
function JobAnalysis() {
  const I = window.ICIcons;
  const reqs = [["5+ years backend, distributed systems", "Core", "matched"], ["Payments / ledger domain experience", "Core", "matched"], ["Strong in C# or Java", "Core", "matched"], ["Event streaming (Kafka / Kinesis)", "Important", "gap"], ["Kubernetes & container orchestration", "Important", "partial"], ["gRPC service design", "Nice to have", "partial"], ["Mentoring / tech leadership", "Important", "matched"]];
  const statusMap = {
    matched: ["Matched", "success"],
    partial: ["Partial", "warning"],
    gap: ["Gap", "danger"]
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread",
    style: {
      marginBottom: "4px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "serif-h",
    style: {
      fontSize: "18px"
    }
  }, "Senior Backend Engineer, Payments"), /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: "12.5px",
      marginTop: "3px"
    }
  }, "Stripe \xB7 San Francisco / Remote \xB7 Full-time")), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, /*#__PURE__*/React.createElement(I.Check, {
    size: 10,
    stroke: 3
  }), " Analyzed"))), /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "16px",
      fontWeight: 550
    }
  }, "Extracted requirements"), /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "7 found")), /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Requirement"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: "110px"
    }
  }, "Priority"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: "110px"
    }
  }, "Match"))), /*#__PURE__*/React.createElement("tbody", null, reqs.map(([r, prio, st], i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, r), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, prio)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: statusMap[st][1]
  }, statusMap[st][0])))))))), /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "22px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      alignSelf: "flex-start",
      marginBottom: "14px"
    }
  }, "Skill-gap match"), /*#__PURE__*/React.createElement(ReadinessRing, {
    value: 78,
    label: "Match",
    caption: /*#__PURE__*/React.createElement(React.Fragment, null, "Strong fit \u2014 close ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text)"
      }
    }, "2 gaps"), " to reach 90%+")
  })), /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "18px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "13.5px",
      marginBottom: "12px"
    }
  }, "Gaps to close"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "gap"
  }, "Kafka"), /*#__PURE__*/React.createElement(Tag, {
    tone: "gap"
  }, "Kubernetes"), /*#__PURE__*/React.createElement(Tag, {
    tone: "neutral"
  }, "gRPC")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement(I.Arrow, {
      size: 13
    })
  }, "Generate prep plan"))));
}
window.JobAnalysis = JobAnalysis;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/JobAnalysis.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ResumeAnalysis.jsx
try { (() => {
/* ResumeAnalysis — parsed resume: extracted skills, experience,
   and a career profile summary with a strength readout. */
const {
  Tag,
  Badge,
  Meter,
  Button,
  Tabs,
  Avatar
} = window.InterviewCopilotDesignSystem_d59c8c || {};
function ResumeAnalysis() {
  const I = window.ICIcons;
  const [tab, setTab] = React.useState("skills");
  const skills = [[".NET / C#", "matched"], ["PostgreSQL", "matched"], ["Distributed systems", "matched"], ["REST APIs", "matched"], ["Event-driven", "matched"], ["Domain-driven design", "accent"], ["Kafka", "gap"], ["Kubernetes", "gap"], ["gRPC", "neutral"], ["Redis", "neutral"], ["CI/CD", "neutral"], ["xUnit", "neutral"]];
  const experience = [{
    role: "Senior Backend Engineer",
    co: "Ledgerline",
    time: "2022 — Present",
    note: "Led billing platform migration; 40k req/min zero-downtime cutover."
  }, {
    role: "Backend Engineer",
    co: "Northwind Pay",
    time: "2019 — 2022",
    note: "Built idempotent payments API and double-entry ledger service."
  }, {
    role: "Software Engineer",
    co: "Cobalt Systems",
    time: "2017 — 2019",
    note: "Internal tooling, event pipelines, observability."
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread",
    style: {
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon",
    style: {
      width: 40,
      height: 40
    }
  }, /*#__PURE__*/React.createElement(I.Doc, {
    size: 19
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "serif-h",
    style: {
      fontSize: "17px"
    }
  }, "Coder_Codern_Resume_v3.pdf"), /*#__PURE__*/React.createElement("div", {
    className: "dim",
    style: {
      fontSize: "12px",
      marginTop: "2px"
    }
  }, "Uploaded 2 days ago \xB7 version 3 \xB7 2 pages"))), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, /*#__PURE__*/React.createElement(I.Check, {
    size: 10,
    stroke: 3
  }), " Parsed")), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: "skills",
      label: "Skills",
      count: 12
    }, {
      id: "experience",
      label: "Experience",
      count: 3
    }, {
      id: "education",
      label: "Education"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "20px"
    }
  }, tab === "skills" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dim",
    style: {
      fontSize: "12px",
      marginBottom: "12px"
    }
  }, "Extracted and matched against your target role \xB7 Senior Backend Engineer"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px"
    }
  }, skills.map(([s, tone], i) => /*#__PURE__*/React.createElement(Tag, {
    key: i,
    tone: tone
  }, s)))), tab === "experience" && /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "2px"
    }
  }, experience.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: "16px",
      padding: "14px 0",
      borderBottom: i < 2 ? "1px solid var(--border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 3,
      borderRadius: 3,
      background: "var(--accent)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "spread"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "14px"
    }
  }, e.role)), /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: "12.5px",
      marginTop: "1px"
    }
  }, e.co, " \xB7 ", e.time), /*#__PURE__*/React.createElement("div", {
    className: "dim",
    style: {
      fontSize: "12.5px",
      marginTop: "6px",
      lineHeight: 1.5
    }
  }, e.note))))), tab === "education" && /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: "14px",
      padding: "6px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-icon",
    style: {
      width: 40,
      height: 40
    }
  }, /*#__PURE__*/React.createElement(I.Building, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "14px"
    }
  }, "B.Sc. Computer Science"), /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: "12.5px",
      marginTop: "2px"
    }
  }, "State University \xB7 2013 \u2014 2017")))))), /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: "8px"
    }
  }, "Career profile"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "16px",
      lineHeight: 1.45,
      color: "var(--text)"
    }
  }, "A payments-focused backend engineer with deep experience in ledgers, idempotency and zero-downtime migrations."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "18px"
    }
  }, [["Profile strength", 84], ["Role alignment", 76], ["Keyword coverage", 68]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread",
    style: {
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12.5px",
      color: "var(--text-2)"
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      color: "var(--accent)"
    }
  }, v, "%")), /*#__PURE__*/React.createElement(Meter, {
    value: v
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "18px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: "10px",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: "13.5px"
    }
  }, "Suggested improvements")), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, ["Add a metric to the Cobalt Systems role", "Surface Kafka/streaming exposure if any", "Tighten the summary to 2 lines"].map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "row",
    style: {
      gap: "10px",
      alignItems: "flex-start",
      fontSize: "12.5px",
      color: "var(--text-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      marginTop: "2px"
    }
  }, /*#__PURE__*/React.createElement(I.Arrow, {
    size: 13
  })), s))), /*#__PURE__*/React.createElement(Button, {
    variant: "subtle",
    size: "sm",
    style: {
      marginTop: "16px"
    },
    iconLeft: /*#__PURE__*/React.createElement(I.Sparkle, {
      size: 13
    })
  }, "Rewrite with AI"))));
}
window.ResumeAnalysis = ResumeAnalysis;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ResumeAnalysis.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app.jsx
try { (() => {
/* app.jsx — wires the App UI kit: screen routing + per-screen topbar.
   DS components + icons are read at render time, inside each component,
   so the read never depends on the bundle's module evaluation order. */

const StreakChip = () => /*#__PURE__*/React.createElement("div", {
  className: "streak-chip"
}, /*#__PURE__*/React.createElement("span", {
  className: "streak-dot"
}), "12-day streak\xA0", /*#__PURE__*/React.createElement("span", null, "\xB7 2h 10m today"));
function Placeholder({
  icon,
  title,
  desc
}) {
  const {
    EmptyState,
    Badge
  } = window.InterviewCopilotDesignSystem_d59c8c;
  return /*#__PURE__*/React.createElement("div", {
    className: "surface",
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: icon,
    title: title,
    description: desc,
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "outline"
    }, "In the full product")
  }));
}
function App() {
  const {
    Button,
    Badge
  } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  const [active, setActive] = React.useState("dashboard");
  const nav = id => setActive(id);

  // Built inside the component so the JSX is only constructed when App
  // actually renders (on the real page, where the DS namespace + icons
  // are populated) — never during the bundled copy's module eval.
  const SCREENS = {
    dashboard: {
      eyebrow: "Wednesday, June 11",
      title: "Good morning, <em>Coder</em>.",
      subtitle: "Four days until your on-site. Today is a deep-work day.",
      actions: /*#__PURE__*/React.createElement(StreakChip, null),
      render: nav => /*#__PURE__*/React.createElement(Dashboard, {
        onNavigate: nav
      })
    },
    resume: {
      eyebrow: "Resume",
      title: "Resume <em>Analysis</em>",
      subtitle: "Skills, experience and a career profile, extracted from your latest upload.",
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        iconLeft: /*#__PURE__*/React.createElement(I.Upload, {
          size: 14
        })
      }, "Upload version"),
      render: () => /*#__PURE__*/React.createElement(ResumeAnalysis, null)
    },
    jobs: {
      eyebrow: "Job description",
      title: "Job &amp; <em>Skill Gap</em>",
      subtitle: "What this role demands, and where you stand against it.",
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        iconLeft: /*#__PURE__*/React.createElement(I.Plus, {
          size: 14
        })
      }, "Add job"),
      render: () => /*#__PURE__*/React.createElement(JobAnalysis, null)
    },
    mock: {
      eyebrow: "Practice",
      title: "Mock <em>Interview</em>",
      subtitle: "A live, recorded session. Answer aloud or in text — feedback follows.",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "accent"
      }, "60 min \xB7 System Design"),
      render: () => /*#__PURE__*/React.createElement(Chat, {
        mode: "mock"
      })
    },
    assistant: {
      eyebrow: "Assistant",
      title: "AI <em>Assistant</em>",
      subtitle: "Grounded in your resume, target role and notes.",
      actions: null,
      render: () => /*#__PURE__*/React.createElement(Chat, {
        mode: "assistant"
      })
    },
    company: {
      eyebrow: "Research",
      title: "Company <em>Research</em>",
      subtitle: "Culture, interview style and recent news.",
      render: () => /*#__PURE__*/React.createElement(Placeholder, {
        icon: /*#__PURE__*/React.createElement(I.Building, {
          size: 22
        }),
        title: "Company research",
        desc: "Deep-dives on culture, hiring process and interview style assemble here once a company is added."
      })
    },
    plan: {
      eyebrow: "Plan",
      title: "Preparation <em>Plan</em>",
      subtitle: "A day-by-day plan toward your target date.",
      render: () => /*#__PURE__*/React.createElement(Placeholder, {
        icon: /*#__PURE__*/React.createElement(I.Target, {
          size: 22
        }),
        title: "Preparation plan",
        desc: "Generate a plan from a job description and target date to see scheduled tracks here."
      })
    },
    schedule: {
      eyebrow: "This week",
      title: "<em>Schedule</em>",
      subtitle: "Your planned study blocks and mock sessions.",
      render: () => /*#__PURE__*/React.createElement(Placeholder, {
        icon: /*#__PURE__*/React.createElement(I.Calendar, {
          size: 22
        }),
        title: "Schedule",
        desc: "Planned sessions and mock interviews show on a weekly calendar."
      })
    },
    progress: {
      eyebrow: "Trends",
      title: "<em>Progress</em>",
      subtitle: "Readiness over time, by track.",
      render: () => /*#__PURE__*/React.createElement(Placeholder, {
        icon: /*#__PURE__*/React.createElement(I.Chart, {
          size: 22
        }),
        title: "Progress",
        desc: "Readiness trends, study-time charts and per-track breakdowns live here."
      })
    },
    profile: {
      eyebrow: "Account",
      title: "<em>Profile</em>",
      subtitle: "Your details, target role and preferences.",
      render: () => /*#__PURE__*/React.createElement(Placeholder, {
        icon: /*#__PURE__*/React.createElement(I.User, {
          size: 22
        }),
        title: "User profile",
        desc: "Display name, timezone, target role and connected accounts."
      })
    }
  };
  const s = SCREENS[active] || SCREENS.dashboard;
  return /*#__PURE__*/React.createElement(AppShell, {
    active: active,
    onNavigate: nav,
    eyebrow: s.eyebrow,
    title: s.title,
    subtitle: s.subtitle,
    actions: s.actions
  }, s.render(nav));
}
window.ICApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Landing.jsx
try { (() => {
/* Landing — Interview Copilot marketing page.
   Immersive editorial hero (typewriter line spoken by the Copilot,
   action pills, blurred intro), workflow section, quote band, CTA. */
/* DS components + icons are read at render time, inside each component,
   so the read never depends on the bundle's module evaluation order. */

/* Mouse-scrub video helper retained for the Login page; Landing's
   hero uses the readiness card. */
function useTypewriter(text, speed = 34, startDelay = 650) {
  const [out, setOut] = React.useState("");
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let i = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text]);
  return {
    out,
    done
  };
}
function Nav() {
  const {
    Button
  } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav" + (scrolled ? " scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-logo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-mark"
  }, "i", /*#__PURE__*/React.createElement("span", null, "c")), "Interview Copilot"), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#workflow"
  }, "Workflow"), /*#__PURE__*/React.createElement("a", {
    href: "#proof"
  }, "Why it works"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "Pricing")), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "login.html",
    style: {
      fontSize: "14px",
      color: "var(--text-2)"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(I.Arrow, {
      size: 13
    }),
    onClick: () => location.href = "login.html"
  }, "Start preparing")));
}
function Hero() {
  const {
    ReadinessRing,
    Meter
  } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  const {
    out,
    done
  } = useTypewriter("Glad you're here. Let's turn nerves into a plan — what role are you preparing for?");
  const [showPills, setShowPills] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShowPills(true), 450);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: "hero-mk hero-grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "hero-eyebrow"
  }, /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 13
  }), " Your AI career companion"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-h1"
  }, "Prepare for something ", /*#__PURE__*/React.createElement("em", null, "important"), "."), /*#__PURE__*/React.createElement("p", {
    className: "hero-intro"
  }, "Hey there \u2014 I'm your Copilot."), /*#__PURE__*/React.createElement("p", {
    className: "hero-type"
  }, out, !done && /*#__PURE__*/React.createElement("span", {
    className: "cursor"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-pills" + (showPills ? " show" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "hpill solid",
    onClick: () => location.href = "login.html"
  }, /*#__PURE__*/React.createElement(I.Doc, {
    size: 15
  }), " Analyze my resume"), /*#__PURE__*/React.createElement("div", {
    className: "hpill",
    onClick: () => location.href = "login.html"
  }, /*#__PURE__*/React.createElement(I.Briefcase, {
    size: 15
  }), " Paste a job description"), /*#__PURE__*/React.createElement("div", {
    className: "hpill",
    onClick: () => location.href = "login.html"
  }, /*#__PURE__*/React.createElement(I.Mic, {
    size: 15
  }), " Run a mock interview"), /*#__PURE__*/React.createElement("div", {
    className: "hpill",
    onClick: () => location.href = "login.html"
  }, /*#__PURE__*/React.createElement(I.Building, {
    size: 15
  }), " Research a company"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring-line"
  }, /*#__PURE__*/React.createElement(ReadinessRing, {
    value: 72,
    size: 104,
    stroke: 8
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Interview readiness"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Stripe \xB7 Senior Backend \xB7 4 days out"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px",
      fontSize: "12.5px",
      color: "var(--accent)",
      fontWeight: 600
    }
  }, "+6% this week"))), /*#__PURE__*/React.createElement("div", {
    className: "mini-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, /*#__PURE__*/React.createElement("span", null, "Behavioral"), /*#__PURE__*/React.createElement("span", null, "92%")), /*#__PURE__*/React.createElement(Meter, {
    value: 92,
    tone: "success"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mini-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, /*#__PURE__*/React.createElement("span", null, "Coding drills"), /*#__PURE__*/React.createElement("span", null, "73%")), /*#__PURE__*/React.createElement(Meter, {
    value: 73
  })), /*#__PURE__*/React.createElement("div", {
    className: "mini-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, /*#__PURE__*/React.createElement("span", null, "System design"), /*#__PURE__*/React.createElement("span", null, "58%")), /*#__PURE__*/React.createElement(Meter, {
    value: 58,
    tone: "warning"
  })))));
}
function Workflow() {
  const I = window.ICIcons;
  const steps = [{
    n: "01",
    icon: I.Doc,
    t: "Resume intelligence",
    p: "Upload once. We extract your skills, experience and a sharp career profile — then keep it aligned to each role."
  }, {
    n: "02",
    icon: I.Briefcase,
    t: "Job & company fit",
    p: "Paste a job description for structured requirements, a skill-gap match score, and research on the company's interview style."
  }, {
    n: "03",
    icon: I.Target,
    t: "A plan to your date",
    p: "A day-by-day preparation plan across behavioral, coding and system design — paced to your target date."
  }, {
    n: "04",
    icon: I.Mic,
    t: "AI mock interviews",
    p: "Practice live with a role-specific interviewer, then get rubric-based feedback and a readiness reading."
  }, {
    n: "05",
    icon: I.Chat,
    t: "Always-on assistant",
    p: "An assistant grounded in your resume and notes — draft STAR stories, explain concepts, or get quizzed."
  }, {
    n: "06",
    icon: I.Chart,
    t: "Visible progress",
    p: "Watch readiness climb, track study time, and walk in knowing you prepared for something that matters."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "workflow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "The workflow"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "One calm place, from first draft to final round."), /*#__PURE__*/React.createElement("p", {
    className: "section-lede"
  }, "Interview Copilot brings resume intelligence, company research, job analysis, coaching and mock interviews into a single, unhurried workflow."), /*#__PURE__*/React.createElement("div", {
    className: "flow"
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    className: "flow-card",
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-icon"
  }, /*#__PURE__*/React.createElement(s.icon, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "flow-num"
  }, s.n), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.p)))));
}
function Band() {
  return /*#__PURE__*/React.createElement("div", {
    className: "band",
    id: "proof"
  }, /*#__PURE__*/React.createElement("div", {
    className: "band-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "band-quote"
  }, "\"I am preparing for something important \u2014 and this tool is ", /*#__PURE__*/React.createElement("span", null, "helping me succeed."), "\""), /*#__PURE__*/React.createElement("div", {
    className: "band-by"
  }, "THE FEELING WE DESIGN FOR")));
}
function CTA() {
  const {
    Button
  } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "cta",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("h2", null, "Walk in ready."), /*#__PURE__*/React.createElement("p", null, "Start free. Bring a resume and a job description \u2014 we'll take it from there."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(I.Arrow, {
      size: 14
    }),
    onClick: () => location.href = "login.html"
  }, "Start preparing free"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: () => location.href = "login.html"
  }, "Book a demo"))), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-logo",
    style: {
      fontSize: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-mark",
    style: {
      width: 26,
      height: 26,
      fontSize: 13
    }
  }, "i", /*#__PURE__*/React.createElement("span", null, "c")), "Interview Copilot"), /*#__PURE__*/React.createElement("div", {
    className: "footer-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Product"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Careers")), /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Interview Copilot"))));
}
function Landing() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Workflow, null), /*#__PURE__*/React.createElement(Band, null), /*#__PURE__*/React.createElement(CTA, null));
}
window.ICLanding = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Login.jsx
try { (() => {
/* Login — Interview Copilot auth screen.
   The mouse-scrub video fills the whole page as a background; the
   sign-in form floats centered over it on a translucent gradient
   (frosted) card. Submitting routes to the app Dashboard, completing
   the Landing → Login → Dashboard flow. */
/* DS components are read at render time, inside each component, so the
   read never depends on the bundle's module evaluation order. */

function useScrubVideo(sensitivity = 0.9) {
  const ref = React.useRef(null);
  const s = React.useRef({
    prevX: null,
    target: 0,
    seeking: false
  });
  React.useEffect(() => {
    const v = ref.current;
    function onMove(e) {
      if (!v || !v.duration || isNaN(v.duration)) {
        s.current.prevX = e.clientX;
        return;
      }
      if (s.current.prevX == null) {
        s.current.prevX = e.clientX;
        return;
      }
      const delta = e.clientX - s.current.prevX;
      s.current.prevX = e.clientX;
      let t = s.current.target + delta / window.innerWidth * sensitivity * v.duration;
      t = Math.max(0, Math.min(v.duration, t));
      s.current.target = t;
      if (!s.current.seeking) {
        s.current.seeking = true;
        v.currentTime = t;
      }
    }
    function onSeeked() {
      if (!v) return;
      if (Math.abs(v.currentTime - s.current.target) > 0.01) v.currentTime = s.current.target;else s.current.seeking = false;
    }
    window.addEventListener("mousemove", onMove);
    if (v) v.addEventListener("seeked", onSeeked);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (v) v.removeEventListener("seeked", onSeeked);
    };
  }, [sensitivity]);
  return ref;
}
const GoogleMark = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 48 48"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#EA4335",
  d: "M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.6 13.2l7.9 6.1C12.3 13.2 17.6 9.5 24 9.5z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#4285F4",
  d: "M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-17.4z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FBBC05",
  d: "M10.5 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.9-6.1C1 16.1 0 19.9 0 24s1 7.9 2.6 11.4l7.9-6.1z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#34A853",
  d: "M24 48c6.2 0 11.5-2 15.3-5.5l-7.4-5.7c-2 1.4-4.7 2.3-7.9 2.3-6.4 0-11.7-3.7-13.6-9.8l-7.9 6.1C6.4 42.6 14.6 48 24 48z"
}));
function Login() {
  const {
    Button,
    Input,
    Checkbox
  } = window.InterviewCopilotDesignSystem_d59c8c;
  const I = window.ICIcons;
  const videoRef = useScrubVideo(0.9);
  const [mode, setMode] = React.useState("login"); // "login" | "register"
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const isReg = mode === "register";
  const typing = (name + email + pw).length > 0;
  const goToApp = () => {
    window.location.href = "../app/index.html";
  };
  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(goToApp, 750); // simulate auth, then land on the Dashboard
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "auth"
  }, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    className: "auth-bg-video",
    muted: true,
    playsInline: true,
    preload: "auto",
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "auth-bg-scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "robot-face" + (typing ? " closed" : ""),
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eye"
  }), /*#__PURE__*/React.createElement("span", {
    className: "eye"
  })), /*#__PURE__*/React.createElement("a", {
    className: "auth-brand",
    href: "index.html"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-mark"
  }, "i", /*#__PURE__*/React.createElement("span", null, "c")), /*#__PURE__*/React.createElement("span", null, "Interview Copilot")), /*#__PURE__*/React.createElement("div", {
    className: "auth-hint"
  }, /*#__PURE__*/React.createElement(I.Sparkle, {
    size: 12
  }), " Move your cursor to scrub the scene"), /*#__PURE__*/React.createElement("main", {
    className: "auth-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-eyebrow"
  }, isReg ? "Get started" : "Welcome back"), /*#__PURE__*/React.createElement("h1", {
    className: "auth-title"
  }, isReg ? /*#__PURE__*/React.createElement(React.Fragment, null, "Create your ", /*#__PURE__*/React.createElement("em", null, "prep"), ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Sign in to your ", /*#__PURE__*/React.createElement("em", null, "prep"), ".")), /*#__PURE__*/React.createElement("p", {
    className: "auth-sub"
  }, isReg ? "Bring a resume and a target role — we'll build your plan." : "Your dashboard, plan and mock sessions are right where you left them."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(GoogleMark, null),
    style: {
      marginTop: "22px"
    },
    onClick: goToApp
  }, "Continue with Google"), /*#__PURE__*/React.createElement("div", {
    className: "auth-divider"
  }, /*#__PURE__*/React.createElement("span", null, "or with email")), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, isReg && /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Coder Codern",
    icon: /*#__PURE__*/React.createElement(I.User, {
      size: 15
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@company.com",
    icon: /*#__PURE__*/React.createElement(I.User, {
      size: 15
    })
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: "12.5px",
      fontWeight: 550,
      color: "var(--text)"
    }
  }, "Password"), !isReg && /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "12px",
      color: "var(--accent-deep)",
      fontWeight: 500
    }
  }, "Forgot?")), /*#__PURE__*/React.createElement(Input, {
    type: "password",
    value: pw,
    onChange: e => setPw(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    icon: /*#__PURE__*/React.createElement(I.Shield, {
      size: 15
    })
  })), !isReg && /*#__PURE__*/React.createElement(Checkbox, {
    checked: remember,
    onChange: () => setRemember(!remember),
    label: "Keep me signed in"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    fullWidth: true,
    size: "lg",
    disabled: loading,
    iconRight: loading ? null : /*#__PURE__*/React.createElement(I.Arrow, {
      size: 14
    }),
    style: {
      marginTop: "4px"
    }
  }, loading ? isReg ? "Creating…" : "Signing in…" : isReg ? "Create account" : "Sign in")), /*#__PURE__*/React.createElement("p", {
    className: "auth-foot"
  }, isReg ? "Already have an account? " : "New here? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMode(isReg ? "login" : "register");
    }
  }, isReg ? "Sign in" : "Create an account")))));
}
window.ICLogin = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Login.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Meter = __ds_scope.Meter;

__ds_ns.ReadinessRing = __ds_scope.ReadinessRing;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

})();
