import {useState } from "react";
import CategoryForm from "./CategoryForm";
import { FormikValues } from "formik";
import { CategoryData } from "../../models/models";
import { Modal } from "react-bootstrap";

interface CategoryModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  createCategory: (category: CategoryData,image:File|null) => void;
  updateCategory: (categoryE: CategoryData, id: string,image:File|null) => void;
  categoryToEdit: CategoryData | null;
  setCategoriToEdit: ([]: any) => void;
}
const initialData: CategoryData = {
  name: "",
  description: "",
  state: true,
  billboard:true
 
};

export default function CategoryModal({
  showModal,
  setShowModal,
  createCategory,
  updateCategory,
  categoryToEdit,
  setCategoriToEdit,
}: CategoryModalProps) {

  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [urlImage, setUrlImage] = useState("");


  const [formData] = useState<CategoryModalProps["categoryToEdit"]>(
    categoryToEdit ? categoryToEdit : initialData
  );

  const handleSubmit = (values: FormikValues) => {
    const dataForm: CategoryData = {
      name: values.name || "",
      description: values.description || "",
      state: values.state,
      billboard:values.billboard
    };

    if (categoryToEdit) {
      updateCategory(dataForm, "" + categoryToEdit.id, image);
      
    } else {
     createCategory(dataForm, image);
    }
    setCategoriToEdit(null);
    setShowModal(false);
  };
  const handleCancel = () => {
    setCategoriToEdit(null);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">
          {categoryToEdit ? "Actualizar Categoria" : "Crear nueva categoria"}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <CategoryForm
          categoryToEdit={categoryToEdit}
          formData={formData}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          showModal={showModal}
          setImage={setImage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          urlImage={urlImage}
          setUrlImage={setUrlImage}
        />
      </Modal.Body>
    </Modal>
  );
}
