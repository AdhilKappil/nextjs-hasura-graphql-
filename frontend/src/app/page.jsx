// src/app/page.js

import React from 'react';
import JobList from '@/components/JobList'; // Adjust path based on your project setup
import CreateJob from '@/components/CreateJob';

const Home = () => {
  return (
    <main>
       <div className='flex p-10'>
          <div className='w-[20%] flex justify-center items-center'><CreateJob/></div>
          <div className='w-[80%] rounded-lg border-2 p-3 shadow-md'><JobList/></div>
       </div>
    </main>
  );
};

export default Home;
