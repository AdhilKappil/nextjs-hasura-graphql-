"use client"

import React, { useState } from 'react';
import { graphqlClient } from '../graphql/client';
import { CREATE_JOB_MUTATION } from '@/graphql/mutations/creatJobMutation'; 

const CreateJobForm = () => {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Convert salary to integer before sending to mutation
      const variables = {
        title,
        role,
        location,
        salary
      };

      const { insert_job_one } = await graphqlClient.request(CREATE_JOB_MUTATION, variables);
      console.log('Created job:', insert_job_one);
      // Optionally, handle success (e.g., show confirmation message, clear form)
    } catch (error) {
      console.error('Error creating job:', error);
      // Optionally, handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        Role:
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>
      <br />
      <label>
        Salary:
        <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJobForm;
