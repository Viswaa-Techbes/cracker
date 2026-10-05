'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './toastContext';

export interface CartItemType {
  productId: string;
  name: string;
  slug: string;
  image: string;
  packQuantity: string;
  category?: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItemType[];
  addToCart: (product: { _id: string; name: string; slug: string; image: string; packQuantity: string; category?: string; price: number }, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  transportationCharge: number;
  setTransportationCharge: (charge: number) => void;
  grandTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [transportationCharge, setTransportationChargeState] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load cart and transportation charge from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cracker_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCharge = localStorage.getItem('cracker_transport_charge');
      if (storedCharge !== null) {
        const parsed = parseFloat(storedCharge);
        if (!isNaN(parsed) && parsed >= 0) {
          setTransportationChargeState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to parse cart/transport charge from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cracker_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: { _id: string; name: string; slug: string; image: string; packQuantity: string; category?: string; price: number }, qtyToAdd = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product._id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            packQuantity: product.packQuantity,
            category: product.category,
            price: product.price,
            quantity: Math.max(1, qtyToAdd),
          },
        ];
      }
    });

    showToast(`Added "${product.name}" (${qtyToAdd}) to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.productId === productId);
      if (item) {
        showToast(`Removed "${item.name}" from cart`, 'info');
      }
      return prev.filter((i) => i.productId !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setTransportationCharge(0);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cracker_cart');
      localStorage.removeItem('cracker_transport_charge');
    }
  };

  const setTransportationCharge = (charge: number) => {
    const valid = Math.max(0, isNaN(charge) ? 0 : charge);
    setTransportationChargeState(valid);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cracker_transport_charge', valid.toString());
    }
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + transportationCharge;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        transportationCharge,
        setTransportationCharge,
        grandTotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
