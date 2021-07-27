import React from 'react'
import { Link } from 'react-router-dom'
import useResults from '../hooks/useResults'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const SingleNews = () => {
    const [state] = useResults();
  
    return (
        <div className = 'wide-90 m-l-5vw'>
            <Card className= 'relative border-none mt-3'>
                <Row>
                    <Col xs lg = '4'>
                    <Image src={heading} className='w-30vw'/>
                    </Col>
                    <Col xs lg = '8'>
                        <Card.Body className='dp-jc-end mt-3'>
                            <Link to='/home' className='link w-10vw'>Home</Link>
                            <Link to='/news' className='link w-10vw'>News Room</Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            
            <div className='mt-3'>
                <h2 className = 'self-center n-title'>{state.detailNews.Headline}</h2><br />
                <div className='dp-jc-end'>
                    <h6 className='italic'>{state.detailNews.Date.split('T')[0].split('-')[1]}-{state.detailNews.Date.split('T')[0].split('-')[2]}-{state.detailNews.Date.split('T')[0].split('-')[0]} from {state.detailNews.Source}</h6>
                </div>
                {state.detailNews.ImageLink ? 
                <Image src={state.detailNews.ImageLink} className='w-64vw h-36vw m-l-12vw'/> :
                null}
                {state.detailNews.VideoLink ? 
                <div className="embed-responsive embed-responsive-16by9">
                <iframe title="Embeds Page" className="embed-responsive-item w-64vw h-36vw m-l-12vw mt-4" src={"https://www.youtube.com/embed/"+state.detailNews.VideoLink.split('=')[1]}
                    allowFullScreen></iframe>
                </div> :
                null}
                <div className='mt-5 ight-content'>
                {state.detailNews.Textbody.split('\n').map((item, index)=>{
                    return(
                        <p key={index} className='text-indent'>{item}</p>
                    )
                })}
                </div>
                
            </div>
            
        </div>
    )
}

export default SingleNews;