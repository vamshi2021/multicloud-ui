import React, { useState, useEffect } from 'react';
import Navigationbar from '../components/Navigationbar';
import { Link } from 'react-router-dom';
import { GET_STUDENT_LIST_DETAILS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const MobilePage = () => {
  const [mobileData, setmobileData] = useState([]);
  const [selectedCheckProduct, setSelectedCheckProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const { data, networkStatus, refetch } = useQuery(GET_STUDENT_LIST_DETAILS, {
    variables: {
      infra: 'infraname',
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setmobileData(data?.getstudentList?.data);
    },
  });

  const selectedItemData = mobileData.filter((item) => item.Category === 'Mobile')

  const companyHandler = (event) => {
    console.log(event, "event")
    setSelectedCheckProduct(event)


    if (selectedProduct.includes(event)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== event));
    } else {
      setSelectedProduct([...selectedProduct, event]);
    }
  };

  console.log(selectedItemData, "selectedItemData")

  const filteredProduct =
    selectedProduct.length === 0 ? selectedItemData : selectedItemData.filter((item) => item.Company === selectedCheckProduct);

  return (
    <>
      <Navigationbar />
      <div className="fullpage">
        <div className="pro-selected">
          {selectedItemData &&
            selectedItemData.map((phone) => (
              <div className="pro-input" key={phone.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={phone.Company === selectedCheckProduct}
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
                <Link to={`/Mobile/${item.ID}`}>
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

export default MobilePage;
