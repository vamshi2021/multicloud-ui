import { React, useState } from "react";
// import { Link } from "react-router-dom";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
import { useQuery, useMutation} from '@apollo/client';

const AC = () => {

  const [acData, setAcData] = useState(null);

  const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setAcData (data?.getstudentList?.data);
    },
  });

  const firstFiveImages = acData && acData.filter(item => item.Category === "Electronics").slice(0, 5);

  return (
    <>
      <div className="proTitle"> <h2>Air Condition</h2> </div>
      <div className="proSection">
        { firstFiveImages && firstFiveImages.map((item) => {
          return (
            item.Category === "Electronics" && 
    
            <div className="imgBox">
         
              <img className="proImage" src={item.Image} alt="ac loading" />

            </div>
          );
        })}
      </div>
    </>
  );
};

export default AC;
