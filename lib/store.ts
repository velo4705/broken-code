// lib/store.ts
import { create } from 'zustand'

interface CartItem {
    id: string
    name: string
    price: number
    image_url: string
    quantity: number
}

interface CartStore {
    cart: CartItem[]
    addToCart: (product: any) => void
    clearCart: () => void
}

export const useCart = create<CartStore>((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id)
        if (existing) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] }
    }),
    clearCart: () => set({ cart: [] }),
}))