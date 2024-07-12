// src/app/page.js
import React from 'react';

const QUERY = `
  query MyQuery {
    job {
      title
    }
  }
`;

async function fetchData() {
  const res = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: QUERY,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '));
  }

  return json.data;
}

export default async function Home() {
  let data;
  try {
    data = await fetchData();
  } catch (error) {
    console.error('Error fetching data:', error);
    data = { job: [{ title: 'Failed to load data' }] };
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">Job Titles</h1>
      <ul>
        {data.job.map((job, index) => (
          <li key={index}>{job.title}</li>
        ))}
      </ul>
    </main>
  );
}
