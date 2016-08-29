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
  navbar: {
    border: 0,
    zIndex: 5
  },
  gradientBackground: {
    background: "-moz-linear-gradient(top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0) 100%)",
    background: "-webkit-linear-gradient(top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 55%,rgba(0,0,0,0) 100%)",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 55%,rgba(0,0,0,0) 100%)",
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
    fontWeight: 'bold',
    marginLeft: '20px',
    ':hover': {
      color: '#0FC'
    }
  },
  fullHeight: {
    row: {
      height: "100vh",
    },
    col: {
      height: "100%",
    },
    img: {
      maxHeight: "45vh",
      verticalAlign: "top",
      maxWidth: "100%"
    }
  },
  h2: {
    borderBottom: '2px dotted #FFF',
    fontSize: '14px',
    fontWeight: 'bold',
    paddingBottom: '8px',
    textTransform: 'uppercase'
  },
  ul: {
    padding: 0,
    li: {
      listStyle: 'none',
      textTransform: 'uppercase'
    }
  },
  share: {},
  imgDescription: {
    textAlign: 'left',
    color: '#4a4a4a',
    letterSpacing: '1.5px',
    fontSize: '13px',
    fontFamily: 'TateNewPro',
    fontWeight: 'normal'
  },
  footer: {
    zIndex: 1000,
    bottom: '20px',
    position: 'absolute',
    width: '100%',
    galleryLinkContainer: {
      textAlign: 'center'
    },
    galleryLink: {
      color: '#FFF',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'none',
        color: '#00ffcc'
      }
    },
    arrowDown: {
      fontSize: '20px'
    }
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  table: {
    width: '350px',
    fontSize: '12px',
    textTransform: 'uppercase',
    marginBottom: '40px',
    header: {
      borderBottom: '1px dotted #fff',
    },
    row: {
      padding: '0px 3px !important'
    },
    leftColumn: {
      width: '250px'
    },
    headerCell: {
      padding: '3px 0px 12px 0px'
    },
    firstRowCell: {
      padding: '12px 0px 3px 0px'
    },
    cell: {
      padding: '3px 0px'
    }
  }
}

export default styles;
