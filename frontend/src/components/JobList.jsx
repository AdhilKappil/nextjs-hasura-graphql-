"use client";

import React, { useEffect, useState } from "react";
import { graphqlClient } from "../graphql/client";
import { GET_JOBS_BY_ROLE_QUERY, GET_JOBS_QUERY } from "@/graphql/queries/getJobsQuery";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import ReactCardFlip from "react-card-flip";
import { FaSave } from "react-icons/fa";
import { UPDATE_JOB_MUTATION } from "@/graphql/mutations/updateJobMutation"; 
import { DELETE_JOB_MUTATION } from "@/graphql/mutations/deleteJobMutation";
import { IoMdMenu } from "react-icons/io";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [flippedJobs, setFlippedJobs] = useState({});
  const [editedJob, setEditedJob] = useState({ id: '', title: '', role: '', location: '', salary: '' });
  const [uniqueRoles, setUniqueRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');


  useEffect(() => {
    const fetchJobs = async (role) => {
      try {
        const data = selectedRole
        ? await fetchJobsByRole(selectedRole)
        : await graphqlClient.request(GET_JOBS_QUERY);
        setJobs(data.job);
        if (!role) {
          const roles = data.job.map(job => job.role);
          setUniqueRoles([...new Set(roles)]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs(selectedRole);
  }, [selectedRole]);


  const fetchJobsByRole = async (role) => {
    try {
      const data = await graphqlClient.request(GET_JOBS_BY_ROLE_QUERY, {
        role,
      });
      return data;
    } catch (error) {
      console.error('Error fetching jobs by role:', error);
      throw error;
    }
  };


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
          job.id === editedJob.id ? { ...job, ...data.update_job_by_pk } : job
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

  const handleDelete = async (id) => {
    try {
      await graphqlClient.request(DELETE_JOB_MUTATION, { id });
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  return (
    <div className="md:h-[40rem] overflow-y-auto scrollbar-hide">
       <div className="relative">
        <div className="flex justify-center items-center gap-3 text-primary font-Sans text-3xl font-medium">
          <div onClick={handleMenuClick} className="relative">
            <IoMdMenu />
            {isDropdownOpen && (
              <div className="absolute z-10 top-full left-0 mt-2 w-48 origin-top-left rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {uniqueRoles.map((role)=>(
                    <button
                    className="block px-4 py-2 text-sm text-gray-600"
                    onClick={() => handleRoleClick(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
          New Jobs
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <ReactCardFlip
              key={job.id}
              isFlipped={!!flippedJobs[job.id]}
              flipDirection="horizontal"
            >
              <div
                key="front"
                className={`bg-${index % 3 === 0 ? "purple" : index % 3 === 1 ? "blue" : "yellow"}-100 rounded-lg min-w-72 shadow-lg p-5 m-5`}
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
                      <button onClick={()=>handleDelete(job.id)} className="bg-primary text-white p-2 rounded-full hover:bg-gray-700">
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
