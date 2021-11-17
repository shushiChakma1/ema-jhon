import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Manage from './components/manage/Manage';
import NotFound from "./components/not found/NotFound";
import ProductDetails from "./components/productDetail/ProductDetails";
import Review from "./components/review/Review";
import Shop from './components/Shop/Shop';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route  path="/shop" element={<Shop/>}/>
          <Route  path="/manage" element={<Manage/>}/>
          <Route path="/review" element={<Review/>}/>
          <Route path="/" element={<Shop/>}/>
          <Route path="/product/:productKey" element={<ProductDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
