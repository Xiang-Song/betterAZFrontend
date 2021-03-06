import React from 'react'
import GoogleMapReact from 'google-map-react'

import './map.css'

const center = {
    lat: 33.68779,
    lng: -112.05971
}

const { REACT_APP_google_key } = process.env

const Map = ({ children, ...props }) => {
    return (
        <div className='google-map'>
            <GoogleMapReact
              bootstrapURLKeys = {{key: REACT_APP_google_key}}
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
