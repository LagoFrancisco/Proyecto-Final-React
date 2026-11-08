import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllOrdersFromFirebase,
  deleteOrderFromFirebase,
} from "../../../services/productsService";
import "./OrdersAdminList.css";

export const OrdersAdminList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrdersFromFirebase();
        setOrders(data.sort((a, b) => b.date?.seconds - a.date?.seconds));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteClick = async (orderId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta órden permanentemente?",
    );
    if (confirmar) {
      try {
        await deleteOrderFromFirebase(orderId);
        setOrders((currentOrders) =>
          currentOrders.filter((order) => order.id !== orderId),
        );
        alert("Órden eliminada correctamente.");
      } catch (error) {
        alert("Hubo un error al intentar eliminar la órden.");
      }
    }
  };

  return (
    <div className="orders-admin">
      <header className="dashboard-header">
        <h2>Gestión de Órdenes de compra</h2>
        <Link className="btn btn-secondary" to="/admin/dashboard">
          Volver al Dashboard
        </Link>
      </header>

      <section className="orders-section">
        {loading ? (
          <p className="status-text">Cargando órdenes...</p>
        ) : orders.length === 0 ? (
          <p className="status-text">No hay órdenes registradas.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header-info">
                  <div>
                    <span className="order-id">🆔 ID: {order.id}</span>
                    <span className="order-date">
                      📆
                      {order.date?.seconds
                        ? new Date(
                            order.date.seconds * 1000,
                          ).toLocaleDateString()
                        : "S/D"}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteClick(order.id)}>
                    🧺 Eliminar
                  </button>
                </div>

                <div className="order-buyer-details">
                  <h4>Cliente: {order.buyer?.name}</h4>
                  <p>✉️ Email: {order.buyer?.email}</p>
                  <p>📞 Tel: {order.buyer?.phone}</p>
                </div>
                <div className="order-items-box">
                  <h5>Productos:</h5>
                  <ul>
                    {order.items?.map((item, idx) => (
                      <li key={idx}>
                        ▫️ {item.name} (x{item.quantity}) - ${item.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-footer-info">
                  <span className="order-total">TOTAL: ${order.total}</span>
                  <span className="order-status">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
