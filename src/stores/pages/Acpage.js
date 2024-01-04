import React, { useState, useEffect } from 'react';
import Navigationbar from '../components/Navigationbar';
import { Link } from 'react-router-dom';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const AcPage = () => {
  const [acData, setAcData] = useState([]);
  const [selectedCheckProduct, setSelectedCheckProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const { data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setAcData(data?.getstudentList?.data);
    },
  });

  const selectedItemData = acData.filter((item) => item.Category === 'Electronics');

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
            selectedItemData.map((appliance) => (
              <div className="pro-input" key={appliance.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={appliance.Company === selectedCheckProduct}
                    onChange={() => companyHandler(appliance.Company)}
                  />
                  {appliance.Company}
                </label>
              </div>
            ))}
        </div>
        <div className="pageSection">
          {filteredProduct &&
            filteredProduct.map((item) => (
              <div key={item.id}>
                <Link to={`/Ac/${item.ID}`}>
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

export default AcPage;
