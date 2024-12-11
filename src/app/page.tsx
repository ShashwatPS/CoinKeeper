"use client";
import { useState } from 'react';
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet, Wallet } from "ethers";
import bs58 from "bs58";

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [account, setAccount] = useState<{ publicKey: string, privateKey: string }[]>([]); 
  const [solanaWalletNo, solanaSetWalletNo] = useState<number>(0);
  const [ethWalletNo, ethSetWalletNo] = useState<number>(0);

  const generateWalletSeed = async () => {
    const mn = await generateMnemonic();
    const seed = mnemonicToSeedSync(mn!);
    console.log(seed);
    setSeed(seed.toString("hex"));
    setMnemonic(mn!);
  }

  const generateSolanaKeyPair = async () => {
    const path = `m/44'/501'/${solanaWalletNo}'/0'`;
    solanaSetWalletNo(solanaWalletNo + 1);
    const derivedSeed = derivePath(path, seed!).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privateKey = bs58.encode(secret);
    console.log(publicKey, privateKey);
    setAccount((prevAccount) => [
      ...prevAccount,
      { publicKey, privateKey },
    ]);
  }

  const generateEthereumKeyPair = async () => {
    const path = `m/44'/60'/${ethWalletNo}`;
    ethSetWalletNo(ethWalletNo + 1);
    const seed1 = mnemonicToSeedSync(mnemonic!);
    const hdNode = HDNodeWallet.fromSeed(seed1);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    console.log({privateKey: wallet.privateKey, publicKey: wallet.address});
  }

  return (
    <div>
      <h1>This is the main page</h1>
      <button onClick={generateWalletSeed}>
        Create Seed Phrase
      </button> <br/>
      <button onClick={generateSolanaKeyPair}>
        Generate Solana Key Pair
      </button>
      <br/>
      <button onClick={generateEthereumKeyPair}>
        Generate Ethereum Key Pair
      </button>
      <br/>
      <p>{account.map(({ publicKey, privateKey }) => `${publicKey} ${privateKey}`).join("\n")}</p>
      <p>{mnemonic}</p>
      <p>{seed}</p>
    </div>
  );
}
