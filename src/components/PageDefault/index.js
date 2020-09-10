import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Menu from '../Menu';

const Main = styled.main`
    background-color: var(--background);
    color: var(--white);
    flex: 1;
    padding-top: 50px;
    padding-right: 5%;
    padding-left: 5%;
    padding-bottom: 1px;
`;

function PageDefault({ children, buttons }) {
  return (
    <>
      <Menu buttons={buttons} />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
}

PageDefault.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PageDefault;
