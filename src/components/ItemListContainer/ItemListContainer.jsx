import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { getByCategory, getProducts } from "../../services/productsService";
import { useParams } from "react-router-dom";


export const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getByCategory(category)
      .then((data) => setProducts(data))
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Cargando...</p>;
  if (errors) return <p>{errors}</p>;

  return (
    <section>
      <h1>Productos</h1>
      <ItemList products={products} />
    </section>
  );
};
