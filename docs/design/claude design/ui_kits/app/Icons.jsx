/* Interview Copilot — icon set.
   Lucide-style line glyphs (stroke 1.8, rounded), authored to match
   the product codebase's inline-SVG iconography. Each is a small
   React component taking { size, stroke }. Exposed on window for use
   across the UI-kit screen scripts. */
const Icon = ({ size = 18, stroke = 1.8, children, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {children}
  </svg>
);

const Icons = {
  Home:    (p) => <Icon {...p}><path d="M3 12l9-8 9 8" /><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" /></Icon>,
  Doc:     (p) => <Icon {...p}><path d="M14 3v5h5" /><path d="M7 3h8l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" /></Icon>,
  Briefcase:(p) => <Icon {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M3 13h18" /></Icon>,
  Building:(p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" /></Icon>,
  Calendar:(p) => <Icon {...p}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 9h18" /></Icon>,
  Mic:     (p) => <Icon {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></Icon>,
  Chat:    (p) => <Icon {...p}><path d="M21 12a8 8 0 01-11.6 7.1L3 21l1.9-6.4A8 8 0 1121 12z" /></Icon>,
  Chart:   (p) => <Icon {...p}><path d="M3 17l5-5 4 4 8-8" /><path d="M15 8h5v5" /></Icon>,
  User:    (p) => <Icon {...p}><path d="M12 8a3 3 0 100-6 3 3 0 000 6zM5 22v-5a7 7 0 0114 0v5" /></Icon>,
  Shield:  (p) => <Icon {...p}><path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z" /></Icon>,
  Layers:  (p) => <Icon {...p}><rect x="2" y="3" width="9" height="8" rx="1.5" /><rect x="13" y="13" width="9" height="8" rx="1.5" /><path d="M6.5 11v3a2 2 0 002 2H13" /></Icon>,
  Arrow:   (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>,
  Clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></Icon>,
  Check:   (p) => <Icon {...p} stroke={p?.stroke || 2.4}><path d="M20 6L9 17l-5-5" /></Icon>,
  Plus:    (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
  Search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></Icon>,
  Bell:    (p) => <Icon {...p}><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></Icon>,
  Settings:(p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 01-4 0v-.1A1.6 1.6 0 005 19.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00-1.1-2.7H1a2 2 0 010-4h.1A1.6 1.6 0 002.6 5l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H7a1.6 1.6 0 001-1.5V1a2 2 0 014 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V7a1.6 1.6 0 001.5 1H23a2 2 0 010 4h-.1a1.6 1.6 0 00-1.5 1z" /></Icon>,
  Upload:  (p) => <Icon {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 20h14" /></Icon>,
  Target:  (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></Icon>,
  Logout:  (p) => <Icon {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></Icon>,
  Activity:(p) => <Icon {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></Icon>,
  Send:    (p) => <Icon {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></Icon>,
  Globe:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></Icon>,
  Book:    (p) => <Icon {...p}><path d="M4 5a2 2 0 012-2h13a1 1 0 011 1v15a1 1 0 01-1 1H6a2 2 0 01-2-2z" /><path d="M4 18a2 2 0 012-2h14" /></Icon>,
  Bookmark:(p) => <Icon {...p}><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" /></Icon>,
  Flag:    (p) => <Icon {...p}><path d="M5 21V4M5 4h12l-2 4 2 4H5" /></Icon>,
  Star:    (p) => <Icon {...p}><path d="M12 3l2.6 5.6L21 9.5l-4.6 4.3L17.5 21 12 17.8 6.5 21l1.1-7.2L3 9.5l6.4-.9z" /></Icon>,
  Play:    (p) => <Icon {...p}><path d="M7 4l13 8-13 8z" /></Icon>,
  Pause:   (p) => <Icon {...p}><path d="M8 4v16M16 4v16" /></Icon>,
  Edit:    (p) => <Icon {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></Icon>,
  Download:(p) => <Icon {...p}><path d="M12 4v12M7 11l5 5 5-5" /><path d="M5 20h14" /></Icon>,
  Link:    (p) => <Icon {...p}><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" /><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" /></Icon>,
  Filter:  (p) => <Icon {...p}><path d="M3 5h18l-7 8v6l-4 2v-8z" /></Icon>,
  Dots:    (p) => <Icon {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></Icon>,
  ChevronRight:(p) => <Icon {...p}><path d="M9 6l6 6-6 6" /></Icon>,
  Trophy:  (p) => <Icon {...p}><path d="M7 4h10v5a5 5 0 01-10 0z" /><path d="M7 6H4a2 2 0 002 4M17 6h3a2 2 0 01-2 4M9 20h6M10 14v3a2 2 0 002 2 2 2 0 002-2v-3" /></Icon>,
  Flame:   (p) => <Icon {...p}><path d="M12 3c1 4 5 5 5 9a5 5 0 01-10 0c0-2 1-3 1-3 1 1 2 1 2-1 0-2-1-3 2-4z" /></Icon>,
  Bulb:    (p) => <Icon {...p}><path d="M9 18h6M10 21h4M12 3a6 6 0 014 10.5c-.7.7-1 1.3-1 2.5H9c0-1.2-.3-1.8-1-2.5A6 6 0 0112 3z" /></Icon>,
  Quote:   (p) => <Icon {...p}><path d="M7 7h4v6a4 4 0 01-4 4M13 7h4v6a4 4 0 01-4 4" /></Icon>,
  Users:   (p) => <Icon {...p}><path d="M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a3 3 0 100-6 3 3 0 000 6zM22 19v-2a4 4 0 00-3-3.9M16 3.1A4 4 0 0116 11" /></Icon>,
  TrendUp: (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></Icon>,
  X:       (p) => <Icon {...p} stroke={p?.stroke || 2.2}><path d="M6 6l12 12M18 6L6 18" /></Icon>,
  Wave:    (p) => <Icon {...p}><path d="M2 12h2l2-6 4 14 4-18 2 10h6" /></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></Icon>,
  Coffee:  (p) => <Icon {...p}><path d="M4 8h13v5a4 4 0 01-4 4H8a4 4 0 01-4-4z" /><path d="M17 9h2a2 2 0 010 4h-2M5 3v1M9 3v1M13 3v1" /></Icon>,
};

window.ICIcons = Icons;
