import { getAuth } from "firebase/auth";

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="profile-page">
      <h2>👤 Thông tin cá nhân</h2>

      <div className="profile-card">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>UID:</strong> {user?.uid}</p>
      </div>
    </div>
  );
}

export default Profile;
