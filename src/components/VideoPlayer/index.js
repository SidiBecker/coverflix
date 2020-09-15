import React from 'react';
import PropTypes from 'prop-types';
import Util from '../../util/util';
import { Container, CloseButton, ContainerIframe } from './styles';
import { MdClose } from "react-icons/md";

function VideoPlayer({ categoriaId, currentVideo, onVideoClose }) {

  const resolution = () => {

    let height = window.innerHeight;
    let width = window.innerWidth;

    if (width < height) {
      return { height: Util.getRelativeHeight(width * 0.9), width: width * 0.9 }
    }

    return { height: height * 0.6, width: Util.getRelativeWidth(height * 0.6) }
  };

  return (
    <div key={`showvideo_${categoriaId}`}>
      {
        (currentVideo.categoriaId == categoriaId && currentVideo.open) ? (
          <Container>
            <CloseButton>
              <button title="Fechar" onClick={() => { onVideoClose(); }}> <MdClose /></button>
            </CloseButton>
            <ContainerIframe>
              <iframe width={resolution().width} height={resolution().height} src={`https://www.youtube.com/embed/${Util.getYouTubeId(currentVideo.url)}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
