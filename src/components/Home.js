import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Alert, Image, Row, Col, Card} from 'react-bootstrap'
import heading2 from '../image/heading2.jpg'
import capital_clouds from '../image/capital_clouds.jpg'
import useResults from '../hooks/useResults'
import { SocialIcon } from 'react-social-icons'
import Map from './map/Map'
import LocationPin from './map/LocationPin'
import SignPin from './map/SingPin'
import UrlLinkedTxt from './UrlLinkedTxt'
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
        if(txt.match(/<http.*>/)){
            let regex = txt.match(/<http.*>/);
            for (let url of regex){
                if(txt.indexOf(url) < n){
                    n += url.length;
                }
            }
        }
        return txt.slice(0,n).slice(0, txt.slice(0,n).lastIndexOf(' '));
    }

    return (
        <div className='container-fluid pale-blue-bg pt-3 pt-lg-5'>
            <Alert variant='light w-bg' >
                <Alert.Heading className='self-center lg-red-title mb-0'>{state.banner[0].Headline}</Alert.Heading>
            </Alert>
            <Card className= 'relative border-black'>
                <Image src={heading2} className='wide-100 h-25vw'/>
                <a href="https://www.azdemocracy.org/" target='_blank'  className='absolute ab-right-bottom hidden-btn'></a>
            </Card>

            <div className='dp-jc-between mt-3'>
                <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" >Donate</Button>
                <Button href="https://secure.everyaction.com/eYVHBAu8GkebyK9grQc_JQ2" target='_blank' variant="danger" >Volunteer</Button>
                <Button href="https://secure.everyaction.com/JfF1jCxenEa1kYCqxH7BeA2" target='_blank' variant="danger" >Request Petitions</Button>
                <Button href="https://secure.everyaction.com/0XOuuBRLN0qjHJ53ByfzfA2" target='_blank' variant="danger" >Petitions for Group</Button>
                <Button href="https://secure.everyaction.com/0XOuuBRLN0qjHJ53ByfzfA2" target='_blank' variant="danger" >Speaker Request</Button>
                <Button href="https://docs.google.com/forms/d/e/1FAIpQLSd8vetjtIGiVtBPCwPK4V7gmpJZO2YvRSkb2IC_hRLstZdlSg/viewform" target='_blank' variant="danger" >Host an Event</Button>
            </div>
            
            <Row>
                <Col xs={12} lg={4}  className='pad-l-5vw-r-1vw dp flow-column mt-3 mt-lg-5'>
                    <div>
                        <h3 className = 'self-center s-title wg-bg'>WE CAN STOP THEM.</h3>
                    </div>
                    <Image src={capital_clouds} className='wide-100'/>
                    <div className='yellow-bg pad-l-5px mb-2'>
                        <p className='reg-content fs-1h text-indent'><strong>Who We Are</strong>: Arizonans for Fair Elections is a coalition that has filed with the Arizona Secretary of State to circulate petitions to place the Arizona Fair Elections Act on the November 2022 ballot. Arizona Deserves Better, which co-wrote the Initiative, is responsible for organizing volunteers to circulate petitions. The Arizona Democracy Collaborative is responsible for paid circulators working on the Initiative.</p>
                        <p className='reg-content fs-1h text-indent'>Today’s Arizona legislature wants to limit your voting rights.</p> 
                        <p className='reg-content fs-1h text-indent'>The Arizona legislature of a century ago gave us the tools to fight back.</p>
                        <p className='reg-content fs-1h text-indent'>Unlike other states whose legislatures are also passing bills to curtail voting rights, Arizona has a constitution that allows the voters themselves to put an Initiative on the ballot to change the law.</p>
                        <p className='reg-content fs-1h text-indent'>Arizona Deserves Better is partnering with other organizations to place a Voting Rights Initiative on the 2022 ballot. With your help, we can gather the 60,000 signatures we need to provide by the end of June. (Other better funded groups are committed to providing the other 200,000 signatures needed.) We can have one of the best voting laws in the country. We just need to do it.</p>
                        <div className='dp-jc-between m-r-1vw'>
                            <Link to='/provisions' className='link'>Key Provisions</Link>
                            <Link to='/initiative' className='link'>Full text of Initiative</Link>
                        </div>
                    </div>
                    <div className='dp-jc-space'>
                        <Button href="https://secure.everyaction.com/eYVHBAu8GkebyK9grQc_JQ2" target='_blank' variant="danger" className='wide-45'>Volunteer</Button>
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
                                            {formatDate(item.Date)} - <UrlLinkedTxt str={formatText(item.Textbody, 200)}/>
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
                                            {formatDate(item.Date)} - <UrlLinkedTxt str={formatText(item.Textbody, 200)}/>
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
                                    {formatDate(item.Date)} - <UrlLinkedTxt str={formatText(item.Textbody, 500)}/>
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
                    <div className=' w-bg mb-1 mb-lg-3 pb-2'>
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
                        <div className='mt-3'>
                        <p className='dp-jc-center c-title mt-4'>ALSO AVAILABLE AT:</p> 
                        {/* <div className='dp-jc-center'>
                        <Button href='https://secure.everyaction.com/JfF1jCxenEa1kYCqxH7BeA2' target='_blank' variant="danger" className='wide-45'>Arrange to Sign At Home</Button>
                        </div>   */}
                        </div>
                    </div>
                    
                    {/* <Button href="https://docs.google.com/spreadsheets/d/1RI9TI4f3EOexct1LujvoyoauHmelanS5lhWQyvJK5w8/edit?usp=sharing" target='_blank' variant="outline-danger" className='wide-100 mb-3 mb-lg-5 c-title'>See All Petition Depots</Button> */}

                    <h3 className = 'self-center s-title wg-bg'>What's on Our Social Media</h3>
                    <div className=' w-bg mb-1'>
                        
                        <Row className='pad-sm'> 
                        <p className='mb-0'> 
                        <SocialIcon url='https://twitter.com/arizona_better' target ='_blank' style={{height:35, width:35, marginRight: '20px'}}  className='higher'/>
                        {state.twitter[0].twitter.match(/<http.*>/) ?
                        <span className='text-indent reg-content'>{state.twitter[0].twitter.match(/.*?(?=<http|$)/i)[0]}<a href={state.twitter[0].twitter.match(/<http.*>/)[0].slice(1,-1)} target='_blank' className='break-word'>{state.twitter[0].twitter.match(/<http.*>/)[0].split('//')[1].slice(0,-1)}</a> {state.twitter[0].twitter.match(/>(.*)/)[1]}</span>
                        : <span className='text-indent reg-content'>{state.twitter[0].twitter}</span>
                        }</p>
                        </Row>
                        <Row className='pad-sm'> 
                        <p> 
                        <SocialIcon url='https://www.facebook.com/azdeservesbetter' target ='_blank' style={{height:35, width:35, marginRight: '20px'}} className='higher'/>
                        {state.facebook[0].facebook.match(/<http.*>/) ?
                        <span className='text-indent reg-content'>{state.facebook[0].facebook.match(/.*?(?=<http|$)/i)[0]}<a href={state.facebook[0].facebook.match(/<http.*>/)[0].slice(1,-1)} target='_blank' className='break-word'>{state.facebook[0].facebook.match(/<http.*>/)[0].split('//')[1].slice(0,-1)}</a> {state.facebook[0].facebook.match(/>(.*)/)[1]}</span>
                        : <span className='text-indent reg-content'>{state.facebook[0].facebook}</span>
                        }</p>
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
                                                text={'SIGNING---'+item.Location +', '+item.Address+' on'+item.Hours+' @'+item.Days}
                                            />
                                        )
                                    })}
                                </Map>
                                <p className='enlargeIcon'>Click to enlarge</p>
                            </div>
                            <div className='dp-jc-start mt-0 legend'><LocationPin /> <span>: event locations</span><span style={{width:'50px'}}></span><SignPin /><span>: signing locations</span></div>
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
                            {/* <div className='dp-jc-between align-end'>
                                <div><Link to='/events' className='link'>...MORE DETAILS AND MORE EVENTS</Link></div>
                                <div className='m-r-1vw mb-1 ft-text'>
                                    <p className='mb-0'>click/scan to view</p>
                                    <a href='https://linktr.ee/TAGGAZ' target='_blank'><Image src={eventsQR} className='eventsQR mb-0'/></a>
                                    <p className='mb-0'>Southern AZ events</p>
                                </div>
                            </div> */}
                            
                            
                        </div>
                    </div>
                    <div className='dp-jc-space mt-2'>
                        <Button href="https://secure.everyaction.com/eYVHBAu8GkebyK9grQc_JQ2" target='_blank' variant="danger" className='wide-45'>Volunteer</Button>
                        <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" className='wide-45'>Donate</Button>
                    </div>
                </Col>
            </Row>

            <footer>
                <Row className='ft-row mt-1 pb-1 pb-lg-5'>
                <hr className='ft-hr mt-3 mb-3'/>
                    <Col xs={12} lg ={6} className='ft-col-l'>
                        <p className='ft-text check-address'>You can mail a check to: </p> 
                        <p className='ft-text check-address'>Arizona Deserves Better </p> 
                        <p className='ft-text check-address'>c/o Eric Kramer </p> 
                        <p className='ft-text check-address'>1910 Douglas Fir Dr </p> 
                        <p className='ft-text check-address'>Pinetop, AZ 85935-8708 </p>    
                    </Col>
                    <Col xs={12} lg ={6} className='ft-col-l copyright'>
                        <p className='ft-text'>Copyright © 2021 Arizona Deserves Better - All Rights Reserved.</p>
                    </Col>
                </Row>
            </footer>

        </div>
    )
    
}

export default Home
