"use client"
import React, { useState } from 'react';

interface ExpandingCardProps {
  mnemonic: string;
}

const copyToClipboard = (mnemonic: string) => {
  navigator.clipboard.writeText(mnemonic).then(() => {
    console.log('Mnemonic copied to clipboard!');
  }).catch(() => {
    console.log('Failed to copy mnemonic. Please try again.');
  });
};

const ExpandingCard: React.FC<ExpandingCardProps> = ({ mnemonic }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-2xl border-2 border-dark-gray px-6 py-4">
      <div className='flex items-center justify-between'>
        <h5 className="font-bold tracking-tighter text-[30px] pb-4 mt-5">Your Secret Phrase</h5>
        <div>
          <button
            className="mt-2 px-4 py-2 rounded-full hover:bg-dark-gray transition-all duration-300"
            onClick={toggleExpand}
          >
            <img
              src={isExpanded ? "upa.png" : "down.png"}
              alt={isExpanded ? 'Show Secret Phrase' : 'Hide Secret Phrase'}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
        {isExpanded ? (
          <>
          <div className="grid grid-cols-4 grid-rows-3 gap-4">
            {mnemonic.split(' ').map((item, index) => (
              <div
                className="md:text-lg bg-dark-gray hover:bg-dark-gray/50 transition-all duration-300 rounded-lg p-4 truncate"
                key={index}
              >
                {item}
              </div>
            ))}
            </div>
            <div className="flex flex-row gap-3 items-center max-w max-h py-5 mt-5">
              <img src="clipboard.png" alt="Arrow" className="w-5 h-5" onClick={() => copyToClipboard(mnemonic)}/>
              <p className='text-textColor truncate flex justify-between w-full items-center gap-2 hover:text-white'  onClick={() => copyToClipboard(mnemonic)}>Copy here to copy</p>
            </div>
          </>
        ) : null}
      </div>
  );
};

export default ExpandingCard;
