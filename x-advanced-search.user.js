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
// @version      2.1.0
// @description      Adds a floating modal for advanced search on X.com (Twitter). Syncs with search box and remembers position/display state.
// @description:ja   X.com（Twitter）に高度な検索機能を呼び出せるフローティング・モーダルを追加します。検索ボックスと双方向で同期し、位置や表示状態も記憶します。
// @description:en   Adds a floating modal for advanced search on X.com (formerly Twitter). Syncs with search box and remembers position/display state.
// @description:zh-CN 为X.com（Twitter）添加高级搜索浮动模态框，支持与搜索框双向同步并记住位置与显示状态。
// @description:zh-TW 為 X.com（Twitter）增加高級搜尋模態框，支援與搜尋框雙向同步並記住位置與顯示狀態。
// @description:ko   X.com(Twitter)에 고급 검색 모달을 추가합니다. 검색창과 양방향 동기화하며 위치와 표시 상태를 기억합니다。
// @description:fr   Ajoute une fenêtre modale de recherche avancée à X.com (Twitter), synchronisée avec la barre de recherche et mémoire de l’état d’affichage.
// @description:es   Agrega un modal flotante de búsqueda avanzada en X.com (Twitter), sincronizado con la caja de búsqueda y con estado persistente.
// @description:de   Fügt X.com (Twitter) ein modales Fenster für erweiterte Suche hinzu, synchronisiert mit der Suchleiste und speichert Position/Zustand.
// @description:pt-BR Adiciona um modal de busca avançada flutuante no X.com (Twitter), sincronizado com a caixa de busca e com estado salvo.
// @description:ru   Добавляет модальное окно расширенного поиска на X.com (Twitter). Синхронизируется с поисковой строкой и запоминает состояние.
// @namespace    https://github.com/koyasi777/x-advanced-search-userscript
// @author       koyasi777
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        GM_addStyle
// @license      MIT
// @homepageURL  https://github.com/koyasi777/x-advanced-search-userscript
// @supportURL   https://github.com/koyasi777/x-advanced-search-userscript/issues
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. 国際化 (i18n) モジュール ---
    const i18n = {
        translations: {
            'en': {
                modalTitle: "Advanced Search", tooltipClose: "Close",
                labelAllWords: "All of these words", placeholderAllWords: "e.g., AI news",
                labelExactPhrase: "This exact phrase", placeholderExactPhrase: 'e.g., "ChatGPT 4o"',
                labelAnyWords: "Any of these words (OR)", placeholderAnyWords: "e.g., iPhone Android",
                labelNotWords: "None of these words (-)", placeholderNotWords: "e.g., -sale -ads",
                labelHashtag: "Hashtags (#)", placeholderHashtag: "e.g., #TechEvent",
                labelLang: "Language (lang:)",
                optLangDefault: "Any language", optLangJa: "Japanese (ja)", optLangEn: "English (en)",
                hrSeparator: " ",
                labelFilters: "Filters",
                labelVerified: "Verified accounts", labelLinks: "Links", labelImages: "Images", labelVideos: "Videos",
                checkInclude: "Include", checkExclude: "Exclude",
                labelReplies: "Replies",
                optRepliesDefault: "Default (Show all)", optRepliesInclude: "Include replies", optRepliesOnly: "Replies only", optRepliesExclude: "Exclude replies",
                labelEngagement: "Engagement",
                placeholderMinReplies: "Min replies", placeholderMinLikes: "Min likes", placeholderMinRetweets: "Min retweets",
                labelDateRange: "Date range",
                tooltipSince: "From this date", tooltipUntil: "Until this date",
                labelFromUser: "From these accounts (from:)", placeholderFromUser: "e.g., @X",
                labelToUser: "To these accounts (to:)", placeholderToUser: "e.g., @google",
                labelMentioning: "Mentioning these accounts (@)", placeholderMentioning: "e.g., @OpenAI",
                buttonClear: "Clear", buttonApply: "Search",
                tooltipTrigger: "Open Advanced Search"
            },
            'ja': {
                modalTitle: "高度な検索", tooltipClose: "閉じる",
                labelAllWords: "すべての語句を含む", placeholderAllWords: "例: AI ニュース",
                labelExactPhrase: "この語句を完全に含む", placeholderExactPhrase: '例: "ChatGPT 4o"',
                labelAnyWords: "いずれかの語句を含む (OR)", placeholderAnyWords: "例: iPhone Android",
                labelNotWords: "含まない語句 (-)", placeholderNotWords: "例: -セール -広告",
                labelHashtag: "ハッシュタグ (#)", placeholderHashtag: "例: #技術書典",
                labelLang: "言語 (lang:)",
                optLangDefault: "指定しない", optLangJa: "日本語 (ja)", optLangEn: "英語 (en)",
                hrSeparator: " ",
                labelFilters: "フィルター",
                labelVerified: "認証済みアカウント", labelLinks: "リンク", labelImages: "画像", labelVideos: "動画",
                checkInclude: "含む", checkExclude: "含まない",
                labelReplies: "返信",
                optRepliesDefault: "指定しない", optRepliesInclude: "返信を含める", optRepliesOnly: "返信のみ", optRepliesExclude: "返信を除外",
                labelEngagement: "エンゲージメント",
                placeholderMinReplies: "最小返信数", placeholderMinLikes: "最小いいね数", placeholderMinRetweets: "最小リポスト数",
                labelDateRange: "期間指定",
                tooltipSince: "この日以降", tooltipUntil: "この日以前",
                labelFromUser: "このアカウントから (from:)", placeholderFromUser: "例: @X",
                labelToUser: "このアカウントへ (to:)", placeholderToUser: "例: @google",
                labelMentioning: "このアカウントへのメンション (@)", placeholderMentioning: "例: @OpenAI",
                buttonClear: "クリア", buttonApply: "検索実行",
                tooltipTrigger: "高度な検索を開く"
            },
            'zh-CN': {
                modalTitle: "高级搜索", tooltipClose: "关闭",
                labelAllWords: "包含所有这些词语", placeholderAllWords: "例如：AI 新闻",
                labelExactPhrase: "包含此完整短语", placeholderExactPhrase: "例如：\"ChatGPT 4o\"",
                labelAnyWords: "包含这些词语中的任何一个 (OR)", placeholderAnyWords: "例如：iPhone Android",
                labelNotWords: "不包含这些词语 (-)", placeholderNotWords: "例如：-促销 -广告",
                labelHashtag: "话题标签 (#)", placeholderHashtag: "例如：#技术活动",
                labelLang: "语言 (lang:)",
                optLangDefault: "任何语言", optLangJa: "日语 (ja)", optLangEn: "英语 (en)",
                labelFilters: "筛选",
                labelVerified: "认证账户", labelLinks: "链接", labelImages: "图片", labelVideos: "视频",
                checkInclude: "包括", checkExclude: "排除",
                labelReplies: "回复",
                optRepliesDefault: "默认 (显示全部)", optRepliesInclude: "包括回复", optRepliesOnly: "仅回复", optRepliesExclude: "排除回复",
                labelEngagement: "互动",
                placeholderMinReplies: "最少回复", placeholderMinLikes: "最少喜欢", placeholderMinRetweets: "最少转推",
                labelDateRange: "日期范围",
                tooltipSince: "从此日期", tooltipUntil: "至此日期",
                labelFromUser: "来自这些账户 (from:)", placeholderFromUser: "例如：@X",
                labelToUser: "发往这些账户 (to:)", placeholderToUser: "例如：@google",
                labelMentioning: "提及这些账户 (@)", placeholderMentioning: "例如：@OpenAI",
                buttonClear: "清除", buttonApply: "搜索",
                tooltipTrigger: "打开高级搜索"
            },
            'ko': {
                modalTitle: "고급 검색", tooltipClose: "닫기",
                labelAllWords: "다음 단어 모두 포함", placeholderAllWords: "예: AI 뉴스",
                labelExactPhrase: "정확히 일치하는 문구", placeholderExactPhrase: "예: \"ChatGPT 4o\"",
                labelAnyWords: "다음 단어 중 하나라도 포함 (OR)", placeholderAnyWords: "예: iPhone Android",
                labelNotWords: "다음 단어 제외 (-)", placeholderNotWords: "예: -세일 -광고",
                labelHashtag: "해시태그 (#)", placeholderHashtag: "예: #기술이벤트",
                labelLang: "언어 (lang:)",
                optLangDefault: "모든 언어", optLangJa: "일본어 (ja)", optLangEn: "영어 (en)",
                labelFilters: "필터",
                labelVerified: "인증된 계정", labelLinks: "링크", labelImages: "이미지", labelVideos: "동영상",
                checkInclude: "포함", checkExclude: "제외",
                labelReplies: "답글",
                optRepliesDefault: "기본 (모두 표시)", optRepliesInclude: "답글 포함", optRepliesOnly: "답글만", optRepliesExclude: "답글 제외",
                labelEngagement: "참여",
                placeholderMinReplies: "최소 답글 수", placeholderMinLikes: "최소 좋아요 수", placeholderMinRetweets: "최소 리트윗 수",
                labelDateRange: "날짜 범위",
                tooltipSince: "이 날짜부터", tooltipUntil: "이 날짜까지",
                labelFromUser: "이 계정에서 보낸 트윗 (from:)", placeholderFromUser: "예: @X",
                labelToUser: "이 계정으로 보낸 트윗 (to:)", placeholderToUser: "예: @google",
                labelMentioning: "이 계정을 맨션 (@)", placeholderMentioning: "예: @OpenAI",
                buttonClear: "지우기", buttonApply: "검색",
                tooltipTrigger: "고급 검색 열기"
            },
        },
        lang: 'en',
        init: function() {
            const supportedLangs = Object.keys(this.translations);
            let detectedLang = document.documentElement.lang || navigator.language || 'en';
            if (supportedLangs.includes(detectedLang)) {
                this.lang = detectedLang;
                return;
            }
            const baseLang = detectedLang.split('-')[0];
            if (supportedLangs.includes(baseLang)) {
                this.lang = baseLang;
                return;
            }
            this.lang = 'en';
        },
        t: function(key) {
            return this.translations[this.lang]?.[key] || this.translations['en'][key] || `[${key}]`;
        },
        apply: function(container) {
            container.querySelectorAll('[data-i18n]').forEach(el => {
                el.textContent = this.t(el.dataset.i18n);
            });
            container.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                el.placeholder = this.t(el.dataset.i18nPlaceholder);
            });
            container.querySelectorAll('[data-i18n-title]').forEach(el => {
                el.title = this.t(el.dataset.i18nTitle);
            });
        }
    };

    // --- 2. グローバル変数と状態管理 ---
    let isUpdating = false;

    // --- 3. スタイルの定義 ---
    GM_addStyle(`
        #advanced-search-trigger { position: fixed; top: 18px; right: 20px; z-index: 9999; background-color: #1D9BF0; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; transition: transform 0.2s ease-in-out; }
        #advanced-search-trigger:hover { transform: scale(1.1); }
        #advanced-search-modal { position: fixed; z-index: 10000; width: 380px; max-height: 80vh; background-color: black; border: 1px solid #333; border-radius: 16px; box-shadow: 0 8px 24px rgba(29, 155, 240, 0.2); display: none; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #E7E9EA; }
        .adv-modal-header{padding:12px 16px;border-bottom:1px solid #333;cursor:move;display:flex;justify-content:space-between;align-items:center}.adv-modal-header h2{margin:0;font-size:18px;font-weight:700}.adv-modal-close{background:0 0;border:none;color:#e7e9ea;font-size:24px;cursor:pointer}.adv-modal-body{flex:1;overflow-y:auto;padding:16px}.adv-form-group{margin-bottom:16px}.adv-form-group label{display:block;margin-bottom:6px;font-size:14px;font-weight:700;color:#8b98a5}.adv-form-group input[type=text],.adv-form-group input[type=number],.adv-form-group input[type=date],.adv-form-group select{width:100%;background-color:#202327;border:1px solid #38444d;border-radius:4px;padding:8px 12px;color:#e7e9ea;font-size:15px;box-sizing:border-box}.adv-form-group input:focus{outline:0;border-color:#1d9bf0}.adv-form-group input::-moz-placeholder{color:#536471}.adv-form-group input::placeholder{color:#536471}.adv-form-group-date-container{display:flex;gap:10px}.adv-filter-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.adv-checkbox-group{background-color:#202327;border:1px solid #38444d;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px}.adv-checkbox-group span{font-weight:700;font-size:14px;color:#e7e9ea}.adv-checkbox-item{display:flex;align-items:center}.adv-checkbox-item input{margin-right:8px}.adv-checkbox-item label{color:#8b98a5;margin-bottom:0}.adv-modal-footer{padding:12px 16px;border-top:1px solid #333;display:flex;justify-content:flex-end;gap:12px}.adv-modal-button{padding:8px 16px;border-radius:9999px;border:1px solid #536471;background-color:transparent;color:#e7e9ea;font-weight:700;cursor:pointer;transition:background-color .2s}.adv-modal-button.primary{background-color:#1d9bf0;border-color:#1d9bf0;color:#fff}.adv-modal-button:hover{background-color:rgba(231,233,234,.1)}.adv-modal-button.primary:hover{background-color:#1a8cd8}.adv-modal-body::-webkit-scrollbar{width:8px}.adv-modal-body::-webkit-scrollbar-track{background:#202327}.adv-modal-body::-webkit-scrollbar-thumb{background:#536471;border-radius:4px}body.adv-dragging{-webkit-user-select:none;moz-user-select:none;user-select:none}
    `);

    // --- 4. HTML構造の定義 ---
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
                    <hr style="border-color: #333; margin: 20px 0;" data-i18n="hrSeparator">
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
                    <hr style="border-color: #333; margin: 20px 0;" data-i18n="hrSeparator">
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
                    <hr style="border-color: #333; margin: 20px 0;" data-i18n="hrSeparator">
                    <div class="adv-form-group"><label for="adv-from-user" data-i18n="labelFromUser"></label><input type="text" id="adv-from-user" data-i18n-placeholder="placeholderFromUser"></div>
                    <div class="adv-form-group"><label for="adv-to-user" data-i18n="labelToUser"></label><input type="text" id="adv-to-user" data-i18n-placeholder="placeholderToUser"></div>
                    <div class="adv-form-group"><label for="adv-mentioning" data-i18n="labelMentioning"></label><input type="text" id="adv-mentioning" data-i18n-placeholder="placeholderMentioning"></div>
                </form>
            </div>
            <div class="adv-modal-footer">
                <button id="adv-clear-button" class="adv-modal-button" data-i18n="buttonClear"></button>
                <button id="adv-apply-button" class="adv-modal-button primary" data-i18n="buttonApply"></button>
            </div>
        </div>
    `;

    // --- 5. メインロジック ---
    const main = () => {
        // 5.1. i18n初期化
        i18n.init();

        // 5.2. UI要素の作成とDOMへの追加
        const trigger = document.createElement('button');
        trigger.id = 'advanced-search-trigger';
        trigger.innerHTML = '🔍';
        trigger.title = i18n.t('tooltipTrigger');
        document.body.appendChild(trigger);

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        i18n.apply(modalContainer);
        document.body.appendChild(modalContainer);

        // 5.3. DOM要素の参照を取得
        const modal = document.getElementById('advanced-search-modal');
        const form = document.getElementById('advanced-search-form');
        const closeButton = modal.querySelector('.adv-modal-close');
        const clearButton = document.getElementById('adv-clear-button');
        const applyButton = document.getElementById('adv-apply-button');
        const searchInputSelector = 'input[data-testid="SearchBox_Search_Input"]';

        // 5.4. 状態管理（永続化）ロジック
        const STATE_KEY = 'advSearchModalState_v2.1'; // バージョンアップ
        const loadState = () => {
            try {
                const state = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
                modal.style.left = state.left || 'auto';
                modal.style.top = state.top || '80px';
                modal.style.right = state.left ? 'auto' : '20px';
                if (state.visible) modal.style.display = 'flex';
            } catch (e) {
                console.error("Failed to load state for Advanced Search Modal:", e);
            }
        };
        const saveState = () => {
            const state = {
                left: modal.style.left,
                top: modal.style.top,
                visible: modal.style.display === 'flex'
            };
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
        };

        // 5.5. コア機能（クエリ生成・解析）
        const buildQueryStringFromModal = () => {
             const q = [];
             const fields = {
                 all: document.getElementById('adv-all-words').value.trim(),
                 exact: document.getElementById('adv-exact-phrase').value.trim(),
                 any: document.getElementById('adv-any-words').value.trim(),
                 not: document.getElementById('adv-not-words').value.trim(),
                 hash: document.getElementById('adv-hashtag').value.trim(),
                 lang: document.getElementById('adv-lang').value,
                 from: document.getElementById('adv-from-user').value.trim(),
                 to: document.getElementById('adv-to-user').value.trim(),
                 mention: document.getElementById('adv-mentioning').value.trim(),
                 replies: document.getElementById('adv-replies').value,
                 min_replies: document.getElementById('adv-min-replies').value,
                 min_faves: document.getElementById('adv-min-faves').value,
                 min_retweets: document.getElementById('adv-min-retweets').value,
                 since: document.getElementById('adv-since').value,
                 until: document.getElementById('adv-until').value,
             };
             if(fields.all) q.push(fields.all);
             if(fields.exact) q.push(`"${fields.exact.replace(/"/g, '')}"`);
             if(fields.any) q.push(`(${fields.any.split(/\s+/).filter(Boolean).join(" OR ")})`);
             if(fields.not) q.push(...fields.not.split(/\s+/).filter(Boolean).map(w=>`-${w}`));
             if(fields.hash) q.push(...fields.hash.split(/\s+/).filter(Boolean).map(h=>`#${h.replace(/^#/,"")}`));
             if(fields.lang) q.push(`lang:${fields.lang}`);
             if(fields.from) q.push(`from:${fields.from.replace(/^@/,"")}`);
             if(fields.to) q.push(`to:${fields.to.replace(/^@/,"")}`);
             if(fields.mention) q.push(`@${fields.mention.replace(/^@/,"")}`);
             if(fields.min_replies) q.push(`min_replies:${fields.min_replies}`);
             if(fields.min_faves) q.push(`min_faves:${fields.min_faves}`);
             if(fields.min_retweets) q.push(`min_retweets:${fields.min_retweets}`);
             if(fields.since) q.push(`since:${fields.since}`);
             if(fields.until) q.push(`until:${fields.until}`);

             const addFilter = (type, mapping) => {
                 const include = document.getElementById(`adv-filter-${type}-include`).checked;
                 const exclude = document.getElementById(`adv-filter-${type}-exclude`).checked;
                 if (include) q.push(mapping);
                 if (exclude) q.push(`-${mapping}`);
             };
             addFilter('verified', 'is:verified');
             addFilter('links', 'filter:links');
             addFilter('images', 'filter:images');
             addFilter('videos', 'filter:videos');

             if(fields.replies) {
                 const replyMap = { include: 'include:replies', only: 'filter:replies', exclude: '-filter:replies' };
                 if(replyMap[fields.replies]) q.push(replyMap[fields.replies]);
             }
             return q.join(" ");
        };

        const parseQueryAndApplyToModal = (query) => {
            if (isUpdating) return;
            isUpdating = true;
            form.reset();
            let q = ` ${query} `;

            const extract = (regex, callback) => {
                let match;
                while ((match = regex.exec(q)) !== null) {
                    callback(match[1].trim());
                    q = q.replace(match[0], ' ');
                }
            };

            extract(/"([^"]+)"/g, val => document.getElementById('adv-exact-phrase').value = val);
            extract(/from:([^\s]+)/g, val => document.getElementById('adv-from-user').value = val);
            extract(/to:([^\s]+)/g, val => document.getElementById('adv-to-user').value = val);
            extract(/lang:([^\s]+)/g, val => document.getElementById('adv-lang').value = val);
            extract(/#([^\s]+)/g, val => document.getElementById('adv-hashtag').value = (document.getElementById('adv-hashtag').value + ' ' + val).trim());
            extract(/@([^\s]+)/g, val => document.getElementById('adv-mentioning').value = val);
            extract(/min_replies:(\d+)/g, val => document.getElementById('adv-min-replies').value = val);
            extract(/min_faves:(\d+)/g, val => document.getElementById('adv-min-faves').value = val);
            extract(/min_retweets:(\d+)/g, val => document.getElementById('adv-min-retweets').value = val);
            extract(/since:(\d{4}-\d{2}-\d{2})/g, val => document.getElementById('adv-since').value = val);
            extract(/until:(\d{4}-\d{2}-\d{2})/g, val => document.getElementById('adv-until').value = val);

            const filterMap = {
                'is:verified': 'verified', 'filter:links': 'links', 'filter:images': 'images', 'filter:videos': 'videos',
            };
            Object.entries(filterMap).forEach(([op, id]) => {
                 const regex = new RegExp(`\\s(-?)${op.replace(':', '\\:')}\\s`, 'g');
                 q = q.replace(regex, (match, prefix) => {
                     document.getElementById(`adv-filter-${id}-${prefix ? 'exclude' : 'include'}`).checked = true;
                     return ' ';
                 });
            });

             if (/\sinclude:replies\s/.test(q)) {
                 document.getElementById('adv-replies').value = 'include';
                 q = q.replace(/\sinclude:replies\s/, ' ');
             } else if (/\sfilter:replies\s/.test(q)) {
                 document.getElementById('adv-replies').value = 'only';
                 q = q.replace(/\sfilter:replies\s/, ' ');
             } else if (/\s-filter:replies\s/.test(q)) {
                 document.getElementById('adv-replies').value = 'exclude';
                 q = q.replace(/\s-filter:replies\s/, ' ');
             }

            const orGroups = q.match(/\(([^)]+)\)/g);
            if(orGroups){
                const anyWords = orGroups.map(g => g.replace(/[()]/g, '').replace(/\s+OR\s+/g, ' ')).join(' ');
                document.getElementById('adv-any-words').value = anyWords.trim();
                q = q.replace(/\(([^)]+)\)/g, ' ');
            }

            document.getElementById('adv-not-words').value = (q.match(/-\S+/g) || []).map(w => w.substring(1)).join(' ');
            q = q.replace(/-\S+/g, ' ');

            document.getElementById('adv-all-words').value = q.trim().split(/\s+/).filter(Boolean).join(' ');
            isUpdating = false;
        };

        // 5.6. イベントハンドラと同期ロジック
        const syncFromModalToSearchBox = () => {
            if (isUpdating) return;
            isUpdating = true;
            const finalQuery = buildQueryStringFromModal();
            const searchInput = document.querySelector(searchInputSelector);
            if (searchInput) {
                searchInput.value = finalQuery;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            isUpdating = false;
        };

        const syncFromSearchBoxToModal = () => {
            if (isUpdating || modal.style.display === 'none') return;
            const searchInput = document.querySelector(searchInputSelector);
            if (searchInput) {
                parseQueryAndApplyToModal(searchInput.value);
            }
        };

        const executeSearch = () => {
            const finalQuery = buildQueryStringFromModal();
            if (!finalQuery.trim()) return;
            const searchInput = document.querySelector(searchInputSelector);
            if (searchInput) {
                searchInput.value = finalQuery;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                const parentForm = searchInput.closest('form');
                if (parentForm && typeof parentForm.requestSubmit === 'function') {
                    parentForm.requestSubmit();
                    return;
                }
            }
            window.location.href = `https://x.com/search?q=${encodeURIComponent(finalQuery)}&src=typed_query`;
        };

        const setupDrag = () => {
            const header = modal.querySelector('.adv-modal-header');
            let isDragging = false, offset = { x: 0, y: 0 };
            header.addEventListener('mousedown', e => {
                if (e.target.matches('button, a')) return;
                isDragging = true;
                offset = { x: e.clientX - modal.offsetLeft, y: e.clientY - modal.offsetTop };
                document.body.classList.add('adv-dragging');
            });
            document.addEventListener('mousemove', e => {
                if (!isDragging) return;
                modal.style.right = 'auto';
                let newX = e.clientX - offset.x;
                let newY = e.clientY - offset.y;
                newX = Math.max(0, Math.min(newX, window.innerWidth - modal.offsetWidth));
                newY = Math.max(0, Math.min(newY, window.innerHeight - modal.offsetHeight));
                modal.style.left = `${newX}px`;
                modal.style.top = `${newY}px`;
            });
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    document.body.classList.remove('adv-dragging');
                    saveState();
                }
            });
        };

        // 5.7. イベントリスナーの設定
        trigger.addEventListener('click', () => {
            const isVisible = modal.style.display === 'flex';
            modal.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                syncFromSearchBoxToModal();
            }
            saveState();
        });
        closeButton.addEventListener('click', () => { modal.style.display = 'none'; saveState(); });
        clearButton.addEventListener('click', () => { form.reset(); syncFromModalToSearchBox(); });
        applyButton.addEventListener('click', executeSearch);
        form.addEventListener('input', syncFromModalToSearchBox);
        form.addEventListener('keydown', e => {
            if (e.key === 'Enter' && e.target.matches('input[type="text"], input[type="number"]')) {
                e.preventDefault();
                executeSearch();
            }
        });
        setupDrag();

        // 5.8. 変更監視ロジックの強化
        const observeURLChanges = (callback) => {
            let lastUrl = location.href;
            const debouncedCallback = (() => {
                let timeout;
                return () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(callback, 100); // 100msのデバウンス
                };
            })();

            const checkURL = () => {
                 requestAnimationFrame(() => {
                    const currentUrl = location.href;
                    if (currentUrl !== lastUrl) {
                        lastUrl = currentUrl;
                        debouncedCallback();
                    }
                });
            };

            ['pushState', 'replaceState'].forEach(method => {
                const original = history[method];
                history[method] = function() {
                    const result = original.apply(this, arguments);
                    checkURL();
                    return result;
                };
            });

            window.addEventListener('popstate', checkURL);
            new MutationObserver(checkURL).observe(document.querySelector('title'), {childList: true});
        };

        const setupObservers = () => {
            const attachInputListener = (inputElement) => {
                if (inputElement.dataset.advSearchAttached) return;
                inputElement.dataset.advSearchAttached = 'true';
                inputElement.addEventListener('input', () => {
                    syncFromSearchBoxToModal();
                });
            };

            const domObserver = new MutationObserver(() => {
                const searchInput = document.querySelector(searchInputSelector);
                if (searchInput) {
                    attachInputListener(searchInput);
                    syncFromSearchBoxToModal();
                }
            });
            domObserver.observe(document.body, { childList: true, subtree: true });

            observeURLChanges(() => {
                syncFromSearchBoxToModal();
            });
        };

        // 5.9. 初期化
        loadState();
        setupObservers();

        setTimeout(syncFromSearchBoxToModal, 1000); // 初期読み込み時の同期
    };

    // --- 6. スクリプトの実行 ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
