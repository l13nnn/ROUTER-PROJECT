import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  async function getUser() {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json();
    setUser(data);
    setEditedUser(data);
  }

  async function saveUser() {
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    });
    setUser(editedUser);
    navigate(`/`);
    setIsEditing(false);
  }
  
  const handleCancel = () => {
    navigate(`/`);
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <>
      {user && (
        <>
            <>
            <div className='edit-container'>
              <h2>Edit User</h2>
              <br></br>
              <label>
                Name
                <br></br>
                <br></br>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                <br></br>
                <br></br>
                Email
                <br></br>
                <br></br>
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <br></br>
              <label>
                Role
                <br></br>
                <br></br>
                <input
                  type="text"
                  name="role"
                  value={editedUser.role}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <br></br>
              <button className='save-button' onClick={saveUser}>Save</button>
              <button className='back-button' onClick={handleCancel}>Back</button>
            </div>
            </>
        </>
      )}
    </>
  );
}

export default DetailUser;