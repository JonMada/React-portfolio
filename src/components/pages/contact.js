import React from "react";
import contactImage from "../../../static/assets/images/contact/contact.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
    return(

        <div className="content-page-wrapper">

            <div
                className="left-column"
                style={{
                background: "url(" + contactImage + ") no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
                }}
            />

            <div className="right-column">

                <div className="contact-bullet-points">

                    <div className="bullet-point-group">

                        <div className="icon">
                            <FontAwesomeIcon icon= "fa-solid fa-mobile"/>
                        </div>

                        <div className="text">
                            688 650 193
                        </div>
                    
                    </div>

                    <div className="bullet-point-group">

                        <div className="icon">
                            <FontAwesomeIcon icon= "fa-solid fa-envelope"/>
                        </div>

                        <div className="text">
                            jonmadariaga93@gmail.com
                        </div>
                    
                    </div>

                    <div className="bullet-point-group">

                        <div className="icon">
                            <FontAwesomeIcon icon= "fa-solid fa-location-dot"/>
                        </div>

                        <div className="text">
                            Sopela, Bizkaia
                        </div>
                    
                    </div>

                </div>

            </div>

        </div>
    );
}

