// src/graphql/mutations/createJobMutation.js

export const CREATE_JOB_MUTATION = `
  mutation CreateJob($title: String!, $role: String!, $location: String!, $salary: Int!) {
    insert_job_one(object: { title: $title, role: $role, location: $location, salary: $salary }) {
      id
      title
      role
      location
      salary
    }
  }
`;
