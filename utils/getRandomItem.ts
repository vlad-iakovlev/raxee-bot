export const getRandomItem = <T>(items: T[]) => {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}
