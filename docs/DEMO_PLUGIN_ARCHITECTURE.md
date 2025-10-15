# Demo Plugin Architecture & Visual Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      utilite Documentation                       │
│                         (Docsify Site)                           │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Demo Plugin System                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ demo-plugin  │  │ demo-plugin  │  │  Framework   │         │
│  │     .js      │  │     .css     │  │   Libraries  │         │
│  │   (Logic)    │  │  (Styling)   │  │  (Vue/React) │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │  JavaScript  │ │     Vue      │ │    React     │
        │    Demos     │ │    Demos     │ │    Demos     │
        └──────────────┘ └──────────────┘ └──────────────┘
                │                │                │
                └────────────────┼────────────────┘
                                 ▼
                        ┌──────────────────┐
                        │  JSFiddle API    │
                        │   Integration    │
                        └──────────────────┘
```

## Component Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                          Demo Box Component                        │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                     Preview Area                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  • Console Output (JavaScript)                        │  │  │
│  │  │  • Live Component (Vue/React)                         │  │  │
│  │  │  • Error Messages                                     │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                     Control Buttons                         │  │
│  │  ┌──────────────┐              ┌──────────────────┐        │  │
│  │  │  Show Code   │              │  Try in JSFiddle │        │  │
│  │  │    Button    │              │      Button      │        │  │
│  │  └──────────────┘              └──────────────────┘        │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    Source Code Area                         │  │
│  │  (Collapsible - Hidden by default)                         │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  /* @desc Description */                              │  │  │
│  │  │  const code = 'Syntax highlighted';                   │  │  │
│  │  │  console.log(code);                                   │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────┐
│   Markdown   │
│     File     │
└──────┬───────┘
       │
       │ ```demo:javascript
       │ console.log('Hi');
       │ ```
       │
       ▼
┌──────────────┐
│   Docsify    │
│   Renders    │
└──────┬───────┘
       │
       │ HTML with data-lang="demo:javascript"
       │
       ▼
┌──────────────────┐
│  Plugin Hook     │
│  (doneEach)      │
└──────┬───────────┘
       │
       │ Find all demo blocks
       │
       ▼
┌──────────────────┐
│  Create Demo Box │
│     HTML         │
└──────┬───────────┘
       │
       │ Build structure
       │
       ▼
┌──────────────────────────────────────────┐
│           Execute/Render Code             │
├──────────────────────────────────────────┤
│                                           │
│  JavaScript  →  new Function() → Execute │
│  TypeScript  →  Show Notice → Display    │
│  Vue         →  Parse SFC → Mount        │
│  React       →  Transform JSX → Render   │
│                                           │
└──────┬───────────────────────────────────┘
       │
       │ Attach listeners
       │
       ▼
┌──────────────────┐
│  Interactive     │
│  Demo Ready!     │
└──────────────────┘
```

## Plugin Lifecycle

```
Page Load
    │
    ▼
Docsify Init
    │
    ▼
┌─────────────────────┐
│  afterEach Hook     │  ← Reset counter for new page
│  (Reset state)      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  doneEach Hook      │  ← Main processing
│  (Process demos)    │
└─────────┬───────────┘
          │
          ├─→ Find demo blocks
          │   (querySelectorAll)
          │
          ├─→ For each block:
          │   │
          │   ├─→ Extract code & language
          │   │
          │   ├─→ Create demo box HTML
          │   │
          │   ├─→ Replace code block
          │   │
          │   ├─→ Execute/render based on type
          │   │
          │   └─→ Attach event listeners
          │
          └─→ Re-highlight with Prism
              │
              ▼
         User Interaction
              │
              ├─→ Click "Show Code"
              │   └─→ Toggle visibility
              │
              └─→ Click "JSFiddle"
                  └─→ Submit to API
```

## Code Execution Flow

### JavaScript Execution

```
User Code
    │
    │ const x = 5;
    │ console.log(x * 2);
    │
    ▼
┌──────────────────────┐
│  Wrap console.log    │
│  (Capture output)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  new Function(code)  │
│  (Isolated scope)    │
└──────────┬───────────┘
           │
           ├─→ Execute
           │
           ├─→ Capture logs: ["10"]
           │
           └─→ Restore console.log
               │
               ▼
         Display Output
         in Preview Area
```

### Vue Execution

```
Vue SFC Code
    │
    │ <template>...</template>
    │ <script>...</script>
    │ <style>...</style>
    │
    ▼
┌──────────────────────┐
│   Parse Components   │
└──────────┬───────────┘
           │
           ├─→ Extract template
           ├─→ Extract script
           └─→ Extract style
               │
               ▼
┌──────────────────────┐
│  Add <style> to DOM  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Eval script code   │
│  (Component options) │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  new Vue({...})      │
│  .$mount('#app')     │
└──────────┬───────────┘
           │
           ▼
      Live Component
      in Preview Area
```

### React Execution

```
React JSX Code
    │
    │ const App = () => <h1>Hi</h1>;
    │ ReactDOM.render(<App />, root);
    │
    ▼
┌──────────────────────┐
│  Babel Transform     │
│  (JSX → JavaScript)  │
└──────────┬───────────┘
           │
           │ const App = () => 
           │   React.createElement('h1', null, 'Hi');
           │
           ▼
┌──────────────────────┐
│    Eval Code         │
└──────────┬───────────┘
           │
           ▼
      Live Component
      in Preview Area
```

## JSFiddle Integration Flow

