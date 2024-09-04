import { defaultFormat } from "moment";
import React from "react";
import striptags from "striptags";
import Truncate from "react-truncate";

import {Link} from "react-router-dom";

const BlogItem = (props) => {
    const {
        id,
        blog_status,
        content,
        title,
        featured_image_url
    } = props.blogItem

    return (
        <div>
            <Link to= {`/b/${id}`}>
                <h1>{title}</h1>
            </Link>

            <div>
                
                <Truncate
                    lines={5}
                    ellipsis={
                        <span>
                            ... <Link to= {`/b/${id}`}>Leer más</Link>
                        </span>
                    }
                >
                    {striptags(content)}
                </Truncate>

            </div>
        </div>

    )
}





export default BlogItem;