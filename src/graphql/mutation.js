import { gql } from "@apollo/client";

export const INSERT_STUDENT_LIST =gql`

mutation insertstudent($id: String!, $key: String!) {
    insertstudent(id: $id, key: $key) {
      statuscode
      message
    }
  }`;


  export const UPDATE_STUDENT_LIST =gql`

  mutation updatestudent($id: String!, $key: String!) {
    updatestudent(id: $id, key: $key) {
        statuscode
        message
      }
    }`;

export const DELETE_STUDENT_LIST =gql`

mutation deletestudent ($id: String!) {
    deletestudent (id: $id) {
          statuscode
          message
    }
}`;
