# Demo Plugin Guide

The utilite documentation now supports **interactive code demos** with instant preview and JSFiddle integration!

## Features

✨ **Instant Preview** - See code execution results immediately  
🎨 **Beautiful UI** - Clean, modern demo boxes with expand/collapse  
🚀 **JSFiddle Integration** - Try code in JSFiddle with one click  
🔧 **Multi-Framework Support** - JavaScript, TypeScript, Vue, and React  
📱 **Responsive** - Works perfectly on mobile devices  
🌓 **Dark Mode** - Automatic dark mode support  

## How to Use

To create an interactive demo, use the special `demo:language` syntax in your code blocks:

### Syntax

````markdown
```demo:javascript
/* @desc Your description here */
// Your code here
console.log('Hello World!');
```
````

The `@desc` comment is optional and will be displayed as a description above the code.

## Supported Languages

- `demo:javascript` or `demo:js` - JavaScript demos
- `demo:typescript` or `demo:ts` - TypeScript demos
- `demo:vue` - Vue.js component demos
- `demo:react` or `demo:jsx` - React component demos

## Examples

### JavaScript Example

```demo:javascript
/* @desc Array utility function demonstration */
// Using utilite's isAnyMatching function
const numbers = [1, 3, 5, 7, 8, 9];
const hasEven = numbers.some(num => num % 2 === 0);
console.log('Has even number:', hasEven);
console.log('Numbers:', numbers);
```

### TypeScript Example

```demo:typescript
/* @desc Type-safe array filtering */
interface User {
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

const activeUsers = users.filter(user => user.active);
console.log('Active users:', activeUsers);
```

### Vue Example

```demo:vue
<template>
  <div class="vue-demo">
    <h3>{{ title }}</h3>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vue Counter Demo',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
</script>

<style>
.vue-demo {
  text-align: center;
  padding: 20px;
}
.vue-demo button {
  margin: 0 5px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.vue-demo button:hover {
  background: #35a372;
}
</style>
```

### React Example

```demo:react
/* @desc React counter component */
const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>React Counter Demo</h3>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          margin: '0 5px',
          padding: '8px 16px',
          background: '#61dafb',
          color: '#282c34',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
      <button 
        onClick={() => setCount(count - 1)}
        style={{
          margin: '0 5px',
          padding: '8px 16px',
          background: '#61dafb',
          color: '#282c34',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Decrement
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```

## Features Explained

### Show/Hide Code

Click the "Show Code" button to toggle the source code visibility. The button icon changes to indicate the current state.

### Try in JSFiddle

Click the "Try in JSFiddle" button to open the code in JSFiddle.net in a new tab. This allows you to:
- Modify the code
- See live results
- Share your modifications
- Fork and save your version

The plugin automatically configures JSFiddle with the appropriate libraries (Vue, React, etc.).

### Console Output

For JavaScript demos, any `console.log()` output will be captured and displayed in the preview area with syntax highlighting.

### Error Handling

If your code has errors, they will be displayed in a friendly error box instead of breaking the page.

## Best Practices

1. **Keep demos focused** - One concept per demo
2. **Add descriptions** - Use `@desc` to explain what the demo does
3. **Use real examples** - Show practical use cases
4. **Test your code** - Make sure demos work before committing
5. **Consider mobile** - Test on smaller screens

## Technical Details

### How It Works

1. The plugin scans for code blocks with `data-lang` matching `demo:*`
2. Creates a demo box with preview, controls, and source code sections
3. Executes the code in an isolated context
4. Captures output and displays it in the preview area
5. Provides JSFiddle integration with proper library configuration

### Dependencies

The plugin works with vanilla JavaScript but optionally supports:
- **Vue.js 2.x** - For Vue component demos
- **React 17+** - For React component demos  
- **Babel Standalone** - For JSX transformation

These are automatically loaded from CDN in the documentation.

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Styling

The demo boxes can be customized by modifying `demo-plugin.css`. Key CSS classes:

- `.demo-box` - Container for the entire demo
- `.demo-preview` - Preview area
- `.demo-controls` - Button container
- `.demo-source` - Source code area
- `.demo-description` - Description text

### Dark Mode

Dark mode is automatically supported. The plugin detects `body.dark` class and applies appropriate styles.

## Contributing

Have ideas for improving the demo plugin? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Vue demos not working

Make sure Vue.js is loaded:
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

### React demos not working

Make sure React, ReactDOM, and Babel are loaded:
```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

### JSFiddle opens but code doesn't work

Check that your code doesn't rely on external utilities that aren't available in JSFiddle. The plugin includes the necessary framework libraries automatically.

### Code not highlighting properly

Make sure Prism.js (comes with Docsify) is loaded and the language is supported.

## License

This plugin is part of the utilite project and follows the same MIT license.
