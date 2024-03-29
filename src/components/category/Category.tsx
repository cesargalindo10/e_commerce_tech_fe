import { useEffect, useState } from "react";
import { APISERVICE } from "../../infrastructure/api/api.service";
import CategoryTable from "./CategoryTable";
import { CategoryData, PageInfo } from "../../models/models";
import Button from "../../shared/btns/Button";
import toast from "react-hot-toast";
import CategoryModal from "./CategoryModal";

interface AppState {
  pageInfo: PageInfo | null;
  categories: CategoryData[];
  categoryToedit: CategoryData;
}

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [categoryToEdit, setCategoriToEdit] = useState<
    AppState["categoryToedit"] | null
  >(null);
  const [pageInfo, setpageInfo] = useState<AppState["pageInfo"] | null>(null);

  const [showModal, setShowModal] = useState(false);

  const getCategories = async (page: number = 1) => {
    try {
      const url = `api/categories?page=${page}`;
      const response: any = await APISERVICE.get(url);
      if (response.success) {
        setCategories(response.data);
        setpageInfo(response.pageInfo);
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createCategory = async (category: CategoryData,image:File|null) => {
    try {
      let url: string = "api/categories";
      const formData=new FormData
      formData.append("data", JSON.stringify(category));      
      if (image) formData.append("file", image);
      const { success, message }: any = await APISERVICE.posWithImage(formData, url,"POST");

      if (success) {
        toast.success(message);
        getCategories();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateCategory = async (categoryUpdate: CategoryData, id: string , image:File|null) => {
    try {
      let url: string = `api/categories/${id}`;      const formData=new FormData
      formData.append("data", JSON.stringify(categoryUpdate));      
      if (image) formData.append("file", image);
      const { success, message }: any = await APISERVICE.posWithImage(
        formData,
        url,"POST"
      );
      if (success) {
        toast.success(message);
        getCategories();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCategory = async (id: string) => {
    let url = `api/categories/${id}`;
    const response = await APISERVICE.delete(url);
    if (response) {
      getCategories();
    }
  };
  const showBillboardCategory = async (id: string) => {
    let url = `api/categories-billboard/${id}`;
    const response = await APISERVICE.delete(url); 
    if (response) {
      getCategories();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container-component">
      <h3 className="title-page">Categorias</h3>
      <div className="component-mb-10">
        <Button variant="new" onClick={() => setShowModal(true)} text="+New" />
      </div>

      <CategoryTable
        items={categories}
        setCategoriToEdit={setCategoriToEdit}
        setShowModal={setShowModal}
        deleteCategory={deleteCategory}
        pageInfo={pageInfo}
        getCategories={getCategories}
        showBillboardCategory={showBillboardCategory}
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
    </div>
  );
}
