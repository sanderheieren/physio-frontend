import React from 'react';

import classes from './Video.module.css';

const Video = ({ url }) => {
  let videoUrl = url;
  if (url?.match('https://youtu.be/')) {
    videoUrl = url.replace(
      'https://youtu.be/',
      'https://www.youtube.com/embed/'
    );
  }

  return (
    <div className={classes.videoContainer}>
      {videoUrl && (
        <iframe
          src={videoUrl}
          title={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Video;
