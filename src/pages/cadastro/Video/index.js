import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import VideosService from '../../../services/videos';
import CategoriasService from '../../../services/categorias';
import util from '../../../util/util';
import Button from '../../../components/Button';
import { PanelActionButtons, LabelUnderline } from './styles';

function CadastroVideo(props) {
  const { addToast } = useToasts();
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [valid, setValid] = useState(false);
  const [newRecord, setNewRecord] = useState(false);

  const initValues = {
    titulo: '',
    url: '',
    categoriaId: '',
    id: null,
  };
const {
    onChange, values, clearForm, setValues,
  } = useForm(initValues);

  useEffect(() => {
    const paramId = props.match.params.id;

    setNewRecord(!(paramId));

    if (!newRecord && paramId) {
      VideosService.getFromId(paramId).then((video) => {
        setValues({
          titulo: video.titulo,
          url: video.url,
          categoriaId: video.categoria.titulo,
          id: video.id,
        });
      });
    } else {
      clearForm();
    }

    CategoriasService.getAll().then((data) => {
      setCategorias(data);
    }).catch(() => {
      util.toast(addToast, 'Houve um erro ao adquirir os dados!', 'error');
    });
  }, []);

  useEffect(() => {
    setValid(values.titulo && values.url && values.categoriaId);
  }, [values.titulo && values.url && values.categoriaId]);

  function cadastrarVideo(e) {
    e.preventDefault();

    if (valid) {
      // eslint-disable-next-line max-len
      const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoriaId);

      if (!(values.titulo && values.url && values.categoriaId)) {
        util.toast(addToast, 'Informe todos os campos!', 'warning');
        return;
      }

      if (!categoriaEscolhida) {
        util.toast(addToast, 'Categoria não encontrada.', 'warning');
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
          util.toast(addToast, 'Vídeo salvo com sucesso!', 'success');
          history.push('/lista/video');
        })
        .catch(() => {
          util.toast(addToast, 'Houve um erro ao salvar os dados!', 'error');
        });
    }
  }

  function deleteVideo(id) {
    VideosService.remove(id).then(() => {
      history.goBack();

      util.toast(addToast, 'Vídeo excluído com sucesso!', 'success');
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

          <h1>Cadastro de Vídeo</h1>

          <form>
            <FormField type="text" label="Título" value={values.titulo} name="titulo" onChange={onChange} />
            <FormField type="text" label="URL" value={values.url} name="url" onChange={onChange} />
            <FormField type="text" label="Categoria" value={values.categoriaId} name="categoriaId" onChange={onChange} options={categorias.map(({ titulo }) => titulo)} />

            <PanelActionButtons className="actions-buttons">

              <Button className="primary" onClick={cadastrarVideo} disabled={!(valid)}>Enviar</Button>

              <div>
                <LabelUnderline style={{marginRight: 10}} onClick={() => history.goBack()}>Cancelar</LabelUnderline>
                {
                  !newRecord ? <Button className="delete" onClick={() => { if (window.confirm('Deseja mesmo excluir o vídeo?')) deleteVideo(values.id); }}>Excluir</Button> : null
                }
              </div>

            </PanelActionButtons>

          </form>
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
