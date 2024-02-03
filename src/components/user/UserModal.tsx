import { useState, FormEvent } from "react";
import Modal from "./Modal";
import { FormikValues } from "formik";
import UserForm from "./UserForm";


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

interface CategoryModalProps {
  closeModal: () => void;
  createCategory: (user: FormData) => void;
  updateUser: (categoryE: FormData, id: string) => void;
  categoryToEdit: FormData;
  setCategoriToEdit: ([]: any) => void;
}

export default function UserModal({
  closeModal,
  createCategory,
  updateUser,
  categoryToEdit,
  setCategoriToEdit,
}: CategoryModalProps) {
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

  const [formData, setFormData] = useState<FormData>(
    categoryToEdit === null ? initialData : categoryToEdit
  );

  const handleSubmit = (values:FormikValues) => {
    const formData: FormData = {
      id: values.id || "",
      firstname: values.firstname ?? "",
      lastname: values.lastname ?? "",
      username: values.username ?? "",
      phone: values.phone ?? "",
      email: values.email ?? "",
      address: values.address ?? "",
      password: values.password ?? "",
    };
    

    if (formData.id === "") {
      // Crear nuevo registro
      createCategory(formData);
    } else {
      // Actualizar registro existente
      updateUser(formData, "" + formData.id);
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
      <UserForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Modal>
  );
}
