// ==UserScript==
// @name         X.com (Twitter) Advanced Search Modal 🔍
// @name:ja      X.com（Twitter）高度検索モーダル 🔍
// @name:en      X.com (Twitter) Advanced Search Modal 🔍
// @name:zh-CN   X.com（Twitter）高级搜索模态框 🔍
// @name:zh-TW   X.com（Twitter）高級搜尋模態框 🔍
// @name:ko      X.com (Twitter) 고급 검색 모달 🔍
// @name:fr      X.com (Twitter) : Modal de recherche avancée 🔍
// @name:es      Modal de búsqueda avanzada para X.com (Twitter) 🔍
// @name:de      Erweiterte Suchmodal für X.com (Twitter) 🔍
// @name:pt-BR   Modal de busca avançada no X.com (Twitter) 🔍
// @name:ru      Расширенный поиск для X.com (Twitter) 🔍
// @version      4.2.0
// @description      Adds a floating modal for advanced search on X.com (Twitter). Syncs with search box and remembers position/display state. The top-right search icon is now draggable and its position persists.
// @description:ja   X.com（Twitter）に高度な検索機能を呼び出せるフローティング・モーダルを追加します。検索ボックスと双方向で同期し、位置や表示状態も記憶します。右上の検索アイコンはドラッグで移動でき、位置は保存されます。
// @description:en   Adds a floating modal for advanced search on X.com (formerly Twitter). Syncs with search box and remembers position/display state. The top-right search icon is draggable with persistent position.
// @description:zh-CN 为X.com（Twitter）添加高级搜索浮动模态框，支持与搜索框双向同步并记住位置与显示状态。右上角的搜索图标可拖动，并会记住位置。
// @description:zh-TW 為 X.com（Twitter）增加高級搜尋模態框，支援與搜尋框雙向同步並記住位置與顯示狀態。右上角搜尋圖示可拖曳，位置會被保存。
// @description:ko   X.com(Twitter)에 고급 검색 모달을 추가합니다. 검색창과 양방향 동기화하며 위치와 표시 상태를 기억합니다. 우상단 검색 아이콘은 드래그 이동 및 위치 저장이 가능합니다。
// @description:fr   Ajoute une fenêtre modale de recherche avancée à X.com (Twitter), synchronisée avec la barre de recherche et mémoire de l’état d’affichage. L’icône de recherche en haut à droite est déplaçable.
// @description:es   Agrega un modal flotante de búsqueda avanzada en X.com (Twitter), sincronizado con la caja de búsqueda y con estado persistente.
// @description:de   Fügt X.com (Twitter) ein modales Fenster für erweiterte Suche hinzu, synchronisiert mit der Suchleiste und speichert Position/Zustand. Das Suchsymbol oben rechts ist per Drag & Drop verschiebbar und bleibt gespeichert.
// @description:pt-BR Adiciona um modal de busca avançada flutuante no X.com (Twitter), sincronizado com a caixa de busca e com estado salvo. O ícone de busca no canto superior direito é arrastável com posição persistente.
// @description:ru   Добавляет модальное окно расширенного поиска на X.com (Twitter). Синхронизируется с поисковой строкой и запоминает состояние. Кнопку поиска в правом верхнем углу можно перетаскивать; её положение сохраняется.
// @namespace    https://github.com/koyasi777/x-advanced-search-userscript
// @author       koyasi777
// @match        https://x.com/*
// @match        https://twitter.com/*
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

    // 多重初期化防止
    if (window.__X_ADV_SEARCH_INITED__) return;
    window.__X_ADV_SEARCH_INITED__ = true;

    // --- 1. i18n ---
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

                // --- added for scopes ---
                labelAccountScope: "Accounts",
                optAccountAll: "All accounts",
                optAccountFollowing: "Accounts you follow",
                labelLocationScope: "Location",
                optLocationAll: "All locations",
                optLocationNearby: "Near you",
                chipFollowing: "Following",
                chipNearby: "Nearby",

                // --- search target ---
                labelSearchTarget: "Search target",
                labelHitName: "Exclude hits in display name",
                labelHitHandle: "Exclude hits in username (@handle)",
                hintSearchTarget: "Hide posts that only match in name or handle (not in body).",
                hintName: "If a keyword appears only in the display name, hide it.",
                hintHandle: "If a keyword appears only in @username, hide it. Exception: when the query explicitly uses from:/to:/@ with the same word."
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

                // --- added for scopes ---
                labelAccountScope: "アカウント",
                optAccountAll: "すべてのアカウント",
                optAccountFollowing: "フォローしているアカウント",
                labelLocationScope: "場所",
                optLocationAll: "すべての場所",
                optLocationNearby: "近くの場所",
                chipFollowing: "フォロー中",
                chipNearby: "近く",

                // --- search target ---
                labelSearchTarget: "検索対象",
                labelHitName: "表示名（名前）でのヒットは除外",
                labelHitHandle: "ユーザー名（@）でのヒットは除外",
                hintSearchTarget: "本文ではなく、名前/ユーザー名のみに一致した投稿を非表示にします。",
                hintName: "キーワードが表示名のみに含まれる場合は非表示にします。",
                hintHandle: "キーワードが @ユーザー名のみに含まれる場合は非表示にします。例外: 同じ語を from:/to:/@ で明示しているときは表示します。"
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

    // --- 2. テーマ ---
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
        applyTheme: function(modalElement) {
            if (!modalElement) return;
            const bodyBg = getComputedStyle(document.body).backgroundColor;
            let theme = 'dark';
            if (bodyBg === 'rgb(21, 32, 43)') theme = 'dim';
            else if (bodyBg === 'rgb(255, 255, 255)') theme = 'light';
            const themeColors = this.colors[theme] || this.colors.dark;
            for (const [key, value] of Object.entries(themeColors)) {
                modalElement.style.setProperty(key, value);
            }
        },
        observeChanges: function(modalElement) {
            const observer = new MutationObserver(() => this.applyTheme(modalElement));
            observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
            this.applyTheme(modalElement);
        }
    };

    // --- 3. ユーティリティ ---
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

    // --- 即時隠蔽は“見た目のみ”。状態(storage/manualOverrideOpen)は変更しない ---
    function hideUIImmediately(modal, trigger) {
        if (modal)  modal.style.display = 'none';
        if (trigger) trigger.style.display = 'none';
    }

    // === URL 変化を確実に待つユーティリティ ===
    function waitForUrlChange(oldURL, timeout = 1500) {
        return new Promise((resolve) => {
            let done = false;
            const finish = (ok) => { if (!done) { done = true; cleanup(); resolve(ok); } };
            const check = () => { if (location.href !== oldURL) finish(true); };

            const origPush = history.pushState, origReplace = history.replaceState;
            history.pushState = function(...a){ const r = origPush.apply(this, a); queueMicrotask(check); return r; };
            history.replaceState = function(...a){ const r = origReplace.apply(this, a); queueMicrotask(check); return r; };

            const onPop = () => queueMicrotask(check);
            window.addEventListener('popstate', onPop);

            const mo = new MutationObserver(check);
            mo.observe(document.body, { childList: true, subtree: true });

            const to = setTimeout(() => finish(false), timeout);

            function cleanup() {
                history.pushState = origPush;
                history.replaceState = origReplace;
                window.removeEventListener('popstate', onPop);
                mo.disconnect();
                clearTimeout(to);
            }

            check();
        });
    }

    // 簡易ID
    const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

    // --- 4. グローバル状態 ---
    let isUpdating = false;
    let manualOverrideOpen = false;
    const lastHistory = { q: null, pf: null, lf: null, ts: 0 }; // 直近記録抑制にpf/lfも含める

    const isMediaViewPath = (pathname) => /\/status\/\d+\/(?:photo|video|media)(?:\/\d+)?\/?$/.test(pathname);

    // --- 5. スタイル ---
    GM_addStyle(`
        :root { --modal-primary-color:#1d9bf0; --modal-primary-color-hover:#1a8cd8; --modal-primary-text-color:#fff; }
        #advanced-search-trigger { position:fixed; top:18px; right:20px; z-index:9999; background-color:var(--modal-primary-color); color:var(--modal-primary-text-color); border:none; border-radius:50%; width:50px; height:50px; font-size:24px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; transition:transform .2s, background-color .2s; }
        #advanced-search-trigger:hover { transform:scale(1.1); background-color:var(--modal-primary-color-hover); }
        #advanced-search-modal { position:fixed; z-index:10000; width:380px; display:none; flex-direction:column; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; background-color:var(--modal-bg, #000); color:var(--modal-text-primary, #e7e9ea); border:1px solid var(--modal-border, #333); border-radius:16px; box-shadow:0 8px 24px rgba(29,155,240,.2); transition:background-color .2s,color .2s,border-color .2s; }
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

        /* スコープ行（2カラム） */
        .adv-form-row.two-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        @media (max-width: 480px) {
            .adv-form-row.two-cols {
                grid-template-columns: 1fr;
            }
        }

        /* タブUI */
        .adv-tabs { display:flex; border-bottom:1px solid var(--modal-border,#333); padding:0 8px; gap:6px; align-items:stretch; }
        .adv-tab-btn { appearance:none; border:none; background:transparent; color:var(--modal-text-secondary,#8b98a5); padding:10px 12px; cursor:pointer; font-weight:700; border-radius:8px 8px 0 0; }
        .adv-tab-btn.active { color:var(--modal-text-primary,#e7e9ea); background-color:var(--modal-input-bg,#202327); border:1px solid var(--modal-input-border,#38444d); border-bottom:none; }
        .adv-tab-content { display:none; }
        .adv-tab-content.active { display:block; }
        #adv-tab-history, #adv-tab-saved { padding:12px 16px; }

        /* シークレットモードボタン（少し小さく） */
        .adv-secret-wrap { display:flex; align-items:center; gap:8px; }
        .adv-secret-btn { cursor:pointer; border:1px solid var(--modal-input-border,#38444d); background:var(--modal-input-bg,#202327); color:var(--modal-text-primary,#e7e9ea); padding:4px 8px; border-radius:9999px; font-weight:700; user-select:none; display:flex; align-items:center; gap:6px; font-size:12px; }
        .adv-secret-btn .dot { width:7px; height:7px; border-radius:50%; background:#777; box-shadow:0 0 0px #0000; transition:all .2s; }
        .adv-secret-btn.off { opacity:0.9; }
        .adv-secret-btn.on { background-color:var(--modal-primary-color); border-color:var(--modal-primary-color); color:var(--modal-primary-text-color); }
        .adv-secret-btn.on .dot { background:#fff; box-shadow:0 0 8px rgba(255,255,255,.9); }

        /* リスト（履歴/保存） */
        .adv-list { display:flex; flex-direction:column; gap:8px; }
        .adv-item { border:1px solid var(--modal-input-border,#38444d); background:var(--modal-input-bg,#202327); border-radius:8px; padding:8px; display:flex; gap:8px; align-items:flex-start; }
        .adv-item.dragging { opacity:.6; }
        .adv-item-handle { cursor:grab; user-select:none; padding:4px 6px; border-radius:6px; border:1px dashed var(--modal-border,#333); }
        .adv-item-main { flex:1; min-width:0; }
        .adv-item-title { font-size:14px; font-weight:700; color:var(--modal-text-primary,#e7e9ea); word-break:break-word; }
        .adv-item-sub { font-size:12px; color:var(--modal-text-secondary,#8b98a5); margin-top:2px; display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
        .adv-item-actions { display:flex; gap:6px; }
        .adv-chip { border:1px solid var(--modal-input-border,#38444d); background:transparent; color:var(--modal-text-primary,#e7e9ea); padding:4px 8px; border-radius:9999px; font-size:12px; cursor:pointer; }
        .adv-chip.danger { border-color:#8b0000; color:#ffb3b3; }
        .adv-chip.primary { background-color:var(--modal-primary-color); border-color:var(--modal-primary-color); color:var(--modal-primary-text-color); }
        /* チップ（スコープ用の小型バリアント） */
        .adv-chip.scope {
            padding: 2px 6px;
            font-size: 11px;
            line-height: 1.2;
            opacity: 0.95;
        }

        /* トースト */
        .adv-toast { position:fixed; z-index:10001; left:50%; transform:translateX(-50%); bottom:24px; background:#111a; color:#fff; backdrop-filter: blur(6px); border:1px solid #fff3; padding:8px 12px; border-radius:8px; font-weight:700; opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; }
        .adv-toast.show { opacity:1; transform:translateX(-50%) translateY(-6px); }

        /* フッターのボタン整列（保存を左に） */
        .adv-modal-footer { justify-content:flex-end; }
        .adv-modal-footer .adv-modal-button#adv-save-button { margin-right:auto; }

        /* 履歴タブツールバー */
        .adv-tab-toolbar { display:flex; justify-content:flex-end; margin-bottom:8px; }

        [data-testid="cellInnerDiv"][data-adv-hidden],
        article[data-adv-hidden] {
          display: none !important;
        }

        /* === resizable handles === */
        #advanced-search-modal { max-height: none; }
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
    `);

    // --- 6. HTML ---
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
                </div>

                <!-- 検索タブ（既存フォーム） -->
                <div class="adv-tab-content active" id="adv-tab-search">
                    <div id="adv-zoom-root">
                    <form id="advanced-search-form">
                        <div class="adv-form-group"><label for="adv-all-words" data-i18n="labelAllWords"></label><input type="text" id="adv-all-words" data-i18n-placeholder="placeholderAllWords"></div>
                        <div class="adv-form-group"><label for="adv-exact-phrase" data-i18n="labelExactPhrase"></label><input type="text" id="adv-exact-phrase" data-i18n-placeholder="placeholderExactPhrase"></div>
                        <div class="adv-form-group"><label for="adv-any-words" data-i18n="labelAnyWords"></label><input type="text" id="adv-any-words" data-i18n-placeholder="placeholderAnyWords"></div>
                        <div class="adv-form-group"><label for="adv-not-words" data-i18n="labelNotWords"></label><input type="text" id="adv-not-words" data-i18n-placeholder="placeholderNotWords"></div>
                        <div class="adv-form-group"><label for="adv-hashtag" data-i18n="labelHashtag"></label><input type="text" id="adv-hashtag" data-i18n-placeholder="placeholderHashtag"></div>
                        <div class="adv-form-group"><label for="adv-lang" data-i18n="labelLang"></label><select id="adv-lang"><option value="" data-i18n="optLangDefault"></option><option value="ja" data-i18n="optLangJa"></option><option value="en" data-i18n="optLangEn"></option></select></div>
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
                        <!-- 検索対象（表示名/ユーザー名の除外設定） -->
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

                        <!-- アカウント/場所スコープ（返信の上に配置） -->
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

                <!-- 履歴タブ（全削除ボタン付き） -->
                <div class="adv-tab-content" id="adv-tab-history">
                    <div class="adv-tab-toolbar">
                        <button id="adv-history-clear-all" class="adv-chip danger"></button>
                    </div>
                    <div id="adv-history-empty" class="adv-item-sub"></div>
                    <div id="adv-history-list" class="adv-list"></div>
                </div>

                <!-- 保存タブ -->
                <div class="adv-tab-content" id="adv-tab-saved">
                    <div id="adv-saved-empty" class="adv-item-sub"></div>
                    <div id="adv-saved-list" class="adv-list"></div>
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

    // --- 7. メイン ---
    const initialize = async () => {
        i18n.init();

        // --- KV (Tampermonkey storage) wrapper ---
        const kv = {
            get(key, def) { try { return GM_getValue(key, def); } catch (_) { return def; } },
            set(key, val) { try { GM_setValue(key, val); } catch (_) {} },
            del(key)      { try { GM_deleteValue(key); } catch (_) {} },
        };
        // JSON storage helpers（localStorage版を置き換え）
        const loadJSON = (key, def) => {
            try {
                const raw = kv.get(key, JSON.stringify(def));
                return JSON.parse(raw);
            } catch(_) { return def; }
        };
        const saveJSON = (key, value) => {
            try { kv.set(key, JSON.stringify(value)); } catch(_) {}
        };

        // トリガーボタン
        const trigger = document.createElement('button');
        trigger.id = 'advanced-search-trigger';
        trigger.type = 'button';
        trigger.innerHTML = '🔍';
        trigger.title = i18n.t('tooltipTrigger');
        trigger.setAttribute('aria-label', i18n.t('tooltipTrigger'));
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-expanded', 'false');
        document.body.appendChild(trigger);

        // モーダル
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

        // === リサイズ用ハンドル生成（HTML構造は触らず、動的に付与） ===
        ['n','e','s','w','ne','nw','se','sw'].forEach(dir => {
            const h = document.createElement('div');
            h.className = `adv-resizer ${dir}`;
            h.dataset.dir = dir;
            modal.appendChild(h);
        });

        // --- 除外チェック要素と永続化 ---
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

        themeManager.observeChanges(modal);

        // === ズーム ===
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

        // 検索ボックス
        const searchInputSelectors = [
            'div[data-testid="primaryColumn"] input[data-testid="SearchBox_Search_Input"]',
            'div[data-testid="sidebarColumn"] input[data-testid="SearchBox_Search_Input"]'
        ];
        const getActiveSearchInput = () => {
            for (const selector of searchInputSelectors) {
                const input = document.querySelector(selector);
                if (input && input.offsetParent !== null) return input;
            }
            const fallback = document.querySelector('input[data-testid="SearchBox_Search_Input"]');
            return (fallback && fallback.offsetParent !== null) ? fallback : null;
        };

        // 状態キー
        const MODAL_STATE_KEY   = 'advSearchModalState_v3.2';
        const TRIGGER_STATE_KEY = 'advSearchTriggerState_v1.0';
        const HISTORY_KEY = 'advSearchHistory_v2'; // v2: pf/lf を含む
        const SAVED_KEY   = 'advSearchSaved_v2';   // v2: pf/lf を含む
        const SECRET_KEY  = 'advSearchSecretMode_v1';

        // タブ
        const tabButtons = Array.from(document.querySelectorAll('.adv-tab-btn'));
        const tabSearch = document.getElementById('adv-tab-search');
        const tabHistory = document.getElementById('adv-tab-history');
        const tabSaved = document.getElementById('adv-tab-saved');

        // モーダル位置保存/復元
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
                            w: Math.round(rect.width), h: Math.round(rect.height) }; // w/h を保存
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

                // サイズ復元
                const minW = 300, minH = 240;
                if (s.w) modal.style.width  = `${Math.max(minW, Math.min(s.w, window.innerWidth  - 20))}px`;
                else     modal.style.width  = '380px';
                if (s.h) modal.style.height = `${Math.max(minH, Math.min(s.h, window.innerHeight - 20))}px`;
                else     modal.style.height = '';
            } catch(e) { console.error('Failed to apply modal position:', e); }
        };
        const keepModalInViewport = () => {
            if (modal.style.display === 'none') return;
            const rect = modal.getBoundingClientRect();
            const winW = window.innerWidth, winH = window.innerHeight, m = 10;

            // サイズのクランプ
            const minW = 300, minH = 240;
            const maxW = Math.max(minW, winW - 2*m);
            const maxH = Math.max(minH, winH - 2*m);
            const w = Math.min(Math.max(rect.width,  minW), maxW);
            const h = Math.min(Math.max(rect.height, minH), maxH);
            if (Math.round(w) !== Math.round(rect.width))  modal.style.width  = `${w}px`;
            if (Math.round(h) !== Math.round(rect.height)) modal.style.height = `${h}px`;

            // 位置のクランプ（サイズクランプ後の値で）
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

        // トリガー位置保存/復元
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
                    suppressClick = false; // 一度消費
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

        // --- スコープ（pf/lf）ユーティリティ ---
        const readScopesFromControls = () => ({
            pf: accountScopeSel.value === 'following',
            lf: locationScopeSel.value === 'nearby'
        });
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

        // 同期
        const STATE_SYNC = {
            parseFromSearchToModal: () => {
                if (isUpdating || modal.style.display === 'none') return;
                const si = getActiveSearchInput();
                parseQueryAndApplyToModal(si ? si.value : '');
                // URL -> pf/lf も反映
                applyScopesToControls(readScopesFromURL());
                updateSaveButtonState();
            },
            applyFromModalToSearch: () => {
                if (isUpdating) return;
                isUpdating = true;
                const finalQuery = buildQueryStringFromModal();
                const si = getActiveSearchInput();
                if (si) { si.value = finalQuery; si.dispatchEvent(new Event('input',{bubbles:true})); }
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
            if (fields.any) q.push(`(${fields.any.split(/\s+/).filter(Boolean).join(' OR ')})`);
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
            // --- 永続化した「検索対象」の除外フラグを reset 後に再適用 ---
            try {
              const st = loadExcludeFlags(); // { name:boolean, handle:boolean }
              const nameEl   = document.getElementById('adv-exclude-hit-name');
              const handleEl = document.getElementById('adv-exclude-hit-handle');
              if (nameEl)   { nameEl.checked = nameEl.defaultChecked = !!st.name; }
              if (handleEl) { handleEl.checked = handleEl.defaultChecked = !!st.handle; }
            } catch (_) {}
            let q = ` ${query} `;
            const parseAccountField = (inputId, operator) => {
                const exclOperator = `-${operator}`;
                const values = [];
                const exclRegex = new RegExp(`\\s(${exclOperator.replace(/[-:]/g,'\\$&')}[^\\s()]+)`,'g');
                [...q.matchAll(exclRegex)].forEach(m=>{ values.push(m[1].substring(exclOperator.length)); q=q.replace(m[0],' '); });
                if (values.length>0){ document.getElementById(inputId).value = values.join(' '); document.getElementById(`${inputId}-exclude`).checked=true; return; }
                const inclGroupRegex = new RegExp(`\\((${operator.replace(':','\\:')}[^)]+)\\)`,'g');
                [...q.matchAll(inclGroupRegex)].forEach(m=>{
                    m[1].split(/\s+OR\s+/).forEach(t=>values.push(t.substring(operator.length)));
                    q=q.replace(m[0],' ');
                });
                const inclSingleRegex = new RegExp(`\\s(?!-)(${operator.replace(':','\\:')}[^\\s()]+)`,'g');
                [...q.matchAll(inclSingleRegex)].forEach(m=>{ values.push(m[1].substring(operator.length)); q=q.replace(m[0],' '); });
                if (values.length>0){ document.getElementById(inputId).value=[...new Set(values)].join(' '); document.getElementById(`${inputId}-exclude`).checked=false; }
            };
            parseAccountField('adv-from-user','from:');
            parseAccountField('adv-to-user','to:');
            parseAccountField('adv-mentioning','@');

            const extract = (regex, cb) => { let m; while((m=regex.exec(q))!==null){ cb(m[1].trim()); q=q.replace(m[0],' '); regex.lastIndex=0; } };
            extract(/"([^"]+)"/g, v=>document.getElementById('adv-exact-phrase').value=v);
            extract(/lang:([^\s]+)/g, v=>document.getElementById('adv-lang').value=v);
            extract(/#([^\s]+)/g, v=>document.getElementById('adv-hashtag').value=(document.getElementById('adv-hashtag').value+' '+v).trim());
            extract(/min_replies:(\d+)/g, v=>document.getElementById('adv-min-replies').value=v);
            extract(/min_faves:(\d+)/g, v=>document.getElementById('adv-min-faves').value=v);
            extract(/min_retweets:(\d+)/g, v=>document.getElementById('adv-min-retweets').value=v);
            extract(/since:(\d{4}-\d{2}-\d{2})/g, v=>document.getElementById('adv-since').value=v);
            extract(/until:(\d{4}-\d{2}-\d{2})/g, v=>document.getElementById('adv-until').value=v);

            const filterMap = { 'is:verified':'verified', 'filter:links':'links', 'filter:images':'images', 'filter:videos':'videos' };
            Object.entries(filterMap).forEach(([op,id])=>{
                const r = new RegExp(`\\s(-?)${op.replace(':','\\:')}\\s`,'g');
                q=q.replace(r,(m,prefix)=>{ document.getElementById(`adv-filter-${id}-${prefix? 'exclude':'include'}`).checked=true; return ' '; });
            });

            if (/\sinclude:replies\s/.test(q)) { document.getElementById('adv-replies').value='include'; q=q.replace(/\sinclude:replies\s/,' '); }
            else if (/\sfilter:replies\s/.test(q)) { document.getElementById('adv-replies').value='only'; q=q.replace(/\sfilter:replies\s/,' '); }
            else if (/\s-filter:replies\s/.test(q)) { document.getElementById('adv-replies').value='exclude'; q=q.replace(/\s-filter:replies\s/,' '); }

            const orGroups = q.match(/\(([^)]+)\)/g);
            if (orGroups) {
                const anyWords = orGroups.map(g=>g.replace(/[()]/g,'').replace(/\s+OR\s+/g, ' ')).join(' ');
                document.getElementById('adv-any-words').value = anyWords.trim();
                q=q.replace(/\(([^)]+)\)/g,' ');
            }

            document.getElementById('adv-not-words').value = (q.match(/\s-\S+/g)||[]).map(w=>w.trim().substring(1)).join(' ');
            q=q.replace(/\s-\S+/g,' ');
            document.getElementById('adv-all-words').value = q.trim().split(/\s+/).filter(Boolean).join(' ');
            isUpdating=false;
        };

        const syncFromModalToSearchBox = () => {
            if (isUpdating) return; isUpdating=true;
            const finalQuery = buildQueryStringFromModal();
            const si = getActiveSearchInput();
            if (si){ si.value = finalQuery; si.dispatchEvent(new Event('input',{bubbles:true})); }
            isUpdating=false;
            updateSaveButtonState();
        };
        const syncFromSearchBoxToModal = STATE_SYNC.parseFromSearchToModal;

        // トースト
        const showToast = (msg) => {
            toastEl.textContent = msg;
            toastEl.classList.add('show');
            setTimeout(()=> toastEl.classList.remove('show'), 1500);
        };

        // シークレットモード
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

        // v1 -> v2 マイグレーション（既存データをpf/lf=falseで扱う）
        const migrateList = (list) => Array.isArray(list) ? list.map(it => ({ id:it.id||uid(), q:it.q||'', ts:it.ts||Date.now(), pf:!!it.pf, lf:!!it.lf })) : [];

        // 履歴（同一 q/pf/lf は 新規追加せず ts を更新して先頭へ）
        const recordHistory = (q, pf, lf) => {
            if (!q || loadSecret()) return;
            const now = Date.now();
            // ★ 2秒→3秒に拡大して二重記録抑制
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
                if (list.length > 50) list.length = 50;
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

        // 保存（q+pf+lf 単位で一意）
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

        // 現在の q/pf/lf が保存済みかをチェックして保存ボタンの状態を更新
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
            [tabSearch, tabHistory, tabSaved].forEach((el) => el.classList.toggle('active', el.id === `adv-tab-${name}`));
            // 検索タブのときのみフッター表示
            footerEl.style.display = (name === 'search') ? '' : 'none';
            if (name === 'history') renderHistory();
            if (name === 'saved') renderSaved();
            if (name === 'search') updateSaveButtonState();
        };
        tabButtons.forEach(btn => btn.addEventListener('click', (e)=> { e.preventDefault(); activateTab(btn.dataset.tab); }));

        const scopeChipsHTML = (pf, lf) => {
            const chips = [];
            if (pf) chips.push(`<span class="adv-chip scope" role="note">${i18n.t('chipFollowing')}</span>`);
            if (lf) chips.push(`<span class="adv-chip scope" role="note">${i18n.t('chipNearby')}</span>`);
            return chips.join('');
        };

        // 履歴レンダリング
        const historyEmptyEl = document.getElementById('adv-history-empty');
        const historyListEl = document.getElementById('adv-history-list');
        const renderHistory = () => {
            const list = migrateList(loadJSON(HISTORY_KEY, []));
            historyListEl.innerHTML = '';
            historyEmptyEl.textContent = list.length ? '' : i18n.t('emptyHistory');
            list.forEach(item => {
                const row = document.createElement('div');
                row.className = 'adv-item';
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
                row.querySelector('[data-action="run"]').addEventListener('click', ()=>{
                    parseQueryAndApplyToModal(item.q);
                    applyScopesToControls({pf:!!item.pf, lf:!!item.lf});
                    activateTab('search');
                    executeSearch({pf:item.pf, lf:item.lf});
                });
                row.querySelector('[data-action="delete"]').addEventListener('click', ()=> deleteHistory(item.id));
                historyListEl.appendChild(row);
            });
        };
        historyClearAllBtn.addEventListener('click', clearAllHistory);

        // 保存レンダリング（ドラッグ並べ替え維持）
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

        // --- クエリ解析とツイート可視性判定 ---
        function parseSearchTokens(queryOrURL) {
            let q = '';
            try {
                if (queryOrURL) q = String(queryOrURL);
                else {
                    const u = new URL(location.href);
                    q = u.searchParams.get('q') || '';
                }
            } catch(_) {}

            if (!q) {
                const si = getActiveSearchInput?.();
                if (si?.value) q = si.value;
            }
            if (!q) q = buildQueryStringFromModal?.() || '';

            q = ' ' + q + ' ';

            const NEG = [];
            (q.match(/\s-\S+/g) || []).forEach(w => NEG.push(w.trim().slice(1)));

            const phrases = [];
            q = q.replace(/"([^"]+)"/g, (m, p1) => { phrases.push(p1.trim()); return ' '; });

            const hashtags = [];
            q = q.replace(/\s#([^\s)]+)/g, (m, p1) => { hashtags.push(p1); return ' '; });

            const opUsers = new Set();
            q.replace(/\s(?:from:|to:|@)([^\s()]+)/g, (m, user) => { if (!m.startsWith(' -')) opUsers.add(user.toLowerCase()); return m; });

            q = q
              .replace(/\s(?:lang|min_replies|min_faves|min_retweets|since|until):[^\s]+/g, ' ')
              .replace(/\s(?:is:verified|filter:(?:links|images|videos|replies)|include:replies|-filter:replies)\b/g, ' ')
              .replace(/\s(?:from:|to:|@)[^\s()]+/g, ' ');

            const words = q.split(/\s+/).map(s=>s.trim()).filter(Boolean);

            const includeTerms = new Set(
                [...phrases, ...hashtags, ...words]
                  .map(s=>s.toLowerCase())
                  .filter(s=>s && !NEG.includes(s))
            );

            return { includeTerms, opUsers };
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
              // pickTweetFields 内
              // ツイート本文外の @ハンドルリンクをすべて拾う（返信先含む）
              // 例: 「返信先: @wing_cornix」などは tweetText の外にあることが多い
              const replyHandles = Array.from(
                article.querySelectorAll('a[href^="/"]')
              )
                .filter(a => {
                  const txt = (a.textContent || '').trim();
                  if (!txt.startsWith('@')) return false;
                  // 本文中の@は除外（本文ヒットは除外対象ではないので）
                  return !a.closest('[data-testid="tweetText"]');
                })
                .map(a => (a.textContent || '').trim())
                .filter(Boolean);
            return { body, disp, handle, replyHandles };
        }

        // article から対応する cellInnerDiv を取る
        function getTweetCell(article) {
          return article.closest('[data-testid="cellInnerDiv"]') || article;
        }

        function shouldHideTweetByNameHandle(article, flags, tokens) {
            const { includeTerms, opUsers } = tokens;
            if (includeTerms.size === 0) return false;

            const { body, disp, handle, replyHandles } = pickTweetFields(article);

            const textBody = (body || '').toLowerCase();
            const textName = (disp || '').toLowerCase();

            const allHandles = new Set(
                [handle, ...replyHandles]
                  .map(s => String(s||'').replace(/^@/, '').toLowerCase())
                  .filter(Boolean)
            );

            for (const term of includeTerms) {
                if (term && textBody.includes(term)) return false;
            }

            if (flags.name) {
                for (const term of includeTerms) {
                    if (term && textName.includes(term)) {
                        return true;
                    }
                }
            }

            if (flags.handle) {
                for (const term of includeTerms) {
                    const t = term.replace(/^@/, '').toLowerCase();
                    if (!t) continue;
                    if (opUsers.has(t)) continue;
                    // 完全一致 or 部分一致
                    if ([...allHandles].some(h => h === t || h.includes(t))) return true;
                }
            }

            return false;
        }

        function scanAndFilterTweets() {
          try {
            const flags = {
              name:   document.getElementById('adv-exclude-hit-name')?.checked ?? true,
              handle: document.getElementById('adv-exclude-hit-handle')?.checked ?? true,
            };
            if (!flags.name && !flags.handle) return;

            const tokens = parseSearchTokens();
            const list = document.querySelectorAll('article[data-testid="tweet"]');

            for (const art of list) {
              const cell = getTweetCell(art);
              const hide = shouldHideTweetByNameHandle(art, flags, tokens);

              if (hide) {
                cell.setAttribute('data-adv-hidden', 'name_handle_only');
              } else {
                cell.removeAttribute('data-adv-hidden');
              }
            }

            // （任意）隣接の区切り線セルも掃除
            cleanupAdjacentSeparators();
          } catch (e) {
            console.error('scanAndFilterTweets failed', e);
          }
        }

        // --- 検索実行 ---
        const executeSearch = async (scopesOverride) => {
            const finalQuery = buildQueryStringFromModal().trim();
            if (!finalQuery) return;
            const scopes = scopesOverride || readScopesFromControls();
            const params = new URLSearchParams({ q: finalQuery, src: 'typed_query' });
            if (scopes.pf) params.set('pf','on');
            if (scopes.lf) params.set('lf','on');

            const si = getActiveSearchInput();
            const before = location.href;

            if (si) {
                si.value = finalQuery;
                try {
                    si.dispatchEvent(new InputEvent('input', { bubbles:true, cancelable:true, inputType:'insertReplacementText', data:finalQuery }));
                } catch {
                    si.dispatchEvent(new Event('input', { bubbles:true }));
                }

                const ev = { key:'Enter', code:'Enter', keyCode:13, which:13, bubbles:true, cancelable:true };
                si.dispatchEvent(new KeyboardEvent('keydown', ev));
                si.dispatchEvent(new KeyboardEvent('keyup', ev));

                const formEl = si.closest('form');
                if (formEl?.requestSubmit) { try { formEl.requestSubmit(); } catch(_) {} }

                const didSpa = await waitForUrlChange(before, 1500);

                if (didSpa) {
                    try {
                        const u = new URL(location.href);
                        scopes.pf ? u.searchParams.set('pf','on') : u.searchParams.delete('pf');
                        scopes.lf ? u.searchParams.set('lf','on') : u.searchParams.delete('lf');
                        const next = u.toString();
                        if (next && next !== location.href) {
                            try { history.replaceState(history.state, '', next); } catch {}
                        }
                    } catch {}
                    recordHistory(finalQuery, scopes.pf, scopes.lf);
                    try { si.blur(); } catch {}
                    return;
                }
            }

            recordHistory(finalQuery, scopes.pf, scopes.lf);
            window.location.href = `https://x.com/search?${params.toString()}`;
        };

        // --- スコープ変更時は即URLへ反映＆実行 ---
        const onScopeChange = () => {
            const q = (()=> {
                const si = getActiveSearchInput();
                if (si && si.value && si.value.trim()) return si.value.trim();
                return buildQueryStringFromModal().trim();
            })();
            const { pf, lf } = readScopesFromControls();
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            params.set('src','typed_query');
            if (pf) params.set('pf','on');
            if (lf) params.set('lf','on');
            recordHistory(q, pf, lf);
            window.location.href = `https://x.com/search?${params.toString()}`;
        };
        accountScopeSel.addEventListener('change', onScopeChange);
        locationScopeSel.addEventListener('change', onScopeChange);

        // モーダルドラッグ（そのまま）
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

        // === モーダルの8方向リサイズ ===
        const setupModalResize = () => {
            const MIN_W = 300, MIN_H = 240;
            const MARGIN = 10;
            let resizing = null; // {dir, startX, startY, startLeft, startTop, startW, startH}

            const onPointerDown = (e) => {
                const h = e.target.closest('.adv-resizer');
                if (!h) return;
                e.preventDefault();
                const dir = h.dataset.dir;
                const r = modal.getBoundingClientRect();

                // left/top で絶対配置に正規化
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

                // 横方向
                if (dir.includes('e')) newW = resizing.startW + dx;
                if (dir.includes('w')) { newW = resizing.startW - dx; newLeft = resizing.startLeft + dx; }

                // 縦方向
                if (dir.includes('s')) newH = resizing.startH + dy;
                if (dir.includes('n')) { newH = resizing.startH - dy; newTop = resizing.startTop + dy; }

                // ビューポート制約
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
                saveModalRelativeState(); // 新しい位置とサイズを保存
            };

            modal.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup',   onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        // UI調停（そのまま＋pf/lfのフォーム反映を追加）
        const reconcileUI = () => {
            const stored = (()=>{ try { return JSON.parse(kv.get(MODAL_STATE_KEY,'{}')); } catch{ return {}; } })();
            const desiredVisible = !!stored.visible;
            const media = isMediaViewPath(location.pathname);

            if (media) {
                trigger.style.display = 'none';
            } else {
                trigger.style.display = '';
                applyTriggerStoredPosition();
                requestAnimationFrame(keepTriggerInViewport);
            }

            const shouldShow = (!media) && (desiredVisible || manualOverrideOpen);
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

        // 開閉
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

        // 既存の検索実行リスナは触らず追加でフック（非同期で再評価）
        applyButton.addEventListener('click', () => executeSearch());
        applyButton.addEventListener('click', () => { setTimeout(scanAndFilterTweets, 800); });

        // 保存（q+pf+lf）
        saveButton.addEventListener('click', () => {
            const q = buildQueryStringFromModal().trim();
            if (!q) return;
            const {pf, lf} = readScopesFromControls();
            addSaved(q, pf, lf);
            activateTab('saved'); // 保存後、保存タブへ
        });

        form.addEventListener('input', syncFromModalToSearchBox);
        // 既存を変えずに追加でフィルタを走らせる
        form.addEventListener('input', scanAndFilterTweets);
        form.addEventListener('keydown', e => {
            if (e.key === 'Enter' && (e.target.matches('input[type="text"], input[type="number"]'))) {
                e.preventDefault();
                executeSearch();
            }
        });

        // === SPA遷移フック & 直接検索の履歴記録（pf/lf対応） ===
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
                            if (u.origin === location.origin && isMediaViewPath(u.pathname)) {
                                hideUIImmediately(document.getElementById('advanced-search-modal'),
                                                  document.getElementById('advanced-search-trigger'));
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
                        if (sameTab && isMediaViewPath(u.pathname)) {
                            hideUIImmediately(document.getElementById('advanced-search-modal'),
                                              document.getElementById('advanced-search-trigger'));
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
                        input.addEventListener('input', () => { if (input === getActiveSearchInput()) { syncFromSearchBoxToModal(); } });
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
                // DOM変化（ツイート流入）時は都度フィルタ適用
                scanAndFilterTweets();
            });
            observer.observe(document.body, { childList:true, subtree:true });

            installNavigationHooks(() => {
                // ルート変更時
                manualOverrideOpen = false;
                reconcileUI();
                syncFromSearchBoxToModal();
                applyScopesToControls(readScopesFromURL());
                updateSaveButtonState();
                // ルート変更後に再評価
                scanAndFilterTweets();
            });
        };

        window.addEventListener('resize', debounce(()=>{
            if (modal.style.display === 'flex') { applyModalStoredPosition(); requestAnimationFrame(keepModalInViewport); }
            if (trigger.style.display !== 'none') { applyTriggerStoredPosition(); requestAnimationFrame(keepTriggerInViewport); }
        }, 100));

        // 初期処理
        loadModalState();
        reconcileUI();
        setupModalDrag();
        setupModalResize(); // リサイズ有効化
        setupObservers();

        renderHistory();
        renderSaved();
        activateTab('search'); // 初期は検索タブ

        (async () => {
            const input = await waitForElement(searchInputSelectors.join(','), 7000);
            if (input) {
                syncFromSearchBoxToModal();
                applyScopesToControls(readScopesFromURL());
                updateSaveButtonState();
                // 初期同期後に一度フィルタ実行
                scanAndFilterTweets();
            }
        })();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
