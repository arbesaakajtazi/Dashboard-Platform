/**
 * Created by ArbesaKajtazi on 17/10/2019.
 */
const palette = {
  light: {
    primary: {
      main: '#3CB9E2',
      light: '#293642',
      dark: '#283642',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#D8F1F9',
      main: '#EAEFF1',
      dark: '#C3EAF7',
      contrastText: '#000000'
    },
    text: {
      default: '#314151',
      primary: '#94A6B8'
    },
    background: {
      primary: '#A3B3C2',
      main: '#D9E0E6',
      dark: '#94A6B8',
      paper: '#fff'
    },
    label: '#D9E0E6',
  },
  dark: {
    primary: {
      main: '#3CB9E2',
      light: '#293642',
      dark: '#283642',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#34576A',
      main: '#334353',
      dark: '#314151',
      contrastText: '#000000'
    },
    text: {
      default: '#314151',
      primary: '#fff'
    },
    background: {
      primary: '#A3B3C2',
      main: '#293642',
      dark: '#94A6B8',
      paper: '#8CA0B3'
    },
  }
}

const theme = (type = 'light') => ({
  type,
  palette: {
    ...palette[type]
  },
  size: {
    displayFontSize: 36,
    headingFontSize: 30,
    subTitleFontSize: 24,
    headerFontSize: 18,
    menuLinks: 16,
    defaultFontSize: 14,
    smallFontSize: 12,
    spacing: 8,
    drawer: 300,
    logoTextIconWidth: 75,
    logoTextIconHeight: 35,
    baseRadius: 4
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Roboto, sans-serif',
    weight: {
      black: 900,
      bold: 700,
      medium: 500,
      regular: 400,
      light: 200
    }
  },
  transitions: {
    common: 'all ease-in-out 300ms'
  },
  zIndex: {
    tooltip: 1100,
    popover: 1010,
    modal: 1000,
    drawer: 901,
    overlay: 900,
  },
  shadows: [
    '0px 4px 8px 0px rgba(0, 0, 0, 0.14)',
    '0px 1px 1px 0px rgba(0, 0, 0, 0.16)',
    '0px 3px 6px 0px rgba(0, 0, 0, 0.16)',
    '0px 3px 10px 0px rgba(0, 0, 0, 0.16)',
    '0px 4px 5px 0px rgba(0, 0, 0, 0.16)',
    '0px 5px 20px 0px rgba(64, 81, 88, 0.16)',
    '0px 3px 7px 0px rgba(0, 0, 0, 0.24)',
    '0px 7px 13px 0px rgba(0, 0, 0, 0.17)',
    '10px 0px 30px 0px rgba(0, 0, 0, 0.30)',
    '0px 18px 32px 0px rgba(0, 0, 0, 0.47)',
    ...Array(15).fill('none').map((n, index) => {
      return `0px ${4 * index}px ${8 * index}px 0px rgba(0, 0, 0, 0.14)`
    })
  ],
  overrides: {
    MuiIconButton: {
     root: {
        padding: 0,
       '&:hover': {
         backgroundColor: 'transparent'
       },
      },
      '& svg': {
        height: 27
      }
    },
    MuiSwitch: {
      root: {
        width: 69,
        height: 41,
        padding: 0,
        borderRadius: 100
      },
      thumb: {
        width: 37,
        height: 37,
        backgroundColor: '#fff'
      },
      track: {
        opacity: 1,
        backgroundColor: '#A3B3C2'
      },
      switchBase: {
        padding: 2,
      },
      colorSecondary: {
        '&$checked': {
          transform: 'translateX(67%)',
          '& + $track': {
            backgroundColor: '#3CB9E2',
            opacity: 1,
          }
        }
      }
    },
    MuiFilledInput: {
      root: {
        borderRadius: 4,
        backgroundColor: '#D9E0E6',
        '&$focused': {
          backgroundColor: '#D9E0E6',
        },
        '&:hover': {
          backgroundColor: '#D9E0E6',
        }
      },
      underline: {
        margin: 0,
        '&:hover:not($focused):not($disabled)': {
          '&:before': {
            borderBottom: 'none',
          }
        },
        '&:hover': {
          borderBottom: 'none',
          '&:before': {
            borderBottom: 'none',
          }
        },
        '&:after': {
          borderBottom: 'none'
        },
        '&:before': {
          borderBottom: 'none'
        }
      },
      input: {
        padding: 16,
        fontSize: 14
      },
      multiline: {
        padding: 16,
        fontSize: 14
      }
    }
  }
})

const Theme = {
  getTheme: (type) => ({
    ...theme(type)
  })
}

export default Theme