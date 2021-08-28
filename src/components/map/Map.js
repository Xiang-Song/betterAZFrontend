import React from 'react'
import GoogleMapReact from 'google-map-react'
import { BsGeoAlt } from 'react-icons/bs'
import { IconContext } from 'react-icons'

import './map.css'



const center = {
    lat: 33.68779,
    lng: -112.05971
}

const Map = ({ children, ...props }) => {
    return (
        <div className='google-map'>
            <GoogleMapReact
              bootstrapURLKeys = {{key: 'AIzaSyD4neQZLTHrPhfllrfnIzJNU1e4UwDRp6s'}}
              defaultCenter={center}
              {...props}
            >
                {children}
            </GoogleMapReact>
        </div>
    )
}

// Map.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.node,
//         PropTypes.arrayOf(PropTypes.node),
//     ]),
//     };

// Map.defaultProps = {
//     children: null,
//     };

export default Map
