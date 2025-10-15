# Demo Plugin Implementation

This document explains the implementation of the interactive demo plugin with JSFiddle integration for the utilite documentation.

## Overview

The demo plugin provides interactive code examples with instant preview and JSFiddle integration, similar to popular frameworks like Vue.js and React documentation.

## Implementation Components

### 1. Core Plugin (`demo-plugin.js`)

The main JavaScript plugin that:
- Hooks into Docsify's plugin system
- Parses code blocks with `demo:*` syntax
- Creates interactive demo boxes
- Executes code in isolated contexts
- Handles Vue and React component rendering
- Integrates with JSFiddle API

**Key Features:**
- **Code Execution**: Safely executes JavaScript code and captures console output
- **Framework Support**: Renders Vue SFCs and React JSX components
- **JSFiddle Integration**: Automatically configures and submits code to JSFiddle
- **Error Handling**: Gracefully handles execution errors
- **Progressive Enhancement**: Works with or without framework libraries loaded

### 2. Styling (`demo-plugin.css`)

Beautiful, responsive CSS for demo boxes featuring:
- Modern card-based design
- Smooth animations and transitions
- Dark mode support
- Mobile-responsive layout
- Accessible button states
- Syntax highlighting integration

### 3. Documentation (`demo-guide.md`)

Comprehensive guide covering:
- How to use the plugin
- Syntax examples for all supported languages
- Best practices
- Troubleshooting tips
- Customization options

### 4. Example Pages (`array-examples.md`)

Live demonstrations of utilite functions with:
- Interactive JavaScript examples
- Real-world use cases
- Inline implementations for standalone demos
- Try in JSFiddle integration

## How It Works

### Plugin Flow

```
1. User writes code with demo:language syntax
   ↓
2. Docsify renders the page
   ↓
3. Plugin hook (doneEach) finds demo code blocks
   ↓
4. Plugin creates demo box HTML structure
   ↓
5. Plugin executes/renders code based on language
   ↓
6. User interacts with Show Code / JSFiddle buttons
```

### Code Execution Strategy

**JavaScript/TypeScript:**
- Uses `new Function()` to execute code in isolated scope
- Wraps `console.log` to capture output
- Displays results in preview area

**Vue:**
- Parses SFC template, script, and style
- Creates Vue instance with component options
- Mounts to dedicated DOM element

**React:**
- Uses Babel Standalone to transform JSX
- Evaluates transformed code
- Renders to React root element

### JSFiddle Integration

The plugin uses JSFiddle's POST API:

```javascript
POST https://jsfiddle.net/api/post/library/pure/
{
  html: '<div id="app"></div>',
  js: 'component code',
  css: 'styles',
  resources: 'https://cdn.../vue.js',
  title: 'utilite Demo',
  wrap: 'b'
}
```

Automatically includes appropriate libraries based on language:
- Vue: Vue 2.x CDN
- React: React + ReactDOM + Babel Standalone
- JavaScript: No additional libraries

## File Structure

```
utilite/
├── docs/
│   ├── index.html           # Updated with plugin includes
│   ├── demo-plugin.js       # Core plugin logic
│   ├── demo-plugin.css      # Plugin styles
│   ├── demo-guide.md        # User documentation
│   └── array-examples.md    # Example demonstrations
```

## Usage

### Basic JavaScript Demo

````markdown
```demo:javascript
/* @desc Description here */
console.log('Hello World!');
```
````

### Vue Component Demo

````markdown
```demo:vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return { message: 'Hello Vue!' }
  }
}
</script>

<style>
div { color: blue; }
</style>
```
````

### React Component Demo

````markdown
```demo:react
const App = () => {
  return <h1>Hello React!</h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
````

## Integration Steps

The plugin was integrated into the utilite documentation by:

1. **Created plugin files**: `demo-plugin.js` and `demo-plugin.css`
2. **Updated index.html**: Added CSS and JS includes
3. **Added framework libraries**: Vue, React, Babel CDN links
4. **Created documentation**: Guide and examples
5. **Tested**: Verified all demo types work correctly

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Mobile**: Responsive design works on all mobile browsers
- **Legacy**: Gracefully degrades without modern JS features

## Performance Considerations

- **Lazy Execution**: Code only executes after page load
- **Isolated Scope**: Each demo runs independently
- **Error Boundaries**: Errors don't break the page
- **Lightweight**: Minimal overhead on page load

## Security

- **Sandboxed Execution**: Code runs in function scope
- **No Eval on User Input**: Only pre-written demo code executes
- **CORS Safe**: All CDN resources use HTTPS
- **XSS Prevention**: HTML is properly escaped in code display

## Extending the Plugin

### Adding New Language Support

1. Add language detection in `createDemoBox`:
```javascript
const isNewLang = language === 'newlang';
```

2. Implement renderer:
```javascript
function renderNewLangDemo(code, demoId) {
  // Rendering logic
}
```

3. Add to execution chain:
```javascript
if (demoLang === 'newlang') {
  renderNewLangDemo(code, demoId);
}
```

### Customizing Styles

Modify `demo-plugin.css`:
- Change colors via CSS variables
- Adjust spacing and sizing
- Add animations
- Customize button styles

### Adding Features

Potential enhancements:
- Code editing within demo box
- Live reload on code changes
- Multiple demo outputs (e.g., show HTML + JS result)
- Performance profiling
- Test assertion display

## Testing

To test the plugin:

1. Start Docsify server:
```bash
npm run docs
```

2. Navigate to demo pages
3. Verify:
   - Code executes correctly
   - Show/Hide works
   - JSFiddle opens properly
   - Mobile responsive
   - Dark mode works

## Maintenance

### Regular Tasks
- Update CDN versions for Vue/React
- Test with new Docsify releases
- Monitor browser compatibility
- Update documentation

### Known Limitations
- TypeScript requires compilation (shows notice)
- Complex Vue components may need adjustments
- JSFiddle has rate limiting

## Contributing

Contributions welcome! Areas for improvement:
- Additional framework support (Svelte, Angular)
- Code editor integration (Monaco, CodeMirror)
- Export to other platforms (CodePen, StackBlitz)
- Performance optimizations
- Accessibility enhancements

## License

MIT License - Same as utilite project

## Credits

Inspired by:
- Vue.js documentation
- React documentation
- Docsify plugin ecosystem
- JSFiddle API

---

For questions or issues, please open an issue on the GitHub repository.
