import React, { useState, useEffect } from 'react';
import Navigationbar from '../components/Navigationbar';
import { Link } from 'react-router-dom';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const FurniturePage = () => {
  const [furnitureData, setFurnitureData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const { data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setFurnitureData(data?.getstudentList?.data);
    },
  });

  useEffect(() => {
    if (furnitureData) {
      setFurnitureData(furnitureData.filter((item) => item.Category === 'Home Furniture'));
    }
  }, [furnitureData]);

  const companyHandler = (mango) => {
    if (selectedProduct.includes(mango)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== mango));
    } else {
      setSelectedProduct([...selectedProduct, mango]);
    }
  };

  const filteredProduct =
    selectedProduct.length === 0
      ? furnitureData
      : furnitureData.filter((orange) => selectedProduct.includes(orange.Company));

  return (
    <>
      <Navigationbar />
      <div className="fullpage">
        <div className="pro-selected">
          {filteredProduct &&
            filteredProduct.map((phone) => (
              <div className="pro-input" key={phone.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedProduct.includes(phone.Company)}
                    onChange={() => companyHandler(phone.Company)}
                  />
                  {phone.Company}
                </label>
              </div>
            ))}
        </div>
        <div className="pageSection">
          {filteredProduct &&
            filteredProduct.map((item) => (
              <div key={item.id}>
                <Link to={`/Furniture/${item.ID}`}>
                  <div className="pageImg">
                    <img src={item.Image} alt="" />
                  </div>
                </Link>
                <div className="proModel">
                  {item.Company}, {item.Model}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FurniturePage;
