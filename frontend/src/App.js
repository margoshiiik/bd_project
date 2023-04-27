import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
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
    checks: false,
    customers: true,
    productsInShop: true,
  },
  cashier: {
    category: false,
    employee: false,
    products: false,
    checks: true,
    customers: false,
    productsInShop: true,
  },
};

function App() {
  const [user, setUser] = useState(null);

  const hasAccess = (path) => {
    if (!user) return false;
    const resource = path.replace(/^\//, '');
    return userRoles[user][resource] || false;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Menu /> : <Login onLogin={(role) => setUser(role)} />,
      children: [
        {
          path: "*",
          element: (
              <Routes>
                <ProtectedRoute
                    path="category"
                    hasAccess={hasAccess}
                    element={<Category />}
                />
                <ProtectedRoute
                    path="employee"
                    hasAccess={hasAccess}
                    element={<Employee />}
                />
                <ProtectedRoute
                    path="products"
                    hasAccess={hasAccess}
                    element={<Products />}
                />
                <ProtectedRoute
                    path="checks"
                    hasAccess={hasAccess}
                    element={<Checks />}
                />
                <ProtectedRoute
                    path="customers"
                    hasAccess={hasAccess}
                    element={<Customers />}
                />
                <ProtectedRoute
                    path="productsInShop"
                    hasAccess={hasAccess}
                    element={<ProductsInTheShop />}
                />
              </Routes>
          ),
        },
      ],
    },
  ]);

  return (
      <div className="App">
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </div>
  );
}

const ProtectedRoute = ({ path, hasAccess, element }) => {
  if (hasAccess(path)) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default App;
