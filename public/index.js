const input = document.querySelector('.textFile')

input.addEventListener('change', runWordProgram)

async function runWordProgram() {
    const text = await input.files[0].text()
    const words = text.match(/\S*\w+|&/g)
    const seperatedWords = words.map(word => {
        if(word.endsWith('.')) {
            return word.slice(0, word.length - 1)
        }
        return word
    })

    const wordCount = seperatedWords.length

    const wordLengths = seperatedWords.map(word => word.length)

    const sumOfWordLengths = wordLengths.reduce((acc,cur) => acc + cur, 0)
    const numberOfWords = seperatedWords.length
    const averageWordLength = Math.round((sumOfWordLengths / numberOfWords) * 1000) / 1000

    const orginalLengthValues = wordLengths.filter((item, index, arr) => arr.indexOf(item) === index)

    const sortedLengths = orginalLengthValues.sort((a,b) => a - b)

    const lengthData = sortedLengths.map(length => wordLengths.filter(ogLength => ogLength === length).length)

    const mostFrequentlyOccuringWordLength = lengthData.reduce((acc, cur) => {
        return cur > acc ? cur : acc 
    }, 0)

    const modeIndexUnfiltered = lengthData.map((length,index) => {
        if(length === mostFrequentlyOccuringWordLength) {
            return index
        }
        return false
    })

    const modeIndexFiltered = modeIndexUnfiltered.filter(item => item)

    const modeWordLengths = modeIndexFiltered.flatMap(indexNums => sortedLengths.filter((item,index) => index === indexNums))

    console.log(`Word count = ${wordCount}`)
    console.log(`Average word length = ${averageWordLength}`)

    sortedLengths.map((num) => {
        const wordsForEachLength = wordLengths.filter(length => length === num).length
        console.log(`Number of words of length ${num} is ${wordsForEachLength}`)
    })

    console.log(`The most frequently occuring word length is ${mostFrequentlyOccuringWordLength}, for word length ${modeWordLengths.join(' & ')}`)
}

