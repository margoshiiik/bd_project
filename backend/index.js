import cors from 'cors'
import express from 'express'
const app = express(); 
import {db} from './connect.js'; 
import bodyParser from 'body-parser'

app.use(cors());

app.use(bodyParser.json());

const checkAccess = (requiredRole) => (req, res, next) => {
  // Replace this with your actual token verification and role extraction logic
  const userRole = req.headers['x-user-role'];

  if (userRole === requiredRole) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

//////////////////GETERS//////////////////////////////////

app.get('/getAllEmployees', (req, res) =>{
  const sql = "SELECT * FROM employee"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/getAllCards', (req, res) =>{
  const sql = "SELECT * FROM customer_card"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/getAllCategories', (req, res) =>{
  const sql = "SELECT * FROM category"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/getAllProducts', (req, res) =>{
  const sql = "SELECT * FROM product"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/getAllProductsInStore', (req, res) =>{
  const sql = "SELECT * FROM store_product"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/getAllCheck', (req, res) =>{
  const sql = "SELECT * FROM `check`"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/getAllProductsInShop', (req, res) =>{
  const sql = "SELECT * FROM store_product"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/customers/getSortedCustomers', (req, res) =>{
  const sql = "SELECT * FROM customer_card ORDER BY cust_surname;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/employee/getSortedEmployee', (req, res) =>{
  const sql = "SELECT * FROM employee ORDER BY empl_surname;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/employee/getSortedCashiers', (req, res) =>{
  const sql = "SELECT * FROM employee WHERE empl_role = 'Cashier' ORDER BY empl_surname;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/category/getSortedCategory', (req, res) =>{
  const sql = "SELECT * FROM category ORDER BY category_name;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/products/getSortedProducts', (req, res) =>{
  const sql = "SELECT * FROM product ORDER BY product_name;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/productsInShop/getSortedProductsInShopQuantity', (req, res) =>{
  const sql = "SELECT * FROM store_product ORDER BY products_number ASC;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/productsInShop/getSortedProductsInShopName', (req, res) =>{
  const sql = "SELECT * FROM store_product ORDER BY products_name ASC;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

//////////////////END OF THE GETERS//////////////////////////////////


////////////////SEARCH FUNCTIONS/////////////////////

app.get('/employee/findBySurname/:empl_surname', (req, res) =>{

  console.log(req.params.empl_surname)

  const q = "SELECT * FROM employee WHERE empl_surname = (?)"

  db.query(q, [req.params.empl_surname], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})


////////////////ADD FUNCTION//////////////////////////////////////// 

app.post('/employee/addEmployee', checkAccess('manager'), (req, res) =>{

 // console.log(req.body)
  const sql = "INSERT INTO employee (`id_employee`, `empl_surname`, `empl_name`, `empl_patronymic`, `empl_role`, `salary`, `date_of_birth`, `date_of_start`, `phone_number`, `city`, `street`, `zip_code`) VALUES (?);"
  const values = [req.body.id_employee, req.body.surname, req.body.name, req.body.patronymic, req.body.role, req.body.employeeSalary, req.body.birthday, req.body.dateOfStart, req.body.phone_number, req.body.employeeCity, req.body.employeeStreet, req.body.employeeZip];

  console.log(values);
  db.query(sql, values, (err, data) => {
    if(err) return res.status(500).json(err); 
    return res.status(200).json("employee has been added")
  })
})

app.post('/category/addCategory', (req, res) =>{

  console.log(req.body.category_name)

  const sql = "INSERT INTO category (`category_name`) VALUES (?);"
  const values = [req.body.category_name]
  db.query(sql, values, (err, data) => {
    if(err) return res.status(500).json(err); 
    return res.status(200).json("category has been added")
  })
})

///////////////////////DELETE FUNCTIONS/////////////////////


app.delete('/employee/deleteEmployee/:id', (req, res) => {
  console.log(req.params.id)

  const q = "DELETE FROM employee WHERE id_employee=(?)"

  db.query(q, [req.params.id], (err, data)=>{
      if(err) return res.status(500).json(err); 
      return res.status(200).json("employee was deleted")
  }) 

})

app.delete('/category/deleteCategory/:category_number', (req, res) => {
  console.log(req.params.category_number)

  const q = "DELETE FROM category WHERE category_number=(?)"

  db.query(q, [req.params.category_number], (err, data)=>{
      if(err) return res.status(500).json(err); 
      return res.status(200).json("employee was deleted")
  }) 

})

app.delete('/checks/deleteCheck/:check_number', (req, res) => {

  console.log(req.params.check_number)

  const q = "DELETE FROM `check` WHERE check_number=(?)"

  db.query(q, [req.params.check_number], (err, data)=>{
      if(err) return res.status(500).json(err); 
      return res.status(200).json("check was deleted")
  }) 

})

app.delete('/customers/deleteCustomer/:card_number', (req, res) => {
  console.log(req.params.card_number)

  const q = "DELETE FROM customer_card WHERE card_number=(?)"

  db.query(q, [req.params.card_number], (err, data)=>{
      if(err) return res.status(500).json(err); 
      return res.status(200).json("card_number was deleted")
  }) 

})

app.delete('/products/deleteProduct/:id_product', (req, res) => {
  console.log(req.params.id_product)

  const q = "DELETE FROM product WHERE id_product=(?)"

  db.query(q, [req.params.id_product], (err, data)=>{
      if(err) return res.status(500).json(err); 
      return res.status(200).json("employee was deleted")
  }) 

})

app.delete('/productsInShop/deleteProductInShop/:upc', (req, res) => {
  console.log(req.params.upc)

  const q = "DELETE FROM store_product WHERE UPC=(?)"

  db.query(q, [req.params.upc], (err, data)=>{
      if(err) return res.status(500).json(err); 
      return res.status(200).json("product in shop was deleted")
  }) 

})

//////////////////////////END DELETE////////////////////////////


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)