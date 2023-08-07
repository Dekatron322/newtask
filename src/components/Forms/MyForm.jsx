import React, { useState, useEffect } from 'react';
import "./myform.css"
import {RiDeleteBin5Line, RiEdit2Line} from 'react-icons/ri'

const MyForm = () => {
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedUsernames = localStorage.getItem('usernames');
    if (savedUsernames) {
      setUsernames(JSON.parse(savedUsernames));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('usernames', JSON.stringify(usernames));
  }, [usernames]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    if (username) {
      const newUsername = { id: Date.now(), name: username };
      setUsernames([...usernames, newUsername]);
      setUsername('');
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleUpdate = (id, newName) => {
    const updatedUsernames = usernames.map((user) =>
      user.id === id ? { ...user, name: newName } : user
    );
    setUsernames(updatedUsernames);
    setEditId(null);
  };

  const handleDelete = (id) => {
    const updatedUsernames = usernames.filter((user) => user.id !== id);
    setUsernames(updatedUsernames);
    setEditId(null);
  };

  return (
    <div className="container signup_wrapper">
      <div className="signup__content">
        <div className="signup__body">
          <label htmlFor="username">Username</label>
          <input
            className="input"
            placeholder="Enter your name"
            value={username}
            onChange={handleInputChange}
          />
          <button className="button" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {usernames.length > 0 && (
        <div className="user-list">
          <h2>User List</h2>
          <ul>
            <div className='list__of-user'>
            {usernames.map((user) => (
              <li key={user.id}>
                {editId === user.id ? (
                  <div>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => handleUpdate(user.id, e.target.value)}
                    />
                    <button onClick={() => handleUpdate(user.id, user.name)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    {user.name}
                    <div className='list__buttons'>
                    <div className="edit-button" onClick={() => handleEdit(user.id)}>
                      <RiEdit2Line />
                    </div>
                    <div className="delete-button" onClick={() => handleDelete(user.id)}>
                      <RiDeleteBin5Line />
                    </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyForm;