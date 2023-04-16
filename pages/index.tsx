import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const [pinCode, setPinCode] = useState('');

  useEffect(() => {
    // Generate a random 6-digit pin code
    const newPinCode = Math.floor(Math.random() * 900000) + 100000;
    setPinCode(newPinCode.toString());
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    router.push({
      pathname: '/ultraleap',
      query: { pinCode },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Pin Code: {pinCode}</p>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default Home;
