import type { CourseRelatedProductsSection } from "./courseTypes";

export const courseProductLinks: Record<string, CourseRelatedProductsSection[]> = {
  "skincare-basico": [
    { title: "Limpeza facial (exemplos)", filter: { query: "gel de limpeza facial" }, limit: 6 },
    { title: "Hidratantes faciais (exemplos)", filter: { query: "hidratante facial" }, limit: 6 },
  ],
  "protecao-solar": [{ title: "Protetores solares (exemplos)", filter: { query: "protetor solar" }, limit: 8 }],
  "leitura-rotulo": [{ title: "Produtos para treinar leitura (exemplos)", filter: { query: "hidratante" }, limit: 6 }],
  "categorias-de-loja": [
    { title: "Limpeza facial (exemplos)", filter: { query: "gel de limpeza facial" }, limit: 6 },
    { title: "Hidratação (exemplos)", filter: { query: "hidratante facial" }, limit: 6 },
    { title: "Proteção solar (exemplos)", filter: { query: "protetor solar" }, limit: 6 },
  ],
  "comparar-parecidos": [
    { title: "Protetores solares (para comparar)", filter: { query: "protetor solar" }, limit: 4 },
    { title: "Limpeza facial (para comparar)", filter: { query: "gel de limpeza" }, limit: 4 },
  ],
  "treino-de-fala-objecoes": [
    { title: "Protetor com cor (exemplos)", filter: { query: "protetor solar com cor" }, limit: 6 },
    { title: "Hidratante facial (exemplos)", filter: { query: "hidratante facial" }, limit: 6 },
  ],
  "produtos-limpeza-facial": [
    { title: "Gel de limpeza (exemplos)", filter: { query: "gel de limpeza facial" }, limit: 6 },
    { title: "Água micelar (exemplos)", filter: { query: "água micelar" }, limit: 6 },
    { title: "Demaquilante (exemplos)", filter: { query: "demaquilante" }, limit: 6 },
  ],
  "produtos-hidratacao": [
    { title: "Hidratante facial (exemplos)", filter: { query: "hidratante facial" }, limit: 6 },
    { title: "Hidratante corporal (exemplos)", filter: { query: "hidratante corporal" }, limit: 6 },
    { title: "Sérum (exemplos)", filter: { query: "sérum" }, limit: 6 },
  ],
  "produtos-protecao-solar": [
    { title: "Protetor facial (exemplos)", filter: { query: "protetor solar facial" }, limit: 6 },
    { title: "Protetor com cor (exemplos)", filter: { query: "protetor solar com cor" }, limit: 6 },
    { title: "Protetor corporal (exemplos)", filter: { query: "protetor solar corporal" }, limit: 6 },
  ],
  "ativos-hidratacao-barreira": [
    { title: "Ceramidas (exemplos)", filter: { query: "ceramida" }, limit: 6 },
    { title: "Pantenol (exemplos)", filter: { query: "pantenol" }, limit: 6 },
    { title: "Ureia (exemplos)", filter: { query: "ureia" }, limit: 6 },
  ],
  "ativos-oleosidade-acne": [
    { title: "Niacinamida (exemplos)", filter: { query: "niacinamida" }, limit: 6 },
    { title: "Ácido salicílico (exemplos)", filter: { query: "salicílico" }, limit: 6 },
    { title: "Zinco (exemplos)", filter: { query: "zinco" }, limit: 6 },
  ],
  "ativos-antioxidantes-uniformizacao": [
    { title: "Vitamina C (exemplos)", filter: { query: "vitamina c" }, limit: 6 },
  ],
  "ativos-renovacao-anti-idade": [
    { title: "Retinol (exemplos)", filter: { query: "retinol" }, limit: 6 },
    { title: "Ácido glicólico (exemplos)", filter: { query: "glicólico" }, limit: 6 },
  ],
  "produtos-cabelo": [
    { title: "Shampoo (exemplos)", filter: { query: "shampoo" }, limit: 6 },
    { title: "Condicionador (exemplos)", filter: { query: "condicionador" }, limit: 6 },
    { title: "Máscara capilar (exemplos)", filter: { query: "máscara capilar" }, limit: 6 },
    { title: "Leave-in (exemplos)", filter: { query: "leave-in" }, limit: 6 },
  ],
  "produtos-corpo": [
    { title: "Hidratante corporal (exemplos)", filter: { query: "hidratante corporal" }, limit: 6 },
    { title: "Desodorante (exemplos)", filter: { query: "desodorante" }, limit: 6 },
  ],
  "produtos-perfumaria-maquiagem": [
    { title: "Body splash (exemplos)", filter: { query: "body splash" }, limit: 6 },
    { title: "Perfume (exemplos)", filter: { query: "perfume" }, limit: 6 },
    { title: "Maquiagem (exemplos)", filter: { query: "maquiagem" }, limit: 6 },
  ],
};
