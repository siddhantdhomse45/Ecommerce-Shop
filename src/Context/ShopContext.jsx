// import React, { createContext, useState, useEffect } from "react";
// import all_product from "../Components/Assets/all_product";

// export const ShopContext = createContext(null);

// // Create initial cart structure
// const getDefaultCart = () => {
//   const savedCart = localStorage.getItem("cartItems");
//   if (savedCart) return JSON.parse(savedCart);

//   let cart = {};
//   for (let index = 0; index < all_product.length; index++) {
//     const productId = all_product[index].id;
//     cart[productId] = { quantity: 0, size: null };
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   const [wishlist, setWishlist] = useState(() => {
//     const savedWishlist = localStorage.getItem("wishlist");
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
//   });

//   const [orders, setOrders] = useState(() => {
//     const savedOrders = localStorage.getItem("orders");
//     return savedOrders ? JSON.parse(savedOrders) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   const addToCart = (itemId, size = null) => {
//     setCartItems((prev) => {
//       const existingItem = prev[itemId] || { quantity: 0, size: null };
//       return {
//         ...prev,
//         [itemId]: {
//           quantity: existingItem.quantity + 1,
//           size: size || existingItem.size,
//         },
//       };
//     });
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const existingItem = prev[itemId];
//       if (!existingItem) return prev;
//       const newQuantity = existingItem.quantity - 1;
//       return {
//         ...prev,
//         [itemId]: {
//           ...existingItem,
//           quantity: newQuantity > 0 ? newQuantity : 0,
//         },
//       };
//     });
//   };

//   const removeFromCartCompletely = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: { quantity: 0, size: null },
//     }));
//   };

//   const clearCart = () => {
//     setCartItems(getDefaultCart());
//   };

//   const toggleWishlistItem = (itemId) => {
//     setWishlist((prev) =>
//       prev.includes(itemId)
//         ? prev.filter((id) => id !== itemId)
//         : [...prev, itemId]
//     );
//   };

//   const removeFromWishlist = (itemId) => {
//     setWishlist((prev) => prev.filter((id) => id !== itemId));
//   };

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       const product = all_product.find((p) => p.id === Number(itemId));
//       if (product && cartItems[itemId].quantity > 0) {
//         total += product.new_price * cartItems[itemId].quantity;
//       }
//     }
//     return total;
//   };

//   const placeOrder = () => {
//     const orderItems = Object.keys(cartItems)
//       .filter((id) => cartItems[id].quantity > 0)
//       .map((id) => {
//         const product = all_product.find((p) => p.id === Number(id));
//         return {
//           id: product.id,
//           name: product.name,
//           image: product.image,
//           new_price: product.new_price,
//           size: cartItems[id].size,
//           quantity: cartItems[id].quantity,
//         };
//       });

//     if (orderItems.length > 0) {
//       const newOrder = { items: orderItems };
//       setOrders((prev) => [...prev, newOrder]);
//       clearCart(); // ✅ Clear cart after order
//     }
//   };

//   const getTotalCartItems = () => {
//     return Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
//   };

//   const contextValue = {
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     removeFromCartCompletely,
//     clearCart, // ✅ added
//     wishlistItems: wishlist,
//     toggleWishlistItem,
//     removeFromWishlist,
//     getTotalCartAmount,
//     getTotalCartItems,
//     setCartItems,
//     orders,
//     setOrders,
//     placeOrder,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;




import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch {
      localStorage.removeItem("cartItems");
    }
  }

  let cart = {};
  if (Array.isArray(all_product)) {
    for (let index = 0; index < all_product.length; index++) {
      const productId = all_product[index]?.id;
      if (productId !== undefined) {
        cart[productId] = { quantity: 0, size: null };
      }
    }
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (itemId, size = null) => {
    setCartItems((prev) => {
      const existingItem = prev[itemId] || { quantity: 0, size: null };
      return {
        ...prev,
        [itemId]: {
          quantity: existingItem.quantity + 1,
          size: size || existingItem.size,
        },
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existingItem = prev[itemId];
      if (!existingItem) return prev;
      const newQuantity = existingItem.quantity - 1;
      return {
        ...prev,
        [itemId]: {
          ...existingItem,
          quantity: newQuantity > 0 ? newQuantity : 0,
        },
      };
    });
  };

  const removeFromCartCompletely = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { quantity: 0, size: null },
    }));
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const toggleWishlistItem = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((id) => id !== itemId));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = all_product?.find((p) => p.id === Number(itemId));
      if (product && cartItems[itemId].quantity > 0) {
        total += product.new_price * cartItems[itemId].quantity;
      }
    }
    return total;
  };

  const placeOrder = () => {
    const orderItems = Object.keys(cartItems)
      .filter((id) => cartItems[id].quantity > 0)
      .map((id) => {
        const product = all_product?.find((p) => p.id === Number(id));
        if (!product) {
          console.warn(`⚠️ Product with ID ${id} not found in all_product`);
          return null;
        }
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          new_price: product.new_price,
          size: cartItems[id].size,
          quantity: cartItems[id].quantity,
        };
      })
      .filter(Boolean); // remove nulls

    if (orderItems.length > 0) {
      const newOrder = { id: Date.now(), items: orderItems };
      setOrders((prev) => [...prev, newOrder]);
      clearCart();
    }
  };

  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    removeFromCartCompletely,
    clearCart,
    wishlistItems: wishlist,
    toggleWishlistItem,
    removeFromWishlist,
    getTotalCartAmount,
    getTotalCartItems,
    setCartItems,
    orders,
    setOrders,
    placeOrder,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
