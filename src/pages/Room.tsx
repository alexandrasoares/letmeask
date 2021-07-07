// IMPORTS REACT
import { FormEvent, useState, useEffect } from 'react';

// IMPORTS COMPONENTS
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

// IMPORTS HOOKS
import { useAuth } from '../hooks/useAuth';

// IMPORTS SERVICES
import { database } from '../services/firebase';


// IMPORTS IMG
import logoImg from '../assets/images/logo.svg'

// STYLE
import { useParams } from 'react-router-dom';

import '../styles/pages-style/room.scss'

type FireBaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    }

    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}>

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string
    }

    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');


    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        // usar o on provisoriamente
        // utilizar no firebase Child Added, Child Changed e Child Removed
        roomRef.on('value', room => {
            const databaseRoom = room.val();

            const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};
            const  parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })
    }, [roomId]);

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
                    <h1>Sala {title}</h1>

                    {/* Exibe a quantidade de perguntas somente caso tenha perguntas */}
                    { questions.length > 0 &&  <span> {questions.length} perguntas </span>}
                   
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