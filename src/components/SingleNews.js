import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { BAContext } from '../context/BAcontext'
import {Alert, Button, Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const SingleNews = () => {
    const [state, setState] = useContext(BAContext);
    useEffect(()=>{
        const newsId = localStorage.getItem('newsId')

        const getNewsDetail = async (id) =>{
            let res = await fetch('https://floating-thicket-57272.herokuapp.com/news/' + id);
            if (res.status !== 200) {
                setState(state=>({...state, detailNews:{Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: ''}, error:'This news is not available now!'}))
            } else {
                let data = await res.json();
                setState (state=>({...state, detailNews:data[0]}))
            }
        }
        getNewsDetail(newsId);
        window.scrollTo(0, 0);
    },[])
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
                    <h6 className='italic'>{state.detailNews.Date.split('T')[0]} from {state.detailNews.Source}</h6>
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
                        <p key={index}>{item}</p>
                    )
                })}
                </div>
                
            </div>
            
        </div>
    )
}

export default SingleNews;
