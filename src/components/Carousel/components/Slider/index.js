/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  .slick-prev,
  .slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    transform: initial;
    &:before {
      font-size: 30px;
    }
  }
  
  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 16px;
  }
`;

export const SliderItem = styled.li`
  margin-right: 16px;
  img {
    margin: 16px;
    width: 298px;
    height: 197px;
    object-fit: cover;
  }
`;

function Slider({ children }) {
  return (
    <Container>
      <SlickSlider {...{
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: false,
              dots: true,
            },
          },
          {
            breakpoint: 1360,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: true,
            },
          },
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,

              dots: true,
            },
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              centerMode: true,
              centerPadding: '25px',
              dots: true,
            },
          },
        ],
      }}
      >
        {children}
      </SlickSlider>
    </Container>
  );
}

Slider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Slider;
