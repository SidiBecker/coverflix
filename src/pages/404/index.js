
import React from 'react';
import PageDefault from '../../components/PageDefault';
import { Link } from 'react-router-dom';
import NotFound from '../../assets/img/NotFound.png'
import styled from 'styled-components';

const Image = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10vh;
`;


function Pagina404() {
    const NAO_ENCONTRADA = "Página não encontrada.";
    return (
        <>
            <PageDefault>
                <Image>
                    <h1>Erro 404</h1>
                    <img alt={NAO_ENCONTRADA} title={NAO_ENCONTRADA} style={{ width: '100%', maxWidth: '600px' }} src={NotFound} />

                </Image>
                <Link to="/">Ir para o início</Link>
            </PageDefault>
        </>
    )
}

export default Pagina404;