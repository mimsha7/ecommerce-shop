import { Product } from "./Product";

export function ProductsGrid({ products, addCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} addCart={addCart} />
        );
      })};
    </div>
  );
}
