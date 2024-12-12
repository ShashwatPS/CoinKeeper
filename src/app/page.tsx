"use client"

import { useState } from 'react';
import BlockchainSelector from './components/BlockchainSelector';
import WalletGenerator from './components/WalletGenerator';
import WalletImporter from './components/WalletImporter';
import AccountList from './components/AccountList';

export default function HomePage() {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [mnemonicAction, setMnemonicAction] = useState<string | null>(null);
  const [mnemonicGenerated, setMnemonicGenerated] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<{ publicKey: string, privateKey: string }[]>([]);

  const addAccount = (account: { publicKey: string, privateKey: string }) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-4 px-14 min-h-[92vh] py-4'>
      <div className='flex items-center py-1'>
        <img src='hey.svg' alt='Logo' className='h-20 w-20 mr-1' />
        <h1 className='text-xl font-semibold'>CoinKeeper</h1>
      </div>
      {!selectedBlockchain ? (
        <BlockchainSelector selectBlockchain={setSelectedBlockchain} />
      ) : !mnemonicAction ? (
        <div>
          <h3>Selected Blockchain: {selectedBlockchain}</h3>
          <button onClick={() => setMnemonicAction('generate')}>Generate Mnemonic</button>
          <button onClick={() => setMnemonicAction('import')}>Import Mnemonic</button>
        </div>
      ) : (
        <div>
          <h3>Selected Blockchain: {selectedBlockchain}</h3>
          {mnemonicAction === 'generate' ? (
            <WalletGenerator
              blockchain={selectedBlockchain}
              addAccount={addAccount}
              onMnemonicGenerated={() => setMnemonicGenerated(true)}
            />
          ) : (
            <WalletImporter blockchain={selectedBlockchain} addAccount={addAccount} />
          )}  
        </div>
      )}
      {mnemonicGenerated && <AccountList accounts={accounts} />}
        <div className="item last mt-auto border-t-2 border-slate-50">
          <h1 className="text-lg pt-5">Made by Shashwat</h1>
        </div>  
    </div>
  );
}
