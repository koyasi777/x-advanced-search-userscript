// ==UserScript==
// @name         X.com (Twitter) Advanced Search Modal 🔍
// @name:ja      X.com（Twitter）高度検索モーダル 🔍
// @name:en      X.com (Twitter) Advanced Search Modal 🔍
// @name:zh-CN   X.com（Twitter）高级搜索模态框 🔍
// @name:zh-TW   X.com（Twitter）高級搜尋模態框 🔍
// @name:ko      X.com (Twitter) 고급 검색 モ달 🔍
// @name:fr      X.com (Twitter) : Modal de recherche avancée 🔍
// @name:es      Modal de búsqueda avanzada para X.com (Twitter) 🔍
// @name:de      Erweitertes Suchmodal für X.com (Twitter)🔍
// @name:pt-BR   Modal de busca avançada no X.com (Twitter) 🔍
// @name:ru      Расширенный поиск для X.com (Twitter) 🔍
// @version      4.8.5
// @description      Adds a floating modal for advanced search on X.com (Twitter). Syncs with search box and remembers position/display state. The top-right search icon is now draggable and its position persists.
// @description:ja   X.com（Twitter）に高度な検索機能を呼び出せるフローティング・モーダルを追加します。検索ボックスと双方向で同期し、位置や表示状態も記憶します。右上の検索アイコンはドラッグで移動でき、位置は保存されます。
// @description:en   Adds a floating modal for advanced search on X.com (formerly Twitter). Syncs with search box and remembers position/display state. The top-right search icon is draggable with persistent position.
// @description:zh-CN 为X.com（Twitter）添加高级搜索浮动模态框，支持与搜索框双向同步并记住位置与显示状态。右上角的搜索图标可拖动，并会记住位置。
// @description:zh-TW 為 X.com（Twitter）增加高級搜尋模態框，支援與搜尋框雙向同步並記住位置與顯示狀態。右上角搜尋圖示可拖曳，位置會被保存。
// @description:ko   X.com(Twitter)에 고급 검색 모달을 추가합니다. 검색창과 양방향 동기화하며 위치와 표시 상태를 기억합니다. 우상단 검색 아이콘은 드래그 이동 및 위치 저장이 가능합니다.
// @description:fr   Ajoute une fenêtre modale de recherche avancée à X.com (Twitter), synchronisée avec la barre de recherche et mémorise de l’état d’affichage. L’icône de recherche en haut à droite est déplaçable.
// @description:es   Agrega un modal flotante de búsqueda avanzada en X.com (Twitter), sincronizado con la caja de búsqueda y con estado persistente.
// @description:de   Fügt X.com (Twitter) ein modales Fenster für erweiterte Suche hinzu, synchronisiert mit der Suchleiste und speichert Position/Zustand. Das Suchsymbol oben rechts ist per Drag & Drop verschiebbar und bleibt gespeichert.
// @description:pt-BR Adiciona um modal de busca avançada flutuante no X.com (Twitter), sincronizado com a caixa de busca e com estado salvo. O ícone de busca no canto superior direito é arrastável com posição persistente.
// @description:ru   Добавляет модальное окно расширенного поиска на X.com (Twitter). Синхронизируется с поисковой строкой и запоминает состояние. Кнопку поиска в правом верхнем углу можно перетаскивать; её положение сохраняется.
// @namespace    https://github.com/koyasi777/x-advanced-search-userscript
// @author       koyasi777
// @match        https://x.com/*
// @match        https://twitter.com/*
// @exclude      https://x.com/i/tweetdeck*
// @exclude      https://twitter.com/i/tweetdeck*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/koyasi777/x-advanced-search-userscript
// @supportURL   https://github.com/koyasi777/x-advanced-search-userscript/issues
// ==/UserScript==

