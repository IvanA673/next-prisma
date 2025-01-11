import React from 'react';
import TestList from './components/TestList';
import URLData from './components/QueryStringData';

export default async function Home() {


  return (
    <main>
      <TestList />
      <URLData />
    </main>
  );
}
