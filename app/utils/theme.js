/**
 * Created by ArbesaKajtazi on 17/10/2019.
 */
export default class Theme {
  static getTheme() {

    let lightTheme = {
      type: 'light',
      palette: {
        primaryColor: '#3CB9E2',
        secondaryColor: '#C3EAF7',
        thirdColor: '#D8F1F9',
        bgColor: '#EAEFF1',
        navBarBgColor: '#293642',
        modalBg: '#283642',
        buttonBg: '#A3B3C2',
        cardBg: '#FFF',
        searchBg: '#D9E0E6',
        onDragCardBg: '#94A6B8',
        common: {
          white: '#fff',
          black: '#000'
        },
        leadTextColor: '#314151',
        textColor: '#94A6B8',
      },
      size: {
        displayFontSize: 36,
        headingFontSize: 30,
        subTitleFontSize: 24,
        headerFontSize: 18,
        defaultFontSize: 14,
        smallFontSize: 12,
        spacing: 8,
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        secondaryFontFamily: 'Roboto, Medium',
        thirdFontFamily: 'Roboto, Bold',
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
    }

    let darkTheme = {
      type: 'light',
      palette: {
        primaryColor: '#3CB9E2',
        secondaryColor: '#34576A',
        thirdColor: '#314151',
        bgColor: '#334353',
        navBarBgColor: '#293642',
        modalBg: '#283642',
        buttonBg: '#A3B3C2',
        cardBg: '#8CA0B3',
        searchBg: '#293642',
        onDragCardBg: '#94A6B8',
        common: {
          white: '#fff',
          black: '#000'
        },
        leadTextColor: '#314151',
        textColor: '#fff',
      },
      size: {
        displayFontSize: 36,
        headingFontSize: 30,
        subTitleFontSize: 24,
        headerFontSize: 18,
        defaultFontSize: 14,
        smallFontSize: 12,
        spacing: 8,
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        secondaryFontFamily: 'Roboto, Medium',
        thirdFontFamily: 'Roboto, Bold',
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
    }
  }
}