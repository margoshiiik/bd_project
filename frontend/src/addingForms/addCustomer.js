import './addStyles.css'
import axios from 'axios'

export default function AddCustomer() {


    const addCustomer = (e) => {
        e.preventDefault();
        
        const cardNumber = document.getElementById('cardNumber').value;
        const customerSurname = document.getElementById('customerSurname').value;
        const customerName = document.getElementById('customerName').value;
        const customerPatronymic = document.getElementById('customerPatronymic').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerCity = document.getElementById('customerCity').value;
        const customerStreet = document.getElementById('customerStreet').value;
        const customerZip = document.getElementById('customerZip').value;
        const customerPercent = document.getElementById('customerPercent').value;
        


        const values = {card_number: cardNumber, cust_surname: customerSurname, cust_name:customerName, cust_patronymic: customerPatronymic,phone_number: customerPhone, city: customerCity, street: customerStreet, zip_code: customerZip, percent: customerPercent};
        console.log(values)
        
        try {
            axios.post(`http://localhost:3001/customers/addCustomer`, values);
        } catch(err){
            console.log(err.response.data)
        }

    }

    return (
        <div className='form'> 
        <form>
            
            <input type="text" className="form-control mt-3" id='cardNumber' placeholder="Card Number" required/>
            
            <input type="text" className="form-control mt-3" id='customerSurname' placeholder="Surname" required/>
    
            <input type="text" className="form-control mt-3" id='customerName' placeholder=" First Name"  required/>

            <input type="text" className="form-control mt-3" id='customerPatronymic' placeholder="Patronymic" />

            <input type="text" className="form-control mt-3" id='customerPhone' placeholder="Phone number" required/>
            
            <input type="text" className="form-control mt-3" id='customerCity' placeholder="City" required/>

            <input type="text" className="form-control mt-3" id='customerStreet' placeholder="Street" required/>

            <input type="text" className="form-control mt-3" id='customerZip' placeholder="Zip code" required/>

            <input type="number" className="form-control mt-3" id='customerPercent' placeholder="Percent" required/>
        
    
            <button class="btn btn-primary mt-3" type="submit" onClick={addCustomer}>Add customer</button>
</form>
      </div>
    )

}