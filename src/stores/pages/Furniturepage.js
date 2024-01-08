import React, { useState, useEffect } from 'react';
import Navigationbar from '../components/Navigationbar';
import { Link } from 'react-router-dom';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const FurniturePage = () => {
  const [furnitureData, setFurnitureData] = useState([]);
  const [selectedCheckProduct, setSelectedCheckProduct] = useState(null);
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

  const selectedItemData = furnitureData.filter((item) => item.Category === 'Home Furniture');

  const companyHandler = (event) => {
    setSelectedCheckProduct(event);

    if (selectedProduct.includes(event)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== event));
    } else {
      setSelectedProduct([...selectedProduct, event]);
    }
  };

  const filteredProduct =
    selectedProduct.length === 0 ? selectedItemData : selectedItemData.filter((item) => item.Company === selectedCheckProduct);

  return (
    <>
      <Navigationbar />
      <div className="fullpage">
        <div className="pro-selected">
          {selectedItemData &&
            selectedItemData.map((furniture) => (
              <div className="pro-input" key={furniture.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={furniture.Company === selectedCheckProduct}
                    onChange={() => companyHandler(furniture.Company)}
                  />
                  {furniture.Company}
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
