"use client"
import React, { useState } from 'react';
import EyeIcon from '../../../public/eye.svg';
import EyeOffIcon from '../../../public/eye-off.svg';

interface WalletCardProps {
    public_key: string;
    private_key: string;
    number: number;
}

const WalletCard: React.FC<WalletCardProps> = ({ public_key, private_key, number }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const toggleReveal = () => {
        setIsRevealed(!isRevealed);
    };


    return (
        <div className='flex flex-col rounded-2xl border-2 border-dark-gray'>
            <div className='flex justify-between px-8 py-6 font-bold tracking-tighter text-[30px]'>
                Wallet {number + 1}
            </div>
            <div className='flex flex-col gap-8 px-8 py-4 rounded-2xl bg-dark-gray'>
                <div className='flex flex-col w-full gap-2'>
                    <div className='text-lg md:text-xl font-bold tracking-tighter'>
                        Public Key
                    </div>
                    <div className='text-textColor truncate'>
                        {public_key}
                    </div>
                </div>
                <div className='flex flex-col w-full gap-2 '>
                    <div className='text-lg md:text-xl font-bold tracking-tighter'>
                        Private Key
                    </div>
                    <div className="text-textColor truncate flex justify-between w-full items-center gap-2">
                        <div className="flex items-center">
                            {isRevealed ? (
                                <span>{private_key}</span>
                            ) : (
                                <div>
                                    • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; •
                                    &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; •
                                    &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; •
                                    &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp;•
                                    &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp;•
                                    &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp; • &nbsp;   
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                onClick={toggleReveal}
                                className={`transition-colors px-4 py-2 rounded-lg font-bold tracking-tighter ${isRevealed ? 'bg-dark-gray hover:bg-white-500' : 'bg-dark-gray hover:bg-white-500'
                                    }`}
                            >
                                <img
                                    src={isRevealed ? "eye-off.png" : "eye.png"}
                                    alt={isRevealed ? 'Hide Private Key' : 'Show Private Key'}
                                    className="w-5 h-5"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WalletCard;