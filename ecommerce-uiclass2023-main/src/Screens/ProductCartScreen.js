/*
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavigationBar';

function ProductCartScreen(){

    //const products = JSON.parse(localStorage.getItem('products-key-xxx'))
    const activeUserID = localStorage.getItem('activeUser');
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products-key-'+activeUserID)) || []);
    

    console.log({
        products
    })

    const handleRemoveFrom = (productId) => {  
        console.log("This is Remove Cart");
        console.log(productId);
        const updatedProducts = products.filter(product => product.productId !== productId);

        setProducts(updatedProducts);

        localStorage.setItem('products-key-'+activeUserID, JSON.stringify(updatedProducts));

        alert("Item Removed!")
    }
    
    return (
        <>
            <div>
                <NavBar />
            </div>

            <div className="MainContainerForProductCartScreen">
                <h1> Please put all the things for the Cart Screen here in this page </h1>
                <h1> Display Product Desccription </h1>
                {products.length === 0 ? (
                    <p>No products in the cart</p>
                ) : (
                    <div className='ProductsInCartContainer'>
                        {products.map((product, index) => (
                            <div key={index} className='ProductCard'>
                                <ul>
                                    <li> <img src={product.productImagePath} alt="error" /> </li>
                                    <li> {product.productId} </li>
                                    <li> {product.productName} </li>
                                    <li> {product.productCategory} </li>
                                    <li> {product.productDescription} </li>
                                    <li> Count: {product.count}</li>
                                    <button className='RemoveItemButton' onClick={(e) => handleRemoveFrom(product.productId)}> Remove Item </button>
                                </ul>
                            </div>
                            
                        ))}
                    </div>
                )}
                <h1> Go to checkout </h1>
                <div>
                    <Link to='/TotalCheckoutScreen'>
                        <button> Go to Chcekout Screen </button>
                    </Link>
                </div>
            </div>
        </>
      );
}

export default ProductCartScreen;
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavigationBar';
import '../Screens/ScreenCss/ProductCartScreen.css'


function ProductCartScreen() {
  
  
  const activeUserID = localStorage.getItem('activeUser');
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []
  );

  const handleRemoveFrom = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      'products-key-' + activeUserID,
      JSON.stringify(updatedProducts)
    );

    alert('Item Removed!');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.productId === productId
        ? { ...product, count: newQuantity }
        : product
    );

    setProducts(updatedProducts);
    localStorage.setItem(
      'products-key-' + activeUserID,
      JSON.stringify(updatedProducts)
    );
  };

  const calculateProductTotal = (product) => {
    return product.count * product.productPrice; // Assuming productPrice exists in your product object
  };

  const calculateCartTotal = () => {
    return products.reduce((total, product) => total + calculateProductTotal(product), 0);
  };

  const handleCheckout = () => {
    // Logic to navigate to checkout screen with updated product information
    // You can pass the updated products to the checkout screen
    // For example, using react-router-dom history.push

  };

  return (
    <>
      <div>
        <NavBar />
      </div>

      <div className="MainContainerForProductCartScreen">
      <h1>Your Cart</h1>
        <div className="ProductsInCartContainer">
          {products.length === 0 ? (
            <p>No items found in your cart. Explore our products and add to the cart</p>
          ) : (
            <div>
              {products.map((product, index) => (
                <div key={index} className="ProductCardcart">
                  <div className="ProductImageContainer">
                  <img src={product.productImagePath} className="ProductImageCart"alt="Image of product" />
                  </div>
                  <div className="ProductInfoCart">
                    <Link 
                      to='/ProductInformationScreen'
                      state={{
                        productName:product.productName,
                        productPrice: product.productPrice,
                        productId: product.productId,
                        productRating: product.productRating,
                        productImagePath: product.productImagePath,
                        productImagePath1: product.productImagePath1,
                        productImagePath2: product.productImagePath2,
                        productImagePath3: product.productImagePath2,
                        productImagePath4: product.productImagePath4,
                        productDescription: product.productDescription,
                        productCategory: product.productCategory
                      }}
                    >
                      <h2>{product.productName}</h2>
                    </Link>
                    <p><strong>Description:</strong> {product.productDescription}</p>
                    <p><strong>Category:</strong> {product.productCategory}</p>
                  </div> 
                  <div className="ProductPriceCart">
                    <p><strong>Unit Price:</strong> ${Number(product.productPrice).toFixed(2)}</p>
                  </div>
                  <div className="QuantityCart">
                    <p>
                    <strong>Count: </strong>{' '}
                      <input 
                        type="number"
                        value={product.count}
                        min='1'
                        onChange={(e) =>
                          handleQuantityChange(product.productId, e.target.value)
                        }
                        style={{ width: '40px' }}
                      />
                    </p>
                  </div>
                  <div className="ProductTotalCart">      
                  <p><strong>Total: </strong>${calculateProductTotal(product).toFixed(2)}</p>
                  </div>
                  <button
                    className="RemoveItemButtonCart" aria-label='Remove product from Cart'
                    onClick={(e) => handleRemoveFrom(product.productId)}
                  >
                     &#10006;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      {products.length > 0 && (  
      <div className="CartSummary">
        <div className="SummaryHeading">
          <h3>Summary</h3>
        </div>
        <div className="SummaryDetails">
          <p>Total Items: {products.length}</p>
          <p>Total Cart Value: ${calculateCartTotal().toFixed(2)}</p>
        </div>
        <Link to="/CheckoutScreen">
          <button className="CheckoutButton" onClick={handleCheckout}>
            Go to Checkout
          </button>
        </Link>
      </div>  
       )}
    </>
  );
}

export default ProductCartScreen;
