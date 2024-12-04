import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FaStar, FaRegStar } from 'react-icons/fa';
import "./ComponentCss/ProductCard.css";

function ProductCard(props) {

    const activeUserID = localStorage.getItem('activeUser');

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= props.productRating ? <FaStar color="orange" key={i} aria-hidden="true" /> : <FaRegStar color="orange" key={i} aria-hidden="true" />
            );
        }
        return (
            <div>
                <span className='productRating' aria-label={` ${props.productRating} out of 5 stars`}>
                    {stars}
                </span>
            </div>
        );
    };

    const WishlistIconClicked = (product) => {
        console.log("WishList Clicked");
        const prevProductsWishlist = JSON.parse(localStorage.getItem('wishlist-products-key-' + activeUserID)) || [];
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

    const CartIconClicked = (product) => {
        console.log("Cart Clicked");
        const prevProducts = JSON.parse(localStorage.getItem('products-key-' + activeUserID)) || [];
        const existingProductIndex = prevProducts.findIndex(
            (item) => item.productId === product.productId
        );

        if (existingProductIndex !== -1) {
            const updatedProduct = { ...prevProducts[existingProductIndex] };
            updatedProduct.count += 1;
            prevProducts[existingProductIndex] = updatedProduct;
        } else {
            const newProduct = { ...product, count: 1 };
            prevProducts.push(newProduct);
        }
        localStorage.setItem('products-key-' + activeUserID, JSON.stringify(prevProducts));
    };

    return (
        <div className="productCardContainer">
            <div className='imageContainer'>
                <img className='imagePlaceholder' src={props.productImagePath} alt=" "width="100%" />
            </div>
            <div className='detailContainer'>
                <div className='titleContainer'>
                    <div className='ProductTitleConatiner1'>
                        <h1 className='productTitle'> {props.productName} </h1>
                    </div>
                    <div className='ProductPriceAndRatingConatiner1'>
                        <h1 className='productPrice'>Price: ${props.productPrice}</h1>
                        <div className='productRating'>
                            <h1 className='productRating'>Rating: {renderStars()}</h1>
                        </div>
                    </div>
                </div>
                <div className='iconContainer'>
                    <span className='icon'>
                        <Link
                            to={'/WishlistScreen'}
                            style={{ textDecoration: 'none', color: '#0C2340' }}
                            onClick={(e) => WishlistIconClicked(props)}
                            aria-label="Add to Wishlist"
                        >
                            <FontAwesomeIcon icon={faHeart} size="1x" />
                        </Link>
                    </span>
                    <span className='icon'>
                        <Link to={'/ProductCartScreen'}
                            state={{ productName: props.productName, productId: props.productId }}
                            style={{ textDecoration: 'none', color: '#0C2340' }}
                            onClick={(e) => CartIconClicked(props)}
                            aria-label="Add to Cart"
                        >
                            <FontAwesomeIcon icon={faCartShopping} size="1x" />
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
