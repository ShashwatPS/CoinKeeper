import React, { useState } from "react";
import {generateWallet, EthereumKeyPair, SolanaKeyPair} from '../utils/walletUtils';

interface WalletGeneratorProps {
    blockchain: string;
    addAccount: (account: { publicKey: string, privateKey: string }) => void;
}

const WalletGenerator: React.FC<WalletGeneratorProps> = ({ blockchain, addAccount }) => {
    const [mnemonic, setMnemonic] = useState<string | null>(null);

    const generateWalletSeed = async () => {
        const walletProps = await generateWallet("");
        setMnemonic(walletProps.mnemonic);
    }

    const generateSolanaKeyPair = () => {
        const keypair = SolanaKeyPair(mnemonic!);
        addAccount(keypair);    
    }

    const generateEthereumKeyPair = () => {
        const keypair = EthereumKeyPair(mnemonic!);
        addAccount(keypair);
    }

    return (
        <>
            {!mnemonic ? (<button onClick={generateWalletSeed}>Generate Wallet Seed</button>) :
                (
                    <div>
                        <p><strong>Mnemonic:</strong> {mnemonic}</p>
                        <button onClick={blockchain === 'solana' ? generateSolanaKeyPair : generateEthereumKeyPair}>
                            Generate {blockchain} Wallet
                        </button>
                    </div>
                )}
        </>
    )
}

export default WalletGenerator;