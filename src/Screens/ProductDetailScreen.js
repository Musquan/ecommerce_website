import './ScreenCss/ProductDetails.css';
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import NavBar from '../Components/NavigationBar';
import CartScreen from './CartScreen';
import image1 from '../Images/BB1.png';
import image2 from '../Images/BB2.png';
import image3 from '../Images/IMG_4564.JPG';
import image4 from '../Images/IMG_4565.JPG';
import image5 from '../Images/IMG_4562.WEBP';

function ProductDetail() {
  const product = {
    name: 'Bimbo The Pup',
    description: 'Not your typical mischievious cutie pie.',
    price: '$99.99',
    images: [image1, image2, image3, image4, image5],
    reviews: [],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 5 });
  const [reviews, setReviews] = useState(product.reviews);

  const [selectedQty, setSelectedQty] = useState('1');
  //Check Cart Initialization
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false); 

  const handleAddToCart = () => {
    const updatedCart = [...cart, { product, quantity: parseInt(selectedQty, 100) }];
    setCart(updatedCart);
  };


  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleReviewSubmit = () => {
    setReviews([...reviews, newReview]);
    setNewReview({ user: '', comment: '', rating: 5 });
  };


  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? 'star filled' : 'star'}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div className='MainContainerForProductDetailScreen'>
            <NavBar />
    <div className="product-detail">
     <div className="image-container">
      <div className="thumbnail-image-container">
        <div className="image-info">
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
          </div>
        </div>

         
              <img src={selectedImage} alt="Product Image" className="selected-image" />
          </div>

            <div className="product-info">
              <h1 className="product-title dark-blue">{product.name}</h1>
              <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (25)
            </p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>
              <div className="quantity-select">
                <label htmlFor="quantity">Qty:</label>
                <select
                  id="quantity"
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(e.target.value)}
                >
                 
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <button onClick={handleAddToCart} className="add-to-cart dark-blue">
                  Add to Cart
                </button>
                <button onClick={() => setCartVisible(true)}>View Cart</button>

                {isCartVisible && (
                < CartScreen cart={cart} removeFromCart={removeFromCart} />
                )}
              </div>
          </div>
        
        

        <div className="reviews">
          <h2 className="dark-blue">Product Reviews</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review-user dark-blue">User: {review.user}</p>
              <p className="review-comment dark-blue">Comment: {review.comment}</p>
              <p className="review-rating dark-blue">Rating: {renderStars(review.rating)}</p>
            </div>
          ))}
        </div>
        <div className="review-form">
          <h3 className="dark-blue">Add a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          />
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <button onClick={handleReviewSubmit} className="dark-blue">
            Submit Review
          </button>

          
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
