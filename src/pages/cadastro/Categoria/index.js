import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import CategoriasService from '../../../services/categorias';
import Util from '../../../util/util';

function CadastroCategoria(props) {
  const { addToast } = useToasts();

  const history = useHistory();

  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000',
  };

  const {
    onChange, values, clearForm, setValues,
  } = useForm(valoresIniciais);

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

  useEffect(() => {
    const paramId = props.match.params.id;

    if (paramId != null) {
      CategoriasService.getFromId(paramId).then((categoria) => {
        setValues({
          titulo: categoria.titulo,
          descricao: categoria.descricao,
          cor: categoria.cor,
        });
      });
    } else {
      clearForm();
    }
  }, []);

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
          <form onSubmit={cadastrarCategoria}>

            <FormField type="text" label="Título" value={values.titulo} name="titulo" onChange={onChange} />

            <FormField tag="textarea" label="Descrição" value={values.descricao} name="descricao" onChange={onChange} />

            <FormField type="color" label="Cor" value={values.cor} name="cor" onChange={onChange} />

            <input disabled={!(values.titulo && values.descricao)} type="submit" value="Enviar" />

          </form>

          <Link to="/">Ir para o início</Link>
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
