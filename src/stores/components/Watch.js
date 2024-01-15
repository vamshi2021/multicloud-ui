import { React, useState } from "react";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
// import { Link } from 'react-router-dom'
import { useQuery, useMutation} from '@apollo/client';

const Watch = () => {

    const [watchData, setWatchData] = useState(null);

    const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
      variables: {
        infra: 'infraname',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setWatchData(data?.getstudentList?.data);
      },
    });

    const firstFiveImages = watchData && watchData.filter(item => item.Category === "Wearable").slice(0, 5);


  return (
    <>
   <div className="proTitle"><h2>Watches</h2> </div>

    <div className='proSection'>
         {
             firstFiveImages && firstFiveImages.map((item)=>{
                 return(
                  item.Category === "Wearable" && 

                     <div className='imgBox'>
                       
                         <img className='proImage' src={item.Image} alt="watch data loading" />
                       
                     </div>
                 )
             })
         }
     </div>
    
    </>
  )
}

export default Watch