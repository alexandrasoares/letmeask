// IMPORTS REACT
import { FormEvent, useState } from 'react';

// IMPORTS COMPONENTS
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

// IMPORTS HOOKS
import { useAuth } from '../hooks/useAuth';

// IMPORTS IMG
import logoImg from '../assets/images/logo.svg'

// STYLE
import { useParams } from 'react-router-dom';

import '../styles/pages-style/room.scss'
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === '') {
            return;
        }

        // react hot toast
        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false, // destaque do admin para determinar que essa pergunta esta sendo respondida atualmente.
            isAnswared: false // se ja foi respondida ou nao
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion(''); // substitui o valor de newquestion para vazio e limpa o textarea após o usuario enviar a pergunta
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={roomId}/>        
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span> 4 Perguntas </span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />   
                    <div className="form-footer">
                        { user ? 
                            ( 
                                <div className="user-info">
                                    <img src={user.avatar} alt={user.name} />
                                    <span> {user.name} </span>
                                </div> 
                            ) 
                            : 
                            (<span> Para enviar uma pergunta <button> Faça seu login </button>.</span>) }
                        
                        <Button type="submit" disabled={!user}> Enviar pergunta</Button>
                    </div>
                </form>                
            </main>
        </div>
    );
}