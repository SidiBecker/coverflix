import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import VideosService from '../../../services/videos';

function CadastroVideo() {
  const history = useHistory();
  const initValues = {
    titulo: '',
    url: '',
    categoriaId: "1",
  };

  const { onChange, values, clearForm } = useForm(initValues);

  function cadastrarVideo(e) {
    e.preventDefault();

    VideosService.create({
      titulo: values.titulo,
      url: values.url,
      categoriaId: "1",
    })
      .then(() => {
        clearForm();
        history.push('/');
      })
      .catch((err) => {
        alert(err);
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
            <FormField tag="select" type="text" label="Categoria" value={values.categoriaId} options={[{ id: 1 }]} name="categoriaId" onChange={onChange} />

            <input disabled={!(values.titulo)} type="submit" value="Enviar" />

          </form>

          <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
        </div>
      </PageDefault>
    </>
  );
}

export default CadastroVideo;
