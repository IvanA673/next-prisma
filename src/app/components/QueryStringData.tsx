'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Here is an example utilzing the useSearchParams hook to get the query params from the URL. 
// This will be useful when communicating with the member portal.
const URLData = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    if (email) setEmail(email);
    if (name) setName(name);
  }, [searchParams]);

  return (
    <div>
      <h1>Here is the data from the Query Params:</h1>
      <p>Email: {email}</p>
      <p>Name: {name}</p>
    </div>
  );
};

export default URLData;