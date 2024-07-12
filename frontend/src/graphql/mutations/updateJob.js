import { gql } from 'graphql-request';

export const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJob($id: uuid!, $title: String!, $role: String!, $location: String!, $salary: String!) {
    update_jobs(where: { id: { _eq: $id } }, _set: { title: $title, role: $role, location: $location, salary: $salary }) {
      returning {
        id
        title
        role
        location
        salary
      }
    }
  }
`;
