import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AddBook = (props) => {

    // handling dynamic title of this page
    useEffect(() => {
        document.title = props.title;
    }
    , [props])

    const [isAvailableVal, setIsAvailableVal] = useState('Available');

    // initialize navigation variable
    const navigate = useNavigate();

    // useState to set new value of specific field
    const [addBook, setAddBook] = useState('');
    const [addAuthor, setAddAuthor] = useState('');
    const [addPublishDate, setPublishDate] = useState('');
    const [addISBN, setAddISBN] = useState('');
    const [addIsAvailable, setAddIsAvaialble] = useState('');
    const [addOnBorrow, setAddOnBorrow] = useState('');

    // handling cancel button
    const HandlingCancel = () => {
        navigate('/home');
    }

    // handling form when user submit new data
    const uploadBook = () => {
        
        // sending form data to backend ("db_key", "formValue")
        const bookData = {"book_title": addBook, "book_author": addAuthor, "book_publishDate": addPublishDate, "book_ISBN": addISBN, "isAvailable": addIsAvailable, "onBorrow": addOnBorrow};
        Axios.post("http://localhost:3301/addBooks", bookData).then(() => alert('Book successfully added!'));

        // refresh all the field value
        setAddBook('');
        setAddAuthor('');
        setPublishDate('');
        setAddISBN(0);
        setAddIsAvaialble('');
        setAddOnBorrow(0)
        navigate(`/all/books`);
    }

    // handling  change onBorrow field
    const convertIsAvailableStatus = e => {

        if (e.target.value >= '5') {
            setIsAvailableVal('Not Available');
            setAddIsAvaialble(0);
        } else {
            setIsAvailableVal('Available');
            setAddIsAvaialble(1);
        }

        setAddOnBorrow(e.target.value);
    }

    return (
        <div>
            <div className="global-wrapper">
                <div className="left-container">
                    <p className="side-text-add-book">You can help others find their book by adding new book into our repository.</p>
                    <div className="line"></div>
                </div>
                
                <div className="container-add-book">
                    <h2 style={{marginTop: '15px', marginBottom: '25px', textAlign:'center'}}>Add New Book</h2>
                    <Form onSubmit={uploadBook}>
                        {/* form group of book title */}
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="What is name of this book?" onChange={(e) => e.target.value === '' ? setAddBook('Null') : setAddBook(e.target.value)}/>
                        </Form.Group>

                        {/* form group of book author */}
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Who is author of this book?"  onChange={(e) => e.target.value === '' ? setAddAuthor('Null') : setAddAuthor(e.target.value)} />
                        </Form.Group>

                        {/* form group of publish date */}
                        <Form.Group className="mb-3">
                            <Form.Label>Publish Date</Form.Label>
                            <Form.Control type="date" placeholder="When this book been published?"  onChange={(e) => e.target.value === '' ? setPublishDate('2022-11-24') : setPublishDate(e.target.value)}/>
                        </Form.Group>

                        {/* form group of book ISBN */}
                        <Form.Group className="mb-3">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="number" placeholder="Tell me the ISBN number of that book"  onChange={(e) => e.target.value === '' ? setAddISBN('0000000') : setAddISBN(e.target.value)} />
                        </Form.Group>

                        {/* form group of book availability status */}
                        <Form.Group className="mb-3">
                            <Form.Label>Availability</Form.Label>
                            <Form.Control type="text" placeholder="Is this book available?" disabled defaultValue={isAvailableVal} value={isAvailableVal} onChange={() => isAvailableVal} />
                        </Form.Group>

                        {/* form group of how many people rent that book */}
                        <Form.Group className="mb-3">
                            <Form.Label>Total Borrow</Form.Label>
                            <Form.Control type="number" min={0} max={5} placeholder="How many people rent this book currently?" defaultValue={0}  onChange={convertIsAvailableStatus} />
                        </Form.Group>

                        <div className="button-control-container">
                            <Button className="btn-add" type="submit" variant="success"><b>Upload</b></Button>
                            <Button className="btn-add" variant="outline-danger" onClick={HandlingCancel}><b>Back</b></Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
 
export default AddBook;