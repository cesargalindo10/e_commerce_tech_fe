import { useEffect, useState } from "react";
import { APISERVICE } from "../../infrastructure/api/api.service";
import UserTable from "./UserTable";
import "./User.css";
import UserModal from "./UserModal";
import Paginator from "./Paginator";
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

export default function User() {
  const initialData: FormData = {
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  };

  const [users, setCategories] = useState([]);
  const [categoryToEdit, setCategoriToEdit] = useState(initialData);
  const [pageInfo, setPageInfo] = useState({
    current_page: 1,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 1,
    last_page_url: "",
    links: [],
    next_page_url: null,
    path: "",
    per_page: 5, // Ajusta según tus necesidades
    prev_page_url: "",
    to: 0,
    total: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUsers = async (pageNum: string = "1"): Promise<void> => {
    try {
      const url = `users?page=${pageNum}`;
      const response = await APISERVICE.get(url);
      if (response.status === 200) {
        setCategories(response.data.data);
        setPageInfo(response.data);
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (user: any): Promise<void> => {
    try {
      let url: string = "users";
      const response = await APISERVICE.post(user, url);

      if (response.status === 201) {
      }
      getUsers("users/1");
    } catch (error) {
      console.error(error);
    }
  };
  const updateUser = async (
    categoryUpdate: FormData,
    id: string
  ): Promise<void> => {
    try {
      let url: string = `users/${id}`;
      const response = await APISERVICE.put(categoryUpdate, url);

      if (response.status === 201) {
      }
      getUsers(pageInfo.first_page_url);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCategory = async (id: string) => {
    let url = `users/${id}`;
    const response = await APISERVICE.delete(url);
    if (response.status === 200) {
      getUsers();
    }
  };
  console.log(users);
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <button onClick={openModal}>+ Nuevo</button>
      <UserTable
        items={users}
        setCategoriToEdit={setCategoriToEdit}
        setIsModalOpen={setIsModalOpen}
        deleteCategory={deleteCategory}
      />
      <Paginator pageInfo={pageInfo} getData={getUsers} />

      {isModalOpen && (
        <UserModal
          closeModal={closeModal}
          createCategory={createUser}
          updateUser={updateUser}
          categoryToEdit={categoryToEdit}
          setCategoriToEdit={setCategoriToEdit}
        />
      )}
    </>
  );
}
