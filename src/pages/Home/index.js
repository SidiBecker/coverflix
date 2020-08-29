/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import CategoriasService from '../../services/categorias';
import LoadingScreen from '../../components/LoadingScreen';
import PageDefault from '../../components/PageDefault';

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
              <Carousel
                key={categoria.id}
                ignoreFirstVideo={index === 0}
                category={categoria}
              />
            ))}
          </>
        )}

      </PageDefault>

    </div>
  );
}

export default Home;
