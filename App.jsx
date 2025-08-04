import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletContextProvider } from './wallet/WalletContextProvider';
import CreateTokenForm from './components/CreateTokenForm';

function App() {
    return (
        <WalletContextProvider>
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">CreateToken.fun</h1>
                <WalletMultiButton className="mb-4" />
                <CreateTokenForm />
            </div>
        </WalletContextProvider>
    );
}

export default App;