import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import * as splToken from '@solana/spl-token';

const FEE_RECEIVER = new PublicKey("6yvBXYpKXYu8Y8yaW7Ti52i1cyfNWF1oTMrFgmDmRhhf");

const CreateTokenForm = () => {
    const [loading, setLoading] = useState(false);
    const [supply, setSupply] = useState(1000000);
    const wallet = useWallet();
    const { connection } = useConnection();

    const handleCreate = async () => {
        if (!wallet.connected) return alert("Connect your wallet");

        try {
            setLoading(true);

            // Pay 0.1 SOL fee to your wallet
            const tx = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: FEE_RECEIVER,
                    lamports: 0.1 * 1e9,
                })
            );
            const sig = await wallet.sendTransaction(tx, connection);
            await connection.confirmTransaction(sig);

            // Create mint
            const mint = await splToken.createMint(
                connection,
                wallet,
                wallet.publicKey,
                null,
                9
            );

            const ata = await splToken.getOrCreateAssociatedTokenAccount(
                connection,
                wallet,
                mint,
                wallet.publicKey
            );

            await splToken.mintTo(
                connection,
                wallet,
                mint,
                ata.address,
                wallet.publicKey,
                supply * 1e9
            );

            alert(`Token created! Mint Address: ${mint.toBase58()}`);
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded bg-white">
            <h2 className="text-xl font-bold mb-2">Create SPL Token</h2>
            <input
                type="number"
                value={supply}
                onChange={(e) => setSupply(Number(e.target.value))}
                className="border p-2 mb-3 w-full"
                placeholder="Token supply"
            />
            <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {loading ? "Creating..." : "Create Token (0.1 SOL fee)"}
            </button>
        </div>
    );
};

export default CreateTokenForm;