import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: null, name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.firstname || !user.lastname || !user.email || !user.username) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>First Name</label>
			<input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
			<label>Last Name</label>
			<input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
			<label>Email</label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} />
			<label>User Name</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm