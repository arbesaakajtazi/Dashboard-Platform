import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const FilterIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 24 24'}>
      <g xmlns="http://www.w3.org/2000/svg" id="filters" transform="translate(-5 -7.6)">
        <path id="Path_1" data-name="Path 1"
              d="M13.3,26.2a1.854,1.854,0,0,1-.7-.2,1.1,1.1,0,0,1-.6-1V16.4L5.4,9.8a1.238,1.238,0,0,1-.3-1.4,1.3,1.3,0,0,1,1.2-.8H24.5a1.3,1.3,0,0,1,1.2.8,1.238,1.238,0,0,1-.3,1.4l-6.6,6.6v6.4a1.525,1.525,0,0,1-.7,1.2l-4.3,2.1A.749.749,0,0,1,13.3,26.2Zm-.1-1.4ZM6.8,9.1l6.5,6.5a.764.764,0,0,1,.2.5v8.5l3.9-1.9V16.1a.764.764,0,0,1,.2-.5L24,9.1Zm17.7,0Z"
              fill="#314151"/>
      </g>
    </SvgIcon>
  )
}

export default FilterIcon