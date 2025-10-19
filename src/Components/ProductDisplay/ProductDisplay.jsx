import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProductDisplay = ({ product }) => {
  const { addToCart, wishlistItems, toggleWishlistItem } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product.image);
  const isWishlisted = wishlistItems?.includes(product.id);
  const navigate = useNavigate();

  // ✅ Add to Cart with Size Validation
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("❗ Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id, selectedSize);
    alert("✅ Added to Cart Successfully!");
  };

  // ✅ Buy Now with Size Validation
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("❗ Please select a size before proceeding to checkout.");
      return;
    }
    navigate('/Checkout', {
      state: {
        buyNow: true,
        product,
        selectedSize,
      },
    });
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img
            src={product.image}
            alt="Main"
            onClick={() => setMainImage(product.image)}
            className={`thumbnail ${mainImage === product.image ? 'active' : ''}`}
          />
          {product.images && product.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(imgUrl)}
              className={`thumbnail ${mainImage === imgUrl ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={mainImage} alt="Main Product" />
          <div
            className="wishlist-icon"
            onClick={() => toggleWishlistItem(product.id)}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isWishlisted ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
          </div>
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-star">
          {[...Array(4)].map((_, i) => <img key={i} src={star_icon} alt="" />)}
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">₹ {product.old_price}</div>
          <div className="productdisplay-right-price-new">₹ {product.new_price}</div>
        </div>

        <div className="productdisplay-right-discription">
          Wear your heart and personality on your sleeve with t-shirt design templates that show who you are.
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "active-size" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Buttons with Size Check */}
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>

        <p className="productdisplay-right-category">
          <span>Category :</span> Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
