// src/lib/countryFlag.ts

export type CountryCode = "ru" | "by" | "ar"

export function getCountryFlag(country?: string) {
  if (!country) return ""

  const code = country.toLowerCase()

  switch (code) {
    case "ru":
    case "russia":
      return "🇷🇺"

    case "by":
    case "belarus":
      return "🇧🇾"

    case "ar":
    case "argentina":
      return "🇦🇷"

    default:
      return ""
  }
}

export function getCountryLabel(country?: string) {
  if (!country) return ""

  const code = country.toLowerCase()

  switch (code) {
    case "ru":
      return "Россия"
    case "by":
      return "Беларусь"
    case "ar":
      return "Аргентина"
    default:
      return country
  }
}