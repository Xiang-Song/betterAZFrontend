import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { BAContext } from '../context/BAcontext'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const News = () => {
    const [state, setState] = useContext(BAContext);
    useEffect(()=>{
        const getBanner = async() => {
            let res = await fetch('https://floating-thicket-57272.herokuapp.com/banner');
            if (res.status !== 200) {
                setState(state=>({...state, banner: [{Headline:''}]}))
            } else {
                let data = await res.json();
                let bannerList = [];
                for (let item of data){
                    bannerList.push(item);
                }
                setState(state=>({...state, banner: bannerList}))
            }
        }
    
        const getNews = async()=>{
            let res = await fetch('https://floating-thicket-57272.herokuapp.com/news');
            if (res.status !== 200) {
                setState(state=>({...state, news: [{Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: ''}]}))
            } else {
                let data = await res.json();
                let newsList = [];
                for (let item of data){
                    newsList.push(item);
                }
                setState(state=>({...state, news: newsList}))
            }
        }

        getBanner();
        getNews();
        window.scrollTo(0, 0);
    },[])

    const getNewsDetail = async (id) =>{
        localStorage.setItem('newsId', id );
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/news/' + id);
        if (res.status !== 200) {
            setState(state=>({...state, detailNews:{}, error:'This news is not available now!'}))
        } else {
            let data = await res.json();
            setState (state=>({...state, detailNews:data[0]}))
        }
    }
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
            <Row>
            <h2 className = 'self-center s-title wg-bg mt-3'>News Room</h2><br />
            {state.news.sort((a, b) => (a.Date < b.Date) ? 1 : -1).map((item)=>{
                    return(
                        item.ImageLink ? 
                        <Card key={item.id} className='border-none w-bg'>
                            <Row className='pad-l-5px'>
                                <Col xs lg = '5'>
                                    <Image src={item.ImageLink} className='w-37vw mt-4'/>
                                </Col>
                                <Col xs lg = '7'>
                                    <Card.Body>
                                        <Card.Title className='c-title'>{item.Headline}</Card.Title>
                                        <Card.Text className='light-content fs-1h'>
                                            {item.Date.split('T')[0]} - {item.Textbody.substring(0,500)}
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
                        <Card key={item.id} className='border-none w-bg'>
                            <Row className='pad-l-5px'>
                                <Col xs lg = '5'>
                                    <div className="embed-responsive embed-responsive-16by9">
                                    <iframe title="Embeds Page" className="embed-responsive-item w-37vw h-21vw mt-4" src={"https://www.youtube.com/embed/"+item.VideoLink.split('=')[1]}
                                        allowFullScreen></iframe>
                                    </div>
                                </Col>
                                <Col xs lg = '7'>
                                    <Card.Body>
                                        <Card.Title  className='c-title'>{item.Headline}</Card.Title>
                                        <Card.Text className='light-content fs-1h'>
                                            {item.Date.split('T')[0]} - {item.Textbody.substring(0,500)}
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
                        <Card key={item.id} className='border-none w-bg'>
                            <Card.Body>
                                <Card.Title  className='c-title'>{item.Headline}</Card.Title>
                                <Card.Text className='light-content fs-1h'>
                                            {item.Date.split('T')[0]} - {item.Textbody.substring(0,500)}
                                            <Link to={'newsdetails/'+item.id} 
                                            onClick={()=>getNewsDetail(item.id)} 
                                            className='link'>
                                                ...Read More
                                            </Link></Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
                <div><Link to='/home' className='link pad-l-5px'>Back to Home</Link></div>
            </Row>
        </div>
    )
}

export default News


