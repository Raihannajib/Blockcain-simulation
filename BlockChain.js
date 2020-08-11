
import Block from './Block.js';
import Transaction from "./Transaction.js";

class BlockChain {

    constructor(difficulty) {
        this.chain = [this.genesesBlock()];
        this.difficulty = difficulty;
        //create just one block in one specific interval
        //all transaction made between  in between blocks
        this.pendingTransaction = [];
        //if miner successfully build new block , gonna get 20 coin
        this.miningReward =20

    }

    /* A genesis block is the first block of a block chain. Modern versions of Bitcoin number it as block 0*/
    genesesBlock() {
        return new Block(null,null)
    }

    lastBlock() {
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock) {
        newBlock.previousBlockHash =  this.lastBlock().Hash  ;
        console.log('Mining block ..... ');
        //prof-of-work : (mining : put a lot of power to get block )
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

    }

    miningPendingTransaction(minerAddress) {
        const transaction = new Transaction()
    }

    isValidChain() {
        let len = this.chain.length;
        for (let i=1 ; i<len ; i++) {
            if ( (this.chain[i].Hash !== this.chain[i].hashFunction()) || (this.chain[i-1].Hash !== this.chain[i].previousBlockHash) ) return false
        }
        return true
    }

}

// var chain = new BlockChain(1);
// chain.addBlock(new Block(1,1));
// chain.addBlock(new Block(2,0));
// console.log(JSON.stringify(chain,null,4));
// // console.log(chain.isValidChain());



