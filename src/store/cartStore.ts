"use client"

import { create } from "zustand"

export type CartItem = {
  id: string
  title: string
  qty: number
}

type CartState = {
  items: CartItem[]

  addItem: (item: CartItem) => void

  increaseQty: (id: string) => void

  decreaseQty: (id: string) => void

  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.id === item.id
      )

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        }
      }

      return {
        items: [...state.items, item],
      }
    }),

  increaseQty: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id
          ? { ...i, qty: i.qty + 1 }
          : i
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0),
    })),

  clearCart: () =>
    set({
      items: [],
    }),
}))