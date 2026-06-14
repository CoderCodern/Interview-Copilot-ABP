/* Admin-only glyphs — same Lucide-style line system as ICIcons.
   Drawn to a 24px viewBox, 1.8 stroke, round caps. Merged into
   window.ICIcons so screens can use I.Cpu, I.Database, … */
const AdminIcon = ({ size = 18, stroke = 1.8, children, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {children}
  </svg>
);

const AdminIcons = {
  Cpu:      (p) => <AdminIcon {...p}><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9.5 10.5h5v5h-5z" /><path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" /></AdminIcon>,
  Database: (p) => <AdminIcon {...p}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></AdminIcon>,
  Server:   (p) => <AdminIcon {...p}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></AdminIcon>,
  Route:    (p) => <AdminIcon {...p}><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M8.5 19H14a3.5 3.5 0 000-7h-4a3.5 3.5 0 010-7h5.5" /></AdminIcon>,
  Shuffle:  (p) => <AdminIcon {...p}><path d="M16 3h5v5M4 20l17-17M21 16v5h-5M15 15l6 6M4 4l5 5" /></AdminIcon>,
  Dollar:   (p) => <AdminIcon {...p}><path d="M12 2v20M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.8 7 7s2.2 3 5 3.5 5 1.5 5 3.5-2.2 3.5-5 3.5-5-1.1-5-3" /></AdminIcon>,
  Gauge:    (p) => <AdminIcon {...p}><path d="M3.5 17a9 9 0 1117 0" /><path d="M12 14l4-4" /><circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none" /></AdminIcon>,
  Eye:      (p) => <AdminIcon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="2.5" /></AdminIcon>,
  Refresh:  (p) => <AdminIcon {...p}><path d="M21 12a9 9 0 11-2.6-6.4M21 4v5h-5" /></AdminIcon>,
  Lock:     (p) => <AdminIcon {...p}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></AdminIcon>,
  Key:      (p) => <AdminIcon {...p}><circle cx="8" cy="8" r="4" /><path d="M11 11l9 9M16 16l2-2M19 19l2-2" /></AdminIcon>,
  Cloud:    (p) => <AdminIcon {...p}><path d="M7 18a4 4 0 01-.5-7.97A5.5 5.5 0 0117.5 10 3.5 3.5 0 0117 18z" /></AdminIcon>,
  Zap:      (p) => <AdminIcon {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></AdminIcon>,
  ListChecks:(p) => <AdminIcon {...p}><path d="M11 6h10M11 12h10M11 18h10" /><path d="M3 6l1.5 1.5L7 5M3 17l1.5 1.5L7 15" /></AdminIcon>,
  Terminal: (p) => <AdminIcon {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></AdminIcon>,
  Grid:     (p) => <AdminIcon {...p}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></AdminIcon>,
  Alert:    (p) => <AdminIcon {...p}><path d="M10.3 3.8L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.8a2 2 0 00-3.4 0z" /><path d="M12 9v4M12 17h.01" /></AdminIcon>,
  Sliders:  (p) => <AdminIcon {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></AdminIcon>,
  Branch:   (p) => <AdminIcon {...p}><circle cx="6" cy="5" r="2.5" /><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="7" r="2.5" /><path d="M6 7.5v9M18 9.5c0 4-6 3-6 7" /></AdminIcon>,
  History:  (p) => <AdminIcon {...p}><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.5M3 4v4h4" /><path d="M12 8v4l3 2" /></AdminIcon>,
  External: (p) => <AdminIcon {...p}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></AdminIcon>,
  Drag:     (p) => <AdminIcon {...p}><circle cx="9" cy="6" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="6" r="1.3" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.3" fill="currentColor" stroke="none" /><circle cx="9" cy="18" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="18" r="1.3" fill="currentColor" stroke="none" /></AdminIcon>,
  Vision:   (p) => <AdminIcon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M3 17l5-3 4 2 3-2 6 4" /></AdminIcon>,
};

window.ICIcons = Object.assign({}, window.ICIcons, AdminIcons);
