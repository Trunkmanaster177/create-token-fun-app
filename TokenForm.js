import { useState } from 'react';
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const FEE_WALLET = new PublicKey('6yvBXYpKXYu8Y8yaW7Ti52i1cyfNWF1oTMrFgmDmRhhf');

export default function TokenForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateToken = async () => {
    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

      const payer = Keypair.generate();
      setStatus('Airdropping 1 SOL for fee...');

      const airdropSignature = await connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL);
      await connection.confirmTransaction(airdropSignature);

      setStatus('Paying fee to owner wallet...');
      const transaction = await connection.requestAirdrop(FEE_WALLET, 0.1 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(transaction);

      setStatus('Token created successfully (mocked)');
    } catch (error) {
      console.error(error);
      setStatus('Error creating token.');
    }
  };

  return (
    <div>
      <input placeholder="Token Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Symbol" value={symbol} onChange={e => setSymbol(e.target.value)} />
      <input placeholder="Supply" type="number" value={supply} onChange={e => setSupply(e.target.value)} />
      <button onClick={handleCreateToken}>Create Token</button>
      <p>{status}</p>
    </div>
  );
}