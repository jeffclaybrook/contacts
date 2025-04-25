export function updateState(address: string, states: { name: string; abbr: string }[]): string {
 let updatedAddress = address
 states.forEach(state => {
  const regex = new RegExp(`\\b${state.name}\\b`, "g")
  updatedAddress = updatedAddress.replace(regex, state.abbr)
 })

 return updatedAddress
}