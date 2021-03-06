import { useContext, useEffect } from "react";
import { BAContext } from '../context/BAcontext'
import api from '../api/api'

export default () => {
    const [state, setState] = useContext(BAContext);

    const getBanner = async() => {
        let res = await api.get('/banner');
        if (res.status !== 200) {
            setState(state=>({...state, banner: [{Headline:''}]}))
        } else {
            
            let bannerList = [];
            for (let item of res.data){
                bannerList.push(item);
            }
            setState(state=>({...state, banner: bannerList}))
        }
    }
    
    const getNews = async()=>{
        let res = await api.get('/news');
        if (res.status !== 200) {
            setState(state=>({...state, news: [{Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: ''}]}))
        } else {
            let newsList = [];
            for (let item of res.data){
                newsList.push(item);
            }
            setState(state=>({...state, news: newsList}))
        }
    }
    
    const getEvents = async()=>{
        let res = await api.get('/events');
        if (res.status !== 200) {
            setState(state=>(
                {...state, 
                    events: [{Headline: '', 
                              Description: '', 
                              Date: '', 
                              Time: '', 
                              Location: '', 
                              notary: null, 
                              petition: null,
                              StreetNumber: '',
                              StreetName: '',
                              City: '',
                              Lat: '',
                              Lng: ''
                            }]}))
        } else {
            let eventsList = [];
            for (let item of res.data){
                eventsList.push(item);
            }
            setState(state=>({...state, events: eventsList}))
        }
    }
    
    const getLocations = async()=>{
        let res = await api.get('/locations');
        if (res.status !== 200) {
            setState(state=>({...state, locations: [{Location: '', Address: '', Hours: '', Days: '', Priority: '', County: ''}]}))
        } else {
            let locationsList = [];
            for (let item of res.data){
                locationsList.push(item);
            }
            setState(state=>({...state, locations: locationsList}))
        }
    }

    const getTwitter = async() => {
        let res = await api.get('/twitter');
        if (res.status !== 200) {
            setState(state=>({...state, twitter: [{twitter:''}]}))
        } else {
            
            let ttList = [];
            for (let item of res.data){
                ttList.push(item);
            }
            setState(state=>({...state, twitter: ttList}))
        }
    }

    const getFb = async() => {
        let res = await api.get('/facebook');
        if (res.status !== 200) {
            setState(state=>({...state, twitter: [{twitter:''}]}))
        } else {
            let fbList = [];
            for (let item of res.data){
                fbList.push(item);
            }
            setState(state=>({...state, facebook: fbList}))
        }
    }
    
    useEffect(()=>{
        getBanner();
        getNews();
        getEvents();
        getLocations();
        getTwitter();
        getFb();
        window.scrollTo(0, 0);
    },[])
    
    return [state, setState];

}


