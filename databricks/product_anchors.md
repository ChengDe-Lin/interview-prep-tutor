# Databricks Product Anchors

這份不是用來背產品細節，而是幫你回答 Why Databricks / Why SA 時有幾個穩定 anchor。

## 你只需要先記這 5 個點

## 0. 產品名稱先記這幾個

- `Data Intelligence Platform`：Databricks 現在更大的 platform positioning。
- `Lakehouse`：底層 data architecture / data foundation。
- `Unity Catalog`：governance / access control / lineage / audit。
- `Mosaic AI`：Databricks 的 AI / ML / GenAI 能力集合。
- `Databricks AI Search`：RAG / search / retrieval 相關能力。
- `Model Serving`：deploy、govern、query AI/ML models 的 serving layer。

口說時不要一次丟太多名詞。最自然的組合是：

> What I like is the combination of the Data Intelligence Platform and Mosaic AI: governed data, AI Search, model serving, evaluation, and production workflows in one platform.

## 1. Lakehouse 是 Databricks 的核心架構故事

Databricks 官方文件說，lakehouse 結合 data lake 和 data warehouse 的好處，目標是減少不同 workload 的孤島，例如 BI、ML、data engineering 各自一套系統。

可直接說的英文：

> The lakehouse is interesting to me because it reduces fragmentation. It gives companies one foundation for data engineering, BI, ML, and AI instead of forcing each team to build on separate systems.

官方參考：

- https://docs.databricks.com/aws/en/lakehouse/

## 2. Delta Lake + Unity Catalog 是 foundation

Databricks 文件把 Delta Lake 和 Unity Catalog 放在 lakehouse 的關鍵技術裡：

- Delta Lake：可靠的 storage layer，支援 ACID transactions / schema enforcement。
- Unity Catalog：data and AI governance，包含 access control、lineage、discovery。

你不需要講很深，但要知道這兩個詞。

可直接說的英文：

> What I understand is that Delta Lake gives reliability at the storage layer, and Unity Catalog gives unified governance across data and AI assets.

官方參考：

- https://docs.databricks.com/aws/en/lakehouse/
- https://docs.databricks.com/aws/en/lakehouse-architecture/data-governance/

## 3. Databricks 的重點不是只有 AI model，而是 enterprise AI productionization

企業 AI 會卡在：

- data quality
- data access
- lineage
- governance
- evaluation
- monitoring
- prototype 到 production 的落差

這跟你的 agentic workflow 很像：不是 demo 成功就結束，而是 workflow、quality gate、testing、deployment 都要接起來。

可直接說的英文：

> What resonates with me is that Databricks is not just about the model layer. It is about the data and governance foundation that makes AI usable in production.

## 3.1. Model 不是唯一門檻，context / data / governance 會變得更重要

你的想法大方向是對的，但面試時不要說成「model 不重要」。更精準的說法是：

- frontier model 還是重要。
- 但對很多 enterprise AI use cases，大家會越來越容易取得強模型。
- 甚至很多公司會有 private model / private model endpoint 來處理敏感資料。
- 真正長期困難的是：模型能不能拿到正確 context、遵守權限、保持資料 fresh、能不能被安全放進 workflow。

可直接說的英文：

> I don't think models are becoming unimportant. But for many enterprise use cases, strong models will become more accessible. The harder and more durable problem is how to connect those models to the right private context, with governance, freshness, evaluation, and production workflows.

## 3.5. 你和 RAG / chatbot 痛點的連結

這段是你真正有感的 Databricks 連結。你不是傳統 data engineer，但你做過 RAG / chatbot / internal Q&A，所以你知道企業 AI 不是接 model API 就好。

你痛過的問題：

- LangGraph / agent workflow 管理。
- retrieval quality。
- knowledge freshness。
- permission / access control。
- 不同角色需要看到不同 context，例如 PM 可以看內部 incident / known issues，customer 不應該看到。
- internal knowledge search。
- 從 prototype 變成可靠服務。

Databricks 相關 anchor：

- Databricks AI Search 可以從 Delta table 建 index，並支援 underlying Delta table 更新後同步。
- AI Search 支援 hybrid keyword-similarity search、filtering、reranking、ACL。
- Unity Catalog 是 unified governance layer，負責 access control、lineage、audit 等。

可直接說的英文：

> This connects to my own experience with RAG and chatbot systems. We suffered from problems like knowledge freshness, permission management, retrieval quality, and moving from a demo to a reliable internal service. So when I learned that Databricks combines governed data, AI Search, model serving, and production workflows, it felt very relevant to problems I have actually seen.

## Governance 例子：PM vs Customer

這是你可以拿來說 Unity Catalog / governance 為什麼有感的例子。

可直接說的英文：

> One concrete governance problem I saw is that different users need different context from the same knowledge base. A PM may need to see past incidents or known issues to understand the product deeply, but a customer should not see the same internal information. So access control is not just a security checkbox. It directly affects whether an AI assistant can be safely used across internal and external users.

## 4. SA 的價值是幫 customer 從 business problem 走到 architecture / adoption

你要把自己定位成：

- 會問問題
- 會釐清 workflow
- 會設計架構
- 會推 adoption
- 會用 business value 收尾

可直接說的英文：

> I think a strong Solutions Architect is not just someone who explains products. The value is in understanding the customer's workflow, identifying the real bottleneck, designing the right architecture, and helping the team adopt it.

## 5. 你和 Databricks 的連結

你現在做的是 healthcare 裡的 workflow transformation。Databricks 給你的是跨產業的 data + AI transformation。

可直接說的英文：

> In my current role, I have been solving workflow and adoption problems inside one healthcare platform. Databricks gives me the opportunity to apply the same strength across many industries where data and AI can change how teams work.

## 今晚材料閱讀順序

1. 先讀 `sa_pitch.md`，把 Why Databricks 講順。
2. 看 Databricks lakehouse overview，只要理解 lakehouse / Delta Lake / Unity Catalog。
3. 看 2 個 customer stories，不要背細節，只看「客戶問題 -> Databricks solution -> business impact」。
4. 回來練 `agentic_workflow_story.md`，把它對齊 Databricks 的 production AI / workflow adoption。
