/* Login — Interview Copilot auth screen.
   The mouse-scrub video fills the whole page as a background; the
   sign-in form floats centered over it on a translucent gradient
   (frosted) card. Submitting routes to the app Dashboard, completing
   the Landing → Login → Dashboard flow. */
/* DS components are read at render time, inside each component, so the
   read never depends on the bundle's module evaluation order. */

function useScrubVideo(sensitivity = 0.9) {
  const ref = React.useRef(null);
  const s = React.useRef({ prevX: null, target: 0, seeking: false });
  React.useEffect(() => {
    const v = ref.current;
    function onMove(e) {
      if (!v || !v.duration || isNaN(v.duration)) { s.current.prevX = e.clientX; return; }
      if (s.current.prevX == null) { s.current.prevX = e.clientX; return; }
      const delta = e.clientX - s.current.prevX;
      s.current.prevX = e.clientX;
      let t = s.current.target + (delta / window.innerWidth) * sensitivity * v.duration;
      t = Math.max(0, Math.min(v.duration, t));
      s.current.target = t;
      if (!s.current.seeking) { s.current.seeking = true; v.currentTime = t; }
    }
    function onSeeked() {
      if (!v) return;
      if (Math.abs(v.currentTime - s.current.target) > 0.01) v.currentTime = s.current.target;
      else s.current.seeking = false;
    }
    window.addEventListener("mousemove", onMove);
    if (v) v.addEventListener("seeked", onSeeked);
    return () => { window.removeEventListener("mousemove", onMove); if (v) v.removeEventListener("seeked", onSeeked); };
  }, [sensitivity]);
  return ref;
}

const GoogleMark = () => (
  <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.6 13.2l7.9 6.1C12.3 13.2 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-17.4z"/><path fill="#FBBC05" d="M10.5 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.9-6.1C1 16.1 0 19.9 0 24s1 7.9 2.6 11.4l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.3-5.5l-7.4-5.7c-2 1.4-4.7 2.3-7.9 2.3-6.4 0-11.7-3.7-13.6-9.8l-7.9 6.1C6.4 42.6 14.6 48 24 48z"/></svg>
);

function Login() {
  const { Button, Input, Checkbox } = window.InterviewCopilotDesignSystem_d59c8c;
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

  const goToApp = () => { window.location.href = "../app/index.html"; };
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(goToApp, 750); // simulate auth, then land on the Dashboard
  };

  return (
    <div className="auth">
      {/* Full-bleed scrub-video background */}
      <video
        ref={videoRef}
        className="auth-bg-video"
        muted playsInline preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
      />
      <div className="auth-bg-scrim" />

      {/* Robot mascot overlay — closes its eyes (-_-) while you type */}
      <div className={"robot-face" + (typing ? " closed" : "")} aria-hidden="true">
        <span className="eye" />
        <span className="eye" />
      </div>

      {/* Top bar over the background */}
      <a className="auth-brand" href="index.html">
        <div className="auth-mark">i<span>c</span></div>
        <span>Interview Copilot</span>
      </a>
      <div className="auth-hint"><I.Sparkle size={12} /> Move your cursor to scrub the scene</div>

      {/* Centered frosted form card */}
      <main className="auth-stage">
        <div className="auth-card">
          <div className="auth-eyebrow">{isReg ? "Get started" : "Welcome back"}</div>
          <h1 className="auth-title">{isReg ? <>Create your <em>prep</em>.</> : <>Sign in to your <em>prep</em>.</>}</h1>
          <p className="auth-sub">{isReg
            ? "Bring a resume and a target role — we'll build your plan."
            : "Your dashboard, plan and mock sessions are right where you left them."}</p>

          <Button variant="secondary" fullWidth iconLeft={<GoogleMark />} style={{ marginTop: "22px" }} onClick={goToApp}>
            Continue with Google
          </Button>
          <div className="auth-divider"><span>or with email</span></div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {isReg && (
              <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Coder Codern" icon={<I.User size={15} />} />
            )}
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" icon={<I.User size={15} />} />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: 550, color: "var(--text)" }}>Password</label>
                {!isReg && <a href="#" style={{ fontSize: "12px", color: "var(--accent-deep)", fontWeight: 500 }}>Forgot?</a>}
              </div>
              <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••••" icon={<I.Shield size={15} />} />
            </div>
            {!isReg && (
              <Checkbox checked={remember} onChange={() => setRemember(!remember)} label="Keep me signed in" />
            )}
            <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}
              iconRight={loading ? null : <I.Arrow size={14} />} style={{ marginTop: "4px" }}>
              {loading ? (isReg ? "Creating…" : "Signing in…") : (isReg ? "Create account" : "Sign in")}
            </Button>
          </form>

          <p className="auth-foot">
            {isReg ? "Already have an account? " : "New here? "}
            <a href="#" onClick={(e) => { e.preventDefault(); setMode(isReg ? "login" : "register"); }}>
              {isReg ? "Sign in" : "Create an account"}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

window.ICLogin = Login;
