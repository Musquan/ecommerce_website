import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import "../Screens/ScreenCss/ProductInformationScreen.css";
import CartScreen from '../Screens/ProductCartScreen.js';

import NavBar from '../Components/NavigationBar';

import { connect } from 'react-redux';

import { updateCartItem } from '../Redux/cart.actions';
import { useNavigate } from 'react-router-dom';

function ProductInformationScreen(props, cart, updateCartItem) {

  const history = useNavigate();


  console.log("In Product Detail Page")

  let data = useLocation();
  console.log({ state: data })

  const activeUserID = localStorage.getItem('activeUser');
  const [mainImage, setMainImage] = useState(data.state.productImagePath);

  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (imagePath) => {
    setMainImage(imagePath);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    console.log("Info Screen Value")
    console.log(newQuantity)
    setQuantity(newQuantity);
  };

  const handleAddToCart = (product) => {

    const prevProducts = JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || []

    const existingProductIndex = prevProducts.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      prevProducts[existingProductIndex].count += quantity;
    } else {
      product.count = quantity;
      prevProducts.push(product);
    }

    // Update the cart in local storage
    localStorage.setItem('products-key-' + activeUserID, JSON.stringify(prevProducts));

  }

  const handleAddToWishlist = (product) => {
    console.log("WishList Clicked")
    const prevProductsWishlist = JSON.parse(localStorage.getItem('wishlist-products-key-' + activeUserID)) || []
    //const newProductsWishlist = [...prevProductsWishlist, product]

    // localStorage.setItem('wishlist-products-key-'+activeUserID, 
    //   JSON.stringify(newProductsWishlist)
    // )

    const existingProductIndex = prevProductsWishlist.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      alert("Product already exists in the wishlist");
    } else {
      const newProductsWishlist = [...prevProductsWishlist, product];
      localStorage.setItem('wishlist-products-key-' + activeUserID, JSON.stringify(newProductsWishlist));
      alert("Product added to the wishlist");
    }
  };

  return (
    <div className='AllContainerForProductInformationScreen'>

      <div className="ConatinerForNavBarInProductInfoScreen">
        <NavBar />
      </div>
      <h3 className="IndividualProductTitleTag">{data.state.productName}</h3>
      <div className='ProductCardContainer'>

        <div className="ContainerForTheMainImage">
          <img src={mainImage} alt={data.state.productName}  className="MainImageTag" />
        </div>

        <div className="SideImagesContainer">
          <img src={data.state.productImagePath}  className='SecondaryImageTag' onClick={() => handleImageClick(data.state.productImagePath)} />
          <img src={data.state.productImagePath1}  className='SecondaryImageTag' onClick={() => handleImageClick(data.state.productImagePath1)} />
          <img src={data.state.productImagePath2}  className='SecondaryImageTag' onClick={() => handleImageClick(data.state.productImagePath2)} />
          <img src={data.state.productImagePath3}  className='SecondaryImageTag' onClick={() => handleImageClick(data.state.productImagePath3)} />
          <img src={data.state.productImagePath4}  className='SecondaryImageTag' onClick={() => handleImageClick(data.state.productImagePath4)} />
        </div>

        <div className="ContainerForProductInformation">
          <p>Product ID: {data.state.productId}</p>
          <h1 className="IndividualProductSecondTitleTag"><b>Price:</b> ${data.state.productPrice}</h1>
          <h1 className="IndividualProductSecondTitleTag"><b>Category:</b> {data.state.productCategory}</h1>
          <h1 className="IndividualProductSecondTitleTag"><b>Product Description:</b> {data.state.productDescription}</h1>
        </div>

        <div className="ContainerForTheItemCountButtonsAddToCartAndWishList">
          <input aria-label="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantityInput"
          />

          <Link to="/ProductCartScreen">
            <button onClick={(e) => handleAddToCart(data.state)} className="addToCartButton">
              Add to Cart
            </button>
          </Link>

          <Link to="/WishlistScreen">
            <button onClick={(e) => handleAddToWishlist(data.state)} className="addToWishlistButton">
              Add to Wishlist
            </button>
          </Link>
        </div>


      </div>
    </div>
  );
}


export default ProductInformationScreen;