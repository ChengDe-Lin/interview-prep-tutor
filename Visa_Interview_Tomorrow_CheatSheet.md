# Visa Interview Tomorrow — Cheat Sheet
**Date**: 2026-05-07, 3pm  
**Interviewer**: Andrea (Recruiter)  
**Format**: 30-min phone/video screen

---

## 🎯 Version 1: Bullet Points（主要用這個，自己加話）

### Q1: "Walk me through your background and why Visa?"

**Opening (15 sec)**
```
• Senior SWE at ASUS, clinical platform for hospitals
• Two focuses: modular architecture + AI agents for non-technical users
```

**Credentials (20 sec)**
```
• NTU AI program, graduated 1st in class
• Fast-track to Senior (2 years vs 4-5 avg)
• Peer-voted collaboration award
• 2 IPO patents
```

**Key Achievement — AI Agentic (45 sec)**
```
• Built agentic dev ecosystem
• Designers/PMs prompt-generate widgets (no engineer needed)
• Result: 75% reduction in iteration time
• 20+ MCP tools, LLM orchestration (LangGraph)
• Multi-source RAG: 91% recall
```

**Why Visa (30 sec)**
```
• Visa building AI productivity for sales teams
• I built same thing for designers
• Same problem, Visa scale across APAC
• Visa Intelligent Commerce launched 2025 — shows ambition in AI
• Excited to bring this expertise to Digital Sales AI team
```

---

### Q2: "Tell me about your AI Observability experience"

**RAG Support Agent Story (2 min)**
```
Situation:
• Built multi-source RAG support agent for xHIS platform
• Needed to ensure production reliability

What I built:
• Basic metrics: 91% recall, user like/dislike
• Trace logging: each answer logs which docs/embeddings used
• Auto-learning pipeline:
  - New ticket → PM/Sales notified
  - Issue solved → AI auto-fetches ticket into RAG
  - AI comments what it learned (human review)
• PM/Sales can maintain knowledge base (no engineer needed)

Result:
• Closed-loop learning: ticket → RAG → agent improves
• Caught quality degradation after schema change → fixed embedding strategy
• Pattern: instrument → measure → surface insights → iterate
```

---

### Q3: Salary Expectation (if asked)

**First response (反問)**
```
"I'm focused on finding the right role fit first. 
Could you share what Visa has budgeted for this position?"
```

**If they insist you go first**
```
"Based on my research for AI Engineer roles in Singapore and the scope 
of this foundational role, I'm looking at SGD 240-280K total comp. 
But I'm open to discussing the full package."
```

**If they ask current TC**
```
"I'm currently around SGD 230K total comp, but I'm looking for a meaningful 
step up given this is a foundational role with significant scope."
```

---

## 📝 Version 2: Full Script（備用，可以參考但別逐字唸）

### Q1 Full Script

```
Hi, I'm ChengDe. I'm a Senior Software Engineer at ASUS Intelligent Cloud Service, 
working on a clinical platform used in hospitals across Taiwan. My focus has been 
on two things: making the architecture modular enough to scale easily, and creating 
AI agents that let non-technical users build on top of the platform.

I became a software engineer right after graduating first in my class from NTU's 
AI program, and was promoted to Senior Engineer in about half the usual timeline. 
I was voted by my peers for a cross-team collaboration award, and I've been hosting 
internal AI seminars that helped spread new ideas across teams — and a few of those 
ideas actually worked out. I also co-invented two IPO patents around these works.

It's really worth mentioning the agentic development workflow I built recently. 
Now, designers and PMs can describe what they want, and the AI generates deployable 
widgets — no engineer in the loop anymore. That reduced their iteration time by 
about 75%.

Along the journey of developing different AI agents to solve problems in different 
areas, I clearly realized that this is the future of engineering and what I want 
to dive into. Knowing that Visa launched Intelligent Commerce for APAC last year 
shows the company's real ambition in AI. I'm excited to bring my expertise to Visa 
and impact the industry — or even the world.
```

---

### Q2 Full Script (AI Observability)

