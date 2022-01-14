import React, { useState } from "react";

export function useInput(initialValues, handleFilter) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e, modifiedValue = null) => {
    const { name, value } = e.target;
    if (modifiedValue) {
      setValues({
        ...values,
        [name]: modifiedValue,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (handleFilter) {
      handleFilter({
        ...values,
        [name]: value,
      });
    }
  };

  const handleInputChangeWithParam = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
    if (handleFilter) {
      handleFilter({
        ...values,
        [key]: value,
      });
    }
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleInputChangeWithParam,
  };
}
