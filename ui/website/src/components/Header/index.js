import React from 'react';
import Radium from 'radium';
import styles from './styles.js';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Header extends React.Component {
  render() {
    return <div>
      <nav style={[styles.navbar, styles.gradientBackground]} className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link style={[styles.white]} className="navbar-brand" to='/'>re][cognition</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link style={[styles.white]} to='/gallery'>Gallery</Link></li>
              <li><Link style={[styles.white]} to='/exhibition'>Exhibition</Link></li>
              <li><Link style={[styles.white]} to='/info'>Info</Link></li>
              <li>
                <form className="navbar-form" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>;
  }
}

export default Header;
