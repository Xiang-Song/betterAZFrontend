import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Alert, Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import useResults from '../hooks/useResults'
import { SocialIcon } from 'react-social-icons';
import api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Home = () => {

    const [state, setState] = useResults();
    
    const getNewsDetail = async (id) =>{
        localStorage.setItem('newsId', id );
        let res = await api.get('/news/' + id);
        if (res.status !== 200) {
            setState(state=>({...state, detailNews:{}, error:'This news is not available now!'}))
        } else {
            setState (state=>({...state, detailNews:res.data[0]}))
        }
    }

    const today = new Date();
    const checkdate = new Date(today);
    checkdate.setDate(checkdate.getDate() - 2)
    
    return (
        <div className='container-fluid pale-blue-bg pt-3 pt-lg-5'>
            <Alert variant='light w-bg' >
                <Alert.Heading className='self-center lg-red-title mb-0'>{state.banner[0].Headline}</Alert.Heading>
            </Alert>
            <Card className= 'relative border-black'>
                <Image src={heading} className='wide-80 m-l-10vw'/>
                <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" className='absolute ab-right-up'>Donate</Button>
                <Button href="https://secure.everyaction.com/x5h8oo6C4ESaRrJFbn_v7w2" target='_blank' variant="danger" className='absolute ab-right-second'>Voluteer</Button>
            </Card>
            
            <Row>
                <Col xs={12} lg={4}  className='pad-l-5vw-r-1vw dp flow-column mt-3 mt-lg-5'>
                    <div>
                        <h3 className = 'self-center s-title wg-bg'>WE CAN STOP THEM.</h3>
                    </div>
                    <div className='yellow-bg pad-l-5px mb-2'>
                        <p className='reg-content fs-1h text-indent'>Today’s Arizona legislature wants to limit your voting rights.</p> 
                        <p className='reg-content fs-1h text-indent'>The Arizona legislature of a century ago gave us the tools to fight back.</p>
                        <p className='reg-content fs-1h text-indent'>Unlike other states whose legislatures are also passing bills to curtail voting rights, Arizona has a constitution that allows the voters themselves either to veto or uphold bills passed by the Legislature and signed by the Governor.</p>
                        <p className='reg-content fs-1h text-indent'>Arizona Deserves Better is organizing a referendum effort to repeal these laws. With your help, we can gather 118,000 signatures in 90 days. Arizonans have stopped unpopular laws before and we can do it again, but we can’t do it without you.</p>
                    </div>
                    <div className='dp-jc-space'>
                        <Button href="https://secure.everyaction.com/x5h8oo6C4ESaRrJFbn_v7w2" target='_blank' variant="danger" className='wide-45'>Voluteer</Button>
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
                                            {item.Date.split('T')[0].split('-')[1]}-{item.Date.split('T')[0].split('-')[2]}-{item.Date.split('T')[0].split('-')[0]} - {item.Textbody.substring(0,200)}
                                                <Link to={'newsdetails/'+item.id} 
                                                onClick={()=>getNewsDetail(item.id)} 
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
                                            {item.Date.split('T')[0].split('-')[1]}-{item.Date.split('T')[0].split('-')[2]}-{item.Date.split('T')[0].split('-')[0]} - {item.Textbody.substring(0,200)}
                                                <Link to={'newsdetails/'+item.id} 
                                                onClick={()=>getNewsDetail(item.id)} 
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
                                    {item.Date.split('T')[0].split('-')[1]}-{item.Date.split('T')[0].split('-')[2]}-{item.Date.split('T')[0].split('-')[0]} - {item.Textbody.substring(0,200)}
                                                <Link to={'newsdetails/'+item.id} 
                                                onClick={()=>getNewsDetail(item.id)} 
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
                    <div className=' w-bg mb-3 mb-lg-5'>
                        {state.locations.sort((a, b)=>(a.Priority < b.Priority) ? 1 : -1).slice(0,5).map((item, index)=>{
                            return(
                                <Card key={index} className='border-none'>
                                    <Card.Title className='dp-jc-center c-title mt-4'>{item.Location}</Card.Title>
                                    <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>
                                        HOURS: {item.Hours} | DAYS: {item.Days} | COUNTY: {item.County}
                                    </Card.Text>
                                    <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>
                                        {item.Address}
                                    </Card.Text>
                                </Card>
                            )
                        })}
                        <div><Link to='/locations' className='link'>...MORE LOCATIONS</Link></div>
                    </div>
                    <h3 className = 'self-center s-title wg-bg'>What's on Our Social Media</h3>
                    <div className=' w-bg mb-3 mb-lg-5'>
                        <Row>
                            <Col xs={10} lg={10} className='pad-1113-vw'>
                            <p><strong>Twitter</strong>: {state.twitter[0].twitter}</p>
                            </Col>
                            <Col xs={2} lg={2} className='dp align-bt pad-icon'>
                            <SocialIcon url='https://twitter.com/better_az?lang=en' target ='_blank' style={{height:35, width:35}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} lg={10} className='pad-1113-vw'>
                            <p><strong>Facebook</strong>: {state.facebook[0].facebook}</p>
                            </Col>
                            <Col xs={2} lg={2} className='dp align-bt pad-icon'>
                            <SocialIcon url='https://www.facebook.com/azdeservesbetter' target ='_blank' style={{height:35, width:35}}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={12} lg={6} className='pad-l-1vw-r-5vw dp flow-column mt-3 mt-lg-5'>
                    <div>
                        <h3 className = 'self-center s-title wg-bg'>EVENTS</h3>
                        <div className='yellow-bg'>
                            {state.events.sort((a, b)=>(a.Date > b.Date) ? 1 : -1).filter(e=>new Date(e.Date) > checkdate).slice(0,4).map((item)=>{
                                return(
                                    <Card key={item.id} className='border-none yellow-bg pad-l-5px mb-1 mb-lg-3'>
                                        <Card.Title className='dp-jc-center c-title mt-3'>{item.Headline}</Card.Title>
                                        <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>{item.Description}</Card.Text>
                                        <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>{item.Date.split('T')[0].split('-')[1]}-{item.Date.split('T')[0].split('-')[2]}-{item.Date.split('T')[0].split('-')[0]}</Card.Text>
                                        <Card.Text className='reg-content fs-1h dp-jc-center mb-1'>{item.Time} @ {item.Location}</Card.Text>
                                        <Card.Text className='italic fs-1h dp-jc-center mb-1'>{item.notary ? <span>Notary</span> : null} {item.petition ? <span className="m-l-1vw">Petitions Available for Pick Up </span> : null}</Card.Text>
                                    </Card>
                                )
                            })}
                            <div><Link to='/events' className='link'>...MORE EVENTS</Link></div>
                        </div>
                    </div>
                    <div className='dp-jc-space mt-2'>
                        <Button href="https://secure.everyaction.com/x5h8oo6C4ESaRrJFbn_v7w2" target='_blank' variant="danger" className='wide-45'>Voluteer</Button>
                        <Button href="https://secure.actblue.com/donate/azvoters" target='_blank' variant="danger" className='wide-45'>Donate</Button>
                    </div>
                </Col>
            </Row>
            <footer>
                <Row className='ft-row mt-1 mt-lg-5 pb-1 pb-lg-5'>
                <hr className='ft-hr mt-3 mt-lg-5 mb-3 mb-lg-5'/>
                    <Col xs={10} lg ={10} className='ft-col-l'>
                        <p className='ft-text'>Copyright © 2021 Arizona Deserves Better - All Rights Reserved.</p>
                    </Col>
                </Row>
            </footer>

        </div>
    )
    
}

export default Home
