const CryptoJS = require('crypto-js')

const difficulty = 4

class Block {
    /** 
     * Block structure
     * 블록에 포함되는 내용
     * - index
     * - 이전 해쉬 값
     * - 시간 값
     * - 데이터
     * - 현재 블록의 해쉬 
    */
    constructor(index, previousHash, timestamp, data, nonce, hash) {
        this.index = index,
        this.previousHash = previousHash.toString()
        this.timestamp = timestamp
        this.data = data
        this.nonce = nonce
        this.hash = hash.toString()
    }
}

const getGenesisBlock = () => {
    return new Block(
        0,
        "0",
        1543229546, // new Date().getTime() / 1000
        "my genesis block!!",
        0,
        "9F16A0EC941107A9F6BCCC21D3B633DED3112E3F6839367AD99A6AC209ED6162" // 001543229546my genesis block!! // https://passwordsgenerator.net/sha256-hash-generator/
    )
}

const blockchain = [getGenesisBlock()]



const calculateHash = (index, previousHash, timestamp, data, nonce) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data + nonce).toString()
}

const generateNextBlock = (blockData) => {
    /**
     * Generating a block
     * - 이전 블록의 해시
     * - 현재 블록의 내용
     *  - 인덱스
     *  - 해시
     *  - 데이터
     *  - 시간
     */
    const previousBlock = getLatestBlock() // 제일 마지막 블록을 들고옴.
    const nextIndex = previousBlock.index + 1
    const nextTimestamp = new Date().getTime() / 1000
    let nonce = 0
    let nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce)
    
    const zeros = '0'.repeat(difficulty)
    while(!nextHash.startsWith(zeros)) {
        nonce = nonce + 1
        // console.log(nonce)
        nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce)
    }

    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce, nextHash)
}

const getLatestBlock = () => blockchain[blockchain.length - 1]

// const addBlock = (newBlock) => {
//     if (isValidNewBlock(newBlock, getLatestBlock())) {
//         blockchain.push(newBlock)
//     }
// }

// const isValidNewBlock = (newBlock, previousBlock) => {
//     const zeros = '0'.repeat(difficulty)
//     if (newBlock.hash.startsWith(zeros)) {
//         return true
//     }
//     return false
// }

console.log("genesis:", blockchain)
blockchain.push(generateNextBlock("abcd"))
console.log("next:", blockchain)
