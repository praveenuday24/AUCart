import {
    useEffect,
    useState
} from "react";

import API from "../api/axios";

const AdminUsers = () => {

    const [users, setUsers] =
        useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers =
    async () => {

        const response =
        await API.get("/users");

        setUsers(
            response.data
        );
    };

    return (
        <div>
            <h1>Users</h1>

            {users.map(user => (
                <div key={user._id}>
                    <h3>
                        {user.name}
                    </h3>

                    <p>
                        {user.email}
                    </p>

                    <p>
                        {user.role}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AdminUsers;