const styles = {
  navbar: {
    border: 0,
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
  searchIcon: {
    position: 'relative',
    top: '15px',
    marginRight: '20px'
  }
}

export default styles;
