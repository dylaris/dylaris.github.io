# Getting Started with Alpine.js

Alpine.js is a rugged, minimal framework for composing JavaScript behavior in your markup. It lets you write most of your JavaScript inline in your HTML.

## Why Alpine.js?

1. **Minimal** - Only 7kB gzipped
2. **No Build Step** - Just include and go
3. **Declarative** - Write behavior directly in HTML
4. **Reactive** - Automatically updates when data changes

## Basic Example

```html
<div x-data="{ count: 0 }">
    <button @click="count++">Increment</button>
    <span x-text="count"></span>
</div>
