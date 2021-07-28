import React from 'react'
import { Link } from 'react-router-dom'
import useResults from '../hooks/useResults'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Events = () => {
    const [state] = useResults();
  
    const today = new Date();
    const checkdate = new Date(today);
    checkdate.setDate(checkdate.getDate() - 2)

    return (
        <div className='w-bg wide-90 m-l-5vw'>
            <Card className= 'relative border-none mt-3'>
                <Row>
                    <Col xs lg = '4'>
                    <Link to='/home'><Image src={heading} className='w-30vw'/></Link>
                    </Col>
                    <Col xs lg = '8'>
                        <Card.Body className='dp-jc-end mt-0 mt-lg-3 pt-1'>
                            <Link to='/home' className='link'>Home</Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <h2 className = 'self-center s-title wg-bg mt-0 mt-lg-3'>All Future Events</h2>
            {state.events.sort((a, b)=>(a.Date > b.Date) ? 1 : -1).filter(e=>new Date(e.Date) > checkdate).map((item)=>{
                return(
                    <Card key={item.id} className='border-none w-bg'>
                        <Card.Title className='dp-jc-center c-title mt-3'>{item.Headline}</Card.Title>
                        <Card.Text className='light-content fs-1h'>
                            <p className='dp-jc-center mb-1'>{item.Description}</p>
                            <p className='dp-jc-center mb-1'>{item.Date.split('T')[0].split('-')[1]}-{item.Date.split('T')[0].split('-')[2]}-{item.Date.split('T')[0].split('-')[0]}</p>
                            <p className='dp-jc-center mb-1'>{item.Time} @ {item.Location}</p>
                        </Card.Text>
                    </Card>
                )
            })}
            <div><Link to='/home' className='link pad-l-5px'>Back to Home</Link></div>
        </div>
    )
}

export default Events
