import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../styles/navbar.module.scss';
import { Link } from 'react-router-dom';
import { AppBar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends Component {
  
  handleChange = () => {
    this.props.history.push('/');
  }

  render() {

    return (
      <AppBar position="static">
        <div className={styles.container}>
          <IconButton edge="start" color="inherit" aria-label="menu" className={styles.home_container} onClick={this.handleChange}>
            <MenuIcon />
          </IconButton>
          <div className={styles.child_container}>
            <Link className={styles.highlight_links} color="inherit" to="/login">Login</Link>
            <Link className={styles.highlight_links} color="inherit" to="/signup">Sign Up</Link>
          </div>
        </div>
      </AppBar>
    )
  }
}

export default withRouter(Navbar);