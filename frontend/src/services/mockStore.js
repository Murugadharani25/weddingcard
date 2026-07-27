export const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

let idCounter = 90000
export const nextId = () => ++idCounter
