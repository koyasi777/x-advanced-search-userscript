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
// @version      3.6.5
// @description      Adds a floating modal for advanced search on X.com (Twitter). Syncs with search box and remembers position/display state. The top-right search icon is now draggable and its position persists.
// @description:ja   X.com（Twitter）に高度な検索機能を呼び出せるフローティング・モーダルを追加します。検索ボックスと双方向で同期し、位置や表示状態も記憶します。右上の検索アイコンはドラッグで移動でき、位置は保存されます。
// @description:en   Adds a floating modal for advanced search on X.com (formerly Twitter). Syncs with search box and remembers position/display state. The top-right search icon is draggable with persistent position.
// @description:zh-CN 为X.com（Twitter）添加高级搜索浮动模态框，支持与搜索框双向同步并记住位置与显示状态。右上角的搜索图标可拖动，并会记住位置。
// @description:zh-TW 為 X.com（Twitter）增加高級搜尋模態框，支援與搜尋框雙向同步並記住位置與顯示狀態。右上角搜尋圖示可拖曳，位置會被保存。
// @description:ko   X.com(Twitter)에 고급 검색 모달을 추가합니다. 검색창과 양방향 동기화하며 위치와 표시 상태를 기억합니다. 우상단 검색 아이콘은 드래그 이동 및 위치 저장이 가능합니다。
// @description:fr   Ajoute une fenêtre modale de recherche avancée à X.com (Twitter), synchronisée avec la barre de recherche et mémoire de l’état d’affichage. L’icône de recherche en haut à droite est déplaçable et sa position persiste.
// @description:es   Agrega un modal flotante de búsqueda avanzada en X.com (Twitter), sincronizado con la caja de búsqueda y con estado persistente. El ícono de búsqueda arriba a la derecha es arrastrable con posición persistente.
// @description:de   Fügt X.com (Twitter) ein modales Fenster für erweiterte Suche hinzu, synchronisiert mit der Suchleiste und speichert Position/Zustand. Das Suchsymbol oben rechts ist per Drag & Drop verschiebbar und bleibt gespeichert.
// @description:pt-BR Adiciona um modal de busca avançada flutuante no X.com (Twitter), sincronizado com a caixa de busca y com estado salvo. O ícone de busca no canto superior direito é arrastável com posição persistente.
// @description:ru   Добавляет модальное окно расширенного поиска на X.com (Twitter). Синхронизируется с поисковой строкой и запоминает состояние. Кнопку поиска в правом верхнем углу можно перетаскивать; её положение сохраняется.
// @namespace    https://github.com/koyasi777/x-advanced-search-userscript
// @author       koyasi777
// @match        https://x.com/*
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        GM_addStyle
// @license      MIT
// @homepageURL  https://github.com/koyasi777/x-advanced-search-userscript
// @supportURL   https://github.com/koyasi777/x-advanced-search-userscript/issues
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. i18n ---
    const i18n = {
        translations: {
            'en': { modalTitle: "Advanced Search", tooltipClose: "Close", labelAllWords: "All of these words", placeholderAllWords: "e.g., AI news", labelExactPhrase: "This exact phrase", placeholderExactPhrase: 'e.g., "ChatGPT 4o"', labelAnyWords: "Any of these words (OR)", placeholderAnyWords: "e.g., iPhone Android", labelNotWords: "None of these words (-)", placeholderNotWords: "e.g., -sale -ads", labelHashtag: "Hashtags (#)", placeholderHashtag: "e.g., #TechEvent", labelLang: "Language (lang:)", optLangDefault: "Any language", optLangJa: "Japanese (ja)", optLangEn: "English (en)", hrSeparator: " ", labelFilters: "Filters", labelVerified: "Verified accounts", labelLinks: "Links", labelImages: "Images", labelVideos: "Videos", checkInclude: "Include", checkExclude: "Exclude", labelReplies: "Replies", optRepliesDefault: "Default (Show all)", optRepliesInclude: "Include replies", optRepliesOnly: "Replies only", optRepliesExclude: "Exclude replies", labelEngagement: "Engagement", placeholderMinReplies: "Min replies", placeholderMinLikes: "Min likes", placeholderMinRetweets: "Min retweets", labelDateRange: "Date range", tooltipSince: "From this date", tooltipUntil: "Until this date", labelFromUser: "From these accounts (from:)", placeholderFromUser: "e.g., @X", labelToUser: "To these accounts (to:)", placeholderToUser: "e.g., @google", labelMentioning: "Mentioning these accounts (@)", placeholderMentioning: "e.g., @OpenAI", buttonClear: "Clear", buttonApply: "Search", tooltipTrigger: "Open Advanced Search" },
            'ja': { modalTitle: "高度な検索", tooltipClose: "閉じる", labelAllWords: "すべての語句を含む", placeholderAllWords: "例: AI ニュース", labelExactPhrase: "この語句を完全に含む", placeholderExactPhrase: '例: "ChatGPT 4o"', labelAnyWords: "いずれかの語句を含む (OR)", placeholderAnyWords: "例: iPhone Android", labelNotWords: "含まない語句 (-)", placeholderNotWords: "例: -セール -広告", labelHashtag: "ハッシュタグ (#)", placeholderHashtag: "例: #技術書典", labelLang: "言語 (lang:)", optLangDefault: "指定しない", optLangJa: "日本語 (ja)", optLangEn: "英語 (en)", hrSeparator: " ", labelFilters: "フィルター", labelVerified: "認証済みアカウント", labelLinks: "リンク", labelImages: "画像", labelVideos: "動画", checkInclude: "含む", checkExclude: "含まない", labelReplies: "返信", optRepliesDefault: "指定しない", optRepliesInclude: "返信を含める", optRepliesOnly: "返信のみ", optRepliesExclude: "返信を除外", labelEngagement: "エンゲージメント", placeholderMinReplies: "最小返信数", placeholderMinLikes: "最小いいね数", placeholderMinRetweets: "最小リポスト数", labelDateRange: "期間指定", tooltipSince: "この日以降", tooltipUntil: "この日以前", labelFromUser: "このアカウントから (from:)", placeholderFromUser: "例: @X", labelToUser: "このアカウントへ (to:)", placeholderToUser: "例: @google", labelMentioning: "このアカウントへのメンション (@)", placeholderMentioning: "例: @OpenAI", buttonClear: "クリア", buttonApply: "検索実行", tooltipTrigger: "高度な検索を開く" },
            'zh-CN': { modalTitle: "高级搜索", tooltipClose: "关闭", labelAllWords: "包含所有这些词语", placeholderAllWords: "例如：AI 新闻", labelExactPhrase: "包含此完整短语", placeholderExactPhrase: "例如：\"ChatGPT 4o\"", labelAnyWords: "包含这些词语中的任何一个 (OR)", placeholderAnyWords: "例如：iPhone Android", labelNotWords: "不包含这些词语 (-)", placeholderNotWords: "例如：-促销 -广告", labelHashtag: "话题标签 (#)", placeholderHashtag: "例如：#技术活动", labelLang: "语言 (lang:)", optLangDefault: "任何语言", optLangJa: "日语 (ja)", optLangEn: "英语 (en)", labelFilters: "筛选", labelVerified: "认证账户", labelLinks: "链接", labelImages: "图片", labelVideos: "视频", checkInclude: "包括", checkExclude: "排除", labelReplies: "回复", optRepliesDefault: "默认 (显示全部)", optRepliesInclude: "包括回复", optRepliesOnly: "仅回复", optRepliesExclude: "排除回复", labelEngagement: "互动", placeholderMinReplies: "最少回复", placeholderMinLikes: "最少喜欢", placeholderMinRetweets: "最少转推", labelDateRange: "日期范围", tooltipSince: "从此日期", tooltipUntil: "至此日期", labelFromUser: "来自这些账户 (from:)", placeholderFromUser: "例如：@X", labelToUser: "发往这些账户 (to:)", placeholderToUser: "例如：@google", labelMentioning: "提及这些账户 (@)", placeholderMentioning: "例如：@OpenAI", buttonClear: "清除", buttonApply: "搜索", tooltipTrigger: "打开高级搜索" },
            'ko': { modalTitle: "고급 검색", tooltipClose: "닫기", labelAllWords: "다음 단어 모두 포함", placeholderAllWords: "예: AI 뉴스", labelExactPhrase: "정확히 일치하는 문구", placeholderExactPhrase: "예: \"ChatGPT 4o\"", labelAnyWords: "다음 단어 중 하나라도 포함 (OR)", placeholderAnyWords: "예: iPhone Android", labelNotWords: "다음 단어 제외 (-)", placeholderNotWords: "예: -세일 -광고", labelHashtag: "해시태그 (#)", placeholderHashtag: "예: #기술이벤트", labelLang: "언어 (lang:)", optLangDefault: "모든 언어", optLangJa: "일본어 (ja)", optLangEn: "영어 (en)", labelFilters: "필터", labelVerified: "인증된 계정", labelLinks: "링크", labelImages: "이미지", labelVideos: "동영상", checkInclude: "포함", checkExclude: "제외", labelReplies: "답글", optRepliesDefault: "기본 (모두 표시)", optRepliesInclude: "답글 포함", optRepliesOnly: "답글만", optRepliesExclude: "답글 제외", labelEngagement: "참여", placeholderMinReplies: "최소 답글 수", placeholderMinLikes: "최소 좋아요 수", placeholderMinRetweets: "최소 리트윗 수", labelDateRange: "날짜 범위", tooltipSince: "이 날짜부터", tooltipUntil: "이 날짜까지", labelFromUser: "이 계정에서 보낸 트윗 (from:)", placeholderFromUser: "예: @X", labelToUser: "이 계정으로 보낸 트윗 (to:)", placeholderToUser: "예: @google", labelMentioning: "이 계정을 맨션 (@)", placeholderMentioning: "예: @OpenAI", buttonClear: "지우기", buttonApply: "검색", tooltipTrigger: "고급 검색 열기" }
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

    // waitForElement
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
        // ここで localStorage の visible や manualOverrideOpen は触らない
    }

    // --- 4. グローバル状態 ---
    let isUpdating = false;
    let manualOverrideOpen = false; // 非メディアURLで手動開きを維持する用

    // メディアURL判定: /status/123...(photo|video|media)/?
    const isMediaViewPath = (pathname) => /\/status\/\d+\/(?:photo|video|media)(?:\/\d+)?\/?$/.test(pathname);

    // --- 5. スタイル ---
    GM_addStyle(`
        :root { --modal-primary-color:#1d9bf0; --modal-primary-color-hover:#1a8cd8; --modal-primary-text-color:#fff; }
        #advanced-search-trigger { position:fixed; top:18px; right:20px; z-index:9999; background-color:var(--modal-primary-color); color:var(--modal-primary-text-color); border:none; border-radius:50%; width:50px; height:50px; font-size:24px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; transition:transform .2s, background-color .2s; }
        #advanced-search-trigger:hover { transform:scale(1.1); background-color:var(--modal-primary-color-hover); }
        #advanced-search-modal { position:fixed; z-index:10000; width:380px; max-height:80vh; display:none; flex-direction:column; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; background-color:var(--modal-bg, #000); color:var(--modal-text-primary, #e7e9ea); border:1px solid var(--modal-border, #333); border-radius:16px; box-shadow:0 8px 24px rgba(29,155,240,.2); transition:background-color .2s,color .2s,border-color .2s; }
        .adv-modal-header{padding:12px 16px;border-bottom:1px solid var(--modal-border,#333);cursor:move;display:flex;justify-content:space-between;align-items:center}
        .adv-modal-header h2{margin:0;font-size:18px;font-weight:700}
        .adv-modal-close{background:0 0;border:none;color:var(--modal-close-color,#e7e9ea);font-size:24px;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background-color .2s}
        .adv-modal-close:hover{background-color:var(--modal-close-hover-bg,rgba(231,233,234,.1))}
        .adv-modal-body{flex:1;overflow-y:auto;padding:16px}
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
        .adv-modal-body::-webkit-scrollbar{width:8px}
        .adv-modal-body::-webkit-scrollbar-track{background:var(--modal-scrollbar-track,#202327)}
        .adv-modal-body::-webkit-scrollbar-thumb{background:var(--modal-scrollbar-thumb,#536471);border-radius:4px}
        body.adv-dragging{user-select:none}
        .adv-account-label-group{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .adv-exclude-toggle{display:flex;align-items:center}
        .adv-exclude-toggle input{margin-right:4px}
        .adv-exclude-toggle label{font-size:13px;font-weight:normal;color:var(--modal-text-secondary,#8b98a5);cursor:pointer}
        hr.adv-separator{border:none;height:1px;background-color:var(--hr-color,#333);margin:20px 0;transition:background-color .2s}
    `);

    // --- 6. HTML ---
    const modalHTML = `
        <div id="advanced-search-modal">
            <div class="adv-modal-header">
                <h2 data-i18n="modalTitle"></h2>
                <button class="adv-modal-close" data-i18n-title="tooltipClose">&times;</button>
            </div>
            <div class="adv-modal-body">
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
            <div class="adv-modal-footer">
                <button id="adv-clear-button" class="adv-modal-button" data-i18n="buttonClear"></button>
                <button id="adv-apply-button" class="adv-modal-button primary" data-i18n="buttonApply"></button>
            </div>
        </div>
    `;

    // --- 7. メイン ---
    const initialize = async () => {
        i18n.init();

        // トリガーボタン
        const trigger = document.createElement('button');
        trigger.id = 'advanced-search-trigger';
        trigger.innerHTML = '🔍';
        trigger.title = i18n.t('tooltipTrigger');
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

        themeManager.observeChanges(modal);

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

        // モーダル位置保存（手動操作時のみ呼ぶ）
        const saveModalRelativeState = () => {
            if (modal.style.display === 'none') {
                try {
                    const current = JSON.parse(localStorage.getItem(MODAL_STATE_KEY) || '{}');
                    current.visible = false;
                    localStorage.setItem(MODAL_STATE_KEY, JSON.stringify(current));
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
            const state = { h_anchor, h_value, v_anchor, v_value, visible: true };
            localStorage.setItem(MODAL_STATE_KEY, JSON.stringify(state));
        };
        const applyModalStoredPosition = () => {
            try {
                const s = JSON.parse(localStorage.getItem(MODAL_STATE_KEY) || '{}');
                const h_anchor = s.h_anchor || 'right';
                const h_value  = s.h_value ?? 20;
                const v_anchor = s.v_anchor || 'top';
                const v_value  = s.v_value ?? 80;
                modal.style.left = modal.style.right = modal.style.top = modal.style.bottom = 'auto';
                if (h_anchor === 'right') modal.style.right = `${h_value}px`; else modal.style.left = `${h_value}px`;
                if (v_anchor === 'bottom') modal.style.bottom = `${v_value}px`; else modal.style.top = `${v_value}px`;
            } catch(e) { console.error('Failed to apply modal position:', e); }
        };
        const keepModalInViewport = () => {
            if (modal.style.display === 'none') return;
            const rect = modal.getBoundingClientRect();
            const winW = window.innerWidth, winH = window.innerHeight, m = 10;
            let x = rect.left, y = rect.top;
            if (x < m) x = m; if (y < m) y = m;
            if (x + rect.width > winW - m) x = winW - rect.width - m;
            if (y + rect.height > winH - m) y = winH - rect.height - m;
            if (Math.round(x) !== Math.round(rect.left) || Math.round(y) !== Math.round(rect.top)) {
                modal.style.left = `${x}px`; modal.style.top = `${y}px`;
                modal.style.right = 'auto'; modal.style.bottom = 'auto';
            }
        };
        const loadModalState = () => {
            try { applyModalStoredPosition(); } catch(e) {
                console.error('Failed to load modal state:', e);
                localStorage.removeItem(MODAL_STATE_KEY);
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
            localStorage.setItem(TRIGGER_STATE_KEY, JSON.stringify(state));
        };
        const applyTriggerStoredPosition = () => {
            try {
                const s = JSON.parse(localStorage.getItem(TRIGGER_STATE_KEY) || '{}');
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
            trigger.addEventListener('click', (e)=>{ if(suppressClick){ e.preventDefault(); e.stopPropagation(); }}, true);
            trigger.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        // 初期トリガー位置
        applyTriggerStoredPosition();
        requestAnimationFrame(keepTriggerInViewport);
        setupTriggerDrag();

        // ===== 検索ボックス同期 =====
        const STATE_SYNC = {
            parseFromSearchToModal: () => {
                if (isUpdating || modal.style.display === 'none') return;
                const si = getActiveSearchInput();
                parseQueryAndApplyToModal(si ? si.value : '');
            },
            applyFromModalToSearch: () => {
                if (isUpdating) return;
                isUpdating = true;
                const finalQuery = buildQueryStringFromModal();
                const si = getActiveSearchInput();
                if (si) { si.value = finalQuery; si.dispatchEvent(new Event('input',{bubbles:true})); }
                isUpdating = false;
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
            form.reset();
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
                const anyWords = orGroups.map(g=>g.replace(/[()]/g,'').replace(/\s+OR\s+/g,' ')).join(' ');
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
        };
        const syncFromSearchBoxToModal = STATE_SYNC.parseFromSearchToModal;

        const executeSearch = () => {
            const finalQuery = buildQueryStringFromModal().trim();
            if (!finalQuery) return;
            const si = getActiveSearchInput();
            const oldURL = location.href;
            if (si) {
                si.value = finalQuery; si.dispatchEvent(new Event('input',{bubbles:true}));
                const parentForm = si.closest('form');
                if (parentForm && typeof parentForm.requestSubmit === 'function') {
                    parentForm.requestSubmit();
                    setTimeout(()=>{ if(location.href===oldURL){ window.location.href=`https://x.com/search?q=${encodeURIComponent(finalQuery)}&src=typed_query`; }}, 300);
                    return;
                }
            }
            window.location.href = `https://x.com/search?q=${encodeURIComponent(finalQuery)}&src=typed_query`;
        };

        // モーダルドラッグ
        const setupModalDrag = () => {
            const header = modal.querySelector('.adv-modal-header');
            let dragging=false, offset={x:0,y:0};
            header.addEventListener('mousedown', e=>{
                if (e.target.matches('button,a')) return;
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

        // ===== UI一元調停（モーダル＋トリガー） =====
        const reconcileUI = () => {
            const stored = (()=>{ try { return JSON.parse(localStorage.getItem(MODAL_STATE_KEY)||'{}'); } catch{ return {}; } })();
            const desiredVisible = !!stored.visible;
            const media = isMediaViewPath(location.pathname);

            // 1) トリガー可視性
            if (media) {
                trigger.style.display = 'none';
            } else {
                trigger.style.display = ''; // CSSの display:flex を有効化
                applyTriggerStoredPosition();
                requestAnimationFrame(keepTriggerInViewport);
            }

            // 2) モーダル可視性
            const shouldShow = (!media) && (desiredVisible || manualOverrideOpen);
            const wasShown = (modal.style.display === 'flex');
            modal.style.display = shouldShow ? 'flex' : 'none';
            if (shouldShow) {
                applyModalStoredPosition();
                requestAnimationFrame(keepModalInViewport);
                // 非表示→表示の遷移時に同期
                if (!wasShown) syncFromSearchBoxToModal();
            }
        };

        // クリックで開閉
        trigger.addEventListener('click', () => {
            if (trigger.style.display === 'none') return;
            const isVisibleNow = modal.style.display === 'flex';
            if (isVisibleNow) {
                manualOverrideOpen = false;
                modal.style.display = 'none';
                saveModalRelativeState(); // 手動閉じ＝保存 visible=false
            } else {
                manualOverrideOpen = true;
                modal.style.display = 'flex';
                // 開いた瞬間にハイドレート
                syncFromSearchBoxToModal();
                applyModalStoredPosition();
                requestAnimationFrame(keepModalInViewport);
                saveModalRelativeState(); // 手動開き＝保存 visible=true
            }
        });

        closeButton.addEventListener('click', () => {
            manualOverrideOpen = false;
            modal.style.display = 'none';
            saveModalRelativeState();
        });

        clearButton.addEventListener('click', () => { form.reset(); syncFromModalToSearchBox(); });
        applyButton.addEventListener('click', executeSearch);
        form.addEventListener('input', syncFromModalToSearchBox);
        form.addEventListener('keydown', e => {
            if (e.key === 'Enter' && (e.target.matches('input[type="text"], input[type="number"]'))) {
                e.preventDefault();
                executeSearch();
            }
        });

        // --- SPA遷移フック ---
        const installNavigationHooks = (onRouteChange) => {
            let lastHref = location.href;
            // NEW: 体感レスポンス改善（120-150ms → 60ms）
            const _debounce = (fn, wait=60) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; };
            const fireIfChanged = _debounce(() => {
                const now = location.href;
                if (now !== lastHref) { lastHref = now; onRouteChange(); }
            }, 60);

            const wrapHistory = (m) => {
                const orig = history[m];
                history[m] = function(...args){
                    // NEW: pushState/replaceState の第3引数（URL）がメディアなら先に隠す
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
                        // NEW: 事前非表示（同一タブ遷移のみ。新規タブ/新規ウィンドウは除外）
                        const sameTab = !(e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || e.button === 1);
                        if (sameTab && isMediaViewPath(u.pathname)) {
                            hideUIImmediately(document.getElementById('advanced-search-modal'),
                                              document.getElementById('advanced-search-trigger'));
                        }
                        // 既存の SPA 変更検知はゼロ遅延でスケジュール
                        setTimeout(fireIfChanged, 0);
                    }
                } catch(_) {}
            }, true);

            const mo = new MutationObserver(fireIfChanged);
            mo.observe(document.documentElement, { childList:true, subtree:true });
            // NEW: 最悪待ち時間の短縮（1500ms → 300ms）
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
                    }
                });
            });
            observer.observe(document.body, { childList:true, subtree:true });

            installNavigationHooks(() => {
                console.log('[X Adv Search] Route changed, re-syncing...');
                manualOverrideOpen = false;   // ルート遷移時は手動オーバーライド解除
                reconcileUI();                // トリガー＆モーダルの表示を再評価
                syncFromSearchBoxToModal();   // 検索窓→モーダル同期（表示時は反映、非表示時は後述の reconcileUI で可視化時に同期）
            });
        };

        // リサイズ
        window.addEventListener('resize', debounce(()=>{
            if (modal.style.display === 'flex') { applyModalStoredPosition(); requestAnimationFrame(keepModalInViewport); }
            if (trigger.style.display !== 'none') { applyTriggerStoredPosition(); requestAnimationFrame(keepTriggerInViewport); }
        }, 100));

        // 初期処理
        loadModalState();
        reconcileUI();     // 初回にトリガー＆モーダル表示を決定（メディアURLなら両方隠す）
        setupModalDrag();
        setupObservers();

        (async () => {
            const input = await waitForElement(searchInputSelectors.join(','), 7000);
            if (input) syncFromSearchBoxToModal();
        })();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
