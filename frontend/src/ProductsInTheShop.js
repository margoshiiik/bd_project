import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddProductInStore from "./addingForms/addProductinStore";

export default function ProductsInTheShop() {

    const [productsIntheShop, setProductsIntheShop] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)

    const deleteProductInShop = (e) => {
        e.preventDefault();
        const upc = e.target.name;
        console.log(upc);
        
        try {
          axios.delete(`http://localhost:3001/productsInShop/deleteProductInShop/${upc}`)
          console.log('super!')
          let productsintheshop =  productsIntheShop.filter(object => {
            return object.upc != upc;
          });
          setProductsIntheShop(productsintheshop)
      } catch(err){
          console.log(err.response.data)
      }
      }


      const showAll = () => {
        axios.get('http://localhost:3001/getAllProductsInShop')
        .then(res => setProductsIntheShop(res.data))
        .catch(err => console.log(err))
      }

      const sortByName = (e) => {
        e.preventDefault();
        
        try {
          axios.get(`http://localhost:3001/productsInShop/getSortedProductsInShopName`)
          .then(res => setProductsIntheShop(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      }

      const sortByQuantity = (e) => {
        e.preventDefault();
        
        try {
          axios.get(`http://localhost:3001/productsInShop/getSortedProductsInShopQuantity`)
          .then(res => setProductsIntheShop(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      }

   
    
    if(productsIntheShop) return(
        
        <div>
            <Menu />
            <h1 className="text-center mt-3">Products in the Shop</h1>
            {(addIsClicked) ? <AddProductInStore /> : null }
            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button>
                {/* <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Name</button> */}
                <button type="button" onClick={sortByQuantity} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Quantity</button>
            </div>

            

            <table className="table mt-3 table-striped">
            <thead>
                <tr>
                <th scope="col">UPC</th>
                <th scope="col">ID product</th>
                <th scope="col">Selling price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Promotional</th>
                </tr>
            </thead>
            <tbody>
                {productsIntheShop.map(el => 
                <tr key={el.UPC}>
                <th scope="row">{el.UPC}</th>
                <td>{el.id_product}</td>
                <td>{el.selling_price}</td>
                <td>{el.products_number}</td>
                <td>{el.promotional_product ? 'true' : 'false' }</td>
                <td><button type="button" className="btn btn-warning ">Update</button>
                <button type="button" className="btn btn-danger ms-5" onClick={deleteProductInShop} name={el.UPC}>Delete</button></td>
                </tr> 
                )}
            </tbody>
            </table>
        </div>
    ) 
    else showAll();
}