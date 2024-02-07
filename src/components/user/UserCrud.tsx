import { useEffect, useState } from "react";
import { APISERVICE } from "../../infrastructure/api/api.service";
import { PageInfo, User } from "../../models/models";
import Button from "../../shared/btns/Button";
import UserTable from "./UserTable";
import UserModal from "./UserModal";

interface AppState {
  pageInfo: PageInfo | null;
  users: User[];
}

export default function UserCrud() {
  const initialData: User = {
    id:0,
    name: "",
    username: "",
    phone:"",
    state: true,
    password:'',
    role:"",   
  };

  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(initialData);
  const [pageInfo, setpageInfo] = useState<AppState["pageInfo"] | null>(null);
  const [showModal, setShowModal] = useState(false);

 
  const getUsers = async (page: number = 1) => {
    try {
      const url = `api/users?page=${page}`;
      const {data,pageInfo}:any = await APISERVICE.get(url);
      if (data) {
        setUsers(data);
        setpageInfo(pageInfo);
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createUser = async (user: User) => {
    try {
      let url: string = "api/users";
      const response = await APISERVICE.post(user, url);
      if (response.status === 201) {
      }
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };
  const updateUser = async (
    user: User,
    id: string
  ): Promise<void> => {
    try {
      let url: string = `api/users/${id}`;
      const response = await APISERVICE.put(user, url);
      if (response.status === 201) {
      }
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUser = async (id: string) => {
    let url = `api/users/${id}`;
    const response = await APISERVICE.delete(url);
    if (response.status === 200) {
      getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-component">
      <h3 className="title-page">Usuarios</h3>
      <Button variant="new" onClick={()=>setShowModal(true)} text="+New" />
      <UserTable
        users={users}
        setUserToEdit={setUserToEdit}
        setShowModal={setShowModal}
        deleteUser={deleteUser}
        pageInfo={pageInfo}
        getCategories={getUsers}
      />
      {showModal && (
        <UserModal
          showModal={showModal}
          setShowModal={setShowModal}
          createUser={createUser}
          updateUser={updateUser}
          userToEdit={userToEdit}
          setUserToEdit={setUserToEdit}
        />
      )}
    </div>
  );
}
