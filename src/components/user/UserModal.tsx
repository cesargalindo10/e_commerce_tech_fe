import { useState } from "react";
import { FormikValues } from "formik";
import { User } from "../../models/models";
import { Modal } from "react-bootstrap";
import UserForm from "./UserForm";

interface UserModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  createUser: (user: User) => void;
  updateUser: (userE: User, id: string) => void;
  userToEdit: User;
  setUserToEdit: ([]: any) => void;
}

export default function UserModal({
  showModal,
  setShowModal,
  createUser,
  updateUser,
  userToEdit,
  setUserToEdit,
}: UserModalProps) {
  const initialData: User = {
    id:0,
    name: "",
    username: "",
    phone:"",
    state: true,
    password:'',
    role:"",   
  };

  const [formData, setFormData] = useState<User>(
    userToEdit === null ? initialData : userToEdit
  );

  const handleSubmit = (values: FormikValues) => {
    const formData: User = {
      id:values.id,
      name: values.name || "",
      username: values.username || "",
      phone: values.phone || "",
      password:values.password,
      state: values.state,
      role:values.role,
    };
    if (formData.id === 0) {
      createUser(formData);
    } else {
      updateUser(formData, "" + formData.id);
    }
    setUserToEdit(initialData);
    setShowModal(false);
  };
  const handleCancel = () => {
    setUserToEdit(initialData);
    setShowModal(false);
  };

  return (
    <Modal show={showModal}>
      <Modal.Header>
        <h5 className="title-header__modal">
          {userToEdit?.id ? "Actualizar Usuario" : "Crear nueva usuario"}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <UserForm
          userToEdit={userToEdit}
          formData={formData}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Modal.Body>
    </Modal>
  );
}
