import React, { useState } from 'react';
import { SolanaKeyPair, EthereumKeyPair } from '../utils/walletUtils';

interface WalletImporterProps {
  blockchain: string;
  addAccount: (account: { publicKey: string, privateKey: string }) => void;
  onMnemonicImported: () => void;
}

const WalletImporter: React.FC<WalletImporterProps> = ({ blockchain, addAccount, onMnemonicImported }) => {
  const [privateKeyInput, setPrivateKeyInput] = useState<string>('');

  const importWallet = () => {
    if (blockchain === 'solana') {
      const generatedKeypair = SolanaKeyPair(privateKeyInput);
      addAccount(generatedKeypair);
    } else if (blockchain === 'ethereum') {
      const generatedKeypair = EthereumKeyPair(privateKeyInput);
      addAccount(generatedKeypair);
    }
    onMnemonicImported();
  };

  return (
    <div>
      <div className='flex flex-row max-w max-h justify-between pt-12'>
      <div>
      <h1 className="tracking-tighter text-4xl md:text-5xl font-black">Secret Recovery Phrase</h1>
      <p className="text-primary/80 text-lg md:text-xl">Save these words in a safe place.</p>
      </div>
      { blockchain === 'solana'  ? (
      <img src='solana_bg.png' alt='Solana Blockchain' className='h-20 w-20 mr-8' /> ) : (
      <img src='ethereum_bg.png' alt='Ethereum Blockhain' className='h-20 w-20 mr-8' />  
      )}
      </div>
      <div className="flex flex-row gap-2 items-center mt-12">
      <input
        type="text"
        value={privateKeyInput}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => setPrivateKeyInput(e.target.value)}
        placeholder="Enter Mnemonics"
      />
      <button className="px-12 py-2 h-10 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={importWallet}>Import</button>
      </div>
    </div>
  );
};

export default WalletImporter;
