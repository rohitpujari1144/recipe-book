import React from 'react'

function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand font-weight-bold" href="/home" style={{ letterSpacing: '3px' }}>RECIPE BOOK</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            </li>
                            {
                                props.myProfile ? <li className="nav-item">
                                    <a className="nav-link active" href="/user-profile">My Profile</a>
                                </li> : ''
                            }
                            {
                                props.logout ? <li className="nav-item">
                                    <a className="nav-link active" href="/login" onClick={() => {
                                        sessionStorage.clear()
                                    }}>Logout</a>
                                </li> : ''
                            }
                        </ul>
                        {
                            props.searchBar ? <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> : ''
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar