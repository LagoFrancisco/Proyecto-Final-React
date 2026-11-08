import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { Login } from "./components/Login/Login";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AdminLayout } from "./layouts/AdminLayout";
import { PublicLayout } from "./layouts/PublicLayout";

function App() {
  return (
    <>
      {/*--------------------------------RUTAS PUBLICAS--------------------------------------------------*/}

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:category" element={<ItemListContainer />} />
        </Route>

        {/* Login por fuera de AdminLayout para acceder si no estamos logueados. (Tiene que estar por fuera del ProtectedRoute para que no me pida un login para poder logearme*/}
        <Route path="/admin/login" element={<Login />} />

        {/*--------------------------------------ADMIN--------------------------------------------------*/}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* RUTAS ADMIN */}
          <Route index element={<Navigate to={"dashboard"} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/edit/:id" element={<ProductFormContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess />} />

          {/* Opcionales */}
          {/* <Route path="dashboard" element={<DashboardFull />} /> */}
          {/* <Route path="products" element={<ProductAdminListContainer />} /> */}
          {/* <Route path="products/edit/:id" element={<ProductFormContainerDual />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
