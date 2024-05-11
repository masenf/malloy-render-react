# Malloy Render React components

export { MalloyRender } from "./malloy-render";
export {
useMalloyModel,
useMalloyQuery,
MalloyModelProvider,
} from "./use-malloy-duckdb";

## \<MalloyRender />

A React component for rendering Malloy results. Takes either a `result` object or a combination of `queryResult` and `modelDef`:

```javascript
<MalloyRender result={result} />

<MalloyRender queryResult={queryResult} modelDef={modelDef}>
```

## Malloy DuckDB WASM Hooks

Malloy models can be run locally in the browser using the following components and hooks

- `<MalloyModelProvider script={modelScript} />`: provides a context for setting up a model
- `useMalloyModel()`: hook for accessing Malloy model runtime within MalloyModelProvider
- `useMalloyQuery(queryString)`: hook for executing a Malloy query from model within MalloyModelProvider context
