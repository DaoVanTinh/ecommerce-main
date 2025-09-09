import { Routes, Route, Navigate } from "react-router-dom";
import NonAuthLayout from "../layouts/NonAuth";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import ProductManagement from "../pages/ProductManagement";
import NotFoundPage from "../pages/404Page";
import { getValueFromLocalStorage } from "../utils";
import AddEditProduct from "../pages/AddEditProduct";

const AppRouters = () => {
  const rawToken = getValueFromLocalStorage("token");
  const token = !!rawToken && rawToken !== "null" && rawToken !== "undefined";

  return (
    <Routes>
      <Route path="/auth" element={<NonAuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      {token && (
        <Route path="/" element={<MainLayout />}>
          <Route path="product-management" element={<ProductManagement />} />
          <Route index element={<Navigate to="product-management" replace />} />
          <Route path="add-product" element={<AddEditProduct />} />
        </Route>
      )}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouters;
