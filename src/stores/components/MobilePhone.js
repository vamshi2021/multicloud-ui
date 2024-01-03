import { React, useState } from "react";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
// import { Link } from 'react-router-dom'
import { useQuery, useMutation} from '@apollo/client';


const Mobiles = () => {
    
    const [mobileData, setMobileData] = useState(null);

    const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
      variables: {
        infra: 'infraname',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setMobileData (data?.getstudentList?.data);
      },
    });
  
    const firstFiveImages = mobileData && mobileData.filter(item => item.Category === "Mobile").slice(0, 5);

    return (
        <>
         <div className="proTitle"> <h2>Mobiles</h2> </div>
        <div className='proSection'>
             {
                 firstFiveImages && firstFiveImages.map((item)=>{
                     return(
                        item.Category === "Mobile" && 

                         <div className='imgBox'>
                             <img className='proImage' src={item.Image} alt="mobile loading" />

                         </div>
                     )
                 })
             }
         </div>
        
        </>
    )
}

export default Mobiles


