export default function Profile({ user, signOut }) {
  return (
    <div className="page">
      <h2>Il tuo profilo</h2>
      <p>Email: {user?.signInDetails?.loginId}</p>

      <button onClick={signOut}>Logout</button>
    </div>
  );
}
