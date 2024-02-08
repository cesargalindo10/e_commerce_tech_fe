import { Modal } from "react-bootstrap";
import Button from "../../shared/btns/Button";
import { useNavigate } from "react-router-dom";

interface Props{
    show: boolean
    onHide: () => void
    deleteSomething: () => void
    message: string
}
const ModalSuccess = ({ show, onHide, message }:Props) => {
    const navigate = useNavigate();
    const handleClose = () => {
        onHide();
        navigate('/', { replace: true });
    }
    return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
            <h3>Enviado </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="main" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSuccess;