import type { LoadedDataV1 } from "../data/loadData";
import type { ProductRow } from "../data/types";
import {
  formatCautionLevel,
  formatComplexityLevel,
  formatRoutineStep,
  formatTagList
} from "../presentation/formatters";
import { Button } from "./Button";
import { ProductImage } from "./ProductImage";

export type ProductCardProps = {
  product: ProductRow;
  data: Pick<LoadedDataV1, "imageIndex">;
  baseUrl: string;
  onOpen: () => void;
  onToggleCompare: () => void;
  isInCompare: boolean;
  onToggleFavorite: () => void;
  isFavorite: boolean;
};

export function ProductCard(props: ProductCardProps) {
  const needs = formatTagList(props.product.need_tags).slice(0, 2);

  return (
    <div className="card">
      <div className="card-img">
        <ProductImage product={props.product} kind="thumb" data={props.data} baseUrl={props.baseUrl} />
      </div>
      <div className="card-body">
        <div className="card-title">{String(props.product.Produto ?? "")}</div>
        <div className="card-subtitle">{String(props.product.Marca ?? "")}</div>
        <div className="card-meta">
          <span>{formatRoutineStep(props.product.routine_step)}</span>
          <span>{formatCautionLevel(props.product.caution_level)}</span>
          <span>{formatComplexityLevel(props.product.complexity_level)}</span>
        </div>
        {needs.length > 0 ? <div className="card-help">Pode fazer sentido para: {needs.join("; ")}.</div> : null}
        <div className="card-actions">
          <Button type="button" variant="primary" onClick={props.onOpen}>
            Abrir ficha
          </Button>
          <Button type="button" variant="secondary" onClick={props.onToggleCompare}>
            {props.isInCompare ? "Remover da comparação" : "Comparar"}
          </Button>
          <Button type="button" variant="secondary" onClick={props.onToggleFavorite}>
            {props.isFavorite ? "Remover favorito" : "Favoritar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
