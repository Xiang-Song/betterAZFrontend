import { useContext, useEffect } from "react";
import { BAContext } from '../context/BAcontext'

export default () => {
    const [state, setState] = useContext(BAContext);

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
    
    const getEvents = async()=>{
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/events');
        if (res.status !== 200) {
            setState(state=>({...state, events: [{Headline: '', Description: '', Date: '', Time: '', Location: ''}]}))
        } else {
            let data = await res.json();
            let eventsList = [];
            for (let item of data){
                eventsList.push(item);
            }
            setState(state=>({...state, events: eventsList}))
        }
    }
    
    const getLocations = async()=>{
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/locations');
        if (res.status !== 200) {
            setState(state=>({...state, locations: [{Location: '', Address: '', Hours: '', Days: '', Priority: '', County: ''}]}))
        } else {
            let data = await res.json();
            let locationsList = [];
            for (let item of data){
                locationsList.push(item);
            }
            setState(state=>({...state, locations: locationsList}))
        }
    }

    const getNewsDetailById = async () =>{
        let id = localStorage.getItem('newsId');
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/news/' + id);
        if (res.status !== 200) {
            setState(state=>({...state, detailNews:{}, error:'This news is not available now!'}))
        } else {
            let data = await res.json();
            setState (state=>({...state, detailNews:data[0]}))
        }
    }
    
    useEffect(()=>{
        getBanner();
        getNews();
        getEvents();
        getLocations();
        getNewsDetailById();
        window.scrollTo(0, 0);
    },[])
    
    return [state, setState];

}