(function() {
    'use strict';

    if (window.__X_ADV_SEARCH_INITED__) return;
    window.__X_ADV_SEARCH_INITED__ = true;

    const i18n = {
        translations: {
            'en': {
                modalTitle: "Advanced Search",
                tooltipClose: "Close",
                labelAllWords: "All of these words",
                placeholderAllWords: "e.g., AI news",
                labelExactPhrase: "This exact phrase",
                placeholderExactPhrase: 'e.g., "ChatGPT 4o"',
                labelAnyWords: "Any of these words (OR)",
                placeholderAnyWords: "e.g., iPhone Android",
                labelNotWords: "None of these words (-)",
                placeholderNotWords: "e.g., -sale -ads",
                labelHashtag: "Hashtags (#)",
                placeholderHashtag: "e.g., #TechEvent",
                labelLang: "Language (lang:)",
                optLangDefault: "Any language",
                optLangJa: "Japanese (ja)",
                optLangEn: "English (en)",
                optLangId: "Indonesian (id)",
                optLangHi: "Hindi (hi)",
                optLangDe: "German (de)",
                optLangTr: "Turkish (tr)",
                optLangEs: "Spanish (es)",
                optLangPt: "Portuguese (pt)",
                optLangAr: "Arabic (ar)",
                optLangFr: "French (fr)",
                optLangKo: "Korean (ko)",
                optLangRu: "Russian (ru)",
                optLangZhHans: "Chinese Simplified (zh-cn)",
                optLangZhHant: "Chinese Traditional (zh-tw)",
                hrSeparator: " ",
                labelFilters: "Filters",
                labelVerified: "Verified accounts",
                labelLinks: "Links",
                labelImages: "Images",
                labelVideos: "Videos",
                checkInclude: "Include",
                checkExclude: "Exclude",
                labelReplies: "Replies",
                optRepliesDefault: "Default (Show all)",
                optRepliesInclude: "Include replies",
                optRepliesOnly: "Replies only",
                optRepliesExclude: "Exclude replies",
                labelEngagement: "Engagement",
                placeholderMinReplies: "Min replies",
                placeholderMinLikes: "Min likes",
                placeholderMinRetweets: "Min retweets",
                labelDateRange: "Date range",
                tooltipSince: "From this date",
                tooltipUntil: "Until this date",
                labelFromUser: "From these accounts (from:)",
                placeholderFromUser: "e.g., @X",
                labelToUser: "To these accounts (to:)",
                placeholderToUser: "e.g., @google",
                labelMentioning: "Mentioning these accounts (@)",
                placeholderMentioning: "e.g., @OpenAI",
                buttonClear: "Clear",
                buttonApply: "Search",
                tooltipTrigger: "Open Advanced Search",

                tabSearch: "Search",
                tabHistory: "History",
                tabSaved: "Saved",
                buttonSave: "Save",
                buttonSaved: "Saved",
                secretMode: "Secret",
                secretOn: "Secret mode ON (No history)",
                secretOff: "Secret mode OFF",
                toastSaved: "Saved.",
                toastDeleted: "Deleted.",
                toastReordered: "Order updated.",
                emptyHistory: "No history yet.",
                emptySaved: "No saved searches.",
                run: "Run",
                delete: "Delete",
                updated: "Updated.",
                tooltipSecret: "Toggle Secret Mode (no history will be recorded)",
                historyClearAll: "Clear All",
                confirmClearHistory: "Clear all history?",

                labelAccountScope: "Accounts",
                optAccountAll: "All accounts",
                optAccountFollowing: "Accounts you follow",
                labelLocationScope: "Location",
                optLocationAll: "All locations",
                optLocationNearby: "Near you",
                chipFollowing: "Following",
                chipNearby: "Nearby",

                labelSearchTarget: "Search target",
                labelHitName: "Exclude hits in display name",
                labelHitHandle: "Exclude hits in username (@handle)",
                hintSearchTarget: "Hide posts that only match in name or handle (not in body).",
                hintName: "If a keyword appears only in the display name, hide it.",
                hintHandle: "If a keyword appears only in @username, hide it. Exception: when the query explicitly uses from:/to:/@ with the same word.",

                tabMute: "Mute",
                labelMuteWord: "Add mute word",
                placeholderMuteWord: "e.g., spoiler",
                labelCaseSensitive: "Case sensitive",
                labelEnabled: "Enabled",
                labelEnableAll: "Enable all",
                buttonAdd: "Add",
                emptyMuted: "No muted words.",
                mutedListTitle: "Muted words",
                mutedListHeading: "Muted items",
                muteHit: "Mute hits in body",
                buttonImport: "Import",
                buttonExport: "Export",

                /* Accounts tab */
                tabAccounts: "Accounts",
                emptyAccounts: "No accounts yet. Open a profile and click the Add button to save it.",
                buttonAddAccount: "Add account",
                toastAccountAdded: "Account added.",
                toastAccountExists: "Already added.",
                buttonConfirm: "Confirm",

                /* Lists tab */
                tabLists: "Lists",
                emptyLists: "No lists yet. Open a List and click the + button in the top-right to add it.",
                buttonAddList: "Add list",
                toastListAdded: "List added.",
                toastListExists: "Already added.",
            },
            'ja': {
                modalTitle: "高度な検索",
                tooltipClose: "閉じる",
                labelAllWords: "すべての語句を含む",
                placeholderAllWords: "例: AI ニュース",
                labelExactPhrase: "この語句を完全に含む",
                placeholderExactPhrase: '例: "ChatGPT 4o"',
                labelAnyWords: "いずれかの語句を含む (OR)",
                placeholderAnyWords: "例: iPhone Android",
                labelNotWords: "含まない語句 (-)",
                placeholderNotWords: "例: -セール -広告",
                labelHashtag: "ハッシュタグ (#)",
                placeholderHashtag: "例: #技術書典",
                labelLang: "言語 (lang:)",
                optLangDefault: "指定しない",
                optLangJa: "日本語 (ja)",
                optLangEn: "英語 (en)",
                optLangId: "インドネシア語 (id)",
                optLangHi: "ヒンディー語 (hi)",
                optLangDe: "ドイツ語 (de)",
                optLangTr: "トルコ語 (tr)",
                optLangEs: "スペイン語 (es)",
                optLangPt: "ポルトガル語 (pt)",
                optLangAr: "アラビア語 (ar)",
                optLangFr: "フランス語 (fr)",
                optLangKo: "韓国語 (ko)",
                optLangRu: "ロシア語 (ru)",
                optLangZhHans: "中国語（簡体字）(zh-cn)",
                optLangZhHant: "中国語（繁体字）(zh-tw)",
                hrSeparator: " ",
                labelFilters: "フィルター",
                labelVerified: "認証済みアカウント",
                labelLinks: "リンク",
                labelImages: "画像",
                labelVideos: "動画",
                checkInclude: "含む",
                checkExclude: "含まない",
                labelReplies: "返信",
                optRepliesDefault: "指定しない",
                optRepliesInclude: "返信を含める",
                optRepliesOnly: "返信のみ",
                optRepliesExclude: "返信を除外",
                labelEngagement: "エンゲージメント",
                placeholderMinReplies: "最小返信数",
                placeholderMinLikes: "最小いいね数",
                placeholderMinRetweets: "最小リポスト数",
                labelDateRange: "期間指定",
                tooltipSince: "この日以降",
                tooltipUntil: "この日以前",
                labelFromUser: "このアカウントから (from:)",
                placeholderFromUser: "例: @X",
                labelToUser: "このアカウントへ (to:)",
                placeholderToUser: "例: @google",
                labelMentioning: "このアカウントへのメンション (@)",
                placeholderMentioning: "例: @OpenAI",
                buttonClear: "クリア",
                buttonApply: "検索実行",
                tooltipTrigger: "高度な検索を開く",

                tabSearch: "検索",
                tabHistory: "履歴",
                tabSaved: "保存",
                buttonSave: "保存",
                buttonSaved: "保存済み",
                secretMode: "シークレット",
                secretOn: "シークレットモード ON（履歴は記録しません）",
                secretOff: "シークレットモード OFF",
                toastSaved: "保存しました。",
                toastDeleted: "削除しました。",
                toastReordered: "並び順を更新しました。",
                emptyHistory: "履歴はまだありません。",
                emptySaved: "保存済みの検索はありません。",
                run: "実行",
                delete: "削除",
                updated: "更新しました。",
                tooltipSecret: "シークレットモードを切り替え（履歴を記録しません）",
                historyClearAll: "すべて削除",
                confirmClearHistory: "履歴をすべて削除しますか？",

                labelAccountScope: "アカウント",
                optAccountAll: "すべてのアカウント",
                optAccountFollowing: "フォローしているアカウント",
                labelLocationScope: "場所",
                optLocationAll: "すべての場所",
                optLocationNearby: "近くの場所",
                chipFollowing: "フォロー中",
                chipNearby: "近く",

                labelSearchTarget: "検索対象",
                labelHitName: "表示名（名前）でのヒットは除外",
                labelHitHandle: "ユーザー名（@）でのヒットは除外",
                hintSearchTarget: "本文ではなく、名前/ユーザー名のみに一致した投稿を非表示にします。",
                hintName: "キーワードが表示名のみに含まれる場合は非表示にします。",
                hintHandle: "キーワードが @ユーザー名のみに含まれる場合は非表示にします。例外: 同じ語を from:/to:/@ で明示しているときは表示します。",

                tabMute: "ミュート",
                labelMuteWord: "ミュート語句の追加",
                placeholderMuteWord: "例: ネタバレ",
                labelCaseSensitive: "大文字小文字を区別",
                labelEnabled: "有効",
                labelEnableAll: "すべて有効",
                buttonAdd: "追加",
                emptyMuted: "ミュート語句はまだありません。",
                mutedListTitle: "ミュート語句",
                mutedListHeading: "ミュート一覧",
                muteHit: "本文でのヒットをミュート",
                buttonImport: "インポート",
                buttonExport: "エクスポート",

                /* Accounts tab */
                tabAccounts: "アカウント",
                emptyAccounts: "アカウントはまだありません。アカウントページの追加ボタンから追加してください。",
                buttonAddAccount: "アカウントを追加",
                toastAccountAdded: "アカウントを追加しました。",
                toastAccountExists: "すでに追加済みです。",
                buttonConfirm: "確認",

                /* Lists tab */
                tabLists: "リスト",
                emptyLists: "リストはまだありません。リストを開き右上の+ボタンから追加してください。",
                buttonAddList: "リストを追加",
                toastListAdded: "リストを追加しました。",
                toastListExists: "すでに追加済みです。",
            },
            'zh-CN': {},
            'ko': {},
            'fr': {},
            'es': {},
            'de': {},
            'pt-BR': {},
            'ru': {}
        },
        lang: 'en',
        init: function() {
            const supportedLangs = Object.keys(this.translations);
            let detectedLang = document.documentElement.lang || navigator.language || 'en';
            if (supportedLangs.includes(detectedLang)) { this.lang = detectedLang; return; }
            const baseLang = detectedLang.split('-')[0];
            if (supportedLangs.includes(baseLang)) { this.lang = baseLang; return; }
            this.lang = 'en';
        },
        t: function(key) { return this.translations[this.lang]?.[key] || this.translations['en'][key] || `[${key}]`; },
        apply: function(container) {
            container.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = this.t(el.dataset.i18n); });
            container.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = this.t(el.dataset.i18nPlaceholder); });
            container.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = this.t(el.dataset.i18nTitle); });
        }
    };

    const SEARCH_SVG = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"></circle>
      <line x1="16.65" y1="16.65" x2="22" y2="22"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
    </svg>`;

    const FOLDER_TOGGLE_OPEN_SVG = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    const FOLDER_TOGGLE_CLOSED_SVG = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // トグルボタンの小ユーティリティ
    function renderFolderToggleButton(collapsed) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'adv-folder-toggle-btn';
      btn.setAttribute('aria-label', collapsed ? 'Expand' : 'Collapse');
      btn.setAttribute('title', collapsed ? 'Expand' : 'Collapse');
      btn.setAttribute('aria-expanded', (!collapsed).toString());
      btn.style.cssText = `
        appearance:none;border:none;background:transparent;cursor:pointer;
        width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;
        margin-right:8px;color:inherit;flex:0 0 auto;
      `;
      btn.innerHTML = collapsed ? FOLDER_TOGGLE_CLOSED_SVG : FOLDER_TOGGLE_OPEN_SVG;
      return btn;
    }
    function updateFolderToggleButton(btn, collapsed) {
      if (!btn) return;
      btn.innerHTML = collapsed ? FOLDER_TOGGLE_CLOSED_SVG : FOLDER_TOGGLE_OPEN_SVG;
      btn.setAttribute('aria-label', collapsed ? 'Expand' : 'Collapse');
      btn.setAttribute('title', collapsed ? 'Expand' : 'Collapse');
      btn.setAttribute('aria-expanded', (!collapsed).toString());
    }

    const themeManager = {
        colors: {
            light: {
                '--modal-bg': '#ffffff', '--modal-text-primary': '#0f1419', '--modal-text-secondary': '#536471', '--modal-border': '#d9e1e8',
                '--modal-input-bg': '#eff3f4', '--modal-input-border': '#cfd9de', '--modal-button-hover-bg': 'rgba(15, 20, 25, 0.1)',
                '--modal-scrollbar-thumb': '#aab8c2', '--modal-scrollbar-track': '#eff3f4', '--modal-close-color': '#0f1419',
                '--modal-close-hover-bg': 'rgba(15, 20, 25, 0.1)', '--hr-color': '#eff3f4',
            },
            dim: {
                '--modal-bg': '#15202b', '--modal-text-primary': '#f7f9f9', '--modal-text-secondary': '#8899a6', '--modal-border': '#38444d',
                '--modal-input-bg': '#192734', '--modal-input-border': '#38444d', '--modal-button-hover-bg': 'rgba(247, 249, 249, 0.1)',
                '--modal-scrollbar-thumb': '#536471', '--modal-scrollbar-track': '#192734', '--modal-close-color': '#f7f9f9',
                '--modal-close-hover-bg': 'rgba(247, 249, 249, 0.1)', '--hr-color': '#38444d',
            },
            dark: {
                '--modal-bg': '#000000', '--modal-text-primary': '#e7e9ea', '--modal-text-secondary': '#71767b', '--modal-border': '#2f3336',
                '--modal-input-bg': '#16181c', '--modal-input-border': '#54595d', '--modal-button-hover-bg': 'rgba(231, 233, 234, 0.1)',
                '--modal-scrollbar-thumb': '#536471', '--modal-scrollbar-track': '#16181c', '--modal-close-color': '#e7e9ea',
                '--modal-close-hover-bg': 'rgba(231, 233, 234, 0.1)', '--hr-color': '#2f3336',
            }
        },
        applyTheme: function(modalElement, triggerEl) {
            if (!modalElement) return;
            const bodyBg = getComputedStyle(document.body).backgroundColor;
            let theme = 'dark';
            if (bodyBg === 'rgb(21, 32, 43)') theme = 'dim';
            else if (bodyBg === 'rgb(255, 255, 255)') theme = 'light';
            const themeColors = this.colors[theme] || this.colors.dark;
            const targets = [modalElement, document.documentElement];
            if (triggerEl) targets.push(triggerEl);
            for (const t of targets) {
             for (const [key, value] of Object.entries(themeColors)) {
               t.style.setProperty(key, value);
             }
            }
        },
        observeChanges: function(modalElement, triggerEl) {
            const observer = new MutationObserver(() => this.applyTheme(modalElement, triggerEl));
            observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
            this.applyTheme(modalElement, triggerEl);
        }
    };

    function decodeURIComponentSafe(s) {
      try { return decodeURIComponent(s); } catch { return s; }
    }

    // “ ” 『』などのスマート引用を ASCII の " に寄せる
    function normalizeQuotes(s) {
      return String(s).replace(/[\u201C\u201D\u300C\u300D\uFF02]/g, '"');
    }

    // 解析前に軽く正規化（URL から来る %22..., 連続空白など）
    function normalizeForParse(s) {
      if (!s) return '';
      let out = String(s);
      // URL っぽいエンコードだけ軽く剥がす（%22 等）
      if (/%[0-9A-Fa-f]{2}/.test(out)) out = decodeURIComponentSafe(out);
      out = normalizeQuotes(out);
      // 制御文字を潰し、空白を整形
      out = out.replace(/\s+/g, ' ').trim();
      return out;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ── OR/引用のための簡易トークナイザ
    function tokenizeQuotedWords(s) {
      const out = [];
      let cur = '';
      let inQ = false;
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '"') { inQ = !inQ; cur += c; continue; }
        if (!inQ && /\s/.test(c)) { if (cur) { out.push(cur); cur=''; } }
        else { cur += c; }
      }
      if (cur) out.push(cur);
      return out.filter(Boolean);
    }

    // トップレベルの OR で文字列を分割（引用/括弧を考慮）
    function splitTopLevelOR(str) {
      const parts = [];
      let cur = '';
      let inQ = false, depth = 0;
      for (let i = 0; i < str.length; ) {
        const c = str[i];
        if (c === '"') { inQ = !inQ; cur += c; i++; continue; }
        if (!inQ && (c === '(' || c === ')')) { depth += (c === '(' ? 1 : -1); cur += c; i++; continue; }
        if (!inQ && depth === 0) {
          // 単語境界の "or" / "OR"
          if ((str.slice(i, i+2).toLowerCase() === 'or') &&
              (i === 0 || /\s|\(/.test(str[i-1] || '')) &&
              (i+2 >= str.length || /\s|\)/.test(str[i+2] || ''))) {
            parts.push(cur.trim());
            cur = '';
            i += 2;
            continue;
          }
        }
        cur += c; i++;
      }
      if (cur.trim()) parts.push(cur.trim());
      return parts.length > 1 ? parts : null;
    }

    // OR 専用判定（演算子/否定/括弧が無い素の OR 群なら true）
    function isPureORQuery(q) {
      const hasOps = /(?:^|\s)(?:from:|to:|lang:|filter:|is:|min_replies:|min_faves:|min_retweets:|since:|until:)\b/i.test(q);
      const hasNeg = /(^|\s)-\S/.test(q);
      const hasPar = /[()]/.test(q);
      return !hasOps && !hasNeg && !hasPar;
    }

    function waitForElement(selector, timeout = 10000, checkProperty = null) {
        return new Promise((resolve) => {
            const checkInterval = 100;
            let elapsedTime = 0;
            const intervalId = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    if (checkProperty) {
                        if (element[checkProperty]) {
                            clearInterval(intervalId);
                            resolve(element);
                            return;
                        }
                    } else {
                        clearInterval(intervalId);
                        resolve(element);
                        return;
                    }
                }
                elapsedTime += checkInterval;
                if (elapsedTime >= timeout) {
                    clearInterval(intervalId);
                    resolve(null);
                }
            }, checkInterval);
        });
    }

    function hideUIImmediately(modal, trigger) {
        if (modal)  modal.style.display = 'none';
        if (trigger) trigger.style.display = 'none';
    }

    // ▼ ルート適用を軽く検証（URL一致 + プロフィール系DOMが現れたか）
    function waitForRouteApply(path, timeoutMs = 2000) {
      const goal = new URL(path, location.origin).pathname;
      // ルート毎の判定を用意（必要に応じて拡張）
      const perRouteProbes = [
       // 検索ページ：検索結果タイムライン or 検索ボックス or 何かしらのツイート
       { test: p => p.startsWith('/search'),
         sels: [
           '[aria-label*="Search results"], [aria-label*="検索結果"]',
           'div[data-testid="primaryColumn"] input[data-testid="SearchBox_Search_Input"]',
           'div[data-testid="primaryColumn"] article[data-testid="tweet"]'
         ] },
       // プロフィール
       { test: p => /^\/[A-Za-z0-9_]{1,50}\/?$/.test(p),
         sels: [
           '[data-testid="UserName"]',
           'div[data-testid="UserProfileHeader_Items"]',
           'div[data-testid="UserDescription"]'
         ] },
       // デフォルト（保険）：主要カラムに何かレンダされたらOK
       { test: _ => true,
         sels: [
           'div[data-testid="primaryColumn"]',
           'main[role="main"]'
         ] }
      ];
      const probes = (perRouteProbes.find(x => x.test(goal)) || perRouteProbes.at(-1)).sels;
      return new Promise(resolve => {
        const t0 = performance.now();
        (function tick() {
          const elapsed = performance.now() - t0;
          const urlOk = location.pathname === goal;
          const domOk = probes.some(sel => document.querySelector(sel));
          if (urlOk && domOk) return resolve(true);
          if (elapsed >= timeoutMs) return resolve(false);
          // 立ち上がりは速く、以後はやや疎にポーリング
          setTimeout(tick, elapsed < 300 ? 60 : elapsed < 700 ? 120 : 180);
        })();
      });
    }

    // ▼ SPA 遷移の核。pushState → 合成 popstate → DOM適用待ち → 失敗ならフォールバック
    async function spaNavigate(path, { ctrlMeta = false, timeoutMs = 1200 } = {}) {
      try {
        const to = new URL(path, location.origin);
        if (to.origin !== location.origin) throw new Error('cross-origin');

        history.pushState(history.state, '', to.pathname + to.search + to.hash);
        // X のルーターは popstate を購読している想定
        window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));

        const ok = await waitForRouteApply(to.pathname, timeoutMs);
        if (ok) return; // 成功
      } catch (e) {
        // fall through to fallback
      }
      // フォールバック：修飾キーありなら新規タブ、なければ通常遷移
      if (ctrlMeta) window.open(path, '_blank', 'noopener');
      else location.assign(path);
    }

    const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

    let isUpdating = false;
    let manualOverrideOpen = false;
    const lastHistory = { q: null, pf: null, lf: null, ts: 0 };

    // ▼ 入力中ガード（IME合成を含めてカバー）
    let __typingGuardUntil = 0;
    const TYPING_GRACE_MS = 600; // 入力終了からこのmsはスキャン停止
    const markTyping = () => { __typingGuardUntil = Date.now() + TYPING_GRACE_MS; };
    const isTyping = () => Date.now() < __typingGuardUntil;

    const isMediaViewPath = (pathname) => /\/status\/\d+\/(?:photo|video|media|analytics)(?:\/\d+)?\/?$/.test(pathname);
    const isComposePath = (pathname) => /^\/compose\/post(?:\/|$)/.test(pathname);
    const isProfileMediaPath = (pathname) => /^\/[A-Za-z0-9_]{1,50}\/(?:photo|header_photo)\/?$/.test(pathname);
    const isBlockedPath = (pathname) => isMediaViewPath(pathname) || isComposePath(pathname) || isProfileMediaPath(pathname);

    GM_addStyle(`
        :root { --modal-primary-color:#1d9bf0; --modal-primary-color-hover:#1a8cd8; --modal-primary-text-color:#fff; }
        #advanced-search-trigger { position:fixed; top:18px; right:20px; z-index:9999; background-color:var(--modal-primary-color); color:var(--modal-primary-text-color); border:none; border-radius:50%; width:50px; height:50px; font-size:24px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; transition:transform .2s, background-color .2s; }
        #advanced-search-trigger:hover { transform:scale(1.1); background-color:var(--modal-primary-color-hover); }
        #advanced-search-modal { position:fixed; z-index:10000; width:450px; display:none; flex-direction:column; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; background-color:var(--modal-bg, #000); color:var(--modal-text-primary, #e7e9ea); border:1px solid var(--modal-border, #333); border-radius:16px; box-shadow:0 8px 24px rgba(29,155,240,.2); transition:background-color .2s,color .2s,border-color .2s; }
        .adv-modal-header{padding:12px 16px;border-bottom:1px solid var(--modal-border,#333);cursor:move;display:flex;justify-content:space-between;align-items:center}
        .adv-modal-header h2{margin:0;font-size:18px;font-weight:700}
        .adv-modal-close{background:0 0;border:none;color:var(--modal-close-color,#e7e9ea);font-size:24px;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background-color .2s}
        .adv-modal-close:hover{background-color:var(--modal-close-hover-bg,rgba(231,233,234,.1))}
        .adv-modal-body{flex:1;overflow-y:auto;padding:0}
        .adv-form-group{margin-bottom:16px}
        .adv-form-group label{display:block;margin-bottom:6px;font-size:14px;font-weight:700;color:var(--modal-text-secondary,#8b98a5)}
        .adv-form-group input[type=text],.adv-form-group input[type=number],.adv-form-group input[type=date],.adv-form-group select{width:100%;background-color:var(--modal-input-bg,#202327);border:1px solid var(--modal-input-border,#38444d);border-radius:4px;padding:8px 12px;color:var(--modal-text-primary,#e7e9ea);font-size:15px;box-sizing:border-box}
        .adv-form-group input:focus,.adv-form-group select:focus{outline:0;border-color:var(--modal-primary-color)}
        .adv-form-group input::placeholder{color:var(--modal-text-secondary,#536471)}
        .adv-form-group-date-container{display:flex;gap:10px}
        .adv-filter-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .adv-checkbox-group{background-color:var(--modal-input-bg,#202327);border:1px solid var(--modal-input-border,#38444d);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px}
        .adv-checkbox-group span{font-weight:700;font-size:14px;color:var(--modal-text-primary,#e7e9ea)}
        .adv-checkbox-item{display:flex;align-items:center}
        .adv-checkbox-item input{margin-right:8px; accent-color:var(--modal-primary-color);}
        .adv-checkbox-item label{color:var(--modal-text-secondary,#8b98a5);margin-bottom:0}
        .adv-modal-footer{padding:12px 16px;border-top:1px solid var(--modal-border,#333);display:flex;justify-content:flex-end;gap:12px}
        .adv-modal-button{padding:8px 16px;border-radius:9999px;border:1px solid var(--modal-text-secondary,#536471);background-color:transparent;color:var(--modal-text-primary,#e7e9ea);font-weight:700;cursor:pointer;transition:background-color .2s}
        .adv-modal-button:hover{background-color:var(--modal-button-hover-bg,rgba(231,233,234,.1))}
        .adv-modal-button.primary{background-color:var(--modal-primary-color);border-color:var(--modal-primary-color);color:var(--modal-primary-text-color)}
        .adv-modal-button.primary:hover{background-color:var(--modal-primary-color-hover)}
        .adv-modal-button[disabled]{opacity:.5; cursor:not-allowed;}
        .adv-modal-body::-webkit-scrollbar{width:8px}
        .adv-modal-body::-webkit-scrollbar-track{background:var(--modal-scrollbar-track,#202327)}
        .adv-modal-body::-webkit-scrollbar-thumb{background:var(--modal-scrollbar-thumb,#536471);border-radius:4px}
        body.adv-dragging{user-select:none}
        .adv-account-label-group{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .adv-exclude-toggle{display:flex;align-items:center}
        .adv-exclude-toggle input{margin-right:4px}
        .adv-exclude-toggle label{font-size:13px;font-weight:normal;color:var(--modal-text-secondary,#8b98a5);cursor:pointer}
        hr.adv-separator{border:none;height:1px;background-color:var(--hr-color,#333);margin:20px 0;transition:background-color .2s}
        #adv-zoom-root{ transform-origin: top left; will-change: transform; padding:16px; }
        .adv-modal-body{ overflow:auto; }

        .adv-form-row.two-cols { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media (max-width: 480px) { .adv-form-row.two-cols { grid-template-columns:1fr; } }

        .adv-tabs { display:flex; border-bottom:1px solid var(--modal-border,#333); padding:0 8px; gap:6px; align-items:stretch; }
        .adv-tab-btn { appearance:none; border:none; background:transparent; color:var(--modal-text-secondary,#8b98a5); padding:10px 12px; cursor:pointer; font-weight:700; border-radius:8px 8px 0 0; font-size:12.5px; }
        .adv-tab-btn.active { color:var(--modal-text-primary,#e7e9ea); background-color:var(--modal-input-bg,#202327); border:1px solid var(--modal-input-border,#38444d); border-bottom:none; }
        .adv-tab-content { display:none; }
        .adv-tab-content.active { display:block; }
        #adv-tab-history, #adv-tab-saved, #adv-tab-accounts, #adv-tab-lists { padding:12px 16px; }

        .adv-secret-wrap { display:flex; align-items:center; gap:8px; }
        .adv-secret-btn { cursor:pointer; border:1px solid var(--modal-input-border,#38444d); background:var(--modal-input-bg,#202327); color:var(--modal-text-primary,#e7e9ea); padding:4px 8px; border-radius:9999px; font-weight:700; user-select:none; display:flex; align-items:center; gap:6px; font-size:12px; }
        .adv-secret-btn .dot { width:7px; height:7px; border-radius:50%; background:#777; box-shadow:0 0 0px #0000; transition:all .2s; }
        .adv-secret-btn.off { opacity:0.9; }
        .adv-secret-btn.on { background-color:var(--modal-primary-color); border-color:var(--modal-primary-color); color:var(--modal-primary-text-color); }
        .adv-secret-btn.on .dot { background:#fff; box-shadow:0 0 8px rgba(255,255,255,.9); }

        .adv-list { display:flex; flex-direction:column; gap:8px; }
        .adv-item { border:1px solid var(--modal-input-border,#38444d); background:var(--modal-input-bg,#202327); border-radius:8px; padding:8px; display:flex; gap:8px; align-items:flex-start; }
        .adv-item.dragging { opacity:.6; }
        .adv-item-handle { cursor:grab; user-select:none; padding:4px 6px; border-radius:6px; border:1px dashed var(--modal-border,#333); }
        .adv-item-avatar { width:36px; height:36px; border-radius:9999px; object-fit:cover; flex:0 0 auto; background:var(--modal-border,#333); }
        a.adv-link { color: inherit; text-decoration: none; }
        a.adv-link:hover { text-decoration: underline; cursor: pointer; }
        .adv-item-avatar-link { display:inline-block; border-radius:9999px; }
        .adv-item-main { flex:1; min-width:0; }
        .adv-item-title { font-size:14px; font-weight:700; color:var(--modal-text-primary,#e7e9ea); word-break:break-word; }
        .adv-item-sub { font-size:12px; color:var(--modal-text-secondary,#8b98a5); margin-top:2px; display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
        .adv-item-actions { display:flex; gap:6px; align-items:center; align-self:center; }
        .adv-chip { border:1px solid var(--modal-input-border,#38444d); background:transparent; color:var(--modal-text-primary,#e7e9ea); padding:4px 8px; border-radius:9999px; font-size:12px; cursor:pointer; }
        .adv-chip.danger { border-color:#8b0000; color:#ffb3b3; }
        .adv-chip.primary { background-color:var(--modal-primary-color); border-color:var(--modal-primary-color); color:var(--modal-primary-text-color); }
        .adv-chip.scope { padding:2px 6px; font-size:11px; line-height:1.2; opacity:0.95; }

        .adv-toast { position:fixed; z-index:10001; left:50%; transform:translateX(-50%); bottom:24px; background:#111a; color:#fff; backdrop-filter: blur(6px); border:1px solid #fff3; padding:8px 12px; border-radius:8px; font-weight:700; opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; }
        .adv-toast.show { opacity:1; transform:translateX(-50%) translateY(-6px); }

        .adv-modal-footer { justify-content:flex-end; }
        .adv-modal-footer .adv-modal-button#adv-save-button { margin-right:auto; }

        .adv-tab-toolbar { display:flex; justify-content:flex-end; margin-bottom:8px; }

        [data-testid="cellInnerDiv"][data-adv-hidden],
        article[data-adv-hidden] { display:none !important; }

        #advanced-search-modal { max-height:none; }
        .adv-resizer { position:absolute; z-index:10002; background:transparent; }
        .adv-resizer.e, .adv-resizer.w { top:-3px; bottom:-3px; width:8px; }
        .adv-resizer.e { right:-3px; cursor: ew-resize; }
        .adv-resizer.w { left:-3px;  cursor: ew-resize; }
        .adv-resizer.n, .adv-resizer.s { left:-3px; right:-3px; height:8px; }
        .adv-resizer.n { top:-3px;    cursor: ns-resize; }
        .adv-resizer.s { bottom:-3px; cursor: ns-resize; }
        .adv-resizer.se, .adv-resizer.ne, .adv-resizer.sw, .adv-resizer.nw { width:12px; height:12px; }
        .adv-resizer.se { right:-4px;  bottom:-4px; cursor:nwse-resize; }
        .adv-resizer.ne { right:-4px;  top:-4px;    cursor:nesw-resize; }
        .adv-resizer.sw { left:-4px;   bottom:-4px; cursor:nesw-resize; }
        .adv-resizer.nw { left:-4px;   top:-4px;    cursor:nwse-resize; }

        /* ▶ Mute タブ */
        .adv-mute-add { display:flex; gap:8px; align-items:center; margin-bottom:10px; }
        .adv-mute-add input[type=text]{ flex:1; }
        .adv-mute-list { display:flex; flex-direction:column; gap:8px; }

        /* ▼ グローバル無効（マスターOFF）のとき：リスト全体を淡く */
        .adv-mute-list.disabled {
          opacity: .6;
          filter: grayscale(35%);
        }

        /* ▼ 個別無効（enabled=false）の行だけ淡く＋打ち消し等の視覚 */
        .adv-mute-item {
          border:1px solid var(--modal-input-border,#38444d);
          background:var(--modal-input-bg,#202327);
          border-radius:8px;
          padding:8px;
          display:flex;
          flex-wrap: wrap;
          gap:8px;
          align-items:flex-start;
          transition: opacity .15s ease, filter .15s ease, border-color .15s ease;
        }
        .adv-mute-item.disabled {
          opacity: .55;
          filter: grayscale(25%);
          border-color: color-mix(in oklab, var(--modal-input-border,#38444d), transparent 20%);
        }
        .adv-mute-item.disabled .adv-mute-word {
          color: var(--modal-text-secondary,#8b98a5);
          text-decoration: line-through;
        }

        .adv-mute-word {
          font-weight:700;
          color:var(--modal-text-primary,#e7e9ea);
          word-break:break-word;
        }

        .adv-mute-actions {
          display:flex;
          gap:6px;
          align-items:center;
          flex: 0 0 auto;
          white-space: nowrap;
          margin-left: auto;
        }
        @media (max-width: 480px) {
          .adv-mute-actions { margin-top: 4px; }
        }
        .adv-toggle {
          display: inline-flex;
          gap: 6px;
          align-items: center;
          color: var(--modal-text-secondary,#8b98a5);
          line-height: 1;
          margin-bottom:0!important;
        }
        .adv-toggle input[type="checkbox"] {
          width: 14px;
          height: 14px;
          margin: 0;
          flex: 0 0 auto;
          vertical-align: middle;
        }
        .adv-toggle span {
          font-size: 11px;
          line-height: 1;
        }
        .adv-mute-header { display:flex; justify-content:space-between; align-items:center; margin:12px 0 6px; }
        .adv-mute-title  { font-weight:700; color: var(--modal-text-primary,#e7e9ea); }

        /* マスター切替の一瞬だけ付けるガードクラス */
        .adv-no-anim, .adv-no-anim * {
          transition: none !important;
        }
        #adv-accounts-empty:not(:empty),
        #adv-lists-empty:not(:empty) {
          padding: 12px;
        }

        /* ▼ マスターOFF中は、個別無効の“さらに薄く”を抑制（親の薄さのみ適用） */
        .adv-mute-list.disabled .adv-mute-item.disabled {
          opacity: 1;    /* 子の追加の薄さを無効化（親のopacityのみが効く） */
          filter: none;  /* 子の追加グレースケールも無効化（親側のfilterのみ適用） */
          /* ボーダーだけ通常色に戻す */
          /* border-color: var(--modal-input-border,#38444d); */
        }

        /* === Trigger: モーダルと同質の見た目に合わせる === */
        #advanced-search-trigger.adv-trigger-search {
          width: 49px; height: 49px;
          border-radius: 9999px;
          background-color: var(--modal-bg, #000);
          color: var(--modal-text-primary, #e7e9ea);
          border: 2px solid var(--modal-border, #2f3336);          /* ← モーダルと同じ枠色 */
          box-shadow: 0 8px 24px rgba(29,155,240,.2);              /* ← モーダルと同じshadow */
          display:flex; align-items:center; justify-content:center;
          transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
        }

        #advanced-search-trigger.adv-trigger-search:hover {
          /* 背景は変えず、浮かせる表現だけ強化 */
          transform: translateZ(0) scale(1.04);
          box-shadow: 0 12px 36px rgba(29,155,240,.28);
          border-color: var(--modal-border, #2f3336);
        }

        #advanced-search-trigger.adv-trigger-search:active {
          transform: translateZ(0) scale(0.98);
          box-shadow: 0 6px 18px rgba(29,155,240,.22);
        }

        #advanced-search-trigger.adv-trigger-search:focus-visible {
          outline: none;
          box-shadow:
            0 8px 24px rgba(29,155,240,.2),
            0 0 0 3px color-mix(in oklab, var(--modal-primary-color, #1d9bf0) 45%, transparent);
        }

        #advanced-search-trigger.adv-trigger-search svg {
          width: 22px; height: 22px;
          display:block;
          /* 検索アイコンは stroke="currentColor" を使っているので配色は自動追従 */
        }

        /* === Folders === */
        .adv-folder { border:1px solid var(--modal-input-border,#38444d); border-radius:10px; margin-bottom:10px; }
        .adv-folder-header {
          display:flex; justify-content:space-between; align-items:center;
          padding:8px 10px; background:var(--modal-input-bg,#202327); border-bottom:1px solid var(--modal-input-border,#38444d);
        }
        .adv-folder-header[data-drop="1"] { outline:2px dashed var(--modal-primary-color); outline-offset:-4px; }
        .adv-folder-title { display:flex; gap:8px; align-items:baseline; }
        .adv-folder-actions { display:flex; gap:6px; }
        .adv-folder-toolbar { display:flex; gap:8px; align-items:center; margin:0 0 12px; padding:0 2px; }
        .adv-folder-toolbar input[type="text"] { flex:1; min-width:80px; }
        .adv-select, .adv-input { background-color:var(--modal-input-bg,#202327); border:1px solid var(--modal-input-border,#38444d); border-radius:8px; padding:6px 10px; color:var(--modal-text-primary,#e7e9ea); }
        .adv-folder-collapsed .adv-list { display:none; }

        /* ▶ Folder headers: show grab cursor except on action buttons */
        .adv-folder-header { cursor: grab; }
        .adv-folder-header:active { cursor: grabbing; }

        /* ボタン上では通常のポインタ（=ドラッグ開始させない見た目） */
        .adv-folder-header .adv-folder-actions,
        .adv-folder-header .adv-folder-actions * {
          cursor: pointer;
        }

        /* ▼ トグルボタン（左端） */
        .adv-folder-toggle {
          appearance: none;
          border: none;
          background: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          margin-right: 6px;
        }

        .adv-folder-toggle:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--modal-primary-color, #1d9bf0) 60%, transparent);
        }

        /* ▼ アイコン（chevron） */
        .adv-folder-toggle svg {
          width: 16px; height: 16px;
          transition: transform .15s ease;
        }

        /* ▼ 開閉で向きを変える（右▶ → 下▼） */
        .adv-folder:not(.adv-folder-collapsed) .adv-folder-toggle svg {
          transform: rotate(90deg);
        }

        /* ▼ 開いているヘッダーはわずかに背景強調 */
        .adv-folder:not(.adv-folder-collapsed) .adv-folder-header {
          background: color-mix(in oklab, var(--modal-input-bg,#202327) 92%, var(--modal-primary-color,#1d9bf0));
        }

        /* ▼ ドラッグハンドルは“掴める”見た目を強調 */
        .adv-folder-drag-handle {
          cursor: grab;
          user-select: none;
          padding: 4px 6px;
          border-radius: 6px;
          border: 1px dashed var(--modal-border,#38444d);
        }
        .adv-folder-drag-handle:active { cursor: grabbing; }

        /* ▼ Unassigned セクション（見出しなし・枠なし） */
        .adv-unassigned {
          margin-bottom: 10px;
          min-height: 30px; /* ★ 空の時でもドロップできるように最小高さを確保 */
        }
        .adv-unassigned .adv-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        /* フォルダー並び替え用のドラッグ時の視覚（Unassigned も対象） */
        .adv-unassigned.dragging-folder {
          opacity: .6;
        }

        /* タブ背景およびリストコンテナ背景へのドロップハイライト */
        #adv-tab-accounts.adv-bg-drop-active,
        #adv-tab-lists.adv-bg-drop-active,
        #adv-accounts-list.adv-bg-drop-active,
        #adv-lists-list.adv-bg-drop-active {
          outline: 2px dashed var(--modal-primary-color, #1d9bf0);
          /* リストコンテナ側はパディングが無いためオフセットを小さく */
          outline-offset: -4px;
        }
        /* タブパネル（上部余白）側は既存のオフセットを維持 */
        #adv-tab-accounts.adv-bg-drop-active,
        #adv-tab-lists.adv-bg-drop-active {
          outline-offset: -8px;
        }

    `);

    const modalHTML = `
        <div id="advanced-search-modal">
            <div class="adv-modal-header">
                <h2 data-i18n="modalTitle"></h2>
                <div class="adv-secret-wrap">
                    <button id="adv-secret-btn" class="adv-secret-btn off" data-i18n-title="tooltipSecret" title="">
                        <span class="dot" aria-hidden="true"></span>
                        <span id="adv-secret-label" data-i18n="secretMode"></span>
                        <span id="adv-secret-state" style="font-weight:700;"></span>
                    </button>
                    <button class="adv-modal-close" data-i18n-title="tooltipClose">&times;</button>
                </div>
            </div>
            <div class="adv-modal-body">
                <div class="adv-tabs">
                    <button class="adv-tab-btn active" data-tab="search" data-i18n="tabSearch"></button>
                    <button class="adv-tab-btn" data-tab="history" data-i18n="tabHistory"></button>
                    <button class="adv-tab-btn" data-tab="saved" data-i18n="tabSaved"></button>
                    <button class="adv-tab-btn" data-tab="mute" data-i18n="tabMute"></button>
                    <button class="adv-tab-btn" data-tab="lists" data-i18n="tabLists"></button>
                    <button class="adv-tab-btn" data-tab="accounts" data-i18n="tabAccounts"></button>
                </div>

                <div class="adv-tab-content active" id="adv-tab-search">
                    <div id="adv-zoom-root">
                    <form id="advanced-search-form">
                        <div class="adv-form-group"><label for="adv-all-words" data-i18n="labelAllWords"></label><input type="text" id="adv-all-words" data-i18n-placeholder="placeholderAllWords"></div>
                        <div class="adv-form-group"><label for="adv-exact-phrase" data-i18n="labelExactPhrase"></label><input type="text" id="adv-exact-phrase" data-i18n-placeholder="placeholderExactPhrase"></div>
                        <div class="adv-form-group"><label for="adv-any-words" data-i18n="labelAnyWords"></label><input type="text" id="adv-any-words" data-i18n-placeholder="placeholderAnyWords"></div>
                        <div class="adv-form-group"><label for="adv-not-words" data-i18n="labelNotWords"></label><input type="text" id="adv-not-words" data-i18n-placeholder="placeholderNotWords"></div>
                        <div class="adv-form-group"><label for="adv-hashtag" data-i18n="labelHashtag"></label><input type="text" id="adv-hashtag" data-i18n-placeholder="placeholderHashtag"></div>
                        <div class="adv-form-group">
                          <label for="adv-lang" data-i18n="labelLang"></label>
                          <select id="adv-lang">
                            <option value="" data-i18n="optLangDefault"></option>
                            <option value="ja" data-i18n="optLangJa"></option>
                            <option value="en" data-i18n="optLangEn"></option>
                            <option value="id" data-i18n="optLangId"></option>     <!-- インドネシア -->
                            <option value="hi" data-i18n="optLangHi"></option>     <!-- ヒンディー（インド） -->
                            <option value="de" data-i18n="optLangDe"></option>     <!-- ドイツ -->
                            <option value="tr" data-i18n="optLangTr"></option>     <!-- トルコ -->
                            <option value="es" data-i18n="optLangEs"></option>     <!-- スペイン語（メキシコ含む） -->
                            <option value="pt" data-i18n="optLangPt"></option>     <!-- ポルトガル語（ブラジル）-->
                            <option value="ar" data-i18n="optLangAr"></option>     <!-- アラビア語（サウジ等） -->
                            <option value="fr" data-i18n="optLangFr"></option>
                            <option value="ko" data-i18n="optLangKo"></option>
                            <option value="ru" data-i18n="optLangRu"></option>
                            <option value="zh-cn" data-i18n="optLangZhHans"></option> <!-- 簡体中文 -->
                            <option value="zh-tw" data-i18n="optLangZhHant"></option> <!-- 繁體中文 -->
                          </select>
                        </div>
                        <hr class="adv-separator">
                        <div class="adv-form-group">
                            <label data-i18n="labelFilters"></label>
                            <div class="adv-filter-grid">
                                <div class="adv-checkbox-group"><span data-i18n="labelVerified"></span><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-verified-include"><label for="adv-filter-verified-include" data-i18n="checkInclude"></label></div><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-verified-exclude"><label for="adv-filter-verified-exclude" data-i18n="checkExclude"></label></div></div>
                                <div class="adv-checkbox-group"><span data-i18n="labelLinks"></span><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-links-include"><label for="adv-filter-links-include" data-i18n="checkInclude"></label></div><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-links-exclude"><label for="adv-filter-links-exclude" data-i18n="checkExclude"></label></div></div>
                                <div class="adv-checkbox-group"><span data-i18n="labelImages"></span><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-images-include"><label for="adv-filter-images-include" data-i18n="checkInclude"></label></div><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-images-exclude"><label for="adv-filter-images-exclude" data-i18n="checkExclude"></label></div></div>
                                <div class="adv-checkbox-group"><span data-i18n="labelVideos"></span><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-videos-include"><label for="adv-filter-videos-include" data-i18n="checkInclude"></label></div><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-videos-exclude"><label for="adv-filter-videos-exclude" data-i18n="checkExclude"></label></div></div>
                            </div>
                        </div>

                        <div class="adv-form-group" title="" data-i18n-title="hintSearchTarget">
                          <label data-i18n="labelSearchTarget"></label>
                          <div class="adv-checkbox-group">
                            <div class="adv-checkbox-item">
                              <input type="checkbox" id="adv-exclude-hit-name" checked>
                              <label for="adv-exclude-hit-name" data-i18n="labelHitName" title="" data-i18n-title="hintName"></label>
                            </div>
                            <div class="adv-checkbox-item">
                              <input type="checkbox" id="adv-exclude-hit-handle" checked>
                              <label for="adv-exclude-hit-handle" data-i18n="labelHitHandle" title="" data-i18n-title="hintHandle"></label>
                            </div>
                          </div>
                        </div>

                        <div class="adv-form-row two-cols">
                            <div class="adv-form-group">
                                <label for="adv-account-scope" data-i18n="labelAccountScope"></label>
                                <select id="adv-account-scope">
                                    <option value="" data-i18n="optAccountAll"></option>
                                    <option value="following" data-i18n="optAccountFollowing"></option>
                                </select>
                            </div>
                            <div class="adv-form-group">
                                <label for="adv-location-scope" data-i18n="labelLocationScope"></label>
                                <select id="adv-location-scope">
                                    <option value="" data-i18n="optLocationAll"></option>
                                    <option value="nearby" data-i18n="optLocationNearby"></option>
                                </select>
                            </div>
                        </div>

                        <div class="adv-form-group"><label data-i18n="labelReplies"></label><select id="adv-replies"><option value="" data-i18n="optRepliesDefault"></option><option value="include" data-i18n="optRepliesInclude"></option><option value="only" data-i18n="optRepliesOnly"></option><option value="exclude" data-i18n="optRepliesExclude"></option></select></div>
                        <hr class="adv-separator">
                        <div class="adv-form-group">
                            <label data-i18n="labelEngagement"></label>
                            <div class="adv-filter-grid">
                                <input type="number" id="adv-min-replies" data-i18n-placeholder="placeholderMinReplies" min="0">
                                <input type="number" id="adv-min-faves" data-i18n-placeholder="placeholderMinLikes" min="0">
                                <input type="number" id="adv-min-retweets" data-i18n-placeholder="placeholderMinRetweets" min="0">
                            </div>
                        </div>
                        <div class="adv-form-group">
                            <label data-i18n="labelDateRange"></label>
                            <div class="adv-form-group-date-container">
                                <input type="date" id="adv-since" data-i18n-title="tooltipSince">
                                <input type="date" id="adv-until" data-i18n-title="tooltipUntil">
                            </div>
                        </div>
                        <hr class="adv-separator">
                        <div class="adv-form-group">
                            <div class="adv-account-label-group">
                                <label for="adv-from-user" data-i18n="labelFromUser"></label>
                                <div class="adv-exclude-toggle"><input type="checkbox" id="adv-from-user-exclude"><label for="adv-from-user-exclude" data-i18n="checkExclude"></label></div>
                            </div>
                            <input type="text" id="adv-from-user" data-i18n-placeholder="placeholderFromUser">
                        </div>
                        <div class="adv-form-group">
                            <div class="adv-account-label-group">
                                <label for="adv-to-user" data-i18n="labelToUser"></label>
                                <div class="adv-exclude-toggle"><input type="checkbox" id="adv-to-user-exclude"><label for="adv-to-user-exclude" data-i18n="checkExclude"></label></div>
                            </div>
                            <input type="text" id="adv-to-user" data-i18n-placeholder="placeholderToUser">
                        </div>
                        <div class="adv-form-group">
                            <div class="adv-account-label-group">
                                <label for="adv-mentioning" data-i18n="labelMentioning"></label>
                                <div class="adv-exclude-toggle"><input type="checkbox" id="adv-mentioning-exclude"><label for="adv-mentioning-exclude" data-i18n="checkExclude"></label></div>
                            </div>
                            <input type="text" id="adv-mentioning" data-i18n-placeholder="placeholderMentioning">
                        </div>
                    </form>
                    </div>
                </div>

                <div class="adv-tab-content" id="adv-tab-history">
                    <div class="adv-tab-toolbar">
                        <button id="adv-history-clear-all" class="adv-chip danger"></button>
                    </div>
                    <div id="adv-history-empty" class="adv-item-sub"></div>
                    <div id="adv-history-list" class="adv-list"></div>
                </div>

                <div class="adv-tab-content" id="adv-tab-saved">
                    <div id="adv-saved-empty" class="adv-item-sub"></div>
                    <div id="adv-saved-list" class="adv-list"></div>
                </div>

                <div class="adv-tab-content" id="adv-tab-lists">
                    <div id="adv-lists-empty" class="adv-item-sub"></div>
                    <div id="adv-lists-list" class="adv-list"></div>
                </div>

                <div class="adv-tab-content" id="adv-tab-accounts">
                    <div id="adv-accounts-empty" class="adv-item-sub"></div>
                    <div id="adv-accounts-list" class="adv-list"></div>
                </div>

                <!-- ▶ Mute タブ -->
                <div class="adv-tab-content" id="adv-tab-mute">
                  <div style="padding:12px 16px;">
                    <div class="adv-form-group">
                      <!-- 追加する並び：まず“追加”UI -->
                      <div class="adv-mute-add">
                        <input type="text" id="adv-mute-input" data-i18n-placeholder="placeholderMuteWord">
                        <button id="adv-mute-add" class="adv-modal-button" data-i18n="buttonAdd"></button>
                        <label class="adv-toggle" title="">
                          <input type="checkbox" id="adv-mute-cs">
                          <span data-i18n="labelCaseSensitive"></span>
                        </label>
                      </div>

                      <!-- ▼ 新しい見出しブロック（ミュート一覧 + すべて有効/無効） -->
                      <div class="adv-mute-header" style="margin-top:12px;">
                        <div class="adv-mute-title" data-i18n="mutedListHeading"></div>
                        <label class="adv-toggle">
                          <input type="checkbox" id="adv-mute-enable-all" checked>
                          <span data-i18n="labelEnableAll"></span>
                        </label>
                      </div>

                      <div id="adv-mute-empty" class="adv-item-sub"></div>
                      <div id="adv-mute-list" class="adv-mute-list"></div>
                    </div>
                  </div>
                </div>

            </div>
            <div class="adv-modal-footer">
                <button id="adv-save-button" class="adv-modal-button" data-i18n="buttonSave"></button>
                <button id="adv-clear-button" class="adv-modal-button" data-i18n="buttonClear"></button>
                <button id="adv-apply-button" class="adv-modal-button primary" data-i18n="buttonApply"></button>
            </div>
        </div>

        <div id="adv-toast" class="adv-toast" role="status" aria-live="polite"></div>
    `;

    const initialize = async () => {
        i18n.init();

        const kv = {
            get(key, def) { try { return GM_getValue(key, def); } catch (_) { return def; } },
            set(key, val) { try { GM_setValue(key, val); } catch (_) {} },
            del(key)      { try { GM_deleteValue(key); } catch (_) {} },
        };
        const loadJSON = (key, def) => {
            try {
                const raw = kv.get(key, JSON.stringify(def));
                return JSON.parse(raw);
            } catch(_) { return def; }
        };
        const saveJSON = (key, value) => {
            try { kv.set(key, JSON.stringify(value)); } catch(_) {}
        };

        const trigger = document.createElement('button');
        trigger.id = 'advanced-search-trigger';
        trigger.type = 'button';
        trigger.innerHTML = SEARCH_SVG;
        trigger.classList.add('adv-trigger-search');
        trigger.setAttribute('aria-label', i18n.t('tooltipTrigger'));
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-expanded', 'false');
        document.body.appendChild(trigger);

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        i18n.apply(modalContainer);

        const modal = document.getElementById('advanced-search-modal');
        const form = document.getElementById('advanced-search-form');
        const closeButton = modal.querySelector('.adv-modal-close');
        const clearButton = document.getElementById('adv-clear-button');
        const applyButton = document.getElementById('adv-apply-button');
        const saveButton = document.getElementById('adv-save-button');
        const footerEl = modal.querySelector('.adv-modal-footer');
        const toastEl = document.getElementById('adv-toast');
        const secretBtn = document.getElementById('adv-secret-btn');
        const secretStateEl = document.getElementById('adv-secret-state');

        const historyClearAllBtn = document.getElementById('adv-history-clear-all');
        historyClearAllBtn.textContent = i18n.t('historyClearAll');

        const accountScopeSel = document.getElementById('adv-account-scope');
        const locationScopeSel = document.getElementById('adv-location-scope');

        ['n','e','s','w','ne','nw','se','sw'].forEach(dir => {
            const h = document.createElement('div');
            h.className = `adv-resizer ${dir}`;
            h.dataset.dir = dir;
            modal.appendChild(h);
        });

        const EXC_NAME_KEY   = 'advExcludeHitName_v1';
        const EXC_HANDLE_KEY = 'advExcludeHitHandle_v1';
        const excNameEl   = document.getElementById('adv-exclude-hit-name');
        const excHandleEl = document.getElementById('adv-exclude-hit-handle');
        const loadExcludeFlags = () => ({
            name: kv.get(EXC_NAME_KEY, '1') === '1',
            handle: kv.get(EXC_HANDLE_KEY, '1') === '1',
        });
        const saveExcludeFlags = (v) => {
            kv.set(EXC_NAME_KEY, v.name ? '1':'0');
            kv.set(EXC_HANDLE_KEY, v.handle ? '1':'0');
        };
        {
            const st = loadExcludeFlags();
            if (excNameEl) excNameEl.checked = st.name;
            if (excHandleEl) excHandleEl.checked = st.handle;
        }
        [excNameEl, excHandleEl].forEach(el=>{
            if (!el) return;
            el.addEventListener('change', ()=>{
                saveExcludeFlags({ name: excNameEl.checked, handle: excHandleEl.checked });
                scanAndFilterTweets();
            });
        });

        themeManager.observeChanges(modal, trigger);

        // Accounts/Listsタブの背景をドロップターゲットにするためのヘルパー
        const setupBackgroundDrop = (panel, host, unassignFunction) => {
            const feedbackClass = 'adv-bg-drop-active';
            const SECT_MIME = 'adv/folder'; // フォルダ並び替えD&DのMIME
            const targets = [panel, host].filter(Boolean); // ★ パネルとホストの両方を対象にする

            const onDragEnter = (ev) => {
                // アイテム（text/plain）であり、セクション（adv/folder）ではない
                if (ev.dataTransfer.types && !ev.dataTransfer.types.includes(SECT_MIME) && ev.dataTransfer.types.includes('text/plain')) {
                    // ターゲットがパネル自身またはホスト自身（＝子要素の上ではない）
                    if (targets.includes(ev.target)) {
                        ev.target.classList.add(feedbackClass);
                    }
                }
            };

            const onDragLeave = (ev) => {
                // ターゲット自身から離れた時だけフィードバックを消す
                if (targets.includes(ev.target)) {
                    ev.target.classList.remove(feedbackClass);
                }
            };

            const onDragOver = (ev) => {
                // dropイベントを発火させるために、dragoverでpreventDefaultが必要
                // アイテムであり、ターゲットがパネル/ホスト自身の場合のみ許可
                if (targets.includes(ev.target) && ev.dataTransfer.types && !ev.dataTransfer.types.includes(SECT_MIME) && ev.dataTransfer.types.includes('text/plain')) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    ev.target.classList.add(feedbackClass); // 継続してハイライト
                } else {
                    // 子要素（フォルダなど）の上に来たら背景ハイライトは消す
                    targets.forEach(t => t.classList.remove(feedbackClass));
                }
            };

            const onDrop = (ev) => {
                targets.forEach(t => t.classList.remove(feedbackClass)); // ドロップ時は常にハイライト解除

                // 最終チェック：アイテムであり、パネル/ホスト自身へのドロップ
                if (targets.includes(ev.target) && ev.dataTransfer.types && !ev.dataTransfer.types.includes(SECT_MIME) && ev.dataTransfer.types.includes('text/plain')) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const draggedId = ev.dataTransfer.getData('text/plain');
                    if (draggedId) {
                        unassignFunction(draggedId); // (unassignAccount または unassignList を実行)
                    }
                }
            };

            targets.forEach(target => {
                if (!target) return; // hostがまだ存在しない場合など
                target.addEventListener('dragenter', onDragEnter);
                target.addEventListener('dragleave', onDragLeave);
                target.addEventListener('dragover', onDragOver);
                target.addEventListener('drop', onDrop);
            });
        };

        // 未分類化ロジックを共通化 (Account用)
        const unassignAccount = (draggedId) => {
            // 1. すべてのフォルダからこのIDを削除
            const fArr = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
            let changed = false;
             for (const f_other of fArr) {
              const o_before = f_other.order.length;
              f_other.order = f_other.order.filter(id => id !== draggedId);
              if (f_other.order.length !== o_before) {
                f_other.ts = Date.now();
                changed = true;
              }
            }
            if (changed) {
              saveFolders(ACCOUNTS_FOLDERS_KEY, fArr);
            }

            // 2. マスターリストの順序を変更し、Unassigned内で先頭に来るようにする
            const cur = loadAccounts();
            const item = cur.find(x => x.id === draggedId);
            if (item) {
              const others = cur.filter(x => x.id !== draggedId);
              saveAccounts([item, ...others]);
            }
            showToast(i18n.t('toastReordered'));
            renderAccounts();
        };

        // 未分類化ロジックを共通化 (List用)
        const unassignList = (draggedId) => {
            // 1. すべてのフォルダからこのIDを削除
            const fArr = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
            let changed = false;
             for (const f_other of fArr) {
              const o_before = f_other.order.length;
              f_other.order = f_other.order.filter(id => id !== draggedId);
              if (f_other.order.length !== o_before) {
                f_other.ts = Date.now();
                changed = true;
              }
            }
            if (changed) {
              saveFolders(LISTS_FOLDERS_KEY, fArr);
            }

            // 2. マスターリストの順序を変更
            const cur = loadLists();
            const item = cur.find(x => x.id === draggedId);
            if (item) {
              const others = cur.filter(x => x.id !== draggedId);
              saveLists([item, ...others]);
            }
            showToast(i18n.t('toastReordered'));
            renderLists();
        };

        const ZOOM_STATE_KEY = 'advSearchZoom_v1';
        let zoom = 1.0;
        const ZOOM_MIN = 0.5, ZOOM_MAX = 2.0, ZOOM_STEP = 0.1;

        const zoomRoot = () => document.getElementById('adv-zoom-root');
        const loadZoom = () => {
            try {
                const z = parseFloat(kv.get(ZOOM_STATE_KEY, '1'));
                if (!Number.isNaN(z)) zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));
            } catch(_) {}
        };
        const saveZoom = () => { try { kv.set(ZOOM_STATE_KEY, String(zoom)); } catch(_) {} };
        const applyZoom = () => {
            const el = zoomRoot();
            if (!el) return;
            el.style.zoom = '';
            el.style.transform = '';
            el.style.width = '';
            if ('zoom' in el.style) {
                el.style.zoom = zoom;
            } else {
                el.style.transform = `scale(${zoom})`;
                el.style.width = `${(100/zoom).toFixed(3)}%`;
            }
        };
        const setZoom = (z) => { zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z*100)/100)); applyZoom(); saveZoom(); };
        const onWheelZoom = (e) => {
            const isAccel = e.ctrlKey || e.metaKey;
            if (!isAccel) return;
            if (!modal.contains(e.target)) return;
            e.preventDefault();
            const factor = e.deltaY > 0 ? (1 - ZOOM_STEP) : (1 + ZOOM_STEP);
            setZoom(zoom * factor);
        };
        const onKeyZoom = (e) => {
            const accel = (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey;
            if (!accel) return;
            if (!modal.contains(e.target)) return;
            const k = e.key;
            if (k === '+' || k === '=') { e.preventDefault(); setZoom(zoom + ZOOM_STEP); }
            else if (k === '-' || k === '_') { e.preventDefault(); setZoom(zoom - ZOOM_STEP); }
            else if (k === '0') { e.preventDefault(); setZoom(1.0); }
        };
        loadZoom();
        requestAnimationFrame(applyZoom);
        modal.addEventListener('wheel', onWheelZoom, { passive:false });
        modal.addEventListener('keydown', onKeyZoom);
        const modalDisplayObserver = new MutationObserver(() => { if (modal.style.display === 'flex') applyZoom(); });
        modalDisplayObserver.observe(modal, { attributes:true, attributeFilter:['style'] });

        const searchInputSelectors = [
            'div[data-testid="primaryColumn"] input[data-testid="SearchBox_Search_Input"]',
            'div[data-testid="sidebarColumn"] input[data-testid="SearchBox_Search_Input"]',
            'input[aria-label="Search query"]',
            'input[placeholder*="Search"]',
            'input[placeholder*="検索"]'
        ];
        const getActiveSearchInput = () => {
            for (const selector of searchInputSelectors) {
                const input = document.querySelector(selector);
                if (input && input.offsetParent !== null) return input;
            }
            const fallback = document.querySelector('input[data-testid="SearchBox_Search_Input"]');
            return (fallback && fallback.offsetParent !== null) ? fallback : null;
        };

        // React controlled input を確実に同期させる共通関数
        const syncControlledInput = (el, nextVal) => {
          try {
            const proto = Object.getPrototypeOf(el) || HTMLInputElement.prototype;
            const desc = Object.getOwnPropertyDescriptor(proto, 'value');
            if (desc && desc.set) {
              desc.set.call(el, nextVal); // React の setter を叩く
            } else {
              el.value = nextVal;
            }
            el.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }));
          } catch {
            try { el.value = nextVal; el.dispatchEvent(new Event('input', { bubbles: true })); } catch {}
          }
        };

        const MODAL_STATE_KEY   = 'advSearchModalState_v3.2';
        const TRIGGER_STATE_KEY = 'advSearchTriggerState_v1.0';
        const HISTORY_KEY = 'advSearchHistory_v2';
        const SAVED_KEY   = 'advSearchSaved_v2';
        const SECRET_KEY  = 'advSearchSecretMode_v1';

        const MUTE_KEY = 'advMutedWords_v1';
        const migrateMuted = (list) =>
          Array.isArray(list)
            ? list
                .map(it => ({
                  id: it.id || uid(),
                  word: (it.word||'').trim(),
                  cs: !!it.cs,
                  enabled: it.enabled !== false,
                  ts: it.ts || Date.now()
                }))
                .filter(it => it.word)
            : [];
        const loadMuted = () => migrateMuted(loadJSON(MUTE_KEY, []));
        const saveMuted = (arr) => saveJSON(MUTE_KEY, migrateMuted(arr));

        const addMuted = (word, cs=false) => {
          const w = (word||'').trim();
          if (!w) return;
          const list = loadMuted();
          if (list.some(it => it.word === w && !!it.cs === !!cs)) return;
          list.unshift({ id: uid(), word: w, cs: !!cs, enabled: true, ts: Date.now() });
          saveMuted(list);
          renderMuted();
          scanAndFilterTweets();
        };

        const deleteMuted = (id) => {
          const list = loadMuted().filter(it => it.id !== id);
          saveMuted(list);
          renderMuted();
          scanAndFilterTweets();
        };

        const toggleMutedCS = (id) => {
          const list = loadMuted().map(it => it.id === id ? { ...it, cs: !it.cs, ts: Date.now() } : it);
          saveMuted(list);
          renderMuted();
          scanAndFilterTweets();
        };

        const toggleMutedEnabled = (id) => {
          const list = loadMuted().map(it => it.id === id ? { ...it, enabled: !it.enabled, ts: Date.now() } : it);
          saveMuted(list);
          renderMuted();
          scanAndFilterTweets();
        };

        // マスターON/OFF（全体の適用を止めるだけ。各エントリの enabled は保持）
        const MUTE_MASTER_KEY = 'advMuteMasterEnabled_v1';
        const loadMuteMaster = () => { try { return kv.get(MUTE_MASTER_KEY, '1') === '1'; } catch(_) { return true; } };
        const saveMuteMaster = (on) => { try { kv.set(MUTE_MASTER_KEY, on ? '1' : '0'); } catch(_) {} };

        const tabButtons = Array.from(document.querySelectorAll('.adv-tab-btn'));
        const tabSearch = document.getElementById('adv-tab-search');
        const tabHistory = document.getElementById('adv-tab-history');
        const tabSaved = document.getElementById('adv-tab-saved');
        const tabLists = document.getElementById('adv-tab-lists');
        const tabAccounts = document.getElementById('adv-tab-accounts');
        const tabMute = document.getElementById('adv-tab-mute');

        // Get tab panels for background drop
        const tabAccountsPanel = document.getElementById('adv-tab-accounts');
        const tabListsPanel = document.getElementById('adv-tab-lists');

        const saveModalRelativeState = () => {
            if (modal.style.display === 'none') {
                try {
                    const current = (()=>{
                        try { return JSON.parse(kv.get(MODAL_STATE_KEY, '{}')); } catch(_) { return {}; }
                    })();
                    current.visible = false;
                    kv.set(MODAL_STATE_KEY, JSON.stringify(current));
                } catch(_) {}
                return;
            }
            const rect = modal.getBoundingClientRect();
            const winW = window.innerWidth, winH = window.innerHeight;
            const fromRight = winW - rect.right, fromBottom = winH - rect.bottom;
            const h_anchor = rect.left < fromRight ? 'left' : 'right';
            const h_value  = h_anchor === 'left' ? rect.left : fromRight;
            const v_anchor = rect.top  < fromBottom ? 'top'  : 'bottom';
            const v_value  = v_anchor === 'top' ? rect.top : fromBottom;
            const state = { h_anchor, h_value, v_anchor, v_value, visible: true,
                            w: Math.round(rect.width), h: Math.round(rect.height) };
            kv.set(MODAL_STATE_KEY, JSON.stringify(state));
        };
        const applyModalStoredPosition = () => {
            try {
                const s = JSON.parse(kv.get(MODAL_STATE_KEY, '{}'));
                const h_anchor = s.h_anchor || 'right';
                const h_value  = s.h_value ?? 20;
                const v_anchor = s.v_anchor || 'top';
                const v_value  = s.v_value ?? 80;
                modal.style.left = modal.style.right = modal.style.top = modal.style.bottom = 'auto';
                if (h_anchor === 'right') modal.style.right = `${h_value}px`; else modal.style.left = `${h_value}px`;
                if (v_anchor === 'bottom') modal.style.bottom = `${v_value}px`; else modal.style.top = `${v_value}px`;

                const minW = 300, minH = 240;
                if (s.w) modal.style.width  = `${Math.max(minW, Math.min(s.w, window.innerWidth  - 20))}px`;
                else     modal.style.width  = '450px';
                if (s.h) modal.style.height = `${Math.max(minH, Math.min(s.h, window.innerHeight - 20))}px`;
                else     modal.style.height = '';
            } catch(e) { console.error('Failed to apply modal position:', e); }
        };
        const keepModalInViewport = () => {
            if (modal.style.display === 'none') return;
            const rect = modal.getBoundingClientRect();
            const winW = window.innerWidth, winH = window.innerHeight, m = 10;

            const minW = 300, minH = 240;
            const maxW = Math.max(minW, winW - 2*m);
            const maxH = Math.max(minH, winH - 2*m);
            const w = Math.min(Math.max(rect.width,  minW), maxW);
            const h = Math.min(Math.max(rect.height, minH), maxH);
            if (Math.round(w) !== Math.round(rect.width))  modal.style.width  = `${w}px`;
            if (Math.round(h) !== Math.round(rect.height)) modal.style.height = `${h}px`;

            let x = rect.left, y = rect.top;
            if (x < m) x = m; if (y < m) y = m;
            if (x + w > winW - m) x = winW - w - m;
            if (y + h > winH - m) y = winH - h - m;
            if (Math.round(x) !== Math.round(rect.left) || Math.round(y) !== Math.round(rect.top)) {
                modal.style.left = `${x}px`; modal.style.top = `${y}px`;
                modal.style.right = 'auto'; modal.style.bottom = 'auto';
            }
        };
        const loadModalState = () => {
            try { applyModalStoredPosition(); } catch(e) {
                console.error('Failed to load modal state:', e);
                kv.del(MODAL_STATE_KEY);
            }
        };

        const saveTriggerRelativeState = () => {
            const rect = trigger.getBoundingClientRect();
            const winW = window.innerWidth, winH = window.innerHeight;
            const fromRight = winW - rect.right, fromBottom = winH - rect.bottom;
            const h_anchor = rect.left < fromRight ? 'left' : 'right';
            const h_value  = h_anchor === 'left' ? rect.left : fromRight;
            const v_anchor = rect.top  < fromBottom ? 'top'  : 'bottom';
            const v_value  = v_anchor === 'top' ? rect.top : fromBottom;
            const state = { h_anchor, h_value, v_anchor, v_value };
            kv.set(TRIGGER_STATE_KEY, JSON.stringify(state));
        };
        const applyTriggerStoredPosition = () => {
            try {
                const s = JSON.parse(kv.get(TRIGGER_STATE_KEY, '{}'));
                const h_anchor = s.h_anchor || 'right';
                const h_value  = s.h_value ?? 20;
                const v_anchor = s.v_anchor || 'top';
                const v_value  = s.v_value ?? 18;
                trigger.style.left = trigger.style.right = trigger.style.top = trigger.style.bottom = 'auto';
                if (h_anchor === 'right') trigger.style.right = `${h_value}px`; else trigger.style.left = `${h_value}px`;
                if (v_anchor === 'bottom') trigger.style.bottom = `${v_value}px`; else trigger.style.top = `${v_value}px`;
            } catch(e) { console.error('Failed to apply trigger position:', e); }
        };
        const keepTriggerInViewport = () => {
            const rect = trigger.getBoundingClientRect();
            const winW = window.innerWidth, winH = window.innerHeight, m = 6;
            let x = rect.left, y = rect.top;
            if (x < m) x = m; if (y < m) y = m;
            if (x + rect.width > winW - m) x = winW - rect.width - m;
            if (y + rect.height > winH - m) y = winH - rect.height - m;
            if (Math.round(x) !== Math.round(rect.left) || Math.round(y) !== Math.round(rect.top)) {
                trigger.style.left = `${x}px`; trigger.style.top = `${y}px`;
                trigger.style.right = 'auto'; trigger.style.bottom = 'auto';
                saveTriggerRelativeState();
            }
        };
        const setupTriggerDrag = () => {
            const DRAG_THRESHOLD = 4;
            let isPointerDown = false, isDragging = false, start = {x:0,y:0,left:0,top:0}, suppressClick=false;
            const onPointerDown = (e) => {
                if (e.button !== 0) return;
                isPointerDown = true; isDragging = false; suppressClick=false;
                const rect = trigger.getBoundingClientRect();
                start = { x:e.clientX, y:e.clientY, left:rect.left, top:rect.top };
                try{ trigger.setPointerCapture(e.pointerId);}catch(_){}
            };
            const onPointerMove = (e) => {
                if (!isPointerDown) return;
                const dx = e.clientX - start.x, dy = e.clientY - start.y;
                if (!isDragging) {
                    if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
                    isDragging = true;
                    trigger.style.right = 'auto'; trigger.style.bottom = 'auto';
                    trigger.style.left = `${start.left}px`; trigger.style.top = `${start.top}px`;
                    document.body.classList.add('adv-dragging');
                }
                const winW = window.innerWidth, winH = window.innerHeight;
                const w = trigger.offsetWidth, h = trigger.offsetHeight;
                let nx = start.left + dx, ny = start.top + dy;
                nx = Math.max(0, Math.min(nx, winW - w)); ny = Math.max(0, Math.min(ny, winH - h));
                trigger.style.left = `${nx}px`; trigger.style.top = `${ny}px`;
            };
            const onPointerUp = (e) => {
                if (!isPointerDown) return; isPointerDown = false;
                try{ trigger.releasePointerCapture(e.pointerId);}catch(_){}
                if (isDragging) {
                    isDragging = false; document.body.classList.remove('adv-dragging');
                    suppressClick = true; setTimeout(()=>{suppressClick=false;},150);
                    saveTriggerRelativeState();
                }
            };
            trigger.addEventListener('click', (e)=> {
                if (suppressClick) {
                    e.preventDefault();
                    e.stopPropagation();
                    suppressClick = false;
                    return;
                }
            }, true);
            trigger.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        applyTriggerStoredPosition();
        requestAnimationFrame(keepTriggerInViewport);
        setupTriggerDrag();

        const readScopesFromControls = () => ({ pf: accountScopeSel.value === 'following', lf: locationScopeSel.value === 'nearby' });
        const applyScopesToControls = ({pf=false, lf=false}) => {
            accountScopeSel.value = pf ? 'following' : '';
            locationScopeSel.value = lf ? 'nearby' : '';
        };
        const readScopesFromURL = (urlStr) => {
            try {
                const u = new URL(urlStr || location.href, location.origin);
                const pf = (u.searchParams.get('pf') || '') === 'on';
                const lf = (u.searchParams.get('lf') || '') === 'on';
                return { pf, lf };
            } catch { return { pf:false, lf:false }; }
        };

        const STATE_SYNC = {
            parseFromSearchToModal: () => {
                if (isUpdating || modal.style.display === 'none') return;
                const si = getActiveSearchInput();
                parseQueryAndApplyToModal(si ? si.value : '');
                applyScopesToControls(readScopesFromURL());
                updateSaveButtonState();
            },
            applyFromModalToSearch: () => {
                if (isUpdating) return;
                isUpdating = true;
                const finalQuery = buildQueryStringFromModal();
                const si = getActiveSearchInput();
                if (si) { syncControlledInput(si, finalQuery); }
                isUpdating = false;
                updateSaveButtonState();
            }
        };

        const buildQueryStringFromModal = () => {
            const q = [];
            const fields = {
                all: document.getElementById('adv-all-words').value.trim(),
                exact: document.getElementById('adv-exact-phrase').value.trim(),
                any: document.getElementById('adv-any-words').value.trim(),
                not: document.getElementById('adv-not-words').value.trim(),
                hash: document.getElementById('adv-hashtag').value.trim(),
                lang: document.getElementById('adv-lang').value,
                replies: document.getElementById('adv-replies').value,
                min_replies: document.getElementById('adv-min-replies').value,
                min_faves: document.getElementById('adv-min-faves').value,
                min_retweets: document.getElementById('adv-min-retweets').value,
                since: document.getElementById('adv-since').value,
                until: document.getElementById('adv-until').value,
            };
            if (fields.all) q.push(fields.all);
            if (fields.exact) q.push(`"${fields.exact.replace(/"/g,'')}"`);

            // 引用で 1 語として扱い、OR 連結を生成
            if (fields.any) {
              const tokens = tokenizeQuotedWords(fields.any).map(t => {
                // 既に "…": そのまま。未引用で空白を含む → 引用を付ける
                if (/^".*"$/.test(t)) return t;
                if (/\s/.test(t)) return `"${t.replace(/"/g,'')}"`;
                return t;
              });
              if (tokens.length) q.push(`(${tokens.join(' OR ')})`);
            }

            if (fields.not) q.push(...fields.not.split(/\s+/).filter(Boolean).map(w=>`-${w}`));
            if (fields.hash) q.push(...fields.hash.split(/\s+/).filter(Boolean).map(h=>`#${h.replace(/^#/,'')}`));
            if (fields.lang) q.push(`lang:${fields.lang}`);

            const createAccountQuery = (inputId, operator) => {
                const value = document.getElementById(inputId).value.trim();
                if (!value) return null;
                const isExclude = document.getElementById(`${inputId}-exclude`).checked;
                const terms = value.split(/\s+/).filter(Boolean);
                if (isExclude) return terms.map(t=>`-${operator}${t.replace(/^@/,'')}`).join(' ');
                const processed = terms.map(t=>`${operator}${t.replace(/^@/,'')}`);
                return processed.length>1 ? `(${processed.join(' OR ')})` : processed[0];
            };
            const fromQ = createAccountQuery('adv-from-user','from:'); if (fromQ) q.push(fromQ);
            const toQ = createAccountQuery('adv-to-user','to:'); if (toQ) q.push(toQ);
            const mentionQ = createAccountQuery('adv-mentioning','@'); if (mentionQ) q.push(mentionQ);

            if (fields.min_replies) q.push(`min_replies:${fields.min_replies}`);
            if (fields.min_faves) q.push(`min_faves:${fields.min_faves}`);
            if (fields.min_retweets) q.push(`min_retweets:${fields.min_retweets}`);
            if (fields.since) q.push(`since:${fields.since}`);
            if (fields.until) q.push(`until:${fields.until}`);

            const addFilter = (type, mapping) => {
                const include = document.getElementById(`adv-filter-${type}-include`).checked;
                const exclude = document.getElementById(`adv-filter-${type}-exclude`).checked;
                if (include) q.push(mapping);
                if (exclude) q.push(`-${mapping}`);
            };
            addFilter('verified','is:verified');
            addFilter('links','filter:links');
            addFilter('images','filter:images');
            addFilter('videos','filter:videos');

            if (fields.replies) {
                const replyMap = { include:'include:replies', only:'filter:replies', exclude:'-filter:replies' };
                if (replyMap[fields.replies]) q.push(replyMap[fields.replies]);
            }
            return q.join(' ');
        };

        const parseQueryAndApplyToModal = (query) => {
            if (isUpdating) return; isUpdating = true;
            const formEl = document.getElementById('advanced-search-form');
            formEl.reset();
            try {
              const st = loadExcludeFlags();
              const nameEl   = document.getElementById('adv-exclude-hit-name');
              const handleEl = document.getElementById('adv-exclude-hit-handle');
              if (nameEl)   { nameEl.checked = nameEl.defaultChecked = !!st.name; }
              if (handleEl) { handleEl.checked = handleEl.defaultChecked = !!st.handle; }
            } catch (_) {}

            // クエリを正規化（スマート引用・%xx・空白）
            const rawNorm = normalizeForParse(query || '');

            // トップレベル OR を先に見る（純粋 OR / ハイブリッド OR の切り分け）
            const orParts = splitTopLevelOR(rawNorm);
            if (orParts && isPureORQuery(rawNorm)) {
              // 引用を 1 語として数えるトークナイザ
              const tokenize = (s) => tokenizeQuotedWords(s).filter(Boolean);
              const tokenized = orParts.map(p => tokenize(p));

              const allAreSingle = tokenized.every(ts => ts.length === 1);
              if (allAreSingle) {
                // ① 純粋 OR：全部 any に入れる（exact/all は空）→ 早期 return
                document.getElementById('adv-any-words').value = orParts.join(' ');
                isUpdating = false;
                return;
              }

              const head = tokenized[0];
              const rest = tokenized.slice(1);
              const restAllSingle = rest.every(ts => ts.length === 1);

              if (head.length >= 2 && restAllSingle) {
                // ② ハイブリッド OR：
                //    - 先頭片の「最後のトークン」→ OR 集合
                //    - 先頭片の「それ以外」      → all（必須語）
                //    - 後続片（単一トークン）   → OR 集合
                const required = head.slice(0, -1);
                const orTokens = [head[head.length - 1], ...rest.map(ts => ts[0])];

                document.getElementById('adv-all-words').value = required.join(' ');
                document.getElementById('adv-any-words').value = orTokens.join(' ');
                // exact は空のまま（引用は any 側へ）
                isUpdating = false;
                return;
              }
              // それ以外（レア）は通常パースにフォールバック
            }

            // ここから通常パース（rawNorm をベース）
            let q = ` ${rawNorm} `;

            // 言語や演算子は先に抜く（引用の前後どちらでもOKだが、先にやると視覚的に期待通り）
            const extract = (regex, cb) => {
              let m;
              while ((m = regex.exec(q)) !== null) {
                cb(m[1].trim());
                q = q.replace(m[0], ' ');
                regex.lastIndex = 0;
              }
            };

            // 言語
            extract(/\blang:([^\s()"]+)/gi, v => { document.getElementById('adv-lang').value = v.toLowerCase(); });

            // ハッシュタグ
            extract(/\s#([^\s)"]+)/g, v => {
              const el = document.getElementById('adv-hashtag');
              el.value = (el.value + ' ' + v).trim();
            });

            // 最小エンゲージメント・期間
            extract(/\bmin_replies:(\d+)\b/gi, v => document.getElementById('adv-min-replies').value = v);
            extract(/\bmin_faves:(\d+)\b/gi,   v => document.getElementById('adv-min-faves').value   = v);
            extract(/\bmin_retweets:(\d+)\b/gi,v => document.getElementById('adv-min-retweets').value= v);
            extract(/\bsince:(\d{4}-\d{2}-\d{2})\b/gi, v => document.getElementById('adv-since').value = v);
            extract(/\buntil:(\d{4}-\d{2}-\d{2})\b/gi, v => document.getElementById('adv-until').value = v);

            // フィルタ
            const filterMap = { 'is:verified':'verified', 'filter:links':'links', 'filter:images':'images', 'filter:videos':'videos' };
            Object.entries(filterMap).forEach(([op,id])=>{
              const r = new RegExp(`\\s(-?)${op.replace(':','\\:')}\\b`, 'gi');
              q = q.replace(r, (m, neg) => {
                document.getElementById(`adv-filter-${id}-${neg ? 'exclude' : 'include'}`).checked = true;
                return ' ';
              });
            });

            // 返信
            if (/\binclude:replies\b/i.test(q)) { document.getElementById('adv-replies').value='include'; q=q.replace(/\binclude:replies\b/ig,' '); }
            else if (/\bfilter:replies\b/i.test(q)) { document.getElementById('adv-replies').value='only'; q=q.replace(/\bfilter:replies\b/ig,' '); }
            else if (/\b-filter:replies\b/i.test(q)) { document.getElementById('adv-replies').value='exclude'; q=q.replace(/\b-filter:replies\b/ig,' '); }

            // アカウント演算子
            const parseAccountField = (inputId, operator) => {
              const exclOp = `-${operator}`;
              const values = [];
              // 除外
              const reEx = new RegExp(`\\s${exclOp.replace(/[-:]/g,'\\$&')}([^\\s()"]+)`, 'gi');
              q = q.replace(reEx, (m, u) => { values.push(u); document.getElementById(`${inputId}-exclude`).checked = true; return ' '; });
              // 包含（括弧 OR グループ）
              const reGroup = new RegExp(`\\((?:${operator.replace(':','\\:')}([^\\s()"]+))(?:\\s+OR\\s+${operator.replace(':','\\:')}([^\\s()"]+))*\\)`, 'gi');
              q = q.replace(reGroup, (m) => {
                m.replace(new RegExp(`${operator.replace(':','\\:')}([^\\s()"]+)`, 'gi'), (_m, u) => { values.push(u); return _m; });
                return ' ';
              });
              // 単体
              const reIn = new RegExp(`\\s(?!-)${operator.replace(':','\\:')}([^\\s()"]+)`, 'gi');
              q = q.replace(reIn, (m, u) => { values.push(u); return ' '; });
              if (values.length) document.getElementById(inputId).value = [...new Set(values)].join(' ');
            };
            parseAccountField('adv-from-user','from:');
            parseAccountField('adv-to-user','to:');
            parseAccountField('adv-mentioning','@');

            // ▼ 括弧内 OR は any へ（**先にやる**。引用は壊さない、グループ丸ごと除去）
            {
              const groups = q.match(/\((?:[^()"]+|"[^"]*")+\)/g); // 引用対応の簡易版
              if (groups) {
                const tokens = groups
                  .map(g => g.slice(1, -1))                      // (...) → 中身
                  .flatMap(s => s.split(/\s+OR\s+/i))
                  .map(s => s.trim())
                  .filter(Boolean);
                if (tokens.length) {
                  const el = document.getElementById('adv-any-words');
                  el.value = (el.value ? el.value + ' ' : '') + tokens.join(' ');
                }
                // グループは丸ごと削る：以後の引用抽出に巻き込ませない
                q = q.replace(/\((?:[^()"]+|"[^"]*")+\)/g, ' ');
              }
            }

            // ▼ 引用フレーズ（括弧の外だけが残っている）。exact は最初の1件のみ
            {
              let exactSet = false;
              q = q.replace(/"([^"]+)"/g, (_m, p1) => {
                if (!exactSet) {
                  document.getElementById('adv-exact-phrase').value = p1.trim();
                  exactSet = true;
                }
                return ' ';
              });
            }

            // 除外語
            const nots = (q.match(/\s-\S+/g) || []).map(w => w.trim().slice(1));
            if (nots.length) document.getElementById('adv-not-words').value = nots.join(' ');
            q = q.replace(/\s-\S+/g,' ');

            document.getElementById('adv-all-words').value =
              q.trim().split(/\s+/).filter(Boolean).join(' ');

            isUpdating = false;
        };

        const syncFromModalToSearchBox = () => {
            if (isUpdating) return; isUpdating=true;
            const finalQuery = buildQueryStringFromModal();
            const si = getActiveSearchInput();
            if (si){ syncControlledInput(si, finalQuery); }
            isUpdating=false;
            updateSaveButtonState();
        };
        const syncFromSearchBoxToModal = STATE_SYNC.parseFromSearchToModal;

        const showToast = (msg) => {
            toastEl.textContent = msg;
            toastEl.classList.add('show');
            setTimeout(()=> toastEl.classList.remove('show'), 1500);
        };

        const loadSecret = () => { try { return kv.get(SECRET_KEY, '0') === '1'; } catch(_) { return false; } };
        const saveSecret = (on) => { try { kv.set(SECRET_KEY, on ? '1' : '0'); } catch(_) {} };
        const applySecretBtn = () => {
            const on = loadSecret();
            secretBtn.classList.toggle('on', on);
            secretBtn.classList.toggle('off', !on);
            secretBtn.title = i18n.t(on ? 'secretOn' : 'secretOff');
            secretStateEl.textContent = on ? 'ON' : 'OFF';
        };
        secretBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            const on = !loadSecret();
            saveSecret(on);
            applySecretBtn();
            showToast(i18n.t(on ? 'secretOn' : 'secretOff'));
        });
        applySecretBtn();

        const migrateList = (list) => Array.isArray(list) ? list.map(it => ({ id:it.id||uid(), q:it.q||'', ts:it.ts||Date.now(), pf:!!it.pf, lf:!!it.lf })) : [];

        const recordHistory = (q, pf, lf) => {
            if (!q || loadSecret()) return;
            const now = Date.now();
            if (lastHistory.q === q && lastHistory.pf === pf && lastHistory.lf === lf && (now - lastHistory.ts) < 3000) return;
            lastHistory.q = q; lastHistory.pf = pf; lastHistory.lf = lf; lastHistory.ts = now;

            const listRaw = loadJSON(HISTORY_KEY, []);
            const list = migrateList(listRaw);
            const idx = list.findIndex(it => it.q === q && !!it.pf === !!pf && !!it.lf === !!lf);
            if (idx === 0) {
                list[0].ts = now;
            } else if (idx > 0) {
                const [item] = list.splice(idx, 1);
                item.ts = now;
                list.unshift(item);
            } else {
                list.unshift({ id: uid(), q, pf: !!pf, lf: !!lf, ts: now });
                // if (list.length > 50) list.length = 50;
            }
            saveJSON(HISTORY_KEY, list);
            renderHistory();
        };

        const deleteHistory = (id) => {
            const listRaw = loadJSON(HISTORY_KEY, []);
            const list = migrateList(listRaw);
            const next = list.filter(it => it.id !== id);
            saveJSON(HISTORY_KEY, next);
            renderHistory();
            showToast(i18n.t('toastDeleted'));
        };

        const clearAllHistory = () => {
            if (!confirm(i18n.t('confirmClearHistory'))) return;
            saveJSON(HISTORY_KEY, []);
            renderHistory();
            showToast(i18n.t('toastDeleted'));
        };

        const addSaved = (q, pf, lf) => {
            const listRaw = loadJSON(SAVED_KEY, []);
            const list = migrateList(listRaw);
            if (list.some(it => it.q === q && !!it.pf === !!pf && !!it.lf === !!lf)) {
                updateSaveButtonState();
                return;
            }
            const item = { id: uid(), q, pf: !!pf, lf: !!lf, ts: Date.now() };
            list.push(item);
            saveJSON(SAVED_KEY, list);
            renderSaved();
            showToast(i18n.t('toastSaved'));
            updateSaveButtonState();
        };

        const deleteSaved = (id) => {
            const listRaw = loadJSON(SAVED_KEY, []);
            const list = migrateList(listRaw);
            const next = list.filter(it => it.id !== id);
            saveJSON(SAVED_KEY, next);
            renderSaved();
            showToast(i18n.t('toastDeleted'));
            updateSaveButtonState();
        };

        const fmtTime = (ts) => { try { return new Date(ts).toLocaleString(); } catch { return ''; } };

        const updateSaveButtonState = () => {
            const q = buildQueryStringFromModal().trim();
            const {pf, lf} = readScopesFromControls();
            const saved = migrateList(loadJSON(SAVED_KEY, []));
            const exists = !!q && saved.some(it => it.q === q && !!it.pf === !!pf && !!it.lf === !!lf);
            saveButton.disabled = !q || exists;
            saveButton.textContent = i18n.t(exists ? 'buttonSaved' : 'buttonSave');
            saveButton.setAttribute('aria-disabled', saveButton.disabled ? 'true' : 'false');
        };

        const activateTab = (name) => {
            tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
            [tabSearch, tabHistory, tabSaved, tabLists, tabAccounts, tabMute]
              .forEach((el) => el.classList.toggle('active', el.id === `adv-tab-${name}`));
            footerEl.style.display = (name === 'search') ? '' : 'none';
            if (name === 'history') renderHistory();
            if (name === 'saved') renderSaved();
            if (name === 'lists') renderLists();
            if (name === 'accounts') renderAccounts();
            if (name === 'mute') renderMuted();
            if (name === 'search') updateSaveButtonState();
        };
        tabButtons.forEach(btn => btn.addEventListener('click', (e)=> { e.preventDefault(); activateTab(btn.dataset.tab); }));

        const scopeChipsHTML = (pf, lf) => {
            const chips = [];
            if (pf) chips.push(`<span class="adv-chip scope" role="note">${i18n.t('chipFollowing')}</span>`);
            if (lf) chips.push(`<span class="adv-chip scope" role="note">${i18n.t('chipNearby')}</span>`);
            return chips.join('');
        };

        const historyEmptyEl = document.getElementById('adv-history-empty');
        const historyListEl = document.getElementById('adv-history-list');
        const renderHistory = () => {
          const list = migrateList(loadJSON(HISTORY_KEY, []));
          historyListEl.innerHTML = '';
          historyEmptyEl.textContent = list.length ? '' : i18n.t('emptyHistory');

          list.forEach(item => {
            const row = document.createElement('div');
            row.className = 'adv-item';
            row.dataset.id = item.id;

            row.innerHTML = `
              <div class="adv-item-main">
                <div class="adv-item-title">${escapeHTML(item.q)}</div>
                <div class="adv-item-sub">
                  <span>${fmtTime(item.ts)}</span>
                  ${scopeChipsHTML(!!item.pf, !!item.lf)}
                </div>
              </div>
              <div class="adv-item-actions">
                <button class="adv-chip primary" data-action="run">${i18n.t('run')}</button>
                <button class="adv-chip danger" data-action="delete">${i18n.t('delete')}</button>
              </div>
            `;

            row.querySelector('[data-action="run"]').addEventListener('click', () => {
              parseQueryAndApplyToModal(item.q);
              applyScopesToControls({ pf: !!item.pf, lf: !!item.lf });
              activateTab('search');
              executeSearch({ pf: item.pf, lf: item.lf });
            });

            row.querySelector('[data-action="delete"]').addEventListener('click', () => {
              deleteHistory(item.id);
            });

            historyListEl.appendChild(row);
          });
        };

        historyClearAllBtn.addEventListener('click', clearAllHistory);

        const savedEmptyEl = document.getElementById('adv-saved-empty');
        const savedListEl = document.getElementById('adv-saved-list');
        const renderSaved = () => {
            const list = migrateList(loadJSON(SAVED_KEY, []));
            savedListEl.innerHTML = '';
            savedEmptyEl.textContent = list.length ? '' : i18n.t('emptySaved');

            list.forEach((item) => {
                const row = document.createElement('div');
                row.className = 'adv-item';
                row.draggable = true;
                row.dataset.id = item.id;
                row.innerHTML = `
                    <div class="adv-item-handle" title="Drag">≡</div>
                    <div class="adv-item-main">
                        <div class="adv-item-title">${escapeHTML(item.q)}</div>
                        <div class="adv-item-sub">
                            <span>${fmtTime(item.ts)}</span>
                            ${scopeChipsHTML(!!item.pf, !!item.lf)}
                        </div>
                    </div>
                    <div class="adv-item-actions">
                        <button class="adv-chip primary" data-action="run">${i18n.t('run')}</button>
                        <button class="adv-chip danger" data-action="delete">${i18n.t('delete')}</button>
                    </div>
                `;
                row.querySelector('[data-action="run"]').addEventListener('click', ()=>{
                    parseQueryAndApplyToModal(item.q);
                    applyScopesToControls({pf:!!item.pf, lf:!!item.lf});
                    activateTab('search');
                    executeSearch({pf:item.pf, lf:item.lf});
                });
                row.querySelector('[data-action="delete"]').addEventListener('click', ()=> deleteSaved(item.id));

                row.addEventListener('dragstart', (ev) => {
                    row.classList.add('dragging');
                    ev.dataTransfer.setData('text/plain', item.id);
                    ev.dataTransfer.effectAllowed = 'move';
                });
                row.addEventListener('dragend', () => row.classList.remove('dragging'));
                row.addEventListener('dragover', (ev) => {
                    ev.preventDefault();
                    const dragging = savedListEl.querySelector('.dragging');
                    if (!dragging) return;
                    const after = getDragAfterElement(savedListEl, ev.clientY);
                    if (after == null) savedListEl.appendChild(dragging);
                    else savedListEl.insertBefore(dragging, after);
                });

                savedListEl.appendChild(row);
            });
            updateSaveButtonState();
        };

        const getDragAfterElement = (container, y) => {
            const els = [...container.querySelectorAll('.adv-item:not(.dragging)')];
            let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
            for (const el of els) {
                const box = el.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    closest = { offset, element: el };
                }
            }
            return closest.element;
        };

        savedListEl.addEventListener('drop', () => {
            const orderIds = [...savedListEl.querySelectorAll('.adv-item')].map(el=>el.dataset.id);
            const list = migrateList(loadJSON(SAVED_KEY, []));
            const idToItem = Object.fromEntries(list.map(x=>[x.id, x]));
            const reordered = orderIds.map(id => idToItem[id]).filter(Boolean);
            saveJSON(SAVED_KEY, reordered);
            showToast(i18n.t('toastReordered'));
            updateSaveButtonState();
        });

        function escapeHTML(s) {
            return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
        }

        function escapeAttr(s) {
          return String(s).replace(/[&<>"']/g, c => (
            {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
          ));
        }

        function parseSearchTokens(queryOrURL) {
          // 0) クエリ取得（URL→検索ボックス→モーダルの順でフォールバック）
          let qRaw = '';
          try {
            if (queryOrURL) {
              qRaw = String(queryOrURL);
            } else {
              const u = new URL(location.href);
              qRaw = u.searchParams.get('q') || '';
            }
          } catch (_) {}
          if (!qRaw) {
            const si = typeof getActiveSearchInput === 'function' ? getActiveSearchInput() : null;
            if (si?.value) qRaw = si.value;
          }
          if (!qRaw && typeof buildQueryStringFromModal === 'function') {
            qRaw = buildQueryStringFromModal() || '';
          }

          // 正規化（%xx/スマート引用/空白整形）
          const rawNorm0 = normalizeForParse(qRaw);
          let q = ` ${rawNorm0} `;

          // 1) 除外語（-xxx）を控えてのちに差し引く
          const NEG = [];
          (q.match(/\s-\S+/g) || []).forEach(w => NEG.push(w.trim().slice(1)));

          // 2) ORグループ（括弧）を先に抜き出し（引用を含む簡易対応）
          const orGroups = [];
          const groupRegex = /\((?:[^()"]+|"[^"]*")+\)/g;
          let groupMatch;
          while ((groupMatch = groupRegex.exec(q)) !== null) {
            const inner = groupMatch[0].slice(1, -1); // (...) 中身
            const parts = inner.split(/\s+OR\s+/i).map(s => s.trim()).filter(Boolean);
            if (parts.length >= 2) {
              const tokens = parts.flatMap(p => tokenizeQuotedWords(p)).filter(Boolean);
              if (tokens.length) orGroups.push(tokens);
            }
          }
          // グループは丸ごと削る（以降の抽出を安定化）
          q = q.replace(groupRegex, ' ');

          // 3) 純粋トップレベルOR（括弧なし）検出（例：`foo OR "bar baz" OR #tag`）
          const pureOr = splitTopLevelOR(rawNorm0);
          let pureOrTokens = [];
          if (pureOr && isPureORQuery(rawNorm0)) {
            pureOrTokens = pureOr.flatMap(p => tokenizeQuotedWords(p)).filter(Boolean);
            if (pureOrTokens.length >= 2) {
              orGroups.push(pureOrTokens);
              // 純粋ORは required には入れない（後で words から除外）
            }
          }

          // 4) 引用フレーズを抽出（exactはAND相当として扱う）
          const phrases = [];
          q = q.replace(/"([^"]+)"/g, (_m, p1) => {
            if (p1 && (p1 = p1.trim())) phrases.push(p1);
            return ' ';
          });

          // 5) ハッシュタグ抽出
          const hashtags = [];
          q = q.replace(/\s#([^\s)"]+)/g, (_m, p1) => {
            const tag = '#' + p1;
            hashtags.push(tag);
            return ' ';
          });

          // 6) from:/to:/@（除外ではないもの）→ 例外判定用 opUsers
          const opUsers = new Set();
          rawNorm0.replace(/(?:^|\s)(?:from:|to:|@)([^\s()]+)/g, (m, user) => {
            // 直前が "-" の否定演算子なら除外（例: "-from:foo"）
            if (!/^\s*-/.test(m)) {
              opUsers.add(String(user || '').toLowerCase());
            }
            return m;
          });

          // 7) 言語/最小値/日付/フィルタ/アカウント演算子などを q から除去
          q = q
            .replace(/\s(?:lang|min_replies|min_faves|min_retweets|since|until):[^\s]+/gi, ' ')
            .replace(/\s(?:is:verified|filter:(?:links|images|videos|replies)|include:replies|-filter:replies)\b/gi, ' ')
            .replace(/\s(?:from:|to:|@)[^\s()]+/gi, ' ')
            .replace(/[()（）]/g, ' ')
            .replace(/\bOR\b/gi, ' ');

          // 8) 残りを単語化（句読点剥がし。#は温存済み）
          const trimPunctKeepHash = (s) => {
            if (!s) return '';
            if (s.startsWith('#')) return s;
            return s.replace(/^[\p{P}\p{S}]+/gu, '').replace(/[\p{P}\p{S}]+$/gu, '');
          };

          let words = q
            .split(/\s+/)
            .map(s => s.trim())
            .filter(Boolean)
            .map(trimPunctKeepHash)
            .filter(Boolean);

          // 9) NEG を差し引く
          const normalize = (s) => String(s || '').toLowerCase();
          const NEGnorm = NEG.map(normalize);

          // 10) 純粋ORで拾ったトークンは AND 候補から先に除外（重複/衝突を避ける）
          if (pureOrTokens.length) {
            const pureSet = new Set(pureOrTokens.map(t => t.toLowerCase()));
            const stripQuote = (s) => s.replace(/^"(.*)"$/, '$1').toLowerCase();
            words = words.filter(w => !pureSet.has(stripQuote(w)));
          }

          // 11) required（AND相当）を構成：フレーズ + ハッシュタグ + 通常語
          const requiredTermsArr = [
            ...phrases,
            ...hashtags,
            ...words.filter(w => !NEGnorm.includes(normalize(w))),
          ];

          // 12) includeTerms（従来互換）：required + OR全トークン平坦化
          const includeTerms = new Set([
            ...requiredTermsArr,
            ...orGroups.flatMap(g => g),
          ]);

          // 13) hashtagSet
          const hashtagSet = new Set(
            hashtags.map(h => h.startsWith('#') ? h : ('#' + h)).map(normalize)
          );

          // 14) 返却（requiredはSet、orGroupsは配列の配列）
          return {
            requiredTerms: new Set(requiredTermsArr),
            orGroups,                  // [ ['ente','セール'], ['foo','bar'] , ... ]
            includeTerms,              // AND/ORすべてを平坦化した包含語集合
            opUsers,
            hashtagSet,
          };
        }
        function pickTweetFields(article) {
            const body = article.querySelector('[data-testid="tweetText"]')?.innerText || '';
            let disp = '';
            try {
                const nameBlock = article.querySelector('[data-testid="User-Name"] a[href^="/"] div[dir="ltr"]');
                disp = nameBlock?.innerText || '';
            } catch(_) {}
            let handle = '';
            try {
                const handleEl = article.querySelector('[data-testid="User-Name"] a[href^="/"] div[dir="ltr"] span')
                              || article.querySelector('[data-testid="User-Name"] a[href^="/"] .r-1qd0xha');
                handle = handleEl?.innerText || '';
            } catch(_) {}
            const replyHandles = Array.from(
                article.querySelectorAll('a[href^="/"]')
            )
                .filter(a => {
                  const txt = (a.textContent || '').trim();
                  if (!txt.startsWith('@')) return false;
                  return !a.closest('[data-testid="tweetText"]');
                })
                .map(a => (a.textContent || '').trim())
                .filter(Boolean);
            return { body, disp, handle, replyHandles };
        }

        function getTweetCell(article) {
          return article.closest('[data-testid="cellInnerDiv"]') || article;
        }

        function shouldHideTweetByNameHandle(article, flags, tokens) {
          const {
            requiredTerms = new Set(),
            orGroups = [],
            includeTerms = new Set(),
            opUsers,
            hashtagSet
          } = tokens || {};

          if (includeTerms.size === 0) return false;

          const { body, disp, handle, replyHandles } = pickTweetFields(article);

          // 正規化系ユーティリティ（本文検索はスペース正規化）
          const normSpace = (s) => String(s || '')
            .toLowerCase()
            .replace(/[_.\-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          const normId = (s) => String(s || '').replace(/^@/, '').toLowerCase();
          const stripNonAlnum = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\u00c0-\u024f]+/gi, '');

          const textBody = normSpace(body);
          const textName = normSpace(disp);

          // ハンドル群の正規化
          const handlesRaw   = [handle, ...replyHandles].map(normId).filter(Boolean);
          const handlesSpace = handlesRaw.map(normSpace);
          const handlesTok   = handlesSpace.map(h => h.split(' ').filter(Boolean));
          const handlesTight = handlesRaw.map(stripNonAlnum);

          // 本文に現れた語（正規化済み）を控える
          const inBody = new Set();
          for (const term of includeTerms) {
            const t = normSpace(term);
            if (t && textBody.includes(t)) inBody.add(t);
          }

          // 名前/ハンドルで命中した語を記録（本文に出ているものは除外して記録しない）
          const inMeta = new Set(); // normSpace/stripNonAlnum の両方を入れる

          const markMetaHit = (tSpace, tTight) => {
            if (tSpace && !inBody.has(tSpace)) inMeta.add(tSpace);
            if (tTight) inMeta.add(tTight);
          };

          // --- 表示名ヒットの記録（短語ガードつき） ---
          if (flags.name) {
            for (const term of includeTerms) {
              const t = normSpace(term);
              if (!t) continue;
              // 2文字以下の英字のみは無視（過剰除外防止）
              if (/^[a-z]{1,2}$/.test(t)) continue;
              if (textName.includes(t) && !inBody.has(t)) {
                markMetaHit(t, null);
              }
            }
          }

          // --- @ユーザー名ヒットの記録（演算子例外/短語ガード/境界） ---
          if (flags.handle) {
            for (const term of includeTerms) {
              const raw = String(term || '');
              const rawLC = raw.trim().toLowerCase();

              // ハッシュタグは対象外
              if (rawLC.startsWith('#') || (hashtagSet && hashtagSet.has(rawLC.startsWith('#') ? rawLC : '#' + rawLC))) {
                continue;
              }

              const bare = raw.replace(/^@/, '').toLowerCase();
              if (opUsers && opUsers.has(bare)) continue; // from:/to:/@ 明示は例外

              const tSpace = normSpace(raw);
              const tTight = stripNonAlnum(raw);

              // 短語ガード：英数のみで長さ<3は無視
              if (/^[a-z0-9]+$/.test(tTight) && tTight.length < 3) continue;

              // 1) トークン一致/連続トークン一致
              if (tSpace) {
                const tTokens = tSpace.split(' ').filter(Boolean);
                for (const hTokens of handlesTok) {
                  if (tTokens.length === 1) {
                    if (hTokens.some(tok => tok === tTokens[0]) && !inBody.has(tSpace)) {
                      markMetaHit(tSpace, null);
                      break;
                    }
                  } else {
                    for (let i = 0; i + tTokens.length <= hTokens.length; i++) {
                      let ok = true;
                      for (let j = 0; j < tTokens.length; j++) {
                        if (hTokens[i + j] !== tTokens[j]) { ok = false; break; }
                      }
                      if (ok && !inBody.has(tSpace)) {
                        markMetaHit(tSpace, null);
                        break;
                      }
                    }
                  }
                }
              }

              // 2) 非英数字除去の完全一致（部分一致は不可）
              if (tTight && handlesTight.some(h => h === tTight) && !(tSpace && inBody.has(tSpace))) {
                markMetaHit(tSpace, tTight);
              }
            }
          }

          // === 最終判定 ===
          // AND（requiredTerms）: “本文に出ていない & metaでのみヒット” が1語でもあれば隠す
          for (const t of requiredTerms) {
            const s = normSpace(t);
            if (s && !inBody.has(s) && (inMeta.has(s) || inMeta.has(stripNonAlnum(t)))) {
              return true;
            }
          }

          // OR（orGroups）: 各グループが「本文で満たされていないのに metaだけで満たされる」場合は隠す
          for (const group of orGroups) {
            let anyBody = false;
            let anyMeta = false;
            for (const w of group) {
              const s = normSpace(w);
              const tight = stripNonAlnum(w);
              if (s && inBody.has(s)) anyBody = true;
              if (s && inMeta.has(s)) anyMeta = true;
              if (tight && inMeta.has(tight)) anyMeta = true;
              if (anyBody && anyMeta) break;
            }
            if (!anyBody && anyMeta) return true;
          }

          // ここまで来たら隠さない
          return false;
        }

        function scanAndFilterTweets() {
          try {
            const flags = {
              name:   document.getElementById('adv-exclude-hit-name')?.checked ?? true,
              handle: document.getElementById('adv-exclude-hit-handle')?.checked ?? true,
            };

            const masterOn = loadMuteMaster();
            const muted = loadMuted();
            const hasMute = masterOn && muted.length > 0;                       // ← masterOn を噛ませる
            const enabledMuted = hasMute ? muted.filter(m => m.enabled !== false) : [];
            const muteCI = enabledMuted.length ? new Set(enabledMuted.filter(m => !m.cs).map(m => m.word.toLowerCase())) : new Set();
            const muteCS = enabledMuted.length ? enabledMuted.filter(m => m.cs).map(m => m.word) : [];

            if (!flags.name && !flags.handle && !hasMute) return;

            const tokens = parseSearchTokens();
            const list = document.querySelectorAll('article[data-testid="tweet"]');

            for (const art of list) {
              const cell = getTweetCell(art);

              const hideByNameHandle = shouldHideTweetByNameHandle(art, flags, tokens);

              let hideByMute = false;
              if (hasMute) {
                const body = (art.querySelector('[data-testid="tweetText"]')?.innerText || '');
                const bodyCI = body.toLowerCase();

                for (const w of muteCI) { if (w && bodyCI.includes(w)) { hideByMute = true; break; } }
                if (!hideByMute) {
                  for (const w of muteCS) { if (w && body.includes(w)) { hideByMute = true; break; } }
                }
              }

              const reasons = [];
              if (hideByMute) reasons.push('muted_word');
              if (hideByNameHandle) reasons.push('name_handle_only');

              if (reasons.length > 0) {
                cell.setAttribute('data-adv-hidden', reasons.join(' '));
              } else {
                cell.removeAttribute('data-adv-hidden');
              }
            }

            cleanupAdjacentSeparators();
          } catch (e) {
            console.error('scanAndFilterTweets failed', e);
          }
        }

        function cleanupAdjacentSeparators() {
          // （既存のまま：必要ならここに区切り線セルの非表示処理）
        }

        const executeSearch = async (scopesOverride) => {
          const finalQuery = buildQueryStringFromModal().trim();
          if (!finalQuery) return;

          const scopes = scopesOverride || readScopesFromControls();
          const params = new URLSearchParams({ q: finalQuery, src: 'typed_query' });
          if (scopes.pf) params.set('pf', 'on');
          if (scopes.lf) params.set('lf', 'on');

          const targetPath = `/search?${params.toString()}`;

          // 1) まず検索ボックスが見つかれば React state を更新して見た目と中身を同調
          const si = getActiveSearchInput?.();
          if (si) {
            syncControlledInput(si, finalQuery);
          }

          // 2) ルートに関わらず常に SPA 遷移で検索を確定
          recordHistory(finalQuery, scopes.pf, scopes.lf);
          const before = location.href;
          try {
            await spaNavigate(targetPath);
          } catch {
            // SPA 失敗時のフォールバック
            location.assign(`https://x.com${targetPath}`);
            return;
          }

          // 3) 遷移が成功したら余計な replaceState はしない（URL とルーター state の乖離を避ける）
          //    もしフォーカスが残っていたら外す
          try { si && si.blur(); } catch {}

        };

        const onScopeChange = async () => {
          const si = getActiveSearchInput();
          const q = (() => {
            if (si && si.value && si.value.trim()) return si.value.trim();
            return buildQueryStringFromModal().trim();
          })();

          const { pf, lf } = readScopesFromControls();
          const params = new URLSearchParams({ src: 'typed_query' });
          if (q) params.set('q', q);
          if (pf) params.set('pf', 'on');
          if (lf) params.set('lf', 'on');

          // 入力側を先に最新化
          if (si) syncControlledInput(si, q);

          recordHistory(q, pf, lf);
          const path = `/search?${params.toString()}`;
          try {
            await spaNavigate(path);
          } catch {
            location.assign(`https://x.com${path}`);
          }
        };
        accountScopeSel.addEventListener('change', onScopeChange);
        locationScopeSel.addEventListener('change', onScopeChange);

        const setupModalDrag = () => {
            const header = modal.querySelector('.adv-modal-header');
            let dragging=false, offset={x:0,y:0};
            header.addEventListener('mousedown', e=>{
                if (e.target.matches('button,a') && !e.target.classList.contains('adv-secret-btn')) return;
                dragging=true;
                const rect = modal.getBoundingClientRect();
                modal.style.right=modal.style.bottom='auto';
                modal.style.left=`${rect.left}px`; modal.style.top=`${rect.top}px`;
                offset = { x:e.clientX-rect.left, y:e.clientY-rect.top };
                document.body.classList.add('adv-dragging');
            });
            document.addEventListener('mousemove', e=>{
                if(!dragging) return;
                let nx = e.clientX - offset.x, ny = e.clientY - offset.y;
                nx=Math.max(0,Math.min(nx,window.innerWidth - modal.offsetWidth));
                ny=Math.max(0,Math.min(ny,window.innerHeight - modal.offsetHeight));
                modal.style.left=`${nx}px`; modal.style.top=`${ny}px`;
            });
            document.addEventListener('mouseup', ()=>{
                if(dragging){ dragging=false; document.body.classList.remove('adv-dragging'); saveModalRelativeState(); }
            });
        };

        const setupModalResize = () => {
            const MIN_W = 300, MIN_H = 240;
            const MARGIN = 10;
            let resizing = null;

            const onPointerDown = (e) => {
                const h = e.target.closest('.adv-resizer');
                if (!h) return;
                e.preventDefault();
                const dir = h.dataset.dir;
                const r = modal.getBoundingClientRect();

                modal.style.right = 'auto';
                modal.style.bottom= 'auto';
                modal.style.left  = `${r.left}px`;
                modal.style.top   = `${r.top}px`;

                resizing = {
                    dir,
                    startX: e.clientX,
                    startY: e.clientY,
                    startLeft: r.left,
                    startTop:  r.top,
                    startW: r.width,
                    startH: r.height
                };
                try { h.setPointerCapture(e.pointerId); } catch(_) {}
                document.body.classList.add('adv-dragging');
            };

            const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

            const onPointerMove = (e) => {
                if (!resizing) return;

                const dx = e.clientX - resizing.startX;
                const dy = e.clientY - resizing.startY;

                let newLeft = resizing.startLeft;
                let newTop  = resizing.startTop;
                let newW    = resizing.startW;
                let newH    = resizing.startH;

                const dir = resizing.dir;

                if (dir.includes('e')) newW = resizing.startW + dx;
                if (dir.includes('w')) { newW = resizing.startW - dx; newLeft = resizing.startLeft + dx; }

                if (dir.includes('s')) newH = resizing.startH + dy;
                if (dir.includes('n')) { newH = resizing.startH - dy; newTop = resizing.startTop + dy; }

                const maxW = window.innerWidth  - 2*MARGIN;
                const maxH = window.innerHeight - 2*MARGIN;

                newW = clamp(newW, MIN_W, maxW);
                newH = clamp(newH, MIN_H, maxH);
                newLeft = clamp(newLeft, MARGIN, Math.max(MARGIN, window.innerWidth  - newW - MARGIN));
                newTop  = clamp(newTop,  MARGIN, Math.max(MARGIN, window.innerHeight - newH - MARGIN));

                modal.style.left   = `${Math.round(newLeft)}px`;
                modal.style.top    = `${Math.round(newTop)}px`;
                modal.style.width  = `${Math.round(newW)}px`;
                modal.style.height = `${Math.round(newH)}px`;
            };

            const onPointerUp = (e) => {
                if (!resizing) return;
                document.body.classList.remove('adv-dragging');
                try { e.target.releasePointerCapture?.(e.pointerId); } catch(_) {}
                resizing = null;
                saveModalRelativeState();
            };

            modal.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup',   onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        /* ========= Accounts storage & UI ========= */
        function renderAccountRow(item) {
          const row = document.createElement('div');
          row.className = 'adv-item';
          row.draggable = true;
          row.dataset.id = item.id;

          const title = escapeHTML(item.name || `@${item.handle}`);
          const sub   = escapeHTML(`@${item.handle}`);

          row.innerHTML = `
            <div class="adv-item-handle" title="Drag">≡</div>
            ${
              item.avatar
                ? `<a class="adv-item-avatar-link adv-link" href="/${escapeAttr(item.handle)}" title="@${escapeAttr(item.handle)}">
                     <img class="adv-item-avatar" src="${escapeAttr(item.avatar)}" alt="@${escapeAttr(item.handle)}">
                   </a>`
                : `<a class="adv-item-avatar-link adv-link" href="/${escapeAttr(item.handle)}" title="@${escapeAttr(item.handle)}">
                     <div class="adv-item-avatar" aria-hidden="true"></div>
                   </a>`
            }
            <div class="adv-item-main">
              <div class="adv-item-title">
                <a class="adv-link" href="/${escapeAttr(item.handle)}" title="@${escapeAttr(item.handle)}">${title}</a>
              </div>
              <div class="adv-item-sub">
                <a class="adv-link" href="/${escapeAttr(item.handle)}">@${escapeHTML(item.handle)}</a>
                <span>${fmtTime(item.ts)}</span>
              </div>
            </div>
            <div class="adv-item-actions">
              <button class="adv-chip primary" data-action="confirm">${i18n.t('buttonConfirm')}</button>
              <button class="adv-chip danger" data-action="delete">${i18n.t('delete')}</button>
            </div>
          `;

          row.querySelector('[data-action="confirm"]').addEventListener('click', (e) => {
            spaNavigate(`/${item.handle}`, { ctrlMeta: e.ctrlKey || e.metaKey });
          });
          row.querySelectorAll('a.adv-link').forEach(a => {
            a.addEventListener('click', (ev) => {
              if (ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
              ev.preventDefault();
              const href = a.getAttribute('href') || `/${item.handle}`;
              spaNavigate(href, { ctrlMeta: false });
            });
          });
          row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteAccount(item.id));

          row.addEventListener('dragstart', (ev) => {
            row.classList.add('dragging');
            ev.dataTransfer.setData('text/plain', item.id);
            ev.dataTransfer.effectAllowed = 'move';
          });
          row.addEventListener('dragend', () => row.classList.remove('dragging'));

          return row;
        }

        function loadSectionsOrder(key, folders) {
          const saved = (()=>{
            try { return JSON.parse(GM_getValue(key, 'null')); } catch(_) { return null; }
          })();
          const ids = ['__UNASSIGNED__', ...folders.map(f=>f.id)];
          if (!Array.isArray(saved)) return ids;
          const set = new Set(saved);
          const ordered = saved.filter(id => ids.includes(id));
         ids.forEach(id => { if (!set.has(id)) ordered.push(id); });
          return ordered;
        }
        function saveSectionsOrder(key, order) {
         try { GM_setValue(key, JSON.stringify(order)); } catch(_) {}
        }

        function renderAccounts() {
          ensureFolderToolbars();

          const items   = loadAccounts();
          let   folders = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
          const idToItem = Object.fromEntries(items.map(x => [x.id, x]));

          // フォルダ order の死票を掃除
          let needsSave = false;
          for (const f of folders) {
            const before = f.order.length;
            f.order = f.order.filter(id => !!idToItem[id]);
            if (f.order.length !== before) { needsSave = true; f.ts = Date.now(); }
          }
          if (needsSave) saveFolders(ACCOUNTS_FOLDERS_KEY, folders);

          // 未所属（Unassigned）ID 群
          const allIds     = new Set(items.map(x => x.id));
          const inFolders  = new Set(folders.flatMap(f => f.order));
          const unassignedIds = [...allIds].filter(id => !inFolders.has(id));

          // フィルタUIや検索
          const filterSel = document.getElementById('adv-accounts-folder-filter');
          const searchEl  = document.getElementById('adv-accounts-search');
          const newBtn    = document.getElementById('adv-accounts-new-folder');

          // セレクト更新
          if (filterSel) {
            const prev = filterSel.value;
            filterSel.innerHTML = '';
            const optAll = document.createElement('option'); optAll.value='__ALL__'; optAll.textContent='ALL'; filterSel.appendChild(optAll);
            const optUn  = document.createElement('option'); optUn.value='__UNASSIGNED__'; optUn.textContent='Unassigned'; filterSel.appendChild(optUn);
            folders.forEach(f=>{
              const o = document.createElement('option'); o.value = f.id; o.textContent = f.name; filterSel.appendChild(o);
            });
            if ([...filterSel.options].some(o=>o.value===prev)) filterSel.value = prev; else filterSel.value='__ALL__';
            filterSel.onchange = ()=> renderAccounts();
          }
          if (searchEl && !searchEl._advBound) {
            searchEl._advBound = true;
            searchEl.addEventListener('input', ()=>renderAccounts());
          }
          if (newBtn && !newBtn._advBound) {
            newBtn._advBound = true;
            newBtn.addEventListener('click', ()=>{
              const nm = prompt('New folder name', '');
              if (!nm || !nm.trim()) return;
              const fs = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
              fs.push({ id: uid(), name: nm.trim(), order: [], ts: Date.now() });
              saveFolders(ACCOUNTS_FOLDERS_KEY, fs);
              renderAccounts();
            });
          }

          const filterFolder = filterSel?.value || '__ALL__';
          const q = (searchEl?.value || '').toLowerCase().trim();
          const matchItem = (it) => {
            if (!q) return true;
            const name = (it.name||'').toLowerCase();
            const handle = (it.handle||'').toLowerCase();
            return name.includes(q) || handle.includes(q) || (`@${handle}`).includes(q);
          };

          const host = document.getElementById('adv-accounts-list');
          const emptyEl = document.getElementById('adv-accounts-empty');
          host.innerHTML = '';
          emptyEl.textContent = items.length ? '' : i18n.t('emptyAccounts');

          // === 並び順：フォルダ列の間に Unassigned を挿入できるよう index を保存/復元 ===
          const UNASSIGNED_INDEX_KEY = 'advAccountsUnassignedIndex_v1';
          const getUnIdx = () => {
            try { const v = GM_getValue(UNASSIGNED_INDEX_KEY, 0); return Math.max(0, Math.min(folders.length, +v||0)); } catch { return 0; }
          };
          const setUnIdx = (idx) => { try { GM_setValue(UNASSIGNED_INDEX_KEY, String(idx)); } catch {} };

          // 表示対象フォルダの選定
          const foldersToDraw =
            filterFolder === '__ALL__'      ? [...folders] :
            filterFolder === '__UNASSIGNED__' ? [] : // フォルダは描かない（後で unassigned だけ描く）
            folders.filter(f => f.id === filterFolder);

          // DOM 並び：foldersToDraw の間に Unassigned を差し込む（__ALL__ の時のみ）
          const buildSectionsOrder = () => {
            if (filterFolder !== '__ALL__') return foldersToDraw.map(f => f.id);
            const idx = getUnIdx();
            const arr = foldersToDraw.map(f => f.id);
            arr.splice(Math.max(0, Math.min(arr.length, idx)), 0, '__UNASSIGNED__');
            return arr;
          };

          const SECT_MIME = 'adv/folder'; // 既存のフォルダD&Dと同じMIMEを流用
          const getSectionAfterElement = (container, y) => {
            const els = [...container.querySelectorAll('.adv-folder:not(.dragging-folder), .adv-unassigned:not(.dragging-folder)')];
            let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
            for (const el of els) {
              const box = el.getBoundingClientRect();
              const offset = y - box.top - box.height / 2;
              if (offset < 0 && offset > closest.offset) {
                closest = { offset, element: el };
              }
            }
            return closest.element;
          };
          const persistSectionsFromDOM = () => {
            const order = [...host.querySelectorAll('.adv-folder, .adv-unassigned')].map(sec => sec.dataset.folderId);
            // フォルダ順保存
            const newFolderOrderIds = order.filter(id => id !== '__UNASSIGNED__');
            let fs = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
            const map = Object.fromEntries(fs.map(f=>[f.id,f]));
            const reordered = newFolderOrderIds.map(id=>map[id]).filter(Boolean);
            // 未描画があれば末尾へ
            fs.forEach(f => { if (!reordered.includes(f)) reordered.push(f); });
            saveFolders(ACCOUNTS_FOLDERS_KEY, reordered);

            // Unassigned の位置を保存
            const unIdx = order.indexOf('__UNASSIGNED__');
            if (unIdx >= 0) setUnIdx(unIdx);

            showToast(i18n.t('toastReordered'));
          };

          // === Unassigned セクション（ヘッダー無し・枠無し） ===
          const renderUnassignedSection = () => {
            const sec = document.createElement('section');
            sec.className = 'adv-unassigned';
            sec.dataset.folderId = '__UNASSIGNED__';
            sec.setAttribute('draggable', 'true'); // 並び替えのためにセクション自体をドラッグ可
            const list = document.createElement('div');
            list.className = 'adv-list';
            const itemsUn = unassignedIds.map(id => idToItem[id]).filter(Boolean).filter(matchItem);
            // Unassigned のみの表示要求(__UNASSIGNED__)時は単独表示
            if (filterFolder === '__UNASSIGNED__') {
              // ここでは単に全件描画
            }
            itemsUn.forEach(it => list.appendChild(renderAccountRow(it)));
            sec.appendChild(list);

            // セクション D&D: ドラッグ開始/終了
            sec.addEventListener('dragstart', (ev) => {
              // ★ドラッグ開始地点がアイテム(.adv-item)やその子孫でないことを確認
              const item = ev.target.closest('.adv-item');

              if (!item) {
                // アイテムD&Dでない場合、セクションD&Dとして扱う
                ev.dataTransfer.setData(SECT_MIME, '__UNASSIGNED__');
                ev.dataTransfer.effectAllowed = 'move';
                sec.classList.add('dragging-folder');
              }
            });
            sec.addEventListener('dragend', () => {
              sec.classList.remove('dragging-folder');
            });

            // セクション上を通過中：セクション間の並び替え
            sec.addEventListener('dragover', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) {
                ev.preventDefault();
                const dragging = host.querySelector('.dragging-folder');
                if (!dragging || dragging === sec) return;
                const after = getSectionAfterElement(host, ev.clientY);
                if (after == null) host.appendChild(dragging);
                else host.insertBefore(dragging, after);
              }
            });

            // Unassigned領域へのドロップ処理（Accounts専用）
            const handleDropOnUnassigned_Accounts = (ev) => {
              // セクション（フォルダ）自体のドラッグは無視
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;

              ev.preventDefault();
              ev.stopPropagation(); // イベント伝播を停止
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (draggedId) {
                  unassignAccount(draggedId); // ★ 共通関数を呼ぶように変更
              }
            };

            // アイテム並び替え（リスト内）
            list.addEventListener('dragover', ev => {
              // セクション（フォルダ）のドラッグ
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) {
                // ★セクション並び替えD&D。親(sec)のdragoverに処理を任せる。
                // ★イベントを止めずに return する。
                return;
              }

              // アイテムのドラッグ
              ev.preventDefault();
              ev.stopPropagation(); // ★ 親(sec)のアイテムD&Dハンドラには行かせない
              // プレビュー（DOM移動）
              const container = list;
              const dragging = document.querySelector('.adv-item.dragging'); // グローバルで探す
              if (!dragging) return;
              if (dragging.contains(container)) return;

              const after = getDragAfterElement(container, ev.clientY);
              if (after == null) container.appendChild(dragging);
              else container.insertBefore(dragging, after);
            });

            // リスト（またはその中のアイテム）へのドロップ
            list.addEventListener('drop', handleDropOnUnassigned_Accounts);

            // ★セクション（の余白）へのドラッグを許可
            sec.addEventListener('dragover', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault();
              ev.stopPropagation();
            });
            // ★セクション（の余白）へのドロップ
            sec.addEventListener('drop', handleDropOnUnassigned_Accounts);

            return sec;
          };

          // === フォルダ描画（既存に近いが、ヘッダーを DnD 起点にしてセクション入替に参加） ===
          const renderFolderSection = (folder) => {
            const section = document.createElement('section');
            section.className = 'adv-folder';
            section.dataset.folderId = folder.id;
            if (folder.collapsed) section.classList.add('adv-folder-collapsed');

            const header = document.createElement('div');
            header.className = 'adv-folder-header';
            header.setAttribute('draggable', 'true');

            const toggleBtn = renderFolderToggleButton(!!folder.collapsed);
            const titleWrap = document.createElement('div');
            titleWrap.className = 'adv-folder-title';
            titleWrap.appendChild(toggleBtn);
            const nameEl = document.createElement('strong'); nameEl.textContent = folder.name; titleWrap.appendChild(nameEl);
            const countEl = document.createElement('span'); countEl.className='adv-item-sub'; countEl.textContent = `(${folder.order.length})`;
            titleWrap.appendChild(countEl);

            const actions = document.createElement('div');
            actions.className = 'adv-folder-actions';
            actions.innerHTML = `
              <button class="adv-chip" data-action="rename"  aria-label="Rename folder" title="Rename folder">Rename</button>
              <button class="adv-chip danger" data-action="delete" aria-label="Delete folder" title="Delete folder">Delete</button>
            `;
            header.appendChild(titleWrap);
            header.appendChild(actions);

            // フォルダ DnD（セクション入替）
            header.addEventListener('dragstart', (ev) => {
              if (ev.target && (ev.target.closest('.adv-folder-actions') || ev.target.closest('.adv-folder-toggle-btn'))) {
                ev.preventDefault(); return;
              }
              ev.dataTransfer.setData(SECT_MIME, folder.id);
              ev.dataTransfer.effectAllowed = 'move';
              section.classList.add('dragging-folder');
            });
            header.addEventListener('dragend', () => section.classList.remove('dragging-folder'));

            section.addEventListener('dragover', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) {
                ev.preventDefault();
                const dragging = host.querySelector('.dragging-folder');
                if (!dragging || dragging === section) return;
                const after = getSectionAfterElement(host, ev.clientY);
                if (after == null) host.appendChild(dragging);
                else host.insertBefore(dragging, after);
              }
            });

            host.addEventListener('drop', (ev) => {
              if (!(ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME))) return;
              ev.preventDefault();
              persistSectionsFromDOM();
              renderAccounts();
            }, { once:true });

            // 折りたたみ
            const collapseToggle = () => {
              section.classList.toggle('adv-folder-collapsed');
              const all = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
              const f = all.find(x => x.id === folder.id);
              if (f) { f.collapsed = section.classList.contains('adv-folder-collapsed'); f.ts = Date.now(); saveFolders(ACCOUNTS_FOLDERS_KEY, all); }
              updateFolderToggleButton(toggleBtn, !!section.classList.contains('adv-folder-collapsed'));
            };
            toggleBtn.addEventListener('click', (e)=>{ e.stopPropagation(); collapseToggle(); });
            toggleBtn.addEventListener('keydown', (e)=>{ if (e.key===' '||e.key==='Enter'){ e.preventDefault(); collapseToggle(); } });

            // Rename / Delete
            actions.querySelector('[data-action="rename"]').addEventListener('click', ()=>{
              const nm = prompt('New folder name', folder.name);
              if (!nm || !nm.trim()) return;
              const fArr = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
              const f = fArr.find(x=>x.id===folder.id); if (!f) return;
              f.name = nm.trim(); f.ts = Date.now(); saveFolders(ACCOUNTS_FOLDERS_KEY, fArr);
              renderAccounts(); showToast(i18n.t('updated'));
            });
            actions.querySelector('[data-action="delete"]').addEventListener('click', ()=>{
              if (!confirm('Delete this folder? Items will become Unassigned.')) return;
              let fArr = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
              const idx = fArr.findIndex(x=>x.id===folder.id); if (idx<0) return;
              fArr.splice(idx,1);
              saveFolders(ACCOUNTS_FOLDERS_KEY, fArr);
              renderAccounts(); showToast(i18n.t('toastDeleted'));
            });

            // ヘッダにドロップ（アカウント→このフォルダへ移動 / Unassigned へ移動は別処理）
            header.addEventListener('dragover', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return; // セクションD&D時は無視
              ev.preventDefault(); header.dataset.drop='1';
            });
            header.addEventListener('dragleave', () => { delete header.dataset.drop; });
            header.addEventListener('drop', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault(); delete header.dataset.drop;
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;
              moveAccountToFolder(draggedId, folder.id);
            });

            const list = document.createElement('div');
            list.className = 'adv-list';
            const itemsInFolder = folder.order.map(id => idToItem[id]).filter(Boolean).filter(matchItem);
            itemsInFolder.forEach(it => list.appendChild(renderAccountRow(it)));

            // フォルダ内の並び保存 兼 フォルダへの移動
            list.addEventListener('dragover', ev => {
              ev.preventDefault(); // リスト領域全体をドロップターゲットにする
              // プレビュー（DOM移動）
              const container = list;
              const dragging = document.querySelector('.adv-item.dragging'); // グローバルで探す
              if (!dragging) return;
              // ドロップ先が自分自身（または自分の子孫）でないことを確認

              const after = getDragAfterElement(container, ev.clientY);
              if (after == null) container.appendChild(dragging);
              else container.insertBefore(dragging, after);
            });

            list.addEventListener('drop', (ev) => {
              ev.preventDefault();
              ev.stopPropagation(); // ヘッダーへの drop イベント伝播を止める
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;

              // newOrder は DOM の順序から取得
              const newOrder = [...list.querySelectorAll('.adv-item')].map(el => el.dataset.id);
              // dragover で DOM は移動済みのはず

              const fArr = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
              const f = fArr.find(x=>x.id===folder.id);
              if (!f) return;

              const isMove = !f.order.includes(draggedId); // このフォルダに元々無ければ「移動」

              if (isMove) {
                // 他の全フォルダから ID を削除
                for (const f_other of fArr) {
                  if (f_other.id === folder.id) continue; // 自分自身は除外
                  const o_before = f_other.order.length;
                  f_other.order = f_other.order.filter(id => id !== draggedId);
                  if (f_other.order.length !== o_before) f_other.ts = Date.now();
                }
              }

              // このフォルダの順序を DOM の順序で更新
              f.order = newOrder;
              f.ts = Date.now();
              saveFolders(ACCOUNTS_FOLDERS_KEY, fArr);
              showToast(i18n.t('toastReordered'));

              if (isMove) {
                // 「移動」の場合は、DOM要素が重複する可能性があるため、再描画してクリーンにする
                renderAccounts();
              }
            });

            section.appendChild(header);
            section.appendChild(list);
            return section;
          };

          // === 描画 ===
          // 単一指定（特定フォルダ or Unassigned のみ）モード
          if (filterFolder !== '__ALL__') {
            if (filterFolder === '__UNASSIGNED__') {
              host.appendChild(renderUnassignedSection());
            } else {
              const folder = folders.find(f => f.id === filterFolder);
              if (folder) host.appendChild(renderFolderSection(folder));
            }
            return;
          }

          // __ALL__ モード：フォルダ列の間に Unassigned を混在表示
          const order = buildSectionsOrder();
          order.forEach(id => {
            if (id === '__UNASSIGNED__') host.appendChild(renderUnassignedSection());
            else {
              const f = folders.find(x => x.id === id);
              if (f) host.appendChild(renderFolderSection(f));
            }
          });
        }

        function renderListRow(item) {
          const row = document.createElement('div');
          row.className = 'adv-item';
          row.draggable = true;
          row.dataset.id = item.id;

          const title = escapeHTML(item.name);
          const sub   = escapeHTML(item.url);

          row.innerHTML = `
            <div class="adv-item-handle" title="Drag">≡</div>
            <div class="adv-item-main">
              <div class="adv-item-title">
                <a class="adv-link" href="${escapeAttr(item.url)}">${title}</a>
              </div>
              <div class="adv-item-sub">
                <a class="adv-link" href="${escapeAttr(item.url)}">${sub}</a>
                <span>${fmtTime(item.ts)}</span>
              </div>
            </div>
            <div class="adv-item-actions">
              <button class="adv-chip primary" data-action="confirm">${i18n.t('buttonConfirm')}</button>
              <button class="adv-chip danger" data-action="delete">${i18n.t('delete')}</button>
            </div>
          `;

          row.querySelector('[data-action="confirm"]').addEventListener('click', (e) => {
            spaNavigate(item.url, { ctrlMeta: e.ctrlKey || e.metaKey });
          });
          row.querySelectorAll('a.adv-link').forEach(a => {
            a.addEventListener('click', (ev) => {
              if (ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
              ev.preventDefault();
              const href = a.getAttribute('href') || item.url;
              spaNavigate(href, { ctrlMeta: false });
            });
          });
          row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteList(item.id));

          row.addEventListener('dragstart', (ev) => {
            row.classList.add('dragging');
            ev.dataTransfer.setData('text/plain', item.id);
            ev.dataTransfer.effectAllowed = 'move';
          });
          row.addEventListener('dragend', () => row.classList.remove('dragging'));

          return row;
        }


        const ACCOUNTS_KEY = 'advAccounts_v1';
        const ACCOUNTS_FOLDERS_KEY = 'advAccountsFolders_v1';
        const LISTS_FOLDERS_KEY    = 'advListsFolders_v1';
        // ▼ セクション（フォルダー + Unassigned）の並び順を永続化するキー
        const ACCOUNTS_SECTIONS_ORDER_KEY = 'advAccountsSectionsOrder_v1';
        const LISTS_SECTIONS_ORDER_KEY    = 'advListsSectionsOrder_v1';

        function loadFolders(key, _defaultName="") {
          const raw = loadJSON(key, null);
          if (raw && Array.isArray(raw.folders)) {
            return raw.folders.map(f => ({
              id: f.id,
              name: f.name,
              order: Array.isArray(f.order) ? f.order : [],
              ts: f.ts || Date.now(),
              collapsed: !!f.collapsed,
            }));
          }
          // 初期は空配列（フォルダー0件の世界）
          return [];
        }

        function saveFolders(key, folders) {
          saveJSON(key, { folders: folders.map(f=>({
            id:f.id, name:f.name, order:[...new Set(f.order)], ts:f.ts||Date.now(), collapsed: !!f.collapsed,
          }))});
        }
        function ensureFolderToolbars() {
          // Accounts tab
          {
            const host = document.getElementById('adv-accounts-list');
            if (host && !host.previousElementSibling?.classList?.contains('adv-folder-toolbar')) {
              const bar = document.createElement('div');
              bar.className = 'adv-folder-toolbar';
              bar.innerHTML = `
                <select id="adv-accounts-folder-filter" class="adv-select"></select>
                <input id="adv-accounts-search" class="adv-input" type="text" placeholder="Filter accounts (@, name)">
                <button id="adv-accounts-new-folder" class="adv-chip">+Folder</button>
              `;
              host.parentElement.insertBefore(bar, host);
            }
          }
          // Lists tab
          {
            const host = document.getElementById('adv-lists-list');
            if (host && !host.previousElementSibling?.classList?.contains('adv-folder-toolbar')) {
              const bar = document.createElement('div');
              bar.className = 'adv-folder-toolbar';
              bar.innerHTML = `
                <select id="adv-lists-folder-filter" class="adv-select"></select>
                <input id="adv-lists-search" class="adv-input" type="text" placeholder="Filter lists (name, url)">
                <button id="adv-lists-new-folder" class="adv-chip">+Folder</button>
              `;
              host.parentElement.insertBefore(bar, host);
            }
          }
        }

        const migrateAccounts = (list) =>
          Array.isArray(list)
            ? list
                .map(it => ({
                  id: it.id || uid(),
                  handle: (it.handle || '').replace(/^@/, '').trim(),
                  name: (it.name || '').trim(),
                  avatar: it.avatar || '',
                  ts: it.ts || Date.now(),
                }))
                .filter(it => it.handle)
            : [];
        const loadAccounts = () => migrateAccounts(loadJSON(ACCOUNTS_KEY, []));
        const saveAccounts = (arr) => saveJSON(ACCOUNTS_KEY, migrateAccounts(arr));
        // 追加 or 更新（既存があれば name / avatar 差分のみ更新）
        const addAccount = ({ handle, name='', avatar='' }) => {
          const h = (handle || '').replace(/^@/, '').trim();
          if (!h) return 'empty';
          const list = loadAccounts();
          const ix = list.findIndex(x => x.handle.toLowerCase() === h.toLowerCase());
          if (ix >= 0) {
            let changed = false;
            if (name && name !== list[ix].name) { list[ix].name = name; changed = true; }
            if (avatar && avatar !== list[ix].avatar) { list[ix].avatar = avatar; changed = true; }
            if (changed) {
              list[ix].ts = Date.now();
              saveAccounts(list);
              renderAccounts();
              return 'updated';
            }
            return 'exists';
          }
          const id = uid();
          list.unshift({ id, handle: h, name, avatar, ts: Date.now() });
          saveAccounts(list);
          // フォルダーへは入れない（未所属のまま）
          try {
            const folders = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
            // 念のため全フォルダーから重複を除去だけして保存（未所属を保持）
            folders.forEach(f => { f.order = f.order.filter(x => x !== id); });
            saveFolders(ACCOUNTS_FOLDERS_KEY, folders);
          } catch(_) {}
          renderAccounts();
          return 'ok';
        };
        // 既存アカウントがある場合だけ name / avatar を更新（未登録なら何もしない）
        const updateAccountIfExists = ({ handle, name='', avatar='' }) => {
          const h = (handle || '').replace(/^@/, '').trim();
          if (!h) return 'empty';
          const list = loadAccounts();
          const ix = list.findIndex(x => x.handle.toLowerCase() === h.toLowerCase());
          if (ix < 0) return 'not_found';
          let changed = false;
          if (name && name !== list[ix].name)   { list[ix].name   = name;   changed = true; }
          if (avatar && avatar !== list[ix].avatar) { list[ix].avatar = avatar; changed = true; }
          if (changed) {
            list[ix].ts = Date.now();
            saveAccounts(list);
            renderAccounts();
            return 'updated';
          }
          return 'unchanged';
        };
        const deleteAccount = (id) => {
          const next = loadAccounts().filter(x => x.id !== id);
          saveAccounts(next);
          renderAccounts();
          showToast(i18n.t('toastDeleted'));
        };

        const accountsEmptyEl = document.getElementById('adv-accounts-empty');
        const accountsListEl  = document.getElementById('adv-accounts-list');

        // accountsListEl?.addEventListener('drop', () => {
        //   const orderIds = [...accountsListEl.querySelectorAll('.adv-item')].map(el => el.dataset.id);
        //   const list = loadAccounts();
        //   const map = Object.fromEntries(list.map(x => [x.id, x]));
        //   const reordered = orderIds.map(id => map[id]).filter(Boolean);
        //   saveAccounts(reordered);
        //   showToast(i18n.t('toastReordered'));
        // });

        function getProfileHandleFromURL(href = location.href) {
          try {
            const u = new URL(href, location.origin);
            const segs = u.pathname.split('/').filter(Boolean);
            if (segs.length === 0) return '';

            // 先頭セグメントを候補にする
            const first = segs[0];

            // 明らかな非プロフィールの予約セグメントを除外
            const RESERVED = new Set([
              'home','explore','notifications','messages','i','settings',
              'compose','search','login','signup','tos','privacy','about'
            ]);
            if (RESERVED.has(first)) return '';

            // ユーザー名パターン: プロフ直下/配下タブ（/with_replies, /media, /likes 等）を許容
            if (/^[A-Za-z0-9_]{1,50}$/.test(first)) {
              return first; // /<handle> や /<handle>/with_replies /media /likes ... をすべてカバー
            }

            return '';
          } catch {
            // DOM フォールバック
            try {
              const a = document.querySelector('[data-testid="User-Name"] a[href^="/"], [data-testid="UserName"] a[href^="/"]');
              if (a) {
                const m = (a.getAttribute('href') || '').match(/^\/([A-Za-z0-9_]{1,50})/);
                if (m) return m[1];
              }
            } catch (_) {}
            return '';
          }
        }

        // 指定ハンドルのプロフィール領域だけをスコープにして name / avatar を取得
        function collectProfileMeta(handle) {
          let name = '';
          let avatar = '';
          try {
            const h = String(handle || '').replace(/^@/, '').trim();

            // 1) プロフィール領域（表示名）
            //    ※ グローバルヘッダの自分の名前を拾わないように、最初に [data-testid="UserName"] を基準に限定
            const profileRoot =
              document.querySelector('[data-testid="UserName"]') ||
              document.querySelector('[data-testid="User-Name"]');

            if (profileRoot) {
              const texts = Array.from(profileRoot.querySelectorAll('span, div[dir="auto"]'))
                .map(el => (el.textContent || '').trim())
                .filter(Boolean);
              // 例: ["みみる@米国株投資", "@mimiru_usstock", ...]
              name = texts.find(t => !t.startsWith('@')) || '';
            }

            // 2) アバター領域をハンドルで限定
            //    DOM例: <div data-testid="UserAvatar-Container-mimiru_usstock"> ... </div>
            let avatarScope = null;
            if (h) {
              avatarScope = document.querySelector(`[data-testid="UserAvatar-Container-${CSS.escape(h)}"]`);
            }
            // フォールバック（ハンドル付き data-testid が無い古い/差分レイアウト）
            if (!avatarScope) {
              // プロフィールのヘッダ右側の塊に限定
              avatarScope = profileRoot?.closest('[data-testid="UserProfileHeader_Items"]')?.parentElement
                         || profileRoot?.parentElement
                         || document;
            }

            // 2-1) まず <img> 優先
            const img = avatarScope.querySelector('img[src*="profile_images"]');
            if (img?.src) {
              avatar = img.src;
            } else {
              // 2-2) 背景画像 style="background-image:url(...)" から抽出
              //     提示DOMの:
              //     <div class="... r-1wyyakw ..." style="background-image:url('...')"></div>
              const bg = avatarScope.querySelector('[style*="background-image"]');
              if (bg) {
                const m = String(bg.getAttribute('style') || '').match(/background-image:\s*url\((["']?)(.*?)\1\)/i);
                if (m && m[2]) avatar = m[2];
              }
            }

            // バナー(header_photo) を誤検出しないように、ヘッダバナー領域を除外
            // （banner は /header_photo へのリンク配下; avatarScope 内に入らない設計だが保険）
            if (avatar && /profile_banners\//.test(avatar)) {
              avatar = '';
            }

          } catch {}
          return { name, avatar };
        }

        let profileButtonInstalledFor = '';
        function ensureProfileAddButton(force = false) {
          const handle = getProfileHandleFromURL();
          if (!handle) return;
            // 同ハンドル内タブ遷移時でも、既存ボタンが消えていたら再設置できるようにする
          if (!force && profileButtonInstalledFor === handle && document.getElementById('adv-add-account-btn')) {
            return;
          }

          const moreBtn = document.querySelector('button[data-testid="userActions"]');
          if (!moreBtn) return;

          const parent = moreBtn.parentElement;
          if (!parent) return; // 親コンテナがなければ挿入もできない

          // 既存のボタンが残っていれば、ハンドルに関わらず強制的に削除する
          const existingBtn = parent.querySelector('#adv-add-account-btn');
          if (existingBtn) {
              existingBtn.remove();
          }

          const btn = document.createElement('button');
          btn.id = 'adv-add-account-btn';
          btn.type = 'button';
          // 見た目を完全同期（class も style もコピー）
          const syncVisual = (dst, src) => {
            dst.className = src.className;
            const st = src.getAttribute('style');
            if (st !== null) dst.setAttribute('style', st);
            // 念のため currentColor 継承
            dst.style.color ||= 'inherit';
          };
          syncVisual(btn, moreBtn);

          // 将来のテーマ切替／hover などで X が style/class を書き換えたら追従
          const visMo = new MutationObserver(() => syncVisual(btn, moreBtn));
          visMo.observe(moreBtn, { attributes: true, attributeFilter: ['class', 'style'] });
          btn.setAttribute('aria-label', i18n.t('buttonAddAccount'));
          btn.title = i18n.t('buttonAddAccount');
          // ▼ 内側の div / svg / span から「class と inline style」を抽出
          const innerDiv   = moreBtn.querySelector('div[dir="ltr"]') || moreBtn.querySelector('div');
          const innerCls   = innerDiv?.getAttribute('class') || innerDiv?.classList?.value || '';
          const innerStyle = innerDiv?.getAttribute('style') || '';
          const svgEl      = innerDiv?.querySelector('svg') || moreBtn.querySelector('svg');
          const svgCls     = svgEl?.getAttribute('class') || svgEl?.classList?.value || '';
          const spanEl     = innerDiv?.querySelector('span') || moreBtn.querySelector('span');
          const spanCls    = spanEl?.getAttribute('class') || spanEl?.classList?.value || '';
          btn.innerHTML = `
            <div dir="ltr" class="${innerCls}" style="${innerStyle}">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="${svgCls}" fill="currentColor">
                <g><path d="M12 2a5 5 0 110 10 5 5 0 010-10zm-7 18a7 7 0 0114 0v2H5v-2zm14-8h2v2h-2v2h-2v-2h-2v-2h2V8h2v2z"></path></g>
              </svg>
              <span class="${spanCls}"></span>
            </div>
          `;

          btn.addEventListener('click', () => {
            const { name, avatar } = collectProfileMeta(handle);
            const ret = addAccount({ handle, name, avatar });
            if (ret === 'ok') showToast(i18n.t('toastAccountAdded'));
            else if (ret === 'updated') showToast(i18n.t('updated'));
            else if (ret === 'exists') showToast(i18n.t('toastAccountExists'));
          });

          // moreBtn.parentElement?.insertBefore(btn, moreBtn);
        parent.insertBefore(btn, moreBtn); // parent変数を使用
          profileButtonInstalledFor = handle;

          // プロフィールに来たタイミングで自動同期
          // 未登録は追加しない。既存時のみ差分更新。
          try {
            const { name, avatar } = collectProfileMeta(handle);
            const status = updateAccountIfExists({ handle, name, avatar });
            if (status === 'updated') showToast(i18n.t('updated'));
            // 'not_found' / 'unchanged' は無通知でOK
          } catch {}

        }

        /* ========= Lists storage & UI ========= */
        const LISTS_KEY = 'advLists_v1';

        const migrateLists = (list) =>
          Array.isArray(list)
            ? list
                .map(it => ({
                  id: it.id || uid(),
                  name: (it.name || '').trim(),
                  url: (it.url || '').trim(),
                  ts: it.ts || Date.now(),
                }))
                .filter(it => it.name && it.url)
            : [];

        const loadLists  = () => migrateLists(loadJSON(LISTS_KEY, []));
        const saveLists  = (arr) => saveJSON(LISTS_KEY, migrateLists(arr));

        const addList = ({ name, url }) => {
          const nm = (name || '').trim();
          let u = (url || '').trim();
          if (!nm || !u) return 'empty';
          try {
            const parsed = new URL(u, location.origin);
            if (parsed.origin === location.origin) u = parsed.pathname + parsed.search + parsed.hash;
          } catch {}
          const list = loadLists();
          if (list.some(x => x.url === u)) return 'exists';
          const id = uid();
          list.unshift({ id, name: nm, url: u, ts: Date.now() });
          saveLists(list);
          // フォルダーへは入れない（未所属のまま）
          try {
            const folders = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
            folders.forEach(f => { f.order = f.order.filter(x => x !== id); });
            saveFolders(LISTS_FOLDERS_KEY, folders);
          } catch(_) {}
          renderLists();
          return 'ok';
        };

        const deleteList = (id) => {
          const next = loadLists().filter(x => x.id !== id);
          saveLists(next);
          renderLists();
          showToast(i18n.t('toastDeleted'));
        };

        const advListsEmptyEl = document.getElementById('adv-lists-empty');
        const advListsListEl  = document.getElementById('adv-lists-list');

        // ===== FOLDER MIGRATION =====
        (function migrateAccountsToFolders(){
          // 既存フォルダーがあっても root 前提の自動作成/自動割当はしない。
          // 古いデータで item.folderId === 'root' の痕跡があれば“未所属”に正規化。
          try {
            let items = loadAccounts();
            let changed = false;
            items = items.map(it => {
              if (it.folderId === 'root') { delete it.folderId; changed = true; }
              return it;
            });
            if (changed) saveAccounts(items);
          } catch(_) {}
        })();

        (function migrateListsToFolders(){
          // root 前提の自動作成/自動割当は行わない。
          try {
            let items = loadLists();
            let changed = false;
            items = items.map(it => {
              if (it.folderId === 'root') { delete it.folderId; changed = true; }
              return it;
            });
            if (changed) saveLists(items);
          } catch(_) {}
        })();

        // UI toolbars
        ensureFolderToolbars();

        function renderLists() {
          ensureFolderToolbars();

          const items   = loadLists();
          let   folders = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
          const idToItem = Object.fromEntries(items.map(x => [x.id, x]));

          // フォルダ order の死票掃除
          let needsSave = false;
          for (const f of folders) {
            const before = f.order.length;
            f.order = f.order.filter(id => !!idToItem[id]);
            if (f.order.length !== before) { needsSave = true; f.ts = Date.now(); }
          }
          if (needsSave) saveFolders(LISTS_FOLDERS_KEY, folders);

          // 未所属
          const allIds     = new Set(items.map(x => x.id));
          const inFolders  = new Set(folders.flatMap(f => f.order));
          const unassignedIds = [...allIds].filter(id => !inFolders.has(id));

          // フィルタUI
          const filterSel = document.getElementById('adv-lists-folder-filter');
          const searchEl  = document.getElementById('adv-lists-search');
          const newBtn    = document.getElementById('adv-lists-new-folder');

          if (filterSel) {
            const prev = filterSel.value;
            filterSel.innerHTML = '';
            const optAll = document.createElement('option'); optAll.value='__ALL__'; optAll.textContent='ALL'; filterSel.appendChild(optAll);
            const optUn  = document.createElement('option'); optUn.value='__UNASSIGNED__'; optUn.textContent='Unassigned'; filterSel.appendChild(optUn);
            folders.forEach(f=>{
              const o = document.createElement('option'); o.value = f.id; o.textContent = f.name; filterSel.appendChild(o);
            });
            if ([...filterSel.options].some(o=>o.value===prev)) filterSel.value = prev; else filterSel.value='__ALL__';
            filterSel.onchange = ()=> renderLists();
          }
          if (searchEl && !searchEl._advBound) {
            searchEl._advBound = true;
            searchEl.addEventListener('input', ()=>renderLists());
          }
          if (newBtn && !newBtn._advBound) {
            newBtn._advBound = true;
            newBtn.addEventListener('click', ()=>{
              const nm = prompt('New folder name', '');
              if (!nm || !nm.trim()) return;
              const fs = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
              fs.push({ id: uid(), name: nm.trim(), order: [], ts: Date.now() });
              saveFolders(LISTS_FOLDERS_KEY, fs);
              renderLists();
            });
          }

          const filterFolder = filterSel?.value || '__ALL__';
          const q = (searchEl?.value || '').toLowerCase().trim();
          const matchItem = (it) => {
            if (!q) return true;
            const name = (it.name||'').toLowerCase();
            const url  = (it.url ||'').toLowerCase();
            return name.includes(q) || url.includes(q);
          };

          const host = document.getElementById('adv-lists-list');
          const emptyEl = document.getElementById('adv-lists-empty');
          host.innerHTML = '';
          emptyEl.textContent = items.length ? '' : i18n.t('emptyLists');

          // Unassigned の並び位置
          const UNASSIGNED_INDEX_KEY = 'advListsUnassignedIndex_v1';
          const getUnIdx = () => {
            try { const v = GM_getValue(UNASSIGNED_INDEX_KEY, 0); return Math.max(0, Math.min(folders.length, +v||0)); } catch { return 0; }
          };
          const setUnIdx = (idx) => { try { GM_setValue(UNASSIGNED_INDEX_KEY, String(idx)); } catch {} };

          const foldersToDraw =
            filterFolder === '__ALL__'      ? [...folders] :
            filterFolder === '__UNASSIGNED__' ? [] :
            folders.filter(f => f.id === filterFolder);

          const buildSectionsOrder = () => {
            if (filterFolder !== '__ALL__') return foldersToDraw.map(f => f.id);
            const idx = getUnIdx();
            const arr = foldersToDraw.map(f => f.id);
            arr.splice(Math.max(0, Math.min(arr.length, idx)), 0, '__UNASSIGNED__');
            return arr;
          };

          const SECT_MIME = 'adv/folder';
          const getSectionAfterElement = (container, y) => {
            const els = [...container.querySelectorAll('.adv-folder:not(.dragging-folder), .adv-unassigned:not(.dragging-folder)')];
            let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
            for (const el of els) {
              const box = el.getBoundingClientRect();
              const offset = y - box.top - box.height / 2;
              if (offset < 0 && offset > closest.offset) {
                closest = { offset, element: el };
              }
            }
            return closest.element;
          };
          const persistSectionsFromDOM = () => {
            const order = [...host.querySelectorAll('.adv-folder, .adv-unassigned')].map(sec => sec.dataset.folderId);
            // フォルダ順
            const newFolderOrderIds = order.filter(id => id !== '__UNASSIGNED__');
            let fs = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
            const map = Object.fromEntries(fs.map(f=>[f.id,f]));
            const reordered = newFolderOrderIds.map(id=>map[id]).filter(Boolean);
            fs.forEach(f => { if (!reordered.includes(f)) reordered.push(f); });
            saveFolders(LISTS_FOLDERS_KEY, reordered);

            // Unassigned 位置
            const unIdx = order.indexOf('__UNASSIGNED__');
            if (unIdx >= 0) setUnIdx(unIdx);

            showToast(i18n.t('toastReordered'));
          };

          const renderUnassignedSection = () => {
            const sec = document.createElement('section');
            sec.className = 'adv-unassigned';
            sec.dataset.folderId = '__UNASSIGNED__';
            sec.setAttribute('draggable', 'true');

            const list = document.createElement('div');
            list.className = 'adv-list';

            const itemsUn = unassignedIds.map(id => idToItem[id]).filter(Boolean).filter(matchItem);
            itemsUn.forEach(it => list.appendChild(renderListRow(it)));

            sec.appendChild(list);

            sec.addEventListener('dragstart', (ev) => {
              // ★ドラッグ開始地点がアイテム(.adv-item)やその子孫でないことを確認
              const item = ev.target.closest('.adv-item');

              if (!item) {
                // アイテムD&Dでない場合、セクションD&Dとして扱う
                ev.dataTransfer.setData(SECT_MIME, '__UNASSIGNED__');
                ev.dataTransfer.effectAllowed = 'move';
                sec.classList.add('dragging-folder');
              }
            });
            sec.addEventListener('dragend', () => sec.classList.remove('dragging-folder'));

            sec.addEventListener('dragover', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) {
                ev.preventDefault();
                const dragging = host.querySelector('.dragging-folder');
                if (!dragging || dragging === sec) return;
                const after = getSectionAfterElement(host, ev.clientY);
                if (after == null) host.appendChild(dragging);
                else host.insertBefore(dragging, after);
              }
            });

            // Unassigned領域へのドロップ処理（Lists専用）
            const handleDropOnUnassigned_Lists = (ev) => {
              // セクション（フォルダ）自体のドラッグは無視
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;

              ev.preventDefault();
              ev.stopPropagation(); // イベント伝播を停止
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (draggedId) {
                unassignList(draggedId); // ★ 共通関数を呼ぶように変更
              }
            };

            // アイテム並び替え 兼 Unassigned への移動
            list.addEventListener('dragover', ev => {
              // セクション（フォルダ）のドラッグ
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) {
                // ★セクション並び替えD&D。親(sec)のdragoverに処理を任せる。
                // ★イベントを止めずに return する。
                return;
              }

              // アイテムのドラッグ
              ev.preventDefault();
              ev.stopPropagation(); // ★ 親(sec)のアイテムD&Dハンドラには行かせない

              // プレビュー（DOM移動）
              const container = list;
              const dragging = document.querySelector('.adv-item.dragging'); // グローバルで探す
              if (!dragging) return;
              if (dragging.contains(container)) return;

              const after = getDragAfterElement(container, ev.clientY);
              if (after == null) container.appendChild(dragging);
              else container.insertBefore(dragging, after);
            });

            // リスト（またはその中のアイテム）へのドロップ
            list.addEventListener('drop', handleDropOnUnassigned_Lists);

            // ★セクション（の余白）へのドラッグを許可
            sec.addEventListener('dragover', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault();
              ev.stopPropagation();
            });
            // ★セクション（の余白）へのドロップ
            sec.addEventListener('drop', handleDropOnUnassigned_Lists);

            return sec;
          };

          const renderFolderSection = (folder) => {
            const section = document.createElement('section');
            section.className = 'adv-folder';
            section.dataset.folderId = folder.id;
            if (folder.collapsed) section.classList.add('adv-folder-collapsed');

            const header = document.createElement('div');
            header.className = 'adv-folder-header';
            header.setAttribute('draggable', 'true');

            const toggleBtn = renderFolderToggleButton(!!folder.collapsed);
            const titleWrap = document.createElement('div');
            titleWrap.className = 'adv-folder-title';
            titleWrap.appendChild(toggleBtn);
            const nameEl = document.createElement('strong'); nameEl.textContent = folder.name; titleWrap.appendChild(nameEl);
            const countEl = document.createElement('span'); countEl.className='adv-item-sub'; countEl.textContent = `(${folder.order.length})`;
            titleWrap.appendChild(countEl);

            const actions = document.createElement('div');
            actions.className = 'adv-folder-actions';
            actions.innerHTML = `
              <button class="adv-chip" data-action="rename"  aria-label="Rename folder" title="Rename folder">Rename</button>
              <button class="adv-chip danger" data-action="delete" aria-label="Delete folder" title="Delete folder">Delete</button>
            `;

            header.appendChild(titleWrap);
            header.appendChild(actions);

            // セクション（フォルダ） DnD
            header.addEventListener('dragstart', (ev) => {
              if (ev.target && (ev.target.closest('.adv-folder-actions') || ev.target.closest('.adv-folder-toggle-btn'))) {
                ev.preventDefault(); return;
              }
              ev.dataTransfer.setData(SECT_MIME, folder.id);
              ev.dataTransfer.effectAllowed = 'move';
              section.classList.add('dragging-folder');
            });
            header.addEventListener('dragend', () => section.classList.remove('dragging-folder'));

            section.addEventListener('dragover', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) {
                ev.preventDefault();
                const dragging = host.querySelector('.dragging-folder');
                if (!dragging || dragging === section) return;
                const after = getSectionAfterElement(host, ev.clientY);
                if (after == null) host.appendChild(dragging);
                else host.insertBefore(dragging, after);
              }
            });

            host.addEventListener('drop', (ev) => {
              if (!(ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME))) return;
              ev.preventDefault();
              persistSectionsFromDOM();
              renderLists();
            }, { once:true });

            // 折りたたみ
            const collapseToggle = () => {
              section.classList.toggle('adv-folder-collapsed');
              const all = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
              const f = all.find(x => x.id === folder.id);
              if (f) { f.collapsed = section.classList.contains('adv-folder-collapsed'); f.ts = Date.now(); saveFolders(LISTS_FOLDERS_KEY, all); }
              updateFolderToggleButton(toggleBtn, !!section.classList.contains('adv-folder-collapsed'));
            };
            toggleBtn.addEventListener('click', (e)=>{ e.stopPropagation(); collapseToggle(); });
            toggleBtn.addEventListener('keydown', (e)=>{ if (e.key===' '||e.key==='Enter'){ e.preventDefault(); collapseToggle(); } });

            // Rename / Delete
            actions.querySelector('[data-action="rename"]').addEventListener('click', ()=>{
              const nm = prompt('New folder name', folder.name);
              if (!nm || !nm.trim()) return;
              const fArr = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
              const f = fArr.find(x=>x.id===folder.id); if (!f) return;
              f.name = nm.trim(); f.ts = Date.now(); saveFolders(LISTS_FOLDERS_KEY, fArr);
              renderLists(); showToast(i18n.t('updated'));
            });
            actions.querySelector('[data-action="delete"]').addEventListener('click', ()=>{
              if (!confirm('Delete this folder? Items will become Unassigned.')) return;
              let fArr = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
              const idx = fArr.findIndex(x=>x.id===folder.id); if (idx<0) return;
              fArr.splice(idx,1);
              saveFolders(LISTS_FOLDERS_KEY, fArr);
              renderLists(); showToast(i18n.t('toastDeleted'));
            });

            // フォルダ見出しにアイテムをドロップ → そのフォルダへ移動
            header.addEventListener('dragover', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault(); header.dataset.drop='1';
            });
            header.addEventListener('dragleave', () => { delete header.dataset.drop; });
            header.addEventListener('drop', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault(); delete header.dataset.drop;
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;
              moveListToFolder(draggedId, folder.id);
            });

            const list = document.createElement('div');
            list.className = 'adv-list';
            const itemsInFolder = folder.order.map(id => idToItem[id]).filter(Boolean).filter(matchItem);
            itemsInFolder.forEach(it => list.appendChild(renderListRow(it)));

            // フォルダ内の並び保存 兼 フォルダへの移動
            list.addEventListener('dragover', ev => {
              ev.preventDefault(); // リスト領域全体をドロップターゲットにする
              // プレビュー（DOM移動）
              const container = list;
              const dragging = document.querySelector('.adv-item.dragging'); // グローバルで探す
              if (!dragging) return;
              if (dragging.contains(container)) return;

              const after = getDragAfterElement(container, ev.clientY);
              if (after == null) container.appendChild(dragging);
              else container.insertBefore(dragging, after);
            });

            list.addEventListener('drop', (ev) => {
              ev.preventDefault();
              ev.stopPropagation(); // ヘッダーへの drop イベント伝播を止める
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;

              const newOrder = [...list.querySelectorAll('.adv-item')].map(el => el.dataset.id);

              const fArr = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
              const f = fArr.find(x=>x.id===folder.id);
              if (!f) return;

              const isMove = !f.order.includes(draggedId); // このフォルダに元々無ければ「移動」

              if (isMove) {
                // 他の全フォルダから ID を削除
                for (const f_other of fArr) {
                  if (f_other.id === folder.id) continue;
                  const o_before = f_other.order.length;
                  f_other.order = f_other.order.filter(id => id !== draggedId);
                  if (f_other.order.length !== o_before) f_other.ts = Date.now();
                }
              }

              // このフォルダの順序を DOM の順序で更新
              f.order = newOrder;
              f.ts = Date.now();
              saveFolders(LISTS_FOLDERS_KEY, fArr);
              showToast(i18n.t('toastReordered'));

              if (isMove) {
                renderLists();
              }
            });

            section.appendChild(header);
            section.appendChild(list);
            return section;
          };

          // 単一表示モード
          if (filterFolder !== '__ALL__') {
            if (filterFolder === '__UNASSIGNED__') {
              host.appendChild(renderUnassignedSection());
            } else {
              const folder = folders.find(f => f.id === filterFolder);
              if (folder) host.appendChild(renderFolderSection(folder));
            }
            return;
          }

          // __ALL__: フォルダ間に Unassigned を混在表示
          const order = buildSectionsOrder();
          order.forEach(id => {
            if (id === '__UNASSIGNED__') host.appendChild(renderUnassignedSection());
            else {
              const f = folders.find(x => x.id === id);
              if (f) host.appendChild(renderFolderSection(f));
            }
          });
        }

        // === Accounts フォルダ操作 ===
        function moveAccountToFolder(accountId, targetFolderId) {
          try {
            const accounts = loadAccounts();
            const folders = loadFolders(ACCOUNTS_FOLDERS_KEY, i18n.t('optAccountAll'));
            const idSet = new Set(accounts.map(a => a.id));
            if (!idSet.has(accountId)) return;

            // すべてのフォルダから一旦抜く
            for (const f of folders) {
              const before = f.order.length;
              f.order = f.order.filter(id => id !== accountId);
              if (f.order.length !== before) f.ts = Date.now();
            }

            // 目標フォルダへ追加（無ければ root へ）
            const target = folders.find(f => f.id === targetFolderId);
            // targetが無ければ“未所属”にする＝どこにも入れない
            if (target) {
              target.order = [accountId, ...target.order.filter(id => id !== accountId)];
              target.ts = Date.now();
            }

            saveFolders(ACCOUNTS_FOLDERS_KEY, folders);
            showToast(i18n.t('toastReordered'));
            // 再描画
            try { renderAccounts(); } catch(_) {}
          } catch (e) {
            console.error('moveAccountToFolder failed', e);
          }
        }

        // === Lists フォルダ操作 ===
        function moveListToFolder(listId, targetFolderId) {
          try {
            const lists = loadLists();
            const folders = loadFolders(LISTS_FOLDERS_KEY, i18n.t('optLocationAll'));
            const idSet = new Set(lists.map(a => a.id));
            if (!idSet.has(listId)) return;

            // すべてのフォルダから一旦抜く
            for (const f of folders) {
              const before = f.order.length;
              f.order = f.order.filter(id => id !== listId);
              if (f.order.length !== before) f.ts = Date.now();
            }

            // 目標フォルダへ追加（無ければ root へ）
            const target = folders.find(f => f.id === targetFolderId);
            if (target) {
              target.order = [listId, ...target.order.filter(id => id !== listId)];
              target.ts = Date.now();
            }

            saveFolders(LISTS_FOLDERS_KEY, folders);
            showToast(i18n.t('toastReordered'));
            // 再描画
            try { renderLists(); } catch(_) {}
          } catch (e) {
            console.error('moveListToFolder failed', e);
          }
        }

        // advListsListEl?.addEventListener('drop', () => {
        //   const orderIds = [...advListsListEl.querySelectorAll('.adv-item')].map(el => el.dataset.id);
        //   const list = loadLists();
        //   const map = Object.fromEntries(list.map(x => [x.id, x]));
        //   const reordered = orderIds.map(id => map[id]).filter(Boolean);
        //   saveLists(reordered);
        //   showToast(i18n.t('toastReordered'));
        // });

        const isListPath = (pathname = location.pathname) => /^\/i\/lists\/\d+\/?$/.test(pathname);

        function getListMeta() {
          // 1) <title> から取り出し（最優先）
          let rawTitle = '';
          try { rawTitle = (document.title || '').trim(); } catch (_) {}

          // 末尾の " / X" または " / Twitter" を削る
          let baseTitle = rawTitle.replace(/\s*\/\s*(X|Twitter)\s*$/i, '').trim();

          let name = '';
          let m;

          // パターンA: "@owner/リスト名"
          m = baseTitle.match(/^\s*@([A-Za-z0-9_]{1,50})\/\s*(.+)\s*$/);
          if (m) {
            name = (m[2] || '').trim();
          }

          // パターンB: "リスト名 (@owner)"
          if (!name) {
            m = baseTitle.match(/^\s*(.+?)\s*\(@[A-Za-z0-9_]{1,50}\)\s*$/);
            if (m) {
              name = (m[1] || '').trim();
            }
          }

          // 余分な引用符 “ ” " ' に対応
          if (name) {
            name = name.replace(/^[“"'](.+)[”"']$/, '$1').trim();
          }

          // 2) タイトルで取れない/怪しい時は見出しから拾う（@を含む/長文/ヘルプ文は除外）
          if (!name) {
            try {
              const headingRoot =
                document.querySelector('[data-testid="ScrollSnap-ListHeader"]') ||
                document.querySelector('[data-testid="primaryColumn"]') ||
                document;

              const candidates = Array.from(
                headingRoot.querySelectorAll('h1[role="heading"], h2[role="heading"], h3[role="heading"]')
              )
                .flatMap(h => Array.from(h.querySelectorAll('span, div[dir="ltr"], div[dir="auto"]'))
                  .map(el => (el.textContent || '').trim()))
                .filter(Boolean)
                // 「@…」はオーナー表記なので除外
                .filter(txt => !/^@/.test(txt))
                // 長文やヘルプ文（キーボードショートカット系）を弾く
                .filter(txt => {
                  const t = txt.replace(/\s+/g, ' ');
                  if (t.length > 80) return false;
                  const NG = ['キーボードショートカット', 'keyboard', 'help', 'ショートカット', 'press', '?'];
                  return !NG.some(ng => t.toLowerCase().includes(ng.toLowerCase()));
                });

              if (candidates.length) {
                // 一番短い候補（＝装飾の少ないタイトルの可能性が高い）
                name = candidates.sort((a, b) => a.length - b.length)[0].trim();
              }
            } catch (_) {}
          }

          // 3) 最終フォールバック
          if (!name) name = '';

          // URL は現ページ（SPA対応でクエリ/ハッシュも保持）
          const url = location.pathname + location.search + location.hash;
          return { name, url };
        }

        let listButtonInstalledAt = '';
        function ensureListAddButton(force = false) {
          if (!isListPath()) return;
          if (!force && listButtonInstalledAt === location.pathname) return;

          const shareBtn = document.querySelector('button[data-testid="share-button"]');
          if (!shareBtn) return;

        const parent = shareBtn.parentElement;
        if (!parent) return;

        // 既存のボタンが残っていれば、強制的に削除する
        const existingBtn = parent.querySelector('#adv-add-list-btn');
        if (existingBtn) {
            existingBtn.remove();
        }

          const btn = document.createElement('button');
          btn.id = 'adv-add-list-btn';
          btn.type = 'button';

          const syncVisual = (dst, src) => {
            dst.className = src.className;
            const st = src.getAttribute('style');
            if (st !== null) dst.setAttribute('style', st);
            dst.style.color ||= 'inherit';
          };
          syncVisual(btn, shareBtn);

          const visMo = new MutationObserver(() => syncVisual(btn, shareBtn));
          visMo.observe(shareBtn, { attributes: true, attributeFilter: ['class', 'style'] });

          btn.setAttribute('aria-label', i18n.t('buttonAddList'));
          btn.title = i18n.t('buttonAddList');

          const innerDiv   = shareBtn.querySelector('div[dir="ltr"]') || shareBtn.querySelector('div');
          const innerCls   = innerDiv?.getAttribute('class') || innerDiv?.classList?.value || '';
          const innerStyle = innerDiv?.getAttribute('style') || '';
          const svgEl      = innerDiv?.querySelector('svg') || shareBtn.querySelector('svg');
          const svgCls     = svgEl?.getAttribute('class') || svgEl?.classList?.value || '';
          const spanEl     = innerDiv?.querySelector('span') || shareBtn.querySelector('span');
          const spanCls    = spanEl?.getAttribute('class') || spanEl?.classList?.value || '';

          btn.innerHTML = `
            <div dir="ltr" class="${innerCls}" style="${innerStyle}">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="${svgCls}" fill="currentColor">
                <g><path d="M12 5c.55 0 1 .45 1 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H6a1 1 0 110-2h5V6c0-.55.45-1 1-1z"></path></g>
              </svg>
              <span class="${spanCls}"></span>
            </div>
          `;

          btn.addEventListener('click', () => {
            const { name, url } = getListMeta();
            const ret = addList({ name, url });
            if (ret === 'ok') showToast(i18n.t('toastListAdded'));
            else if (ret === 'exists') showToast(i18n.t('toastListExists'));
          });

          // 左隣に設置
          // shareBtn.parentElement?.insertBefore(btn, shareBtn);
        parent.insertBefore(btn, shareBtn); // parent変数を使用

          listButtonInstalledAt = location.pathname;
        }

        const reconcileUI = () => {
            const stored = (()=>{ try { return JSON.parse(kv.get(MODAL_STATE_KEY,'{}')); } catch{ return {}; } })();
            const desiredVisible = !!stored.visible;
            const blocked = isBlockedPath(location.pathname);

            if (blocked) {
                trigger.style.display = 'none';
            } else {
                trigger.style.display = '';
                applyTriggerStoredPosition();
                requestAnimationFrame(keepTriggerInViewport);
            }

            const shouldShow = (!blocked) && (desiredVisible || manualOverrideOpen);
            const wasShown = (modal.style.display === 'flex');
            modal.style.display = shouldShow ? 'flex' : 'none';
            if (shouldShow) {
                applyModalStoredPosition();
                requestAnimationFrame(keepModalInViewport);
                if (!wasShown) {
                    syncFromSearchBoxToModal();
                    applyScopesToControls(readScopesFromURL());
                    updateSaveButtonState();
                }
            }
        };

        trigger.addEventListener('click', () => {
            if (trigger.style.display === 'none') return;
            const isVisibleNow = modal.style.display === 'flex';
            if (isVisibleNow) {
                manualOverrideOpen = false;
                modal.style.display = 'none';
                saveModalRelativeState();
            } else {
                manualOverrideOpen = true;
                modal.style.display = 'flex';
                syncFromSearchBoxToModal();
                applyScopesToControls(readScopesFromURL());
                applyModalStoredPosition();
                requestAnimationFrame(keepModalInViewport);
                applyZoom();
                saveModalRelativeState();
                updateSaveButtonState();
            }
        });

        closeButton.addEventListener('click', () => {
            manualOverrideOpen = false;
            modal.style.display = 'none';
            saveModalRelativeState();
        });

        clearButton.addEventListener('click', () => { form.reset(); syncFromModalToSearchBox(); });

        applyButton.addEventListener('click', () => executeSearch());
        applyButton.addEventListener('click', () => { setTimeout(scanAndFilterTweets, 800); });

        saveButton.addEventListener('click', () => {
            const q = buildQueryStringFromModal().trim();
            if (!q) return;
            const {pf, lf} = readScopesFromControls();
            addSaved(q, pf, lf);
            activateTab('saved');
        });

        form.addEventListener('input', syncFromModalToSearchBox);
        form.addEventListener('keydown', e => {
            if (e.key === 'Enter' && (e.target.matches('input[type="text"], input[type="number"]'))) {
                e.preventDefault();
                // 検索確定 → ルーティング反映待ち → スキャン
                Promise.resolve(executeSearch())
                  .finally(() => setTimeout(scanAndFilterTweets, 800));
            }
        });

        const muteEmptyEl = document.getElementById('adv-mute-empty');
        const muteListEl  = document.getElementById('adv-mute-list');
        const muteInputEl = document.getElementById('adv-mute-input');
        const muteCsEl    = document.getElementById('adv-mute-cs');
        const muteAddBtn  = document.getElementById('adv-mute-add');

        const renderMuted = () => {
          const list = loadMuted();
          muteListEl.innerHTML = '';
          muteEmptyEl.textContent = list.length ? '' : i18n.t('emptyMuted');
          list.forEach(item => {
            const row = document.createElement('div');
            row.className = 'adv-mute-item';
            if (!item.enabled) row.classList.add('disabled');
            row.innerHTML = `
              <div class="adv-mute-word">${escapeHTML(item.word)}</div>
              <div class="adv-mute-actions">
                <label class="adv-toggle">
                  <input type="checkbox" ${item.enabled ? 'checked' : ''} data-action="toggle-enabled">
                  <span data-i18n="labelEnabled">${i18n.t('labelEnabled')}</span>
                </label>
                <label class="adv-toggle">
                  <input type="checkbox" ${item.cs ? 'checked' : ''} data-action="toggle-cs">
                  <span data-i18n="labelCaseSensitive">${i18n.t('labelCaseSensitive')}</span>
                </label>
                <button class="adv-chip danger" data-action="delete">${i18n.t('delete')}</button>
              </div>
            `;
            row.querySelector('[data-action="toggle-enabled"]').addEventListener('change', () => toggleMutedEnabled(item.id));
            row.querySelector('[data-action="toggle-cs"]').addEventListener('change', () => toggleMutedCS(item.id));
            row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteMuted(item.id));
            muteListEl.appendChild(row);
          });
        };

        function applyMuteVisualState() {
          const listEl = document.getElementById('adv-mute-list');
          if (!listEl) return;
          const masterOn = loadMuteMaster();

          // ▼ 切替の瞬間だけトランジション全停止
          listEl.classList.add('adv-no-anim');
          // 強制リフローでスタイル確定
          void listEl.offsetHeight;
          listEl.classList.toggle('disabled', !masterOn);
          // 次フレームで解除（描画を跨がせるのがポイント）
          requestAnimationFrame(() => {
            listEl.classList.remove('adv-no-anim');
          });
        }

        muteAddBtn.addEventListener('click', () => {
          addMuted(muteInputEl.value, !!muteCsEl.checked);
          muteInputEl.value = '';
          muteCsEl.checked = false;
        });
        muteInputEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); muteAddBtn.click(); }
        });

        const muteEnableAllEl = document.getElementById('adv-mute-enable-all');
        if (muteEnableAllEl && !muteEnableAllEl._advBound) {
          muteEnableAllEl._advBound = true;
          // 初期状態はマスター値をそのまま反映
          try {
            muteEnableAllEl.checked = loadMuteMaster();
          } catch {}
          applyMuteVisualState();    // 初期描画でリスト外観を整える

          muteEnableAllEl.addEventListener('change', () => {
            saveMuteMaster(!!muteEnableAllEl.checked);
            applyMuteVisualState();   // 視覚の即時反映（リスト半透明/通常）
            scanAndFilterTweets();    // 機能面の反映（既存）
          });

        }

        const installNavigationHooks = (onRouteChange) => {
            let lastHref = location.href;
            const _debounce = (fn, wait=60) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; };
            const fireIfChanged = _debounce(() => {
                const now = location.href;
                if (now !== lastHref) {
                    lastHref = now;
                    try {
                        const u = new URL(now, location.origin);
                        if (u.pathname.startsWith('/search')) {
                            const q = u.searchParams.get('q') || '';
                            const pf = (u.searchParams.get('pf') || '') === 'on';
                            const lf = (u.searchParams.get('lf') || '') === 'on';
                            if (q) recordHistory(decodeURIComponent(q), pf, lf);
                        }
                    } catch(_) {}
                    onRouteChange();
                }
            }, 60);

            const wrapHistory = (m) => {
                const orig = history[m];
                history[m] = function(...args){
                    try {
                        const href = args && args[2];
                        if (href) {
                            const u = new URL(href, location.href);
                            if (u.origin === location.origin && isBlockedPath(u.pathname)) {
                                hideUIImmediately(
                                    document.getElementById('advanced-search-modal'),
                                    document.getElementById('advanced-search-trigger')
                                );
                            }
                        }
                    } catch(_) {}
                    const ret = orig.apply(this, args);
                    queueMicrotask(fireIfChanged);
                    return ret;
                };
            };
            wrapHistory('pushState'); wrapHistory('replaceState');
            window.addEventListener('popstate', fireIfChanged);

            document.addEventListener('click', (e) => {
                const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
                if (!a) return;
                try {
                    const u = new URL(a.href, location.href);
                    if (u.origin === location.origin) {
                        const sameTab = !(e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || e.button === 1);
                        if (sameTab && isBlockedPath(u.pathname)) {
                            hideUIImmediately(
                                document.getElementById('advanced-search-modal'),
                                document.getElementById('advanced-search-trigger')
                            );
                        }
                        setTimeout(fireIfChanged, 0);
                    }
                } catch(_) {}
            }, true);

            const mo = new MutationObserver(fireIfChanged);
            mo.observe(document.documentElement, { childList:true, subtree:true });
            const pollId = setInterval(fireIfChanged, 300);
            return () => { mo.disconnect(); clearInterval(pollId); };
        };

        const setupObservers = () => {
            const observer = new MutationObserver((mutations) => {
                let searchBoxChanged=false;
                for (const m of mutations) {
                    if (m.addedNodes.length>0) {
                        for (const node of m.addedNodes) {
                            if (node.nodeType!==Node.ELEMENT_NODE) continue;
                            if (node.matches?.('input[data-testid="SearchBox_Search_Input"]') || node.querySelector?.('input[data-testid="SearchBox_Search_Input"]')) { searchBoxChanged=true; break; }
                        }
                    }
                    if (searchBoxChanged) break;
                }
                if (searchBoxChanged) { syncFromSearchBoxToModal(); }
                document.querySelectorAll('input[data-testid="SearchBox_Search_Input"]').forEach(input=>{
                    if (!input.dataset.advSearchAttached) {
                        input.dataset.advSearchAttached='true';

                        // ▼ 入力系イベントはすべて「入力中」と見なしてガード更新（IME対応）
                        const typingEvents = ['input','keydown','keyup','compositionstart','compositionupdate','compositionend'];
                        typingEvents.forEach(ev => input.addEventListener(ev, markTyping, { passive: true }));

                        input.addEventListener('input', () => {
                            if (input === getActiveSearchInput()) {
                                syncFromSearchBoxToModal();
                            }
                        });

                        const f = input.closest('form');
                        if (f && !f.dataset.advSearchSubmitAttached) {
                            f.dataset.advSearchSubmitAttached = 'true';
                            f.addEventListener('submit', () => {
                                const val = (input.value || '').trim();
                                const {pf, lf} = readScopesFromControls();
                                if (val) recordHistory(val, pf, lf);
                            }, true);
                        }
                    }
                });

                // ▼ ツイート要素が増減したかを検出（無関係なUI変化では走らせない）
                const hasTweetMut = mutations.some(m => {
                    const added = Array.from(m.addedNodes || []);
                    const removed = Array.from(m.removedNodes || []);
                    const hit = (n) => n.nodeType === Node.ELEMENT_NODE && (
                        n.matches?.('article[data-testid="tweet"], [data-testid="cellInnerDiv"]') ||
                        n.querySelector?.('article[data-testid="tweet"], [data-testid="cellInnerDiv"]')
                    );
                    return added.some(hit) || removed.some(hit);
                });

                // ▼ 入力中は絶対に走らせない。かつ、検索ボックス由来の変化では走らせない。
                //    さらに、ツイート変化があった時だけ実行。
                if (!isTyping() && !searchBoxChanged && hasTweetMut) {
                    scanAndFilterTweets();
                }

                ensureProfileAddButton();
                ensureListAddButton();
            });
            observer.observe(document.body, { childList:true, subtree:true });

            installNavigationHooks(() => {
                manualOverrideOpen = false;
                reconcileUI();
                syncFromSearchBoxToModal();
                applyScopesToControls(readScopesFromURL());
                updateSaveButtonState();
                scanAndFilterTweets();
                ensureProfileAddButton(true);
                ensureListAddButton(true);
            });
        };

        window.addEventListener('resize', debounce(()=>{
            if (modal.style.display === 'flex') { applyModalStoredPosition(); requestAnimationFrame(keepModalInViewport); }
            if (trigger.style.display !== 'none') { applyTriggerStoredPosition(); requestAnimationFrame(keepTriggerInViewport); }
        }, 100));

        loadModalState();
        reconcileUI();
        setupModalDrag();
        setupModalResize();
        setupObservers();

        // ▼ Setup background drop zones ▼
        setupBackgroundDrop(tabAccountsPanel, accountsListEl, unassignAccount);
        setupBackgroundDrop(tabListsPanel, advListsListEl, unassignList);

        renderHistory();
        renderSaved();
        renderAccounts();
        renderMuted();
        activateTab('search');

        (async () => {
            const input = await waitForElement(searchInputSelectors.join(','), 7000);
            if (input) {
                syncFromSearchBoxToModal();
                applyScopesToControls(readScopesFromURL());
                updateSaveButtonState();
                scanAndFilterTweets();
                ensureProfileAddButton(true);
                ensureListAddButton(true);
            }
        })();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
