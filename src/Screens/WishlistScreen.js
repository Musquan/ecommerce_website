import React from "react";
import Footer from "../Components/Footer";
import './ScreenCss/Wishlist.css'
import { useEffect } from 'react';
import NavBar from '../Components/NavigationBar';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from 'react-icons/fa';

function WishlistScreen(props) {

  const activeUserID = localStorage.getItem('activeUser');
  const [productsWishlist, setProductsWishlist] = useState(JSON.parse(localStorage.getItem('wishlist-products-key-'+activeUserID)) || []);

  console.log({
    productsWishlist
  });

  const handleRemoveFromWishlist = (productId) => {  
    console.log("This is Remove From Wishlist");
    console.log(productId);
    const updatedProductsWishlist = productsWishlist.filter(product => product.productId !== productId);

    setProductsWishlist(updatedProductsWishlist);

    localStorage.setItem('wishlist-products-key-'+activeUserID, JSON.stringify(updatedProductsWishlist));

    alert("Item Removed from wishlist!")
  }  

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            i <= rating ? <FaStar color="orange" key={i} /> : <FaRegStar color="orange" key={i} />
        );
    }
    return stars;
   };

   const handleAddToCart = (product) => {

    const prevProducts = JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []

    const existingProductIndex = prevProducts.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      alert('This item is already in your cart!');
      return;
    } else {
      product.count = 1;
      prevProducts.push(product);
    }

    // Update the cart in local storage
    localStorage.setItem('products-key-' + activeUserID, JSON.stringify(prevProducts));

  }

  return (
    <>
      <div className="ContainerForNavBar">
        <NavBar />
      </div>
      <div className="MainContainerForWishlistScreen">
        <h1> Your Wishlist </h1>
        {productsWishlist.length === 0 ? (
            <p>No items found in your wishlist. Explore our products and add your favorites.</p>
        ) : (
            <div className='ProductsInWishlistContainer'>
                {productsWishlist.map((product, index) => (
                    <div key={index} className='WishlistProductCard'>
                        <img src={product.productImagePath} className="WishlistProductImage"alt="Image" />
                        <div className="WishlistProductInfo">
                          
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
                          <p><strong>Rating:</strong> {renderStars(product.productRating)}</p>
                          <p><strong>Price:</strong> ${Number(product.productPrice).toFixed(2)}</p>
                        </div> 
                            <button aria-label="Remove Product" className='RemoveWishlistItemButton' onClick={(e) => handleRemoveFromWishlist(product.productId)}> &#10006; </button>
                            <Link to="/ProductCartScreen">
                              <button onClick={(e) => handleAddToCart(product)} className="WishlistAddToCartButton">
                                Add to Cart
                              </button>
                            </Link>
                    </div>
                ))}
            </div>
        )}
      </div>
      </>  
  );
}

export default WishlistScreen;