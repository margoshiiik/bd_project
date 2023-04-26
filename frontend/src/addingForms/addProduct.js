import { useEffect, useState } from 'react'
import axios from 'axios';
import './addStyles.css'

export default function AddProduct() {

    const [categories, setCategories] = useState(null);
 
    useEffect(() => {
        axios.get('http://localhost:3001/getAllCategories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    })

        if(categories !== null) {
            return (
                
                <div className='form'> 
                <form>

                    <select className="custom-select mt-3">
                        <option defaultValue>Select Product</option>
                        {categories.map(item => 
                            <option key={item.category_number} value={item.category_number}>{item.category_name}</option>
                        )}
                    </select>

                    <input type="text" className="form-control mt-3"  placeholder="Name" required/>

                    <textarea class="form-control mt-3" placeholder="Description" />
            
                    <button className="btn btn-primary mt-3" type="submit">Add Product</button>
        </form>
            </div>
            )

        } 
        else return null;
}