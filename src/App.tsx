import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let faceio: any;
  const [user, setUser] = useState<any>(null);
  const [usrName, setUsrName] = useState('');
  useEffect(() => {
    // @ts-ignore
    // eslint-disable-next-line
    faceio = new faceIO('fioabae1');
  }, []);
  const handleSignIn = async () => {
    const userName = prompt('Your name?');
    if (!userName) {
      alert('enter a valid name');
      return;
    }
    setUsrName(userName);
    faceio.enroll({
      locale: 'auto',
      payload: {
        name: userName,
      },
    }).then((res: any) => {
      setUser(res);
    }).catch(() => {
      alert('Registry error');
      window.location.reload();
    });
  };
  const handleLogIn = async () => {
    faceio.authenticate({
      locale: 'auto',
    }).then((res: any) => {
      setUser(res);
      setUsrName(res?.payload?.name);
    }).catch(() => {
      alert('Login failed');
      window.location.reload();
    });
  };

  return (
    <div className="App">
      <section>
        <h1>Face Authentication by FaceIO</h1>
        {user ? (
          <div>
            <h3>
              id:
              {user?.facialId}
            </h3>
            <h3>
              username:
              {usrName}
            </h3>
          </div>
        ) : (
          <div>
            <h2>Вы не авторизованы</h2>
            <button className="Button" type="button" onClick={handleSignIn}>Sign-in</button>
            <button className="Button" type="button" onClick={handleLogIn}>Log-in</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
