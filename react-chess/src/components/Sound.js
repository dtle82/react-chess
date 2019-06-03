import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(
    new Audio(
      "https://raw.githubusercontent.com/ornicar/lila/master/public/sound/standard/Move.mp3"
    )
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(
    () => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
