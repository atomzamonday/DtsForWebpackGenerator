Generate d.ts from media files (.m4a or .png or etc.).

# Usage:

## Typescript

```typescript
import generator from "dtsforwebpackgenerator";
generator({ include: [], exclude: [], resolveDirPath: "./src" });
```

## Javascript / Node Commonjs

```typescript
const generator = require("dtsforwebpackgenerator");
generator({ include: [], exclude: [], resolveDirPath: "./src" });
```
