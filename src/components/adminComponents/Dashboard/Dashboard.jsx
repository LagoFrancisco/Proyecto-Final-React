/*import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Dashboard.css";

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>

        <div className="header-actions">
          <Link className="btn btn-secondary" to="/">
            Volver a la tienda
          </Link>
          <button className="btn bg-delete primary" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-actions">
        <h3>Acciones rápidas</h3>

        <div className="actions-grid">
          <Link to="/admin/products/new" className="action-card">
          ➕Cargar
          </Link>
          
          <Link to="#" className="action-card disabled">
          ✏️ Modificar
          </Link>

          <Link to="#" className="action-card disabled">
          🗑️ Eliminar
          </Link>
        </div>
      </section>

      <section className="dashboard-help">
<h3>Ayuda</h3>
<p>Desde este panel podés gestionar los productos de la tienda.</p>
      </section>
    </div>
  );
};
*/

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  getProducts,
  deleteProductsFromFirebase,
} from "../../../services/productsService";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos de Firestore cuando se monta el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Manejador del botón de Eliminar
  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres elilinar este producto?",
    );
    if (confirmar) {
      try {
        await deleteProductsFromFirebase(id);
        // Actualiza el estado local de inmediato para borrarlo de la interfaz
        setProducts(products.filter((prod) => prod.id !== id));
        alert("Producto eliminado correctamente.");
      } catch (error) {
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>
        <div className="header-actions">
          <Link className="btn btn-secondary" to="/">
            Volver a la tienda
          </Link>
          <button className="btn bg-delete primary" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-actions">
        <h3>Acciones rápidas</h3>
        <div className="actions-grid">
          <Link to="/admin/products/new" className="action-card">
            ➕ Cargar
          </Link>
          <Link to="/admin/orders" className="action-card">
            🥡 Ver Órdenes
          </Link>{" "}
          {/*Nuevo acceso */}
          {/* CORRECCIÓN: Quite los links con "#" para que no se rompan la app */}
          {/*<div className="action-card disabled">✏️ Modificar</div>
          <div className="action-card disabled">❌ Eliminar</div>*/}
        </div>
      </section>

      {/* NUEVA SECCIÓN DE PRODUCTOS CARGADOS */}
      <section className="dashboard-products">
        <div className="products-list-header">
          <h3>Productos cargados</h3>
          <span className="products-count">
            {products.length} productos en total
          </span>
        </div>

        {loading ? (
          <p className="status-text">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="status-text">
            No hay productos cargados en la base de datos.
          </p>
        ) : (
          <div className="admin-products-list">
            {products.map((product) => (
              <div key={product.id} className="admin-product-row">
                <div className="product-main-info">
                  <img
                    src={product.image || "https://placeholder.com"}
                    alt={product.name}
                    className="admin-product-thumbnail"
                  />
                  <div className="product-titles">
                    <h4>{product.name}</h4>
                    <p className="product-row-price">${product.price}</p>
                  </div>
                </div>

                <div className="product-row-actions">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="btn-row bg-edit"
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    className="btn-row bg-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    ❌ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-help">
        <h3>Ayuda</h3>
        <p>Desde este panel podés gestionar los productos de la tienda.</p>
      </section>
    </div>
  );
};
