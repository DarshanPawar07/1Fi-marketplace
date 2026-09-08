import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products/:slug"
          element={<ProductPage />}
        />

        <Route
          path="/confirmation"
          element={<ConfirmationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;