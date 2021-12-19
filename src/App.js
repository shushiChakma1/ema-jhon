import { createContext, useState } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Login from "./components/login/Login";
import Manage from './components/manage/Manage';
import NotFound from "./components/not found/NotFound";
import PrivateRoute from './components/privateRoute/PrivateRoute';
import ProductDetails from "./components/productDetail/ProductDetails";
import Review from "./components/review/Review";
import Shipping from "./components/shiping/Shipping";
import Shop from './components/Shop/Shop';


export const userContext = createContext();

function App() {
  const [logInUser,setLogInUser] = useState({})
  return (
    <userContext.Provider value = {[logInUser,setLogInUser]}>
      <h3>email : {logInUser.email}</h3>
      <Router>
      <Header></Header>
        <Routes>
          <Route  path="/shop" element={<Shop/>}/>
          <Route  path="/manage" element={<PrivateRoute> <Manage/> </PrivateRoute>}/>
          <Route path="/review" element={<Review/>}/>\
          {/* <Route path="/shipping" element={<Shipping/>}/> */}
          <Route path="/Shipping" element={<PrivateRoute> <Shipping/> </PrivateRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Shop/>}/>
          <Route path="/product/:productKey" element={<ProductDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}
export default App;
