import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useResults from '../hooks/useResults'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Events = () => {
    const [isHide, setIsHide] = useState([])
    const [state] = useResults();
  
    const today = new Date();
    const AZdate = today.toLocaleString('en-us', {
        timeZone: 'America/Phoenix'
      })
    const tempdate = new Date(AZdate)
    tempdate.setDate(tempdate.getDate() -1 )
    const pureDate = tempdate.toDateString();
    const checkdate = new Date(pureDate)

    const formatDate = (oldDate) =>{
        return oldDate.split('T')[0].split('-')[1]+'-'+oldDate.split('T')[0].split('-')[2]+'-'+oldDate.split('T')[0].split('-')[0]
    }

    const sortCounty = (arr) => {
        let result = [];
        if (arr.indexOf('Maricopa') !== -1){
            result[0] = 'Maricopa';
            arr.splice(arr.indexOf('Maricopa'),1);
        }
        if (arr.indexOf('Pima') !== -1){
            result.push('Pima');
            arr.splice(arr.indexOf('Pima'),1);
        }
        arr.sort((a,b)=>(a > b) ? 1 : -1)
        for (let i of arr){
            result.push(i)
        }
        return result
        }

    const groupBy = (items, key) => items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]:[
            ...(result[item[key]] || []),
            item,
          ]
        }),
        {},
      );

    const eventsByCounty = groupBy(state.events, 'County');

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
            <h2 className = 'self-center s-title wg-bg mt-0 mt-lg-3 mb-3 mb-lg-5'>All Future Events</h2>
            
            {sortCounty(Object.keys(eventsByCounty)).map((k, index)=> {
                return <div key={index}>
                    <p className='dp-jc-between mb-0'>
                        <span className= 'w-10vw'></span>
                        <span className='conuty-title'>Events in {k} county</span> 
                        {isHide.indexOf(index) === -1  
                        ? <span className='mt-1 mt-lg-2 w-10vw dp-jc-end toggle' onClick={()=>setIsHide([...isHide, index])}>Hide</span> 
                        : <span className='mt-1 mt-lg-2 w-10vw dp-jc-end toggle' onClick={()=>setIsHide(isHide.filter((val, i)=> i !== isHide.indexOf(index)))}>Show</span>}   
                    </p>
                    <div className={isHide.indexOf(index) === -1 ? '' : 'hidden'}>
                    {eventsByCounty[k].sort((a, b) => (a.Date > b.Date) ? 1 : -1).filter(e=>new Date(e.Date) > checkdate).map((item)=>{
                        return(
                            <Card key={item.id} className='border-bt w-bg mb-1 mb-lg-5'>
                                <Card.Title className='dp-jc-center c-title mt-1 mt-lg-3'>{item.Headline}</Card.Title>
                                <Card.Text className='light-content fs-1h mb-1'>
                                    <p className='dp-jc-center mb-1'>{item.Description}</p>
                                    <p className='dp-jc-center mb-1'>{formatDate(item.Date)}</p>
                                    <p className='dp-jc-center'>{item.Time} @ {item.Location}</p>
                                </Card.Text>
                                <Card.Text className='italic fs-1h dp-jc-center mb-1 mt-1'>{item.notary ? <span>Notary</span> : null} {item.petition ? <span className="m-l-1vw">Petitions Available for Pick Up </span> : null}</Card.Text>
                            </Card>
                        )
                    })}
                    </div>
                </div>
            })}
            
            <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
        </div>
    )
}

export default Events
