import React, { useState, Fragment, useEffect } from 'react'
import AddUserForm from './components/AddUserForm'
import ModifyUserForm from './components/ModifyUserForm'
import UserTable from './components/UserTable'
import ButtonDecrement from './components/ButtonDecrement'
import ButtonIncrement from './components/ButtonIncrement'

const App = () => {
	// Data


	const initialFormState = { id: null, firstname: '', lastname: '', email: '', username: '' }

	// Setting state
	const [users, setUsers] = useState([])
	const [currentUser, setCurrentUser] = useState(initialFormState)
	const [editing, setEditing] = useState(false)

	const [counter, setCounter] = useState(0);
	const incrementCounter = () => {
		setCounter(counter + 1);
		actualiza(counter + 1);
	}
	const decrementCounter = () => {
		setCounter(counter - 1);
		actualiza(counter - 1);
	}


	const actualiza = count => {
		if (count<0){
			setCounter(0);
			count=0;
		}
		var url = "/api/users/all?page=" + count;
		console.log(url);
		fetch(url)
			.then(res => res.json())
			.then(
				(data) => {
					if (data.length===0){
						setCounter(0);
					}
					setUsers(data);
				},
				(error) => {
					console.log("error al cargar");
					alert("Error al cargar");
				}
			)
	}

	useEffect(() => {
		console.log("user efecct");
		actualiza(counter);
		// eslint-disable-next-line
	}, []);

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

		setCurrentUser({ id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, username: user.username })
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

					<ButtonDecrement onClickFunc={decrementCounter} />
					<ButtonIncrement onClickFunc={incrementCounter} />

					Pagina: <b>{counter+1}</b>

			</div>
		</div>
		</div >
	)
}

export default App