Form fields share one warm look: clay focus ring, espresso-tinted shadow, roomy padding.

```jsx
<Input label="Target role" placeholder="Senior Backend Engineer" icon={<SearchIcon/>} />
<Textarea label="Paste job description" rows={5} />
<Select label="Difficulty"><option>Mixed</option><option>Hard</option></Select>
<Checkbox checked label="Behavioral" />
<Switch checked={dark} onChange={setDark} label="Evening mode" />
```

`Input`/`Textarea` take `label`, `hint`, `error`. `Switch.onChange` receives the next boolean. All respect `disabled`.
