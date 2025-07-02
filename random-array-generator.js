export default class randomArray {
    
    // static createRandomArray(length) {
    //     const randomArray = [];
    //     for (let i=0; i < length; i++) {
    //         const randomNumber = Math.floor(Math.random() * 100);
    //         randomArray.push(randomNumber);
    //     }

    //     return randomArray;
    // }
    static createUniqueRandomArray(length, max = 100) {  // ✅ No duplicates
        const set = new Set();
        while (set.size < length && set.size < max) {
            set.add(Math.floor(Math.random() * max));
        }
        return Array.from(set);
    }
}
