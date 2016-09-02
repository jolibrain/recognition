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
    displaySearch: false,
    displayMenu: false
  }

  render() {

    const searchStyles = [
      styles.menuItem,
      styles.searchIcon,
      this.state.displaySearch ? styles.searchIconActivated : ''
    ]

    return <div className='header'>
      <nav style={[styles.navbarNotXs, styles.gradientBackground]} className="navbar navbar-default navbar-fixed-top hidden-xs">
        <div className="container-fluid">

          <div className="navbar-header">
            <Link style={[styles.brand]} className="navbar-brand" to='/'>
              <span style={[styles.brand.re]}>re]</span>[cognition
            </Link>
          </div>

          <div>
            <ul className="nav navbar-nav navbar-right">
              <li className={this.props.path == '/gallery' ? 'menuSelected' : ''}><Link style={[styles.menuItem]} to='/gallery'>Gallery</Link></li>
              <li><a key="tate-link-header" href="http://www.tate.org.uk/whats-on/tate-britain/exhibition/recognition" style={[styles.menuItem]} target="_blank" rel="noopener noreferrer">AT TATE BRITAIN</a></li>
              <li className={this.props.path == '/info' ? 'menuSelected' : ''}><Link style={[styles.menuItem]} to='/info'>Info</Link></li>
              <li style={{marginTop:'16px', marginLeft: '32px'}}><SubscribeModal/></li>
              <li><span key="search-not-xs" style={searchStyles} className='icon--i_search' onClick={() => {
                this.setState({displaySearch: !this.state.displaySearch})
              }}/></li>
              { this.state.displaySearch ? <li><SearchInput matches={this.props.matches}/></li> : ''}
            </ul>
          </div>

        </div>
      </nav>

      <nav style={[styles.xsBackground]} className="navbar navbar-default navbar-fixed-top visible-xs">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" aria-expanded="false" onClick={() => this.setState({displayMenu: !this.state.displayMenu})}>
            { this.state.displayMenu ?
              (<img src="/img/icons/close.png" alt="close" className="closeButton"/>)
              :
              (<div>
                <span key="toggle-1" className="sr-only">Toggle navigation</span>
                <span key="toggle-2" className="icon-bar"/>
                <span key="toggle-3" className="icon-bar"/>
                <span key="toggle-4" className="icon-bar"/>
              </div>)
            }
            </button>
            <Link style={[styles.brand]} className="navbar-brand" to='/gallery'>
              <img src="/img/logos/recognition.png" alt="recognition"/>
            </Link>
          </div>

          <div className={ this.state.displayMenu ? "collapse in" : "hidden" } aria-expanded={this.state.displayMenu ? "true" : "false"}>
            <ul className="nav navbar-nav" style={{listStyle: 'none', fontFamily: 'TateNewPro', paddingLeft: '30px', fontSize: '13px'}}>
              <li className={this.props.path == '/gallery' ? 'menuSelected' : ''}><Link style={[styles.menuItemXs]} to='/gallery' onClick={() => this.setState({displayMenu: false})}>Gallery</Link></li>
              <li className={this.props.path == '/info' ? 'menuSelected' : ''}><Link style={[styles.menuItemXs]} to='/info' onClick={() => this.setState({displayMenu: false})}>Info</Link></li>
              <li><a key="tate-link-header-xs" href="http://www.tate.org.uk/whats-on/tate-britain/exhibition/recognition" style={[styles.menuItemXs]} target="_blank" rel="noopener noreferrer">AT TATE BRITAIN</a></li>
              <li style={{paddingBottom: '8px', marginTop: '8px', marginLeft: '15px'}}><SubscribeModal/></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>;
  }
}

export default Header;
