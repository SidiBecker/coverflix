import React from 'react';
import Menu from './components/Menu'
import dadosIniciais from './data/dados_iniciais.json';
import BannerMain from './components/BannerMain';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Menu />

      <BannerMain
        videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
        url={dadosIniciais.categorias[0].videos[0].url}
        videoDescription={"Fingerstyle é uma técnica de tocar violão/guitarra/baixo, em que se toca apenas com os dedos, sem o uso da palheta. Ele é tocado predominantemente em guitarra acústica com cordas em aço e é caracterizado esteticamente por uma orientação em torno dos blues. Porém, nota-se influências de outras fontes como o jazz, ragtime, country, clássica, celta e pop."}
      />

      <Carousel
        ignoreFirstVideo
        category={dadosIniciais.categorias[0]}
      />

      <Carousel
        category={dadosIniciais.categorias[1]}
      />

      <Carousel
        category={dadosIniciais.categorias[2]}
      />

      <Footer />

    </div>
  );
}

export default App;
