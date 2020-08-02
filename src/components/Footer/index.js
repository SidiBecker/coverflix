import React from 'react';
import { Link } from 'react-router-dom';
import FooterBase from './styles';
import Logo from '../../assets/img/Logo.png';

function Footer() {
  return (
    <FooterBase>
      <Link to="/">
        <img height="30" src={Logo} alt="Logo" />
      </Link>
      <p>
        Orgulhosamente desenvolvido por
        {' '}
        <a href="https://github.com/SidiBecker/coverflix" rel="noreferrer" target="_blank">
          Sidi Becker
        </a>
        {' '}
        durante a
        {' '}
        <a href="https://www.alura.com.br/">
          Imersão React da Alura
        </a>
        .
      </p>
    </FooterBase>
  );
}

export default Footer;
