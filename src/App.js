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
		if (count < 0) {
			setCounter(0);
			count = 0;
		}
		var url = "/api/users/all?page=" + count;
		console.log(url);
		fetch(url)
			.then(res => res.json())
			.then(
				(data) => {
					if (data.length === 0) {
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
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		};

		fetch('/api/users', requestOptions)
			.then(response => response.json())
			.then((data) => {
				user = data;
				setUsers([...users, user])
			}, (error) => {
				alert("Erorr al insertar");
			});


	}

	const deleteUser = id => {
		setEditing(false)
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({'id':id})
		};
		
		fetch('/api/users', requestOptions)
		.then(response => response.json())
		.then((data) => {
			
			setUsers(users.filter(user => user.id !== id))
		}, (error) => {
			alert("Erorr al insertar "+error);
		});

		setUsers(users.filter(user => user.id !== id))

	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedUser)
		};
		fetch('/api/users', requestOptions)
			.then(response => response.json())
			.then((data) => {
				updatedUser = data;
				setUsers(users.map(user => (user.id === id ? updatedUser : user)))
			}, (error) => {
				alert("Erorr  "+error);
			});

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
					<ButtonDecrement onClickFunc={decrementCounter} />
					<ButtonIncrement onClickFunc={incrementCounter} />
					<br />
					Pagina: <b>{counter + 1}</b>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />





				</div>
			</div>
		</div >
	)
}

export default App