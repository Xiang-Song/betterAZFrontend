import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { BAContext } from '../context/BAcontext'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Events = () => {
    const [state, setState] = useContext(BAContext);
    useEffect(()=>{
        const getEvents = async()=>{
            let res = await fetch('https://floating-thicket-57272.herokuapp.com/events');
            if (res.status !== 200) {
                setState(state=>({...state, events: [{Headline: '', Description: '', Date: '', Time: '', Location: ''}]}))
            } else {
                let data = await res.json();
                let eventsList = [];
                for (let item of data){
                    eventsList.push(item);
                }
                setState(state=>({...state, events: eventsList}))
            }
        }
        getEvents();
        window.scrollTo(0, 0);
    },[])

    const today = new Date();
    const checkdate = new Date(today);
    checkdate.setDate(checkdate.getDate() - 2)

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
            <h2 className = 'self-center s-title wg-bg mt-3'>All Future Events</h2><br />
            {state.events.sort((a, b)=>(a.Date > b.Date) ? 1 : -1).filter(e=>new Date(e.Date) > checkdate).map((item)=>{
                return(
                    <Card key={item.id} className='border-none w-bg'>
                        <Card.Title className='dp-jc-center c-title mt-3'>{item.Headline}</Card.Title>
                        <Card.Text className='light-content fs-1h'>
                            <p className='dp-jc-center mb-1'>{item.Description}</p>
                            <p className='dp-jc-center mb-1'>DATE: {item.Date.split('T')[0]} | TIME: {item.Time} @ {item.Location}</p>
                        </Card.Text>
                    </Card>
                )
            })}
            <div><Link to='/home' className='link pad-l-5px'>Back to Home</Link></div>
            
        </div>
    )
}

export default Events
