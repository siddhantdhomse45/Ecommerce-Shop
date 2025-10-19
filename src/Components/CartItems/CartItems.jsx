// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CartItems.css';
// import { ShopContext } from '../../Context/ShopContext';
// import remove_icon from '../Assets/cart_cross_icon.png';
// import phonepay_img from '../Assets/phonepay.png';
// import Gpay_img from '../Assets/Gpay.png';
// import { QRCodeCanvas } from 'qrcode.react';
// import CheckoutPage from '../../Pages/Checkout';
// import Shop from '../../Pages/Shop';

// const CartItems = () => {
//   const navigate = useNavigate();
//   const {
//     getTotalCartAmount,
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     placeOrder,
//   } = useContext(ShopContext);

//   const deliveryFee = 50;
//   const totalAmount = getTotalCartAmount() + deliveryFee;

//   const [showPaymentOptions, setShowPaymentOptions] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [showUPIOption, setShowUPIOption] = useState(false);
//   const [checkoutStarted, setCheckoutStarted] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const upiID = 'yourupi@bank';
//   const name = 'MyShop';

//   const getUPILink = () => {
//     return `upi://pay?pa=${upiID}&pn=${name}&am=${totalAmount}&cu=INR`;
//   };

//   const handleConfirmOrder = () => {
//     placeOrder(); // Add order and clear cart
//     setShowPaymentOptions(false);
//     setSelectedPaymentMethod(null);
//     setShowQRModal(false);
//     setShowUPIOption(false);
//     setShowSuccessPopup(true);

//     // Hide popup and redirect after 3 seconds
//     setTimeout(() => {
//       setShowSuccessPopup(false);
//       navigate('/shop');
//     }, 3000);
//   };

//   if (checkoutStarted) {
//     return (
//       <CheckoutPage
//         totalAmount={totalAmount}
//         cartItems={cartItems}
//         all_product={all_product}
//       />
//     );
//   }

//   return (
//     <div className="cartitems">
//       {/* Cart Table Header */}
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Size</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />

//       {/* Cart Items */}
//       {all_product.map((item) => {
//         if (cartItems[item.id]?.quantity > 0) {
//           return (
//             <div key={item.id}>
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={item.image} alt={item.name} className="carticon-product-icon" />
//                 <p>{item.name}</p>
//                 <p>{cartItems[item.id]?.size || 'N/A'}</p>
//                 <p>&#x20B9; {item.new_price}</p>
//                 <div className="cartitems-quantity-controller">
//                   <button onClick={() => removeFromCart(item.id)}>-</button>
//                   <span>{cartItems[item.id]?.quantity || 0}</span>
//                   <button onClick={() => addToCart(item.id)}>+</button>
//                 </div>
//                 <p>&#x20B9; {item.new_price * cartItems[item.id]?.quantity}</p>
//                 <img
//                   src={remove_icon}
//                   onClick={() => removeFromCart(item.id)}
//                   alt="Remove"
//                   className="cartitems-remove-icon"
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}

//       {/* Cart Total Section */}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>Cart Totals</h1>
//           <div className="cartitems-total-item">
//             <p>Subtotal</p>
//             <p>&#x20B9; {getTotalCartAmount()}</p>
//           </div>
//           <hr />
//           <div className="cartitems-total-item">
//             <p>Delivery Fees</p>
//             <p>&#x20B9; {deliveryFee}</p>
//           </div>
//           <hr />
//           <div className="cartitems-total-item">
//             <h3>Total</h3>
//             <p>&#x20B9; {totalAmount}</p>
//           </div>
//           <button onClick={() => setShowPaymentOptions(true)}>Place Order</button>
//         </div>
//       </div>

//       {/* Payment Modal */}
//       {showPaymentOptions && (
//         <div className="payment-modal">
//           <div className="payment-box">
//             <div className="payment-header">
//               <h1>Select your payment method</h1>
//               <button
//                 className="close-btn"
//                 onClick={() => setShowPaymentOptions(false)}
//               >
//                 X
//               </button>
//             </div>

//             <div className="payment-methods">
//               <div className="payment-option">
//                 <img src={phonepay_img} alt="PhonePe" />
//                 <button onClick={() => setSelectedPaymentMethod('PhonePe')}>PhonePe</button>
//               </div>
//               <div className="payment-option">
//                 <img src={Gpay_img} alt="Google Pay" />
//                 <button onClick={() => setSelectedPaymentMethod('Google Pay')}>Google Pay</button>
//               </div>
//               <div className="payment-option">
//                 <button onClick={() => setSelectedPaymentMethod('COD')}>Cash on Delivery</button>
//               </div>
//             </div>

//             {/* COD */}
//             {selectedPaymentMethod === 'COD' && (
//               <div className="qr-container">
//                 {/* <h3>✅ Order Successful!</h3> */}
//                 <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Amount to Pay: ₹{totalAmount}</p>
//                 <button onClick={handleConfirmOrder} className="btn1">
//                   OK
//                 </button>
//               </div>
//             )}

