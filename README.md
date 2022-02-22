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

You can configure the state of the interpreter by passing in a `config` object like this:

```typescript
import { execute, ITealInterpreterConfig } from "teal-interpreter";

const config: ITealInterpreterConfig = {
    /* Configuration goes here */
};

const teal = `/* your TEAL code */`;
const result = execute(teal, config);
```

The configuration allows you to provide values for global and local state and details for transactions, accounts, assets and applications.

Please see the [Configuration documentation](./docs/configuration.md) to learn more about configuring the TEAL interpreter.

## Development

See [the development guide](docs/development.md) for instructions on development of the TEAL interpreter.