import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/productScreen";
import CategoryScreen from "./screens/categoryScreen";
import ProductEditScreen from "./screens/productEditScreen";
import NavBar from "./components/NavBar";
import CategoryEditScreen from "./screens/categoryEditScreen";

const App = () => {
  return (
    <Router>
      <NavBar />
        <Routes>
        <Route path="/categories/edit" element={<CategoryEditScreen />} />
        <Route path="/categories" element={<CategoryScreen />} />
        <Route path="/product/edit" element={<ProductEditScreen />} />
        <Route path="/" exact element={<ProductScreen />} />
        </Routes>
    </Router>
  );
};

export default App;
