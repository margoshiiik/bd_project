import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomersAllProducts({ categoryNumber }) {
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        if (categoryNumber) {
            fetchCustomersAllProducts();
        }
    }, [categoryNumber]);

    const fetchCustomersAllProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getCustomersAllProducts/${categoryNumber}`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    return (
        <div>
            <h2>Customers Who Purchased All Products in Category {categoryNumber}</h2>
            {customers && (
                <table className="table mt-3 table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Card Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">City</th>
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
                            <td>{customer.city}</td>
                            <td>{customer.percent}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomersAllProducts;
