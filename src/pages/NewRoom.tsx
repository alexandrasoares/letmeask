import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

// Componentes

import { Button } from '../components/Button';

import '../styles/auth.scss'

export function NewRoom() {
    const { user } = useAuth()
    const [newRom, setNewRom] = useState('');
    const history = useHistory();
 
    // Cria a sala quando o submit é clicado
    async function handleCreateRoom(event: FormEvent) {
        // Previnir o comportamento padrão do HTML de clicar em um botão submit e fazer um redirecionamento do forms.
        event.preventDefault();
        
        if (newRom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>
                    Crie salas de Q&amp;A ao-vivo
                </strong>
                <p>
                    Tire as dúvidas da sua audiência em tempo-real
                </p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
          
                    <h2>
                          Criar uma nova sala  
                    </h2>

                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRom(event.target.value)}
                            value={newRom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>

                    <p>
                        Já tem uma sala? <Link to="/"> Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}