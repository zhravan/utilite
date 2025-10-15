/**
 * Docsify Demo Plugin with JSFiddle Integration
 * Supports instant preview of code samples with expandable demo boxes
 * Compatible with JavaScript, TypeScript, Vue, and React
 */

(function () {
  let demoCounter = 0;

  function createDemoBox(code, language, description = '') {
    const demoId = `demo-${demoCounter++}`;
    const isVue = language === 'vue';
    const isReact = language === 'react' || language === 'jsx';
    const isJS = language === 'javascript' || language === 'js';
    const isTS = language === 'typescript' || language === 'ts';

    // Extract code parts for Vue SFC
    let template = '', script = '', style = '';
    if (isVue) {
      const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/);
      const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/);
      const styleMatch = code.match(/<style>([\s\S]*?)<\/style>/);
      
      template = templateMatch ? templateMatch[1].trim() : '';
      script = scriptMatch ? scriptMatch[1].trim() : '';
      style = styleMatch ? styleMatch[1].trim() : '';
    }

    // Create the demo container
    const container = document.createElement('div');
    container.className = 'demo-box';
    container.innerHTML = `
      <div class="demo-preview" id="${demoId}-preview">
        ${isVue ? `<div id="${demoId}-app"></div>` : 
          isReact ? `<div id="${demoId}-root"></div>` : 
          `<div id="${demoId}-output"></div>`}
      </div>
      <div class="demo-controls">
        <button class="demo-toggle" data-demo="${demoId}">
          <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
            <path d="M512 192c-223.318 0-416.882 130.042-512 320 95.118 189.958 288.682 320 512 320 223.372 0 416.922-130.042 512-320-95.078-189.958-288.628-320-512-320z m0 554.667c-129.396 0-234.667-105.27-234.667-234.667s105.27-234.667 234.667-234.667 234.667 105.27 234.667 234.667-105.27 234.667-234.667 234.667z m0-117.334c64.801 0 117.333-52.532 117.333-117.333s-52.532-117.333-117.333-117.333-117.333 52.532-117.333 117.333 52.532 117.333 117.333 117.333z"></path>
          </svg>
          Show Code
        </button>
        <button class="demo-jsfiddle" data-demo="${demoId}">
          <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
            <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0z m0 928C282.256 928 96 741.744 96 512S282.256 96 512 96s416 186.256 416 416-186.256 416-416 416z"></path>
            <path d="M707.2 371.2l-160-160c-12.48-12.48-32.64-12.48-45.12 0l-160 160c-12.48 12.48-12.48 32.64 0 45.12 12.48 12.48 32.64 12.48 45.12 0L480 323.52V640c0 17.68 14.32 32 32 32s32-14.32 32-32V323.52l92.8 92.8c6.24 6.24 14.4 9.36 22.56 9.36s16.32-3.12 22.56-9.36c12.48-12.48 12.48-32.64 0.28-45.12z"></path>
          </svg>
          Try in JSFiddle
        </button>
      </div>
      <div class="demo-source" id="${demoId}-source" style="display: none;">
        ${description ? `<div class="demo-description">${description}</div>` : ''}
        <pre><code class="language-${language}">${escapeHtml(code)}</code></pre>
      </div>
    `;

    return { container, demoId, code, language, template, script, style };
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function executeCode(code, demoId, language) {
    const outputDiv = document.getElementById(`${demoId}-output`);
    if (!outputDiv) return;

    try {
      // Capture console.log for display
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        originalLog.apply(console, args);
      };

      // Execute the code
      if (language === 'typescript' || language === 'ts') {
        // For TypeScript, we'll just show a notice that it's TypeScript
        outputDiv.innerHTML = `
          <div class="demo-notice">
            <strong>TypeScript Code:</strong> This code is written in TypeScript. 
            Compile it to JavaScript to run in the browser.
          </div>
        `;
      } else {
        // Execute JavaScript
        const func = new Function(code);
        func();
        
        if (logs.length > 0) {
          outputDiv.innerHTML = `<pre class="demo-console">${logs.join('\n')}</pre>`;
        } else {
          outputDiv.innerHTML = '<div class="demo-notice">Code executed successfully (no console output)</div>';
        }
      }

      // Restore console.log
      console.log = originalLog;
    } catch (error) {
      outputDiv.innerHTML = `<div class="demo-error">Error: ${error.message}</div>`;
    }
  }

  function renderVueDemo(template, script, style, demoId) {
    const appDiv = document.getElementById(`${demoId}-app`);
    if (!appDiv || typeof Vue === 'undefined') {
      appDiv.innerHTML = '<div class="demo-notice">Vue.js not loaded. Please include Vue in your page.</div>';
      return;
    }

    try {
      // Add styles
      if (style) {
        const styleEl = document.createElement('style');
        styleEl.textContent = style;
        document.head.appendChild(styleEl);
      }

      // Create Vue app
      const scriptContent = script.replace(/export\s+default\s*/, '');
      const component = eval(`(${scriptContent})`);
      component.template = template;

      new Vue(component).$mount(`#${demoId}-app`);
    } catch (error) {
      appDiv.innerHTML = `<div class="demo-error">Vue Error: ${error.message}</div>`;
    }
  }

  function renderReactDemo(code, demoId) {
    const rootDiv = document.getElementById(`${demoId}-root`);
    if (!rootDiv || typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      rootDiv.innerHTML = '<div class="demo-notice">React not loaded. Please include React and ReactDOM in your page.</div>';
      return;
    }

    try {
      // Transform JSX if needed (requires Babel standalone)
      if (typeof Babel !== 'undefined') {
        const transformed = Babel.transform(code, { presets: ['react'] }).code;
        eval(transformed);
      } else {
        eval(code);
      }
    } catch (error) {
      rootDiv.innerHTML = `<div class="demo-error">React Error: ${error.message}</div>`;
    }
  }

  function openInJSFiddle(code, language) {
    const isVue = language === 'vue';
    const isReact = language === 'react' || language === 'jsx';
    
    let html = '', js = '', css = '', resources = '';

    if (isVue) {
      const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/);
      const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/);
      const styleMatch = code.match(/<style>([\s\S]*?)<\/style>/);
      
      html = `<div id="app">${templateMatch ? templateMatch[1].trim() : ''}</div>`;
      js = scriptMatch ? scriptMatch[1].trim() : '';
      css = styleMatch ? styleMatch[1].trim() : '';
      resources = 'https://cdn.jsdelivr.net/npm/vue@2';
    } else if (isReact) {
      html = '<div id="root"></div>';
      js = code;
      resources = 'https://unpkg.com/react@17/umd/react.development.js,https://unpkg.com/react-dom@17/umd/react-dom.development.js,https://unpkg.com/@babel/standalone/babel.min.js';
    } else {
      html = '<div id="output"></div>';
      js = code;
    }

    // Create form and submit to JSFiddle
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://jsfiddle.net/api/post/library/pure/';
    form.target = '_blank';

    const inputs = {
      html: html,
      js: js,
      css: css,
      resources: resources,
      title: 'utilite Demo',
      wrap: 'b' // wrap in body tag
    };

    for (let name in inputs) {
      if (inputs[name]) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = inputs[name];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  // Docsify plugin
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(
    function (hook, vm) {
      hook.afterEach(function (html, next) {
        // Reset counter for each page
        demoCounter = 0;
        next(html);
      });

      hook.doneEach(function () {
        // Find all code blocks with demo marker
        const codeBlocks = document.querySelectorAll('pre[data-lang*="demo"]');
        
        codeBlocks.forEach(block => {
          const code = block.querySelector('code');
          if (!code) return;

          const codeText = code.textContent;
          const lang = block.getAttribute('data-lang');
          
          // Extract language from data-lang (e.g., "demo:vue" -> "vue")
          const language = lang.split(':')[1] || 'javascript';
          
          // Extract description from comment if present
          const descMatch = codeText.match(/\/\*\s*@desc\s+(.*?)\s*\*\//);
          const description = descMatch ? descMatch[1] : '';

          // Create demo box
          const { container, demoId, code: demoCode, language: demoLang, template, script, style } = 
            createDemoBox(codeText, language, description);

          // Replace the code block with demo box
          block.parentNode.replaceChild(container, block);

          // Execute/render the demo
          if (demoLang === 'vue') {
            setTimeout(() => renderVueDemo(template, script, style, demoId), 100);
          } else if (demoLang === 'react' || demoLang === 'jsx') {
            setTimeout(() => renderReactDemo(demoCode, demoId), 100);
          } else if (demoLang === 'javascript' || demoLang === 'js') {
            setTimeout(() => executeCode(demoCode, demoId, demoLang), 100);
          }

          // Add event listeners
          const toggleBtn = container.querySelector('.demo-toggle');
          const jsfiddleBtn = container.querySelector('.demo-jsfiddle');
          const sourceDiv = container.querySelector('.demo-source');

          toggleBtn.addEventListener('click', () => {
            const isVisible = sourceDiv.style.display !== 'none';
            sourceDiv.style.display = isVisible ? 'none' : 'block';
            toggleBtn.innerHTML = isVisible ? 
              `<svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 192c-223.318 0-416.882 130.042-512 320 95.118 189.958 288.682 320 512 320 223.372 0 416.922-130.042 512-320-95.078-189.958-288.628-320-512-320z m0 554.667c-129.396 0-234.667-105.27-234.667-234.667s105.27-234.667 234.667-234.667 234.667 105.27 234.667 234.667-105.27 234.667-234.667 234.667z m0-117.334c64.801 0 117.333-52.532 117.333-117.333s-52.532-117.333-117.333-117.333-117.333 52.532-117.333 117.333 52.532 117.333 117.333 117.333z"></path>
              </svg> Show Code` : 
              `<svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 128c282.768 0 512 229.232 512 512S794.768 1152 512 1152 0 922.768 0 640 229.232 128 512 128z m0 832c176.752 0 320-143.248 320-320S688.752 320 512 320 192 463.248 192 640s143.248 320 320 320z"></path>
              </svg> Hide Code`;
          });

          jsfiddleBtn.addEventListener('click', () => {
            openInJSFiddle(demoCode, demoLang);
          });
        });

        // Re-highlight code in demo boxes
        if (window.Prism) {
          Prism.highlightAll();
        }
      });
    },
    window.$docsify.plugins || []
  );
})();
