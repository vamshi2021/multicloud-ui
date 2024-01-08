import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useCart } from '../context/CartContext';
import { DELETE_STUDENT_LIST } from '../../graphql/mutation';
import MyForm from '../components/Myform';

const AcSingle = () => {
  const [acData, setAcData] = useState(null);
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const { data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const filteredData = data?.getstudentList?.data.filter(
        (item) => item.ID === id && item.Category === 'Electronics'
      );
      setAcData(filteredData);
    },
  });

  const product = acData && acData[0];

  const [deletion] = useMutation(DELETE_STUDENT_LIST, {
    onCompleted(data) {
      navigate('/');
    },
  });

  const deleteProduct = () => {
    deletion({
      variables: {
        id: product.ID,
      },
    });
  };

  const updateProduct = () => {
    setCheck(true);
  };

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
          {!check && (
            <>
              <button onClick={() => addToCart(product)}>Add to Cart</button> &nbsp;
              <button onClick={() => deleteProduct(product)}>Remove from DB</button> &nbsp;
              <div>
                <button style={{ marginTop: "15px" }} onClick={() => updateProduct(product)}>
                  Update DB
                </button>
              </div>
            </>
          )}
          {check && <MyForm setCheck={setCheck} id={product.ID} />}
        </div>
      </div>
    </>
  );
};

export default AcSingle;
