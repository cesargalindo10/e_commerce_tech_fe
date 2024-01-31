import { Table } from "react-bootstrap";
import UserTableBody from "./UserTableBody";
import CategoryTableHeader from "./UserTableHeader";

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
  items: FormData[];
  setCategoriToEdit: ([]: any) => void;
  setIsModalOpen: (boolean: any) => void;
  deleteCategory: (id: string) => void;
}
export default function UserTable({
  items,
  setCategoriToEdit,
  setIsModalOpen,
  deleteCategory,
}: Props) {
  //console.log(items)
  return (
    <Table striped bordered hover>
      <CategoryTableHeader />
      <UserTableBody
        users={items}
        setCategoriToEdit={setCategoriToEdit}
        setIsModalOpen={setIsModalOpen}
        deleteCategory={deleteCategory}
      />
    </Table>
  );
}
