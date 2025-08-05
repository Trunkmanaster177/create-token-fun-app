import Head from 'next/head';
import TokenForm from './TokenForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Token Fun</title>
        <meta name="description" content="Create your Solana token in seconds" />
      </Head>
      <main className="container">
        <h1>Create Your Solana Token</h1>
        <TokenForm />
      </main>
    </>
  );
}