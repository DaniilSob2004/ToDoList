export function getRandomInt(min: number = 10, max: number = 100000000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
