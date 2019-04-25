import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Notfound extends Component {

    render() {
        return (
            <div className="notfound">
                <h1>Oops, page not found</h1>
                <Link to="/" className="mainpage-link btn">
                    {
                        this.props.auth ? "Back to feed" : "Signin"
                    }
                </Link>
            </div>
        );
    }
}

export default Notfound;
