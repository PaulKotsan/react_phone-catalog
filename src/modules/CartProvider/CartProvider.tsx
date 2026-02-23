import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface CartItem {
  id: string; // unique product identifier
  name: string;
  image: string;
  color?: string; // optional variant
  capacity?: string; // optional variant
  category?: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  getFromCart: () => CartItem[];
  isInCart: (productId: string) => boolean;
  getTotal: (items: CartItem[]) => { allPrice(): number; Items(): number };
  getItemTotalPrice: (item: CartItem) => number;
  onSubtractFromCart: (item: CartItem) => void;
  removeFromCart: (item: Omit<CartItem, 'quantity'>) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      localStorage.removeItem('cartItems');

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(
        item =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.capacity === newItem.capacity,
      );

      if (index >= 0) {
        const updated = [...prevCart];

        updated[index].quantity += 1;

        return updated;
      }

      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const isInCart = (productId: string): boolean => {
    return cart.some(item => item.id === productId);
  };

  const onSubtractFromCart = (targetItem: CartItem) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          const isSameItem =
            item.id === targetItem.id &&
            item.color === targetItem.color &&
            item.capacity === targetItem.capacity;

          if (!isSameItem) {
            return item;
          }

          return { ...item, quantity: item.quantity - 1 };
        })
        .filter(item => item.quantity > 0),
    );
  };

  const getFromCart = () => {
    return cart;
  };

  const getItemTotalPrice = (targetItem: CartItem) => {
    return targetItem.price * targetItem.quantity;
  };

  const getTotal = (cartItems: CartItem[]) => {
    return {
      allPrice() {
        return cartItems.reduce(
          (acc, curVal) => acc + getItemTotalPrice(curVal),
          0,
        );
      },
      Items() {
        return cartItems.reduce((acc, curVal) => acc + curVal.quantity, 0);
      },
    };
  };

  const removeFromCart = (targetItem: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart =>
      prevCart.filter(
        item =>
          !(
            item.id === targetItem.id &&
            item.color === targetItem.color &&
            item.capacity === targetItem.capacity
          ),
      ),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getFromCart,
        isInCart,
        getTotal,
        getItemTotalPrice,
        removeFromCart,
        onSubtractFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart anywhere
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
