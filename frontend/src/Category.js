import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddCategory from "./addingForms/AddCategory";
import jsPDF from 'jspdf';
import CustomersAllProducts from './additionalQueries/CustomersAllProducts';
import TotalQuantityValuePerCategory from "./additionalQueries/TotalQuantityValuePerCategory";
export default function Category({user}) {

    const [categories, setCategories] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false);
    const [showCustomersAllProducts, setShowCustomersAllProducts] = useState(false);
    const [categoryNumber, setCategoryNumber] = useState('');
    const [showTotalQuantityValuePerCategory, setShowTotalQuantityValuePerCategory] = useState(false);

    const generatePDF = () => {
    const doc = new jsPDF();

    let startY = 10;
    let startX = 10;
    let lineHeight = 8;

    // Додайте заголовки таблиці
    doc.setFontSize(14);
    doc.text('Category Number', startX, startY);
    doc.text('Category Name', startX + 50, startY);
    startY += lineHeight;

    // Додайте дані таблиці
    doc.setFontSize(12);
    categories.forEach((el) => {
        doc.text(String(el.category_number), startX, startY);
        doc.text(el.category_name, startX + 50, startY);
        startY += lineHeight;
    });

    // Збережіть та відкрийте файл PDF
    doc.save('report.pdf');
};



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


     const updateCategory = (e) => {
       e.preventDefault();
       const category_number = e.target.name;
       const newCategoryName = document.getElementById(`newCategory${category_number}`).value;

       console.log(category_number, newCategoryName)

       try {
         axios.put(`http://localhost:3001/category/updateCategory/${category_number}`, {
           category_name: newCategoryName,
         }).then((response) => {
           console.log(response.data);

         });
       } catch (err) {
         console.log(err.response.data);
       }
     };



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
            {showCustomersAllProducts && <CustomersAllProducts categoryNumber={categoryNumber} />}
            {showTotalQuantityValuePerCategory && <TotalQuantityValuePerCategory />}
            <h1 className="text-center mt-3">Categories</h1>
            {(addIsClicked) ? <AddCategory /> : null }
            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                {user === 'manager' ?  <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button> : null }
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Name</button>
                <button type="button" onClick={generatePDF} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Print</button>
                <button type="button" onClick={() => setShowCustomersAllProducts(!showCustomersAllProducts)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Customers All Products in Category</button>
                <button type="button" onClick={() => setShowTotalQuantityValuePerCategory(!showTotalQuantityValuePerCategory)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Total Quantity & Value</button>
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
                <td><input type="text" className="form-control" id={`newCategory${el.category_number}`} placeholder={el.category_name}/></td>
                <td>
                {user === 'manager' ? (<div><button type="button" className="btn btn-warning" onClick={updateCategory} name={el.category_number}>Update</button>
                <button type="button" className="btn btn-danger" onClick={deleteCategory} name={el.category_number}>Delete</button></div>) : null}
                    <button type="button" className="btn btn-info" onClick={() => {setShowCustomersAllProducts(true);setCategoryNumber(el.category_number);}}>Show Products</button>
                </td>
                </tr>
                  
                )}
            </tbody>
            </table>


           
            
        </div>
    ) 
    else showAll();
}