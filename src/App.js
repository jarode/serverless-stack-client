import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";
import config from "./config";


function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  useEffect(() => {
	onLoad();
  }, []);
  
  async componentDidMount() {
  this.loadFacebookSDK();

  try {
    await Auth.currentAuthenticatedUser();
    this.userHasAuthenticated(true);
  } catch (e) {
    if (e !== "not authenticated") {
      alert(e);
    }
  }

  this.setState({ isAuthenticating: false });
}

loadFacebookSDK() {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId            : config.social.FB,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.1'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

  async function onLoad() {
	try {
	  await Auth.currentSession();
		userHasAuthenticated(true);
	}
	catch(e) {
	  if (e !== 'No current user') {
		onError(e);
	  }
	}

	setIsAuthenticating(false);
  }
  
  async function handleLogout() {
	await Auth.signOut();

	userHasAuthenticated(false);
	
	history.push("/login");
  }
  
  return (
  !isAuthenticating && (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ErrorBoundary>
		<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
		  <Routes />
		</AppContext.Provider>
	  </ErrorBoundary>
    </div>
  )
);
}

export default App;