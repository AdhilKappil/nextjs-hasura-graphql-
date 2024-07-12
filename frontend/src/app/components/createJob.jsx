"use client";

import React from "react";
import { graphqlClient } from "../../graphql/client";
import { CREATE_JOB_MUTATION } from "@/graphql/mutations/creatJobMutation";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "@/validations/yupValidation";
import { useDynamicContext } from "@/context/context";

const CreateJobForm = () => {
  const { dynamic, setDynamic } = useDynamicContext();

  // Handling form submit using formikc and ypu validation
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const variables = {
          title: values.title,
          role: values.role,
          location: values.location,
          salary: values.salary,
        };
        const { insert_job_one } = await graphqlClient.request(
          CREATE_JOB_MUTATION,
          variables
        );
        setDynamic(!dynamic);
        resetForm(); // Reset form fields to initial values
      } catch (error) {
        console.error("Error creating job:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center md:justify-start">
      <p className=" text-primary text-center text-2xl font-bold md:leading-tight md:text-left">
        Create new job
        <br />
      </p>
      <form
        className="flex flex-col items-stretch pt-3 md:pt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col pt-4">
          <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Title"
              type="text"
              className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
          {errors.title && touched.title && (
            <div className="text-red-500">{errors.title}</div>
          )}
        </div>
        <div className="mb-4 flex flex-col pt-4">
          <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
            <input
              name="role"
              type="text"
              id="text"
              value={values.role}
              onChange={handleChange}
              className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Role"
            />
          </div>
          {errors.role && touched.role && (
            <div className="text-red-500">{errors.role}</div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
            <input
              name="salary"
              value={values.salary}
              onChange={handleChange}
              placeholder="Salary"
              type="text"
              className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
          {errors.salary && touched.salary && (
            <div className="text-red-500">{errors.salary}</div>
          )}
        </div>
        <div className="mb-4 flex flex-col pt-4">
          <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
            <input
              name="location"
              type="text"
              id="location"
              value={values.location}
              onChange={handleChange}
              className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Location"
            />
          </div>
          {errors.location && touched.location && (
            <div className="text-red-500">{errors.location}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-gray-800 w-full text-white p-2 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
