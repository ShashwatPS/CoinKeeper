"use client"

import { useState } from 'react';
import BlockchainSelector from './components/BlockchainSelector';
import WalletGenerator from './components/WalletGenerator';
import { SolanaKeyPair, EthereumKeyPair, resetCounter } from './utils/walletUtils';
import AccountList from './components/AccountList';

export default function HomePage() {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [mnemonicGenerated, setMnemonicGenerated] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<{ publicKey: string, privateKey: string }[]>([]);

  const addAccount = (account: { publicKey: string, privateKey: string }) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  const handleGenerateOrImportMnemonic = (inputMnemonic: string) => {
    setMnemonic(inputMnemonic || null);
    setMnemonicGenerated(true);
  };

  const ClearAccounts = () => {
    setMnemonicGenerated(false);
    setSelectedBlockchain(null);
    setMnemonic(null);
    setAccounts([]);
    resetCounter();
  };

  const handleAddAnotherAccount = () => {
    if (selectedBlockchain === 'solana') {
      const generatedKeypair = SolanaKeyPair(mnemonic!);
      addAccount(generatedKeypair);
    } else if (selectedBlockchain === 'ethereum') {
      const generatedKeypair = EthereumKeyPair(mnemonic!);
      addAccount(generatedKeypair);
    }
  };

  return (
    <div className='max-w mx-auto flex flex-col gap-4 px-12 min-h-[92vh] py-1'>
      <div className='flex items-center py-1'>
        <img src='hey.svg' alt='Logo' className='h-20 w-20 mr-1' />
        <h1 className='text-xl font-semibold'>CoinKeeper</h1>
      </div>
      {!selectedBlockchain ? (
        <BlockchainSelector selectBlockchain={setSelectedBlockchain} />
      ) : (
        <div>
          {!mnemonicGenerated ? (
            <WalletGenerator
              blockchain={selectedBlockchain}
              addAccount={addAccount}
              onMnemonicGenerated={handleGenerateOrImportMnemonic}
              mnemonic={mnemonic}
            />
          ) : (
            <>
              <h3 className='text-xl font-semibold'>Mnemonic: {mnemonic}</h3>
              <div className='flex flex-row justify-between items-center my-7'>
                <h1 className=' font-bold text-[36px] !important'>{selectedBlockchain.charAt(0).toUpperCase() + selectedBlockchain.slice(1)} Wallet</h1>
                <div className='flex gap-3 items-center'>
                  <div>

                  </div>
                  <button
                    className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 mt-4"
                    onClick={handleAddAnotherAccount}
                  >
                    Add Wallet
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-red-700 text-white font-semibold text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition duration-200 mt-4"
                    onClick={ClearAccounts}
                  >
                    Clear Wallets
                  </button>
                </div>
              </div>
              <AccountList accounts={accounts} />
            </>
          )}
        </div>
      )}
      <div className="item last mt-auto border-t-2 border-slate-50">
        <h1 className="text-lg pt-5">Made by Shashwat</h1>
      </div>
    </div>
  );
}
