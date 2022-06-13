import { render, screen } from "@testing-library/react";
import UserTable from "./UserTable";
import ModifyUserForm from "./ModifyUserForm";

test("it should render an empty list", () => {
    const users = [];
    const editRow = jest.fn();
    const deleteUser = jest.fn();
    render(<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />);
    const element = screen.getByText(/No users/i);
    expect(element).toBeInTheDocument();
});

test("it should render the list of users", async () => {
    const email1 = "bdelayglesiasb@acquirethisname.com";
    const email2 = "ekettoec@etsy.com";
    const users = [
        {
            id: 12,
            firstname: "Britt",
            lastname: "De la Yglesias",
            email: email1,
            username: "bdelayglesiasb",
        },
        {
            id: 13,
            firstname: "Emlyn",
            lastname: "Kettoe",
            email: email2,
            username: "ekettoec",
        },
    ];
    const editRow = jest.fn();
    const deleteUser = jest.fn();
    render(<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />);
    const elements = await screen.findAllByTestId("user-row");
    expect(elements).toHaveLength(2);

    const firstEmailElement = await screen.findByText(email1);
    expect(firstEmailElement).toBeInTheDocument();

    const secondEmailElement = await screen.findByText(email2);
    expect(secondEmailElement).toBeInTheDocument();
});

test("it should call the delete prop", async () => {
    const email1 = "bdelayglesiasb@acquirethisname.com";
    const email2 = "ekettoec@etsy.com";
    const users = [
        {
            id: 12,
            firstname: "Britt",
            lastname: "De la Yglesias",
            email: email1,
            username: "bdelayglesiasb",
        },
        {
            id: 13,
            firstname: "Emlyn",
            lastname: "Kettoe",
            email: email2,
            username: "ekettoec",
        },
    ];

    const editRow = jest.fn();
    const deleteUser = jest.fn();

    render(<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />);

    const deleteUserButton = screen.getByTestId("delete-user-12");
    deleteUserButton.click();

    expect(deleteUser).toHaveBeenCalledWith(12);
});

test("it should call the modify prop", async () => {
    const email1 = "bdelayglesiasb@acquirethisname.com";
    const email2 = "ekettoec@etsy.com";
    const users = [
        {
            id: 12,
            firstname: "Britt",
            lastname: "De la Yglesias",
            email: email1,
            username: "bdelayglesiasb",
        },
        {
            id: 13,
            firstname: "Emlyn",
            lastname: "Kettoe",
            email: email2,
            username: "ekettoec",
        },
    ];

    const editRow = jest.fn();
    const deleteUser = jest.fn();

    render(<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />);


    const editUserButton = screen.getByTestId("edit-user-12");
    editUserButton.click();

    const editing=jest.fn();
    const setEditing=jest.fn();
    const updateUser=jest.fn();

    const currentUser=users[0];
    console.log(currentUser);
    
    render(<ModifyUserForm
        editing={editing}
        setEditing={setEditing}
        currentUser={currentUser}
        updateUser={updateUser} />);
    currentUser.firstname='modificado';
    const editSave = screen.getByTestId("edit-button");
    editSave.click();
 
    expect(updateUser).toHaveBeenCalledWith(12,currentUser);
});