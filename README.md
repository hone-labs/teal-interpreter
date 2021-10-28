# teal-interpreter

An interpreter for the TEAL assembly language that simulates the Algorand virtual machine.

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

Install depenencies as above, then run tests:

```bash
npm test
```

Or run tests in watch mode with live reload:

```bash
npm run test:watch
```
