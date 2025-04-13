/**
 * Vite HMR Helper
 * 
 * This script helps ensure that all content is properly updated through HMR after git pull operations.
 * It uses Vite's HMR API to trigger updates without full page reload.
 */

(function() {
  // Wait for the full initialization of Vite before running
  function waitForViteAndInitialize() {
    console.log('[ViteHMR] Starting Vite HMR helper');

    // Check if Vite client is initialized
    if (!window.__vite_plugin_react_preamble_installed__ &&
        !window.__vite__ &&
        !window.__vite_hot__ &&
        !window.viteHotContext) {

      console.log('[ViteHMR] Waiting for Vite to initialize...');
      setTimeout(waitForViteAndInitialize, 500);
      return;
    }

    // Vite is initialized, now we can set up our helper
    initializeHMRHelper();
  }

  function initializeHMRHelper() {
    console.log('[ViteHMR] Vite detected, initializing HMR helper');

    // Set up listener for Vite HMR events
    window.addEventListener('vite:beforeUpdate', (event) => {
      console.log('[ViteHMR] Vite beforeUpdate event captured');
    });

    window.addEventListener('vite:afterUpdate', (event) => {
      console.log('[ViteHMR] Vite afterUpdate event captured');
    });

    // Try to find the Vite client
    const viteClient = findViteClient();

    if (viteClient) {
      console.log('[ViteHMR] Found Vite client, HMR should work properly');

      // Attempt to trigger HMR update
      setTimeout(triggerHMR, 1000);
    } else {
      console.warn('[ViteHMR] Could not locate Vite client');

      // Set up MutationObserver to detect when Vite client is loaded
      setupMutationObserver();
    }
  }

  // Find Vite client in the global scope
  function findViteClient() {
    // Possible locations where Vite client might be found
    return window.__vite__ ||
           window.__vite_hot__ ||
           window.__vite_plugin_react_preamble_installed__ ||
           window.viteHotContext ||
           (window.__HMR__ && window.__HMR__.runtime);
  }

  // Set up MutationObserver to detect when Vite client is loaded
  function setupMutationObserver() {
    console.log('[ViteHMR] Setting up MutationObserver to detect Vite client');

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.tagName === 'SCRIPT' &&
                (node.src.includes('@vite/client') ||
                 node.src.includes('vite/dist/client'))) {

              console.log('[ViteHMR] Vite client script detected, waiting for initialization');

              // Wait a bit for the script to initialize
              setTimeout(() => {
                const client = findViteClient();
                if (client) {
                  console.log('[ViteHMR] Vite client found after script loaded');
                  triggerHMR();
                  observer.disconnect();
                }
              }, 500);

              return;
            }
          }
        }
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  }

  // Function to trigger HMR update
  function triggerHMR() {
    console.log('[ViteHMR] Attempting to trigger Vite HMR update');

    try {
      // Method 1: Using Vite's WebSocket connection
      if (window.__vite_web_socket__ || window.__vite_ws__) {
        const socket = window.__vite_web_socket__ || window.__vite_ws__;
        if (socket && socket.send) {
          console.log('[ViteHMR] Using Vite WebSocket to trigger update');
          socket.send(JSON.stringify({ type: 'full-reload' }));
          return true;
        }
      }

      // Method 2: Using import.meta.hot API from a module context
      const injectHMRScript = document.createElement('script');
      injectHMRScript.type = 'module';
      injectHMRScript.textContent = `
        if (import.meta && import.meta.hot) {
          console.log('[ViteHMR] Using import.meta.hot inside module script');
          import.meta.hot.invalidate();
        }
      `;
      document.head.appendChild(injectHMRScript);

      // Method 3: Check for Vite's HMR runtime
      if (window.__vite_hot_runtime__) {
        console.log('[ViteHMR] Using __vite_hot_runtime__');
        window.__vite_hot_runtime__.invalidateAll();
        return true;
      }

      // Method 4: Try to find and directly modify CSS style sheets
      if (document.styleSheets.length > 0) {
        console.log('[ViteHMR] Nudging CSS rules to trigger style recalculation');

        for (const sheet of document.styleSheets) {
          try {
            if (sheet.cssRules.length > 0) {
              // Get the first rule
              const rule = sheet.cssRules[0];

              // Clone and re-insert the rule to trigger a recalculation
              const cssText = rule.cssText;
              sheet.deleteRule(0);
              sheet.insertRule(cssText, 0);
            }
          } catch (e) {
            // Ignore security errors from cross-origin stylesheets
          }
        }
      }

      return true;
    } catch (error) {
      console.warn('[ViteHMR] Error triggering HMR:', error);
      return false;
    }
  }

  // Expose global API
  window.viteHMRHelper = {
    triggerHMR: triggerHMR,
    reinitialize: waitForViteAndInitialize
  };

  // Start initialization
  waitForViteAndInitialize();
})();
