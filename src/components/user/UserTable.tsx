import { Table } from "react-bootstrap";
import CategoryTableHeader from "./UserTableHeader";
import Pagination from "../../shared/pagination/Pagination";
import {  PageInfo, User } from "../../models/models";
import UserTableBody from "./UserTableBody";

interface Props {
  users: User[];
  setUserToEdit: ([]: any) => void;
  setShowModal: (boolean: any) => void;
  deleteUser: (id: string) => void;
  pageInfo: PageInfo |null;
  getCategories: (page: number) => void;
}
export default function UserTable({
  users,
  setUserToEdit,
  setShowModal,
  deleteUser,
  pageInfo,
  getCategories,
}: Props) {
  return (
    <>
      <Table striped bordered hover>
        <CategoryTableHeader />
        <UserTableBody
          users={users}
          setUserToEdit={setUserToEdit}
          setShowModal={setShowModal}
          deleteUser={deleteUser}
        />
      </Table>
      {users.length > 0 && (
        <Pagination pageInfo={pageInfo} getData={getCategories} />
      )}
    </>
  );
}
