import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import VideosService from '../../../services/videos';
import CategoriasService from '../../../services/categorias';

function CadastroVideo(props) {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);

  const initValues = {
    titulo: '',
    url: '',
    categoriaId: '',
  };
  const {
    onChange, values, clearForm, setValues,
  } = useForm(initValues);

  useEffect(() => {
    const paramId = props.match.params.id;

    if (paramId != null) {
      VideosService.getFromId(paramId).then((video) => {
        setValues({
          titulo: video.titulo,
          url: video.url,
          categoriaId: video.categoria.titulo,
        });
      });
    } else {
      clearForm();
    }

    CategoriasService.getAll().then((data) => {
      setCategorias(data);
    }).catch((err) => {
      alert(err);
    });
  }, []);

  function cadastrarVideo(e) {
    e.preventDefault();

    // eslint-disable-next-line max-len
    const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoriaId);

    if (!(values.titulo && values.url && values.categoriaId)) {
      alert('Informe todos os campos!');
      return;
    }

    if (!categoriaEscolhida) {
      alert('Categoria não encontrada.');
      return;
    }

    const obj = {
      titulo: values.titulo,
      url: values.url,
      categoriaId: categoriaEscolhida.id,
    };

    let method = VideosService.create;

    const paramId = props.match.params.id;

    if (paramId != null) {
      method = VideosService.update;
      obj.id = parseInt(paramId, 0);
    }

    method(obj)
      .then(() => {
        clearForm();
        history.push('/lista/video');
      })
      .catch(() => {
        alert('Houve um erro ao salvar os dados.');
      });
  }

  const buttons = [
    {
      link: '/lista/video',
      label: 'Vídeos',
    },
    {
      link: '/cadastro/categoria',
      label: 'Cadastrar Categoria',
    },
  ];

  return (
    <>
      <PageDefault buttons={buttons}>
        <div>

          <h1>Cadastro de vídeo</h1>

          <form onSubmit={cadastrarVideo}>
            <FormField type="text" label="Título" value={values.titulo} name="titulo" onChange={onChange} />
            <FormField type="text" label="URL" value={values.url} name="url" onChange={onChange} />
            <FormField type="text" label="Categoria" value={values.categoriaId} name="categoriaId" onChange={onChange} options={categorias.map(({ titulo }) => titulo)} />

            <input disabled={!(values.titulo && values.url && values.categoriaId)} type="submit" value="Enviar" />

          </form>

          <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
        </div>
      </PageDefault>
    </>
  );
}

CadastroVideo.defaultProps = {
  match: undefined,
};

CadastroVideo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default CadastroVideo;
