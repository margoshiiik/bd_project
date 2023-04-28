import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomersAllCategories() {
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        fetchCustomersAllCategories();
    }, []);

    const fetchCustomersAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getCustomersAllCategories');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    return (
        <div>
            <h2>Customers Who Purchased from All Categories</h2>
            {customers && (
                <table className="table mt-3 table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Card Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Percent</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.card_number}</td>
                            <td>{customer.cust_name}</td>
                            <td>{customer.cust_surname}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.email}</td>
                            <td>{customer.percent}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomersAllCategories;
