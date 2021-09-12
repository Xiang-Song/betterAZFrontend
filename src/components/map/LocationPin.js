import React from 'react'
import { BsGeoAlt } from 'react-icons/bs'

import './map.css'

const LocationPin = ({text, lat, lng, id}) => {
    return (
            <div className = 'icontip'>
                <input type='radio' name='pin' id={lat+lng} className='event-pin-radio'/>
                <BsGeoAlt className='event-icon'/>
                <p className = 'icontiptext'>{text}</p>
            </div>
            
    )
}

export default LocationPin;