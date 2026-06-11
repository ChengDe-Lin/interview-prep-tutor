# Bias For Action

## HR 想確認什麼

你是不是會主動 ownership，能提前看到問題，而不是等別人指定任務。

## 主故事

HAL to Add-on API

參考：

- `stories/hal-to-addon-api.md`

## 備用故事

- GraphQL to xDS
- Agentic Product Development Workflow

## SA 角度

這題很適合講「我回頭推翻自己的設計」。這比一般 ownership 更有說服力：

- HAL 是你原本設計的。
- 一開始合理，但後來 scale 不起來。
- 你沒有 defend 自己的設計。
- 你主動提出 add-on API，讓維護成本從 O(n) 變 O(1)。

## Opening STAR 口說稿

> One example of bias for action is when I revisited my own design for hospital integrations.
>
> In the beginning, I designed a Hospital Abstraction Layer to handle different hospital APIs. Each hospital had different vendors, formats, and authentication flows, so the abstraction made sense for the first hospital.
>
> But when we started onboarding more hospitals, I saw the problem. The model did not scale well. If a vendor changed an API, we had to patch each hospital's package separately. The maintenance cost was growing with the number of hospitals.
>
> The important part is that this was my own design. I could have defended it or waited until it became a bigger problem. But after building the micro-frontend and add-on module framework, I realized the same idea could be applied to integrations.
>
> I proposed moving from a hospital-specific package model to independent add-on API modules. Each vendor integration became a runtime-loadable module with a shared schema. If one vendor changed, we updated one module, and every hospital using that vendor could benefit.
>
> The result was that maintenance moved from O(n) to O(1) for shared vendor integrations. My lesson was that ownership sometimes means improving or replacing your own earlier design when you see a better path.

## 追問準備

如果問「這跟 SA 有什麼關係」：

> In customer-facing work, I think the same mindset matters. If the first solution does not scale, we need to be honest about it early, reframe the problem, and guide the customer toward a better architecture.

