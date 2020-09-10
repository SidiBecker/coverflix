import React from 'react';
import PropTypes from 'prop-types';
import Util from '../../util/util';
import { Container, CloseButton, ContainerIframe } from './styles';

function VideoPlayer({ categoriaId, currentVideo, onVideoClose }) {

  return (
    <div key={`showvideo_${categoriaId}`}>
      {
        (currentVideo.categoriaId == categoriaId && currentVideo.open) ? (
          <Container>
            <CloseButton>
              <button title="Fechar" onClick={() => { onVideoClose(); }}>X</button>
            </CloseButton>
            <ContainerIframe>
              <iframe width={window.innerWidth / 2} height={window.innerHeight / 2} src={`https://www.youtube.com/embed/${Util.getYouTubeId(currentVideo.url)}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </ContainerIframe>

          </Container>
        ) : null
      }
    </div>
  )
}

VideoPlayer.defaultProps = {
  currentVideo: PropTypes.shape({
    categoriaId: null,
    url: ''
  }),
}

VideoPlayer.propTypes = {
  categoriaId: PropTypes.number.isRequired,
  currentVideo: PropTypes.shape({
    categoriaId: PropTypes.number,
    open: PropTypes.bool.isRequired,
    url: PropTypes.string,
  }),
  onVideoClose: PropTypes.func.isRequired
};

export default VideoPlayer
