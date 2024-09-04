import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

export default class Blog extends Component {
    constructor() {
        super();
        this.state = {
            blogItems : [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            modalIsOpen: false
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);   
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfullNewBlogSubmission = this.handleSuccessfullNewBlogSubmission.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    onScroll () {
        if(this.state.isLoading || 
            this.state.blogItems.length === this.state.totalCount) {
            return;
        }

        if( window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 1) {
            this.getBlogItems();
        }
    }

    
    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1,
            isLoading: true,
        });

        axios.get (`https://jonmadariaga.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, 
            {withCredentials: true}
        ).then(response => {
            console.log("Respuesta",response);
            this.setState({
                blogItems : this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            })
        }).catch(error => {
            console.log("getBlogItems", error)
        })
    }

    handleNewBlogClick(){
        this.setState({
            modalIsOpen:true
        })
    }

    handleModalClose (){
        this.setState({
            modalIsOpen:false
        })
    }

    handleSuccessfullNewBlogSubmission(blog) {
        this.setState({
            modalIsOpen: false,
            blogItems : [blog].concat(this.state.blogItems)
        })
    }

    componentDidMount() {
        this.getBlogItems();
        window.addEventListener("scroll", this.onScroll, false);
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    handleDeleteClick(blog){
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
            {withCredentials: true}
        ).then(response => {
            this.setState({
                blogItems: this.state.blogItems.filter(blogItem => {
                  return blog.id !== blogItem.id;
                })
            });
        }).catch(error => {
            console.log("Error from delete", error);
        })
    }
    

    render() {

        const blogRecords = this.state.blogItems.map (blogItem => {
            if(this.props.loggedInStatus) {
                return(
                    <div key={blogItem.id} className="admin-blog-wrapper">
                        <BlogItem  blogItem = {blogItem}/>
                        <div className="delete-btn">
                            <a onClick={() => this.handleDeleteClick(blogItem)}>
                                <FontAwesomeIcon icon="trash"/>
                            </a>
                        </div>
                        
                    </div>
                )
            } else {
                return <BlogItem key={blogItem.id} blogItem = {blogItem}/>
            }
           
        })

        return( 
            
            <div className="blog-container">
                <BlogModal 
                    modalIsOpen={this.state.modalIsOpen}
                    handleModalClose = {this.handleModalClose}
                    handleSuccessfullNewBlogSubmission ={this.handleSuccessfullNewBlogSubmission}
                />


                {this.props.loggedInStatus === "LOGGED_IN"? (
                    <div className="new-blog-link">
                    <a onClick={this.handleNewBlogClick}>
                         <FontAwesomeIcon icon="fa-solid fa-circle-plus"/>
                    </a>
                </div> ) : null}
                
                
                
                <div className="content-container">
                    {blogRecords}
                </div>
            
                {this.state.isLoading? (
                    <div className="content-loader">
                        <FontAwesomeIcon icon="spinner" spin /> 
                    </div>) : null }
                
            </div>
        ); 
    }
}