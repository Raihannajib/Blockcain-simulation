import sha256 from 'crypto-js'
import ec from 'elliptic'

const Ec= new ec.ec('secp256k1'); // use in bitcoin


//we can generate our coins transaction
//so we need verification using SK and PK
// spend coins if you have Security Key
export default class Transaction {

    constructor(from,to,amount) {
        this.from = from;
        this.to = to;
        this.amount = amount
    }

    hashFunction() {
        return sha256.SHA256({
            from : this.from ,
            to : this.to ,
            amount: this.amount
        })
    }

    //build signature
    signTransaction(signingKey) { //generating by eclipse
        if (signingKey.getPublic('hex') !== this.from){
            throw new Error('cannot do transaction')
        }
        const haxTr = this.hashFunction();
        const sig = signingKey.sign(haxTr,'base64');
        //store signature inside transaction
        this.signature = sig.toDER('hex')
    }

    // isValidTransaction() {
    //     if (!this.signature || this.signature.length === 0) return false;
    //     //reward of miner
    //     if (this.from === null) return true;
    //     //verify the signature
    //     const pk = Ec.keyFromPublic(this.from, 'hex');
    //     return pk.verify(this.hashFunction(), this.signature);
    // }


}
