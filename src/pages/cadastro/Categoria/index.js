import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000',
  };

  const [listaCategorias, setListaCategorias] = useState([]);
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

  function cadastrarCategoria(e) {
    e.preventDefault();
    setListaCategorias([...listaCategorias, categoria]);
    setCategoria(valoresIniciais);
  }

  useEffect(() => {
    // Método executado após renderizar a tela
    fetch('https://coverflix.herokuapp.com/categorias').then(async (res) => {
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

            <FormField type="text" label="Nome" value={categoria.nome} name="nome" onChange={onChange} />

            <FormField tag="textarea" label="Descrição" value={categoria.descricao} name="descricao" onChange={onChange} />

            <FormField type="color" label="Cor" value={categoria.cor} name="cor" onChange={onChange} />

            <input disabled={!(categoria.nome && categoria.descricao)} type="submit" value="Enviar" />

          </form>

          {listaCategorias.length === 0 && (
            <div>
              Carregando...
            </div>
          )}

          <ul>
            {listaCategorias.map((element, index) => (
              <li key={String(`categoria_${index}`)}>
                <h2>{element.nome}</h2>
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
