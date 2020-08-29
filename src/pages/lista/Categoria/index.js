/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import PageDefault from '../../../components/PageDefault';
import CategoriaService from '../../../services/categorias';
import ActionButton from './styles';
import editImg from '../../../assets/img/edit.png';
import deleteImg from '../../../assets/img/delete.png';

const Table = styled.table`

width: 100%;

& tbody tr {
  background:gray;

  button {
    background:gray;
  }

  &:nth-child(2n) {
    background: var(--black);

      button {
        background:var(--black);
      }
  }
}
`;

function ListaCategoria() {
  const { addToast } = useToasts();

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Método executado após renderizar a tela
    CategoriaService.getAll().then((data) => {
      let dados = data;
      console.log(dados);
      dados = dados.filter((x) => x.titulo != null);

      // TODO: Utilitário
      dados = dados.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
      setCategorias(dados);
    });
  }, []);

  function deletarCategoria(id) {
    CategoriaService.remove(id).then(() => {
      setCategorias(categorias.filter((x) => x.id !== id));

      addToast('Categoria excluída com sucesso!', {
        appearance: 'success',
        autoDismiss: true,
      });
    });
  }
  const buttons = [
    {
      link: '/lista/video',
      label: 'Vídeos',
    },
    {
      link: '/cadastro/categoria',
      label: 'Nova Categoria',
    },
  ];

  return (
    <PageDefault buttons={buttons}>
      <div>

        <h1>Lista de Vídeos</h1>

        <Table>
          <thead>
            <tr>
              <th>Cógido</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Cor</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {categorias.filter((x) => x.titulo != null).map((element, index) => (
              <tr key={String(`video_${index}`)}>
                <th>{element.id}</th>
                <th>{element.titulo}</th>
                <th>
                  {element.descricao}
                </th>
                <th>
                  <input readOnly type="color" value={element.cor} />
                </th>
                <th>
                  {/* TODO: Componente botao ação */}
                  <ActionButton title="Editar" className="action-button" type="button">
                    <Link to={`/cadastro/categoria/${element.id}`}>
                      {' '}
                      <img src={editImg} height={40} alt="Editar Vídeo" />
                    </Link>
                  </ActionButton>
                </th>
                <th>
                  <ActionButton onClick={() => { if (window.confirm('Deseja mesmo excluir a categoria?')) deletarCategoria(element.id); }} title="Excluir" className="action-button" type="button">
                    <img src={deleteImg} height={40} alt="Excluir Vídeo" />
                  </ActionButton>
                </th>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
      {/* Tabela com os video cadastrados */}
    </PageDefault>
  );
}

export default ListaCategoria;
