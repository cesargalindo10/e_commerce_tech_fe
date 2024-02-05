import { Table } from "react-bootstrap";
import CategoryTableHeader from "./UserTableHeader";
import Pagination from "../../shared/pagination/Pagination";
import {  PageInfo, User } from "../../models/models";
import UserTableBody from "./UserTableBody";

interface Props {
  users: User[];
  setUserToEdit: ([]: any) => void;
  setShowModal: (boolean: any) => void;
  deleteCategory: (id: string) => void;
  pageInfo: PageInfo |null;
  getCategories: (page: number) => void;
}
export default function UserTable({
  users,
  setUserToEdit,
  setShowModal,
  deleteCategory,
  pageInfo,
  getCategories,
}: Props) {
  //console.log(items)
  return (
    <>
      <Table striped bordered hover>
        <CategoryTableHeader />
        <UserTableBody
          users={users}
          setUserToEdit={setUserToEdit}
          setShowModal={setShowModal}
          deleteCategory={deleteCategory}
        />
      </Table>
      {users.length > 0 && (
        <Pagination pageInfo={pageInfo} getData={getCategories} />
      )}
    </>
  );
}
