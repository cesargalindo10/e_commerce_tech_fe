import { useEffect, useState } from "react";
import { APISERVICE, AxiosService } from "../../infrastructure/api/api.service";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import { CategoryData, PageInfo } from "../../models/models";
import Button from "../../shared/btns/Button";

interface AppState {
  pageInfo: PageInfo | null;
  categories: CategoryData[];
}

export default function Category() {
  const initialData: CategoryData = {
    id: 0,
    name: "",
    description: "",
    state:true,
    create_at: "",
    update_at: "",
  };


  const [categories, setCategories] = useState([]);
  const [categoryToEdit, setCategoriToEdit] = useState(initialData);
  const [pageInfo, setpageInfo] = useState<AppState["pageInfo"] | null>(null);

  const [showModal, setShowModal] = useState(false);

 
  const getCategories = async (page: number=1)=> {
    try {
      const url = `api/categories?page=${page}`;
      const response = await APISERVICE.get(url);
      if (response.status === 200) {
        setCategories(response.data.data);
        setpageInfo(response.data.pageInfo);
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createCategory = async (category: any)=> {
    try {
      let url: string = "api/categories";
      const response = await APISERVICE.post(category, url);

      if (response.status === 201) {
      }
      getCategories(1);
    } catch (error) {
      console.error(error);
    }
  };
  const updateCategory = async (
    categoryUpdate: CategoryData,
    id: string
  ) => {
    try {
      let url: string = `api/categories/${id}`;
      const response = await APISERVICE.post(categoryUpdate, url);

      if (response.status === 201) {
      }
      getCategories();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCategory = async (id: string) => {
    let url = `api/categories/${id}`;
    console.log(url);
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
      <Button variant="new" onClick={()=>setShowModal(true)} text="+New" />
      <CategoryTable
        items={categories}
        setCategoriToEdit={setCategoriToEdit}
        setShowModal={setShowModal}
        deleteCategory={deleteCategory}
        pageInfo={pageInfo}
        getCategories={getCategories}
      />
      {showModal && (
        <CategoryModal
          showModal={showModal}
          setShowModal={setShowModal}
          createCategory={createCategory}
          updateCategory={updateCategory}
          categoryToEdit={categoryToEdit}
          setCategoriToEdit={setCategoriToEdit}
        />
      )}
    </>
  );
}
