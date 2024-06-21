import "./FullReview.css";
import InteractionTab from "../../InteractionTab/IntetractionTab";

function FullReview() {
  return (
    <div className="fullReviewContainer">
      <div className="userInfo">
        <img src="user.png" />
        <p>Username</p>
      </div>
      <p className="gameTitle">Game title</p>
      <div className="reviewContent">
        <p>
          Easily the best game I've played in many years, and it deserves a
          longer review than most of you have patience for. I highly recommend
          it, and here's why: Like many who play this game, this was my first
          "Soulsborne/Soulslike" game, as it is the most refined and
          user-friendly version of FromSoftware's game design ethos. I avoided
          the Dark Souls series for many years. I had a presumptuous view of
          FromSoftware and their visual aesthetic that made me feel this game
          was just sad edgelord material. I was so wrong. Like all FromSoftware
          games, Elden Ring revels in struggle. Only the most basic combat
          mechanics are explained to the player; the rest is trial and error. It
          challenges you to tease out its mysteries, not just of the world and
          lore, but of the combat mechanics and UI. The game asks you to
          STRUGGLE (you need to be open to that to fully enjoy it), and oh boy,
          did I struggle... I struggled to simply navigate the user interface,
          to find the extra info on weapon damage and scaling, armor ratings and
          status defenses, even item descriptions full of implicit lore that
          give the player a small understanding of what's happening in the Lands
          Between. I struggled to accept that not every field boss in the
          overworld was meant to be defeated when you first encounter them. I
          struggled to avoid traps and ambushes. 
        </p>
        <img className="reviewImage" src="/reviewImgExample.jpg" />
      </div>
      <InteractionTab/>
    </div>
  );
}

export default FullReview;
