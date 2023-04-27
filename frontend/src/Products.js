import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddProduct from "./addingForms/addProduct";

export default function Products() {

    const [products, setProducts] = useState(null); 
    const [categories, setCategories] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/getAllCategories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    })


    const deleteProduct = (e) => {
        e.preventDefault();
        const id_product = e.target.name;
        console.log(id_product);
        
        try {
          axios.delete(`http://localhost:3001/products/deleteProduct/${id_product}`)
          console.log('super!')
          let products2 =  products.filter(object => {
            return object.id_product != id_product;
          });
          setProducts(products2)
      } catch(err){
          console.log(err.response.data)
      }
      }

      const showAll = () => {
        axios.get('http://localhost:3001/getAllProducts')
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
      }

      const sortByName = (e) => {
        e.preventDefault();
        
        try {
          axios.get(`http://localhost:3001/products/getSortedProducts`)
          .then(res => setProducts(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      }

      

      const findByProductName = (e) => {
        e.preventDefault();
        var productName = document.getElementById('searchByProductName').value;
    
        console.log(productName);

        try {
          axios.get(`http://localhost:3001/products/searchByProductName/${productName}`)
          .then(res => setProducts(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      document.getElementById('searchByProductName').value = ''

      }

      const findByCategory = (e) => {
        e.preventDefault();
        var select = document.getElementById('selectCategory');
        var category = select.options[select.selectedIndex].value;
        
        console.log(category);

        try {
          axios.get(`http://localhost:3001/products/findByCategory/${category}`)
          .then(res => setProducts(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      document.getElementById('selectCategory').value = ''

      }


    
    if(products && categories) return(
        
        <div>
            <Menu />
            <h1 className="text-center mt-3">Products</h1>
            {(addIsClicked) ? <AddProduct /> : null }
            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button>
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Name</button>
                
            </div>

            <div className="d-flex justify-content-center mt-3">
                <select className="form-select mt-3" id="selectCategory">
                            <option defaultValue>Select Product</option>
                            {categories.map(item => 
                                <option key={item.category_number} value={item.category_number}>{item.category_name}</option>
                            )}
                </select>
                <button className="btn btn-outline-secondary" type="button" onClick={findByCategory}>Search</button>
            </div>


            <div className="d-flex justify-content-center mt-3">
                <input type="text" className="form-control" id='searchByProductName' placeholder="Search by Product Name"/>  
                <button className="btn btn-outline-secondary" type="button" onClick={findByProductName}>Search</button>
            </div>

            <table className="table mt-3 table-striped">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Category Number</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                {products.map(el => 
                <tr key={el.id_product}>
                <th scope="row">{el.id_product}</th>
                <td>{el.category_number}</td>
                <td>{el.product_name}</td>
                <td>{el.characteristics}</td>
                <td><button type="button" className="btn btn-warning">Update</button>
                <button type="button" className="btn btn-danger ms-3" onClick={deleteProduct} name={el.id_product}>Delete</button></td>
                </tr> 
                )}
            </tbody>
            </table>
        </div>
    ) 
    else showAll();
}