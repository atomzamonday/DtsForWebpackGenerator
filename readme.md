Generate d.ts from media files (.m4a or .png or etc.).

# Usage:

## Typescript

```typescript
import { source, include, exclude } from "./dtsgen.config.json";
import generator, { DtsForWebpackGeneratorConfig } from "dtsforwebpackgenerator";

const config: DtsForWebpackGeneratorConfig = {
  include,
  exclude,
  resolveDir: source,
};

generator(config);
```

## Javascript / Node Commonjs

```typescript
const generator = require("dtsforwebpackgenerator");
const { source, include, exclude } = require("./dtsgen.config.json");

const config = {
  include,
  exclude,
  resolveDir: source,
};

generator(config);
```
