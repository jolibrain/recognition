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
const styles = {
  navbarNotXs: {
    border: 0,
    zIndex: 5,
    paddingTop: '17px',
    paddingRight: '32px',
    paddingLeft: '32px'
  },
  xsBackground: {
    background: '#0d1215',
    border: 0
  },
  gradientBackground: {
    background: "-moz-linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)",
    background: "-webkit-linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)",
    background: "linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00000000',GradientType=0 )"
  },
  brand: {
    color: "#FFF",
    fontWeight: 'normal',
    re: {
      position: 'relative',
      top: '-3px'
    },
    ':hover': {
      color: '#0FC'
    }
  },
  menuItem: {
    color: "#FFF",
    textTransform: 'uppercase',
    fontWeight: 'normal',
    marginLeft: '32px',
    letterSpacing: '1.5px',
    ':hover': {
      color: '#0FC'
    }
  },
  menuItemXs: {
    color: "#FFF",
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'none',
      color: '#0FC'
    }
  },
  searchIcon: {
    position: 'relative',
    top: '15px',
    marginRight: '20px',
    cursor: 'pointer'
  },
  searchIconActivated: {
    color: '#0FC'
  },
  searchInput: {
    background: '#0d1215',
    borderStyle: 'dotted',
    borderTop: '0',
    borderLeft: '0',
    borderRight: '0',
    margin: '13px 20px 0 0',
    ':focus': {outline:'none'}
  }
}

export default styles;
