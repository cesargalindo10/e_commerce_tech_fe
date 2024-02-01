import { Modal } from "react-bootstrap";
import Button from "../btns/Button";

interface Props{
  show: boolean
  onHide: () => void
  deleteSomething: () => void
  message: string
}
const ModalConfirm = ({ show, onHide, deleteSomething, message }: Props) => {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          <h3>Advertencia</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button text="Cancelar" variant="error" onClick={() => onHide()} />{" "}<Button text="Eliminar" variant="main" onClick={deleteSomething} />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
