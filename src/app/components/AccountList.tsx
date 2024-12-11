import React from 'react';

interface AccountListProps {
  accounts: { publicKey: string, privateKey: string }[];
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  return (
    <div>
      <h3>Accounts</h3>
      {accounts.length === 0 ? (
        <p>No accounts yet.</p>
      ) : (
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>
              <strong>Public Key:</strong> {account.publicKey} <br />
              <strong>Private Key:</strong> {account.privateKey}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountList;
