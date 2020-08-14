//library generate pk and sk
// Sign => get Signature of transaction
//verify => verify Signature of

//secp256k1 elliptic curve to generate a keypair
import ec from 'elliptic'
const Ec= new ec.ec('secp256k1'); // use in bitcoin

const key = Ec.genKeyPair();
const PK = key.getPublic('hex');
const SK = key.getPrivate('hex');

console.log(PK);
console.log(SK);

