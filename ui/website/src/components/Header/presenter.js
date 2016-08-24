/*
Copyright 2016 Fabrica S.P.A., Emmanuel Benazera, Alexandre Girard

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from 'react';
import Radium from 'radium';
import styles from './styles.js';
import SubscribeModal from '../Modals/SubscribeModal';
import SearchInput from './searchInput';

let {Link} = require('react-router');
Link = Radium(Link);

@Radium
class Header extends React.Component {

  state = {
    displaySearch: false
  }

  render() {

    const searchStyles = [
      styles.menuItem,
      styles.searchIcon,
      this.state.displaySearch ? styles.searchIconActivated : ''
    ]

    return <div>
      <nav style={[styles.navbar, styles.gradientBackground]} className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link style={[styles.brand]} className="navbar-brand" to='/'><span style={[styles.brand.re]}>re]</span>[cognition</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className={this.props.path == '/gallery' ? 'menuSelected' : ''}><Link style={[styles.menuItem]} to='/gallery'>Gallery</Link></li>
              <li><Link style={[styles.menuItem]} to='/exhibition'>Exhibition</Link></li>
              <li className={this.props.path == '/info' ? 'menuSelected' : ''}><Link style={[styles.menuItem]} to='/info'>Info</Link></li>
              <li><SubscribeModal/></li>
              <li><span style={searchStyles} className='icon--i_search' onClick={() => {
                this.setState({displaySearch: !this.state.displaySearch})
              }}/></li>
              { this.state.displaySearch ? <SearchInput matches={this.props.matches}/> : ''}
            </ul>
          </div>

        </div>
      </nav>
    </div>;
  }
}

export default Header;
