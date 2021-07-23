import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { BAContext } from '../context/BAcontext'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Locations = () => {
    const [state, setState] = useContext(BAContext);
    useEffect(()=>{
        const getLocations = async()=>{
            let res = await fetch('https://floating-thicket-57272.herokuapp.com/locations');
            if (res.status !== 200) {
                setState(state=>({...state, locations: [{Location: '', Address: '', Hours: '', Days: '', Priority: '', County: ''}]}))
            } else {
                let data = await res.json();
                let locationsList = [];
                for (let item of data){
                    locationsList.push(item);
                }
                setState(state=>({...state, locations: locationsList}))
            }
        }
        getLocations();
        window.scrollTo(0, 0);
    },[])

    return (
        <div className='w-bg wide-90 m-l-5vw'>
            <Card className= 'relative border-none mt-3'>
                <Row>
                    <Col xs lg = '4'>
                    <Image src={heading} className='w-30vw'/>
                    </Col>
                    <Col xs lg = '8'>
                        <Card.Body className='dp-jc-end mt-3'>
                            <Link to='/home' className='link'>Home</Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <h2 className = 'self-center s-title wg-bg mt-3'>All Available Sign Locations</h2><br />
            {state.locations.sort((a, b)=>(a.Priority < b.Priority) ? 1 : -1).map((item)=>{
                        return(
                            <Card key={item.id} className='border-none w-bg'>
                                <Card.Title className='dp-jc-center c-title mt-4'>{item.Location}</Card.Title>
                                <Card.Text className='light-content fs-1h'>
                                    <p className='dp-jc-center mb-1'>HOURS: {item.Hours} | DAYS: {item.Days} | COUNTY: {item.County}</p>
                                    <p className='dp-jc-center mb-1'>ADDRESS: {item.Address}</p>
                                </Card.Text>
                            </Card>
                        )
                    })}
            <div><Link to='/home' className='link pad-l-5px'>Back to Home</Link></div>
            
        </div>
    )
}

export default Locations
