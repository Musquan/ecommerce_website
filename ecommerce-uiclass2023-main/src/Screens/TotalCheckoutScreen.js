import React, { useState } from 'react';
import NavBar from '../Components/NavigationBar';
import { Link, useNavigate } from "react-router-dom";

function TotalCheckoutScreen(props) {


    const navigate = useNavigate();

    const activeUserID = localStorage.getItem('activeUser');
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []
    );

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');

    const calculateProductTotal = (product) => {
        return product.count * product.productPrice;
      };
    
    const calculateOrderTotal = () => {
    return products.reduce(
        (total, product) => total + calculateProductTotal(product),
        0
        );
    };

    const handleCheckout = () => {
        if (
            !firstName ||
            !lastName ||
            !shippingAddress ||
            !billingAddress ||
            !phoneNumber ||
            !paymentInfo
        ) {
            alert('Please fill all sections before proceeding to checkout.');
            return;
        }

        // Generate a unique order ID (you can use a library like uuid for a more robust solution)
        const orderId = Math.floor(Math.random() * 1000000);

        const orderTotal = calculateOrderTotal();

        // Create an object to represent the entire order
        const order = {
            orderId,
            orderTotal,
            firstName,
            lastName,
            shippingAddress,
            billingAddress,
            phoneNumber,
            paymentInfo,
            products,
        };

        localStorage.setItem('order-key-' + orderId + '-UserId-' + activeUserID, JSON.stringify(order));

        // Handle the checkout logic, e.g., sending data to a server or processing the order
        console.log('Checkout initiated with the following details:');
        console.log('Order ID:', orderId);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Shipping Address:', shippingAddress);
        console.log('Billing Address:', billingAddress);
        console.log('Phone Number:', phoneNumber);
        console.log('Payment Information:', paymentInfo);
        console.log('Ordered Products:', products);
        console.log('Order Total:', orderTotal);

        localStorage.removeItem('products-key-' + activeUserID);
        setProducts([]);

        // Optionally, you can clear the form fields after successful checkout
        setFirstName('');
        setLastName('');
        setShippingAddress('');
        setBillingAddress('');
        setPhoneNumber('');
        setPaymentInfo('');

        navigate("/TestScreen");

        // Optionally, you can store or send the order object as needed
    };
        
    return (
        <>
            <>
                <NavBar />
            </>
            
            <>
                <h1> This is the Checkout screen - Final </h1>
                <ul>
                    {products.map((product, index) => {
                        // const productTotal = product.count * product.productPrice;
                        const productTotal = calculateProductTotal(product);
                        
                        return (
                            <li key={index}>
                                <h1> Product ID: </h1>
                                <p>{product.productId}</p>
                                <h1> Product Name: </h1>
                                <p>{product.productName}</p>
                                <h1> Product Category: </h1>
                                <p>{product.productCategory}</p>
                                <h1> Product Price: </h1>
                                <p>{product.productPrice}</p>
                                <h1> Product Description: </h1>
                                <p>{product.productDescription}</p>
                                <h1> Product Count: </h1>
                                <p>{product.count}</p>
                                <h1> Product Total: </h1>
                                <p>{productTotal.toFixed(2)}</p>
                                <img src={product.productImagePath} alt="Error" style={{ width: '150px', height: '100px' }} />
                                {/* Add more product details as needed */}
                            </li>
                        );
                    })}
                </ul>

                <div>
                    <h2>Order Summary</h2>
                    <p>Order Total: ${calculateOrderTotal().toFixed(2)}</p>
                </div>

                <h2>Personal Information</h2>
                <form>
                    <label>
                        First Name:
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Shipping Address:
                        <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Billing Address:
                        <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Payment Information:
                        <input type="text" value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} />
                    </label>
                    <br />
                    <button type="button" onClick={handleCheckout}>
                        Checkout
                    </button>
                </form>
            </>
        </>
    );
}

export default TotalCheckoutScreen;
