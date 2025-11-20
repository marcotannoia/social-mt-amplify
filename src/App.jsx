import { Authenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ padding: 20 }}>
          <h1>Ciao {user?.username}</h1>
          <button onClick={signOut}>Logout</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
