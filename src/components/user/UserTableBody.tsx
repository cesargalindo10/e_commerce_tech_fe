import { MdPersonAddDisabled, MdModeEdit } from "react-icons/md";
import { User } from "../../models/models";
import Button from "../../shared/btns/Button";

interface Props {
  users: User[];
  setUserToEdit: ([]: any) => void;
  setShowModal: (boolean: any) => void;
  deleteCategory: (id: string) => void;
}
export default function UserTableBody({
  users,
  setUserToEdit,
  setShowModal,
  deleteCategory,
}: Props) {
  const onEdit = (user: User) => {
    setUserToEdit(user);
    setShowModal(true);
  };
  const onDelete = (id: string) => {
    deleteCategory(id);
  };
  return (
    <tbody>
      {users &&
        users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{user.role}</td>
            <td>
              {user.state ? (
                <Button text="Activo" variant="success" />
              ) : (
                <Button text="Inactivo" variant="error" />
              )}
            </td>
            <td>
              <Button variant="main" onClick={() => onEdit(user)}>
                <MdModeEdit />
              </Button>

              <Button
                variant="error"
                onClick={() => onDelete("" + user.id)}
              >
                <MdPersonAddDisabled />
              </Button>
            </td>
          </tr>
        ))}
    </tbody>
  );
}
