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
      bottom: 0,
      width: '100%',
      height: '30px'
    };

    const footerContainer = {
      margin: 0
    };

    const footerLink = {
      color: '#aaa',
      marginRight: '20px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      ':hover': {
        color: '#aaa',
        textDecoration: 'none'
      }
    };

    return (<footer className="footer" style={footerStyle}>
      <div className="container" style={footerContainer}>
        <p className="text-muted">
          <a style={footerLink} href="http://www.tate.org.uk/about/who-we-are/policies-and-procedures/website-terms-use" target="_blank">Terms</a>
          <a style={footerLink} href="http://www.tate.org.uk/about/who-we-are/policies-and-procedures/website-terms-use/privacy-and-use-cookies" target="_blank">Privacy & Cookies</a>
          <a style={footerLink} href="http://www.tate.org.uk/about/contact-us" target="_blank">Contact</a>
        </p>
      </div>
    </footer>);
  }
}

export default Footer;
