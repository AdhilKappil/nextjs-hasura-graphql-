"use client"

import React, { useEffect, useState } from 'react';
import { graphqlClient } from '../graphql/client';
import { GET_JOBS_QUERY } from '@/graphql/queries/getJobsQuery'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await graphqlClient.request(GET_JOBS_QUERY);
        setJobs(data.job);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>List of Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>Title:</strong> {job.title}<br />
            <strong>Role:</strong> {job.role}<br />
            <strong>Location:</strong> {job.location}<br />
            <strong>Salary:</strong> {job.salary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
