import React from 'react' 
import { Link } from 'react-router-dom'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import KeyProvisions from '../file/KeyProvisions.pdf'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Provision = () => {
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
            <h2 className = 'self-center s-title wg-bg mt-0 mt-lg-3'>Arizona Voting Rights Initiative</h2>
            <br/>
            <embed src = {KeyProvisions} className = "h-100vh wide-100" />
            <br />
            <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
            
        </div>
    )
}

export default Provision