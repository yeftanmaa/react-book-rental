import React from "react";
import './modal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ showModalDelete, setShowModalDelete, submitDeletion }) => {

    return (
        <div>
            <Modal show={showModalDelete} onHide={setShowModalDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure want to delete this book?</Modal.Body>
                
                <Modal.Footer>
                    <Button variant="light" onClick={() => {setShowModalDelete(false)}}>Cancel</Button>
                    <Button variant="danger" onClick={submitDeletion}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalDelete;