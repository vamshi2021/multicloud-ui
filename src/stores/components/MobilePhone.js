import { React, useState } from "react";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
import { useQuery, useMutation} from '@apollo/client';
import { mobileDataReducer } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";


const Mobiles = () => {
    
  const dispatch = useDispatch();
  const { mobileapidata } = useSelector((state) => state.counter)
  const [mobileData, setMobileData] = useState(mobileapidata);

    console.log(mobileapidata, "asdas")

    const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
      variables: {
        infra: 'infraname',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        dispatch(mobileDataReducer(data?.getstudentList?.data))

        // setMobileData (data?.getstudentList?.data);
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


