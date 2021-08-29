import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Alert, Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import capital_clouds from '../image/capital_clouds.jpg'
import eventsQR from '../image/eventsQR.png'
import useResults from '../hooks/useResults'
import { SocialIcon } from 'react-social-icons'
import Map from './map/Map'
import LocationPin from './map/LocationPin'
import SignPin from './map/SingPin'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Home = () => {

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
    const formatText = (txt, n) =>{
        const shortTxt = txt.slice(0,n).slice(0, txt.slice(0,n).lastIndexOf(' '))
        return (
            shortTxt.match(/<http.*>/)
            ? <>{shortTxt.match(/.*?(?=<http|$)/si)[0]}<a href={shortTxt.match(/<http.*>/)[0].slice(1,-1)} target='_blank'>{shortTxt.match(/<http.*>/)[0].split('//')[1].slice(0,-1)}</a> {shortTxt.match(/>(.*)/s)[1]}</>
            : <>{shortTxt}</>
        )
    }
    
    return (
        <div className='container-fluid pale-blue-bg pt-3 pt-lg-5'>
            <Alert variant='light w-bg' >
                <Alert.Heading className='self-center lg-red-title mb-0'>{state.banner[0].Headline}</Alert.Heading>
            </Alert>
            <Card className= 'relative border-black'>
                <Image src={heading} className='wide-80 m-l-10vw'/>
                <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" className='absolute ab-right-up'>Donate</Button>
                <Button href="https://secure.everyaction.com/x5h8oo6C4ESaRrJFbn_v7w2" target='_blank' variant="danger" className='absolute ab-right-second'>Volunteer</Button>
            </Card>
            
            <Row>
                <Col xs={12} lg={4}  className='pad-l-5vw-r-1vw dp flow-column mt-3 mt-lg-5'>
                    <div>
                        <h3 className = 'self-center s-title wg-bg'>WE CAN STOP THEM.</h3>
                    </div>
                    <Image src={capital_clouds} className='wide-100'/>
                    <div className='yellow-bg pad-l-5px mb-2'>
                        <p className='reg-content fs-1h text-indent'>Today’s Arizona legislature wants to limit your voting rights.</p> 
                        <p className='reg-content fs-1h text-indent'>The Arizona legislature of a century ago gave us the tools to fight back.</p>
                        <p className='reg-content fs-1h text-indent'>Unlike other states whose legislatures are also passing bills to curtail voting rights, Arizona has a constitution that allows the voters themselves either to veto or uphold bills passed by the Legislature and signed by the Governor.</p>
                        <p className='reg-content fs-1h text-indent'>Arizona Deserves Better is organizing a referendum effort to repeal these laws. With your help, we can gather 118,000 signatures in 90 days. Arizonans have stopped unpopular laws before and we can do it again, but we can’t do it without you.</p>
                        <div ><Link to='/bills' className='link'>...Details on the Bills</Link></div>
                    </div>
                    <div className='dp-jc-space'>
                        <Button href="https://secure.everyaction.com/x5h8oo6C4ESaRrJFbn_v7w2" target='_blank' variant="danger" className='wide-45'>Volunteer</Button>
                        <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" className='wide-45'>Donate</Button>
                    </div>
                </Col>
                
                <Col xs={12} lg={8} className='pad-l-1vw-r-5vw mt-3 mt-lg-5'> 
                <h3 className = 'self-center s-title wg-bg'>WHAT'S HOT</h3>
                <div className='w-bg'>
                    {state.news.sort((a, b) => (a.Date < b.Date) ? 1 : -1).slice(0,3).map((item, index)=>{
                        return(
                            item.ImageLink ? 
                            <Card key={index} className='border-none'>
                                <Row className='pad-l-5px'>
                                    <Col xs={12} lg={6}>
                                        <Image src={item.ImageLink} className='img-embed mt-1 mt-lg-4'/>
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <Card.Body>
                                            <Card.Title className='c-title'>{item.Headline}</Card.Title>
                                            <Card.Text className='reg-content fs-1h'>
                                            {formatDate(item.Date)} - {formatText(item.Textbody, 200)}
                                                <Link to={'newsdetails/'+item.id} 
                                                className='link'>
                                                    ...Read More
                                                </Link></Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                            : item.VideoLink ?
                            <Card key={index} className='border-none'>
                                <Row className='pad-l-5px'>
                                    <Col xs={12} lg={6}>
                                        <div className="embed-responsive embed-responsive-16by9">
                                        <iframe title="Embeds Page" className="embed-responsive-item img-embed mt-4" src={"https://www.youtube.com/embed/"+item.VideoLink.split('=')[1]}
                                            allowFullScreen></iframe>
                                        </div>
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <Card.Body>
                                            <Card.Title  className='c-title'>{item.Headline}</Card.Title>
                                            <Card.Text className='reg-content fs-1h'>
                                            {formatDate(item.Date)} - {formatText(item.Textbody, 200)}
                                                <Link to={'newsdetails/'+item.id} 
                                                className='link'>
                                                    ...Read More
                                                </Link></Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                            :
                            <Card key={index} className='border-none'>
                                <Card.Body>
                                    <Card.Title  className='c-title'>{item.Headline}</Card.Title>
                                    <Card.Text className='reg-content fs-1h'>
                                    {formatDate(item.Date)} - {formatText(item.Textbody, 500)}
                                        <Link to={'newsdetails/'+item.id} 
                                        className='link'>
                                            ...Read More
                                        </Link></Card.Text>
                                </Card.Body>
                            </Card>
                            )
                    })}
                    <div ><Link to='/news' className='link'>...MORE NEWS</Link></div>
                </div>
                </Col>
            </Row>

            <Row>
                <Col xs={12} lg={6} className='pad-l-5vw-r-1vw mt-3 mt-lg-5'>
                    <h3 className = 'self-center s-title wg-bg'>WHERE TO SIGN?</h3>
                    <div className=' w-bg mb-1 mb-lg-3'>
                        {state.locations.sort((a, b)=>(a.Priority < b.Priority) ? 1 : -1).slice(0,5).map((item, index)=>{
                            return(
                                <Card key={index} className='border-none'>
                                    <Card.Title className='dp-jc-center c-title mt-4'>{item.Location}</Card.Title>
                                    <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>
                                        HOURS: {item.Hours} {item.Days ? ` | DAYS: ${item.Days}`: null} | COUNTY: {item.County}
                                    </Card.Text>
                                    <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>
                                        {item.Address}
                                    </Card.Text>
                                </Card>
                            )
                        })}
                        <div><Link to='/locations' className='link'>...MORE LOCATIONS</Link></div>
                    </div>
                    <Button href="https://docs.google.com/spreadsheets/d/1RI9TI4f3EOexct1LujvoyoauHmelanS5lhWQyvJK5w8/edit?usp=sharing" target='_blank' variant="outline-danger" className='wide-100 mb-3 mb-lg-5 c-title'>See All Petition Depots</Button>
                    <h3 className = 'self-center s-title wg-bg'>What's on Our Social Media</h3>
                    <div className=' w-bg mb-1'>
                        <Row>
                            <Col xs={10} lg={10} className='pad-sm'>
                            <p><strong>Twitter</strong>: {state.twitter[0].twitter}</p>
                            </Col>
                            <Col xs={2} lg={2} className='dp align-ct pad-left-0 '>
                            <SocialIcon url='https://twitter.com/better_az?lang=en' target ='_blank' style={{height:35, width:35}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} lg={10} className='pad-sm'>
                            <p><strong>Facebook</strong>: {state.facebook[0].facebook}</p>
                            </Col>
                            <Col xs={2} lg={2} className='dp align-ct pad-left-0 '>
                            <SocialIcon url='https://www.facebook.com/azdeservesbetter' target ='_blank' style={{height:35, width:35}}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={12} lg={6} className='pad-l-1vw-r-5vw dp flow-column mt-3 mt-lg-5'>
                    <div>
                        <h3 className = 'self-center s-title wg-bg'>EVENTS</h3>
                        <div className='yellow-bg'>
                            <div className='home-map mb-0'>
                                <Map defaultZoom={7}>
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
                                                text={item.Location +', '+item.Address+' on'+item.Hours+' @'+item.Days}
                                            />
                                        )
                                    })}
                                </Map>
                                <p className='enlargeIcon'>Click to enlarge</p>
                            </div>
                            <div className='dp-jc-start mt-0'><LocationPin /> <span>: event locations</span><span style={{width:'50px'}}></span><SignPin /><span>: signing locations</span></div>
                            <div><Link to='/events' className='link'>...MORE DETAILS AND MORE EVENTS</Link></div>
                            {sortedFilteredEvents.slice(0,4).map((item)=>{
                                return(
                                    <Card key={item.id} className='border-none yellow-bg pad-l-5px mb-1 mb-lg-3'>
                                        <Card.Title className='dp-jc-center c-title mt-3'>{item.Headline}</Card.Title>
                                        <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>{formatDate(item.Date)}</Card.Text>
                                        <Card.Text className='reg-content fs-1h dp-jc-center mb-0'>{item.Time} @ {item.Location || item.StreetNumber + ' ' + item.StreetName + ', ' + item.City}</Card.Text>
                                        <Card.Text className='italic fs-1h dp-jc-center mt-0 mb-1'>{item.notary ? <span>Notary</span> : null} {item.petition ? <span className="m-l-1vw">Petitions Available for Pick Up </span> : null}</Card.Text>
                                    </Card>
                                )
                            })}
                            
                            <div><Link to='/events' className='link'>...MORE DETAILS AND MORE EVENTS</Link></div>
                            
                            
                        </div>
                    </div>
                    <div className='dp-jc-space mt-2'>
                        <Button href="https://secure.everyaction.com/x5h8oo6C4ESaRrJFbn_v7w2" target='_blank' variant="danger" className='wide-45'>Volunteer</Button>
                        <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" className='wide-45'>Donate</Button>
                    </div>
                </Col>
            </Row>
            <div className='mt-3 mb-1 pad-l-5vw-r-1vw dp align-end'>
                <a href='https://linktr.ee/TAGGAZ' target='_blank'><Image src={eventsQR} className='eventsQR mb-0'/></a>
                <p className='mb-0'>Click or Scan to view more Southern AZ events</p>
            </div>

            <footer>
                <Row className='ft-row mt-1 pb-1 pb-lg-5'>
                <hr className='ft-hr mt-3 mb-3'/>
                    <Col xs={10} lg ={10} className='ft-col-l'>
                        <p className='ft-text'>Copyright © 2021 Arizona Deserves Better - All Rights Reserved.</p>
                    </Col>
                </Row>
            </footer>

        </div>
    )
    
}

export default Home
