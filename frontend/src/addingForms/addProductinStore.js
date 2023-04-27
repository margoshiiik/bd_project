import { useEffect, useState } from 'react'
import axios from 'axios';
import './addStyles.css'

export default function AddProductInStore() {

    const [products, setProducts] = useState(null);
 
    useEffect(() => {
        axios.get('http://localhost:3001/getAllProducts')
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
    })


    const addProductInStore = (e) => {
        e.preventDefault();
        
        const upc = document.getElementById('upc').value;
        const product_id = parseInt(document.getElementById('productValue').value);
        const price = parseInt(document.getElementById('productPrice').value);
        const quantity = parseInt(document.getElementById('productQuantity').value);
        let isPromotional;
        document.getElementById('onSaleCheck').checked === true ? isPromotional = 1 : isPromotional = 0; 


        const values = {upc: upc, product_id: product_id, price: price, quantity: quantity, isPromotional: isPromotional};
        console.log(values)
        
        try {
            axios.post(`http://localhost:3001/productsInShop/addProductInShop`, values);
           // document.getElementById('categoryName').value = '';
        } catch(err){
            console.log(err.response.data)
        }

    }

        if(products !== null) {
            return (
                
                <div className='form'> 
                <form>
                    
                    <input type="text" className="form-control mt-3" id='upc' placeholder="UPC" required/>

                    <select className="custom-select mt-3" id='productValue'>
                        <option defaultValue>Select Product</option>
                        {products.map(item => 
                            <option key={item.id_product} value={item.id_product}>{item.product_name}</option>
                        )}
                    </select>

                    <input type="number" className="form-control mt-3" id='productPrice' placeholder="Price" required/>

                    <input type="number" className="form-control mt-3" id='productQuantity' placeholder="Quantity" required/>

                    <div className="custom-control custom-checkbox mt-3">
                        <input type="checkbox" className="custom-control-input" id="onSaleCheck" />
                        <label className="custom-control-label">On sale</label>
                    </div>

            
                    <button className="btn btn-primary mt-3" type="submit" onClick={addProductInStore}>Add Product in store</button>
        </form>
            </div>
            )

        } 
        else return null;
}