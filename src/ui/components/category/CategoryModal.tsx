import { useState, FormEvent } from "react";
import CategoryForm from "./CategoryForm";
import Modal from "./Modal";
import { FormikValues } from "formik";

interface FormData {
  id: number | "";
  name: string;
  description: string;
  create_at: string | null;
  update_at: string | null;
}

interface CategoryModalProps {
  closeModal: () => void;
  createCategory: (category: FormData) => void;
  updateCategory: (categoryE: FormData, id: string) => void;
  categoryToEdit: FormData;
  setCategoriToEdit: ([]: any) => void;
}

export default function CategoryModal({
  closeModal,
  createCategory,
  updateCategory,
  categoryToEdit,
  setCategoriToEdit,
}: CategoryModalProps) {
  const initialData: FormData = {
    id: "",
    name: "",
    description: "",
    create_at: "",
    update_at: "",
  };

  const [formData, setFormData] = useState<FormData>(
    categoryToEdit === null ? initialData : categoryToEdit
  );

  const handleSubmit = (values:FormikValues) => {
    const formData: FormData = {
      id: values.id || "",
      name: values.name || "",
      description: values.description || "",
      create_at: values.create_at || null,
      update_at: values.update_at || null,
    };

    if (formData.id === "") {
      // Crear nuevo registro
      createCategory(formData);
    } else {
      // Actualizar registro existente
      updateCategory(formData, "" + formData.id);
    }
    setCategoriToEdit(initialData);
    closeModal();
  };
  const handleCancel = () => {
    setCategoriToEdit(initialData);
    closeModal();
  };

  return (
    <Modal>
      <h2>
        {formData.id === "" ? "Crear Nueva Categoria" : "Editar Categoria"}
      </h2>
      <CategoryForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Modal>
  );
}
