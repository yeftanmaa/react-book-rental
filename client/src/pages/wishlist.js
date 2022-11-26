import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../wishlist.css'
import Axios from "axios";
import { Plus } from "react-bootstrap-icons";

const Wishlist = (props) => {

    const navigate = useNavigate();

    // handling dynamic title of this page
    useEffect(() => {
        document.title = props.title;
    }
    , [props])

    // useState to handling list of book that requested
    const [bookWishList, setBookWishList] = useState([]);

    // requesting books based on NAME
    useEffect(() => {
        Axios.get('http://localhost:3301/my-wishlist', { params: { name: 'alimc23' }})
        .then(response => {
            setBookWishList(response.data);
        })

    }, [])

    return (
        <div className="body">
            <div className="global-container">
                <div className="header-component">
                    <h3 style={{marginLeft: '60px', marginBottom: '30px'}}>My Wishlist <span style={{fontWeight: '100', fontSize: '20px'}}>{`(@alimc23)`}</span></h3>
                    <button onClick={() => navigate('/home')} type="button" className="btn btn-dark" style={{marginRight: '60px', backgroundColor: 'transparent', border: 'none'}}><Plus size={"30px"} style={{marginBottom: '5px'}}/>Add Book</button>
                </div>
                <div className="card-wrapper">
                    {bookWishList.map((val, i) => {

                        // remove GMT from date info
                        var convertDateStart = new Date(val.dateStart).toISOString().split("T")[0];
                        var convertDateEnd = new Date(val.dateEnd).toISOString().split("T")[0];

                        // function when return button clicked
                        const handleReturn = () => {

                            // deleting data from wishlist
                            Axios.delete(`http://localhost:3301/delete-wishlist-book/${val.wishlist_id}`).then(response => {
                                setBookWishList(response.data);
                            });
                            
                            window.location.reload(false);
                        }

                        return (
                            <div key={i}>
                                <div className="card">
                                    <div className="date-remaining">    
                                        <h2 className="number-of-date">33</h2>
                                        <p>Days Left</p>
                                    </div>
                                    <div className="line"></div>
                                    <h3>{val.book_name}</h3>
                                    <p className="sub-text">{val.book_author}</p>
                                    <p className="date-start-text">Date Start: {convertDateStart}</p>
                                    <p className="date-end-text">Date End: {convertDateEnd}</p>
                                    <p className="book-description"><b>Description:</b><br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <div className="return-btn">
                                        <button onClick={handleReturn}>Return this book</button>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>  
            </div>
        </div>
    );
}
 
export default Wishlist;