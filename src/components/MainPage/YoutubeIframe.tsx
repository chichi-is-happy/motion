import React, { useEffect, useState } from "react";

interface YouTubeIframeProps {
  url: string;
}

const YouTubeIframe = (props: YouTubeIframeProps) => {
  const { url } = props;
  const [videoId, setVideoId] = useState<string>();

  useEffect(() => {
    const id = getVideoIdFromUrl(url);
    setVideoId(id);
  }, [url]);

  if (!videoId) {
    return null;
  }

  const src = `https://www.youtube.com/embed/${videoId}`;

  function getVideoIdFromUrl(videoUrl: string): string | undefined {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#\\&\\?]*).*/;
    const match = videoUrl.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
    return undefined;
  }

  return (
    <div className="mr-5">
      <iframe
        width="560"
        height="315"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeIframe;
