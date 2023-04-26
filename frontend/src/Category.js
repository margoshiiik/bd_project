import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddCategory from "./addingForms/AddCategory";

export default function Category() {

    const [categories, setCategories] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)


    const deleteCategory = (e) => {
        e.preventDefault();
        const category_number = e.target.name;
        console.log(category_number);
        
        try {
          axios.delete(`http://localhost:3001/category/deleteCategory/${category_number}`)
          console.log('super!')
          let category2 =  categories.filter(object => {
            return object.category_number != category_number;
          });
          setCategories(category2)
      } catch(err){
          console.log(err.response.data)
      }
      }

      const showAll = () => {
        axios.get('http://localhost:3001/getAllCategories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
      }

      const sortByName = (e) => {
        e.preventDefault();
        
        try {
          axios.get(`http://localhost:3001/category/getSortedCategory`)
          .then(res => setCategories(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      }

    if(categories) return(
        
        <div>
            <Menu />
            <h1 className="text-center mt-3">Categories</h1>
            {(addIsClicked) ? <AddCategory /> : null }
            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button>
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Name</button>
            </div>
            
            <table className="table mt-3 table-striped">
            <thead>
                <tr>
                <th scope="col">Category Number</th>
                <th scope="col">Category Name</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(el => 
                <tr key={el.category_number}>
                <th scope="row">{el.category_number}</th>
                <td>{el.category_name}</td>
                <td><button type="button" className="btn btn-warning">Update</button>
                <button type="button" className="btn btn-danger" onClick={deleteCategory} name={el.category_number}>Delete</button></td>
                </tr>
                  
                )}
            </tbody>
            </table>


           
            
        </div>
    ) 
    else showAll();
}