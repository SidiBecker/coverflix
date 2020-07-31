import React from 'react';
import PropTypes from 'prop-types';

function ButtonLink({ className, href, children }) {
  return (
    <a className={className} href={href || '/'}>{children}</a>
  );
}

ButtonLink.propTypes = {
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ButtonLink;
