(async function() {
    'use strict';

    if (typeof chrome === 'undefined' || !chrome.storage) return;

    // --- 1. データの同期ロード (Chrome Storage -> Memory) ---
    const storageCache = await chrome.storage.local.get(null);

    // 別のタブやウィンドウでデータが変更された場合、メモリキャッシュも即座に更新する
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local') {
            for (const [key, { newValue }] of Object.entries(changes)) {
                if (newValue === undefined) {
                    delete storageCache[key];
                } else {
                    storageCache[key] = newValue;
                }
            }
        }
    });

    // --- 2. GM_* API の Polyfill ---

    window.GM_getValue = function(key, defaultValue) {
        return Object.prototype.hasOwnProperty.call(storageCache, key) ? storageCache[key] : defaultValue;
    };

    window.GM_setValue = function(key, value) {
        storageCache[key] = value;
        chrome.storage.local.set({ [key]: value });
    };

    window.GM_deleteValue = function(key) {
        delete storageCache[key];
        chrome.storage.local.remove(key);
    };

    window.GM_addStyle = function(css) {
        const style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
        return style;
    };

    window.GM_info = {
        scriptHandler: "Chrome Extension Adapter",
        version: "6.0.0"
    };

    // --- 3. UserScript本体の起動 ---
    // Manifestでの読み込み順序により content.js は既に読み込まれ、関数が定義されているはずですが、
    // 万が一のために存在チェックを行います。
    if (typeof window.__X_ADV_SEARCH_MAIN__ === 'function') {
        window.__X_ADV_SEARCH_MAIN__();
    }

})();
