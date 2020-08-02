import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import CategoriasService from '../../services/categorias';

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
        <div style={{ color: '#FFF' }}>Loading...</div>
      )}

      {dadosIniciais.length > 0 && (
        <>
          <BannerMain
            videoTitle={dadosIniciais[0].videos[0].titulo}
            url={dadosIniciais[0].videos[0].url}
            videoDescription="Fingerstyle é uma técnica de tocar violão/guitarra/baixo, em que se toca apenas com os dedos, sem o uso da palheta. Ele é tocado predominantemente em guitarra acústica com cordas em aço e é caracterizado esteticamente por uma orientação em torno dos blues. Porém, nota-se influências de outras fontes como o jazz, ragtime, country, clássica, celta e pop."
          />

          {dadosIniciais.map((categoria, index) => (
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
