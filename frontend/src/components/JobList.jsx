"use client";

import React, { useEffect, useState } from "react";
import { graphqlClient } from "../graphql/client";
import { GET_JOBS_QUERY } from "@/graphql/queries/getJobsQuery";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";


const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await graphqlClient.request(GET_JOBS_QUERY);
        setJobs(data.job);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-4/5 gap-5">
      {jobs.map((job, index) => (
      <div
        key={job.id}
        className={`bg-${index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'blue' : 'yellow'}-100 rounded-lg shadow-lg p-4 w-80 mx-4 my-4 md:w-96`}
        style={{ backgroundColor: index % 3 === 0 ? '#F7FCEC' : index % 3 === 1 ? '#F9F6FE' : '#FEFCEA' }}
        >
        <div className="text-right text-gray-500">
          <span className="font-bold text-lg">{job.salary}</span>
          <i className="far fa-bookmark ml-2"></i>
        </div>
        <div className="grid">  
        <div className="mt-4">
          <div className=""><h2 className="text-3xl font-medium">{job.title}</h2></div>
          <div className="flex justify-between items-center mt-2 text-gray-400">
            <span>{job.location}</span>
            <i className="fas fa-arrow-right"></i>
          </div>    
        </div>
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <div className="flex items-center">
            <span className="text-gray-600">{job.role}</span>
          </div>
         <div className="flex justify-end gap-2">
         <button className="bg-black text-white p-2 rounded-full hover:bg-gray-900">
            <MdModeEditOutline color="white"/>
          </button>
          <button className="bg-black text-white p-2 rounded-full hover:bg-gray-900">
            <MdDelete color="white"/>
          </button>
         </div>
        </div>
        </div>
      </div>
    ))}
      </div>
  </div>
  
  );
};

export default JobList;
