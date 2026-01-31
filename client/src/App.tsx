import React, {FormEvent, useState, useEffect, useRef} from 'react';
import styles from './App.module.css';
import { io, Socket } from 'socket.io-client';

const App: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('connected to server');
            console.log('socket id:', newSocket.id);
        });

        newSocket.on('chat message', (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [messages]);



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (message.trim() && socket) {
            console.log('Sending message:', message);

            setMessages((prev) => [...prev, message]);

            socket.emit('chat message', message);

            setMessage('');
        }
    };

    return (
        <div className="App">
            <ul id="messages" className={styles.lists}>
                {messages.map((msg, index) => (
                    <li key={index} className={styles.listItem}>
                        <span className={styles.message}>
                            {msg}
                        </span>
                    </li>
                ))}

                <div ref={messagesEndRef}/>
            </ul>

            <form
                id="form"
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <input
                    id="input"
                    type="text"
                    autoComplete="off"
                    className={styles.input}
                    placeholder='Enter your message here'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className={styles.button}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default App;