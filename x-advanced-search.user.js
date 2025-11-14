// ==UserScript==
// @name         Advanced Search for X (Twitter) 🔍
// @name:ja      Advanced Search for X（Twitter）🔍
// @name:en      Advanced Search for X (Twitter) 🔍
// @name:zh-CN   Advanced Search for X（Twitter）🔍
// @name:zh-TW   Advanced Search for X（Twitter）🔍
// @name:ko      Advanced Search for X (Twitter) 🔍
// @name:fr      Advanced Search for X (Twitter) 🔍
// @name:es      Advanced Search for X (Twitter) 🔍
// @name:de      Advanced Search for X (Twitter) 🔍
// @name:pt-BR   Advanced Search for X (Twitter) 🔍
// @name:ru      Advanced Search for X (Twitter) 🔍
// @version      5.2.2
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
// @namespace    https://github.com/koyasi777/advanced-search-for-x-twitter
// @author       koyasi777
// @match        https://x.com/*
// @match        https://twitter.com/*
// @exclude      https://x.com/i/tweetdeck*
// @exclude      https://twitter.com/i/tweetdeck*
// @icon         https://koyasi-brain.com/wp-content/uploads/2025/11/icon-64.png
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/koyasi777/advanced-search-for-x-twitter
// @supportURL   https://github.com/koyasi777/advanced-search-for-x-twitter/issues
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
                labelReposts: "Reposts",
                labelTimelineHashtags: "Hashtags (#)",
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
                labelHitName: "Exclude hits only in display name",
                labelHitHandle: "Exclude hits only in username (@handle)",
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

                /* History tab */
                placeholderSearchHistory: "Search history (query)",
                labelSortBy: "Sort by:",
                placeholderSearchSaved: "Search saved (query)",
                sortNewest: "Newest first",
                sortOldest: "Oldest first",
                sortNameAsc: "Query (A-Z)",
                sortNameDesc: "Query (Z-A)",

                /* Folder/List/Account tabs */
                placeholderFilterAccounts: "Filter accounts (@, name)",
                placeholderFilterLists: "Filter lists (name, url)",
                buttonAddFolder: "+Folder",
                folderFilterAll: "ALL",
                folderFilterUnassigned: "Unassigned",
                folderRename: "Rename",
                folderRenameTitle: "Rename folder",
                folderDelete: "Delete",
                folderDeleteTitle: "Delete folder",
                promptNewFolder: "New folder name",
                confirmDeleteFolder: "Delete this folder and all items inside it? This cannot be undone.",
                optListsAll: "Lists",
                defaultSavedFolders: "Saved Searches",

                /* Settings */
                settingsTitle: "Settings",
                buttonClose: "Close",
                labelUILang: "Interface language",
                optUILangAuto: "Auto",
                labelImportExport: "Import / Export",
                placeholderSettingsJSON: "Paste backup JSON here...",
                tooltipSettings: "Open settings",
                toastImported: "Imported.",
                toastExported: "Exported to file.",
                buttonReset: "Reset all data",
                confirmResetAll: "Reset all data? This cannot be undone.",
                toastReset: "All data has been reset.",
                buttonImportSuccess: "Imported successfully 👍️",
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
                labelReposts: "リポスト",
                labelTimelineHashtags: "ハッシュタグ (#)",
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
                labelHitName: "表示名（名前）のみのヒットは除外",
                labelHitHandle: "ユーザー名（@）のみのヒットは除外",
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

                /* History tab */
                placeholderSearchHistory: "履歴を検索（クエリ）",
                labelSortBy: "並び順:",
                placeholderSearchSaved: "保存済みを検索（クエリ）",
                sortNewest: "新しい順",
                sortOldest: "古い順",
                sortNameAsc: "クエリ (昇順)",
                sortNameDesc: "クエリ (降順)",

                /* Folder/List/Account tabs */
                placeholderFilterAccounts: "アカウントを検索 (@, 名前)",
                placeholderFilterLists: "リストを検索 (名前, URL)",
                buttonAddFolder: "+フォルダー",
                folderFilterAll: "すべて",
                folderFilterUnassigned: "未分類",
                folderRename: "名前変更",
                folderRenameTitle: "フォルダー名を変更",
                folderDelete: "削除",
                folderDeleteTitle: "フォルダーを削除",
                promptNewFolder: "新しいフォルダー名",
                confirmDeleteFolder: "このフォルダーと中のすべてのアイテムを完全に削除しますか？この操作は元に戻せません。",
                optListsAll: "リスト",
                defaultSavedFolders: "保存済み検索",

                /* Settings */
                settingsTitle: "設定",
                buttonClose: "閉じる",
                labelUILang: "UI 言語",
                optUILangAuto: "自動判定",
                labelImportExport: "インポート / エクスポート",
                placeholderSettingsJSON: "ここにバックアップ JSON を貼り付けてください...",
                tooltipSettings: "設定を開く",
                toastImported: "インポートしました。",
                toastExported: "ファイルにエクスポートしました。",
                buttonReset: "すべて初期化",
                confirmResetAll: "すべてのデータを初期化しますか？この操作は元に戻せません。",
                toastReset: "すべてのデータを初期化しました。",
                buttonImportSuccess: "インポートに成功しました👍️",
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

    const SETTINGS_SVG = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      />
    </svg>
    `;

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

    // ▼ パース結果をキャッシュ（スクロール時の再パース防止）
    let __cachedSearchTokens = null;
    let __cachedSearchQuery = null; // このクエリ文字列で __cachedSearchTokens が生成された

    // ▼ 入力中ガード（IME合成を含めてカバー）
    let __typingGuardUntil = 0;
    const TYPING_GRACE_MS = 600; // 入力終了からこのmsはスキャン停止
    const markTyping = () => { __typingGuardUntil = Date.now() + TYPING_GRACE_MS; };
    const isTyping = () => Date.now() < __typingGuardUntil;

    const isMediaViewPath = (pathname) => /\/status\/\d+\/(?:photo|video|media|analytics)(?:\/\d+)?\/?$/.test(pathname);
    const isComposePath = (pathname) => /^\/compose\/post(?:\/|$)/.test(pathname);
    const isProfileMediaPath = (pathname) => /^\/[A-Za-z0-9_]{1,50}\/(?:photo|header_photo)\/?$/.test(pathname);
    const isBroadcastPath = (pathname) => /^\/i\/broadcasts\//.test(pathname);
    const isBlockedPath = (pathname) => isMediaViewPath(pathname) || isComposePath(pathname) || isProfileMediaPath(pathname) || isBroadcastPath(pathname);

    GM_addStyle(`
        :root { --modal-primary-color:#1d9bf0; --modal-primary-color-hover:#1a8cd8; --modal-primary-text-color:#fff; }
        #advanced-search-trigger { position:fixed; top:18px; right:20px; z-index:9999; background-color:var(--modal-primary-color); color:var(--modal-primary-text-color); border:none; border-radius:50%; width:50px; height:50px; font-size:24px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; transition:transform .2s, background-color .2s; }
        #advanced-search-trigger:hover { transform:scale(1.1); background-color:var(--modal-primary-color-hover); }
        #advanced-search-modal { position:fixed; z-index:10000; width:450px; display:none; flex-direction:column; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; background-color:var(--modal-bg, #000); color:var(--modal-text-primary, #e7e9ea); border:1px solid var(--modal-border, #333); border-radius:16px; box-shadow:0 8px 24px rgba(29,155,240,.2); transition:background-color .2s,color .2s,border-color .2s; }
        .adv-modal-header{padding:12px 16px;border-bottom:1px solid var(--modal-border,#333);cursor:move;display:flex;justify-content:space-between;align-items:center}
        .adv-modal-title-left{display:flex;align-items:center;gap:8px;}
        .adv-modal-header h2{margin:0;font-size:18px;font-weight:700}
        .adv-settings-btn{
          margin-left:6px;
          width:26px;height:26px;
          border-radius:9999px;
          border:1px solid var(--modal-input-border,#38444d);
          background:var(--modal-input-bg,#202327);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          padding:0;
        }
        .adv-settings-btn:hover{
          background-color:var(--modal-button-hover-bg,rgba(231,233,234,.1));
        }
        .adv-settings-btn svg{
          width:14px;
          height:14px;
        }
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
        .adv-checkbox-item input[type="checkbox"]:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .adv-checkbox-item input[type="checkbox"]:disabled + label {
          opacity: 0.5;
          cursor: not-allowed;
          text-decoration: line-through;
        }
        .adv-modal-footer{padding:12px 16px;border-top:1px solid var(--modal-border,#333);display:flex;justify-content:flex-end;gap:12px}
        .adv-modal-button{padding:8px 16px;border-radius:9999px;border:1px solid var(--modal-text-secondary,#536471);background-color:transparent;color:var(--modal-text-primary,#e7e9ea);font-weight:700;cursor:pointer;transition:background-color .2s}
        .adv-modal-button:hover{background-color:var(--modal-button-hover-bg,rgba(231,233,234,.1))}
        .adv-modal-button.primary,
        .adv-chip.primary {
          background-color:var(--modal-primary-color);
          border-color:var(--modal-primary-color);
          color:var(--modal-primary-text-color);
        }
        .adv-modal-button.primary:hover{background-color:var(--modal-primary-color-hover)}
        .adv-modal-button[disabled]{opacity:.5; cursor:not-allowed;}
        #adv-settings-import.adv-modal-button[disabled]{opacity:1;}
        .adv-modal-body::-webkit-scrollbar{width:8px}
        .adv-modal-body::-webkit-scrollbar-track{background:var(--modal-scrollbar-track,#202327)}
        .adv-modal-body::-webkit-scrollbar-thumb{background:var(--modal-scrollbar-thumb,#536471);border-radius:4px}
        body.adv-dragging{user-select:none}
        .adv-account-label-group{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .adv-exclude-toggle{display:flex;align-items:center}
        .adv-exclude-toggle input{margin-right:4px}
        .adv-exclude-toggle label{font-size:13px;font-weight:normal;color:var(--modal-text-secondary,#8b98a5);cursor:pointer}
        hr.adv-separator{border:none;height:1px;background-color:var(--hr-color,#333);margin:20px 0;transition:background-color .2s}
        /* ★全タブ共通のズーム対象に拡張（検索タブの既存idにも適用維持） */
        .adv-zoom-root, #adv-zoom-root{ transform-origin: top left; will-change: transform; padding:12px 11.6px 10px 11px; }
        #adv-zoom-root {
          padding-top: 16px; /* 検索タブの上余白だけを 16px に上書き */
          padding-left:16px; padding-right:20px;
        }
        .adv-modal-body{ overflow:auto; }

        .adv-form-row.two-cols { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media (max-width: 480px) { .adv-form-row.two-cols { grid-template-columns:1fr; } }

        .adv-tabs { display:flex; border-bottom:1px solid var(--modal-border,#333); padding:0 8px; gap:6px; align-items:stretch; }
        .adv-tab-btn { appearance:none; border:none; background:transparent; color:var(--modal-text-secondary,#8b98a5); padding:10px 12px; cursor:pointer; font-weight:700; border-radius:8px 8px 0 0; font-size:0.78rem; }
        .adv-tab-btn.active { color:var(--modal-text-primary,#e7e9ea); background-color:var(--modal-input-bg,#202327); border:1px solid var(--modal-input-border,#38444d); border-bottom:none; }
        .adv-tab-content { display:none; }
        .adv-tab-content.active { display:block; }

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
        .adv-modal-button.danger {
          border-color:#8b0000;
          color:#ffb3b3;
        }
        .adv-modal-button.danger:hover{
          background-color:rgba(139,0,0,0.2);
        }
        .adv-chip.scope { padding:2px 6px; font-size:11px; line-height:1.2; opacity:0.95; }

        .adv-toast { position:fixed; z-index:10001; left:50%; transform:translateX(-50%); bottom:24px; background:#111a; color:#fff; backdrop-filter: blur(6px); border:1px solid #fff3; padding:8px 12px; border-radius:8px; font-weight:700; opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; }
        .adv-toast.show { opacity:1; transform:translateX(-50%) translateY(-6px); }

        .adv-modal-footer { justify-content:flex-end; }
        .adv-modal-footer .adv-modal-button#adv-save-button { margin-right:auto; }

        .adv-tab-toolbar {
          display:flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom:12px;
          padding: 0 2px;
        }
        /* ツールバーの左側（検索・ソート） */
        .adv-tab-toolbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1 1 auto;
          min-width: 150px;
        }
        /* ツールバーの右側（すべて削除ボタン） */
        .adv-tab-toolbar-right {
          display: flex;
          flex: 0 0 auto;
        }
        /* ツールバー入力欄の共通スタイル */
        .adv-select, .adv-input {
          background-color:var(--modal-input-bg,#202327);
          border:1px solid var(--modal-input-border,#38444d);
          border-radius:8px;
          padding:6px 10px;
          color:var(--modal-text-primary,#e7e9ea);
        }
        /* 検索ボックスとセレクトボックスのスタイル（.adv-folder-toolbar内と共通化） */
        /* 共通スタイルは .adv-input, .adv-select が担当 */
        .adv-tab-toolbar .adv-input {
          flex: 1;
          min-width: 80px;
        }
        .adv-tab-toolbar .adv-select {
          flex: 0 1 auto;
        }

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
          padding: 0 12px 12px 12px;
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
        .adv-folder[data-drop="1"] { outline:2px dashed var(--modal-primary-color); outline-offset:-2px; }
        .adv-folder-title { display:flex; gap:8px; align-items:baseline; }
        .adv-folder-actions { display:flex; gap:6px; }
        .adv-folder-toolbar { display:flex; gap:8px; align-items:center; margin:0 0 12px; padding:0 2px; }
        .adv-folder-toolbar input[type="text"] { flex:1; min-width:80px; }
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
        #adv-tab-saved.adv-bg-drop-active,
        #adv-accounts-list.adv-bg-drop-active,
        #adv-lists-list.adv-bg-drop-active,
        #adv-saved-list.adv-bg-drop-active {
          outline: 2px dashed var(--modal-primary-color, #1d9bf0);
          /* リストコンテナ側はパディングが無いためオフセットを小さく */
          outline-offset: -4px;
        }
        /* タブパネル（上部余白）側は既存のオフセットを維持 */
        #adv-tab-accounts.adv-bg-drop-active,
        #adv-tab-lists.adv-bg-drop-active,
        #adv-tab-saved.adv-bg-drop-active {
          outline-offset: -8px;
        }

        /* 背景（Unassigned 宛て）をドロップ中は、フォルダー内の“薄い残像”を消す */
        #adv-tab-accounts.adv-bg-drop-active .adv-list .adv-item.dragging,
        #adv-accounts-list.adv-bg-drop-active .adv-list .adv-item.dragging,
        #adv-tab-lists.adv-bg-drop-active .adv-list .adv-item.dragging,
        #adv-lists-list.adv-bg-drop-active .adv-list .adv-item.dragging,
        #adv-tab-saved.adv-bg-drop-active .adv-list .adv-item.dragging,
        #adv-saved-list.adv-bg-drop-active .adv-list .adv-item.dragging {
          display: none !important;
        }

        /* === Settings modal === */
        #adv-settings-modal.adv-settings-modal{
          position:fixed;
          inset:0;
          z-index:10001;
          display:none;
          align-items:center;
          justify-content:center;
          background:rgba(0,0,0,.5);
        }
        .adv-settings-dialog{
          width:420px;
          max-width:90vw;
          max-height:80vh;
          background-color:var(--modal-bg,#000);
          color:var(--modal-text-primary,#e7e9ea);
          border-radius:16px;
          border:1px solid var(--modal-border,#333);
          box-shadow:0 8px 24px rgba(0,0,0,.3);
          display:flex;
          flex-direction:column;
          overflow:hidden;
          font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
        }
        .adv-settings-header{
          padding:12px 16px;
          border-bottom:1px solid var(--modal-border,#333);
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
        .adv-settings-title{
          margin:0;
          font-size:16px;
          font-weight:700;
        }
        .adv-settings-close{
          border:none;
          background:transparent;
          color:var(--modal-close-color,#e7e9ea);
          font-size:20px;
          width:32px;
          height:32px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
        }
        .adv-settings-close:hover{
          background-color:var(--modal-close-hover-bg,rgba(231,233,234,.1));
        }
        .adv-settings-body{
          padding:12px 16px;
          overflow-y:auto;
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .adv-settings-group label{
          display:block;
          margin-bottom:4px;
          font-size:14px;
          font-weight:700;
          color:var(--modal-text-secondary,#8b98a5);
        }
        .adv-settings-group select,
        .adv-settings-group textarea{
          width:100%;
          background-color:var(--modal-input-bg,#202327);
          border:1px solid var(--modal-input-border,#38444d);
          border-radius:8px;
          padding:8px 10px;
          color:var(--modal-text-primary,#e7e9ea);
          font-size:14px;
          box-sizing:border-box;
        }
        .adv-settings-group textarea{
          resize:vertical;
          min-height:80px;
        }
        .adv-settings-actions-inline{
          display:flex;
          gap:8px;
          margin-top:6px;
          flex-wrap:wrap;
        }
        .adv-settings-footer{
          padding:10px 16px;
          border-top:1px solid var(--modal-border,#333);
          display:flex;
          justify-content:flex-end;
          gap:8px;
        }

        /* === Tab Drag & Drop === */
        .adv-tab-btn {
          user-select: none;
        }
        .adv-tab-btn:active {
          cursor: grabbing;
        }
        .adv-tab-btn.dragging {
          opacity: .5;
        }

    `);

    const modalHTML = `
        <div id="advanced-search-modal">
            <div class="adv-modal-header">
                <div class="adv-modal-title-left">
                    <h2 data-i18n="modalTitle"></h2>
                    <button id="adv-settings-button" class="adv-settings-btn" type="button" data-i18n-title="tooltipSettings">
                        ${SETTINGS_SVG}
                    </button>
                </div>
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
                    <div id="adv-zoom-root" class="adv-zoom-root">
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
                                <div class="adv-checkbox-group"><span data-i18n="labelReposts"></span><div class="adv-checkbox-item" style="display: none;"><input type="checkbox" id="adv-filter-reposts-include" disabled><label for="adv-filter-reposts-include" data-i18n="checkInclude"></label></div><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-reposts-exclude"><label for="adv-filter-reposts-exclude" data-i18n="checkExclude"></label></div></div>
                                <div class="adv-checkbox-group"><span data-i18n="labelTimelineHashtags"></span><div class="adv-checkbox-item" style="display: none;"><input type="checkbox" id="adv-filter-hashtags-include" disabled><label for="adv-filter-hashtags-include" data-i18n="checkInclude"></label></div><div class="adv-checkbox-item"><input type="checkbox" id="adv-filter-hashtags-exclude"><label for="adv-filter-hashtags-exclude" data-i18n="checkExclude"></label></div></div>
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
                  <div class="adv-zoom-root">
                    <div class="adv-tab-toolbar">
                        <div class="adv-tab-toolbar-left">
                            <input id="adv-history-search" class="adv-input" type="text" data-i18n-placeholder="placeholderSearchHistory">
                            <select id="adv-history-sort" class="adv-select" data-i18n-title="labelSortBy" title="Sort by:">
                                <option value="newest" data-i18n="sortNewest"></option>
                                <option value="oldest" data-i18n="sortOldest"></option>
                                <option value="name_asc" data-i18n="sortNameAsc"></option>
                                <option value="name_desc" data-i18n="sortNameDesc"></option>
                            </select>
                        </div>
                        <div class="adv-tab-toolbar-right">
                            <button id="adv-history-clear-all" class="adv-chip danger"></button>
                        </div>
                    </div>
                    <div id="adv-history-empty" class="adv-item-sub"></div>
                    <div id="adv-history-list" class="adv-list"></div>
                  </div>
                </div>

                <div class="adv-tab-content" id="adv-tab-saved">
                  <div class="adv-zoom-root">
                    <div id="adv-saved-empty" class="adv-item-sub"></div>
                    <div id="adv-saved-list" class="adv-list"></div>
                  </div>
                </div>

                <div class="adv-tab-content" id="adv-tab-lists">
                  <div class="adv-zoom-root">
                    <div id="adv-lists-empty" class="adv-item-sub"></div>
                    <div id="adv-lists-list" class="adv-list"></div>
                  </div>
                </div>

                <div class="adv-tab-content" id="adv-tab-accounts">
                  <div class="adv-zoom-root">
                    <div id="adv-accounts-empty" class="adv-item-sub"></div>
                    <div id="adv-accounts-list" class="adv-list"></div>
                  </div>
                </div>

                <!-- ▶ Mute タブ -->
                <div class="adv-tab-content" id="adv-tab-mute">
                  <div class="adv-zoom-root">
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
            <div id="adv-settings-modal" class="adv-settings-modal">
            <div class="adv-settings-dialog">
                <div class="adv-settings-header">
                    <div style="display:flex; align-items:center; gap:15px;">
                        <h3 class="adv-settings-title" data-i18n="settingsTitle"></h3>
                        <button id="adv-settings-reset" type="button" class="adv-chip danger" data-i18n="buttonReset"></button>
                    </div>
                    <button id="adv-settings-close" type="button" class="adv-settings-close" data-i18n-title="tooltipClose">&times;</button>
                </div>
                <div class="adv-settings-body">
                    <div class="adv-settings-group">
                        <label for="adv-settings-lang" data-i18n="labelUILang"></label>
                        <select id="adv-settings-lang">
                            <option value="" data-i18n="optUILangAuto"></option>
                            <option value="en">English</option>
                            <option value="ja">日本語</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                            <option value="pt-BR">Português (Brasil)</option>
                            <option value="ru">Русский</option>
                            <option value="ko">한국어</option>
                            <option value="zh-CN">简体中文</option>
                            <option value="zh-TW">繁體中文</option>
                        </select>
                    </div>
                    <div class="adv-settings-group">
                        <label data-i18n="labelImportExport"></label>
                        <div class="adv-settings-actions-inline">
                            <button id="adv-settings-export" type="button" class="adv-modal-button" data-i18n="buttonExport"></button>
                            <button id="adv-settings-import" type="button" class="adv-modal-button primary" data-i18n="buttonImport"></button>
                            <!-- ファイルインポート用（非表示） -->
                            <input id="adv-settings-file-input" type="file" accept="application/json" style="display:none">
                        </div>
                    </div>

                </div>
                <div class="adv-settings-footer">
                    <button id="adv-settings-close-footer" type="button" class="adv-modal-button" data-i18n="buttonClose"></button>
                </div>
            </div>
        </div>
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

        const LANG_OVERRIDE_KEY = 'advUILang_v1';
        // Settings で指定された UI 言語があれば、検出結果より優先して適用
        try {
            const overrideLang = kv.get(LANG_OVERRIDE_KEY, '');
            if (overrideLang && i18n.translations[overrideLang]) {
                i18n.lang = overrideLang;
            }
        } catch (_) {}

        const trigger = document.createElement('button');
        const HISTORY_SORT_KEY = 'advHistorySort_v1';
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

        const settingsModal = document.getElementById('adv-settings-modal');
        const settingsLangSel = document.getElementById('adv-settings-lang');
        const settingsFileInput = document.getElementById('adv-settings-file-input');
        const settingsOpenBtn = document.getElementById('adv-settings-button');
        const settingsCloseBtn = document.getElementById('adv-settings-close');
        const settingsCloseFooterBtn = document.getElementById('adv-settings-close-footer');
        const settingsExportBtn = document.getElementById('adv-settings-export');
        const settingsImportBtn = document.getElementById('adv-settings-import');
        const settingsResetBtn = document.getElementById('adv-settings-reset');

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
        const EXC_REPOSTS_KEY = 'advExcludeReposts_v1';
        const EXC_HASHTAGS_KEY = 'advExcludeTimelineHashtags_v1';
        const excNameEl   = document.getElementById('adv-exclude-hit-name');
        const excHandleEl = document.getElementById('adv-exclude-hit-handle');
        const excRepostsEl = document.getElementById('adv-filter-reposts-exclude');
        const excHashtagsEl = document.getElementById('adv-filter-hashtags-exclude');
        const loadExcludeFlags = () => ({
            name: kv.get(EXC_NAME_KEY, '1') === '1',
            handle: kv.get(EXC_HANDLE_KEY, '1') === '1',
            reposts: kv.get(EXC_REPOSTS_KEY, '0') === '1',
            hashtags: kv.get(EXC_HASHTAGS_KEY, '0') === '1',
        });
        const saveExcludeFlags = (v) => {
            kv.set(EXC_NAME_KEY, v.name ? '1':'0');
            kv.set(EXC_HANDLE_KEY, v.handle ? '1':'0');
            kv.set(EXC_REPOSTS_KEY, v.reposts ? '1':'0');
            kv.set(EXC_HASHTAGS_KEY, v.hashtags ? '1':'0');
        };
{
            const st = loadExcludeFlags();
            if (excNameEl) excNameEl.checked = st.name;
            if (excHandleEl) excHandleEl.checked = st.handle;
            if (excRepostsEl) excRepostsEl.checked = st.reposts;
            if (excHashtagsEl) excHashtagsEl.checked = st.hashtags;
        }
        [excNameEl, excHandleEl, excRepostsEl, excHashtagsEl].forEach(el=>{
            if (!el) return;
            el.addEventListener('change', ()=>{
                saveExcludeFlags({
                    name: excNameEl?.checked ?? false,
                    handle: excHandleEl?.checked ?? false,
                    reposts: excRepostsEl?.checked ?? false,
                    hashtags: excHashtagsEl?.checked ?? false,
                });
                scanAndFilterTweets();
            });
        });

        themeManager.observeChanges(modal, trigger);

        // Accounts/Listsタブの背景をドロップターゲットにするためのヘルパー
        const setupBackgroundDrop = (panel, host, unassignFunction) => {
            const feedbackClass = 'adv-bg-drop-active';
            const SECT_MIME = 'adv/folder'; // フォルダ並び替えD&DのMIME

            // panel 内の .adv-zoom-root もイベントの対象に追加
            const zoomRoot = panel?.querySelector('.adv-zoom-root');
            const eventTargets = [panel, host, zoomRoot].filter(Boolean); // イベントをリッスンする対象

            // ★ 修正: 破線を表示する対象は panel のみとする
            const feedbackTargets = [panel].filter(Boolean); // 破線を表示する対象

            const onDragEnter = (ev) => {
                // アイテム（text/plain）であり、セクション（adv/folder）ではない
                if (ev.dataTransfer.types && !ev.dataTransfer.types.includes(SECT_MIME) && ev.dataTransfer.types.includes('text/plain')) {
                    // ターゲットが panel, host, zoomRoot のいずれか
                    if (eventTargets.includes(ev.target)) {
                        // 破線は feedbackTargets に付ける (今回は panel のみ)
                        feedbackTargets.forEach(t => t.classList.add(feedbackClass));
                    }
                }
            };

            const onDragLeave = (ev) => {
                // ターゲット自身から離れた時だけフィードバックを消す
                if (eventTargets.includes(ev.target)) {
                    // 破線は feedbackTargets から消す
                    feedbackTargets.forEach(t => t.classList.remove(feedbackClass));
                }
            };

            const onDragOver = (ev) => {
                // dropイベントを発火させるために、dragoverでpreventDefaultが必要
                // アイテムであり、ターゲットが panel/host/zoomRoot 自身の場合のみ許可
                if (eventTargets.includes(ev.target) && ev.dataTransfer.types && !ev.dataTransfer.types.includes(SECT_MIME) && ev.dataTransfer.types.includes('text/plain')) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    // 破線は feedbackTargets に付け続ける
                    feedbackTargets.forEach(t => t.classList.add(feedbackClass));
                } else {
                    // 子要素（フォルダなど）の上に来たら背景ハイライトは消す
                    feedbackTargets.forEach(t => t.classList.remove(feedbackClass));
                    // 残っているフォルダー見出しの破線を確実に解除
                    document.querySelectorAll('.adv-folder-header[data-drop="1"]').forEach(el => { delete el.dataset.drop; });
                }
            };

            const onDrop = (ev) => {
                feedbackTargets.forEach(t => t.classList.remove(feedbackClass)); // ドロップ時は常にハイライト解除

                // 最終チェック：アイテムであり、パネル/ホスト/zoomRoot 自身へのドロップ
                if (eventTargets.includes(ev.target) && ev.dataTransfer.types && !ev.dataTransfer.types.includes(SECT_MIME) && ev.dataTransfer.types.includes('text/plain')) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const draggedId = ev.dataTransfer.getData('text/plain');
                    if (draggedId) {
                        unassignFunction(draggedId); // (unassignAccount または unassignList を実行)
                    }
                }
            };

            // イベントは eventTargets に登録する
            eventTargets.forEach(target => {
                if (!target) return; // hostがまだ存在しない場合など
                target.addEventListener('dragenter', onDragEnter);
                target.addEventListener('dragleave', onDragLeave);
                target.addEventListener('dragover', onDragOver);
                target.addEventListener('drop', onDrop);
            });
        };

        // --- generic unassign helper (de-duplicate) ---
        // Remove an item from all folders under FOLDERS_KEY,
        // then move the item to the top of the master list (Unassigned head).
        function unassignItemGeneric({ FOLDERS_KEY, loadItems, saveItems, itemId }) {
            // 1) remove from every folder
            const folders = loadFolders(FOLDERS_KEY, '');
            let changed = false;
            for (const f of folders) {
                const before = f.order.length;
                f.order = f.order.filter(id => id !== itemId);
                if (f.order.length !== before) { f.ts = Date.now(); changed = true; }
            }
            if (changed) saveFolders(FOLDERS_KEY, folders);

            // 2) bump the item to the head of the master list (Unassigned first)
            const all = loadItems();
            const hit = all.find(x => x.id === itemId);
            if (hit) {
                const next = [hit, ...all.filter(x => x.id !== itemId)];
                saveItems(next);
            }
        }

        // --- generic "move item to a folder" helper ---
        function moveItemToFolderGeneric({ FOLDERS_KEY, itemId, folderId }) {
            const fArr = loadFolders(FOLDERS_KEY, '');
            // remove from every folder
            for (const f of fArr) {
                const before = f.order.length;
                f.order = f.order.filter(id => id !== itemId);
                if (f.order.length !== before) f.ts = Date.now();
            }
            // add to head of the target folder
            const target = fArr.find(f => f.id === folderId);
            if (target) {
                target.order = [itemId, ...target.order.filter(id => id !== itemId)];
                target.ts = Date.now();
            }
            saveFolders(FOLDERS_KEY, fArr);
        }

        // === [ADD] 特化 move 関数（トースト＆再描画まで含む） ===
        function moveAccountToFolder(accountId, folderId) {
          moveItemToFolderGeneric({
            FOLDERS_KEY: ACCOUNTS_FOLDERS_KEY,
            itemId: accountId,
            folderId
          });
          showToast(i18n.t('toastReordered'));
          try { renderAccounts(); } catch(_) {}
        }

        function moveSavedToFolder(savedId, folderId) {
          moveItemToFolderGeneric({
            FOLDERS_KEY: SAVED_FOLDERS_KEY,
            itemId: savedId,
            folderId
          });
          showToast(i18n.t('toastReordered'));
          try { renderSaved(); } catch(_) {}
        }

        function moveListToFolder(listId, targetFolderId) {
          moveItemToFolderGeneric({
            FOLDERS_KEY: LISTS_FOLDERS_KEY,
            itemId: listId,
            folderId: targetFolderId
          });
          showToast(i18n.t('toastReordered'));
          try { renderLists(); } catch(_) {}
        }

        // 未分類化ロジックを共通化 (Account用)
        const unassignAccount = (draggedId) => {
            unassignItemGeneric({
                FOLDERS_KEY: ACCOUNTS_FOLDERS_KEY,
                loadItems: loadAccounts,
                saveItems: saveAccounts,
                itemId: draggedId,
            });
            showToast(i18n.t('toastReordered'));
            renderAccounts();
        };

        // 未分類化ロジックを共通化 (List用)
        const unassignList = (draggedId) => {
            unassignItemGeneric({
                FOLDERS_KEY: LISTS_FOLDERS_KEY,
                loadItems: loadLists,
                saveItems: saveLists,
                itemId: draggedId,
            });
            showToast(i18n.t('toastReordered'));
            renderLists();
        };

        // 未分類化ロジックを共通化 (Saved用)
        const unassignSaved = (draggedId) => {
            unassignItemGeneric({
                FOLDERS_KEY: SAVED_FOLDERS_KEY,
                loadItems: () => migrateList(loadJSON(SAVED_KEY, [])),
                saveItems: (arr) => saveJSON(SAVED_KEY, migrateList(arr)),
                itemId: draggedId,
            });
            showToast(i18n.t('toastReordered'));
            renderSaved();
        };

        /* ★タブごと保存に対応 */
        const ZOOM_KEYS = {
          search:  'advZoom_tab_search_v1',
          history: 'advZoom_tab_history_v1',
          saved:   'advZoom_tab_saved_v1',
          lists:   'advZoom_tab_lists_v1',
          accounts:'advZoom_tab_accounts_v1',
          mute:    'advZoom_tab_mute_v1',
        };
        const ZOOM_MIN = 0.5, ZOOM_MAX = 2.0, ZOOM_STEP = 0.1;

        /* 各タブの現在値（メモリキャッシュ） */
        const zoomByTab = {
          search:  1.0,
          history: 1.0,
          saved:   1.0,
          lists:   1.0,
          accounts:1.0,
          mute:    1.0,
        };

        const getActiveTabName = () => {
          const btn = document.querySelector('.adv-tab-btn.active');
          return btn?.dataset?.tab || 'search';
        };
        const getActiveZoomRoot = () =>
          document.querySelector('.adv-tab-content.active .adv-zoom-root') ||
          document.getElementById('adv-zoom-root');

        const clampZoom = z => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z*100)/100));

        const loadZoomFor = (tab) => {
          try {
            const k = ZOOM_KEYS[tab] || ZOOM_KEYS.search;
            // デフォルト値を '1' から分岐させる
            const defaultZoom = (tab === 'search') ? '0.87' : '1'; // 検索タブのみ 0.87 に
            const v = parseFloat(kv.get(k, defaultZoom)); // '1' だった部分を defaultZoom に変更
            if (!Number.isNaN(v)) zoomByTab[tab] = clampZoom(v);
          } catch {}
        };
        const saveZoomFor = (tab) => {
          try {
            const k = ZOOM_KEYS[tab] || ZOOM_KEYS.search;
            kv.set(k, String(zoomByTab[tab]));
          } catch {}
        };

        /* 初期ロード（全タブ） */
        Object.keys(zoomByTab).forEach(loadZoomFor);

        const applyZoom = () => {
          const tab = getActiveTabName();
          const el = getActiveZoomRoot();
          if (!el) return;
          const z = zoomByTab[tab] ?? 1.0;

          el.style.zoom = '';
          el.style.transform = '';
          el.style.width = '';

          if ('zoom' in el.style) {
            el.style.zoom = z;
          } else {
            el.style.transform = `scale(${z})`;
            el.style.width = `${(100 / z).toFixed(3)}%`;
          }
        };

        const setZoomActiveTab = (z) => {
          const tab = getActiveTabName();
          zoomByTab[tab] = clampZoom(z);
          applyZoom();
          saveZoomFor(tab);
        };

        /* タブ見出しは拡大しない：.adv-zoom-rootの内側だけ反応 */
        const onWheelZoom = (e) => {
          const isAccel = e.ctrlKey || e.metaKey;
          if (!isAccel) return;
          if (!e.target.closest('.adv-zoom-root')) return; // ★タブバー等は除外
          e.preventDefault();
          const tab = getActiveTabName();
          const cur = zoomByTab[tab] ?? 1.0;
          const factor = e.deltaY > 0 ? (1 - ZOOM_STEP) : (1 + ZOOM_STEP);
          setZoomActiveTab(cur * factor);
        };
        const onKeyZoom = (e) => {
          const accel = (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey;
          if (!accel) return;
          if (!e.target.closest('.adv-zoom-root')) return; // ★タブバー等は除外
          const k = e.key;
          const tab = getActiveTabName();
          const cur = zoomByTab[tab] ?? 1.0;
          if (k === '+' || k === '=') { e.preventDefault(); setZoomActiveTab(cur + ZOOM_STEP); }
          else if (k === '-' || k === '_') { e.preventDefault(); setZoomActiveTab(cur - ZOOM_STEP); }
          else if (k === '0') { e.preventDefault(); setZoomActiveTab(1.0); }
        };

        /* 初回適用＋表示時に再適用 */
        requestAnimationFrame(applyZoom);
        modal.addEventListener('wheel', onWheelZoom, { passive:false });
        modal.addEventListener('keydown', onKeyZoom);
        const modalDisplayObserver = new MutationObserver(() => {
          if (modal.style.display === 'flex') applyZoom();
        });
        modalDisplayObserver.observe(modal, { attributes:true, attributeFilter:['style'] });

        /* ★タブ切替時にもズーム再適用 */

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

        const SETTINGS_EXPORT_VERSION = 2;
        function buildSettingsExportJSON() {
          // タブごとのズーム
          const zoom = {};
          try {
            for (const [tab, key] of Object.entries(ZOOM_KEYS)) {
              zoom[tab] = kv.get(key, '1');
            }
          } catch (_) {}

          const safeParse = (key, def) => {
            try { return JSON.parse(kv.get(key, JSON.stringify(def))); } catch (_) { return def; }
          };

          const data = {
            v: SETTINGS_EXPORT_VERSION,

            // 言語・除外設定・ミュート
            lang: kv.get(LANG_OVERRIDE_KEY, ''),
            excludeFlags: loadExcludeFlags(),
            muteMaster: loadMuteMaster(),
            muted: loadMuted(),

            // 検索履歴・保存済み検索
            history: loadJSON(HISTORY_KEY, []),
            saved: loadJSON(SAVED_KEY, []),

            // シークレットモード・履歴ソート
            secret: kv.get(SECRET_KEY, '0') === '1',
            historySort: kv.get(HISTORY_SORT_KEY, 'newest'),

            // タブ状態
            tabs: {
              last: kv.get(LAST_TAB_KEY, 'search'),
              order: loadJSON(TABS_ORDER_KEY, []),
            },

            // モーダル／トリガー位置・サイズ
            modalState: safeParse(MODAL_STATE_KEY, null),
            triggerState: safeParse(TRIGGER_STATE_KEY, null),

            // ズーム
            zoom,

            // アカウント・リスト・各フォルダ
            accounts: (typeof loadAccounts === 'function') ? loadAccounts() : [],
            lists: (typeof loadLists === 'function') ? loadLists() : [],
            folders: {
              accounts: (typeof loadFolders === 'function' && typeof ACCOUNTS_FOLDERS_KEY !== 'undefined')
                ? loadFolders(ACCOUNTS_FOLDERS_KEY, '')
                : [],
              lists: (typeof loadFolders === 'function' && typeof LISTS_FOLDERS_KEY !== 'undefined')
                ? loadFolders(LISTS_FOLDERS_KEY, '')
                : [],
              saved: (typeof loadFolders === 'function' && typeof SAVED_FOLDERS_KEY !== 'undefined')
                ? loadFolders(SAVED_FOLDERS_KEY, i18n.t('defaultSavedFolders'))
                : [],
            },

            // Unassigned の挿入位置
            unassignedIndex: {
              saved: parseInt(kv.get('advSavedUnassignedIndex_v1', '0'), 10) || 0,
              accounts: parseInt(kv.get('advAccountsUnassignedIndex_v1', '0'), 10) || 0,
              lists: parseInt(kv.get('advListsUnassignedIndex_v1', '0'), 10) || 0,
            },
          };

          return JSON.stringify(data, null, 2);
        }

        function applySettingsImportJSON(text) {
          let data;
          try {
            data = JSON.parse(text);
          } catch (_) {
            alert('Invalid JSON');
            return false;
          }
          if (!data || typeof data !== 'object') {
            alert('Invalid JSON');
            return false;
          }

          // --- 基本設定（v1/v2 共通） ---
          if (data.lang !== undefined) {
            try { kv.set(LANG_OVERRIDE_KEY, data.lang || ''); } catch (_) {}
          }

          if (data.excludeFlags) {
            saveExcludeFlags({
              name: !!data.excludeFlags.name,
              handle: !!data.excludeFlags.handle,
              reposts: !!data.excludeFlags.reposts,
              hashtags: !!data.excludeFlags.hashtags,
            });
          }

          if (Array.isArray(data.muted)) {
            saveMuted(data.muted);
          }

          if (typeof data.muteMaster === 'boolean') {
            saveMuteMaster(data.muteMaster);
          }

          // --- v2 以降で追加された保存データ（存在する場合のみ適用） ---
          if (Array.isArray(data.history)) {
            saveJSON(HISTORY_KEY, data.history);
          }
          if (Array.isArray(data.saved)) {
            saveJSON(SAVED_KEY, data.saved);
          }
          if (typeof data.secret === 'boolean') {
            try { kv.set(SECRET_KEY, data.secret ? '1' : '0'); } catch (_) {}
          }
          if (data.historySort) {
            try { kv.set(HISTORY_SORT_KEY, data.historySort); } catch (_) {}
          }
          if (data.tabs && typeof data.tabs === 'object') {
            if (data.tabs.last) {
              try { kv.set(LAST_TAB_KEY, data.tabs.last); } catch (_) {}
            }
            if (Array.isArray(data.tabs.order)) {
              saveJSON(TABS_ORDER_KEY, data.tabs.order);
            }
          }
          if (data.modalState) {
            try { kv.set(MODAL_STATE_KEY, JSON.stringify(data.modalState)); } catch (_) {}
          }
          if (data.triggerState) {
            try { kv.set(TRIGGER_STATE_KEY, JSON.stringify(data.triggerState)); } catch (_) {}
          }
          if (data.zoom && typeof data.zoom === 'object') {
            try {
              for (const [tab, key] of Object.entries(ZOOM_KEYS)) {
                if (data.zoom[tab] != null) {
                  kv.set(key, String(data.zoom[tab]));
                }
              }
            } catch (_) {}
          }

          if (Array.isArray(data.accounts) && typeof saveAccounts === 'function') {
            try { saveAccounts(data.accounts); } catch (_) {}
          }
          if (Array.isArray(data.lists) && typeof saveLists === 'function') {
            try { saveLists(data.lists); } catch (_) {}
          }

          if (data.folders && typeof data.folders === 'object') {
            if (Array.isArray(data.folders.accounts) &&
                typeof saveFolders === 'function' &&
                typeof ACCOUNTS_FOLDERS_KEY !== 'undefined') {
              try { saveFolders(ACCOUNTS_FOLDERS_KEY, data.folders.accounts); } catch (_) {}
            }
            if (Array.isArray(data.folders.lists) &&
                typeof saveFolders === 'function' &&
                typeof LISTS_FOLDERS_KEY !== 'undefined') {
              try { saveFolders(LISTS_FOLDERS_KEY, data.folders.lists); } catch (_) {}
            }
            if (Array.isArray(data.folders.saved) &&
                typeof saveFolders === 'function' &&
                typeof SAVED_FOLDERS_KEY !== 'undefined') {
              try { saveFolders(SAVED_FOLDERS_KEY, data.folders.saved); } catch (_) {}
            }
          }

          if (data.unassignedIndex && typeof data.unassignedIndex === 'object') {
            if ('saved' in data.unassignedIndex) {
              try { kv.set('advSavedUnassignedIndex_v1', String(data.unassignedIndex.saved | 0)); } catch (_) {}
            }
            if ('accounts' in data.unassignedIndex) {
              try { kv.set('advAccountsUnassignedIndex_v1', String(data.unassignedIndex.accounts | 0)); } catch (_) {}
            }
            if ('lists' in data.unassignedIndex) {
              try { kv.set('advListsUnassignedIndex_v1', String(data.unassignedIndex.lists | 0)); } catch (_) {}
            }
          }

          // 言語を再適用
          try {
            const override = kv.get(LANG_OVERRIDE_KEY, '');
            if (override && i18n.translations[override]) {
              i18n.lang = override;
            } else if (!override) {
              i18n.init();
            }
          } catch (_) {}

          try {
            i18n.apply(document.getElementById('advanced-search-modal'));
            i18n.apply(document.getElementById('adv-settings-modal'));
          } catch (_) {}

          try { applySecretBtn(); } catch (_) {}
          try { renderHistory(); } catch (_) {}
          try { renderSaved(); } catch (_) {}
          try { renderLists(); } catch (_) {}
          try { renderAccounts(); } catch (_) {}
          try { renderMuted(); } catch (_) {}
          try { scanAndFilterTweets(); } catch (_) {}

          showToast(i18n.t('toastImported'));
          return true;
        }

        // マスターON/OFF（全体の適用を止めるだけ。各エントリの enabled は保持）
        const MUTE_MASTER_KEY = 'advMuteMasterEnabled_v1';
        const LAST_TAB_KEY = 'advSearchLastTab_v1';
        const TABS_ORDER_KEY = 'advTabsOrder_v1';
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
        const tabSavedPanel    = document.getElementById('adv-tab-saved');

        // タブの順序を読み込んで適用
        (function applyTabsOrder() {
          const tabsContainer = document.querySelector('.adv-tabs');
          if (!tabsContainer) return;

          // 現在のボタンを data-tab をキーにした Map として保持
          const currentButtons = new Map();
          const defaultOrder = [];
          tabsContainer.querySelectorAll('.adv-tab-btn[data-tab]').forEach(btn => {
              const tabName = btn.dataset.tab;
              if (tabName) {
                  currentButtons.set(tabName, btn);
                  defaultOrder.push(tabName);
              }
          });

          // 保存された順序を読み込む
          const savedOrder = loadJSON(TABS_ORDER_KEY, defaultOrder);

          // 保存された順序を検証し、不足分を補う
          const finalOrder = [];
          const seen = new Set();
          // 1. 保存された順序のうち、現在も存在するものを追加
          savedOrder.forEach(tabName => {
              if (currentButtons.has(tabName)) {
                  finalOrder.push(tabName);
                  seen.add(tabName);
              }
          });
          // 2. デフォルト順序のうち、まだ追加されていないもの（＝新しいタブ）を末尾に追加
          defaultOrder.forEach(tabName => {
              if (!seen.has(tabName)) {
                  finalOrder.push(tabName);
              }
          });

          // 順序が実際に変更されているか確認
          if (JSON.stringify(savedOrder) !== JSON.stringify(finalOrder)) {
              saveJSON(TABS_ORDER_KEY, finalOrder);
          }

          // DOMを並び替える
          finalOrder.forEach(tabName => {
              const btn = currentButtons.get(tabName);
              if (btn) {
                  tabsContainer.appendChild(btn);
              }
          });
          // tabButtons 配列も再取得（順序が変更されたため）
          tabButtons.splice(0, tabButtons.length, ...Array.from(document.querySelectorAll('.adv-tab-btn')));
        })();

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
            // フォームリセット時に disabled を解除
            ['verified', 'links', 'images', 'videos'].forEach(groupName => {
                const includeEl = document.getElementById(`adv-filter-${groupName}-include`);
                const excludeEl = document.getElementById(`adv-filter-${groupName}-exclude`);
                if (includeEl) includeEl.disabled = false;
                if (excludeEl) excludeEl.disabled = false;
            });
            try {
              const st = loadExcludeFlags();
              const nameEl   = document.getElementById('adv-exclude-hit-name');
              const handleEl = document.getElementById('adv-exclude-hit-handle');
              const repostsEl = document.getElementById('adv-filter-reposts-exclude');
              const hashtagsEl = document.getElementById('adv-filter-hashtags-exclude');
              if (nameEl)   { nameEl.checked = nameEl.defaultChecked = !!st.name; }
              if (handleEl) { handleEl.checked = handleEl.defaultChecked = !!st.handle; }
              if (repostsEl) { repostsEl.checked = repostsEl.defaultChecked = !!st.reposts; }
              if (hashtagsEl) { hashtagsEl.checked = hashtagsEl.defaultChecked = !!st.hashtags; }
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

            // フィルタ適用後に disabled 状態を再評価
            ['verified', 'links', 'images', 'videos'].forEach(groupName => {
                const includeEl = document.getElementById(`adv-filter-${groupName}-include`);
                const excludeEl = document.getElementById(`adv-filter-${groupName}-exclude`);
                if (!includeEl || !excludeEl) return;
                if (includeEl.checked) excludeEl.disabled = true;
                if (excludeEl.checked) includeEl.disabled = true;
            });

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

        function openSettingsModal() {
          if (!settingsModal) return;
          settingsModal.style.display = 'flex';
          try {
            const override = kv.get(LANG_OVERRIDE_KEY, '');
            if (settingsLangSel) settingsLangSel.value = override || '';
          } catch (_) {}

          try {
            const dialog = settingsModal.querySelector('.adv-settings-dialog');
            themeManager.applyTheme(dialog, trigger);
          } catch (_) {}
        }

        function closeSettingsModal() {
          if (!settingsModal) return;
          settingsModal.style.display = 'none';
        }

        if (settingsOpenBtn) {
          settingsOpenBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            openSettingsModal();
          });
        }
        if (settingsCloseBtn) {
          settingsCloseBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            closeSettingsModal();
          });
        }
        if (settingsCloseFooterBtn) {
          settingsCloseFooterBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            closeSettingsModal();
          });
        }
        if (settingsModal) {
          settingsModal.addEventListener('click', (e)=>{
            if (e.target === settingsModal) {
              closeSettingsModal();
            }
          });
        }

        if (settingsExportBtn) {
          settingsExportBtn.addEventListener('click', () => {
            const json = buildSettingsExportJSON();
            try {
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');

              const now = new Date();
              const pad = (n) => String(n).padStart(2, '0');
              const fname =
                `search-hub-backup-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}` +
                `-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.json`;

              a.href = url;
              a.download = fname;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } catch (_) {
              // 失敗しても、とりあえずトーストだけは出す
            }
            showToast(i18n.t('toastExported'));
          });
        }

        if (settingsImportBtn && settingsFileInput) {
          let importResetTimer = null;

          settingsImportBtn.addEventListener('click', () => {
            settingsFileInput.click();
          });

          settingsFileInput.addEventListener('change', () => {
            const file = settingsFileInput.files && settingsFileInput.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              let ok = false;
              try {
                ok = applySettingsImportJSON(String(reader.result || ''));
              } finally {
                // 同じファイルを続けて選べるようにリセット
                settingsFileInput.value = '';
              }

              if (ok && settingsImportBtn) {
                const successLabel = i18n.t('buttonImportSuccess');
                const normalLabel  = i18n.t('buttonImport');

                settingsImportBtn.textContent = successLabel;
                settingsImportBtn.disabled = true;

                if (importResetTimer) clearTimeout(importResetTimer);
                importResetTimer = setTimeout(() => {
                  settingsImportBtn.disabled = false;
                  settingsImportBtn.textContent = normalLabel;
                }, 2000);
              }
            };
            reader.readAsText(file);
          });
        }

        if (settingsResetBtn) {
          settingsResetBtn.addEventListener('click', () => {
            if (!confirm(i18n.t('confirmResetAll'))) return;

            const KEYS_TO_DELETE = [
              MODAL_STATE_KEY,
              TRIGGER_STATE_KEY,
              HISTORY_KEY,
              SAVED_KEY,
              SECRET_KEY,
              MUTE_KEY,
              MUTE_MASTER_KEY,
              LAST_TAB_KEY,
              TABS_ORDER_KEY,
              LANG_OVERRIDE_KEY,
              HISTORY_SORT_KEY,
              EXC_NAME_KEY,
              EXC_HANDLE_KEY,
              EXC_REPOSTS_KEY,
              EXC_HASHTAGS_KEY,
              'advSavedUnassignedIndex_v1',
              'advAccountsUnassignedIndex_v1',
              'advListsUnassignedIndex_v1',
              ...Object.values(ZOOM_KEYS),
            ];

            KEYS_TO_DELETE.forEach(k => {
              try { kv.del(k); } catch (_) {}
            });

            // 各種配列系は空配列で上書き
            try { saveMuted([]); } catch (_) {}
            try { saveJSON(HISTORY_KEY, []); } catch (_) {}
            try { saveJSON(SAVED_KEY, []); } catch (_) {}
            try { saveAccounts([]); } catch (_) {}
            try { saveLists([]); } catch (_) {}
            try { saveFolders(ACCOUNTS_FOLDERS_KEY, []); } catch (_) {}
            try { saveFolders(LISTS_FOLDERS_KEY, []); } catch (_) {}
            try { saveFolders(SAVED_FOLDERS_KEY, []); } catch (_) {}

            // ズームキャッシュとパースキャッシュもリセット
            try {
              Object.keys(zoomByTab).forEach(tab => {
                zoomByTab[tab] = (tab === 'search') ? 0.87 : 1.0;
              });
            } catch (_) {}
            __cachedSearchTokens = null;
            __cachedSearchQuery = null;

            // 言語設定を再適用（オーバーライドがなければ自動検出）
            try {
              const override = kv.get(LANG_OVERRIDE_KEY, '');
              if (override && i18n.translations[override]) {
                i18n.lang = override;
              } else {
                i18n.init();
              }
            } catch (_) {
              i18n.init();
            }

            try {
              i18n.apply(document.getElementById('advanced-search-modal'));
              i18n.apply(document.getElementById('adv-settings-modal'));
            } catch (_) {}

            // UI 状態を初期化
            try {
              parseQueryAndApplyToModal('');
              applyScopesToControls({ pf: false, lf: false });
              applySecretBtn();
              renderHistory();
              renderSaved();
              renderLists();
              renderAccounts();
              renderMuted();
              updateSaveButtonState();
              scanAndFilterTweets();
            } catch (_) {}

            // モーダル位置・サイズをデフォルトに近い状態へ戻す
            try {
              modal.style.width = '';
              modal.style.height = '';
              modal.style.left = '';
              modal.style.right = '';
              modal.style.top = '';
              modal.style.bottom = '';
              loadModalState();
            } catch (_) {}

            // トリガーボタンの位置もリセット
            try {
              trigger.style.left = '';
              trigger.style.right = '';
              trigger.style.top = '';
              trigger.style.bottom = '';
              applyTriggerStoredPosition();
              keepTriggerInViewport();
            } catch (_) {}

            showToast(i18n.t('toastReset'));
          });
        }

        if (settingsLangSel) {
          settingsLangSel.addEventListener('change', ()=>{
            const v = settingsLangSel.value;
            try { kv.set(LANG_OVERRIDE_KEY, v || ''); } catch (_) {}
            if (v && i18n.translations[v]) {
              i18n.lang = v;
            } else {
              i18n.init();
              try {
                const override = kv.get(LANG_OVERRIDE_KEY, '');
                if (override && i18n.translations[override]) i18n.lang = override;
              } catch (_) {}
            }

            try {
              i18n.apply(document.getElementById('advanced-search-modal'));
              i18n.apply(document.getElementById('adv-settings-modal'));
            } catch (_) {}

            trigger.setAttribute('aria-label', i18n.t('tooltipTrigger'));
            historyClearAllBtn.textContent = i18n.t('historyClearAll');
            applySecretBtn();

            try { renderHistory(); } catch (_) {}
            try { renderSaved(); } catch (_) {}
            try { renderLists(); } catch (_) {}
            try { renderAccounts(); } catch (_) {}
            try { renderMuted(); } catch (_) {}
          });
        }

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
            // 最後に開いたタブを保存
            try {
                kv.set(LAST_TAB_KEY, name);
            } catch(e) {
                console.error('Failed to save last tab state:', e);
            }
            if (name === 'history') renderHistory();
            if (name === 'saved') renderSaved();
            if (name === 'lists') renderLists();
            if (name === 'accounts') renderAccounts();
            if (name === 'mute') renderMuted();
            if (name === 'search') updateSaveButtonState();

            /* タブ切替ごとに該当タブのズーム率を反映 */
            applyZoom();
        };

        // タブのクリックイベントとD&Dイベントリスナーをセットアップ
        (function setupTabDragAndDrop() {
            const tabsContainer = document.querySelector('.adv-tabs');
            if (!tabsContainer) return;

            tabButtons.forEach(btn => {
                // 1. クリックイベント（既存のロジック）
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    activateTab(btn.dataset.tab);
                });

                // 2. D&Dイベント（新規）
                btn.draggable = true;

                btn.addEventListener('dragstart', (ev) => {
                    btn.classList.add('dragging');
                    ev.dataTransfer.setData('text/plain', btn.dataset.tab);
                    ev.dataTransfer.effectAllowed = 'move';
                });

                btn.addEventListener('dragend', () => {
                    btn.classList.remove('dragging');
                });
            });

            tabsContainer.addEventListener('dragover', (ev) => {
                ev.preventDefault();
                const dragging = tabsContainer.querySelector('.adv-tab-btn.dragging');
                if (!dragging) return;

                // 水平方向の挿入位置を計算
                const after = getDragAfterElementHorizontal(tabsContainer, ev.clientX, '.adv-tab-btn');
                if (after == null) {
                    tabsContainer.appendChild(dragging);
                } else {
                    tabsContainer.insertBefore(dragging, after);
                }
            });

            tabsContainer.addEventListener('drop', (ev) => {
                ev.preventDefault();
                const dragging = tabsContainer.querySelector('.adv-tab-btn.dragging');
                if (dragging) {
                    dragging.classList.remove('dragging');
                }

                // 最終的な順序をDOMから読み取って保存
                const newOrder = [...tabsContainer.querySelectorAll('.adv-tab-btn[data-tab]')]
                    .map(btn => btn.dataset.tab)
                    .filter(Boolean);

                saveJSON(TABS_ORDER_KEY, newOrder);
                // tabButtons 配列も更新
                tabButtons.splice(0, tabButtons.length, ...Array.from(document.querySelectorAll('.adv-tab-btn')));
                showToast(i18n.t('toastReordered'));
            });
        })();

        const scopeChipsHTML = (pf, lf) => {
            const chips = [];
            if (pf) chips.push(`<span class="adv-chip scope" role="note">${i18n.t('chipFollowing')}</span>`);
            if (lf) chips.push(`<span class="adv-chip scope" role="note">${i18n.t('chipNearby')}</span>`);
            return chips.join('');
        };

        const historyEmptyEl = document.getElementById('adv-history-empty');
        const historyListEl = document.getElementById('adv-history-list');
        const historySearchEl = document.getElementById('adv-history-search');
        const historySortEl = document.getElementById('adv-history-sort');

        const renderHistory = () => {
          const listAll = migrateList(loadJSON(HISTORY_KEY, []));

          // 1. Get filter/sort values
          const q = (historySearchEl?.value || '').toLowerCase().trim();
          const sort = historySortEl?.value || kv.get(HISTORY_SORT_KEY, 'newest');
          if (historySortEl && historySortEl.value !== sort) {
            historySortEl.value = sort;
          }

          // 2. Filter
          const listFiltered = q
            ? listAll.filter(item => (item.q || '').toLowerCase().includes(q))
            : listAll;

          // 3. Sort
          const listSorted = listFiltered.sort((a, b) => {
            switch (sort) {
              case 'oldest': return (a.ts || 0) - (b.ts || 0);
              case 'name_asc': return (a.q || '').localeCompare(b.q || '');
              case 'name_desc': return (b.q || '').localeCompare(a.q || '');
              case 'newest':
              default:
                return (b.ts || 0) - (a.ts || 0);
            }
          });

          // 4. Render
          historyListEl.innerHTML = '';
          historyEmptyEl.textContent = listAll.length === 0 ? i18n.t('emptyHistory') : '';

          listSorted.forEach(item => {
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
              // activateTab('search');
              executeSearch({ pf: item.pf, lf: item.lf });
            });

            row.querySelector('[data-action="delete"]').addEventListener('click', () => {
              deleteHistory(item.id);
            });

            historyListEl.appendChild(row);
          });
        };

        historyClearAllBtn.addEventListener('click', clearAllHistory);

        // 履歴タブの検索とソートのイベントリスナー
        if (historySearchEl) {
          historySearchEl.addEventListener('input', debounce(renderHistory, 150));
        }
        if (historySortEl) {
          historySortEl.value = kv.get(HISTORY_SORT_KEY, 'newest'); // 初期値を設定
          historySortEl.addEventListener('change', () => {
            kv.set(HISTORY_SORT_KEY, historySortEl.value);
            renderHistory();
          });
        }

        const savedEmptyEl = document.getElementById('adv-saved-empty');
        const savedListEl = document.getElementById('adv-saved-list');

        const renderSaved = () => {
          ensureFolderToolbars();

          const itemsLoader = () => migrateList(loadJSON(SAVED_KEY, []));
          const itemsSaver  = (arr) => saveJSON(SAVED_KEY, migrateList(arr));

          renderFolderedCollection({
            hostId: 'adv-saved-list',
            emptyId: 'adv-saved-empty',
            filterSelectId: 'adv-saved-folder-filter',
            searchInputId:  'adv-saved-search',
            newFolderBtnId: 'adv-saved-new-folder',

            foldersKey: SAVED_FOLDERS_KEY,
            defaultFolderName: i18n.t('defaultSavedFolders'),

            loadItems: itemsLoader,
            saveItems: itemsSaver,
            renderRow: (item) => {
              // 以前の renderSavedRow と同じ見た目
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
                  <button class="adv-chip danger"  data-action="delete">${i18n.t('delete')}</button>
                </div>
              `;
              row.querySelector('[data-action="run"]').addEventListener('click', ()=>{
                parseQueryAndApplyToModal(item.q);
                applyScopesToControls({pf:!!item.pf, lf:!!item.lf});
                // activateTab('search');
                executeSearch({pf:item.pf, lf:item.lf});
              });
              row.querySelector('[data-action="delete"]').addEventListener('click', ()=> deleteSaved(item.id));

              row.addEventListener('dragstart', (ev) => {
                row.classList.add('dragging');
                ev.dataTransfer.setData('text/plain', item.id);
                ev.dataTransfer.effectAllowed = 'move';
              });
              row.addEventListener('dragend', () => row.classList.remove('dragging'));
              return row;
            },

            onUnassign: unassignSaved,
            onMoveToFolder: moveSavedToFolder,

            emptyMessage: i18n.t('emptySaved'),
            unassignedIndexKey: 'advSavedUnassignedIndex_v1',
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

        // === [ADD] セクション（フォルダ/Unassigned）用：縦方向の挿入位置計算 ===
        function getSectionAfterElement(container, y) {
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
        }

        // === [ADD] 汎用フォルダ描画レンダラ ===
        // 各タブ（Saved/Accounts/Listsなど）の重複ロジックを1か所に集約します。
        function renderFolderedCollection(cfg) {
          const {
            // 固有ID/キー
            hostId, emptyId,
            filterSelectId, searchInputId, newFolderBtnId,
            foldersKey, defaultFolderName,
            // データI/O
            loadItems, saveItems, loadFoldersFn = loadFolders, saveFoldersFn = saveFolders,
            // Row描画/操作
            renderRow, onUnassign, onMoveToFolder,
            // 文言/保存キー
            emptyMessage,
            unassignedIndexKey, // ex: 'advAccountsUnassignedIndex_v1' / 'advSavedUnassignedIndex_v1'
          } = cfg;

          // ツールバーは呼び出し側で ensureFolderToolbars() してある前提
          const host   = document.getElementById(hostId);
          const empty  = document.getElementById(emptyId);
          const sel    = document.getElementById(filterSelectId);
          const qInput = document.getElementById(searchInputId);
          const addBtn = document.getElementById(newFolderBtnId);
          if (!host) return;

          // 1) データロード
          const items = loadItems();
          let folders = loadFoldersFn(foldersKey, defaultFolderName);
          const idToItem = Object.fromEntries(items.map(x => [x.id, x]));

          // 2) 死票掃除（フォルダの order から存在しないIDを除去）
          let needSave = false;
          for (const f of folders) {
            const before = f.order.length;
            f.order = f.order.filter(id => !!idToItem[id]);
            if (f.order.length !== before) { needSave = true; f.ts = Date.now(); }
          }
          if (needSave) saveFoldersFn(foldersKey, folders);

          // 3) 未所属セット
          const allIds    = new Set(items.map(x => x.id));
          const inFolders = new Set(folders.flatMap(f => f.order));
          const unassignedIds = [...allIds].filter(id => !inFolders.has(id));

          // 4) フィルタUI（セレクト＆検索＆新規フォルダ）
          if (sel) {
            const prev = sel.value;
            sel.innerHTML = '';
            const optAll = document.createElement('option'); optAll.value='__ALL__'; optAll.textContent=i18n.t('folderFilterAll'); sel.appendChild(optAll);
            const optUn  = document.createElement('option'); optUn.value='__UNASSIGNED__'; optUn.textContent=i18n.t('folderFilterUnassigned'); sel.appendChild(optUn);
            folders.forEach(f=>{
              const o = document.createElement('option'); o.value = f.id; o.textContent = f.name; sel.appendChild(o);
            });
            sel.value = [...sel.options].some(o=>o.value===prev) ? prev : '__ALL__';
            sel.onchange = () => renderFolderedCollection(cfg);
          }
          if (qInput && !qInput._advBound) {
            qInput._advBound = true;
            // debounce を適用
            qInput.addEventListener('input', debounce(() => renderFolderedCollection(cfg), 150));
          }
          if (addBtn && !addBtn._advBound) {
            addBtn._advBound = true;
            addBtn.addEventListener('click', () => {
              const nm = prompt(i18n.t('promptNewFolder'), '');
              if (!nm || !nm.trim()) return;
              const fs = loadFoldersFn(foldersKey, defaultFolderName);
              fs.push({ id: uid(), name: nm.trim(), order: [], ts: Date.now() });
              saveFoldersFn(foldersKey, fs);
              renderFolderedCollection(cfg);
            });
          }

          const filterFolder = sel?.value || '__ALL__';
          const q = (qInput?.value || '').toLowerCase().trim();

          const matchItem = (it) => {
            // Saved: it.q, Accounts: it.name/handle …など、row renderer 側の表示に合わせて検索したい場合は
            // 各タブ側の renderRow が構成する代表的フィールドを想定しておく
            const s = JSON.stringify(it || {}).toLowerCase();
            return !q || s.includes(q);
          };

          host.innerHTML = '';
          empty.textContent = items.length ? '' : (emptyMessage || '');

          // 5) Unassigned インデックス保持
          const getUnIdx = () => {
            try { const v = GM_getValue(unassignedIndexKey, 0); return Math.max(0, Math.min(folders.length, +v || 0)); }
            catch { return 0; }
          };
          const setUnIdx = (idx) => { try { GM_setValue(unassignedIndexKey, String(idx)); } catch {} };

          // 6) 表示対象フォルダ
          const foldersToDraw =
            filterFolder === '__ALL__'        ? [...folders] :
            filterFolder === '__UNASSIGNED__' ? [] :
            folders.filter(f => f.id === filterFolder);

          // 7) セクション並び（__ALL__ の場合のみ Unassigned を混在）
          const buildSectionsOrder = () => {
            if (filterFolder !== '__ALL__') return foldersToDraw.map(f => f.id);
            const idx = getUnIdx();
            const arr = foldersToDraw.map(f => f.id);
            arr.splice(Math.max(0, Math.min(arr.length, idx)), 0, '__UNASSIGNED__');
            return arr;
          };

          // 8) DOM → 順序保存
          const persistSectionsFromDOM = () => {
            const order = [...host.querySelectorAll('.adv-folder, .adv-unassigned')].map(sec => sec.dataset.folderId);

            // フォルダ順（Unassigned を除いた順序で保存）
            const newFolderOrderIds = [...new Set(order.filter(id => id !== '__UNASSIGNED__'))];
            let fs = loadFoldersFn(foldersKey, defaultFolderName);
            const map = Object.fromEntries(fs.map(f => [f.id, f]));
            const reordered = newFolderOrderIds.map(id => map[id]).filter(Boolean);
            fs.forEach(f => { if (!reordered.includes(f)) reordered.push(f); });
            saveFoldersFn(foldersKey, reordered);

            // Unassigned の位置を保存
            const unIdx = order.indexOf('__UNASSIGNED__');
            if (unIdx >= 0) setUnIdx(unIdx);

            showToast(i18n.t('toastReordered'));
          };

          // 9) Unassigned セクション
          const renderUnassignedSection = () => {
            const sec = document.createElement('section');
            sec.className = 'adv-unassigned';
            sec.dataset.folderId = '__UNASSIGNED__';
            sec.setAttribute('draggable', 'true');

            const list = document.createElement('div'); list.className = 'adv-list';

            const itemsUn = unassignedIds.map(id => idToItem[id]).filter(Boolean).filter(matchItem);
            itemsUn.forEach(it => list.appendChild(renderRow(it)));

            // セクションD&D（セクション入替）
            const SECT_MIME = 'adv/folder';
            sec.addEventListener('dragstart', (ev) => {
              const item = ev.target.closest('.adv-item');
              if (!item) {
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

            // アイテムのプレビュー移動（DOM）
            list.addEventListener('dragover', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return; // セクションD&Dは無視
              ev.preventDefault(); ev.stopPropagation();
              const dragging = document.querySelector('.adv-item.dragging');
              if (!dragging) return;
              const after = getDragAfterElement(list, ev.clientY);
              if (after == null) list.appendChild(dragging);
              else list.insertBefore(dragging, after);
            });

            // ▼「未分類化」ハンドラ（セクション背景用）
            // フォルダからドロップされた場合に "先頭に移動" させる。
            const dropToUnassign = (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault(); ev.stopPropagation();
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (draggedId) onUnassign(draggedId); // onUnassign は "先頭に移動" する
            };

            // ▼「未分類アイテムの並び替え」ハンドラ（リスト本体用）
            // 未分類リスト内での並び替え、またはフォルダから特定位置へのドロップ。
            const dropToReorderUnassigned = (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault(); ev.stopPropagation();
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;

              // 1. DOMの視覚的な順序（dragoverで変更済み）をID配列として読み取る
              const newOrderIdsInList = [...list.querySelectorAll('.adv-item')].map(el => el.dataset.id);

              // 2. マスターリスト（全アイテム）とフォルダ内アイテムの情報をロード
              const allItems = loadItems();
              const allItemsMap = new Map(allItems.map(it => [it.id, it]));
              const allFolderItems = new Set(folders.flatMap(f => f.order));

              // 3. 新しいマスターリストを構築
              const nextMasterList = [];
              const seen = new Set();

              // 3a. まず、DOMから読み取った「未分類の新しい順序」でアイテムを追加
              for (const id of newOrderIdsInList) {
                // このリストにあるべきアイテム（＝マスターに存在し、フォルダに属さない）のみ
                if (id && allItemsMap.has(id) && !allFolderItems.has(id)) {
                  nextMasterList.push(allItemsMap.get(id));
                  seen.add(id);
                }
              }

              // 3b. 次に、残りのアイテム（全フォルダ内のアイテム＋何らかの理由で漏れた未分類アイテム）を追加
              // これにより、マスターリストの順序は「未分類の並び替え順」＋「それ以外」となる
              for (const item of allItems) {
                if (!seen.has(item.id)) {
                  nextMasterList.push(item);
                }
              }

              // 4. マスターリストを保存
              saveItems(nextMasterList);

              // 5. もしアイテムがフォルダから移動してきた場合、フォルダから削除（クリーンアップ）
              const fs = loadFoldersFn(foldersKey, defaultFolderName);
              let folderChanged = false;
              for (const f of fs) {
                const before = f.order.length;
                f.order = f.order.filter(id => id !== draggedId);
                if (f.order.length !== before) { f.ts = Date.now(); folderChanged = true; }
              }

              if (folderChanged) {
                saveFoldersFn(foldersKey, fs);
                // フォルダ構成が変わった場合は、リスト全体を再描画
                showToast(i18n.t('toastReordered'));
                renderFolderedCollection(cfg);
              } else {
                // 未分類内での移動だけなら再描画は不要（DOMは更新済み）
                showToast(i18n.t('toastReordered'));
              }
            };

            // ▼ リスト本体には「並び替え」を、セクション背景には「未分類化」を割り当てる
            list.addEventListener('drop', dropToReorderUnassigned);
            sec.addEventListener('dragover', ev => { if (!(ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME))) { ev.preventDefault(); ev.stopPropagation(); }});
            sec.addEventListener('drop', dropToUnassign);

            sec.appendChild(list);
            return sec;
          };

          // 10) フォルダセクション
          const renderFolderSection = (folder) => {
            const section = document.createElement('section');
            section.className = 'adv-folder';
            section.dataset.folderId = folder.id;
            if (folder.collapsed) section.classList.add('adv-folder-collapsed');

            const header = document.createElement('div');
            header.className = 'adv-folder-header';
            header.setAttribute('draggable', 'true');

            const toggleBtn = renderFolderToggleButton(!!folder.collapsed);
            const titleWrap = document.createElement('div'); titleWrap.className = 'adv-folder-title';
            titleWrap.appendChild(toggleBtn);
            const nameEl = document.createElement('strong'); nameEl.textContent = folder.name; titleWrap.appendChild(nameEl);
            const countEl = document.createElement('span'); countEl.className='adv-item-sub'; countEl.textContent = `(${folder.order.length})`;
            titleWrap.appendChild(countEl);

            const actions = document.createElement('div');
            actions.className = 'adv-folder-actions';
            actions.innerHTML = `
              <button class="adv-chip"        data-action="rename"  title="${i18n.t('folderRenameTitle')}">${i18n.t('folderRename')}</button>
              <button class="adv-chip danger" data-action="delete"  title="${i18n.t('folderDeleteTitle')}">${i18n.t('folderDelete')}</button>
            `;

            header.appendChild(titleWrap);
            header.appendChild(actions);

            // セクションD&D
            const SECT_MIME = 'adv/folder';
            header.addEventListener('dragstart', (ev) => {
              if (ev.target && (ev.target.closest('.adv-folder-actions') || ev.target.closest('.adv-folder-toggle-btn'))) { ev.preventDefault(); return; }
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

            // 折りたたみ
            const collapseToggle = () => {
              section.classList.toggle('adv-folder-collapsed');
              const all = loadFoldersFn(foldersKey, defaultFolderName);
              const f = all.find(x => x.id === folder.id);
              if (f) { f.collapsed = section.classList.contains('adv-folder-collapsed'); f.ts = Date.now(); saveFoldersFn(foldersKey, all); }
              updateFolderToggleButton(toggleBtn, !!section.classList.contains('adv-folder-collapsed'));
            };
            toggleBtn.addEventListener('click', (e)=>{ e.stopPropagation(); collapseToggle(); });
            toggleBtn.addEventListener('keydown', (e)=>{ if (e.key===' '||e.key==='Enter'){ e.preventDefault(); collapseToggle(); } });

            // Rename / Delete
            actions.querySelector('[data-action="rename"]').addEventListener('click', ()=>{
              const nm = prompt(i18n.t('promptNewFolder'), folder.name);
              if (!nm || !nm.trim()) return;
              const fArr = loadFoldersFn(foldersKey, defaultFolderName);
              const f = fArr.find(x=>x.id===folder.id); if (!f) return;
              f.name = nm.trim(); f.ts = Date.now(); saveFoldersFn(foldersKey, fArr);
              renderFolderedCollection(cfg); showToast(i18n.t('updated'));
            });
            actions.querySelector('[data-action="delete"]').addEventListener('click', ()=>{
              if (!confirm(i18n.t('confirmDeleteFolder'))) return;

                // 1. 削除対象のアイテムIDセットを取得
                const itemsToDelete = new Set(folder.order || []);

                // 2. アイテムのマスターリストから該当アイテムを削除
                if (itemsToDelete.size > 0) {
                    try {
                        const allItems = loadItems(); // 親スコープの loadItems を使用
                        const nextItems = allItems.filter(item => !itemsToDelete.has(item.id));
                        saveItems(nextItems); // 親スコープの saveItems を使用
                    } catch (e) {
                        console.error('Failed to delete items in folder:', e);
                        // アイテム削除に失敗しても、フォルダ削除は続行
                    }
                }

              // 3. フォルダ自体を削除
              let fArr = loadFoldersFn(foldersKey, defaultFolderName);
              const idx = fArr.findIndex(x=>x.id===folder.id); if (idx<0) return;
              fArr.splice(idx,1);
              saveFoldersFn(foldersKey, fArr);

              // 4. 再描画
              renderFolderedCollection(cfg); showToast(i18n.t('toastDeleted'));
            });

            // フォルダ見出しにドロップ → そのフォルダへ移動
            header.addEventListener('dragover', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault();
              // 排他制御: 他のフォルダのハイライトを消す
              document.querySelectorAll('.adv-folder[data-drop="1"]').forEach(el => {
                if (el !== section) delete el.dataset.drop;
              });
              section.dataset.drop='1';
            });
            header.addEventListener('dragleave', (ev) => {
              // 子要素への移動でも一旦消すが、dragoverですぐ復活する
              delete section.dataset.drop;
            });
            header.addEventListener('drop', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.preventDefault(); delete section.dataset.drop;
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;
              onMoveToFolder(draggedId, folder.id);
            });

            // リスト本体
            const list = document.createElement('div'); list.className = 'adv-list';
            const itemsInFolder = folder.order.map(id => idToItem[id]).filter(Boolean).filter(matchItem);
            itemsInFolder.forEach(it => list.appendChild(renderRow(it)));

            // 並びプレビュー
            list.addEventListener('dragover', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return; // ガード追加
              ev.preventDefault();
              ev.stopPropagation(); // 伝播停止も追加

              // 排他制御: 他のフォルダのハイライトを消す
              document.querySelectorAll('.adv-folder[data-drop="1"]').forEach(el => {
                if (el !== section) delete el.dataset.drop;
              });
              section.dataset.drop='1';

              const dragging = document.querySelector('.adv-item.dragging');
              if (!dragging) return;
              const after = getDragAfterElement(list, ev.clientY);
              if (after == null) list.appendChild(dragging);
              else list.insertBefore(dragging, after);
            });

            list.addEventListener('dragleave', ev => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return;
              ev.stopPropagation();
              // 子要素への移動でも一旦消すが、dragoverですぐ復活する
              delete section.dataset.drop;
            });

            // 並び確定（かつ別フォルダ→このフォルダへの“移動”も吸収）
            list.addEventListener('drop', (ev) => {
              if (ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME)) return; // ガード追加
              ev.preventDefault(); ev.stopPropagation();
              delete section.dataset.drop;
              const draggedId = ev.dataTransfer.getData('text/plain');
              if (!draggedId) return;

              const newOrder = [...list.querySelectorAll('.adv-item')].map(el => el.dataset.id);

              const fArr = loadFoldersFn(foldersKey, defaultFolderName);
              const f = fArr.find(x=>x.id===folder.id);
              if (!f) return;

              const isMove = !f.order.includes(draggedId);
              if (isMove) {
                for (const f_other of fArr) {
                  if (f_other.id === folder.id) continue;
                  const o_before = f_other.order.length;
                  f_other.order = f_other.order.filter(id => id !== draggedId);
                  if (f_other.order.length !== o_before) f_other.ts = Date.now();
                }
              }

              f.order = newOrder;
              f.ts = Date.now();
              saveFoldersFn(foldersKey, fArr);
              showToast(i18n.t('toastReordered'));

              if (isMove) renderFolderedCollection(cfg);
            });

            section.appendChild(header);
            section.appendChild(list);
            return section;
          };

          // 11) 単一表示かALL表示か
          const order = (filterFolder !== '__ALL__')
            ? (filterFolder === '__UNASSIGNED__' ? ['__UNASSIGNED__'] : foldersToDraw.map(f => f.id))
            : buildSectionsOrder();

          order.forEach(id => {
            if (id === '__UNASSIGNED__') host.appendChild(renderUnassignedSection());
            else {
              const f = folders.find(x => x.id === id);
              if (f) host.appendChild(renderFolderSection(f));
            }
          });

          if (!host._advFolderDropAttached) { // 多重登録防止フラグ
              host._advFolderDropAttached = true;

              host.addEventListener('drop', (ev) => {
                  const SECT_MIME = 'adv/folder';
                  if (!(ev.dataTransfer.types && ev.dataTransfer.types.includes(SECT_MIME))) {
                      // アイテムのドロップ (text/plain) は他のリスナーが処理するため無視
                      return;
                  }

                  // セクション並び替え (adv/folder) の drop イベント
                  const sectionEl = ev.target.closest('.adv-folder, .adv-unassigned');

                  // イベントが host (コンテナ) またはその直下の子セクションで発生した場合のみ処理
                  if (ev.target === host || (sectionEl && sectionEl.parentElement === host)) {
                      ev.preventDefault();
                      ev.stopPropagation();

                      // dragover で DOM は既に入れ替わっているはず
                      persistSectionsFromDOM(); // DOMの現在の順序を保存

                      // 保存後に再描画
                      renderFolderedCollection(cfg);
                  }
              });
          }
        }

        // タブ並び替え（水平）用のヘルパー
        const getDragAfterElementHorizontal = (container, x, selector) => {
            const els = [...container.querySelectorAll(`${selector}:not(.dragging)`)];
            let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
            for (const el of els) {
                const box = el.getBoundingClientRect();
                // 水平方向の中心からのオフセットを計算
                const offset = x - box.left - box.width / 2;
                // 挿入すべき「次の要素」（オフセットがマイナスで最も0に近い）を探す
                if (offset < 0 && offset > closest.offset) {
                    closest = { offset, element: el };
                }
            }
            return closest.element;
        };

        // ★注意: 以前 savedListEl にあった 'drop' イベントリスナーは、
        // 新しい renderSaved 内の renderFolderSection / renderUnassignedSection の
        // 'list.addEventListener('drop', ...)' に吸収・統合されました。

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

          // 取得したクエリ文字列がキャッシュと同一なら、パースせずキャッシュを返す
          if (__cachedSearchQuery === qRaw && __cachedSearchTokens) {
              return __cachedSearchTokens;
          }
          // クエリが異なるため、パースを続行
          __cachedSearchQuery = qRaw; // 新しいクエリをキャッシュ
          __cachedSearchTokens = null; // 古いトークンを破棄（パース失敗に備える）

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
          const result = {
            requiredTerms: new Set(requiredTermsArr),
            orGroups,                  // [ ['ente','セール'], ['foo','bar'] , ... ]
            includeTerms,              // AND/ORすべてを平坦化した包含語集合
            opUsers,
            hashtagSet,
          };

          __cachedSearchTokens = result; // ★ パース結果をキャッシュに保存
          return result;
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
              reposts: document.getElementById('adv-filter-reposts-exclude')?.checked ?? false,
              hashtags: document.getElementById('adv-filter-hashtags-exclude')?.checked ?? false,
            };

            const masterOn = loadMuteMaster();
            const muted = loadMuted();
            const hasMute = masterOn && muted.length > 0;                       // ← masterOn を噛ませる
            const enabledMuted = hasMute ? muted.filter(m => m.enabled !== false) : [];
            const muteCI = enabledMuted.length ? new Set(enabledMuted.filter(m => !m.cs).map(m => m.word.toLowerCase())) : new Set();
            const muteCS = enabledMuted.length ? enabledMuted.filter(m => m.cs).map(m => m.word) : [];

            // ▼ フィルタリングが何も有効でないなら即時リターン
            if (!flags.name && !flags.handle && !hasMute && !flags.reposts && !flags.hashtags) {
              // 非表示属性が残っている可能性があるので、全解除だけ試みる
              document.querySelectorAll('[data-adv-hidden]').forEach(cell => {
                cell.removeAttribute('data-adv-hidden');
              });
              cleanupAdjacentSeparators();
              return;
            }

            const tokens = (flags.name || flags.handle) ? parseSearchTokens() : null; // 名前/ハンドル除外が有効な時だけトークンをパース
            const list = document.querySelectorAll('article[data-testid="tweet"]');

            for (const art of list) {
              const cell = getTweetCell(art);
              const reasons = [];
              let tweetBodyText = null; // 本文テキストのキャッシュ用

              // 1. 名前/ハンドル除外
              if ((flags.name || flags.handle) && tokens) {
                const hideByNameHandle = shouldHideTweetByNameHandle(art, flags, tokens);
                if (hideByNameHandle) reasons.push('name_handle_only');
              }

              // 2. ミュートワード除外
              if (hasMute) {
                tweetBodyText = tweetBodyText ?? (art.querySelector('[data-testid="tweetText"]')?.innerText || '');
                const bodyCI = tweetBodyText.toLowerCase();
                let hideByMute = false;
                for (const w of muteCI) { if (w && bodyCI.includes(w)) { hideByMute = true; break; } }
                if (!hideByMute) {
                  for (const w of muteCS) { if (w && tweetBodyText.includes(w)) { hideByMute = true; break; } }
                }
                if (hideByMute) reasons.push('muted_word');
              }

              // 3. リポスト除外
              if (flags.reposts) {
                // 1. まず socialContext があるか確認
                const socialContext = art.querySelector('[data-testid="socialContext"]');
                if (socialContext) {
                    // 2. それが「固定ポスト」のアイコンではないことを確認
                    //    固定ポストのピンアイコンのSVGパス
                    const pinIconPath = 'M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z';
                    const isPinned = art.querySelector(`svg path[d="${pinIconPath}"]`);

                    // 3. socialContext があり、かつ、固定ピンアイコンが無い場合のみ非表示
                    if (!isPinned) {
                        reasons.push('repost');
                    }
                }
              }

              // 4. ハッシュタグ除外
              if (flags.hashtags) {
                tweetBodyText = tweetBodyText ?? (art.querySelector('[data-testid="tweetText"]')?.innerText || '');
                // 本文中にハッシュタグ記号があるか
                if (tweetBodyText.includes('#')) {
                  reasons.push('hashtag');
                }
              }

              // 最終判定
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
            if (window.innerWidth <= 700) {
                closeModal();
            }
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
            if (window.innerWidth <= 700) {
                closeModal();
            }
          });
          row.querySelectorAll('a.adv-link').forEach(a => {
            a.addEventListener('click', (ev) => {
              if (ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
              ev.preventDefault();
              const href = a.getAttribute('href') || `/${item.handle}`;
              spaNavigate(href, { ctrlMeta: false });
              if (window.innerWidth <= 700) {
                  closeModal();
              }
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

        function renderAccounts() {
          ensureFolderToolbars();

          renderFolderedCollection({
            hostId: 'adv-accounts-list',
            emptyId: 'adv-accounts-empty',
            filterSelectId: 'adv-accounts-folder-filter',
            searchInputId:  'adv-accounts-search',
            newFolderBtnId: 'adv-accounts-new-folder',

            foldersKey: ACCOUNTS_FOLDERS_KEY,
            defaultFolderName: i18n.t('optAccountAll'),

            loadItems: loadAccounts,
            saveItems: saveAccounts,
            renderRow: renderAccountRow,

            onUnassign: unassignAccount,
            onMoveToFolder: moveAccountToFolder,

            emptyMessage: i18n.t('emptyAccounts'),
            unassignedIndexKey: 'advAccountsUnassignedIndex_v1',
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
            if (window.innerWidth <= 700) {
                closeModal();
            }
          });
          row.querySelectorAll('a.adv-link').forEach(a => {
            a.addEventListener('click', (ev) => {
              if (ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
              ev.preventDefault();
              const href = a.getAttribute('href') || item.url;
              spaNavigate(href, { ctrlMeta: false });
              if (window.innerWidth <= 700) {
                  closeModal();
              }
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
        const SAVED_FOLDERS_KEY    = 'advSavedFolders_v1'

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
                <input id="adv-accounts-search" class="adv-input" type="text" data-i18n-placeholder="placeholderFilterAccounts" placeholder="${i18n.t('placeholderFilterAccounts')}">
                <button id="adv-accounts-new-folder" class="adv-chip" data-i18n="buttonAddFolder">${i18n.t('buttonAddFolder')}</button>
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
                <input id="adv-lists-search" class="adv-input" type="text" data-i18n-placeholder="placeholderFilterLists" placeholder="${i18n.t('placeholderFilterLists')}">
                <button id="adv-lists-new-folder" class="adv-chip" data-i18n="buttonAddFolder">${i18n.t('buttonAddFolder')}</button>
              `;
              host.parentElement.insertBefore(bar, host);
            }
          }
          // Saved tab
          {
            const host = document.getElementById('adv-saved-list');
            if (host && !host.previousElementSibling?.classList?.contains('adv-folder-toolbar')) {
              const bar = document.createElement('div');
              bar.className = 'adv-folder-toolbar';
              bar.innerHTML = `
                <select id="adv-saved-folder-filter" class="adv-select"></select>
                <input id="adv-saved-search" class="adv-input" type="text" data-i18n-placeholder="placeholderSearchSaved" placeholder="${i18n.t('placeholderSearchSaved')}">
                <button id="adv-saved-new-folder" class="adv-chip" data-i18n="buttonAddFolder">${i18n.t('buttonAddFolder')}</button>
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
            // ▼ 削除対象のハンドルを保持しておく
            const accounts = loadAccounts();
            const deletedAccount = accounts.find(x => x.id === id);
            const deletedHandle = deletedAccount?.handle.toLowerCase();

            const next = accounts.filter(x => x.id !== id); // accounts変数を使用
            saveAccounts(next);
            renderAccounts();
            showToast(i18n.t('toastDeleted'));

            // ▼ ページ上のボタンを強制再描画
            // 現在のページハンドルを取得
            const currentHandle = getProfileHandleFromURL()?.toLowerCase();
            // もし削除したアカウントのページに今まさに居るなら、ボタンを強制更新
            if (deletedHandle && currentHandle === deletedHandle) {
                ensureProfileAddButton(true);
            }
        };

        const accountsListEl  = document.getElementById('adv-accounts-list');
        const advSavedListEl  = document.getElementById('adv-saved-list');

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

          // 状態（追加済みか）を先に判定
          const h_lower = handle.toLowerCase();
          const accounts = loadAccounts();
          const existingAccount = accounts.find(x => x.handle.toLowerCase() === h_lower);
          const isAdded = !!existingAccount;
          const accountId = existingAccount?.id || null;

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
          // 状態に応じてラベルを変更
          const label = i18n.t(isAdded ? 'delete' : 'buttonAddAccount'); // 「削除」キーを流用
          btn.setAttribute('aria-label', label);
          btn.title = label;
          // ▼ 内側の div / svg / span から「class と inline style」を抽出
          const innerDiv   = moreBtn.querySelector('div[dir="ltr"]') || moreBtn.querySelector('div');
          const innerCls   = innerDiv?.getAttribute('class') || innerDiv?.classList?.value || '';
          const innerStyle = innerDiv?.getAttribute('style') || '';
          const svgEl      = innerDiv?.querySelector('svg') || moreBtn.querySelector('svg');
          const svgCls     = svgEl?.getAttribute('class') || svgEl?.classList?.value || '';
          const spanEl     = innerDiv?.querySelector('span') || moreBtn.querySelector('span');
          const spanCls    = spanEl?.getAttribute('class') || spanEl?.classList?.value || '';

          // 状態に応じてSVGパスを切り替え
          const ICON_PATH_ADD = 'M18 5h2v3h3v2h-3v3h-2V10h-3V8h3V5z';
          const ICON_PATH_CHECK = 'M23 8l-5 5-3-3 1.5-1.5L18 10l3.5-3.5L23 8z'; // 右上に配置したチェック
          const iconPath = isAdded ? ICON_PATH_CHECK : ICON_PATH_ADD;

          btn.innerHTML = `
            <div dir="ltr" class="${innerCls}" style="${innerStyle}">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                class="${svgCls}"
                fill="currentColor"
              >
                <circle cx="10" cy="7.5" r="3.5"></circle>
                <path d="M3.5 18.5C3.5 15.46 6.79 13 10 13s6.5 2.46 6.5 5.5V20H3.5v-1.5z"></path>
                <path d="${iconPath}"></path>
              </svg>
              <span class="${spanCls}"></span>
            </div>
          `;

          btn.addEventListener('click', () => {
            if (isAdded) {
              // 追加済みの場合：削除
              if (accountId) {
                deleteAccount(accountId); // deleteAccount は toast を内蔵している
              }
            } else {
              // 未追加の場合：追加
              const { name, avatar } = collectProfileMeta(handle);
              const ret = addAccount({ handle, name, avatar });
              if (ret === 'ok') showToast(i18n.t('toastAccountAdded'));
              else if (ret === 'updated') showToast(i18n.t('updated'));
              else if (ret === 'exists') showToast(i18n.t('toastAccountExists'));
            }
            // 状態が変わったので、ボタンを即座に再描画（アイコンを切り替え）
            ensureProfileAddButton(true); // force=true で再実行
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
            // ▼ 削除対象のURLを保持しておく
            const lists = loadLists();
            const deletedList = lists.find(x => x.id === id);
            const deletedUrl = deletedList?.url;

            const next = lists.filter(x => x.id !== id); // lists変数を使用
            saveLists(next);
            renderLists();
            showToast(i18n.t('toastDeleted'));

            // ▼ ページ上のボタンを強制再描画
            // 現在がリストページか、そのURLは何かを取得
            if (isListPath()) {
                const { url: currentUrl } = getListMeta();
                // もし削除したリストのページに今まさに居るなら、ボタンを強制更新
                if (deletedUrl && currentUrl === deletedUrl) {
                    ensureListAddButton(true);
                }
            }
        };

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

          renderFolderedCollection({
            hostId: 'adv-lists-list',
            emptyId: 'adv-lists-empty',
            filterSelectId: 'adv-lists-folder-filter',
            searchInputId:  'adv-lists-search',
            newFolderBtnId: 'adv-lists-new-folder',

            foldersKey: LISTS_FOLDERS_KEY,
            defaultFolderName: i18n.t('optListsAll'),

            loadItems: loadLists,
            saveItems: saveLists,
            renderRow: renderListRow,

            onUnassign: unassignList,
            onMoveToFolder: moveListToFolder,

            emptyMessage: i18n.t('emptyLists'),
            unassignedIndexKey: 'advListsUnassignedIndex_v1',
          });
        }

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

          // ▼ 状態判定ロジックを追加
          const { name: currentName, url: currentUrl } = getListMeta();
          // リスト名やURLが取得できない（＝リストページではない）場合はボタンを追加しない
          if (!currentName || !currentUrl) return;

          const lists = loadLists();
          const existingList = lists.find(x => x.url === currentUrl);
          const isAdded = !!existingList;
          const listId = existingList?.id || null;

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

          // ▼ isAdded に応じてラベルを変更（"削除"キーを流用）
          const label = i18n.t(isAdded ? 'delete' : 'buttonAddList');
          btn.setAttribute('aria-label', label);
          btn.title = label;

          const innerDiv   = shareBtn.querySelector('div[dir="ltr"]') || shareBtn.querySelector('div');
          const innerCls   = innerDiv?.getAttribute('class') || innerDiv?.classList?.value || '';
          const innerStyle = innerDiv?.getAttribute('style') || '';
          const svgEl      = innerDiv?.querySelector('svg') || shareBtn.querySelector('svg');
          const svgCls     = svgEl?.getAttribute('class') || svgEl?.classList?.value || '';
          const spanEl     = innerDiv?.querySelector('span') || shareBtn.querySelector('span');
          const spanCls    = spanEl?.getAttribute('class') || spanEl?.classList?.value || '';

          // ▼ アイコンパスを定義
          const ICON_PATH_ADD = 'M12 5c.55 0 1 .45 1 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H6a1 1 0 110-2h5V6c0-.55.45-1 1-1z';
          // アカウントボタンとは異なり、シンプルなチェックマークを使用
          const ICON_PATH_CHECK = 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z';
          const iconPath = isAdded ? ICON_PATH_CHECK : ICON_PATH_ADD;

          // ▼ iconPath を使用するように innerHTML を変更
          btn.innerHTML = `
              <div dir="ltr" class="${innerCls}" style="${innerStyle}">
                  <svg viewBox="0 0 24 24" aria-hidden="true" class="${svgCls}" fill="currentColor">
                      <g><path d="${iconPath}"></path></g>
                  </svg>
                  <span class="${spanCls}"></span>
              </div>
          `;

          // ▼ クリックイベントのロジックをトグルに変更
          btn.addEventListener('click', () => {
              if (isAdded) {
                  // 既に登録済みの場合：削除
                  if (listId) {
                      deleteList(listId); // deleteList は内部で toastDeleted を呼び出します
                  }
              } else {
                  // 未登録の場合：追加
                  // (関数冒頭で取得した currentName, currentUrl を使用)
                  const ret = addList({ name: currentName, url: currentUrl });
                  if (ret === 'ok') showToast(i18n.t('toastListAdded'));
                  else if (ret === 'exists') showToast(i18n.t('toastListExists'));
              }

              // 状態が変わったため、ボタンを強制的に再描画（アイコンを即時切替）
              ensureListAddButton(true);
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

        const closeModal = () => {
            manualOverrideOpen = false;
            modal.style.display = 'none';
            saveModalRelativeState();
        };
        closeButton.addEventListener('click', closeModal);

        clearButton.addEventListener('click', () => {
            form.reset();
            // クリア時に disabled を解除
            ['verified', 'links', 'images', 'videos'].forEach(groupName => {
                const includeEl = document.getElementById(`adv-filter-${groupName}-include`);
                const excludeEl = document.getElementById(`adv-filter-${groupName}-exclude`);
                if (includeEl) includeEl.disabled = false;
                if (excludeEl) excludeEl.disabled = false;
            });
            syncFromModalToSearchBox();
        });

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
                        } else if (u.pathname.startsWith('/hashtag/')) {
                            const hashtag = u.pathname.substring('/hashtag/'.length).split('/')[0];
                            if (hashtag) {
                                const q = `#${decodeURIComponent(hashtag)}`;
                                // ハッシュタグページは pf/lf スコープを持たない想定
                                recordHistory(q, false, false);
                            }
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
        // 排他チェックボックスのロジック
        const setupExclusiveChecks = () => {
            const groups = [
                'verified', 'links', 'images', 'videos'
            ];
            groups.forEach(groupName => {
                const includeEl = document.getElementById(`adv-filter-${groupName}-include`);
                const excludeEl = document.getElementById(`adv-filter-${groupName}-exclude`);
                if (!includeEl || !excludeEl) return;

                const handleChange = (eventSource, oppositeEl) => {
                    if (eventSource.checked) {
                        oppositeEl.disabled = true;
                    } else {
                        oppositeEl.disabled = false;
                    }
                };

                includeEl.addEventListener('change', () => handleChange(includeEl, excludeEl));
                excludeEl.addEventListener('change', () => handleChange(excludeEl, includeEl));
            });
        };
        setupExclusiveChecks();
        setupObservers();

        // ▼ Setup background drop zones ▼
        // （このブロックは、最初の renderAccounts / renderLists / renderSaved を呼ぶ前に置く）
        setupBackgroundDrop(tabAccountsPanel, accountsListEl,  unassignAccount);
        setupBackgroundDrop(tabListsPanel,    advListsListEl,  unassignList);
        setupBackgroundDrop(tabSavedPanel,    advSavedListEl,  unassignSaved);

        renderHistory();
        renderSaved();
        renderAccounts();
        renderMuted();

        // 保存された最後のタブを読み込んでアクティブにする
        const lastTab = kv.get(LAST_TAB_KEY, 'search');
        activateTab(lastTab || 'search');

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
