import { DuckDBWASMConnection } from "@malloydata/db-duckdb/wasm";
import type { ModelMaterializer } from "@malloydata/malloy";
import { SingleConnectionRuntime, Result } from "@malloydata/malloy";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MalloyModelOptions = {
  rowLimit?: number;
  onConnection?: (connection: DuckDBWASMConnection) => Promise<void>;
};

export class MalloyModel {
  private connection: DuckDBWASMConnection;
  private runtime: SingleConnectionRuntime;
  private model: ModelMaterializer;

  constructor(
    script: string,
    {
      rowLimit = 1000,
      onConnection = async (connection: DuckDBWASMConnection) => {},
    }: MalloyModelOptions
  ) {
    this.connection = new DuckDBWASMConnection("duckdb", null, undefined, {
      rowLimit,
    });
    onConnection(this.connection); // TODO: do we need to wait for this before loading the model? for example, registering file buffers async?
    this.runtime = new SingleConnectionRuntime(this.connection);
    this.model = this.runtime.loadModel(script);
  }

  async runQuery(query: string) {
    await this.connection.connecting;
    const runner = this.model.loadQuery(query);
    return await runner.run();
  }
}

const MalloyModelContext = createContext<MalloyModel | null>(null);
export const useMalloyModel = () => useContext(MalloyModelContext);
export const useMalloyQuery = (query: string) => {
  const model = useMalloyModel();
  if (!model) {
    throw new Error("MalloyModel not found in context");
  }
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    model.runQuery(query).then(setResult);
  }, [query]);
  return result;
};
export const MalloyModelProvider = ({
  children,
  script,
  options,
}: {
  children: ReactNode;
  script: string;
  options: MalloyModelOptions;
}) => {
  const modelRef = useRef<MalloyModel | null>(null);
  if (!modelRef.current) {
    modelRef.current = new MalloyModel(script, options);
  }
  return (
    <MalloyModelContext.Provider value={modelRef.current}>
      {children}
    </MalloyModelContext.Provider>
  );
};
