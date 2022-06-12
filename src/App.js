import React, { useState, Fragment } from 'react'
import AddUserForm from './components/AddUserForm'
import ModifyUserForm from './components/ModifyUserForm'
import UserTable from './components/UserTable'

const App = () => {
	// Data
	const usersData = [
		{ id: 1, firstname: 'Tania', lastname: 'floppydiskette', email: 'floppydiskette', username: 'floppydiskette' },
		{ id: 2, firstname: 'Craig', lastname: 'siliconeidolon', email: 'floppydiskette', username: 'floppydiskette' },
		{ id: 3, firstname: 'Ben', lastname: 'benisphere', email: 'floppydiskette', username: 'floppydiskette' },
	]

	const initialFormState = { id: null, firstname: '', lastname: '', email: '', username: '' }

	// Setting state
	const [users, setUsers] = useState(usersData)
	const [currentUser, setCurrentUser] = useState(initialFormState)
	const [editing, setEditing] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([...users, user])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, firstname: user.firstname, lastname: user.lastname,email:user.email, username:user.username })
	}

	return (
		<div className="container">
			<h1>CRUD Users</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit </h2>
							<ModifyUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add </h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App