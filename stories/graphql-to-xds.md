# GraphQL Removal → xDS: Knowing When to Cut Your Losses

## 適用 BQ 類型
- **Failure** — 團隊決策沒有早期 push back，花了大量時間 workaround 才決定放棄
- **Trade-offs** — GraphQL 的理論好處 vs 實際效能代價，以及各種 workaround 的連鎖問題
- **Impact** — 淘汰錯誤方案後催生了 xDS（專利），成為整個平台的 data layer 基礎

## Situation

In the monolithic era of our xHIS clinical platform, our frontend applications needed data from many different backend services. Each feature would make multiple API calls to assemble the data it needed, leading to excessive round trips and duplicated fetches across features. There was also no shared schema — frontend and backend teams sometimes had different assumptions about what the data looked like.

The team proposed adopting GraphQL to solve both problems: reduce query round trips by merging requests, and enforce explicit data contracts through schemas so every feature declares exactly what fields it needs.

## Task

I didn't push back on the decision at the time — the reasoning sounded solid, and I didn't foresee the issues that would come later. We adopted GraphQL and I was part of the team responsible for integrating it into our data layer.

## Action

GraphQL worked at small scale, but as our data volumes grew, we hit a serious performance wall. Schema parsing and validation overhead grew non-linearly with payload size. Even though we saved some API round trips by merging queries, the processing time for large clinical datasets — patient histories, medication records, lab results — more than offset those savings.

We spent significant effort trying to make it work:

- **JSON parse optimization** — we profiled and tuned the parsing pipeline, but the gains were marginal against the validation overhead
- **Caching stable data** — we cached relatively static data like department configs and drug catalogs, which helped for those specific queries but didn't solve the core issue with large dynamic datasets
- **Bypassing schema validation** — as a last resort, we started defining certain large queries as raw JSON, skipping GraphQL's validation entirely

That last workaround was the turning point. Once we started bypassing the schema, we lost the very benefit GraphQL was supposed to provide. We were back to the original problem — no contract between frontend and backend, no early validation, massive untyped objects being passed around. We'd come full circle, but now with the added complexity of maintaining two parallel patterns.

The team made the call to fully remove GraphQL. In its place, we designed **xDS (xHIS Data Store)** — a centralized, in-memory data store structured as a tree of clinical data nodes. Instead of features fetching and merging data through a query layer, xDS organizes data by clinical semantics — patient identity, encounter context, medication, vitals, and so on — with each node backed by its own dedicated API. Features access the fields they need directly from memory. Everyone shares the same data, fetched once, with a single source of truth.

## Result

- **Fully removed GraphQL** from the platform — eliminated the non-linear performance overhead and the maintenance burden of two parallel data patterns
- **xDS became the foundational data layer** for the entire xHIS platform, enforcing real-time patient identity consistency across all micro-frontend widgets
- The tree-structured, clinically-semantic schema design solved what GraphQL couldn't: **shared in-memory state with clear ownership boundaries**, without the parsing and validation tax
- xDS was eventually granted a **Taiwan IPO patent** for its multi-version schema tolerance and patient data consistency model
- This same data store later became the backbone of the micro-frontend platform — every widget accesses clinical context through xDS rather than fetching independently

## Key Talking Points
- **Honest about not pushing back**: 不是我提議的，但我也沒在一開始提出 concern — 這是我的 takeaway
- **Full circle moment**: 繞過 schema validation → 回到沒有 schema 的原點 → 這是決定放棄的 turning point
- **Sunk cost discipline**: 團隊花了很多時間優化，但最終有紀律地決定全面淘汰而不是繼續 patch
- **Failure led to something better**: GraphQL 的失敗直接催生了 xDS，xDS 比 GraphQL 更好因為從根源解決問題
- **xDS 的設計哲學**: 不是 query layer（GraphQL），是 data ownership layer — 按臨床語意拆 data node，in-memory shared state

## Deep Dive Topics（面試官追問用）
- **GraphQL 效能問題的細節**: schema parsing non-linear growth、profiling 數據
- **xDS tree structure**: 怎麼按臨床語意分 data node、每個 node 的 API 設計
- **Multi-version schema tolerance**: xDS 專利的核心，怎麼處理不同版本的 widget 存取同一個 data store
- **xDS 跟 micro-frontend 的關係**: xDS 是 shell-layer store，widget 透過 xdsClient 存取（in-page: props, off-page: socket）

## 記憶提示（4 個節點）

```
1. 🤔 起因：monolith 時期，太多 API round trip + 沒有 schema
   → 團隊提議 GraphQL，我沒有 push back

2. 💥 問題：大量資料下 schema parsing 不是線性成長
   → 優化：JSON parse tuning、caching、繞過 validation
   → 繞過 validation = 回到沒 schema 的原點 → full circle，決定淘汰

3. 🌳 xDS 取代：tree-structured data nodes，按臨床語意拆
   → in-memory shared state，每個 node 獨立 API
   → single source of truth，不需要 query layer

4. 📊 結果：全面移除 GraphQL → xDS 成為平台 data 基礎 → 專利
   → 後來成為 micro-frontend 的 data backbone
```

## 面試時的節奏建議

- **Situation（15 秒）**：monolith，多 API round trip + 沒 schema → 團隊選 GraphQL
- **Task（10 秒）**：我沒 push back，一起做
- **Action（1.5 分鐘）**：效能問題 → 三種 workaround → full circle moment → 決定淘汰 → 設計 xDS
- **Result（20 秒）**：xDS 成為平台基礎 + 專利
- **Failure reflection（15 秒）**：「I learned to stress-test assumptions about technology choices at scale before committing — and that removing something you invested in can be the most valuable engineering decision.」

總長 ~2.5 分鐘。

## 版本紀錄

| 日期 | 修改內容 |
|------|---------|
| 2026-04-03 | v1: 完整 STAR 初版，含 GraphQL 效能問題、三階段 workaround、full circle turning point、xDS 設計與專利 |