```
I'll give you a concrete example from the RAG support agent I built at ASUS.

We built a multi-source RAG agent to answer xHIS operational queries. But I realized 
traditional observability wasn't enough — we needed a closed-loop system where the 
agent could learn from production failures.

So I built a multi-layer observability system. First, basic metrics — we tracked 
retrieval recall, achieved 91%, and user like/dislike ratings.

Second, trace logging — every agent reply logs which documents and embeddings it 
referenced from RAG. So if an answer is wrong, we can trace back to exactly which 
knowledge it used.

Third — and this is the key differentiator — we built an auto-learning pipeline 
tied to our issue ticket system. When a new support ticket gets created, it means 
a user hit a problem the agent couldn't solve. PMs and Sales get notified. When 
the issue is resolved, the AI agent automatically fetches the ticket content, 
processes it into the RAG knowledge base, and comments what it learned for human 
review.

This created bi-directional traceability. Humans can trace agent replies back to 
source documents, and they can update the knowledge base via tickets. Non-technical 
stakeholders like PMs and Sales can now monitor and control the agent's knowledge 
without touching code.

The result: we closed the loop between production failures and knowledge updates. 
The agent gets smarter every time a ticket is resolved. For example, when retrieval 
quality degraded after a schema change, our monitoring caught it immediately, and 
we adjusted our embedding strategy.

That's the pattern I always follow: observability isn't just dashboards — it's 
building systems that learn and improve from production data.
```

---

## ❓ Questions YOU Ask Andrea (就問這兩個)

**Question 1:**
```
"What does success look like in Year 1 for this role?"
```
→ 讓 recruiter 告訴你 priorities、期待什麼

**Question 2:**
```
"What's the biggest challenge someone new to this role typically faces?"
```
→ 實用、顯示你想提前準備、recruiter 能從過去 candidates 經驗回答

---

**Backup questions (如果還有時間):**

3. **"This is listed as a new, foundational role — what's the initial 90-day expectation?"**

4. **"How does this role partner with Visa's Data Science COE and Product teams?"**

---

## 🎯 Key Numbers to Remember

```
✅ 91% recall (RAG system)
✅ 75% reduction (designer iteration time)
✅ 2 patents (xDS, xEmulator)
✅ 20+ MCP tools
✅ 46% faster feature delivery (micro-frontend)
✅ 2 years to Senior (vs 4-5 avg)
✅ SGD 240-280K (target salary range)
```

---

## 🚨 Red Flags to Avoid

❌ Don't say "I don't have sales experience" (frame as transferable: internal users)  
❌ Don't say "I've never used Dynamics 365" unprompted (only if asked)  
❌ Don't say "I'm flexible on salary" (sounds desperate)  
❌ Don't talk too fast (you do this when nervous - slow down)  
❌ Don't forget to ask YOUR questions at the end

---

## ✅ Green Flags to Hit

✅ Mention "AI Observability" (your differentiator)  
✅ Mention "Visa Intelligent Commerce APAC" (shows research)  
✅ Mention "closed-loop learning" (sophisticated concept)  
✅ Mention specific numbers (91%, 75%, 2 patents)  
✅ Show enthusiasm but stay professional (7/10 energy)

---

## ⏰ Timeline

**15 min before (2:45pm)**
- Re-read this cheat sheet
- Deep breath
- Remind yourself: "This is practice for Apple. Low stakes."

**During interview**
- Glance at bullet points (not full script)
- Pause 2 sec before answering (shows you're thinking)
- Smile (they can hear it in your voice even on phone)

**After interview**
- Note down what went well / what to improve
- Don't overthink it
- Move on to next application (Google, Microsoft, Stripe)

---

## 💪 Final Confidence Boost

**You have:**
- ✅ 5 years AI/ML experience (M.Sc. + 4 yrs industry)
- ✅ Patent-grade reliability design (xDS, xEmulator)
- ✅ AI Observability expertise (most candidates don't have this)
- ✅ Proven impact (91% recall, 75% reduction, 2x delivery speed)
- ✅ Internal referral (already pre-screened)

**Visa recruiter's pass rate for someone with your profile: 80%+**

You're not hoping to pass. You're deciding if Visa's offer is good enough.

---

**Now go sleep. 明天 3pm 你會發現：「欸，我準備的都用上了。」**
