import type { ReactNode } from "react";
import { Button } from "./Button";

export type ResultsListProps = {
  title: string;
  shown: number;
  total: number;
  hasMore: boolean;
  onLoadMore: () => void;
  children: ReactNode;
};

export function ResultsList(props: ResultsListProps) {
  return (
    <div className="results">
      <div className="results-header">
        <h2>{props.title}</h2>
        <div className="results-count">
          {props.shown} / {props.total}
        </div>
      </div>
      <div className="results-body">{props.children}</div>
      {props.hasMore ? (
        <div className="results-footer">
          <Button type="button" variant="primary" onClick={props.onLoadMore}>
            Carregar mais
          </Button>
        </div>
      ) : null}
    </div>
  );
}

