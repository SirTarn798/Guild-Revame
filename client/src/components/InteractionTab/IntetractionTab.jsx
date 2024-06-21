import "./InteractionTab.css";

function InteractionTab() {
  return (
    <div className="interactionTabContainer">
      <div className="interaction likeInteraction">
        <img src="/like.png" />
        <p>Like</p>
      </div>
      <div className="interaction commentInteraction">
        <img src="/comment.png" />
        <p>comment</p>
      </div>
      <div className="interaction shareInteraction">
        <img src="/share.png" />
        <p>share</p>
      </div>
    </div>
  );
}

export default InteractionTab;
