import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrdersFromFirebase } from "../../../services/productsService";
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
                  <span className="order.id">🆔 ID: {order.id}</span>
                  <span className="order-date">
                    📆{" "}
                    {order.date?.seconds
                      ? new Date(order.date.seconds * 1000).toLocaleDateString()
                      : "S/D"}
                  </span>
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
