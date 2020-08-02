import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import VideosService from '../../../services/videos';
import CategoriasService from '../../../services/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    CategoriasService.getAll().then((data) => {
      setCategorias(data);
    }).catch((err) => {
      alert(err);
    });
  }, []);

  const initValues = {
    titulo: '',
    url: '',
    categoriaId: '',
  };

  const { onChange, values, clearForm } = useForm(initValues);

  function cadastrarVideo(e) {
    e.preventDefault();

    // eslint-disable-next-line max-len
    const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoriaId);

    if (!categoriaEscolhida) {
      alert('Categoria não encontrada.');
      return;
    }
    VideosService.create({
      titulo: values.titulo,
      url: values.url,
      categoriaId: categoriaEscolhida.id,
    })
      .then(() => {
        clearForm();
        history.push('/');
      })
      .catch(() => {
        alert('Houve um erro ao salvar os dados.');
      });
  }

  return (
    <>
      <PageDefault>
        <div>

          <h1>Cadastro de vídeo</h1>

          <form onSubmit={cadastrarVideo}>
            <FormField type="text" label="Título" value={values.titulo} name="titulo" onChange={onChange} />
            <FormField type="text" label="URL" value={values.url} name="url" onChange={onChange} />
            <FormField type="text" label="Categoria" value={values.categoriaId} name="categoriaId" onChange={onChange} options={categorias.map(({ titulo }) => titulo)} />

            <input disabled={!(values.titulo)} type="submit" value="Enviar" />

          </form>

          <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
        </div>
      </PageDefault>
    </>
  );
}

export default CadastroVideo;
