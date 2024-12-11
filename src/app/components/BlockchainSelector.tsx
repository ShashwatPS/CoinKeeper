import React from "react";

interface BlockchainSelectorProps {
    selectBlockchain: (blockchain: string) => void;
}

const BlockchainSelector: React.FC<BlockchainSelectorProps> = ({ selectBlockchain }) => {
    return (
        <>
            <h3>Select Blockchain</h3>
            <button onClick={() => selectBlockchain("solana")}>Solana</button>
            <button onClick={() => selectBlockchain("ethereum")}>Ethereum</button>
        </>
    )
}

export default BlockchainSelector;