import React, { useState, useEffect } from 'react'

const ModifyUserForm = props => {
  const [user, setUser] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [props]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>First Name</label>
      <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} data-testid={`edit-firstname`}/>
      
      <label>Last Name</label>
      <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
      <label>Email</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange} />
      <label>User Name</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button" data-testid={`edit-button`}>
      
        Cancel
      </button>
    </form>
  )
}

export default ModifyUserForm