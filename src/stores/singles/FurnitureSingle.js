import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useCart } from '../context/CartContext';

const FurnitureSingle = () => {
  const [furnitureData, setFurnitureData] = useState(null);
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();

  const { data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // Filter the data based on both id and category ('furniture')
      const filteredData = data?.getstudentList?.data.filter(
        (item) => item.ID === id && item.Category === 'Home Furniture'
      );
      setFurnitureData(filteredData);
    },
  });

  const product = furnitureData && furnitureData[0];

  return (
    <>
      <Navigationbar />
      <div className="ind-section">
        <div className="ind-image">
          <img src={product && product.Image} alt="" />
        </div>
        <div className="ind-details space">
          <div className="ind-company">
            <h2>{product && product.Company}</h2>
          </div>
          <div className="ind-model space">
            <h3>{product && product.Model}</h3>
          </div>
          <div className="ind-price space">
            <h2>{product && product.Price}</h2>
          </div>
          <div className="ind-desc space">
            <p>{product && product.Description}</p>
          </div>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default FurnitureSingle;
