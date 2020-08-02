/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import CategoriasService from '../../services/categorias';
import LoadingScreen from '../../components/LoadingScreen';

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

  return (
    <div className="App">
      <Menu />

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

      <Footer />

    </div>
  );
}

export default Home;