//             {/* QR Payment */}
//             {showQRModal && selectedPaymentMethod !== 'COD' && (
//               <div className="qr-container">
//                 <h4>Scan with {selectedPaymentMethod}</h4>
//                 <QRCodeCanvas value={getUPILink()} size={200} />
//                 <p>Amount to Pay: ₹{totalAmount}</p>
//                 <button onClick={handleConfirmOrder} className="btn1">
//                   Confirm & Go to Shop
//                 </button>
//               </div>
//             )}

//             {/* UPI ID Payment */}
//             {showUPIOption && selectedPaymentMethod !== 'COD' && (
//               <div className="qr-container">
//                 <h3>Pay using UPI ID</h3>
//                 <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{upiID}</p>
//                 <p>Pay ₹{totalAmount} using this UPI ID in {selectedPaymentMethod}</p>
//                 <button onClick={handleConfirmOrder} className="btn1">
//                   Confirm & Go to Shop
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="order-success-popup">
//           ✅ Order Successful! Redirecting to Shop...
//         </div>
        
//       )}
//     </div>
//   );
    

// };

// export default CartItems;




import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import phonepay_img from '../Assets/phonepay.png';
import Gpay_img from '../Assets/Gpay.png';
import { QRCodeCanvas } from 'qrcode.react';
import CheckoutPage from '../../Pages/Checkout';

const CartItems = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    placeOrder,
  } = useContext(ShopContext);

  const deliveryFee = 50;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const upiID = '8668231882@ybl';
  const name = 'MyShop';

  const getUPILink = () => {
    return `upi://pay?pa=${upiID}&pn=${name}&am=${totalAmount}&cu=INR`;
  };

  const handleConfirmOrder = () => {
    placeOrder(); // Add order and clear cart
    setShowPaymentOptions(false);
    setSelectedPaymentMethod(null);
    setShowQRModal(false);
    setShowSuccessPopup(true);

    // Hide popup and redirect after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate('/');
    }, 3000);
  };

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);

    // If user selects UPI (PhonePe or GPay), show QR immediately
    if (method === 'PhonePe' || method === 'Google Pay') {
      setShowQRModal(true);
    } else {
      setShowQRModal(false);
    }
  };

  if (checkoutStarted) {
    return (
      <CheckoutPage
        totalAmount={totalAmount}
        cartItems={cartItems}
        all_product={all_product}
      />
    );
  }

  return (
    <div className="cartitems">
      {/* Cart Table Header */}
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Items */}
      {all_product.map((item) => {
        if (cartItems[item.id]?.quantity > 0) {
          return (
            <div key={item.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={item.image} alt={item.name} className="carticon-product-icon" />
                <p>{item.name}</p>
                <p>{cartItems[item.id]?.size || 'N/A'}</p>
                <p>&#x20B9; {item.new_price}</p>
                <div className="cartitems-quantity-controller">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span>{cartItems[item.id]?.quantity || 0}</span>
                  <button onClick={() => addToCart(item.id)}>+</button>
                </div>
                <p>&#x20B9; {item.new_price * cartItems[item.id]?.quantity}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(item.id)}
                  alt="Remove"
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      {/* Cart Total Section */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>&#x20B9; {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Delivery Fees</p>
            <p>&#x20B9; {deliveryFee}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <p>&#x20B9; {totalAmount}</p>
          </div>
          <button onClick={() => setShowPaymentOptions(true)}>Place Order</button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentOptions && (
        <div className="payment-modal">
          <div className="payment-box">
            <div className="payment-header">
              <h1>Select your payment method</h1>
              <button
                className="close-btn"
                onClick={() => setShowPaymentOptions(false)}
              >
                X
              </button>
            </div>

            <div className="payment-methods">
              <div className="payment-option">
                <img src={phonepay_img} alt="PhonePe" />
                <button onClick={() => handlePaymentSelection('PhonePe')}>
                  PhonePe
                </button>
              </div>
              <div className="payment-option">
                <img src={Gpay_img} alt="Google Pay" />
                <button onClick={() => handlePaymentSelection('Google Pay')}>
                  Google Pay
                </button>
              </div>
              <div className="payment-option">
                <button onClick={() => handlePaymentSelection('COD')}>
                  Cash on Delivery
                </button>
              </div>
            </div>

            {/* COD Option */}
            {selectedPaymentMethod === 'COD' && (
              <div className="qr-container">
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Amount to Pay: ₹{totalAmount}
                </p>
                <button onClick={handleConfirmOrder} className="btn1">
                  Confirm Order
                </button>
              </div>
            )}

            {/* QR Payment Modal */}
            {showQRModal && (selectedPaymentMethod === 'PhonePe' || selectedPaymentMethod === 'Google Pay') && (
              <div className="qr-container">
                <h4>Scan using {selectedPaymentMethod}</h4>
                <QRCodeCanvas value={getUPILink()} size={200} includeMargin={true} />
                <p>Amount to Pay: ₹{totalAmount}</p>
                <p>UPI ID: <strong>{upiID}</strong></p>
                <button onClick={handleConfirmOrder} className="btn1">
                  Confirm Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="order-success-popup">
          ✅ Order Successful! Redirecting to Shop...
        </div>
      )}
    </div>
  );
};

export default CartItems;

