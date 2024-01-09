import { React, useState } from "react";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
import { useQuery, useMutation} from '@apollo/client';
import { watchDataReducer } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

const Watch = () => {
  const dispatch = useDispatch();

  const {watchapidata} = useSelector((state) => state.counter)

  const [watchData, setWatchData] = useState(watchapidata);

    const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
      variables: {
        infra: 'infraname',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        dispatch(watchDataReducer(data?.getstudentList?.data))
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