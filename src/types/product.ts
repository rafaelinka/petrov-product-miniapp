export type Product = {
  id: string
  title: string
  brand: string
  category: "cheese" | "milk" | "meat"
  subcategory?: string
  weight?: string
  price?: number
  country?: string
  image?: string
  url?: string
}