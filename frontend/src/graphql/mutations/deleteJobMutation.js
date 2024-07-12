import { gql } from 'graphql-request';

export const DELETE_JOB_MUTATION = gql`
  mutation DeleteJob($id: uuid!) {
    delete_job_by_pk(id: $id) {
      id
    }
  }
`;
