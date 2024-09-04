import React, {Component} from "react";
import Login from "../auth/login"
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth () {
        this.props.handleSuccessfullLogin();
        this.props.history.push('/');
    }

    handleUnsuccessfulAuth () {
        this.props.handleUnsuccessfullLogin();
    }

    render() {
        return(
            <div className="auth-page-wrapper">
                <div 
                className="left-column"
                style={{
                    backgroundImage: `url(${loginImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}

                />

                

                <div className="right-column">
                    <Login
                        handleSuccessfulAuth = {this.handleSuccessfulAuth}
                        handleUnsuccessfulAuth = {this.handleUnsuccessfulAuth}
                    />
                </div>
            </div>
        );
    }
}