import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useCart } from '../context/CartContext';

const MobileSingle = () => {
  const [mobileData, setMobileData] = useState(null);

  const { data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setMobileData(data?.getstudentList?.data);
    },
  });

  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const product = mobileData && mobileData.find((item) => item.ID === id);

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

export default MobileSingle;
