import React from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';

function CadastroVideo() {
  return (
    <>
      <PageDefault>
        <div>

          <h1>Cadastro de vídeo</h1>

          <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
        </div>
      </PageDefault>
    </>
  );
}

export default CadastroVideo;
