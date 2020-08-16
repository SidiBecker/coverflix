import React from 'react';
import PropTypes from 'prop-types';
import VideoIframeResponsive from './components/VideoIframeResponsive';
import { BannerMainContainer, ContentAreaContainer, WatchButton } from './styles';
import YoutubeService from '../../services/youtube';

export default function BannerMain({
  videoTitle,
  videoDescription,
  url,
}) {
  const youTubeID = YoutubeService.getYouTubeId(url);

  return (
    <BannerMainContainer backgroundImage={YoutubeService.getImgFromYoutubeId(youTubeID)}>
      <ContentAreaContainer>
        <ContentAreaContainer.Item>
          <ContentAreaContainer.Title>
            {videoTitle}
          </ContentAreaContainer.Title>

          <ContentAreaContainer.Description>
            {videoDescription}
          </ContentAreaContainer.Description>
        </ContentAreaContainer.Item>

        <ContentAreaContainer.Item>
          <VideoIframeResponsive
            youtubeID={youTubeID}
          />
          <WatchButton as="a" href={url}>
            Assistir
          </WatchButton>
        </ContentAreaContainer.Item>
      </ContentAreaContainer>
    </BannerMainContainer>
  );
}

BannerMain.propTypes = {
  videoTitle: PropTypes.string.isRequired,
  videoDescription: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
