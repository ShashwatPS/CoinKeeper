import React, { useState } from 'react';
import { SolanaKeyPair, EthereumKeyPair } from '../utils/walletUtils';

interface WalletImporterProps {
  blockchain: string;
  addAccount: (account: { publicKey: string, privateKey: string }) => void;
}

const WalletImporter: React.FC<WalletImporterProps> = ({ blockchain, addAccount }) => {
  const [privateKeyInput, setPrivateKeyInput] = useState<string>('');

  const importWallet = () => {
    if (blockchain === 'solana') {
      const generatedKeypair = SolanaKeyPair(privateKeyInput);
      addAccount(generatedKeypair);
    } else if (blockchain === 'ethereum') {
      const generatedKeypair = EthereumKeyPair(privateKeyInput);
      addAccount(generatedKeypair);
    }
  };

  return (
    <div>
      <h4>Or Import Wallet</h4>
      <input
        type="text"
        value={privateKeyInput}
        onChange={(e) => setPrivateKeyInput(e.target.value)}
        placeholder="Enter Mnemonics"
      />
      <button onClick={importWallet}>Import Wallet</button>
    </div>
  );
};

export default WalletImporter;
