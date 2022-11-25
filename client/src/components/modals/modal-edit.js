import React, { useState } from "react";
import './modal.css';
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const ModalEdit = ({ showModalEdit, setShowModalEdit, getid, title, author, publishDate, isbn, isAvailable, onBorrow }) => {

    // initialize navigation variable
    const navigate = useNavigate();

    // state to set isAvailable to show in form field
    const [isAvailableVal, setIsAvailableVal] = useState('');

    // useState to get current value of onBorrow from db
    const [onBorrowVal] = useState(onBorrow);

    // useState to set new value of specific field
    const [returnID, setReturnID] = useState(getid);
    const [newTitle, setNewTitle] = useState(title);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newPublishDate, setPublishDate] = useState(publishDate);
    const [newISBN, setNewISBN] = useState(isbn);
    const [newIsAvailable, setNewAvailable] = useState(4);
    const [newOnBorrow, setNewOnBorrow] = useState(onBorrow);

     // function to submit editing
     const submitEditing = () => {
        Axios.put(`http://localhost:3301/editBooks/${getid}`, {
            book_title: newTitle,
            book_author: newAuthor,
            book_publishDate: newPublishDate,
            book_ISBN: newISBN,
            isAvailable: newIsAvailable,
            onBorrow: newOnBorrow
        });
        
        window.location.reload(false);

        // refresh all the field value
        setNewTitle('');
        setNewAuthor('');
        setPublishDate('');
        setNewISBN(0);
        setNewAvailable('');
        setNewOnBorrow(0);
        navigate('/all/books');
    }

    // setting default value of isAvailable based on initial onBorrow value
    const stat = (e) => {
        if (onBorrow === 5) {
            setIsAvailableVal('Not Available');
            e.target.value = 'Not Available';
            setIsAvailableVal(e.target.value);
        } else {
            e.target.value = 'Available';
            setIsAvailableVal(e.target.value);
        }
    }

    // converting isAvailable value from plain text to bool
    const convertIsAvailableStatus = e => {

        if (e.target.value === '5') {
            setIsAvailableVal('Not Available');
            setNewAvailable(0);
        } else {
            setIsAvailableVal('Available');
            setNewAvailable(1);
        }

        setNewOnBorrow(e.target.value);
    }

    return (
        <div>
            <Modal show={showModalEdit} onHide={setShowModalEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>

                <Form onSubmit={submitEditing}>
                    <Modal.Body>
                            {/* form group of book author */}
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" disabled value={getid} onChange={(e) => e.target.value === '' ? returnID : setReturnID(returnID)} />
                            </Form.Group>

                            {/* form group of book title */}
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="What is name of this book?" defaultValue={title} onChange={(e) => e.target.value === '' ? newTitle : setNewTitle(e.target.value)} />
                            </Form.Group>

                            {/* form group of book author */}
                            <Form.Group className="mb-3">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Who is author of this book?" defaultValue={author} onChange={(e) => e.target.value === '' ? newAuthor : setNewAuthor(e.target.value)} />
                            </Form.Group>

                            {/* form group of publish date */}
                            <Form.Group className="mb-3">
                                <Form.Label>Publish Date</Form.Label>
                                <Form.Control type="date" placeholder="When this book been published?" defaultValue={publishDate} onChange={(e) => e.target.value === '' ? newPublishDate : setPublishDate(e.target.value)} />
                            </Form.Group>

                            {/* form group of book ISBN */}
                            <Form.Group className="mb-3">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control type="number" placeholder="Tell me the ISBN number of that book" defaultValue={isbn}  onChange={(e) => e.target.value === '' ? newISBN : setNewISBN(e.target.value)} />
                            </Form.Group>

                            {/* form group of book availability status */}
                            <Form.Group className="mb-3">
                                <Form.Label>Availability</Form.Label>
                                <Form.Control type="text" placeholder="Is this book available?" defaultValue={stat} value={isAvailableVal} disabled onChange={() => isAvailableVal} />
                            </Form.Group>

                            {/* form group of how many people rent that book */}
                            <Form.Group className="mb-3">
                                <Form.Label>Total Borrow</Form.Label>
                                <Form.Control type="number" max={5} placeholder="How many people rent this book currently?" defaultValue={onBorrowVal} onChange={convertIsAvailableStatus}  />
                            </Form.Group>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="light" onClick={() => {setShowModalEdit(false)}}>Cancel</Button>
                        <Button type="submit" variant="success">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>

    )
}

export default ModalEdit;