import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import VideoService from '../../../services/videos';
import YoutubeService from '../../../services/youtube';
import ActionButton from './styles';
import editImg from '../../../assets/img/edit.png';
import deleteImg from '../../../assets/img/delete.png';

function ListaVideo() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Método executado após renderizar a tela
    VideoService.getAll().then((data) => {
      let dados = data;
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
      setVideos(dados);
    });
  }, []);

  return (
    <PageDefault>
      <div>
        <h1>Lista de Vídeos</h1>

        {/* {videos.length === 0 && (
            <div>
              Carregando...
            </div>
            )} */}

        <table>
          <thead>
            <tr>
              <th>Cógido</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Miniatura</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>

            {videos.filter((x) => x.titulo != null).map((element, index) => (
              <tr key={String(`video_${index}`)}>
                <th>{element.id}</th>
                <th>{element.titulo}</th>
                <th>{element.categoriaId}</th>
                <th>
                  <img height={70} src={YoutubeService.getImgFromUrl(element.url)} alt="video" />
                </th>
                <th>
                  {/* TODO: Componente botao ação */}
                  <ActionButton className="action-button" type="button">
                    <img src={editImg} height={40} alt="" />
                  </ActionButton>
                </th>
                <th>
                  <ActionButton className="action-button" type="button">
                    <img src={deleteImg} height={40} alt="" />
                  </ActionButton>
                </th>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      {/* Tabela com os video cadastrados */}
    </PageDefault>
  );
}

export default ListaVideo;
