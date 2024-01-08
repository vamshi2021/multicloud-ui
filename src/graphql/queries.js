import { gql } from "@apollo/client";

export const GET_STUDENT_LIST_DETAILS = gql`
query getstudentList($infra: String!){
    getstudentList(infra: $infra)
    {
        statuscode
        message
        data{ID,Product,Image,Company,Model,Price,Category,Description},
    }
}`;