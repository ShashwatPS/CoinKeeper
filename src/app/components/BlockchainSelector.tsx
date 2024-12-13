import React from "react";

interface BlockchainSelectorProps {
    selectBlockchain: (blockchain: string) => void;
}

const BlockchainSelector: React.FC<BlockchainSelectorProps> = ({ selectBlockchain }) => {
    return (
        <div className="flex flex-col w-full h-full gap-6 pt-11">
            <div>
            <h1 className="tracking-tighter text-4xl md:text-5xl font-black font-bold"> HD Wallet</h1>
            <h3 className="text-textColor text-lg md:text-xl ">Choose a blockchain to get started.</h3>
            </div>
            <div className="flex flex-row gap-4">
            <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={() => selectBlockchain("solana")}>Solana</button>
            <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={() => selectBlockchain("ethereum")}>Ethereum</button>
            </div>
        </div>
    )
}

export default BlockchainSelector;