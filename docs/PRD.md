# FraudLens — Product Requirements Document (PRD)

## Overview

FraudLens is a fraud pattern explorer that analyzes credit/debit card transactions and bank transfers, detects suspicious activity, and explains **why** a transaction is flagged — not just whether it is fraud or not.

---

## Goal

User should be able to:

- Upload or input transaction data
- Get a risk score (0–100)
- See which features made it suspicious
- Understand the reasoning behind the prediction

---

## What Makes a Transaction Suspicious?

### Credit/Debit Card

| Signal                               | Why It Matters                    |
| ------------------------------------ | --------------------------------- |
| Very high transaction amount         | Unusual spend compared to history |
| Transaction at odd hours (e.g. 2am)  | Not typical user behavior         |
| Foreign or unknown merchant location | Card used far from home           |
| Multiple transactions in short time  | Rapid spending pattern            |
| New merchant never used before       | Unfamiliar vendor                 |

### Bank Transfers

| Signal                              | Why It Matters                 |
| ----------------------------------- | ------------------------------ |
| Large transfer to new account       | No prior relationship          |
| Transfer split into small amounts   | Structuring to avoid detection |
| Recipient account is very new       | Mule account pattern           |
| Transfer outside business hours     | Unusual timing                 |
| High frequency transfers in one day | Suspicious volume              |

---

## Input Features

These are the columns our model will use:

| Feature                 | Type        | Description                   |
| ----------------------- | ----------- | ----------------------------- |
| `transaction_id`        | string      | Unique ID                     |
| `amount`                | float       | Transaction amount            |
| `transaction_type`      | categorical | card / transfer               |
| `timestamp`             | datetime    | When it happened              |
| `hour_of_day`           | int         | Extracted from timestamp      |
| `day_of_week`           | int         | Extracted from timestamp      |
| `merchant_category`     | categorical | Type of merchant              |
| `location`              | categorical | Country / region              |
| `is_foreign`            | boolean     | Outside home country          |
| `is_new_recipient`      | boolean     | First time to this account    |
| `transaction_frequency` | int         | Transactions in last 24hrs    |
| `amount_vs_avg`         | float       | Ratio to user's average spend |
| `is_fraud`              | boolean     | **Target label**              |

---

## Expected Outputs

For each analyzed transaction, the system returns:

```json
{
  "transaction_id": "TXN123",
  "risk_score": 87,
  "fraud_likelihood": "High",
  "top_reasons": [
    "Amount is 4x higher than your average",
    "Transaction at 2:43am",
    "First transaction with this recipient"
  ],
  "feature_importance": {
    "amount_vs_avg": 0.42,
    "hour_of_day": 0.28,
    "is_new_recipient": 0.18,
    "is_foreign": 0.12
  }
}
```

---

## Dataset

- **Source:** Kaggle
- **Candidates:**
  - [Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)
  - [IEEE-CIS Fraud Detection](https://www.kaggle.com/c/ieee-fraud-detection)

---

## Out of Scope (for now)

- User authentication / login
- Real-time transaction streaming
- Mobile app
- Multi-language support
