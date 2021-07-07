import copyImg from '../assets/images/copy.svg';
import '../styles/componentes-style/room-code.scss';


export function RoomCode() {
    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala teste</span>
        </button>
    )
}