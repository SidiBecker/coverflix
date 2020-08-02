import { useState } from 'react';

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function onChange(ev) {
    const { target } = ev;
    setValue(
      target.getAttribute('name'),
      target.value,
    );
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  return {
    values,
    onChange,
    clearForm,
  };
}

export default useForm;
