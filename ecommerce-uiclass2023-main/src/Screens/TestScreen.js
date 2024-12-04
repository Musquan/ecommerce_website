import React, { useEffect, useReducer, useState } from 'react';
import Footer from '../Components/Footer.js';
import './ScreenCss/TestCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../Components/ProductCard.js';
import { Link } from "react-router-dom";
import NavBar from '../Components/NavigationBar';

import { useLocation } from "react-router-dom";

import { SliderData } from '../Components/SliderData.js';
import ImageSlider from '../Components/ImageSlider.js';

import { ProductData } from "../Components/ProductData.js"

function TestScreen(props) {


    let data = useLocation();

    const itemsPerPage = 12;
    const itemsPerRow = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('None');

    const [isComboboxOpen, setIsComboboxOpen] = useState(false);
    const sortOptions = ['None', 'Low to High price', 'High to Low price', 'Rating'];

    const handleComboboxClick = () => {
        setIsComboboxOpen(!isComboboxOpen);
    };

    const handleSortOptionClick = (option) => {
        setSortOption(option);
        setIsComboboxOpen(false);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortProducts = (products, option) => {
        if (option === 'Low to High price') {
            return products.slice().sort((a, b) => a.productPrice - b.productPrice);
        }
        else if (option === 'High to Low price') {
            return products.slice().sort((b, a) => a.productPrice - b.productPrice);
        }
        else if (option === 'Rating') {
            return products.slice().sort((b, a) => a.productRating - b.productRating);
        }
        else if (option === 'None') {
            return products;
        }
        return products;
    };

    const filteredProducts = selectedCategory
        ? ProductData.filter(
            (product) =>
                product.productCategory === selectedCategory &&
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : ProductData.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const sortedProducts = sortProducts(filteredProducts, sortOption);
    //const currentProducts = filteredProducts.slice(startIndex, endIndex);
    const currentProducts = sortedProducts.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setSearchQuery(''); // Reset search query
        setSortOption('None'); // Reset sort option
        setCurrentPage(1);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className='ForAllTheInformationInTestScreen'>
            <div className='ForNavBarDivOnly'>
                <NavBar />
            </div>

            <div className='ForMainTitleOnly'>
                <h1 className='ForMainTitleOnlyTitleH1'> Welcome to TechnoTreasure!</h1>
            </div>

            <div className='ForImageSliderBannerOnly'>
                <ImageSlider slides={SliderData} />
            </div>
            <div></div>
            <div className='ForTheSideBarAndProducts' aria-label="Go to Wishlist">
                <div className="ForSideBar">
                    <>
                        <h1>Categories </h1>
                        <ul>
                            <li onClick={() => handleCategoryFilter(null)}>All Products</li>
                            <li onClick={() => handleCategoryFilter('MobileAndCellPhones')}>Mobile and Cell Phones</li>
                            <li onClick={() => handleCategoryFilter('ComputerAndLaptop')}>Computers and Laptops</li>
                            <li onClick={() => handleCategoryFilter('TVsAndScreen')}>TVs and Screens</li>
                            <li onClick={() => handleCategoryFilter('HomeAppliances')}>Home Appliances</li>
                            <li onClick={() => handleCategoryFilter('FitnessAndHealth')}>Fitness and Health</li>
                            <li onClick={() => handleCategoryFilter('VideoGames')}>Video Games</li>
                            <li onClick={() => handleCategoryFilter('Cameras/Camcorders&Drones')}>Cameras Camcorders & Drones</li>
                        </ul>
                    </>
                </div>

                <div className='TestScreenContainer'>

                    <div className='TitleContainer'>
                        <p className='TitleContainerPOnly'> Browse All Products</p>
                    </div>

                    <div className='ConatinerForSearchBoxAndFilter'>
                        <div className='SearchBar'>
                            <input
                                type='text'
                                placeholder='Search products...'
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />

                        </div>

                        <div className='SortBy'>
                            <label htmlFor="sortInput">Sort By:</label>
                            <div className="combobox-wrapper">
                                <input
                                    id="sortInput"
                                    type="text"
                                    role="combobox"
                                    aria-autocomplete="none"
                                    aria-expanded={isComboboxOpen}
                                    aria-controls="sortOptionsList"
                                    onClick={handleComboboxClick}
                                    value={sortOption}
                                    readOnly
                                />
                                <span className={`arrow ${isComboboxOpen ? 'open' : ''}`}
                                    onClick={handleComboboxClick}></span>
                            </div>
                            {isComboboxOpen && (
                                <ul id="sortOptionsList" role="listbox">
                                    {sortOptions.map((option, index) => (
                                        <li
                                            key={index}
                                            role="option"
                                            onClick={() => handleSortOptionClick(option)}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>

                    <div className='SampleProductsContainer'>
                        {currentProducts.map((product, index) => (
                            <div key={index} className='ProductCard'>
                                <Link to={'/ProductInformationScreen'}
                                    state={{
                                        productName:
                                            product.name,
                                        productPrice: product.productPrice,
                                        productId: product.productId,
                                        productImagePath: product.productImage,
                                        productImagePath1: product.productImageAdd1,
                                        productImagePath2: product.productImageAdd2,
                                        productImagePath3: product.productImageAdd3,
                                        productImagePath4: product.productImageAdd4,
                                        productDescription: product.productDetail,
                                        productCategory: product.productCategory
                                    }}
                                    style={{ textDecoration: 'none', color: '#0C2340' }}
                                >
                                    <ProductCard
                                        productName={product.name}
                                        productPrice={product.productPrice}
                                        productRating={product.productRating}
                                        productId={product.productId}
                                        productImagePath={product.productImage}
                                        productImagePath1={product.productImageAdd1}
                                        productImagePath2={product.productImageAdd2}
                                        productImagePath3={product.productImageAdd3}
                                        productImagePath4={product.productImageAdd4}
                                        productDescription={product.productDetail}
                                        productCategory={product.productCategory}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div  className='Pagination'  >
                        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
                            <button  className='ButtonForPagination'  key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestScreen;