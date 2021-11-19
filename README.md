# teal-interpreter

An interpreter for the TEAL assembly language that simulates the Algorand virtual machine.

## Use the API

Install it in your Node.js project:

```bash
npm install teal-interpreter
```

Execute TEAL code and print the result:

```typescript
import { execute } from "teal-interpreter";

const teal = `
    int 1
    int 2
    +
`;

const result = execute(teal);

console.log("== STACK ==");
console.log(result.stack);
```

You can configuration the state of the interpreter by passing in a configuration object:

```typescript
import { execute, ITealInterpreterConfig } from "teal-interpreter";

const config: ITealInterpreterConfig = {

};

const teal = `/* your TEAL code */`;
const result = execute(teal, config);
```

Please see the [Configuration documentation](./docs/configuration.md) to learn more about configuring the TEAL interpreter.

## Run in development

Clone this repo.

Install dependencies:

```bash
cd teal-interpreter
npm install
```

Run once off (with example/test.teal) as input:

```bash
npm start
```

Or run in watch mode with live reload:

```bash
npm run start:dev
```

Full command:

```bash
npx ts-node ./src/cli.ts ./examples/test.teal
```

## Testing

Install dependencies as above, then run tests:

```bash
npm test
```

Or run tests in watch mode with live reload:

```bash
npm run test:watch
```
