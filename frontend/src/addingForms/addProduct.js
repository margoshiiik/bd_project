import { useEffect, useState } from 'react'
import axios from 'axios';
import './addStyles.css'

export default function AddProduct() {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null); 


    const showAllProducts = () => {
        axios.get('http://localhost:3001/getAllProducts')
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
    }

    const getID = () => { 
        return products[products.length - 1].id_product + 1; 
    }

    const addProduct = (e) => {
        e.preventDefault();
        
        const id_product = getID();
        console.log(id_product)
        const category = parseInt(document.getElementById('selectCategory').value);
        const productName = document.getElementById('productName').value;
        const productDesc = document.getElementById('productDesc').value;

        const values = {id_product: id_product, category_number: category, product_name: productName, characteristics: productDesc};
        console.log(values)
        
        try {
            axios.post(`http://localhost:3001/products/addProduct`, values);
           // document.getElementById('categoryName').value = '';
           showAllProducts();
        } catch(err){
            console.log(err.response.data)
        }

    }

        if(categories && products) {
            showAllProducts();
            return (
                
                <div className='form'> 
                <form>

                    <select className="custom-select mt-3" id='selectCategory'>
                        <option defaultValue>Select Category</option>
                        {categories.map(item => 
                            <option key={item.category_number} value={item.category_number}>{item.category_name}</option>
                        )}
                    </select>

                    <input type="text" className="form-control mt-3" id='productName' placeholder="Name" required/>

                    <textarea className="form-control mt-3" id='productDesc' placeholder="Description" />
            
                    <button className="btn btn-primary mt-3" onClick={addProduct} type="submit">Add Product</button>
        </form>
            </div>
            )

        } 
        else {
            showAllProducts();
            axios.get('http://localhost:3001/getAllCategories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
        };
}