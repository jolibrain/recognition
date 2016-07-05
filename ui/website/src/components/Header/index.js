import React from 'react';
import { Link } from 'react-router';

function Header() {
  return <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <Link className="navbar-brand" to='/'>re][cognition</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/gallery'>Gallery</Link></li>
            <li><Link to='/exhibition'>Exhibition</Link></li>
            <li><Link to='/info'>Info</Link></li>
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

export default Header;
