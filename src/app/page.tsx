"use client"

import { useState } from 'react';
import BlockchainSelector from './components/BlockchainSelector';
import WalletGenerator from './components/WalletGenerator';
import WalletImporter from './components/WalletImporter';
import AccountList from './components/AccountList';

export default function Home() {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<{ publicKey: string, privateKey: string }[]>([]);

  const addAccount = (account: { publicKey: string, privateKey: string }) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Your Wallets</h1>

      <BlockchainSelector selectBlockchain={setSelectedBlockchain} />

      {selectedBlockchain && (
        <div>
          <h3>Selected Blockchain: {selectedBlockchain}</h3>

          <WalletGenerator
            blockchain={selectedBlockchain}
            addAccount={addAccount}
          />
          <WalletImporter
            blockchain={selectedBlockchain}
            addAccount={addAccount}
          />
        </div>
      )}

      <AccountList accounts={accounts} />
    </div>
  );
}
