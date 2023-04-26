import './addStyles.css'
import axios from 'axios'

export default function AddCategory() {

    const addCategory = (e) => {
        e.preventDefault();
        
        const name = document.getElementById('categoryName').value;
        console.log(name);
        const values = {category_name: name};
        console.log(values)
        
        try {
            axios.post(`http://localhost:3001/category/addCategory`, values);
            document.getElementById('categoryName').value = '';
        } catch(err){
            console.log(err.response.data)
        }

      }

    return (
        <div className='form mt-4'> 
        <form className="needs-validation" noValidate>
            <div>
            <input type="text" className="form-control" id="categoryName" placeholder="Category name" required />
            <div className="valid-feedback">
                Looks good!
            </div>
            </div> 
            <button className="btn mt-2 btn-primary" type="submit" onClick={addCategory}>Add category</button>
      </form>
      </div>
    )

}