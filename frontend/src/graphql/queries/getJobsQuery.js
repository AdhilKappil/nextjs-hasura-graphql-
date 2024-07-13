import { gql } from 'graphql-request';

// Query to get all jobs
export const GET_JOBS_QUERY = `
  query GetJobs {
    job {
      id
      title
      role
      location
      salary
      created_at
    }
  }
`;


// Query to get jobs filtered by role
export const GET_JOBS_BY_ROLE_QUERY = gql`
  query GetJobsByRole($role: String!) {
    job(where: { role: { _eq: $role } }) {
      id
      title
      role
      location
      salary
      created_at
    }
  }
`;