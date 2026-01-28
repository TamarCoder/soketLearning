import React from 'react';
import styles from './App.module.css';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const App: React.FC = () => {


    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            console.log('connected to server');
            console.log('socket id:', socket.id);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

        return (
      <div className="App">
          <ul id="messages" className={styles.lists}></ul>
          <form id="form" action="form" className={styles.form }>
              <input id="input" autoComplete="off" className={styles.input} placeholder='Entr you message here'/>
              <button className={styles.button}>Send</button>
          </form>
      </div>
  );
}

export default App;
