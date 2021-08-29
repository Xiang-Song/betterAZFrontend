import React from 'react'
import { ImPencil } from 'react-icons/im'
import { IconContext } from 'react-icons'

import './map.css'

const SignPin = ({text}) => {
    return (
        <IconContext.Provider value={{ color: 'blue', size: '15px' }}>
            <div className = 'icontip'>
                <ImPencil />
                <p className = 'icontiptext'>{text}</p>
            </div>
            
        </IconContext.Provider>
    )
}

export default SignPin;