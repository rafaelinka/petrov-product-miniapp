export function getCountryCode(country?: string) {
  switch ((country || "").toLowerCase()) {
    case "россия":
    case "russia":
      return "ru"

    case "беларусь":
    case "belarus":
      return "by"

    case "аргентина":
    case "argentina":
      return "ar"

    default:
      return null
  }
}