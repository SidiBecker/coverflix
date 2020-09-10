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
        .
      </p>
    </FooterBase>
  );
}

export default Footer;
