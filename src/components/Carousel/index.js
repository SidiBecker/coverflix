import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VideoCardGroupContainer, Title, ExtraLink } from './styles';
import VideoCard from './components/VideoCard';
import Slider, { SliderItem } from './components/Slider';
import Util from '../../util/util';

function Carousel({
  ignoreFirstVideo,
  category,
  onVideoClick
}) {
  const categoryTitle = category.titulo;
  const categoryColor = category.cor;
  const categoryExtraLink = category.link_extra;
  const { videos } = category;

  return (
    <VideoCardGroupContainer>
      {categoryTitle && (
        <>
          <Title style={{ backgroundColor: categoryColor || 'red' }}>
            {categoryTitle}
          </Title>
          {categoryExtraLink
            && (
              <ExtraLink href={categoryExtraLink.url} target="_blank">
                {categoryExtraLink.text}
              </ExtraLink>
            )}
        </>
      )}
      <Slider>
        {videos.map((video, index) => {
          if (ignoreFirstVideo && index === 0) {
            return null;
          }

          return (
            <SliderItem key={video.titulo}>
              <VideoCard
                videoTitle={video.titulo}
                videoURL={video.url}
                categoryColor={categoryColor}
                onClick={() => { onVideoClick(video.url, video.categoriaId) }}
              />
            </SliderItem>
          );
        })}
      </Slider>

    </VideoCardGroupContainer>
  );
}

Carousel.defaultProps = {
  ignoreFirstVideo: undefined,
};

Carousel.propTypes = {
  ignoreFirstVideo: PropTypes.bool,
  category: PropTypes.shape({
    titulo: PropTypes.string,
    cor: PropTypes.string,
    link_extra: PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    videos: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onVideoClick: PropTypes.func.isRequired
};

export default Carousel;
