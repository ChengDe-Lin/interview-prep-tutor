# HAL → Add-on API: Iterating on My Own Design

## 適用 BQ 類型
- **Failure** — 承認自己當初眼界不夠，設計了一個 scale 不了的方案，後來自己推翻它
- **Growth** — 從 package-level 思維成長到 platform-level 思維，回頭優化過去的設計
- **Trade-offs** — 當初 HAL 是合理的選擇，但 add-on module 精神帶來根本性的架構升級

## Situation

Our clinical platform xHIS needed to integrate with each hospital's existing systems — appointment scheduling, patient lookup, prescription APIs, and so on. The challenge was that every hospital had different APIs, often from different third-party vendors. Some used SOAP, some REST, and each had their own data formats and authentication flows.

When we onboarded our first hospital, I designed HAL — Hospital Abstraction Layer — a frontend package that defined general interfaces for common hospital operations. For each hospital, we'd implement the transform logic inside that package to normalize their specific API formats into our standard interface. It also handled credential management and CORS bypass through our Electron layer.

## Task

HAL worked fine for the first hospital. But when we started onboarding the second hospital, the pain became clear: we were essentially rewriting parts of the entire package for each new institution. If a vendor updated their API, we had to patch every hospital's copy of the package individually. The coupling wasn't in our code — it was in the deployment model. Every hospital carried its own full copy of the transform logic, even when multiple hospitals used the same vendor.

At that point, I didn't yet have a better solution. It was only later — after I'd architected the micro-frontend platform and the add-on module framework — that I looked back at HAL and realized the same decoupling principles could fundamentally improve it.

## Action

I proposed replacing HAL with what we called add-on APIs — applying the same philosophy as our add-on module framework. Instead of bundling all transform logic into a single package per hospital, we extracted each integration into an independent, runtime-loadable module hosted through our marketplace service.

The key design: everyone develops against a unified add-on API schema — the interface contract stays the same. But behind each schema, there can be multiple implementations for different vendors. Each hospital simply configures which modules to load based on their specific vendor stack. Authentication was offloaded to a dedicated API gateway, removing another piece of coupling from the integration layer.

The team was receptive — everyone agreed it was the right direction. And because the original APIs were already relatively independent operations, the extraction was clean. AI tooling also helped accelerate the migration significantly.

## Result

- **Maintenance cost dropped from O(n) to O(1)**: when a vendor updates their API, we update one module and every hospital using that vendor gets the fix automatically — instead of patching each hospital's package individually
- Each hospital can **independently swap or update individual integrations** without touching anything else — a vendor change no longer requires a full package rewrite
- New hospital onboarding becomes a matter of **composing existing modules** rather than implementing from scratch — if the hospital uses vendors we've already integrated, the work is minimal
- The architecture enforces a **single source of truth** per vendor integration, eliminating the drift that inevitably happens when multiple copies of the same logic exist across hospitals

## Key Talking Points
- **Honest self-critique**: HAL 是我自己設計的，也是我自己提出要推翻的。不是別人指出問題
- **"I didn't know what I didn't know"**: 當初沒有 platform 思維，package 是合理的選擇。眼界升級後才看到更好的路
- **Micro-frontend 精神的延伸**: add-on API 跟 add-on module 是同一個 decoupling 哲學，從 UI 延伸到 integration layer
- **O(n) → O(1)**: 維護成本的本質改變，不只是效率提升
- **Not triggered by crisis**: 不是 HAL 爆掉才改的，是做完 platform 後主動回頭審視

## Deep Dive Topics（面試官追問用）
- **HAL 原本的架構細節**: credential encryption flow, CORS interceptor via Electron main process
- **Add-on API schema 怎麼定義的**: 怎麼決定什麼是 general interface、怎麼處理 edge case
- **Runtime loading 機制**: marketplace service 怎麼 host、怎麼做版本管理
- **跟 micro-frontend add-on module 的關係**: 同一套 framework 還是獨立實作？

## 記憶提示（4 個節點）

```
1. 🏥 HAL v1：前端 package，定義 general interface，每間醫院實作 transform
   → 第一間 OK，第二間開始痛——整包 rewrite、廠商改版每間都要 patch

2. 💡 Trigger：做完 micro-frontend + add-on module framework 後
   → 回頭審視 HAL，發現可以用同樣的 decoupling 精神重構

3. 🔧 Add-on API：每個 integration 拆成獨立 runtime module
   → 統一 schema、多種實作、marketplace host、hospital 自由抽換

4. 📊 結果：O(n) → O(1) 維護成本
   → 廠商改版只改一個 module，所有醫院自動受惠
   → Single source of truth，不再有 copy drift
```

## 面試時的節奏建議

- **Situation（20 秒）**：醫院 API 很亂，我設計了 HAL 來統一
- **Task（15 秒）**：第二間醫院開始痛，但當時沒有更好的方案
- **Action（1 分鐘）**：做完 micro-frontend 後回頭看，提出 add-on API，拆成獨立 runtime module
- **Result（20 秒）**：O(n) → O(1)、single source of truth、新醫院 onboard 變成 compose existing modules
- **Failure reflection（15 秒）**：「I didn't have the platform perspective back then — and that's exactly why I built one.」

總長 ~2.5 分鐘。最後那句 reflection 是 closing punch line。

## 版本紀錄

| 日期 | 修改內容 |
|------|---------|
| 2026-04-03 | v1: 完整 STAR 初版，含 HAL 架構、add-on API 重構、O(n)→O(1) 維護成本、failure reflection |
