import React from 'react'
import { BsGeoAlt } from 'react-icons/bs'
import { IconContext } from 'react-icons'

import './map.css'

const LocationPin = ({text}) => {
    return (
        <IconContext.Provider value={{ color: 'red', size: '20px' }}>
            <div className = 'icontip'>
                <BsGeoAlt />
                <p className = 'icontiptext'>{text}</p>
            </div>
            
        </IconContext.Provider>
    )
}

export default LocationPin;