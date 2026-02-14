# CoinKeeper 💰

A modern, multi-chain cryptocurrency wallet supporting Solana and Ethereum. Generate mnemonic phrases, create HD wallets, and manage multiple accounts with a clean, intuitive UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Features ✨

- **🔐 Multi-Chain Support**: Create wallets for Solana and Ethereum
- **📝 BIP39 Mnemonics**: Generate and import 12-word seed phrases
- **🔄 HD Wallets**: Hierarchical Deterministic wallet derivation
- **👛 Multiple Accounts**: Add and manage multiple wallets per blockchain
- **🔑 Key Management**: View public and private keys securely
- **🎨 Modern UI**: Built with Tailwind CSS and React Bootstrap
- **⚡ Fast & Lightweight**: Next.js 15 with App Router

## Tech Stack 🛠️

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **React 19** | UI components |
| **Tailwind CSS** | Utility-first styling |
| **Ethers.js v6** | Ethereum blockchain interaction |
| **@solana/web3.js** | Solana blockchain interaction |
| **BIP39** | Mnemonic phrase generation |
| **ed25519-hd-key** | HD key derivation for Solana |

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ShashwatPS/CoinKeeper.git
cd CoinKeeper
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works 🎯

### 1. Select Blockchain
Choose between **Solana** or **Ethereum** networks.

### 2. Generate or Import Mnemonic
- **Generate**: Create a new random 12-word BIP39 mnemonic
- **Import**: Enter an existing mnemonic phrase

### 3. Create Wallets
- First wallet is auto-generated from your mnemonic
- Click **"Add Wallet"** to create additional accounts (HD derivation)
- View all your accounts with public/private keys

### 4. Manage Accounts
- **Expand**: Click on a card to view full details
- **Clear**: Reset and start over with different blockchain or mnemonic

## Security Notes 🔒

⚠️ **Important**: This is a demo/educational project. 

- Private keys are displayed in the UI (for learning purposes)
- Mnemonics are stored in React state (memory only, not persisted)
- **DO NOT use for real funds** without proper security auditing
- For production use, add:
  - Encrypted storage
  - Password protection
  - Secure key management
  - Hardware wallet integration

## Project Structure 📁

```
CoinKeeper/
├── src/
│   └── app/
│       ├── components/
│       │   ├── AccountList.tsx        # Display wallet accounts
│       │   ├── BlockchainSelector.tsx # Select Solana/Ethereum
│       │   ├── Card.tsx               # Account card component
│       │   ├── ExpandingCard.tsx      # Mnemonic display card
│       │   └── WalletGenerator.tsx    # Generate/import wallets
│       ├── utils/
│       │   └── walletUtils.ts         # Key generation logic
│       ├── layout.tsx                 # Root layout
│       └── page.tsx                   # Main application
├── public/                            # Static assets
└── package.json
```

## Key Components 🧩

### WalletGenerator
- Handles mnemonic generation using BIP39
- Supports importing existing mnemonics
- Derives initial wallet for selected blockchain

### AccountList
- Displays all generated accounts
- Shows public key (address) and private key
- Expandable cards for detailed view

### BlockchainSelector
- UI for choosing between Solana and Ethereum
- Animated selection interface

## API / Utilities 🔧

### `SolanaKeyPair(mnemonic: string)`
Generates a Solana keypair from mnemonic using ed25519 derivation.

### `EthereumKeyPair(mnemonic: string)`
Generates an Ethereum keypair from mnemonic using secp256k1 derivation.

## Future Enhancements 🔮

- [ ] Bitcoin support
- [ ] WalletConnect integration
- [ ] Token balance checking
- [ ] Transaction history
- [ ] Send/receive functionality
- [ ] Hardware wallet support (Ledger/Trezor)
- [ ] Mobile app (React Native)

## License 📄

[MIT License](LICENSE)

## Author 👤

**Shashwat Singh**

Made with ❤️ for the crypto community

---

⚠️ **Disclaimer**: This software is provided for educational purposes only. Use at your own risk. Always verify and audit code before handling real cryptocurrency.
