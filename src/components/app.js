import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";


import NavigationContainer from './Navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetail from './Portfolio/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from './pages/no-match';

import Icons from '../helpers/icons';


export default class App extends Component {
  constructor(props){
    super(props);

    Icons();
    
    this.state = {
      loggedInStatus : "NOT_LOGGED_IN"
    }

    this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this)
    this.handleUnsuccessfullLogin = this.handleUnsuccessfullLogin.bind(this)
    this.checkLoginStatus = this.checkLoginStatus.bind(this)
    this.handleSuccessfullLogOut = this.handleSuccessfullLogOut.bind(this)
  }

  handleSuccessfullLogin () {
    this.setState({
      loggedInStatus : "LOGGED_IN"
    })
  }

  handleUnsuccessfullLogin () {
    this.setState( {
      loggedInStatus : "NOT_LOGGED_IN"
    })
  }

  handleSuccessfullLogOut () {
    this.setState( {
      loggedInStatus : "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus () {
    return axios
    .get("https://api.devcamp.space/logged_in", {
      withCredentials: true
    })
    .then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if(loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if ( loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if ( loggedIn === false && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log("Error", error);
    })
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  authorizedPages () {
    return [
      <Route key='portfolio-manager' path= '/portfolio-manager' component = {PortfolioManager}/>
    ];
  }
  
  render() {
   
    return (
      <div className='container'>

        <Router>
          
          <div>

            <NavigationContainer 
              loggedInStatus = {this.state.loggedInStatus}
              handleSuccessfullLogOut = {this.handleSuccessfullLogOut}
            />

            <Switch>
              <Route exact path ='/' component = {Home}/>

              <Route 
                path ='/auth' 
                render = {props => (
                  <Auth
                    {...props}
                    handleSuccessfullLogin = {this.handleSuccessfullLogin}
                    handleUnsuccessfullLogin = {this.handleUnsuccessfullLogin}
                  />
                )}
              />

              <Route  path ='/about-me' component = {About}/>
              <Route  path ='/contact' component = {Contact}/>

              <Route  path ='/blog' 
                render = {props => (
                  <Blog 
                    {...props}
                    loggedInStatus = {this.state.loggedInStatus}
                  />
                )}
              />





              <Route  
                path ='/b/:slug'
                render = {props => (
                  <BlogDetail
                    {...props}
                    loggedInStatus = {this.state.loggedInStatus}
                  />
                )} 

              
              />


              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              
              <Route exact path = '/portfolio/:slug' component = {PortfolioDetail}/>
              <Route component = {NoMatch} /> 
            </Switch>
          </div>
        </Router>
        
        
        

      </div>

    );
  }
}
