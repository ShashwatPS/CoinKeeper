import React, { useState, useEffect } from "react";
import { generateWallet, EthereumKeyPair, SolanaKeyPair } from '../utils/walletUtils';

interface WalletGeneratorProps {
  blockchain: string;
  addAccount: (account: { publicKey: string, privateKey: string }) => void;
  onMnemonicGenerated: (mnemonic: string) => void;
  mnemonic: string | null;
}

const WalletGenerator: React.FC<WalletGeneratorProps> = ({ blockchain, addAccount, onMnemonicGenerated, mnemonic }) => {
  const [mnemonicInput, setMnemonicInput] = useState<string>(mnemonic || '');

  const handleGenerateOrImport = async () => {
    let mnemonic = mnemonicInput;
    if (!mnemonic) {
      const walletProps = await generateWallet("");
      mnemonic = walletProps.mnemonic;
    }
    onMnemonicGenerated(mnemonic);
    if (blockchain === 'solana') {
      const keypair = SolanaKeyPair(mnemonic);
      addAccount(keypair);
    } else if (blockchain === 'ethereum') {
      const keypair = EthereumKeyPair(mnemonic);
      addAccount(keypair);
    }
  };

  return (
    <div>
      <div className='flex flex-row max-w max-h justify-between pt-11'>
        <div>
          <h1 className="tracking-tighter text-4xl md:text-5xl font-black font-bold">Secret Recovery Phrase</h1>
          <p className="text-textColor text-lg md:text-xl">Save these words in a safe place.</p>
        </div>
        {blockchain === 'solana' ? (
          <img src='solana_bg.png' alt='Solana Blockchain' className='h-20 w-20 mr-8' />
        ) : (
          <img src='ethereum_bg.png' alt='Ethereum Blockchain' className='h-20 w-20 mr-8' />
        )}
      </div>
      <div className="flex flex-row gap-6 items-center mt-2">
      <input
        type="text"
        value={mnemonicInput}
        className="flex h-10 w-full rounded-md border border-textColor bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => setMnemonicInput(e.target.value)}
        placeholder="Enter Mnemonics or leave blank to generate"
      />
      <button className="py-2 h-12 px-16 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={handleGenerateOrImport}>
        Generate
      </button>
      </div>
    </div>
  );
};

export default WalletGenerator;