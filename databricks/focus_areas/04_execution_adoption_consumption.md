# Execution & Driving Adoption / Consumption

## HR 想確認什麼

你是不是能推動 adoption、移除 blocker、交付 measurable outcome。對 Databricks 來說，這也會連到 customer consumption / usage growth。

## 主故事

Micro-Frontend Transformation

參考：

- `stories/micro-frontend-transformation.md`
- `databricks/sa_pitch.md`

## 備用故事

- Agentic Product Development Workflow

## SA 角度

這題不要只講 architecture。要講 migration / adoption：

- 20 engineers。
- over 200 widgets。
- 46% delivery speed improvement。
- 58% defect age reduction。
- 長期支撐多院部署。
- 你移除 developer adoption 的 blocker。

## Opening STAR 口說稿

> One strong example of execution and adoption is our micro-frontend transformation.
>
> Our clinical applications had become deeply coupled, and one dependency issue nearly caused a serious medication problem. At the same time, we needed a better architecture to support more hospitals and more independent feature development.
>
> I took ownership of the architecture direction, built the framework, and helped around 20 engineers migrate the system into over 200 independently deployable widgets.
>
> The hardest part was adoption. Teams were worried that the migration would take too much time and that the architecture would be too complex. So I focused heavily on developer experience. I gave different kinds of widgets the same development model, provided a simulator for testing, and hid the module loading complexity behind the framework.
>
> At the time of the migration, we measured a 46% improvement in feature delivery speed and a 58% reduction in defect age. But the bigger value came later. As more independent widgets were built, the benefit kept increasing, and the architecture became one of the key reasons we could scale the platform across multiple hospitals.
>
> My lesson was that architecture only matters if teams can actually adopt and maintain it. So execution is not just shipping the design. It is removing the blockers that stop people from using it.

## 追問準備

如果問「你怎麼處理 resistance」：

> I worked with teams one by one to find incremental migration paths. I also tried to make the new framework feel close to normal feature development, so teams did not need to understand all the internal complexity before they could start.

