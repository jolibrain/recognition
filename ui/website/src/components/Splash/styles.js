const styles = {
  bg: {
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1,
    filter: "blur(5px) brightness(80%)"
  },
  imgTate: {

  },
  mainTitle: {
    fontSize: '2.5em',
    color: '#FFF',
    textAlign: 'center',
    marginTop: '200px'
  },
  column: {
    color: '#FFF',
    h2: {
      borderBottom: '2px dotted #FFF',
      fontSize: '14px',
      fontWeight: 'bold',
      paddingBottom: '8px',
      textTransform: 'uppercase'
    },
    h3: {
      fontSize: '14px',
      textDecoration: 'underline'
    },
    ul: {
      padding: 0,
      li: {
        listStyle: 'none'
      }
    }
  },
  gray: {
    color: '#4a4a4a'
  },
  black: {
    color: '#0d1215'
  },
  green: {
    color: '#00ffcc'
  },
  footer: {
    bottom: '20px',
    position: 'absolute',
    width: '100%',
    galleryLinkContainer: {
      textAlign: 'center'
    },
    galleryLink: {
      color: '#FFF',
      ':hover': {
        textDecoration: 'none',
        color: '#00ffcc'
      }
    },
    arrowDown: {
      fontSize: '20px'
    }
  }
}

export default styles;
