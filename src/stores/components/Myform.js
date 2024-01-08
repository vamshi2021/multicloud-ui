import React, { useState } from 'react';
import { UPDATE_STUDENT_LIST } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';

const MyForm = ({ setCheck, id }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [updateProduct] = useMutation(UPDATE_STUDENT_LIST, {
    onCompleted: () => {
      setCheck(false);
      window.location.reload();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({
      variables: {
        id: id,
        key: inputValue,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter name to update:
        <input className='updatefeild' type="text" value={inputValue} onChange={handleInputChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
