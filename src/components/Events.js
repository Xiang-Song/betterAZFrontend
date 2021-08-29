import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useResults from '../hooks/useResults'
import {Image, Row, Col, Card} from 'react-bootstrap'
import { BiFolderPlus, BiFolderMinus } from 'react-icons/bi'
import Map from './map/Map'
import LocationPin from './map/LocationPin'
import SignPin from './map/SingPin'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Events = () => {
    const [isHide, setIsHide] = useState([])
    const [state] = useResults();

    const groupByLatLng = (items, k1, k2) => {
        let result = {};
        items.forEach((item)=>{
          const key = item[k1] + '-' + item[k2]
          if(result[key]){
            result[key] = [...result[key], item]
          } else {
            result[key] = [item]
          }
        })
        return result
      };

    const filterFirstDate = (obj) =>{
    let result = [];
    for (let k in obj){
        obj[k].sort((a,b)=>a.id > b.id ? 1 : -1);
        result.push(obj[k][0])
      }
    return result;
    }
  
    const today = new Date();
    const AZdate = today.toLocaleString('en-us', {
        timeZone: 'America/Phoenix'
      })
    const tempdate = new Date(AZdate)
    tempdate.setDate(tempdate.getDate() -1 )
    const pureDate = tempdate.toDateString();
    const checkdate = new Date(pureDate)

    const sortedFilteredEvents = state.events.sort((a, b)=>(a.Date > b.Date) ? 1 : -1).filter(e=>new Date(e.Date) > checkdate);

    const uniqueLatLngEvents = groupByLatLng(sortedFilteredEvents, 'Lat', 'Lng');

    const locationListForMap = filterFirstDate(uniqueLatLngEvents);

    const signLocationListForMap = state.locations.filter(item=>(item.Lat !=='' && item.Lat !==''));

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

    const eventsByCounty = groupBy(state.events.filter(e=>new Date(e.Date) > checkdate), 'County');

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
            <Row>
                <Col xs={12} lg={4} className='scrollable'>
                    {sortCounty(Object.keys(eventsByCounty)).map((k, index)=> {
                        return <div key={index}>
                            <p className='dp-jc-between mb-0'>
                                <span className='county-title'>Events in {k}</span> 
                                {isHide.indexOf(index) === -1  
                                ? <span className='mt-1 mt-lg-2 w-10vw dp-jc-center toggle' onClick={()=>setIsHide([...isHide, index])}><BiFolderMinus /></span> 
                                : <span className='mt-1 mt-lg-2 w-10vw dp-jc-center toggle' onClick={()=>setIsHide(isHide.filter((val, i)=> i !== isHide.indexOf(index)))}><BiFolderPlus /></span>}   
                            </p>
                            <div className={isHide.indexOf(index) === -1 ? '' : 'hidden'}>
                            {eventsByCounty[k].sort((a, b) => (a.Date > b.Date) ? 1 : -1).map((item)=>{
                                return(
                                    <Card key={item.id} className='border-bt w-bg mb-1'>
                                        <Card.Title className='dp-jc-start c-title mt-1 mt-lg-3'>{item.Headline} @ {formatDate(item.Date)}</Card.Title>
                                        <Card.Text className='light-content fs-1h mb-0'>
                                            <span className='dp-jc-start mb-1'>{item.Description}</span>
                                            <span className='dp-jc-start mb-0'>{item.Time} @ {item.Location || item.StreetNumber + ' ' + item.StreetName + ', ' + item.City}</span>
                                        </Card.Text>
                                        {item.notary || item.petition ? <Card.Text className='italic fs-1h dp-jc-start mb-3 mt-0'><span>Notary</span><span className="m-l-1vw">Petitions Available for Pick Up </span></Card.Text> : null}
                                    </Card>
                                )
                            })}
                            </div>
                        </div>
                    })}
                 </Col> 
                 <Col xs={12} lg={8}>
                    <div className='event-map'>
                        <Map defaultZoom={8}>
                            {locationListForMap.map((loc)=>{
                                return(
                                    <LocationPin 
                                        key={loc.id}
                                        lat={loc.Lat}
                                        lng={loc.Lng}
                                        text={(loc.Location || (loc.StreetNumber+' '+loc.StreetName+','+loc.City)) + '. Next event at ' + formatDate(loc.Date) + ',' + loc.Time}
                                    />
                                )
                            })}
                            {signLocationListForMap.map((item)=>{
                                        return(
                                            <SignPin 
                                                key={item.id}
                                                lat={item.Lat}
                                                lng={item.Lng}
                                                text={'SIGNING---'+item.Location +', '+item.Address+' on'+item.Hours+' @'+item.Days}
                                            />
                                        )
                                    })}
                        </Map>
                    </div>
                    <div className='dp-jc-start mt-0'><LocationPin /> <span>: event locations</span><span style={{width:'50px'}}></span><SignPin /><span>: signing locations</span></div>
                 </Col>  
            </Row>
                    <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
               
            
            
        </div>
    )
}

export default Events
