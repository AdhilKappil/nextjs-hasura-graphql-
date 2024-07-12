import { gql } from 'graphql-request';

// Mutation for update job
export const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJob($id: uuid!, $title: String!, $role: String!, $location: String!, $salary: String!) {
    update_job_by_pk(pk_columns: {id: $id}, _set: {title: $title, role: $role, location: $location, salary: $salary}) {
      id
      title
      role
      location
      salary
    }
  }
`;
