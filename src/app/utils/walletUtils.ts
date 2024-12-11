import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import { HDNodeWallet, Wallet } from 'ethers';
import bs58 from 'bs58';

interface WalletProps {
    mnemonic: string;
}

interface KeypairProps {
    publicKey: string;
    privateKey: string;
}

const generateWallet = async (mnemonic: string): Promise<WalletProps> => {
    let mn: string;
    if(mnemonic === "") {
        mn = await generateMnemonic();
    } else {
        mn = mnemonic;
    }
    return { mnemonic: mn };
}

const SolanaKeyPair = (mnemonic: string): KeypairProps => {
    let number: number = 0;
    const path = `m/44'/501'/${number}'/0'`;
    number = number + 1;
    const seed = mnemonicToSeedSync(mnemonic).toString("hex");
    const derivedSeed = derivePath(path, seed).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privateKey = bs58.encode(secret);
    return { publicKey, privateKey };
}

const EthereumKeyPair = (mnemonic: string): KeypairProps => {
    let number: number = 0;
    const path = `m/44'/60'/${number}'`;
    number = number + 1;
    const seed1 = mnemonicToSeedSync(mnemonic);
    const hdNode = HDNodeWallet.fromSeed(seed1);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);    
    return { publicKey: wallet.address, privateKey: wallet.privateKey };
}


export {generateWallet, SolanaKeyPair, EthereumKeyPair};