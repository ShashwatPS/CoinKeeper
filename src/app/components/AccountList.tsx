import React from 'react';
import WalletCard from './Card';

interface AccountListProps {
  accounts: { publicKey: string, privateKey: string }[];
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  return (
    <div >
      {accounts.length === 0 ? (
        <p>No accounts yet.</p>
      ) : (
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>
              <WalletCard
                public_key={account.publicKey}
                private_key={account.privateKey}
                number={index+1}
              />
              <br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountList;
