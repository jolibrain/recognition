const styles = {
  navbar: {
    border: 0,
  },
  gradientBackground: {
    background: "-moz-linear-gradient(top, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
    background: "-webkit-linear-gradient(top, rgba(0,0,0,1) 10%,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)",
    background: "linear-gradient(to bottom, rgba(0,0,0,1) 10%,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00000000',GradientType=0 )"
  },
  brand: {
    color: "#FFF"
  },
  menuItem: {
    color: "#FFF",
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginLeft: '20px'
  },
  searchIcon: {
    position: 'relative',
    top: '15px',
    marginRight: '20px'
  }
}

export default styles;
