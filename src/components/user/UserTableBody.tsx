//import "./Category.css";

interface FormData {
  id: number | "";
  firstname: string;
  lastname: string;
  username: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  password: string | null;
}

interface Props {
  users: FormData[];
  setCategoriToEdit: ([]: any) => void;
  setIsModalOpen: (boolean: any) => void;
  deleteCategory: (id: string) => void;
}
export default function UserTableBody({
  users,
  setCategoriToEdit,
  setIsModalOpen,
  deleteCategory,
}: Props) {
  const onEdit = (category: any) => {
    setCategoriToEdit(category);
    setIsModalOpen(true);
  };
  const onDelete = (id: string) => {
    deleteCategory(id);
  };
  return (
    <tbody>
      {users &&
        users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>

            <td className="action-buttons">
              <button className="edit-button" onClick={() => onEdit(user)}>
                Editar
              </button>
              <button
                className="delete-button"
                onClick={() => onDelete("" + user.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );
}
