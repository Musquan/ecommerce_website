import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ScreenCss/Checkout.css';
import NavBar from '../Components/NavigationBar';
import dellLaptop from '../Images/dell laptop.png';
import Earpod from '../Images/earpod.png';
import { useNavigate } from "react-router-dom";

function CheckoutScreen() {


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
    const [emailAddressUsed, setEmailAddressUsed] = useState('');
    //const [paymentInfo, setPaymentInfo] = useState('');
    const [nameOnTheCard, setNameOnTheCard] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvvNumberCard, setCvvNumberCard] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('paypal');


    const calculateShippingFee = (subtotal) => {
        return subtotal > 199 ? 0 : 10;
    };

    const calculateProductTotal = (product) => {
        return product.count * product.productPrice;
    };

    const calculateOrderTotal = () => {
        return products.reduce(
            (total, product) => total + calculateProductTotal(product),
            0
        );
    };

    const subtotal = calculateOrderTotal();
    const shippingFee = calculateShippingFee(subtotal);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCheckout = () => {

        const isCommonInfoFilled = firstName && lastName && shippingAddress && billingAddress && phoneNumber && emailAddressUsed;
        const isCardInfoFilled = nameOnTheCard && creditCardNumber && expirationDate && cvvNumberCard;
        if (paymentMethod === 'paypal' && !isCommonInfoFilled) {
            alert('Please fill all sections before proceeding to checkout.');
            return;
        } else if (paymentMethod === 'creditdebit' && (!isCommonInfoFilled || !isCardInfoFilled)) {
            alert('Please fill all sections, including card details, before proceeding to checkout.');
            return;
        }

        const orderId = Math.floor(Math.random() * 1000000);
        const orderTotal = calculateOrderTotal();
        const order = {
            orderId,
            orderTotal,
            firstName,
            lastName,
            shippingAddress,
            billingAddress,
            phoneNumber,
            emailAddressUsed,
            nameOnTheCard,
            creditCardNumber,
            expirationDate,
            cvvNumberCard,
            paymentMethod,
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
        console.log('Email Address:', emailAddressUsed);
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
        setEmailAddressUsed('');
        setNameOnTheCard('');
        setCreditCardNumber('');
        setExpirationDate('');
        setCvvNumberCard('');

        // Display order confirmation to the user
        alert(`Order placed successfully! Order ID: ${orderId}`);

        navigate("/TestScreen");


    };
    /*
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        billingAddress: '',
        shippingAddress: '',
        phoneNumber: '',
        emailAddress: '',
    });

    const [items, setItems] = useState([
        { id: 1, name: 'Dell Laptop', price:999.99, quantity: 2, image: dellLaptop},
        { id: 2, name: 'Earpod', price: 99, quantity: 1, image: Earpod },
    ]);

    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const [cardInfo, setCardInfo] = useState({
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateShippingFee = (subtotal) => {
        return subtotal > 199 ? 0 : 10;
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = () => {
        // Create a confirmation message
        const confirmationMessage = `Confirm your order with a total of $${total}`;

        // Display the confirmation dialog
        const isConfirmed = window.confirm(confirmationMessage);

        if (isConfirmed) {
            console.log('Order confirmed!');
        } else {
            console.log('Order canceled.');
        }
    }

    const subtotal = calculateTotal();
    const shippingFee = calculateShippingFee(subtotal);
    const total = (subtotal + shippingFee).toFixed(2);
    */

    return (
        <div className='MainContainerForCheckoutScreen'>
            <NavBar />
            <div>
                <h1>TechnoTreasure</h1>
            </div>

            <div className='ContainerForCheckoutScreen'>
                <div className='CheckoutForm'>


                    <div className='checkout-billing-info'>
                        <h2>Billing Details</h2>
                        <form>
                            <div className='checkout-form-group'>
                                <label className='required-label'>First Name </label>
                                <input
                                    type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Last Name </label>
                                <input
                                    type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Billing Address </label>
                                <input
                                    type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Shipping Address</label>
                                <input
                                    type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)}
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label className='required-label'>Phone Number</label>
                                <input
                                    type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                    required // Make it required
                                />
                            </div>
                            <div className='checkout-form-group'>
                                <label>Email Address</label>
                                <input
                                    type="text" value={emailAddressUsed} onChange={(e) => setEmailAddressUsed(e.target.value)}
                                    required // Make it required
                                />
                            </div>
                        </form>
                    </div>



                    <div className='checkout-order-summary'>
                        <h2>Order Summary</h2>
                        <ul className='checkout-ul'>
                            {products.map((product, index) => (
                                <li className='checkout-li' key={index}>
                                    <div className='product-image'>
                                        <img src={product.productImagePath} alt="Image" /> <span>{product.productName} x {product.count} </span>
                                 
                                        <span className='itemPrice'> ${product.productPrice * product.count}</span>
        
                                    </div>
                                </li>
                            ))}
                        </ul>


                        <div className='checkout-totalprice'>
                            <span>Subtotal:</span> ${calculateOrderTotal().toFixed(2)}
                        </div>
                        <div className='checkout-separator'></div>
                        <div className='checkout-shipping-fee'>
                            <span>Shipping Fee:</span> {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                            {/* <span>Shipping Fee:</span> $0 */}
                        </div>
                        <div className='checkout-separator'></div>
                        <div className='checkout-total'>
                            <span>Total:</span> ${calculateOrderTotal().toFixed(2)}
                        </div>
                        <div className='checkout-payment-methods'>
                            <h3>Payment Methods</h3>
                            <label>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='paypal'
                                    checked={paymentMethod === 'paypal'}
                                    onChange={handlePaymentMethodChange}
                                />
                                PayPal
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='creditdebit'
                                    checked={paymentMethod === 'creditdebit'}
                                    onChange={handlePaymentMethodChange}
                                />
                                Credit/Debit Card
                            </label>
                            {paymentMethod === 'creditdebit' && (
                                <div>
                                    <h4>Enter Card Information</h4>
                                    <div className='checkout-form-group'>
                                        <label>Name on Card</label>
                                        <input
                                            type="text" value={nameOnTheCard} onChange={(e) => setNameOnTheCard(e.target.value)}
                                        />
                                    </div>
                                    <div className='checkout-form-group'>
                                        <label>Card Number</label>
                                        <input
                                            type="text" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='checkout-form-group'>
                                        <label>Expiration Date</label>
                                        <input
                                            type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='checkout-form-group'>
                                        <label>CVV</label>
                                        <input
                                            type="text" value={cvvNumberCard} onChange={(e) => setCvvNumberCard(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className='PlaceOrderButton' onClick={handleCheckout}>
                            Place Order
                        </button>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default CheckoutScreen;