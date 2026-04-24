// lib/store.ts
import { create } from 'zustand'
import type { CartItem, Product } from '@/types'

interface CartStore {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCart = create<CartStore>((set, get) => ({
    cart: [],
    addToCart: (product: Product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id)
        if (existing) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
        }
        return {
            cart: [...state.cart, {
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url || product.image || '',
                quantity: 1
            }]
        }
    }),
    removeFromCart: (productId: string) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
    })),
    updateQuantity: (productId: string, quantity: number) => set((state) => {
        if (quantity <= 0) {
            return { cart: state.cart.filter(item => item.id !== productId) }
        }
        return {
            cart: state.cart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        }
    }),
    clearCart: () => set({ cart: [] }),
    getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
    },
    getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
}))