import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import SingleProduct from "./pages/singleProduct";
import LoginModal from "./components/LoginModal";
import Wishlist from "./pages/wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/profile";
import AllProducts from "./pages/products";
import Orders from "./pages/orders";

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:productID" element={<SingleProduct />} />
        <Route path="/wishlist" element={<ProtectedRoute />}>
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
      <Cart />
      <LoginModal />
    </Provider>
  );
}

export default App;
