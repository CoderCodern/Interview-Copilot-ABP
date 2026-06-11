# Prompt Template Catalog

Runtime source of truth: `ai.prompt_templates` (DB, versioned, admin-managed). This catalog documents intent, variables, and routing hints so prompt work is reviewable. Seed data mirrors this file.

| Key | Purpose | Declared variables | Hints (initial) |
|---|---|---|---|
| `resume.parse` | Structured extraction: resume text → skills/experiences/educations JSON | `resume_text` | Claude · json mode · temp 0 · fallback allowed |
| `resume.profile-merge` | Merge new parse into existing profile narrative (headline/summary) | `current_profile`, `new_parse` | Claude · temp 0.3 |
| `jd.analyze` | JD text → requirements (type, skill, importance), seniority, metadata | `jd_text` | Claude · json mode · temp 0 · fallback allowed |
| `jd.skill-gap` | Requirements + profile snapshot → gaps, severities, recommendations, match score | `requirements`, `profile_snapshot`, `deterministic_matches` | Claude · json mode |
| `company.research` | Company name/context → culture, hiring process, interview style, values insights | `company_name`, `company_context`, `role_context` | Claude · temp 0.4 |
| `company.summarize` | Condense research into card summary | `insights` | cheap-class model |
| `prep.plan.generate` | Requirements + gaps + insights + window → day-by-day plan items | `jd_summary`, `gaps`, `insights`, `target_date`, `daily_minutes`, `rag_context` | Claude · json mode |
| `prep.questions.generate` | Generate N questions per category/difficulty for a JD | `jd_summary`, `categories`, `difficulty`, `count`, `company_style` | Claude · json mode |
| `prep.star.generate` | Question + user's real experience (RAG) → STAR draft | `question`, `profile_snapshot`, `rag_context` | Claude · temp 0.5 |
| `prep.tips.generate` | Contextual tips for plan/category | `plan_context`, `category` | cheap-class model |
| `mock.interviewer.system` | System persona for live interviewer (style, seniority, focus, rules) | `persona`, `jd_summary`, `question_plan`, `rag_context` | Claude · streaming · **no fallback** |
| `mock.turn.feedback` | Single answer → quick rubric score + note | `question`, `answer`, `rubric` | cheap-class · json mode |
| `mock.session.feedback` | Full transcript → rubric scores, strengths, improvements, recommendation | `transcript`, `rubric`, `jd_summary` | Claude · json mode |
| `knowledge.summarize` | Long document → indexed summary chunk | `document_text` | cheap-class |
| `dashboard.daily-focus` | Plan state + weak areas → today's focus card (title + lede) | `plan_state`, `readiness`, `recent_activity` | cheap-class · temp 0.6 |

Conventions: user-provided text always enters as delimited data in user-role messages (prompt-injection rule, see 07-security.md §4); every template declares variables — renderer rejects undeclared usage; changes = new version + snapshot-test diff review.
