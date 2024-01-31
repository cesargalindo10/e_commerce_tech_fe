//import "./Category.css";

interface Category {
  id: number;
  name: string;
  description: string;
  create_at: string;
  update_at: string | null;
}

interface Props {
  categories: Category[];
  setCategoriToEdit: ([]: any) => void;
  setIsModalOpen: (boolean: any) => void;
  deleteCategory: (id: string) => void;
}
export default function CategoryTableBody({
  categories,
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
      {categories &&
        categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>

            <td className="action-buttons">
              <button className="edit-button" onClick={() => onEdit(category)}>
                Editar
              </button>
              <button
                className="delete-button"
                onClick={() => onDelete("" + category.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );
}
