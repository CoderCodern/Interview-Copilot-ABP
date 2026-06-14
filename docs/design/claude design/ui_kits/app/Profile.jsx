/* Profile — account details, target role, and preferences. Editable
   form fields, notification switches and connected accounts. */
const { Button, Input, Select, Switch, Avatar, Badge, Tag } = window.InterviewCopilotDesignSystem_d59c8c || {};

function Profile() {
  const I = window.ICIcons;
  const [name, setName] = React.useState("Coder Codern");
  const [email, setEmail] = React.useState("coder@example.com");
  const [role, setRole] = React.useState("Senior Backend Engineer");
  const [notif, setNotif] = React.useState({ sessions: true, digest: true, nudges: false });

  return (
    <div className="two-col">
      <div className="stack">
        <div className="surface" style={{ padding: "22px" }}>
          <div className="row" style={{ gap: "16px", marginBottom: "20px" }}>
            <Avatar name="Coder Codern" size={56} />
            <div style={{ flex: 1 }}>
              <div className="serif-h" style={{ fontSize: "18px" }}>Coder Codern</div>
              <div className="muted" style={{ fontSize: "12.5px", marginTop: "2px" }}>Member since 2024 · Pacific Time</div>
            </div>
            <Button variant="ghost" size="sm" iconLeft={<I.Edit size={13} />}>Change photo</Button>
          </div>
          <div className="grid-2" style={{ gap: "16px" }}>
            <Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="surface" style={{ padding: "22px" }}>
          <div className="eyebrow" style={{ marginBottom: "16px" }}>Target role</div>
          <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
            <Input label="Role you're preparing for" value={role} onChange={(e) => setRole(e.target.value)} />
            <Select label="Experience level" defaultValue="senior">
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="staff">Staff / Principal</option>
            </Select>
            <Select label="Target date" defaultValue="2w">
              <option value="1w">Within 1 week</option>
              <option value="2w">Within 2 weeks</option>
              <option value="1m">Within a month</option>
            </Select>
            <Select label="Focus area" defaultValue="sd">
              <option value="sd">System design</option>
              <option value="coding">Coding</option>
              <option value="bal">Balanced</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <span className="dim" style={{ fontSize: "12px", alignSelf: "center", marginRight: "2px" }}>Preferred companies:</span>
            <Tag tone="accent" removable onRemove={() => {}}>Stripe</Tag>
            <Tag tone="neutral" removable onRemove={() => {}}>Plaid</Tag>
            <Tag tone="neutral" removable onRemove={() => {}}>Adyen</Tag>
            <button className="pill"><I.Plus size={12} /> Add</button>
          </div>
          <div className="spread" style={{ marginTop: "22px" }}>
            <span className="dim" style={{ fontSize: "12px" }}>Changes save automatically.</span>
            <Button variant="primary" size="sm" iconRight={<I.Check size={13} stroke={3} />}>Save changes</Button>
          </div>
        </div>
      </div>

      <div className="stack">
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "4px" }}>Notifications</div>
          {[
            ["sessions", "Session reminders", "Before each study block & mock"],
            ["digest", "Weekly digest", "Progress summary every Sunday"],
            ["nudges", "Streak nudges", "A gentle ping if you go quiet"],
          ].map(([k, t, d]) => (
            <div className="set-row" key={k}>
              <div>
                <div className="set-k">{t}</div>
                <div className="set-d">{d}</div>
              </div>
              <Switch checked={notif[k]} onChange={(v) => setNotif((n) => ({ ...n, [k]: v }))} />
            </div>
          ))}
        </div>

        <div className="surface" style={{ padding: "20px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "8px" }}>Connected accounts</div>
          {[["LinkedIn", "Imports roles you're targeting", true], ["Google Calendar", "Syncs your study blocks", true], ["GitHub", "Surfaces relevant projects", false]].map(([t, d, on], i) => (
            <div className="set-row" key={i}>
              <div className="row" style={{ gap: "12px" }}>
                <div className="fact-ico"><I.Link size={15} /></div>
                <div>
                  <div className="set-k">{t}</div>
                  <div className="set-d">{d}</div>
                </div>
              </div>
              {on ? <Badge tone="success"><I.Check size={9} stroke={3} /> Linked</Badge> : <Button variant="ghost" size="sm">Connect</Button>}
            </div>
          ))}
        </div>

        <div className="surface" style={{ padding: "18px 22px" }}>
          <div className="spread">
            <div>
              <div className="set-k">Plan</div>
              <div className="set-d">Pro · renews Jul 1</div>
            </div>
            <Button variant="ghost" size="sm">Manage</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Profile = Profile;
