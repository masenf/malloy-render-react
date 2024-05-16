import "@malloydata/render";
import type { MalloyRenderProps } from "@malloydata/render";
import React, { useEffect, useRef } from "react";

type MalloyRenderElement = HTMLElement & MalloyRenderProps;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "malloy-render": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        MalloyRenderElement
      >;
    }
  }
}

export function MalloyRender({
  result,
  queryResult,
  modelDef,
}: MalloyRenderProps) {
  const ref = useRef<MalloyRenderElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.result = result;
      ref.current.queryResult = queryResult;
      ref.current.modelDef = modelDef;
    }
  }, [result, queryResult, modelDef]);
  return <malloy-render ref={ref} />;
}
