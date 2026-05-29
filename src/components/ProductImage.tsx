import { useMemo, useState } from "react";
import type { LoadedDataV1 } from "../data/loadData";
import { getProductMediumUrl, getProductThumbUrl } from "../data/loadData";
import type { ProductRow } from "../data/types";

export type ProductImageProps = {
  product: ProductRow;
  kind: "thumb" | "medium";
  data: Pick<LoadedDataV1, "imageIndex">;
  baseUrl: string;
  alt?: string;
  onClick?: () => void;
};

export function ProductImage(props: ProductImageProps) {
  const [broken, setBroken] = useState(false);

  const src = useMemo(() => {
    if (props.kind === "thumb") return getProductThumbUrl(props.baseUrl, props.product, props.data.imageIndex);
    return getProductMediumUrl(props.baseUrl, props.product, props.data.imageIndex);
  }, [props.baseUrl, props.data.imageIndex, props.kind, props.product]);

  if (!src || broken) {
    return <div className={`img-fallback img-${props.kind}`}>Sem imagem</div>;
  }

  const img = (
    <img
      className={`img img-${props.kind}`}
      src={src}
      alt={props.alt ?? String(props.product.Produto ?? "")}
      loading={props.kind === "thumb" ? "lazy" : "eager"}
      onError={() => setBroken(true)}
    />
  );

  if (props.onClick) {
    return (
      <button
        type="button"
        className="img-btn"
        onClick={props.onClick}
        aria-label={`Ampliar imagem de ${props.alt ?? String(props.product.Produto ?? "")}`}
      >
        {img}
      </button>
    );
  }

  return img;
}

