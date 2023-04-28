import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes
  } from "react-router-dom";
  import Login from "./login/Login";
  import Category from './Category';
  import Employee from './Employee';
  import Products from './Products';
  import Checks from './Checks';
  import Customers from './Customers';
  import Menu from './Menu';
  import ProductsInTheShop from './ProductsInTheShop';
  import { useState } from "react";
  
  const userRoles = {
    manager: {
      category: true,
      employee: true,
      products: true,
      checks: true,
      customers: true,
      productsInShop: true,
    },
    cashier: {
      category: true,
      employee: true,
      products: true,
      checks: true,
      customers: true,
      productsInShop: true,
    },
  };
  
  function App() {
    const [user, setUser] = useState(localStorage.getItem("userRole") || null);
  
    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem("userRole");
    };
  
    const hasAccess = (resource) => {
      if (!user) return false;
      return userRoles[user][resource] || false;
    };

    console.log(user);
  
    return (
      <div className="App">
        <Router>
          {user && <Menu user={user} onLogout={handleLogout} />}
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/employee" /> : <Navigate to="/login" />
              }
            />
            <Route path="/category" element={hasAccess("category") ? <Category user={user}/> : <Navigate to="/login" />} />
            <Route path="/employee" element={hasAccess("employee") ? <Employee user={user}/> : <Navigate to="/login" />} />
            <Route path="/products" element={hasAccess("products") ? <Products user={user}/> : <Navigate to="/login" />} />
            <Route path="/checks" element={hasAccess("checks") ? <Checks user={user}/> : <Navigate to="/" />} />
            <Route path="/customers" element={hasAccess("customers") ? <Customers user={user}/> : <Navigate to="/login" />} />
            <Route path="/productsInShop" element={hasAccess("productsInShop") ? <ProductsInTheShop user={user}/> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
          </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;