# Offer

## Development Rules (PLEASE PAY ATTENTION!):
1. **Image**: Use next/image for SEO optimization.
2. **Component imports**: Use dynamic import by next (next/dynamic) for lazy loading.
3. **Font**: Use next/font for font optimization.
4. **Config**: Configure environment variables into 2 stages: dev and prod.
5. **Custom URLs**: if you want to use custom url,  name files in the form of: /app/[slug].jsx 
6. **Styling**:
* Primarily use styled-components (preferred) & scss. Don't mix these two in the same components.
* ALWAYS: use global font & color.
* DONT: use in-line styling & built-in css (antd, bootstrap, tailwind).
7. Adhere to Typescript rules.
8. Import global packages before local packages.

## Github Commit rules:
1. Git branch: #(issue-number)-task-description
2. Modular code: 
 - Compartmentalize your PR, each should only do one job (e.g. create a page/refactoring). Don't group multiple tasks into a bulk of code.
 - Good rule of thumb: limit each PR to 300 lines of code changes.
4. Each PR should be linked to an issue.
5. Clear description.
6. Lazy Progamming: "Write what you need and no more, but when you write it, do it right."


## Available Scripts

### Running the development server.

```bash
    npm run dev
```
The server is up at [localhost:3000](http://localhost:3000/)

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

