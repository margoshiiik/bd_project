import './addStyles.css'

export default function AddCustomer() {

    return (
        <div className='form'> 
        <form>
            
            <input type="text" className="form-control mt-3" placeholder="Card Number" required/>
            
            
            <input type="text" className="form-control mt-3" placeholder="Surname" required/>
            
    
            <input type="text" className="form-control mt-3" placeholder=" First Name"  required/>
            

            <input type="text" className="form-control mt-3"  placeholder="Patronymic" required/>

            <input type="text" className="form-control mt-3"  placeholder="Phone number" required/>
            

            <input type="text" className="form-control mt-3" placeholder="City" required/>

            <input type="text" className="form-control mt-3"  placeholder="Street" required/>

            <input type="text" className="form-control mt-3"  placeholder="Zip code" required/>

            <input type="number" className="form-control mt-3"  placeholder="Percent" required/>
        
    
            <button class="btn btn-primary mt-3" type="submit">Add customer</button>
</form>
      </div>
    )

}