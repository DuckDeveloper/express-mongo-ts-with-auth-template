const getRandomNumberByLength = (length: number) => Math.floor((9 * Math.random() + 1) * 10 ** (length - 1))

export default getRandomNumberByLength
