# Demo Plugin Test Page

This page tests all features of the interactive demo plugin.

## Test 1: Basic JavaScript Console Output

```demo:javascript
/* @desc Simple console.log test */
console.log('Test 1: Basic console output works!');
console.log('Numbers:', [1, 2, 3, 4, 5]);
console.log('Object:', { name: 'utilite', version: '1.0' });
```

## Test 2: JavaScript with Calculations

```demo:javascript
/* @desc Mathematical operations */
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
const average = sum / numbers.length;

console.log('Numbers:', numbers);
console.log('Sum:', sum);
console.log('Average:', average);
```

## Test 3: Array Manipulation

```demo:javascript
/* @desc Array filtering and mapping */
const data = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

const names = data.map(person => person.name);
const adults = data.filter(person => person.age >= 30);

console.log('Original data:', data);
console.log('Names only:', names);
console.log('Adults (30+):', adults);
```

## Test 4: String Operations

```demo:javascript
/* @desc String manipulation */
const text = 'Hello World from utilite';
const words = text.split(' ');
const reversed = text.split('').reverse().join('');
const uppercase = text.toUpperCase();

console.log('Original:', text);
console.log('Words:', words);
console.log('Reversed:', reversed);
console.log('Uppercase:', uppercase);
```

## Test 5: Error Handling

```demo:javascript
/* @desc This demo intentionally has an error */
console.log('Before error...');
// This will cause an error
thisVariableDoesNotExist.someMethod();
console.log('After error (you should not see this)');
```

## Test 6: TypeScript Code

```demo:typescript
/* @desc TypeScript interface and type checking */
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999, inStock: true },
  { id: 2, name: 'Mouse', price: 29, inStock: false },
  { id: 3, name: 'Keyboard', price: 79, inStock: true }
];

const availableProducts = products.filter(p => p.inStock);
const totalValue = products.reduce((sum, p) => sum + p.price, 0);

console.log('Total products:', products.length);
console.log('Available:', availableProducts.length);
console.log('Total inventory value:', totalValue);
```

## Test 7: Vue Component - Counter

```demo:vue
<template>
  <div class="counter-demo">
    <h4>{{ title }}</h4>
    <div class="display">
      <span class="count">{{ count }}</span>
    </div>
    <div class="buttons">
      <button @click="decrement" class="btn btn-danger">-</button>
      <button @click="reset" class="btn btn-warning">Reset</button>
      <button @click="increment" class="btn btn-success">+</button>
    </div>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vue Counter Test',
      count: 0
    }
  },
  computed: {
    message() {
      if (this.count === 0) return 'Click a button to start!';
      if (this.count > 0) return `Positive: ${this.count}`;
      return `Negative: ${this.count}`;
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    }
  }
}
</script>

<style>
.counter-demo {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.display {
  margin: 20px 0;
}
.count {
  font-size: 48px;
  font-weight: bold;
  color: #42b983;
}
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-success {
  background: #42b983;
  color: white;
}
.btn-success:hover {
  background: #35a372;
}
.btn-danger {
  background: #f56c6c;
  color: white;
}
.btn-danger:hover {
  background: #e04040;
}
.btn-warning {
  background: #e6a23c;
  color: white;
}
.btn-warning:hover {
  background: #cf8c2e;
}
.message {
  color: #606266;
  font-style: italic;
}
</style>
```

## Test 8: Vue Component - List

```demo:vue
<template>
  <div class="list-demo">
    <h4>Todo List</h4>
    <div class="input-group">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="Add a new task..."
        class="todo-input"
      />
      <button @click="addTodo" class="add-btn">Add</button>
    </div>
    <ul class="todo-list">
      <li 
        v-for="(todo, index) in todos" 
        :key="index"
        :class="{ completed: todo.done }"
      >
        <input 
          type="checkbox" 
          v-model="todo.done"
          class="checkbox"
        />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="remove-btn">×</button>
      </li>
    </ul>
    <p class="stats">{{ remaining }} remaining of {{ todos.length }} tasks</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { text: 'Test Vue components', done: true },
        { text: 'Test React components', done: false },
        { text: 'Test JSFiddle integration', done: false }
      ]
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(t => !t.done).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ text: this.newTodo, done: false });
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style>
.list-demo {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.add-btn {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.todo-list li.completed {
  opacity: 0.6;
}
.todo-list li.completed span {
  text-decoration: line-through;
}
.checkbox {
  width: 18px;
  height: 18px;
}
.remove-btn {
  margin-left: auto;
  background: #f56c6c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}
.stats {
  text-align: center;
  color: #909399;
  margin-top: 20px;
}
</style>
```

## Test 9: React Component - Counter

```demo:react
/* @desc React counter with hooks */
const { useState } = React;

function ReactCounter() {
  const [count, setCount] = useState(0);
  
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    count: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#61dafb',
      margin: '20px 0'
    },
    button: {
      margin: '0 5px',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    primary: {
      background: '#61dafb',
      color: '#282c34'
    },
    danger: {
      background: '#f56c6c',
      color: 'white'
    }
  };
  
  return (
    <div style={styles.container}>
      <h4>React Counter Test</h4>
      <div style={styles.count}>{count}</div>
      <div>
        <button 
          style={{...styles.button, ...styles.danger}}
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
        <button 
          style={{...styles.button, background: '#e6a23c', color: 'white'}}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
        <button 
          style={{...styles.button, ...styles.primary}}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<ReactCounter />, document.getElementById('root'));
```

## Test 10: React Component - Form

```demo:react
/* @desc React form with state management */
const { useState } = React;

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };
  
  const styles = {
    form: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '100px',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#61dafb',
      color: '#282c34',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    success: {
      padding: '10px',
      background: '#67c23a',
      color: 'white',
      borderRadius: '4px',
      marginTop: '10px',
      textAlign: 'center'
    }
  };
  
  return (
    <div style={styles.form}>
      <h4>Contact Form</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          style={styles.input}
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
      {submitted && (
        <div style={styles.success}>
          Message sent successfully! ✓
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<ContactForm />, document.getElementById('root'));
```

## Testing Checklist

Use this page to verify:

- [ ] JavaScript demos execute and show console output
- [ ] TypeScript demos show notice about compilation
- [ ] Vue components render and are interactive
- [ ] React components render and are interactive
- [ ] Show/Hide Code button works
- [ ] Code syntax highlighting displays correctly
- [ ] Try in JSFiddle button opens JSFiddle with code
- [ ] Errors are displayed gracefully
- [ ] Mobile responsive layout works
- [ ] Dark mode styles apply correctly
- [ ] Descriptions from @desc comments display

## What to Test in JSFiddle

Click "Try in JSFiddle" on each demo and verify:

1. Code loads correctly in JSFiddle
2. Required libraries are included
3. Code executes properly
4. You can modify and re-run the code

## Report Issues

If you find any issues with the demo plugin, please report them on GitHub!
