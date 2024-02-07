import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { FormikValues } from "formik";
import { CategoryData } from "../../models/models";
import { Modal } from "react-bootstrap";

interface CategoryModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  createCategory: (category: CategoryData) => void;
  updateCategory: (categoryE: CategoryData, id: string) => void;
  categoryToEdit: CategoryData;
  setCategoriToEdit: ([]: any) => void;
}

export default function CategoryModal({
  showModal,
  setShowModal,
  createCategory,
  updateCategory,
  categoryToEdit,
  setCategoriToEdit,
}: CategoryModalProps) {
  const initialData: CategoryData = {
    id: 0,
    name: "",
    description: "",
    state: true,
    create_at: "",
    update_at: "",
  };

  const [formData, setFormData] = useState<CategoryData>(
    categoryToEdit === null ? initialData : categoryToEdit
  );

  const handleSubmit = (values: FormikValues) => {
    const formData: CategoryData = {
      id: values.id || "",
      name: values.name || "",
      state: values.state,
      description: values.description || "",
      create_at: values.create_at || null,
      update_at: values.update_at || null,
    };

    if (formData.id === 0) {
      // Crear nuevo registro
      createCategory(formData);
    } else {
      // Actualizar registro existente
      updateCategory(formData, "" + formData.id);
    }
    setCategoriToEdit(initialData);
    setShowModal(false);
  };
  const handleCancel = () => {
    setCategoriToEdit(initialData);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">
          {categoryToEdit.id ? "Actualizar Categoria" : "Crear nueva categoria"}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <CategoryForm
          categoryToEdit={categoryToEdit}
          formData={formData}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Modal.Body>
    </Modal>
  );
}
