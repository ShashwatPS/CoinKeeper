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

  const handleGenerateMnemonic = () => {
    setMnemonicAction('generate');
    setMnemonicGenerated(true);
  };

  return (
    <div className='max-w mx-auto flex flex-col gap-4 px-12 min-h-[92vh] py-1'>
      <div className='flex items-center py-1'>
        <img src='hey.svg' alt='Logo' className='h-20 w-20 mr-1' />
        <h1 className='text-xl font-semibold'>CoinKeeper</h1>
      </div>
      {!selectedBlockchain ? (
        <BlockchainSelector selectBlockchain={setSelectedBlockchain} />
      ) : !mnemonicAction ? (
        <div>
          <h3 className='text-xl font-semibold'>Selected Blockchain: {selectedBlockchain}</h3>
          <div className='flex flex-row gap-4 pt-12'>
          <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={handleGenerateMnemonic}>Generate</button>
          <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={() => setMnemonicAction('import')}>Import</button>
          </div>
        </div>
      ) : (
        <div>
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
