import "@malloydata/render";
import { Result, QueryResult, ModelDef } from "@malloydata/malloy";
import React, { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "malloy-render": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        result?: Result;
        queryResult?: QueryResult;
        modelDef?: ModelDef;
      }; // todo: malloy render props exports
    }
  }
}

type MalloyRenderProps = {
  result?: Result;
  queryResult?: QueryResult;
  modelDef?: ModelDef;
};

export function MalloyRender({
  result,
  queryResult,
  modelDef,
}: MalloyRenderProps) {
  return (
    <malloy-render
      result={result}
      queryResult={queryResult}
      modelDef={modelDef}
    />
  );
}
