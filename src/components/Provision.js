import React from 'react' 
import { Link } from 'react-router-dom'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
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
            <p> <strong>*</strong> Automatic Voter Registration for driver’s license applicants, high school students and others</p>
            <p> <strong>*</strong> Expanded online registration, expanded early voting, allows election day registration</p>
            <p> <strong>*</strong> Restores Permanent Early Voting List; government and college IDs accepted</p>
           
            <p> <strong>*</strong> Ballots count if post-marked by election day, five business days to cure missing signatures</p>
            <p> <strong>*</strong> Allows voting at any polling location in county; Allows giving voted mail ballots to neighbors or others to turn in</p>
            <p> <strong>*</strong> Prohibits Legislature from expanding ID requirements; Prohibits Legislature from stealing Arizona’s Electoral Voters</p>

            <p> <strong>*</strong> Severely restricts so-called “audits”; felony to turn ballots over to unqualified people; limits on lobbyists</p>
            <p> <strong>*</strong> Lower limits for political contributions; Increases funding for Clean Election candidates; Increases spending limits </p>

            <p> <strong>*</strong> Protects Initiative, Referendum and Recall by removing unnecessarily restrictive requirements</p>
            <p> <strong>*</strong> Expands rights and services for disabled voters; Allows grants to election departments for specified needs</p>
            <p> <strong>*</strong> Requires consultation with Tribes on placement of voting locations on Indian Land</p>

            <br />
            <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
            
        </div>
    )
}

export default Provision