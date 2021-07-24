import { useState } from "react";
import copyImg from "../../assets/images/copy.svg";
import "./roomCodeStyles.scss";

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const [messageClipBoard, setMessageClipBoard] = useState(false);


  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code)
    setMessageClipBoard(true);

        setTimeout(() =>{
    setMessageClipBoard(false);
        },1500)
  }

  return (
    <>
      <button className="room-code" onClick={copyRoomCodeToClipBoard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      {messageClipBoard === true && <button className="room-code-copied"><span>Copiado ✨</span></button>}
    </>
  )
}