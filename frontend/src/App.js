import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Category from './Category';
import Employee from './Employee';
import Products from './Products'; 
import Checks from './Checks'; 
import Customers from './Customers'
import Menu from './Menu'
import ProductsInTheShop from './ProductsInTheShop'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Menu />,
    },
    {
      path: "/category",
      element: <Category />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/checks",
      element: <Checks />,
    },
    {
      path: "/customers",
      element: <Customers />,
    },
    {
      path: "/productsInShop",
      element: <ProductsInTheShop />,
    },
  ]);


  
  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
