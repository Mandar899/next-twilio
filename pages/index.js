import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const res = await fetch('/api/sendMesage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, message }),
    });
    const apiResp = await res.json();

    if (apiResp.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className='bg-[#0d1117] min-h-screen px-2 flex flex-col items-center justify-center'>
      <Head>
        <title>Next.js + Twilio</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <form
        onSubmit={sendMessage}
        className=' max-w-xl px-5 py-6 mx-auto border border-gray-800 rounded '
      >
        {/* heading */}
        <h1 className='text-yellow-400 font-black text-5xl'>
          Send message using Next.js & Twilio
        </h1>

        <div className='border-b mt-3 mb-3 border-gray-800'></div>

        {/* input fields / button  */}
        <div className='flex flex-col space-y-3 '>
          <div className='space-y-1'>
            <label
              className='text-yellow-400 font-bold text-lg'
              htmlFor='phone'
            >
              Phone Number
            </label>
            <input
              className='w-full px-2 p-3 text-gray-300 focus:outline-none border border-gray-700  bg-gray-800 rounded placeholder-gray-500'
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter phone number'
              required
            />
          </div>
          <div className='space-y-1'>
            <label
              className='text-yellow-400 font-bold text-lg'
              htmlFor='message'
            >
              Message
            </label>
            <textarea
              className='w-full p-2.5  text-gray-300 focus:outline-none border border-gray-700 bg-gray-800 rounded placeholder-gray-500'
              onChange={(e) => setMessage(e.target.value)}
              id='message'
              required
              placeholder='Enter message'
            ></textarea>
          </div>
          <button
            className='w-full px-4 py-5 bg-yellow-400 text-gray-900 font-bold uppercase tracking-widest rounded focus:outline-none hover:bg-yellow-300 '
            disabled={loading}
            type='submit'
          >
            Send Message
          </button>
        </div>

        {success && <p className=''>Message sent successfully.</p>}
        {error && (
          <p className=''>Something went wrong. Please check the number.</p>
        )}
      </form>
    </div>
  );
}
