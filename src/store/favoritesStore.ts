"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type FavoritesStore = {
  favorites: string[]

  toggleFavorite: (id: string) => void

  isFavorite: (id: string) => boolean
}

export const useFavoritesStore =
  create<FavoritesStore>()(
    persist(
      (set, get) => ({
        favorites: [],

        toggleFavorite: (id) => {
          const favorites =
            get().favorites

          if (favorites.includes(id)) {
            set({
              favorites:
                favorites.filter(
                  (f) => f !== id
                ),
            })
          } else {
            set({
              favorites: [
                ...favorites,
                id,
              ],
            })
          }
        },

        isFavorite: (id) => {
          return get().favorites.includes(id)
        },
      }),
      {
        name: "favorites-storage",
      }
    )
  )