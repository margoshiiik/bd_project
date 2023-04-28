import cors from 'cors'
import express from 'express'
const app = express(); 
import {db} from './connect.js'; 
import bodyParser from 'body-parser'

app.use(cors());

app.use(bodyParser.json());



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
  const sql = "SELECT * FROM Product p JOIN Store_Product sp ON p.id_product = sp.id_product ORDER BY product_name;"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})


app.get('/productsInShop/onSaleByQuantity', (req, res) =>{
  const sql = "SELECT * FROM store_product sp JOIN product p ON p.id_product = sp.id_product WHERE promotional_product = '1' ORDER BY products_number"
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/productsInShop/onSaleByName', (req, res) =>{
  const sql = "SELECT * FROM store_product sp JOIN product p ON p.id_product = sp.id_product WHERE promotional_product = '1' ORDER BY product_name";
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/productsInShop/fullPriceByQuantity', (req, res) =>{
  const sql = "SELECT * FROM store_product WHERE promotional_product = '0' ORDER BY products_number";
  db.query(sql, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get('/productsInShop/fullPriceByName', (req, res) =>{
  const sql = "SELECT * FROM store_product sp JOIN product p ON p.id_product = sp.id_product WHERE promotional_product = '0' ORDER BY product_name;";
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


app.get('/customers/findByPercent/:percent', (req, res) =>{

  console.log(req.params.percent)

  const q = "SELECT * FROM customer_card WHERE percent = (?) ORDER BY cust_surname"

  db.query(q, [req.params.percent], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})

app.get('/products/findByCategory/:category', (req, res) =>{

  console.log(req.params.category)

  const q = "SELECT * FROM product WHERE category_number = (?) ORDER BY product_name"

  db.query(q, [req.params.category], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})

app.get('/customers/searchByCustomerSurname/:customerSurname', (req, res) =>{

  console.log(req.params.customerSurname)

  const q = "SELECT * FROM customer_card WHERE cust_surname = (?) ORDER BY cust_surname"

  db.query(q, [req.params.customerSurname], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})


app.get('/productsinShop/searchByUPC/:upc', (req, res) =>{

  console.log(req.params.upc)

  const q = "SELECT * FROM store_product WHERE UPC = (?)"

  db.query(q, [req.params.upc], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})


app.get('/products/searchByProductName/:productName', (req, res) =>{

  console.log(req.params.productName)

  const q = "SELECT * FROM product WHERE product_name = (?)"

  db.query(q, [req.params.productName], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})


app.get('/checks/findByNumber/:checkNumber', (req, res) =>{

  console.log(req.params.checkNumber)

  const q = "SELECT * FROM `check` WHERE check_number = (?)"

  db.query(q, [req.params.checkNumber], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.json(data)
  }) 

})


////////////////ADD FUNCTION//////////////////////////////////////// 

app.post('/employee/addEmployee', (req, res) =>{

console.log(req.body)
 const sql = "INSERT INTO employee (`id_employee`, `empl_surname`, `empl_name`, `empl_patronymic`, `empl_role`, `salary`, `date_of_birth`, `date_of_start`, `phone_number`, `city`, `street`, `zip_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [req.body.id_employee, req.body.empl_surname, req.body.empl_name, req.body.empl_patronymic, req.body.empl_role, req.body.salary, req.body.date_of_birth, req.body.date_of_start, req.body.phone_number, req.body.city, req.body.street, req.body.zip_code];

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

app.post('/products/addProduct', (req, res) =>{

  console.log(req.body)

  const sql = "INSERT INTO product (`id_product`, `category_number`, `product_name`, `characteristics`) VALUES (?, ?, ?, ?);"
  const values = [req.body.id_product, req.body.category_number, req.body.product_name, req.body.characteristics]
  db.query(sql, values, (err, data) => {
    if(err) return res.status(500).json(err); 
    return res.status(200).json("product has been added")
  })
})

app.post('/productsInShop/addProductInShop', (req, res) =>{

  console.log(req.body)

  const sql = "INSERT INTO store_product (`UPC`, `id_product`, `selling_price`, `products_number`, `promotional_product`) VALUES (?, ?, ?, ?, ?);"
  const values = [req.body.upc, req.body.product_id, req.body.price, req.body.quantity, req.body.isPromotional]
  db.query(sql, values, (err, data) => {
    if(err) return res.status(500).json(err); 
    return res.status(200).json("product has been added")
  })
})


app.post('/customers/addCustomer', (req, res) =>{

  console.log(req.body)

  const sql = "INSERT INTO customer_card (`card_number`, `cust_surname`, `cust_name`, `cust_patronymic`, `phone_number`, `city`, `street`, `zip_code`, `percent`) VALUES (?, ?, ?, ?, ?, ?,?,?,?);"
  const values = [req.body.card_number, req.body.cust_surname, req.body.cust_name, req.body.cust_patronymic, req.body.phone_number, req.body.city, req.body.street, req.body.zip_code, req.body.percent]
  db.query(sql, values, (err, data) => {
    if(err) return res.status(500).json(err); 
    return res.status(200).json("customer has been added")
  })
})


app.post('/checks/addCheck', (req, res) =>{

  console.log(req.body)


  const sql = "INSERT INTO `check` (`check_number`, `id_employee`, `card_number`, `print_date`, `sum_total`, `vat`) VALUES (?, ?, ?, ?, ?);"
  const values = [req.body.check_number, req.body.id_employee, req.body.card_number, req.body.date, req.body.sum_total, req.body.vat]
  db.query(sql, values, (err, data) => {
    if(err) return res.status(500).json(err); 
    return res.status(200).json("check has been added")
  })
})

app.post('/getProductSales', (req, res) => {
  const { start_date, end_date } = req.body;

  const sql = `
    SELECT p.product_name, SUM(s.product_number) as total_product_sold
    FROM ((\`check\` ch JOIN sale s ON ch.check_number = s.check_number) JOIN store_product sp ON sp.UPC = s.UPC) JOIN product p ON sp.id_product = p.id_product
    WHERE ch.print_date BETWEEN ? AND ?
    GROUP BY p.id_product;
  `;
  const values = [start_date, end_date];

  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

app.post('/getCashierSales', (req, res) => {
  const { start_date, end_date } = req.body;

  const sql = `
    SELECT e.empl_name, e.empl_surname, SUM(ch.sum_total) as total_sales
    FROM \`check\` ch JOIN employee e ON ch.id_employee = e.id_employee
    WHERE ch.date BETWEEN ? AND ? AND e.empl_role = 'Cashier'
    GROUP BY e.empl_name, e.empl_surname, e.empl_patronimic;
  `;
  const values = [start_date, end_date];

  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});


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


app.put('/category/updateCategory/:category_number', (req, res) => {
  console.log(req.params.category_number);
  console.log(req.body.category_name);

  const q = "UPDATE category SET category_name = ? WHERE category_number = ?";

  db.query(q, [req.body.category_name, req.params.category_number], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("category has been updated");
  });
});


app.put('/employee/updateEmployee/:employeeId', (req, res) => {
  console.log(req.params.employeeId);
  console.log(req.body);

  const q = "UPDATE employee SET empl_surname = ?, empl_name = ?, empl_patronymic = ?, empl_role = ?, salary = ?, date_of_birth = ?, date_of_start = ?, phone_number = ?, city = ?, street = ?, zip_code = ? WHERE id_employee = ?";

  const values = [req.body.empl_surname, req.body.empl_name, req.body.empl_patronymic, req.body.empl_role, req.body.salary, req.body.date_of_birth, req.body.date_of_start, req.body.phone_number, req.body.city, req.body.street, req.body.zip_code, req.params.employeeId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("employee has been updated");
  });
});


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)