import { Modal } from 'react-bootstrap';
import NameDescriptionForm from '../nameDescriptionForm/NameDescriptionForm';

interface Props {
    show: boolean;
    handleClose: any;
    modalTitle: string;
    descriptionPlayholder: string;
    namePlaceholder: string;
    component: any
    setShow: any
    setReload: any
    boardId?: string
    teamID?: string
}

export default function DefaultModal(props: Props ) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={true}
        >
            <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NameDescriptionForm
                    setShow={props.setShow}
                    descriptionPlaceholder={props.descriptionPlayholder} 
                    namePlaceholder={props.namePlaceholder}
                    component={props.component}
                    setReload={props.setReload}
                    boardId={props.boardId}
                    teamID={props.teamID}
                />
            </Modal.Body>
        </Modal>
    );
}
