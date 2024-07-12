// Mutation for create a job

export const CREATE_JOB_MUTATION = `
  mutation CreateJob($title: String!, $role: String!, $location: String!, $salary: String!) {
    insert_job_one(object: { title: $title, role: $role, location: $location, salary: $salary }) {
      id
      title
      role
      location
      salary
    }
  }
`;
