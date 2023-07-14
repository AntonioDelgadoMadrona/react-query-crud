import { Products } from "./components/Products/Products";
import { ProductForm } from "./components/ProductForm/ProductForm";

export function App() {
  return (
    <div className="app-container">
      <ProductForm />
      <Products />
    </div>
  );
}