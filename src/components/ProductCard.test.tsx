import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProductCard } from "./ProductCard";

test("ProductCard mostra meta em linguagem humana (sem snake_case)", () => {
  render(
    <ProductCard
      product={{
        URL_produto: "https://example.com/p",
        Produto: "Protetor X",
        Marca: "Marca Y",
        routine_step: "protecao_solar",
        caution_level: "alto",
        complexity_level: "basico",
        comparison_group: "protecao_solar"
      }}
      data={{ imageIndex: new Map() }}
      baseUrl="/"
      onOpen={() => {}}
      onToggleCompare={() => {}}
      isInCompare={false}
      onToggleFavorite={() => {}}
      isFavorite={false}
    />
  );

  expect(screen.getByText("Proteção solar")).toBeInTheDocument();
  expect(screen.getByText("Alta cautela")).toBeInTheDocument();
  expect(screen.getByText("Uso simples")).toBeInTheDocument();
});

