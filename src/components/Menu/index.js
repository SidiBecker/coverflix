import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../Button';

function Menu({ buttons }) {
  return (
    <nav className="Menu">
      <div>

        <Link to="/">
          <img className="Logo" src={Logo} alt="Logo da CoverFlix" />
        </Link>
      </div>

      <div>

        {
          buttons.map((button, index) => (
            <Button key={String(`button_${index}`)} as={Link} className="ButtonLink" to={button.link}>{button.label}</Button>
          ))
        }

      </div>

    </nav>
  );
}

Menu.defaultProps = {
  buttons: [],
};

Menu.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape()),
};

export default Menu;
