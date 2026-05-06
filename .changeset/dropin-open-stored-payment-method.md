---
'@plexy/plexy-web': minor
---

`Dropin`: `openPaymentMethod` now accepts `storedPaymentMethodId` to pre-open a specific stored payment method when Drop-in is rendered. When both `storedPaymentMethodId` and `type` are provided, `storedPaymentMethodId` takes priority. If no stored payment method matches the given id, a warning is logged and selection falls through to the existing `type` / `openFirstStoredPaymentMethod` logic.
