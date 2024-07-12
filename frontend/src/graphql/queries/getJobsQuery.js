export const GET_JOBS_QUERY = `
  query GetJobs {
    job {
      id
      title
      role
      location
      salary
    }
  }
`;