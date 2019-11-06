import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const SearchIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 30 10'}>
      <g>
        <path xmlns="http://www.w3.org/2000/svg"
              id="search_large"
              d="M19.924,17.283l-2.2-2.494a7.892,7.892,0,0,0,.954-3.154,7.628,7.628,0,0,0-7.042-8.142,7.655,7.655,0,0,0-8.142,7.042,7.628,7.628,0,0,0,7.042,8.142h.513a7.5,7.5,0,0,0,3.961-1.1l1.907,2.2a1.847,1.847,0,0,0,1.467.66A1.992,1.992,0,0,0,19.631,20a2.276,2.276,0,0,0,.66-1.32A1.838,1.838,0,0,0,19.924,17.283Zm-9.316.22a6.452,6.452,0,0,1-6.015-6.968A6.43,6.43,0,0,1,11.048,4.52h.44A6.452,6.452,0,0,1,17.5,11.488a6.562,6.562,0,0,1-2.2,4.474A6.3,6.3,0,0,1,10.608,17.5Zm8.362,1.614a.8.8,0,0,1-1.1-.073l-1.907-2.127.073-.073a4.937,4.937,0,0,0,1.027-1.1l1.981,2.274a.833.833,0,0,1,.22.587A.932.932,0,0,1,18.97,19.117Z"
              transform="translate(-3.474 -3.473)" fill="#94a6b8"/>
      </g>
    </SvgIcon>
  )
}
export default SearchIcon

