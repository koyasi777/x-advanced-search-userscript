# Advanced Search for X (Twitter)  🔍

*X（旧 Twitter）の検索体験に革命を。*

<p align="left">
  <a href="https://greasyfork.org/" target="_blank"><img alt="userscript" src="https://img.shields.io/badge/userscript-Tampermonkey%2FViolentmonkey-blue"></a>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green">
</p>

<img width="640" height="400" alt="advanced_search_for_x_screenshot" src="https://github.com/user-attachments/assets/4a279d04-d11b-42d2-8ccc-1ba57739b1a0" />

高度検索用の**フローティング・モーダル**を X に追加します。検索ボックスと**双方向同期**し、クエリの**保存/履歴**、**ミュート**（本文ヒットの非表示）、**シークレットモード**、**フォロー中/近く**などのスコープ指定、**名前/ユーザー名のみヒットの除外**まで、実運用に必要な機能をすべて一つにまとめました。モーダルと右上の🔍トリガーは**ドラッグ移動＆位置を記憶**、モーダルは**リサイズ/ズーム**も可能です。

---

## 目次

* [主な特長](#主な特長)
* [インストール](#インストール)
* [クイックスタート](#クイックスタート)
* [検索UI（Search タブ）](#検索uisearch-タブ)
* [履歴/保存（History / Saved）](#履歴保存history--saved)
* [本文ミュート（Mute タブ）](#本文ミュートmute-タブ)
* [“名前/ユーザー名だけヒット”の除外](#名前ユーザー名だけヒットの除外)
* [スコープ（フォロー中/近く）と URL 同期](#スコープフォロー中近くと-url-同期)
* [操作性：移動/サイズ/ズーム/ショートカット](#操作性移動サイズズームショートカット)
* [テーマ・国際化](#テーマ国際化)
* [永続化・プライバシー](#永続化プライバシー)
* [権限・互換性](#権限互換性)
* [既知の注意点](#既知の注意点)
* [トラブルシュート](#トラブルシュート)
* [開発メモ（実装トピック）](#開発メモ実装トピック)
* [サポート / ライセンス](#サポート--ライセンス)

---

## 主な特長

* 🔍 **高度検索モーダル**：演算子を覚えなくても GUI でクエリを組み立て
* 🔄 **双方向同期**：モーダル↔X の検索ボックスが常時同期（解析/生成の両対応）
* 💾 **保存/履歴**：クエリとスコープを保存、履歴は最新 50 件を自動記録（シークレットで停止）
* 🙈 **本文ミュート**：任意語句の本文ヒットを非表示（語句ごとに大小文字区別 ON/OFF）
* 🧹 **“名前/ユーザー名だけヒット”除外**：本文にヒットしない投稿をタイムラインで非表示（from:/to:/@ 明示時は例外）
* 👥/📍 **スコープ**：**フォロー中（pf=on）** / **近く（lf=on）** を URL と連動
* 🧭 **UI 操作性**：🔍トリガーはドラッグで位置保存、モーダルはドラッグ移動＋四辺/四隅で**リサイズ**、**ズーム**（Ctrl/⌘ + ホイール or `+/-/0`）
* 🎨 **テーマ自動追従**：X のライト/ディム/ダークに合わせて配色を切替
* 🌐 **多言語 UI**：自動言語検出（英語/日本語実装、他言語は英語フォールバック）
* ♿ **アクセシビリティ**：`aria-label`・トーストの `aria-live` など配慮

---

## インストール

1. ユーザースクリプトマネージャを導入

* [Tampermonkey](https://www.tampermonkey.net/) / [Violentmonkey](https://violentmonkey.github.io/)

2. スクリプトをインストール
   👉 **[Install this script](https://raw.githubusercontent.com/koyasi777/x-advanced-search/main/x-advanced-search.user.js)**

対応ドメイン：`https://x.com/*` / `https://twitter.com/*`
実行タイミング：`@run-at document-idle`

---

## クイックスタート

1. X を開くと右上に **🔍** が表示されます（ドラッグで移動可、位置は保存）。
2. 🔍 をクリックしてモーダルを開く。条件を入力すると**即座に検索ボックスへ反映**。
3. **Enter** または **Search** ボタンで検索実行。
4. よく使う条件は **Save** → **Saved** からワンクリック再実行。
5. ノイズ語句は **Mute** に登録。必要なら**シークレットモード**も。

---

## 検索UI（Search タブ）

**入力 → 検索演算子**（双方向に解析/生成）：

| フィールド               | 例                            | 生成されるクエリ例                                                |
| ------------------- | ---------------------------- | -------------------------------------------------------- |
| All words           | `AI news`                    | `AI news`                                                |
| Exact phrase        | `"ChatGPT 4o"`               | `"ChatGPT 4o"`                                           |
| Any (OR)            | `iPhone Android`             | `(iPhone OR Android)`                                    |
| None (-)            | `-sale -ads`                 | `-sale -ads`                                             |
| Hashtags            | `#TechEvent`                 | `#TechEvent`                                             |
| Language            | `ja`/`en`                    | `lang:ja` / `lang:en`                                    |
| From / To / Mention | `@X`, `@google`, `@OpenAI`   | `from:X`, `to:google`, `@OpenAI`（除外チェックONで `-from:` 等）   |
| Replies             | include / only / exclude     | `include:replies` / `filter:replies` / `-filter:replies` |
| Engagement          | 10 / 100 / 50                | `min_replies:10` / `min_faves:100` / `min_retweets:50`   |
| Date range          | 2025-01-01～2025-01-31        | `since:2025-01-01 until:2025-01-31`                      |
| Filters             | verified/links/images/videos | `is:verified`, `filter:links`, …（除外も可）                   |

> 入力中に**リアルタイムで検索ボックスへ反映**。既存のクエリをボックス/URLから**逆解析して各フィールドへ反映**もします。

---

## 履歴/保存（History / Saved）

* **History**：検索実行や `/search?q=...` 遷移を**自動記録（最大 50）**。
  シークレット ON 中は記録しません。**Run/Delete**、**Clear All** あり。
* **Saved**：任意のクエリ＋スコープを保存。**Run/Delete** に加え、**ドラッグで並び替え**（順序を永続化）。

---

## 本文ミュート（Mute タブ）

* 語句を追加すると、その語句が**本文にヒット**した投稿を**非表示**にします。
* 語句ごとに **Case Sensitive（大/小文字区別）** を切替可能。
* **ローカル可視制御**なので、検索条件そのものは変えず**画面上から隠す**アプローチです。

---

## “名前/ユーザー名だけヒット”の除外

* キーワードが**本文に一切含まれず**、**表示名や @ユーザー名だけに一致**している投稿を**非表示**にできます。
* ただし、**同じ語を `from:`/`to:`/`@` で明示的に指定している場合は例外**（意図した検索を尊重）。

---

## スコープ（フォロー中/近く）と URL 同期

* **Accounts**：*All / Accounts you follow* → `pf=on`
* **Location**：*All / Near you* → `lf=on`
* UI 切替で **URL パラメータへ反映**、逆に URL から**UI へ同期**も行います。

---

## 操作性：移動/サイズ/ズーム/ショートカット

* 🔍 **トリガー**：ドラッグ移動／**位置保存**
* 🪟 **モーダル**：ヘッダーでドラッグ移動、四辺/四隅ハンドルで**リサイズ**、**位置とサイズを保存**
* 🔎 **ズーム**：`Ctrl/⌘ +` / `Ctrl/⌘ -` / `Ctrl/⌘ 0` または `Ctrl/⌘ + ホイール`（ズーム値を保存）
* ⌨️ **Enter 実行**：テキスト/数値フィールドで `Enter` → 検索実行
* 🖼 **メディア専用ビュー**（`/status/.../photo|video|media|analytics`）では UI を**自動で隠す**

---

## テーマ・国際化

* **テーマ自動追従**：X 本体のライト/ディム/ダークを検出し、CSS カスタムプロパティで配色適用。
* **i18n**：`document.documentElement.lang` / `navigator.language` を元に自動選択。
  現在は **英語 / 日本語**を実装（他言語キーは用意済みで英語フォールバック）。

---

## 永続化・プライバシー

* **保存方法**：`GM_getValue` / `GM_setValue` / `GM_deleteValue`（ユーザースクリプトのローカルストレージ）
* **主な保存内容**：

  * モーダルの表示/位置/サイズ/ズーム、🔍トリガーの位置
  * 検索 **履歴** / **保存済みクエリ** / **ミュート語句**
  * “名前/ユーザー名だけヒット除外”の設定、**シークレットモード**状態
* **外部送信なし**：当スクリプトは**外部サーバへデータ送信しません**。

---

## 権限・互換性

**@grant**

```text
GM_addStyle
GM_getValue
GM_setValue
GM_deleteValue
```

**@match**

```text
https://x.com/*
https://twitter.com/*
```

* 実行タイミング：`document-idle`
* 主要セレクタ：`input[data-testid="SearchBox_Search_Input"]`, `article[data-testid="tweet"]` ほか
* 対応マネージャ：Tampermonkey / Violentmonkey

---

## 既知の注意点

* 本スクリプトは **X の DOM/URL 仕様に依存**しています。X 側の変更で同期/解析/可視制御が効かなくなる場合があります。
* **本文ミュート / 名前・ユーザー名だけヒットの除外**は**表示上の非表示**であり、X の検索結果 API を書き換えるものではありません。
* “近く”“フォロー中”は URL パラメータ（`lf=on` / `pf=on`）によるフィルタで、挙動は X の仕様に準じます。

---

## トラブルシュート

* 🔍 が見えない / モーダルが出ない
  → メディア専用ビューでは UI を隠します。通常のタイムライン/検索ページに移動してください。
  → 拡張との競合で z-index 問題の可能性：ユーザースタイルで `#advanced-search-modal { z-index: 100000; }` などを上書き。
* 同期しない / 検索が走らない
  → `data-testid="SearchBox_Search_Input"` のあるページか確認。Enter または **Search** ボタンで実行。
* 履歴が残らない
  → **シークレットモード**が ON になっていないか確認。

---

## 開発メモ（実装トピック）

* **二重初期化防止**：`window.__X_ADV_SEARCH_INITED__` ガード
* **URL/履歴監視**：`pushState`/`replaceState` のラップ＋`MutationObserver`＋ポーリングのハイブリッド
* **検索クエリの双方向変換**：正規表現で解析 → 各入力へ反映／入力から演算子文字列を生成
* **可視制御**：タイムライン `article[data-testid="tweet"]` 単位でヒット判定し `data-adv-hidden` を付与
* **テーマ適用**：`document.body` の `backgroundColor` からライト/ディム/ダークを推定し CSS 変数群を切替
* **ドラッグ/リサイズ/ズーム**：位置・サイズ・ズーム値を保存し、ウィンドウリサイズ時もビューポートに収める
* **i18n**：キー中心設計（英語をフォールバック）で `data-i18n*` 属性へ適用

---

## サポート / ライセンス

* 🐛 バグ報告・要望：**[GitHub Issues](https://github.com/koyasi777/x-advanced-search/issues)**
* 🏠 ホーム：**[Repository](https://github.com/koyasi777/x-advanced-search)**
* 📜 ライセンス：**MIT**

> **One click to power-search.**
> 検索演算子を UI に封じ込め、**探す→絞る→再利用**を最短距離で。<br>毎日の検索が、一段と速く・静かに・賢くなります。
