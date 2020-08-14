
import Block from './Block.js';
import Transaction from "./Transaction.js";
import User from './User.js'


import ec from 'elliptic'
const Ec= new ec.ec('secp256k1'); // use in bitcoin
//blockChain -> Blocks -> transactions
export default class BlockChain {

    constructor(difficulty) {
        this.chain = [this.genesesBlock()];
        this.difficulty = difficulty;
        //create just one block in one specific interval
        //all transaction made between  in between blocks
        this.pendingTransaction = [];
        //if miner successfully build new block , gonna get 20 coin
        this.miningReward =20

    }

    addTransaction(transaction) {
        if (!(transaction.to && transaction.from)){
            throw new Error('transaction not complete')
        }
        // if (!transaction.isValidTransaction()){
        //     throw new Error('mal transaction')
        // }

        this.pendingTransaction.push(transaction)
    }


    miningPendingTransaction(minerAddress) {
        //mining a block for transactions
        let block = new Block(this.pendingTransaction);
        block.mineBlock(this.difficulty);

        //if the mining successL: chaining + send reward
        console.log('block successfully mined :> ');
        block.previousBlockHash =  this.lastBlock().Hash  ;
        this.chain.push(block);
        this.pendingTransaction = new Array(new Transaction(null,minerAddress,this.miningReward));
    }



    getBalance(address) {
        let balance = 0;
        for (const block of this.chain){
            if (block.transactions !== null){
            for (const transaction of block.transactions) {
                if (transaction.to === address) {
                    balance += transaction.amount;
                }
                if (transaction.from === address) {
                    balance -= transaction.amount
                }
            }}

        }
        return balance;
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
        //prof-of-work : (mining : put a lot of power to get block ) mining
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

    }

    isValidChain() {
        let len = this.chain.length;
        for (let i=1 ; i<len ; i++) {
            //this.chain[i].hasValidTransaction()
            if ( ( this.chain[i].Hash !== this.chain[i].hashFunction()) || (this.chain[i-1].Hash !== this.chain[i].previousBlockHash) ) return false
        }
        return true
    }



}




