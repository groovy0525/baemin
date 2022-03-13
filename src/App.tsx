import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
