import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000',
  };

  const { onChange, values, clearForm } = useForm(valoresIniciais);

  const [listaCategorias, setListaCategorias] = useState([]);

  function cadastrarCategoria(e) {
    e.preventDefault();
    setListaCategorias([...listaCategorias, values]);
    clearForm();
  }

  useEffect(() => {
    // Método executado após renderizar a tela

    const local = window.location.hostname === 'localhost';
    const URL = local ? 'http://localhost:8080/categorias' : 'https://coverflix.herokuapp.com/categorias';
    fetch(URL).then(async (res) => {
      const data = await res.json();
      setListaCategorias(data);
    });
  }, []);

  return (
    <>
      <PageDefault>
        <div>
          <h1>Cadastro de Categoria: </h1>
          <form onSubmit={cadastrarCategoria}>

            <FormField type="text" label="Título" value={values.titulo} name="titulo" onChange={onChange} />

            <FormField tag="textarea" label="Descrição" value={values.descricao} name="descricao" onChange={onChange} />

            <FormField type="color" label="Cor" value={values.cor} name="cor" onChange={onChange} />

            <input disabled={!(values.titulo && values.descricao)} type="submit" value="Enviar" />

          </form>

          {listaCategorias.length === 0 && (
            <div>
              Carregando...
            </div>
          )}

          <ul>
            {listaCategorias.map((element, index) => (
              <li key={String(`categoria_${index}`)}>
                <h2>{element.titulo}</h2>
              </li>
            ))}
          </ul>
          <Link to="/">Ir para o início</Link>
        </div>
      </PageDefault>
    </>
  );
}

export default CadastroCategoria;
