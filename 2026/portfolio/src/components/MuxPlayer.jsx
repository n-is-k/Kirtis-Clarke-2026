import MuxPlayer from "@mux/mux-player-react";

const CustomMuxPlayer = ({ playbackId, autoPlay = false, loop = false }) => {
  if (!playbackId) return null;

  return (
    <div className="mux-contain">
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        controls
        playsInline
      />
    </div>
  );
};

export default CustomMuxPlayer;
