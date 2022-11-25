import React from "react";
import '../global-style.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { BookmarkPlusFill } from 'react-bootstrap-icons';
import { PencilFill } from "react-bootstrap-icons";
import { TrashFill } from "react-bootstrap-icons";
import {query} from "./home";
import { useLocation } from "react-router-dom";
import ModalDelete from "../components/modals/modal-delete";
import previewImage from '../assets/images/no-image-placeholder.png';
import ModalEdit from "../components/modals/modal-edit";

const SearchBook = (props) => {

    // handling dynamic title of this page
    useEffect(() => {
        document.title = props.title;
    }
    , [props])

    // useState to handling list of book that requested
    const [bookList, setBookList] = useState([]);

    // requesting books based on KEYWORD
    useEffect(() => {
        Axios.get('http://localhost:3301/book/search', { params: { keyword: query }})
        .then(response => {
            setBookList(response.data);
        })

    }, [])

    // useState to close or open deletion modal
    const [showModalDelete, setShowModalDelete] = useState(false);

    // useState for targeting which data wants to be deleted
    const [target, setTarget] = useState();

    // useState to close or open editing modal
    const [showModalEdit, setShowModalEdit] = useState(false);

    // useState for every data field to be edit
    const [getID, setGetID] = useState();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [publishDate, setPublishDate] = useState();
    const [ISBN, setISBN] = useState();
    const [isAvailable, setIsAvailable] = useState();
    const [onBorrow, setOnBorrow] = useState();

    // to convert date
    var convertPublishDate = '';

    // tracking url changes
    const location = useLocation();

    //  get specific pathname from url
    const redirect = location.pathname + location.search;
    
    // search book through the specific pathname
    useEffect(() => {
        console.log(redirect);
        Axios.get(`http://localhost:3301` + redirect)
        .then(response => {
            setBookList(response.data);
        })
    }, [redirect]);

    return (
        <div className="container-sm">

        <h2 className="title">Showing All Books:</h2>
        {bookList.map((val) => {

            // function to show deletion modal
            const handleShowModalDelete = () => {
                setShowModalDelete(true);
                setTarget(val.book_title);
            }

            // function to show editing modal
            const handleShowModalEdit = () => {
                setShowModalEdit(true);
                setTitle(val.book_title);
                setAuthor(val.book_author);
                convertPublishDate = new Date(val.book_publishDate).toISOString().split("T")[0];
                setPublishDate(convertPublishDate);
                setISBN(val.book_ISBN);
                setIsAvailable(val.isAvailable);
                setOnBorrow(val.onBorrow);
                setGetID(val.book_id);
            }
            
            // function to execute deletion
            const submitDeletion = () => {
                console.log(target);
                Axios.delete(`http://localhost:3301/deleteBooks/${target}`).then(response => {
                    setBookList(response.data);
                })
                window.location.reload(false);
            }

            return (
                <div className="card-container">
                    <div className="img-part">
                        <img src={previewImage} alt="this is a preview for book cover"></img>
                    </div>

                    <div className="desc-part">
                        <div className="button-group">
                            <button type="button" className="btn btn-info" onClick={handleShowModalEdit}><PencilFill style={{width: '17px', height: '17px', color: 'white'}} /></button>
                            <button type="button" className="btn btn-danger" onClick={handleShowModalDelete}><TrashFill style={{width: '17px', height: '17px'}} /></button>

                            {showModalEdit && <ModalEdit showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} getid={getID} title={title} author={author} publishDate={publishDate} isbn={ISBN} isAvailable={isAvailable} onBorrow={onBorrow} />}
                            {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} submitDeletion={submitDeletion} />}
                        </div>

                        <h4>{val.book_title}</h4>
                        <p><i>{val.book_author}</i></p>

                        <div>
                            <p className="book-information">Book ISBN: {val.book_ISBN}</p>
                            <p className="book-information">Published at: {val.book_publishDate}</p>
                        </div>
                        
                        <button type="button" class="btn btn-dark" disabled={val.isAvailable === 0 ? true : false}><BookmarkPlusFill style={{width: '17px', height: '17px', marginTop: '-2px', marginRight: '5px'}} /> Add to wishlist</button>
                        
                        <p>{val.isAvailable === 0 ? <p className="info">{`Book is reached maximum rent! (Temporarily not available)`}</p> : <p></p>}</p>
                    </div>
                </div>
            )
        })}
    </div>
    )
}

export default SearchBook;