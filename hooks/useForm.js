import { useState, useCallback } from "react";

const useForm = (initialState, setError) => {
  const [values, setValues] = useState(initialState);

  const clearAllFields = () => {
    setValues(initialState);
  };

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }

    return false;
  }

  const handleChangeValue = useCallback(
    (e) => {
      const { name, value: _value } = e.target;
      setValues({ ...values, [name]: _value });
      setError(null);
    },
    [values]
  );

  const resetField = (field) => {
    setValues({ ...values, [field]: "" });
  };

  return {
    resetField,
    values,
    handleChangeValue,
    ValidateEmail,
    clearAllFields,
  };
};

export default useForm;
