import { render, screen } from "@testing-library/react";

import AddUserForm from "./AddUserForm";

test("it should render an new row", () => {
    
    const addUser = jest.fn();
    
    render(<AddUserForm addUser={addUser} />);
    const user=jest.fn();
    user.firstname='joaquin';
    user.lastname='joaquin2';
    user.email='hola@hotmail.com';
    user.username='dd';
    const adduserb = screen.getByTestId("add-user");
    adduserb.click();

});
