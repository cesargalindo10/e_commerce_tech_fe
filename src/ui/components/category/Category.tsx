import { useEffect, useState } from "react";
import { APISERVICE } from "../../../infrastructure/api/api.service";
import CategoryTable from "./CategoryTable";
import "./Category.css";
import CategoryModal from "./CategoryModal";
import Paginator from "./Paginator";
interface FormData {
  id: number | "";
  name: string;
  description: string;
  create_at: string | null;
  update_at: string | null;
}

export default function Category() {
  const initialData: FormData = {
    id: "",
    name: "",
    description: "",
    create_at: "",
    update_at: "",
  };

  const [categories, setCategories] = useState([]);
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

  const getCategories = async (pageNum: string = "1"): Promise<void> => {
    try {
      const url = `categories?page=${pageNum}`;
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
  const createCategory = async (category: any): Promise<void> => {
    try {
      let url: string = "categories";
      const response = await APISERVICE.post(category, url);

      if (response.status === 201) {
      }
      getCategories("categories/1");
    } catch (error) {
      console.error(error);
    }
  };
  const updateCategory = async (
    categoryUpdate: FormData,
    id: string
  ): Promise<void> => {
    try {
      let url: string = `categories/${id}`;
      const response = await APISERVICE.put(categoryUpdate, url);

      if (response.status === 201) {
      }
      getCategories(pageInfo.first_page_url);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCategory = async (id: string) => {
    let url = `categories/${id}`;
    const response = await APISERVICE.delete(url);
    if (response.status === 200) {
      getCategories();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <button onClick={openModal}>+ Nuevo</button>
      <CategoryTable
        items={categories}
        setCategoriToEdit={setCategoriToEdit}
        setIsModalOpen={setIsModalOpen}
        deleteCategory={deleteCategory}
      />
      <Paginator pageInfo={pageInfo} getData={getCategories} />

      {isModalOpen && (
        <CategoryModal
          closeModal={closeModal}
          createCategory={createCategory}
          updateCategory={updateCategory}
          categoryToEdit={categoryToEdit}
          setCategoriToEdit={setCategoriToEdit}
        />
      )}
    </>
  );
}
