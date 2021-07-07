import copyImg from '../assets/images/copy.svg';
import '../styles/componentes-style/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copuRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button className="room-code" onClick={copuRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code} </span>
        </button>
    )
}