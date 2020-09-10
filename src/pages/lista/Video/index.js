/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import PageDefault from '../../../components/PageDefault';
import VideoService from '../../../services/videos';
import YoutubeService from '../../../services/youtube';
import ActionButton from '../../../components/ActionButton';
import editImg from '../../../assets/img/edit.png';
import deleteImg from '../../../assets/img/delete.png';
import Util from '../../../util/util';
import { Table } from '../../../components/Table'

function ListaVideo() {
  const { addToast } = useToasts();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    VideoService.getAllWithCategoria().then((data) => {
      let dados = data;
      dados = dados.filter((x) => x.titulo != null);

      setVideos(Util.sort(dados));
    });
  }, []);

  function deleteVideo(id) {
    VideoService.remove(id).then(() => {
      setVideos(videos.filter((x) => x.id !== id));

      Util.toast(addToast, 'Vídeo excluído com sucesso!', 'success');
    });
  }
  const buttons = [
    {
      link: '/lista/categoria',
      label: 'Categorias',
    },
    {
      link: '/cadastro/video',
      label: 'Novo Vídeo',
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
              <th>Categoria</th>
              <th>Vídeo</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {videos.filter((x) => x.titulo != null).map((element, index) => (
              <tr key={String(`video_${index}`)}>
                <th>{element.id}</th>
                <th>{element.titulo}</th>
                <th>
                  {element.categoria.titulo}
                </th>
                <th>
                  <a href={element.url} target="_blank">
                    <img height={70} src={YoutubeService.getImgFromUrl(element.url)} alt="video" />
                  </a>
                </th>
                <th>
                  {/* TODO: Componente botao ação */}
                  <ActionButton title="Editar" className="action-button" type="button">
                    <Link to={`/cadastro/video/${element.id}`}>
                      {' '}
                      <img src={editImg} height={40} alt="Editar Vídeo" />
                    </Link>
                  </ActionButton>
                </th>
                <th>
                  <ActionButton onClick={() => { if (window.confirm('Deseja mesmo excluir o vídeo?')) deleteVideo(element.id); }} title="Excluir" className="action-button" type="button">
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

export default ListaVideo;
