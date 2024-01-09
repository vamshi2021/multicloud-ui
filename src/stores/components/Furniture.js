import { React, useState } from "react";
import { GET_STUDENT_LIST_DETAILS } from "../../graphql/queries";
import { useQuery, useMutation} from '@apollo/client';
import { furnitureDataReducer } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

const Furniture = () => {

    const dispatch = useDispatch();

    const {furnitureapidata} = useSelector((state) => (state.counter));

    const [furnitureData, setFurnitureData] = useState(furnitureapidata);

    const {data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
      variables: {
        infra: 'infraname',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        dispatch(furnitureDataReducer(data?.getstudentList?.data))
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