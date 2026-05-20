// src/lib/countryFlag.ts

export function getCountryFlag(country?: string) {
  if (!country) return "🏳️"

  const c = country.toLowerCase().trim()

  if (c === "ru" || c === "russia" || c === "россия") return "🇷🇺"
  if (c === "by" || c === "belarus" || c === "беларусь") return "🇧🇾"
  if (c === "ar" || c === "argentina" || c === "аргентина") return "🇦🇷"

  return "🌍"
}

export function getCountryLabel(country?: string) {
  if (!country) return ""

  const c = country.toLowerCase().trim()

  if (c === "ru" || c === "russia") return "Россия"
  if (c === "by" || c === "belarus") return "Беларусь"
  if (c === "ar" || c === "argentina") return "Аргентина"

  return country
}