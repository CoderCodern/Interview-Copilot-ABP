"use client";

import { useState } from "react";
import { Button } from "@/components/ds";
import { Icons } from "@/components/icons";
import { AdminIcons } from "./adminIcons";

const TILES: { ic: string; label: string; value: string }[] = [
  { ic: "Users", label: "Total users", value: "18,402" },
  { ic: "Activity", label: "Active · 30d", value: "11,260" },
  { ic: "Star", label: "Pro & Team", value: "2,940" },
  { ic: "TrendUp", label: "New · this week", value: "+612" },
];

// [avatar, avColor, name, email, role, plan, usagePct, statusTone, statusLabel]
type UserRow = [string, string, string, string, string, string, number, string, string];

const USERS: UserRow[] = [
  ["AK", "", "Amelia Knox", "amelia.k@acme.io", "Admin", "Team", 86, "sp-ok", "Active"],
  ["RT", "slate", "Raj Tewari", "raj@indie.dev", "Member", "Pro", 64, "sp-ok", "Active"],
  ["DS", "green", "Dana Silva", "dana.silva@mail.com", "Member", "Free", 22, "sp-ok", "Active"],
  ["MV", "amber", "Marco Vidal", "marco.v@studio.co", "Member", "Pro", 98, "sp-warn", "Near limit"],
  ["LP", "", "Lena Park", "lena.park@corp.net", "Operator", "Team", 41, "sp-ok", "Active"],
  ["TN", "slate", "Theo Nardé", "theo@freel.fr", "Member", "Free", 0, "sp-neutral", "Invited"],
  ["SY", "green", "Sora Yamada", "sora.y@design.jp", "Member", "Pro", 73, "sp-ok", "Active"],
  ["BW", "amber", "Bea Wolfe", "bea@growth.io", "Member", "Free", 12, "sp-down", "Suspended"],
];

const TABS: [string, string][] = [
  ["all", "All"],
  ["team", "Team"],
  ["pro", "Pro"],
  ["free", "Free"],
];

export function AdminUsers() {
  const [tab, setTab] = useState("all");

  return (
    <>
      <section className="kpi-row">
        {TILES.map((t) => {
          const Ic = AdminIcons[t.ic];
          return (
            <div className="kpi" key={t.label}>
              <div className="kpi-top">
                <div className="kpi-ic">
                  <Ic size={17} />
                </div>
              </div>
              <div className="kpi-label">{t.label}</div>
              <div className="kpi-value">{t.value}</div>
            </div>
          );
        })}
      </section>

      <div className="acard">
        <div className="acard-head" style={{ flexWrap: "wrap", gap: 12 }}>
          <div className="seg-ctl">
            {TABS.map(([id, l]) => (
              <button key={id} className={id === tab ? "on" : ""} onClick={() => setTab(id)}>
                {l}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="admin-search" style={{ minWidth: 200 }}>
              <Icons.Search size={15} />
              <input placeholder="Search users" />
            </div>
            <Button variant="primary" size="sm" iconLeft={<Icons.Plus size={13} />}>
              Invite
            </Button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Plan</th>
              <th style={{ width: 200 }}>AI usage · this cycle</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>
            {USERS.map((u, i) => (
              <tr key={i}>
                <td>
                  <div className="cell-2">
                    <span className={"av " + u[1]}>{u[0]}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{u[2]}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{u[3]}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: "var(--text-2)" }}>{u[4]}</td>
                <td>
                  {u[5] === "Free" ? (
                    <span className="status-pill sp-neutral" style={{ padding: "3px 10px" }}>
                      {u[5]}
                    </span>
                  ) : (
                    <span className="status-pill sp-info" style={{ padding: "3px 10px" }}>
                      {u[5]}
                    </span>
                  )}
                </td>
                <td>
                  <div className="bar-cell">
                    <div className="track">
                      <div className="fill" style={{ width: u[6] + "%", background: u[6] >= 95 ? "var(--warning)" : "var(--accent)" }} />
                    </div>
                    <span className="n">{u[6]}%</span>
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className={"status-pill " + u[7]} style={{ padding: "3px 10px" }}>
                    {u[8]}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className="icon-btn-bare" style={{ width: 30, height: 30, display: "inline-grid" }}>
                    <Icons.Dots size={15} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="acard-foot">
          <span className="hint">Showing 8 of 18,402 users</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span className="icon-btn-bare" style={{ width: 30, height: 30 }}>
              <Icons.ChevronRight size={15} style={{ transform: "rotate(180deg)" }} />
            </span>
            <span className="icon-btn-bare" style={{ width: 30, height: 30 }}>
              <Icons.ChevronRight size={15} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
