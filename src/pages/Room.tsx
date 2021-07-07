// IMPORTS COMPONENTS
import { Button } from '../components/Button';

// IMPORTS IMG
import logoImg from '../assets/images/logo.svg'

// STYLE
import { useParams } from 'react-router-dom';

import '../styles/pages-style/room.scss'
import { RoomCode } from '../components/RoomCode';

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={params.id}/>        
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span> 4 Perguntas </span>
                </div>

                <form>
                    <textarea placeholder="O que você quer perguntar?"/>   
                    <div className="form-footer">
                        <span> Para enviar uma pergunta <button> Faça seu login </button>.</span>
                        <Button type="submit"> Enviar pergunta</Button>
                    </div>
                </form>                
            </main>
        </div>
    );
}