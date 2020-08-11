// const SHA256 = require('crypto-js/sha256');
import sha256 from 'crypto-js'

export default class Block {

    constructor(index ,data ,previousBlock='' ) {
        this.index = index;
        this.timestamp = new Date();
        this.data = data;
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

    //prof-of-work : (mining : put a lot of power to get block )
    //difficulty: hash begin with amount of zeros  (increase difficulty =>more security)
    mineBlock(difficulty) {
        while (this.Hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.Hash = this.hashFunction()
        }
        console.log('block mined:'+ this.Hash)
    }

}



