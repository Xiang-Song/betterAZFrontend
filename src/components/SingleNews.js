import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/api'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const SingleNews = () => {
    const [news, setNews] = useState({Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: '', error:''})
    const { id } =useParams();
    useEffect(() => {
        const getNewsDetailById = async () =>{
        let res = await api.get('/news/' + id);
        if (res.status !== 200) {
            setNews({Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: '', error:'This news is not available now!'})
        } else {
            let data = res.data[0];
            setNews({...data, error:''})
            }
        }
        getNewsDetailById();
    }, [])
    
    
  
    return (
        <div className = 'wide-90 m-l-5vw'>
            <Card className= 'relative border-none mt-3'>
                <Row>
                    <Col xs={4} lg={4}>
                    <Link to='/'><Image src={heading} className='w-30vw'/></Link>
                    </Col>
                    <Col xs={8} lg={8}>
                        <Card.Body className='dp-jc-end mt-0 mt-lg-3 pt-1'>
                            <Link to='/' className='link navtab'>Home</Link>
                            <Link to='/news' className='link navtab'>News Room</Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            
            <div className='mt-3'>
                <h2 className = 'self-center n-title mt-0 mt-lg-3'>{news.Headline}</h2>
                <div className='dp-jc-end'>
                    <h6 className='italic'>{news.Date.split('T')[0].split('-')[1]}-{news.Date.split('T')[0].split('-')[2]}-{news.Date.split('T')[0].split('-')[0]} from {news.Source}</h6>
                </div>
                {news.ImageLink ? 
                <Image src={news.ImageLink} className='w-64vw h-36vw m-l-12vw'/> :
                null}
                {news.VideoLink ? 
                <div className="embed-responsive embed-responsive-16by9">
                <iframe title="Embeds Page" className="embed-responsive-item w-64vw h-36vw m-l-12vw mt-4" src={"https://www.youtube.com/embed/"+news.VideoLink.split('=')[1]}
                    allowFullScreen></iframe>
                </div> :
                null}
                <div className='mt-5'>
                {news.Textbody.split('\n').map((item, index)=>{
                    return(
                        <p key={index} className='text-indent reg-content'>{item}</p>
                    )
                })}
                </div>
                
            </div>
            
        </div>
    )
}

export default SingleNews;
