import "@malloydata/render";
import { Result, QueryResult, ModelDef } from "@malloydata/malloy";
import React, { useEffect, useRef } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      let render = ref.current.querySelector("malloy-render");
      if (!render) {
        render = document.createElement("malloy-render");
        render.result = result;
        render.queryResult = queryResult;
        render.modelDef = modelDef;
        ref.current.appendChild(render);
      }
      render.result = result;
      render.queryResult = queryResult;
      render.modelDef = modelDef;
    }
  }, [result, queryResult, modelDef]);
  return <div ref={ref} />;
}
