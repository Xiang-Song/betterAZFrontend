import React from 'react'
import { Link } from 'react-router-dom'
import useResults from '../hooks/useResults'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import UrlLinkedTxt from './UrlLinkedTxt'

import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const News = () => {
    const [state] = useResults();
    const formatDate = (oldDate) =>{
        return oldDate.split('T')[0].split('-')[1]+'-'+oldDate.split('T')[0].split('-')[2]+'-'+oldDate.split('T')[0].split('-')[0]
    }
    // const formatText = (txt, n, date) =>{
    //     const shortTxt = txt.slice(0,n).slice(0, txt.slice(0,n).lastIndexOf(' '));
    //     return (
    //         shortTxt.match(/<http.*>/)
    //         ? <>{shortTxt.match(/.*?(?=<http|$)/si)[0]}<a href={shortTxt.match(/<http.*>/)[0].slice(1,-1)} target='_blank'>{shortTxt.match(/<http.*>/)[0].split('//')[1].slice(0,-1)}</a> {shortTxt.match(/>(.*)/s)[1]}</>
    //         : <>{shortTxt}</>
    //     )
    // }

    const formatText = (txt, n) =>{
        return txt.slice(0,n).slice(0, txt.slice(0,n).lastIndexOf(' '));
    }
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
            <Row>
            <h2 className = 'self-center s-title wg-bg mt-0 mt-lg-3'>News Room</h2>
            {state.news.sort((a, b) => (a.Date < b.Date) ? 1 : -1).map((item)=>{
                    return(
                        item.ImageLink ? 
                        <Card key={item.id} className='border-none w-bg'>
                            <Row className='pad-l-5px'>
                                <Col xs={12} lg = {5}>
                                    <Image src={item.ImageLink} className='img-news-room mt-4'/>
                                </Col>
                                <Col xs={12} lg = {7}>
                                    <Card.Body>
                                        <Card.Title className='c-title'>{item.Headline}</Card.Title>
                                        <Card.Text className='reg-content fs-1h'>
                                        {formatDate(item.Date)} - <UrlLinkedTxt str={formatText(item.Textbody, 500)}/>
                                            <Link to={'newsdetails/'+item.id} 
                                            className='link'>
                                                ...Read More
                                            </Link></Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        : item.VideoLink ?
                        <Card key={item.id} className='border-none w-bg'>
                            <Row className='pad-l-5px'>
                                <Col xs={12} lg = {5}>
                                    <div className="embed-responsive embed-responsive-16by9">
                                    <iframe title="Embeds Page" className="embed-responsive-item img-news-room h-21vw mt-4" src={"https://www.youtube.com/embed/"+item.VideoLink.split('=')[1]}
                                        allowFullScreen></iframe>
                                    </div>
                                </Col>
                                <Col xs={12} lg = {7}>
                                    <Card.Body>
                                        <Card.Title  className='c-title'>{item.Headline}</Card.Title>
                                        <Card.Text className='reg-content fs-1h'>
                                        {formatDate(item.Date)} - <UrlLinkedTxt str={formatText(item.Textbody, 500)}/>
                                            <Link to={'newsdetails/'+item.id} 
                                            className='link'>
                                                ...Read More
                                            </Link></Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        :
                        <Card key={item.id} className='border-none w-bg'>
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
                <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
            </Row>
        </div>
    )
}

export default News


