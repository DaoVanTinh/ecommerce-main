import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Home from "../pages/Home";

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
          <Route path="add-product" element={<AddEditProduct />} />

          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route index element={<Home />} />
        </Route>
      )}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouters;
