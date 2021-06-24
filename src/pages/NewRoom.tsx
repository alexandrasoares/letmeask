import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

// Componentes

import { Button } from '../components/Button';

import '../styles/auth.scss'

export function NewRoom() {

    async function handleCreateRoom() {

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