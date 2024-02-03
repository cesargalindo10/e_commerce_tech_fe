import { MdDelete, MdModeEdit } from "react-icons/md";
import { CategoryData } from "../../models/models";
import Button from "../../shared/btns/Button";

interface Props {
  categories: CategoryData[];
  setCategoriToEdit: ([]: any) => void;
  setShowModal: (boolean: any) => void;
  deleteCategory: (id: string) => void;
}
export default function CategoryTableBody({
  categories,
  setCategoriToEdit,
  setShowModal,
  deleteCategory,
}: Props) {
  const onEdit = (category: any) => {
    setCategoriToEdit(category);
    setShowModal(true);
  };
  const onDelete = (id: string) => {
    deleteCategory(id);
  };
  return (
    <tbody>
      {categories &&
        categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
              {category.state ? (
                <Button text="Activo" variant="success" />
              ) : (
                <Button text="Inactivo" variant="error" />
              )}
            </td>
            <td>
              <Button variant="main" onClick={() => onEdit(category)}>
                <MdModeEdit />
              </Button>

              <Button
                variant="error"
                onClick={() => onDelete("" + category.id)}
              >
                <MdDelete />
              </Button>
            </td>
          </tr>
        ))}
    </tbody>
  );
}
