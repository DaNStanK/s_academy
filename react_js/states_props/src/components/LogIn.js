import { useState, useEffect } from "react";

export const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      console.log('password and username was changed');
    }, [password, username]);

    return (
      <div>
        <br />
        <label htmlFor="">Username</label>
        <input 
          type="text" 
          placeholder="Enter Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <br />
        <label htmlFor="">Password</label>
        <input 
          type="text" 
          placeholder="Enter Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <br />
        <button
          onClick={() => {
            setUsername('usernameStavre');
            setPassword('passwordStavridis');
          }}
        >Change Both and rerender only once</button>
      </div>
    )
}