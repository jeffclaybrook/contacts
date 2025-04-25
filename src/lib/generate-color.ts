export function generateColor(): string {
 const colors = ["#FF6467", "#FFB900", "#9AE600", "#05DF72", "#00D5BE", "#00D3F3", "#00BCFF", "#51A2FF", "#7C86FF", "#A684FF", "#ED6BFF", "#FB64B6", "#FF637E", "#90A1B9", "#1C6DD0", "#3C91E6", "#40916C", "#577590", "#6C63FF", "#736CED", "#00A896", "#06D6A0", "#118AB2", "#EF476F", "#FF6B6B", "#FF8C42", "#FFA630", "#E4C1F9", "#9D4EDD", "#D81159", "#6A0572", "#3A0CA3"]
 return colors[Math.floor(Math.random() * colors.length)]
}