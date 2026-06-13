/* Chat — the AI conversation surface, used for both the live Mock
   Interview and the AI Assistant. Streaming-style typing indicator,
   suggestion pills, and a soft composer. */
const { Button, Badge, IconButton } = window.InterviewCopilotDesignSystem_d59c8c || {};

const SCRIPTS = {
  mock: {
    persona: "System Design · Stripe persona",
    greeting: "Let's begin. Design a payments ledger that stays correct under retries and partial failures. Start with the core data model — what are your entities and their invariants?",
    suggestions: ["Walk through the data model", "Ask about scale targets", "I'd like a hint"],
    reply: "Good — double-entry with append-only transactions is the right instinct. Now: a client retries a charge after a timeout but the original actually succeeded. How does your design guarantee it isn't applied twice?",
  },
  assistant: {
    persona: "AI Assistant",
    greeting: "I've read your resume, the Stripe JD, and your prep notes. Ask me anything — I can draft STAR stories, explain a concept, or quiz you.",
    suggestions: ["Draft a STAR story for conflict", "Explain idempotency keys", "Quiz me on consistency"],
    reply: "Here's a STAR frame from your billing migration:\n\nSituation — a 40k req/min legacy system needed a zero-downtime cutover.\nTask — migrate without dropping or double-charging.\nAction — dual writes behind a feature flag, idempotency keys, shadow reconciliation.\nResult — cut over with zero incidents; p95 latency dropped 30%.",
  },
};

function Chat({ mode = "assistant" }) {
  const I = window.ICIcons;
  const cfg = SCRIPTS[mode];
  const [messages, setMessages] = React.useState([{ from: "ai", text: cfg.greeting }]);
  const [draft, setDraft] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const streamRef = React.useRef(null);

  React.useEffect(() => {
    setMessages([{ from: "ai", text: cfg.greeting }]);
  }, [mode]);

  React.useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages, typing]);

  const send = (text) => {
    const t = (text || draft).trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "ai", text: cfg.reply }]);
    }, 1400);
  };

  return (
    <div className="surface" style={{ padding: "20px 24px", display: "flex", flexDirection: "column", height: "calc(100vh - 168px)", minHeight: 520 }}>
      <div className="spread" style={{ paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
        <div className="row" style={{ gap: "11px" }}>
          <div className="msg-avatar" style={{ width: 34, height: 34 }}>{mode === "mock" ? <I.Mic size={16} /> : <I.Sparkle size={16} />}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>{mode === "mock" ? "Mock Interview" : "Copilot Assistant"}</div>
            <div className="dim" style={{ fontSize: "11.5px" }}>{cfg.persona}</div>
          </div>
        </div>
        <div className="row" style={{ gap: "10px" }}>
          {mode === "mock" && <Badge tone="danger"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} /> Recording</Badge>}
          <IconButton label="Settings" variant="outline" size="sm"><I.Settings size={15} /></IconButton>
        </div>
      </div>

      <div className="chat-stream" ref={streamRef}>
        {messages.map((m, i) => (
          <div className={"msg " + m.from} key={i}>
            <div className="msg-avatar">{m.from === "ai" ? (mode === "mock" ? <I.Mic size={15} /> : <I.Sparkle size={15} />) : "C"}</div>
            <div className="msg-bubble">
              {m.from === "ai" && <div className="label">{mode === "mock" ? "Interviewer" : "Copilot"}</div>}
              <div style={{ whiteSpace: "pre-line" }}>{m.text}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="msg ai">
            <div className="msg-avatar">{mode === "mock" ? <I.Mic size={15} /> : <I.Sparkle size={15} />}</div>
            <div className="msg-bubble"><div className="typing-dots"><i /><i /><i /></div></div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="pills">
          {cfg.suggestions.map((s, i) => <div className="pill" key={i} onClick={() => send(s)}>{s}</div>)}
        </div>
      )}

      <div className="chat-composer" style={{ marginTop: "14px" }}>
        <textarea
          className="chat-input"
          rows={1}
          placeholder={mode === "mock" ? "Type your answer…" : "Ask the Copilot anything…"}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <Button variant="primary" size="sm" onClick={() => send()} iconRight={<I.Send size={13} />}>Send</Button>
      </div>
    </div>
  );
}

window.Chat = Chat;
