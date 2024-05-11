import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  MalloyModelProvider,
  MalloyRender,
  useMalloyQuery,
} from "@malloydata/render-react";

const model = `
source: example is duckdb.sql('select * from "https://raw.githubusercontent.com/malloydata/malloy-svelte-example/main/data/Sales.csv"') extend {

  measure:
    total_revenue is revenue.sum()
    total_cost is cost.sum()

  view: records is { 
    select: *
    order_by: \`date\`
  }

  view: top_products is {
    group_by: Product
    aggregate: total_revenue
    limit: 10
  }

  view: top_sources is {
    group_by: \`source\`
    aggregate: total_revenue
    limit: 10
  }

  view: nested is {
    group_by: state
    aggregate: total_revenue
    nest: top_sources
  }

}
`;

const options = {};

function App() {
  return (
    <MalloyModelProvider script={model} options={options}>
      <Chart />
    </MalloyModelProvider>
  );
}

function Chart() {
  const r = useMalloyQuery("run: example -> top_products");
  console.log({ r });
  if (r) return <MalloyRender result={r} />;
  return null;
}

export default App;
