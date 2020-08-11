
import Block from './Block.js';

class BlockChain {

    constructor(difficulty) {
        this.chain = [this.genesesBlock()];
        this.difficulty = difficulty
    }

    /* A genesis block is the first block of a block chain. Modern versions of Bitcoin number it as block 0*/
    genesesBlock() {
        return new Block(0,0,null)
    }

    lastBlock() {
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock) {
       newBlock.previousBlockHash =  this.lastBlock().Hash  ;
       //for security reason if someone change data
       // newBlock.Hash = newBlock.hashFunction();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock)
    }

    isValidChain() {
        let len = this.chain.length;
        for (let i=1 ; i<len ; i++) {
            if ( (this.chain[i].Hash !== this.chain[i].hashFunction()) || (this.chain[i-1].Hash !== this.chain[i].previousBlockHash) ) return false
        }
        return true
    }

}

var chain = new BlockChain();
chain.addBlock(new Block(1,1));
chain.addBlock(new Block(2,0));
console.log(JSON.stringify(chain,null,4));
console.log(chain.isValidChain());

//node --experimental-modules BlockChain.js (for es6 developer)
//"type": "module", add to package.json

