import React, {useState, useEffect} from 'react'
import api from '../api/api'
import './login.css'

const Login = () => {
    const date = new Date();
    const [isLogin, setIsLogin] = useState(false);
    const [inputValue, setInputValue] = useState({username: '', password:''});
    const [error, setError] = useState('');
    const [bannerInput, setBannerInput] = useState({headline: ''});
    const [newsInput, setNewsInput] = useState({headline: '', textbody:'', date: '', source: '', imageLink: '', videoLink: ''});
    const [eventInput, setEventInput] = useState({headline: '', description: '', date: '', time: '', location: ''});
    const [locationInput, setLocationInput] = useState({location: '', address: '', hours: '', days: '', priority: '', county: '' });
    const [twitterInput, setTwitterInput] = useState({twitter: ''});
    const [fbInput, setFbInput] = useState({facebook: ''});
    const [banner, setBanner] = useState([{Headline: ''}]);
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [twitter, setTwitter] = useState([{twitter:''}]);
    const [fb, setFb] = useState([{facebook:''}]);
    // const [showData, setShowData] = useState({showBanner: false, showNews: false, showEvents: false, showLocatoins: false})

    useEffect(()=>{
        getBanner();
        getNews();
        getEvents();
        getLocations();
        getTwitter();
        getFacebook();
    },[])

    const getBanner = async() => {
        let res = await api.get('/banner');
        if (res.status !== 200) {
            setIsLogin(false);
            setBanner([])
        } else {
            let bannerList = [];
            for (let item of res.data){
                bannerList.push(item);
            }
            setBanner(bannerList)
        }
    }

    const getTwitter = async() => {
        let res = await api.get('/twitter');
        if (res.status !== 200) {
            setIsLogin(false);
            setTwitter([])
        } else {
            let ttList = [];
            for (let item of res.data){
                ttList.push(item);
            }
            setTwitter(ttList)
        }
    }

    const getFacebook = async() => {
        let res = await api.get('/facebook');
        if (res.status !== 200) {
            setIsLogin(false);
            setFb([])
        } else {
            let fbList = [];
            for (let item of res.data){
                fbList.push(item);
            }
            setFb(fbList)
        }
    }

    const getNews = async()=>{
        let res = await api.get('/news');
        if (res.status !== 200) {
            setIsLogin(false);
            setNews([])
        } else {
            let newsList = [];
            for (let item of res.data){
                newsList.push(item);
            }
            setNews(newsList)
        }
    }

    const getEvents = async()=>{
        let res = await api.get('/events');
        if (res.status !== 200) {
            setIsLogin(false);
            setEvents([])
        } else {
            let eventsList = [];
            for (let item of res.data){
                eventsList.push(item);
            }
            setEvents(eventsList)
        }
    }

    const getLocations = async()=>{
        let res = await api.get('/locations');
        if (res.status !== 200) {
            setIsLogin(false);
            setLocations([])
        } else {
            let locationsList = [];
            for (let item of res.data){
                locationsList.push(item);
            }
            setLocations(locationsList)
        }
    }

    
    

    const handleInput = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        const {username, password} = inputValue;
        try {
            const res = await api.post('users/login',{
                username, 
                password
            });
            localStorage.setItem('JWT', res.data.token);
            setIsLogin(true);
            setInputValue({username: '', password:''});
            setError('');
        } catch (error){
            console.error(error.response.data)
        if (error.response.data==='this username not exist' || error.response.data==='passwords do not match') {
            setError(error.response.data);
        }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        setIsLogin(false);
    }

    const handleBannerInput = (e) =>{
        setBannerInput({headline: e.target.value})
    }

    const handleTwitterInput = (e) =>{
        setTwitterInput({twitter: e.target.value})
    }

    const handleFbInput = (e) =>{
        setFbInput({facebook: e.target.value})
    }

    const handleBannerSubmit = async() => {
        if (bannerInput.headline !== ''){
            let bannerData = {Headline: bannerInput.headline};
            let token = localStorage.getItem('JWT');
            let axiosConfig = {headers: {Authorization: "JWT " + token}};
            
            try {
                await api.post('/users/replaceBanner',bannerData, axiosConfig);
                setBannerInput({headline: ''})
                await getBanner();
            } catch(error){
                console.error(error.response.data)
            }
        }
    }

    const handleTwitterSubmit = async() => {
        if (twitterInput.twitter !== ''){
            let twitterData = {twitter: twitterInput.twitter};
            let token = localStorage.getItem('JWT');
            let axiosConfig = {headers: {Authorization: "JWT " + token}};
            
            try {
                await api.post('/users/replaceTwitter',twitterData, axiosConfig);
                setTwitterInput({twitter: ''})
                await getTwitter();
            } catch(error){
                console.error(error.response.data)
            }
        }
    }

    const handleFacebookSubmit = async() => {
        if (fbInput.facebook !== ''){
            let fbData = {facebook: fbInput.facebook};
            let token = localStorage.getItem('JWT');
            let axiosConfig = {headers: {Authorization: "JWT " + token}};
            
            try {
                await api.post('/users/replaceFb',fbData, axiosConfig);
                setFbInput({facebook: ''})
                await getFacebook();
            } catch(error){
                console.error(error.response.data)
            }
        }
    }

    const handleNewsInput = (e) => {
        setNewsInput({
            ...newsInput,
            [e.target.name]: e.target.value
        })
    } 

    const handleNewsSubmit = async() => {
        let { headline, textbody, date, source, imageLink, videoLink } = newsInput;
        let newsData = {Headline: headline, Textbody: textbody, Date: date, Source: source, ImageLink: imageLink, VideoLink: videoLink};
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        
        try {
            await api.post('/users/createNews',newsData, axiosConfig);
            setNewsInput({headline: '', textbody:'', date: '', source: '', imageLink: '', videoLink: ''});
            await getNews();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const handleEventInput = (e) => {
        setEventInput({
            ...eventInput,
            [e.target.name]: e.target.value
        })
    }

    const handleEventSubmit = async ()=>{
        let {headline, description, date, time, location} = eventInput;
        let eventData = {Headline: headline, Description: description, Date: date, Time: time, Location: location};
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};

        try {
            await api.post('/users/createEvent',eventData, axiosConfig);
            setEventInput({headline: '', description: '', date: '', time: '', location: ''});
            await getEvents();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const handleLocationInput = (e) => {
        setLocationInput({
            ...locationInput,
            [e.target.name]: e.target.value
        })
    }

    const handleLocationSubmit = async() => {
        let {location, address, hours, days, priority, county} = locationInput;
        let locationData = {Location: location, Address: address, Hours: hours, Days: days, Priority: priority, County: county}
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        try {
            await api.post('/users/createLocation',locationData, axiosConfig);
            setLocationInput({location: '', address: '', hours: '', days: '', priority: '', county: '' });
            await getLocations();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const deleteNews = async(id) => {
        let data = {id: id};
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        try {
            await api.post('/users/deleteNews', data, axiosConfig);
            await getNews();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const deleteEvent = async(id) => {
        let data = {id: id};
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        try {
            await api.post('/users/deleteEvent', data, axiosConfig);
            await getEvents();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const deleteLocation = async(id)=>{
        let data = {id: id};
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        try {
            await api.post('/users/deleteLocation', data, axiosConfig);
            await getLocations();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const handleNotaryChange = async(e, id)=>{
        let data = {id: id, notary: e.target.checked ? 1 : null}
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        try {
            await api.post('/users/updateEvent', data, axiosConfig);
            await getEvents();
        } catch(error){
            console.error(error.response.data)
        }
    }

    const handlePetitionChange = async(e, id)=>{
        let data = {id: id, petition: e.target.checked ? 1 : null}
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        try {
            await api.post('/users/updateEvent', data, axiosConfig);
            await getEvents();
        } catch(error){
            console.error(error.response.data)
        }
    }

    if (!isLogin) {
        return (
            <div className='login'>
                <label className='title'>Admin Sign In</label>
                <br />
                <label>username</label><input placeholder='username' name="username" value={inputValue.username} onChange={handleInput} /><br/>
                <label>password</label><input placeholder='password' type = 'password' name="password" value={inputValue.password} onChange={handleInput} /><br/>
                <button onClick={handleLogin}>Login</button>
                {error? <p>{error}</p>: ''}
            </div>
        )
    }
    return (
        <div>
            <button onClick={handleLogout} className='logout' >Log out</button>
            <div className='admin-body'>
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Replace with New Banner Headline</label><br /><br />
                        <input className='input-field' placeholder='new banner headline' value={bannerInput.headline} onChange={handleBannerInput} /><br />
                        <button onClick={handleBannerSubmit}>Replace with New Banner</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Banner Headline</label>
                        <p>{banner[0].Headline}</p>
                    </div>
                </div>
                <hr /><hr />
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Replace with New Twitter text</label><br /><br />
                        <textarea className='input-text-field' placeholder='new Twitter text' value={twitterInput.text} onChange={handleTwitterInput} /><br />
                        <button onClick={handleTwitterSubmit}>Replace with New Twitter Text</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Twitter Text</label>
                        <p>{twitter[0].twitter}</p>
                    </div>
                </div>
                <hr /><hr />
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Replace with New Facebook text</label><br /><br />
                        <textarea className='input-text-field' placeholder='new Facebook text' value={fbInput.facebook} onChange={handleFbInput} /><br />
                        <button onClick={handleFacebookSubmit}>Replace with New Facebook Text</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Facebook Text</label>
                        <p>{fb[0].facebook}</p>
                    </div>
                </div>
                <hr /><hr />
                
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Add More News</label><br /><br />
                        <textarea className='input-field' placeholder='headline' name='headline' value={newsInput.headline} onChange={handleNewsInput} /><br />
                        <textarea className='input-text-field' placeholder='textbody' name='textbody' value={newsInput.textbody} onChange={handleNewsInput} /><br />
                        <input className='input-field' placeholder='date' name='date' value={newsInput.date} onChange={handleNewsInput} /><br />
                        <input className='input-field' placeholder='source' name='source' value={newsInput.source} onChange={handleNewsInput} /><br />
                        <input className='input-field' placeholder='image link' name='imageLink' value={newsInput.imageLink} onChange={handleNewsInput} /><br />
                        <input className='input-field' placeholder='video link' name='videoLink' value={newsInput.videoLink} onChange={handleNewsInput} /><br />
                        <button onClick={handleNewsSubmit}>Submit News</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current news list (Headline)</label>
                        {news.map((item)=>{
                            return <div key={item.id}>
                                <div className='list-item'>
                                <p className='list-item-content'>{item.Headline}</p>
                                <button className='list-item-button' onClick={()=>deleteNews(item.id)}>delete this news</button>
                                </div>
                                <hr />
                                </div>
                        })}
                    </div>
                </div>
                <hr /><hr />
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Add New Event</label><br /><br />
                        <input className='input-field' placeholder='headline' name='headline' value={eventInput.headline} onChange={handleEventInput} /><br />
                        <textarea className='input-text-field' placeholder='description' name='description' value={eventInput.description} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='date' name='date' value={eventInput.date} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='time' name='time' value={eventInput.time} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='location' name='location' value={eventInput.location} onChange={handleEventInput} /><br />
                        <button onClick={handleEventSubmit}>Submit New Event</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Events List (Headline)</label>
                        {events.sort((a, b) => (a.id > b.id) ? 1 : -1).map((item)=>{
                            return <div key={item.id}>
                                <div className='list-item'>
                                <p className='list-item-content'>{item.Headline} @ {item.Date.split('T')[0].split('-')[1]}-{item.Date.split('T')[0].split('-')[2]}-{item.Date.split('T')[0].split('-')[0]}</p>
                                <button className='list-item-button' onClick={()=>deleteEvent(item.id)}>delete this event</button>
                                <p>Notary: <input type="checkbox" name="notary" value="notary" defaultChecked={item.notary} onChange={(e)=>handleNotaryChange(e, item.id)} /></p>
                                <p>Petition: <input type="checkbox" name="petition" value="petition" defaultChecked={item.petition} onChange={(e)=>handlePetitionChange(e, item.id)} /></p>
                                </div>
                                <hr />
                                </div>
                        })}
                    </div>
                </div>
                <hr /><hr />
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Add New Sign Location</label><br /><br />
                        <input className='input-field' placeholder='location' name='location' value={locationInput.location} onChange={handleLocationInput} /><br />
                        <input className='input-field' placeholder='address' name='address' value={locationInput.address} onChange={handleLocationInput} /><br />
                        <input className='input-field' placeholder='hours' name='hours' value={locationInput.hours} onChange={handleLocationInput} /><br />
                        <input className='input-field' placeholder='days' name='days' value={locationInput.days} onChange={handleLocationInput} /><br />
                        <input className='input-field' placeholder='priority' name='priority' value={locationInput.priority} onChange={handleLocationInput} /><br />
                        <input className='input-field' placeholder='county' name='county' value={locationInput.county} onChange={handleLocationInput} /><br />
                        <button onClick={handleLocationSubmit}>Submit New Event</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Sign Location List</label>
                        {locations.map((item)=>{
                            return <div key={item.id}>
                                <div className='list-item'>
                                <p className='list-item-content'>{item.Location} | {item.County} | Priority: {item.Priority}</p>
                                <button className='list-item-button' onClick={()=>deleteLocation(item.id)}>delete this location</button>
                                </div>
                                <hr />
                                </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Login
