# Calculator App — 多功能計算機

以 HTML、CSS、JavaScript 製作的響應式計算機。

## 功能
- 基本四則運算、AC 清除、⌫ 退格、百分比（將目前運算結果除以 100）
- 記憶 M+、M-、MR、MC，顯示 M 記憶指示
- 科學計算下拉選單：sin、cos、tan（角度制）、log₁₀、√、x²
- 鍵盤操作：數字、運算符號、Enter、Backspace、Esc、%
- 除以零或非法輸入顯示「錯誤」
- 使用自行撰寫的算式解析器，不使用 eval() 或 Function()

## 測試步驟
1. `8 + 2 =` → `10`
2. `50 %` → `0.5`
3. `5 M+ 3 M+ MR` → `8`
4. `MC 10 M+ 3 M- MR` → `7`
5. `MC MR` → `0`
6. `30` 選 `sin` 並執行 → `0.5`
7. `9` 選 `√` 並執行 → `3`
8. `10` 選 `log₁₀` 並執行 → `1`
9. `1 / 0 =` → `錯誤`

以上為預期結果，尚需實際瀏覽器驗證。

## GitHub 操作歷史
原有 commits、分支和 Pull Requests 均保留。此次最終版使用**單一新的 commit** 更新四個檔案，不重寫舊歷史。

- [PR #1：百分比](https://github.com/yzhiqi86-hub/calculator-app/pull/1)
- [PR #2：記憶功能](https://github.com/yzhiqi86-hub/calculator-app/pull/2)
- [PR #3：科學計算 A 版](https://github.com/yzhiqi86-hub/calculator-app/pull/3)
- [PR #4：科學計算 B 版](https://github.com/yzhiqi86-hub/calculator-app/pull/4)

## 部署
若帳號方案支援私人 Repository 的 GitHub Pages，至 Settings → Pages → Deploy from a branch → main / (root) → Save。

## A/B 設計說明
A 版使用六個獨立按鈕，B 版使用下拉選單。最終採用 B 版節省版面空間；未蒐集真實使用者 A/B 測試數據。
