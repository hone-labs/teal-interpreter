# Development doc for the TEAL interpeter

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

## Deployment

To deploy a new version of the TEAL interpretter simply tag the commit for the new release with the version number in the following form:

```bash
v0.0.5
```

Don't forget to add the `v` to the tag, this is how the deployment pipeline knows the tag is a version (and not some other tag).

Now push tags:

```
git push --tags
```

The updated version will deploy automatically to npm (provided the automated tests pass).