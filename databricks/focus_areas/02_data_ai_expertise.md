# Data & AI Industry Expertise

## HR 想確認什麼

你能不能講清楚真實世界的 architecture、design decision、trade-off，而且有技術深度，不只是說自己對 AI 有興趣。

## 主故事

RAG / Chatbot / Knowledge Assistant + Databricks 連結

參考：

- `databricks/sa_pitch.md`
- `databricks/product_anchors.md`

## 備用故事

- GraphQL to xDS
- Micro-Frontend Transformation

## SA 角度

這題可以把你的 RAG / chatbot 經驗跟 Databricks 產品方向連起來：

- chatbot 不是只有 fluent answer。
- 核心是找到 right context。
- context 要 fresh。
- 權限要對。
- internal user 和 customer 看到的資料不同。
- 這自然連到 Unity Catalog / governed data / AI Search / Mosaic AI。

## Opening STAR 口說稿

> One area where I learned a lot about real AI architecture is RAG and chatbot-style systems.
>
> We worked on both internal knowledge Q&A and product-facing customer support. At first, it is easy to think the main challenge is whether the model can generate a good answer. But in practice, the harder problem is whether the system can find the right context, keep that context fresh, respect permissions, and stay reliable for real users.
>
> Governance became a very concrete issue for us. For example, when PMs search product knowledge, we may want them to see internal context, including past incidents or known issues, because that helps them understand the product deeply. But customers should not see the same information, because it could create unnecessary concern or expose internal problems. So the same knowledge base needs different context and access rules for different users.
>
> That experience made Databricks more interesting to me. I started to see why a governed data foundation matters for AI. It is not just about the model. The model needs trusted data, good retrieval, access control, freshness, evaluation, and a path to production.
>
> I also agree with the broader direction Databricks has been pushing around data and LLMs. In the future, general model capability may become less of a bottleneck. More companies will want AI systems that understand their own domain, workflows, and private data. That could be through fine-tuning, RAG, or other ways of adapting models to company context. To do that well, the foundation is still data: how it is stored, governed, searched, evaluated, and connected to production AI workflows.

## 追問準備

如果問「你怎麼設計 RAG architecture」：

> I would start from the knowledge sources, freshness requirement, permission model, retrieval strategy, evaluation set, and user workflow. The model is only one layer. The harder part is usually context quality and governance.

