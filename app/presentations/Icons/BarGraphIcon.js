import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const BarGraphIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 24 24'}>
      <path id="bar_chart"
            d="M19.027,18.625H17.811V12.263a.564.564,0,0,0-.572-.572H13.022a.564.564,0,0,0-.572.572v6.363H11.234V5.972a.564.564,0,0,0-.572-.572H6.588a.564.564,0,0,0-.572.572V18.625H4.872A.564.564,0,0,0,4.3,19.2a.526.526,0,0,0,.572.572H19.027a.572.572,0,1,0,0-1.144Zm-11.939,0V6.472h3.146V18.554H7.088Zm6.505,0V12.835h3.146v5.791Z"
            transform="translate(-4.3 -5.4)" fill="#314151"/>
    </SvgIcon>
  )
}

export default BarGraphIcon