```
User Click
"Try in JSFiddle"
    │
    ▼
┌─────────────────────────┐
│  Prepare Code           │
├─────────────────────────┤
│  • Separate HTML/JS/CSS │
│  • Add framework URLs   │
│  • Configure options    │
└─────────┬───────────────┘
          │
          ▼
┌─────────────────────────┐
│  Create Hidden Form     │
├─────────────────────────┤
│  <form method="POST">   │
│    <input name="html">  │
│    <input name="js">    │
│    <input name="css">   │
│    <input name="res...">│
│  </form>                │
└─────────┬───────────────┘
          │
          ▼
┌─────────────────────────┐
│  Submit to JSFiddle     │
│  (POST /api/post/...)   │
└─────────┬───────────────┘
          │
          ▼
┌─────────────────────────┐
│  JSFiddle Opens         │
│  in New Tab             │
│  with Code Ready        │
└─────────────────────────┘
```

## File Structure

```
utilite/
├── docs/
│   ├── index.html                    ← Entry point
│   │                                   • Loads Docsify
│   │                                   • Includes plugin files
│   │                                   • Loads framework CDNs
│   │
│   ├── demo-plugin.js                ← Core logic (~400 lines)
│   │   ├── createDemoBox()            • Creates HTML structure
│   │   ├── executeCode()              • Runs JavaScript
│   │   ├── renderVueDemo()            • Renders Vue
│   │   ├── renderReactDemo()          • Renders React
│   │   ├── openInJSFiddle()           • JSFiddle integration
│   │   └── Docsify plugin hooks       • afterEach, doneEach
│   │
│   ├── demo-plugin.css               ← Styling (~250 lines)
│   │   ├── .demo-box                  • Container styles
│   │   ├── .demo-preview              • Preview area
│   │   ├── .demo-controls             • Button styles
│   │   ├── .demo-source               • Code display
│   │   └── body.dark variants         • Dark mode
│   │
│   ├── _sidebar.md                   ← Navigation
│   │
│   ├── demo-guide.md                 ← User documentation
│   ├── quick-start-demos.md          ← Quick start
│   ├── array-examples.md             ← Live examples
│   ├── demo-test.md                  ← Test suite
│   │
│   └── DEMO_PLUGIN_README.md         ← Plugin README
│
└── DEMO_PLUGIN_IMPLEMENTATION.md     ← Technical docs
```

## State Management

```
Plugin State (Per Page)
├── demoCounter: number
│   └── Increments for each demo (for unique IDs)
│
Demo Box State
├── demoId: string
│   └── Unique identifier (e.g., "demo-0", "demo-1")
│
├── isCodeVisible: boolean
│   └── Tracks Show/Hide state (via display style)
│
└── Framework Instance
    ├── Vue instance (for Vue demos)
    └── React root (for React demos)
```

## Event Flow

```
User Interaction Events
│
├─→ Click "Show Code"
│   └─→ toggleBtn.addEventListener('click')
│       └─→ Toggle sourceDiv.style.display
│           └─→ Update button text/icon
│
└─→ Click "Try in JSFiddle"
    └─→ jsfiddleBtn.addEventListener('click')
        └─→ openInJSFiddle(code, language)
            ├─→ Prepare code (HTML/JS/CSS)
            ├─→ Create form with inputs
            ├─→ Submit form
            └─→ Open JSFiddle in new tab
```

## Error Handling

```
Code Execution
    │
    ▼
┌─────────────────┐
│  try {          │
│    Execute      │
│  }              │
└────┬────────────┘
     │
     ├─→ Success
     │   └─→ Display output
     │
     └─→ catch (error)
         └─→ Display error message
             └─→ Don't crash page
```

## Performance Optimization

```
┌─────────────────────────────────────┐
│        Performance Strategy          │
├─────────────────────────────────────┤
│                                      │
│  1. Lazy Execution                  │
│     └─→ Execute after page load     │
│                                      │
│  2. Isolated Scopes                 │
│     └─→ Each demo independent       │
│                                      │
│  3. Efficient DOM Operations        │
│     └─→ Single replace per block    │
│                                      │
│  4. Code Splitting                  │
│     └─→ Frameworks loaded on demand │
│                                      │
│  5. Minimal Dependencies            │
│     └─→ Only Docsify core required  │
│                                      │
└─────────────────────────────────────┘
```

## Security Model

```
┌─────────────────────────────────────┐
│         Security Layers              │
├─────────────────────────────────────┤
│                                      │
│  Layer 1: Input Validation          │
│  └─→ Only pre-written demo code     │
│                                      │
│  Layer 2: Sandboxed Execution       │
│  └─→ Function scope, no global      │
│                                      │
│  Layer 3: HTML Escaping             │
│  └─→ escapeHtml() for display       │
│                                      │
│  Layer 4: Error Boundaries          │
│  └─→ try-catch prevents crashes     │
│                                      │
│  Layer 5: HTTPS Only                │
│  └─→ All CDN resources secure       │
│                                      │
└─────────────────────────────────────┘
```

## Browser Rendering Pipeline

```
HTML Parse
    │
    ▼
DOM Construction
    │
    ▼
Docsify Processing
    │
    ▼
Demo Plugin Hook
    │
    ├─→ Modify DOM (add demo boxes)
    │
    ▼
CSSOM Construction
    │
    ├─→ demo-plugin.css loaded
    │
    ▼
Render Tree
    │
    ▼
Layout
    │
    ├─→ Calculate positions
    │
    ▼
Paint
    │
    ├─→ Draw demo boxes
    │
    ▼
Composite
    │
    ▼
JavaScript Execution
    │
    ├─→ Execute demo code
    ├─→ Attach event listeners
    │
    ▼
Interactive Page Ready!
```

---

This visual guide provides a comprehensive understanding of how the demo plugin works at various levels of abstraction, from high-level system overview to detailed execution flows.
