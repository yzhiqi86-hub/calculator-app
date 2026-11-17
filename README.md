# Calculator App — GitHub 實戰作業

使用 HTML、CSS、JavaScript 製作計算機，保留分支、提交及 Pull Request 紀錄。

## 功能
- 四則運算、清除 AC、退格、百分比（將當前算式的結果除以 100）
- 記憶：M+、M-、MR、MC；記憶操作後清空顯示，方便連續輸入
- 科學計算：sin、cos、tan（輸入角度）、log₁₀、平方根 √、平方 x²
- 非法算式、除以零及無定義科學運算顯示「錯誤」

## 講義 8 步驟的 Git 紀錄
1. 建立私人 Repository 與基本計算機（原有歷史）；修正 HTML doctype。
2. 將按鈕主題調整為藍色並提交至 main。
3. 在 `feature/percentage-button` 開發百分比功能，透過 PR #1 merge commit 合併。
4. 以獨立 commit 故意破壞 `calculate()`，再以新 commit 恢復原始內容（保留兩筆歷史；不是 CLI `git revert` 指令）。
5. 在 `feature/memory-function` 分別提交 UI、CSS、JS。
6. 透過 PR #2 merge commit 合併記憶功能；手動瀏覽器測試仍需執行。
7. 在 `feature/scientific-v1`（六按鈕）與 `feature/scientific-v2`（下拉選單）分別實作兩種方案，保留 PR #3 和 PR #4。
8. 選擇 v2 透過 PR #4 合併至 main。GitHub Pages 與 v2.0 tag 仍需設定。

## PR 連結
- [#1 百分比](https://github.com/yzhiqi86-hub/calculator-app/pull/1)
- [#2 記憶功能](https://github.com/yzhiqi86-hub/calculator-app/pull/2)
- [#3 科學計算 A（保留比較）](https://github.com/yzhiqi86-hub/calculator-app/pull/3)
- [#4 科學計算 B（已合併）](https://github.com/yzhiqi86-hub/calculator-app/pull/4)

## 手動測試清單
- `8 + 2 =` → 10
- `5 0 %` → 0.5
- `5 M+ 3 M+ MR` → 8
- `MC 10 M+ 3 M- MR` → 7
- `MC MR` → 0
- `30`，選 sin → 0.5；`9`，選 √ → 3；`10`，選 log → 1
- `1 / 0 =` → 錯誤

## 部署
在 GitHub Repository 的 Settings → Pages → Build and deployment 選擇 Deploy from a branch → main / (root) → Save。私人 Repository 的 Pages 可用性依帳號方案與組織設定而異。

## A/B 比較
- A：功能一眼可見，但佔用六個按鈕空間。
- B：節省空間、版面更簡潔，但多一步選取與執行。
- 依講義示例選擇 B；**沒有蒐集真實 A/B 使用者測試數據**。
