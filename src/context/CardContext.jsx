import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            const currentQuantity = existingItem.quantity;
            const updatedCartItems = cartItems.map(item => item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item);
            setCartItems(updatedCartItems);
        }
        else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        }
    }

    function removeFromCart(productId) {
        setCartItems(cartItems.filter(item => item.id !== productId));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    return context;
}