import sha256 from 'crypto-js'

// block size : 1MB
// block contains several transactions
export default class Block {

    constructor(data,previousBlock ) {
        this.timestamp = new Date();
        this.transactions = data;
        this.previousBlockHash = previousBlock;
        this.Hash = this.hashFunction();
        this.nonce = 0
    }

    hashFunction() {
        return sha256.SHA256(
            JSON.stringify(this.nonce + {
                data: this.data,
                brother: this.previousBlockHash,
                time: this.timestamp
            })
        ).toString().toUpperCase()
    }

    //difficulty: hash begin with amount of zeros  (increase difficulty =>more security)
    mineBlock(difficulty) {
        console.log('start mining .....');
        while (this.Hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.Hash = this.hashFunction()
        }
        console.log('block mined with hash:'+ this.Hash)
    }

    hasValidTransaction() {
        for (const tx of this.transactions) {
            if (!tx.isValidTransaction()){
                return false;
            }
        }
        return true
    }

}



