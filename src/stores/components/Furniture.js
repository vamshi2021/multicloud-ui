import { React, useState } from "react";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
// import { Link } from 'react-router-dom'
import { useQuery, useMutation} from '@apollo/client';

const Furniture = () => {

    const [furnitureData, setFurnitureData] = useState(null);

    const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
      variables: {
        infra: 'infraname',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setFurnitureData (data?.getstudentList?.data);
      },
    });

    const firstFiveImages = furnitureData && furnitureData.filter(item => item.Category === "Home Furniture").slice(0, 5);

  return (
    <>
   <div className="proTitle"> <h2>Furniture</h2> </div>
   <div className='proSection'>
        {
            firstFiveImages && firstFiveImages.map((item)=>{
                return(
                  item.Category === "Home Furniture" && 

                    <div className='imgBox'>
                       
                        <img className='proImage' src={item.Image} alt=" furniture loading" />
                       
                    </div>
                )
            })
        }
    </div>
   
   </>
  )
}

export default Furniture