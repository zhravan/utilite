# Quick Start: Using Interactive Demos

Get started with interactive code demos in 2 minutes!

## Step 1: Write a Demo

In your markdown file, use the `demo:language` syntax:

````markdown
```demo:javascript
/* @desc Hello World Example */
console.log('Hello from utilite!');
```
````

## Step 2: View the Result

When you load the documentation, you'll see:

1. **Preview Area** - Shows the code output immediately
2. **Show Code Button** - Click to view/hide the source code
3. **Try in JSFiddle Button** - Opens the code in JSFiddle

## Step 3: Experiment

- Click "Try in JSFiddle" to modify the code
- Change values and see different results
- Share your fiddle with others

## Supported Languages

| Language | Syntax | Example |
|----------|--------|---------|
| JavaScript | `demo:javascript` or `demo:js` | Array operations, string manipulation |
| TypeScript | `demo:typescript` or `demo:ts` | Type-safe code examples |
| Vue | `demo:vue` | Vue component with template, script, style |
| React | `demo:react` or `demo:jsx` | React functional or class components |

## Example: Array Utilities

````markdown
```demo:javascript
/* @desc Filter even numbers from array */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evens);
```
````

**Result**: You'll see the console output displayed in the preview!

## Example: Vue Component

````markdown
```demo:vue
<template>
  <div>
    <h3>{{ greeting }}</h3>
    <button @click="count++">Clicked {{ count }} times</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Hello Vue!',
      count: 0
    }
  }
}
</script>

<style>
button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```
````

**Result**: A live, interactive Vue component!

## Example: React Component

````markdown
```demo:react
/* @desc Simple React counter */
const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```
````

**Result**: A live, interactive React component!

## Tips

✅ **DO:**
- Add `@desc` comments to explain what the demo does
- Keep examples focused and simple
- Test your code before committing
- Use real-world scenarios

❌ **DON'T:**
- Make demos too complex
- Forget to include required code
- Use external dependencies not loaded in docs
- Leave out error handling

## Need Help?

- 📖 Read the [full demo guide](demo-guide.md)
- 💡 See [array examples](array-examples.md) for inspiration
- 🐛 Check [troubleshooting](demo-guide.md#troubleshooting)
- 💬 Ask on [Discord](https://discord.gg/JCKzJcb24r)

## What's Next?

1. Check out the [demo guide](demo-guide.md) for advanced features
2. Browse [array examples](array-examples.md) to see it in action
3. Create your own interactive examples
4. Share with the community!

---

Happy coding! 🚀
