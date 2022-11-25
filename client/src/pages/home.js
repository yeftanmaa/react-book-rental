import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// initialize variable called query to pass data to 'search-book' component
var query = '';

function Home () {

    // initialize navigation variable
    const navigate = useNavigate();

    // useState to get keyword value
    const [keyword, setKeyword] = useState('');
    query = keyword;

    // function to handle user when click submit button
    const handleSubmit = event => {
        event.preventDefault();
        setKeyword(keyword);
        navigate(`/book/search-title?keyword=${keyword}`);
    }

    const submitStatusFilter = () => {
        navigate('/book/status=available');
    }

    const submitAuthorFilter = (event) => {
        event.preventDefault();
        setKeyword(keyword);
        navigate(`/book/search-author?keyword=${keyword}`);
    }

    const submitISBNFilter = (event) => {
        event.preventDefault();
        setKeyword(keyword);
        navigate(`/book/search-isbn?keyword=${keyword}`);
    }

    return (
        <div>
            <section id="section1">
                <div className="container">
                    <div className="icon-container">
                        <i className="bi bi-person-circle"></i>
                    </div>

                    <p className="h1" style={{paddingBottom: '25px', color: 'white'}}><span className="highlight-1">Find your book</span> and start reading <br></br> with our complete e-library.</p>

                    <div className="search">
                        <form onSubmit={handleSubmit} method="get" className="form-container">
                            <input type="text" className="form-control" name="keyword" placeholder="What book you want to read?" onChange={event => setKeyword(event.target.value)} value={keyword}/>
                            <Dropdown>
                                <DropdownButton id="dropdown-item-button" title="Search By">
                                    <Dropdown.Item as="button">Book Title</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={submitAuthorFilter}>Book Author</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={submitISBNFilter}>ISBN</Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                            
                            
                            {/* <button type="submit" className="btn btn-primary">Search</button> */}
                        </form>
                    </div>
                    
                    <div className="filterisAvailable">
                        <button onClick={submitStatusFilter} className="btn btn-outline-light">See Available Book</button>
                    </div>

                    <div className="upload">
                        <a href="/add/book">♥ Upload a book ♥</a>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default Home;
export {query};