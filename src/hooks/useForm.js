import { useState } from 'react';

function useForm(valoresIniciais) {
  const [categoria, setCategoria] = useState(valoresIniciais);

  function setValue(key, value) {
    setCategoria({
      ...categoria,
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
    setCategoria(valoresIniciais);
  }

  return {
    categoria,
    onChange,
    clearForm,
  };
}

export default useForm;
