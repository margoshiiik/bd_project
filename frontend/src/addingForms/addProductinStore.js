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

        if(products !== null) {
            return (
                
                <div className='form'> 
                <form>
                    
                    <input type="text" className="form-control mt-3" placeholder="UPC" required/>

                    <select className="custom-select mt-3">
                        <option defaultValue>Select Product</option>
                        {products.map(item => 
                            <option key={item.id_product} value={item.id_product}>{item.product_name}</option>
                        )}
                    </select>

                    <input type="number" className="form-control mt-3"  placeholder="Price" required/>

                    <input type="number" className="form-control mt-3"  placeholder="Quantity" required/>

                    <div className="custom-control custom-checkbox mt-3">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label">On sale</label>
                    </div>

            
                    <button className="btn btn-primary mt-3" type="submit">Add Product in store</button>
        </form>
            </div>
            )

        } 
        else return null;
}