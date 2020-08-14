import User from "./User.js";
import Transaction from "./Transaction.js";
import BlockChain from "./BlockChain.js";


//secp256k1 elliptic curve to generate a keypair
import ec from 'elliptic'
const Ec= new ec.ec('secp256k1'); // use in bitcoin

let chain = new BlockChain(5);
const user = new User();



const myKey = Ec.keyFromPrivate(user.sk);
const myWallet  = myKey.getPublic(myKey);

//add transactions to block (signing transactions) i still work on it
chain.addTransaction(new Transaction('a','b',200));
chain.addTransaction(new Transaction('b','c',100));
chain.addTransaction(new Transaction('c','d',50));


//start mining
//
chain.miningPendingTransaction(myWallet);
console.log(`wallet of minner :  ${chain.getBalance(myWallet)} bitcoin`);

//miner take reward when start in second block
chain.miningPendingTransaction(myWallet);
console.log(`walllet of minner ${chain.getBalance(myWallet)} bitcoin`);



// console.log(JSON.stringify(chain,0,4));
