// src/app/page.js

import React from 'react';
import JobList from '@/components/JobList'; // Adjust path based on your project setup
import CreateJob from '@/components/CreateJob';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">Job Listings</h1>
      <JobList/>
      <div>
        <CreateJob/>
      </div>
    </main>
  );
};

export default Home;
