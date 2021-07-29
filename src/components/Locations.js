import React from 'react'
import { Link } from 'react-router-dom'
import useResults from '../hooks/useResults'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Locations = () => {
    const [state] = useResults();
  

    return (
        <div className='w-bg wide-90 m-l-5vw'>
            <Card className= 'relative border-none mt-3'>
                <Row>
                    <Col xs lg = '4'>
                    <Link to='/'><Image src={heading} className='w-30vw'/></Link>
                    </Col>
                    <Col xs lg = '8'>
                        <Card.Body className='dp-jc-end mt-0 mt-lg-3 pt-1'>
                            <Link to='/' className='link'>Home</Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <h2 className = 'self-center s-title wg-bg mt-0 mt-lg-3'>All Available Sign Locations</h2>
            {state.locations.sort((a, b)=>(a.Priority < b.Priority) ? 1 : -1).map((item)=>{
                        return(
                            <Card key={item.id} className='border-none w-bg'>
                                <Card.Title className='dp-jc-center c-title mt-2 mt-lg-4'>{item.Location}</Card.Title>
                                <Card.Text className='light-content fs-1h'>
                                    <p className='dp-jc-center mb-1'>HOURS: {item.Hours} | DAYS: {item.Days} | COUNTY: {item.County}</p>
                                    <p className='dp-jc-center mb-1'>{item.Address}</p>
                                </Card.Text>
                            </Card>
                        )
                    })}
            <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
            
        </div>
    )
}

export default Locations
