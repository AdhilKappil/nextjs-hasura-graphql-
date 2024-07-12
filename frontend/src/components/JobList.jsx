"use client";

import React, { useEffect, useState } from "react";
import { graphqlClient } from "../graphql/client";
import { GET_JOBS_QUERY } from "@/graphql/queries/getJobsQuery";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import ReactCardFlip from "react-card-flip";
import { FaSave } from "react-icons/fa";
import { UPDATE_JOB_MUTATION } from "@/graphql/mutations/updateJob"; // Make sure the path is correct

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [flippedJobs, setFlippedJobs] = useState({});
  const [editedJob, setEditedJob] = useState({ id: '', title: '', role: '', location: '', salary: '' });

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

  const handleClick = (job) => {
    setFlippedJobs((prev) => ({
      ...prev,
      [job.id]: !prev[job.id],
    }));
    setEditedJob({ id: job.id, title: job.title, role: job.role, location: job.location, salary: job.salary });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const variables = {
        id: editedJob.id,
        title: editedJob.title,
        role: editedJob.role,
        location: editedJob.location,
        salary: editedJob.salary,
      };
      const data = await graphqlClient.request(UPDATE_JOB_MUTATION, variables);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === editedJob.id ? { ...job, ...data.update_jobs.returning[0] } : job
        )
      );
      setFlippedJobs((prev) => ({
        ...prev,
        [editedJob.id]: false,
      }));
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div>
      <div className="justify-center flex">
        <p className="font-semibold text-3xl">New jobs</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {jobs.map((job, index) => (
            <ReactCardFlip
              key={job.id}
              isFlipped={!!flippedJobs[job.id]}
              flipDirection="horizontal"
            >
              <div
                key="front"
                className={`bg-${index % 3 === 0 ? "purple" : index % 3 === 1 ? "blue" : "yellow"}-100 rounded-lg shadow-lg p-4 mx-4 my-4`}
                style={{
                  backgroundColor: index % 3 === 0 ? "#F7FCEC" : index % 3 === 1 ? "#F9F6FE" : "#FEFCEA",
                }}
              >
                <div className="text-right text-gray-500">
                  <span className="font-bold text-lg">{job.salary}</span>
                  <i className="far fa-bookmark ml-2"></i>
                </div>
                <div className="grid">
                  <div className="mt-4">
                    <div className="">
                      <h2 className="text-2xl font-medium">{job.title}</h2>
                    </div>
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
                      <button
                        onClick={() => handleClick(job)}
                        className="bg-primary text-white p-2 rounded-full hover:bg-gray-700"
                      >
                        <MdModeEditOutline color="white" />
                      </button>
                      <button className="bg-primary text-white p-2 rounded-full hover:bg-gray-700">
                        <MdDelete color="white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                key="back"
                className={`bg-${index % 3 === 0 ? "purple" : index % 3 === 1 ? "blue" : "yellow"}-100 rounded-lg shadow-lg p-4 mx-4 my-4`}
                style={{
                  backgroundColor: index % 3 === 0 ? "#F7FCEC" : index % 3 === 1 ? "#F9F6FE" : "#FEFCEA",
                }}
              >
                <form className="w-full max-w-sm relative" onSubmit={handleSave}>
                  <button className="bg-primary absolute right-0 top-0 text-white p-2 rounded-full hover:bg-gray-700">
                    <FaSave color="white" />
                  </button>
                  <div className="flex items-center border-b border-teal-500 py-1">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={editedJob.title}
                      onChange={(e) => setEditedJob({ ...editedJob, title: e.target.value })}
                      placeholder="Title"
                      aria-label="title"
                    />
                  </div>
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={editedJob.role}
                      onChange={(e) => setEditedJob({ ...editedJob, role: e.target.value })}
                      placeholder="Role"
                      aria-label="role"
                    />
                  </div>
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={editedJob.salary}
                      onChange={(e) => setEditedJob({ ...editedJob, salary: e.target.value })}
                      placeholder="Salary"
                      aria-label="salary"
                    />
                  </div>
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      value={editedJob.location}
                      onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })}
                      placeholder="Location"
                      aria-label="location"
                    />
                  </div>
                </form>
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
