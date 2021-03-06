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

class Footer extends React.Component {

  render() {

    const footerStyle= {
      position: 'fixed',
      bottom: '0px',
      width: '100%'
    };

    const footerContainer = {
      marginTop: '17px',
      marginRight: '17px',
      marginBottom: '24px',
      marginLeft: '32px'
    };

    const footerContainerXs = {
      marginTop: '17px',
      marginRight: '0px',
      marginBottom: '24px',
      marginLeft: '17px'
    };

    const footerLink = {
      fontFamily: 'TateNewPro',
      fontSize: '13px',
      letterSpacing: '1.5px',
      fontWeight: 'normal',
      color: '#4a4a4a',
      marginRight: '32px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      ':hover': {
        color: '#aaa',
        textDecoration: 'none'
      }
    };

    const footerLinkXs = {
      fontFamily: 'TateNewPro',
      fontSize: '13px',
      letterSpacing: '1.5px',
      fontWeight: 'normal',
      color: '#4a4a4a',
      marginRight: '15px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      ':hover': {
        color: '#aaa',
        textDecoration: 'none'
      }
    };

    return (<footer className="footer mainFooter">
      <div className="fluid-container visible-xs" style={footerContainerXs}>
        <p className="text-muted">
          <a style={footerLinkXs} href="http://www.tate.org.uk/about/who-we-are/policies-and-procedures/website-terms-use" target="_blank" rel="noopener noreferrer">Terms</a>
          <a style={footerLinkXs} href="http://www.tate.org.uk/about/who-we-are/policies-and-procedures/website-terms-use/privacy-and-use-cookies" target="_blank" rel="noopener noreferrer">Privacy & Cookies</a>
          <a style={footerLinkXs} href="http://www.tate.org.uk/about/contact-us" target="_blank" rel="noopener noreferrer">Contact</a>
        </p>
      </div>
      <div className="fluid-container hidden-xs" style={footerContainer}>
        <p className="text-muted">
          <a style={footerLink} href="http://www.tate.org.uk/about/who-we-are/policies-and-procedures/website-terms-use" target="_blank" rel="noopener noreferrer">Terms</a>
          <a style={footerLink} href="http://www.tate.org.uk/about/who-we-are/policies-and-procedures/website-terms-use/privacy-and-use-cookies" target="_blank" rel="noopener noreferrer">Privacy & Cookies</a>
          <a style={footerLink} href="http://www.tate.org.uk/about/contact-us" target="_blank" rel="noopener noreferrer">Contact</a>
        </p>
      </div>
    </footer>);
  }
}

export default Footer;
