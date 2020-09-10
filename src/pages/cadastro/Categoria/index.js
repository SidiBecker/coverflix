import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import CategoriasService from '../../../services/categorias';
import Util from '../../../util/util';
import Button from '../../../components/Button';
import { PanelActionButtons, LabelUnderline } from '../../../components/PanelActionButtons';

function CadastroCategoria(props) {
  const { addToast } = useToasts();

  const history = useHistory();

  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000',
    id: null,
  };

  const {
    onChange, values, clearForm, setValues,
  } = useForm(valoresIniciais);

  const [valid, setValid] = useState(false);
  const [newRecord, setNewRecord] = useState(false);

  function cadastrarCategoria(e) {
    e.preventDefault();

    if (!(values.titulo && values.descricao)) {
      Util.toast(addToast, 'Informe todos os campos!', 'warning');
      return;
    }

    const obj = {
      titulo: values.titulo,
      descricao: values.descricao,
      cor: values.cor,
    };

    let method = CategoriasService.create;

    const paramId = props.match.params.id;

    if (paramId != null) {
      method = CategoriasService.update;
      obj.id = parseInt(paramId, 0);
    }

    method(obj)
      .then(() => {
        Util.toast(addToast, 'Categoria salva com sucesso!', 'success');
        history.push('/lista/categoria');
      })
      .catch(() => {
        Util.toast(addToast, 'Houve um erro ao salvar os dados.', 'error');
      });
  }

  function deletarCategoria(id) {
    CategoriasService.remove(id, () => {
      Util.toast(addToast, 'Categoria excluída com sucesso!', 'success');
      history.goBack();
    });
  }

  useEffect(() => {
    const paramId = props.match.params.id;

    setNewRecord(!(paramId));

    if (paramId != null) {
      CategoriasService.getFromId(paramId).then((categoria) => {
        debugger
        setValues({
          titulo: categoria.titulo,
          descricao: categoria.descricao || '',
          cor: categoria.cor,
          id: categoria.id,
        });
      });
    } else {
      clearForm();
    }
  }, []);

  useEffect(() => {
    setValid(values.titulo && values.descricao && values.cor);
  }, [values.titulo && values.descricao && values.cor]);

  const buttons = [
    {
      link: '/lista/video',
      label: 'Vídeos',
    },
    {
      link: '/lista/categoria',
      label: 'Categorias',
    },
  ];

  return (
    <>
      <PageDefault buttons={buttons}>
        <div>
          <h1>Cadastro de Categoria</h1>
          <form>

            <FormField type="text" label="Título" value={values.titulo} name="titulo" onChange={onChange} />

            <FormField tag="textarea" label="Descrição" value={values.descricao} name="descricao" onChange={onChange} />

            <FormField type="color" label="Cor" value={values.cor} name="cor" onChange={onChange} />

          </form>

          <PanelActionButtons className="actions-buttons">

            <Button className="primary" onClick={cadastrarCategoria} disabled={!(valid)}>Enviar</Button>

            <div>
              <LabelUnderline style={{ marginRight: 10 }} onClick={() => history.goBack()}>Cancelar</LabelUnderline>
              {
                !newRecord ? <Button className="delete" onClick={() => { if (window.confirm('Deseja mesmo excluir a categoria?')) deletarCategoria(values.id); }}>Excluir</Button> : null
              }
            </div>

          </PanelActionButtons>

        </div>
      </PageDefault>
    </>
  );
}

CadastroCategoria.defaultProps = {
  match: undefined,
};

CadastroCategoria.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default CadastroCategoria;
