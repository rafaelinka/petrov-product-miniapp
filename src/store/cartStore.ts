"use client"

import { create } from "zustand"

type CartItem = {
  id: string
  title: string
  qty: number
}

type CartState = {
  items: CartItem[]
  add: (item: { id: string; title: string }) => void
  inc: (id: string) => void
  dec: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  add: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }

      return {
        items: [...state.items, { ...item, qty: 1 }],
      }
    }),

  inc: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      ),
    })),

  dec: (id) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0),
    })),

  clear: () => set({ items: [] }),
}))