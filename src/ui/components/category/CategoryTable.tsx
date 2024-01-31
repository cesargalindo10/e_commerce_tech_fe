import { Table } from "react-bootstrap";
import CategoryTableBody from "./CategoryTableBody";
import CategoryTableHeader from "./CategoryTableHeader";
//import "./Category.css"

interface Item {
  id: number;
  name: string;
  description: string;
  create_at: string;
  update_at: string | null;
}

interface Props {
  items: Item[];
  setCategoriToEdit: ([]: any) => void;
  setIsModalOpen: (boolean: any) => void;
  deleteCategory: (id: string) => void;
}
export default function CategoryTable({
  items,
  setCategoriToEdit,
  setIsModalOpen,
  deleteCategory,
}: Props) {
  //console.log(items)
  return (
    <Table striped bordered hover>
      <CategoryTableHeader />
      <CategoryTableBody
        categories={items}
        setCategoriToEdit={setCategoriToEdit}
        setIsModalOpen={setIsModalOpen}
        deleteCategory={deleteCategory}
      />
    </Table>
  );
}
