/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import CategoriasService from '../../services/categorias';
import LoadingScreen from '../../components/LoadingScreen';
import PageDefault from '../../components/PageDefault';
import VideoPlayer from '../../components/VideoPlayer';
import { Helmet } from 'react-helmet';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    CategoriasService.getAllWithVideos()
      .then((categoriasVideos) => {
        setDadosIniciais(categoriasVideos);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const buttons = [
    {
      link: '/lista/video',
      label: 'Painel',
    },
  ];

  const video = {
    url: null,
    open: false,
    cagetoriaId: null
  }

  const [currentVideo, setCurrentVideo] = useState(video);

  function onVideoClick(url, categoria) {
    setCurrentVideo({
      url: url,
      categoriaId: categoria,
      open: true,
    })
  }

  return (

    <div className="App">

      <PageDefault buttons={buttons}>

        {dadosIniciais.length === 0 && (
          <LoadingScreen />
        )}

        {dadosIniciais.length > 0 && (
          <>
            <BannerMain
              videoTitle={dadosIniciais[0].videos[0].titulo}
              url={dadosIniciais[0].videos[0].url}
              videoDescription={dadosIniciais[0].descricao}
            />

            {dadosIniciais.filter((categoria) => Boolean(categoria.videos.length)).map((categoria, index) => (

              <div key={`categoria_${categoria.id}`}>
                <Carousel
                  key={categoria.id}
                  ignoreFirstVideo={index === 0}
                  category={categoria}
                  onVideoClick={onVideoClick}
                />

                <VideoPlayer categoriaId={categoria.id} currentVideo={currentVideo} onVideoClose={() => setCurrentVideo(video)} />

              </div>

            ))}
          </>
        )}

      </PageDefault>
    </div>

  );
}

export default Home;
