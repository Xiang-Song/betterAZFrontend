import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './login.css'

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [inputValue, setInputValue] = useState({username: '', password:''});
    const [error, setError] = useState('');
    const [bannerInput, setBannerInput] = useState({headline: ''});
    const [newsInput, setNewsInput] = useState({headline: '', textbody:'', date: '', source: '', imageLink: '', videoLink: ''});
    const [eventInput, setEventInput] = useState({headline: '', description: '', date: '', time: '', location: ''});
    const [locationInput, setLocationInput] = useState({location: '', address: '', hours: '', days: '', priority: '', county: '' });
    const [banner, setBanner] = useState([]);
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    // const [showData, setShowData] = useState({showBanner: false, showNews: false, showEvents: false, showLocatoins: false})

    useEffect(()=>{
        getBanner();
        getNews();
        getEvents();
        getLocations();
    },[])

    const getBanner = async() => {
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/banner');
        if (res.status !== 200) {
            setIsLogin(false);
            setBanner('')
        } else {
            let data = await res.json();
            let bannerList = [];
            for (let item of data){
                bannerList.push(item);
            }
            setBanner(bannerList)
        }
    }

    const getNews = async()=>{
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/news');
        if (res.status !== 200) {
            setIsLogin(false);
            setNews([])
        } else {
            let data = await res.json();
            let newsList = [];
            for (let item of data){
                newsList.push(item);
            }
            setNews(newsList)
        }
    }

    const getEvents = async()=>{
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/events');
        if (res.status !== 200) {
            setIsLogin(false);
            setEvents([])
        } else {
            let data = await res.json();
            let eventsList = [];
            for (let item of data){
                eventsList.push(item);
            }
            setEvents(eventsList)
        }
    }

    const getLocations = async()=>{
        let res = await fetch('https://floating-thicket-57272.herokuapp.com/locations');
        if (res.status !== 200) {
            setIsLogin(false);
            setLocations([])
        } else {
            let data = await res.json();
            let locationsList = [];
            for (let item of data){
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
            const res = await axios.post('https://floating-thicket-57272.herokuapp.com/users/login',{
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

    const handleBannerSubmit = async() => {
        if (bannerInput.headline !== ''){
            let bannerData = {Headline: bannerInput.headline};
            let token = localStorage.getItem('JWT');
            let axiosConfig = {headers: {Authorization: "JWT " + token}};
            
            try {
                let res = await axios.post('https://floating-thicket-57272.herokuapp.com/users/replaceBanner',bannerData, axiosConfig);
                setBannerInput({headline: ''})
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
            let res = await axios.post('https://floating-thicket-57272.herokuapp.com/users/createNews',newsData, axiosConfig);
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
            let res = await axios.post('https://floating-thicket-57272.herokuapp.com/users/createEvent',eventData, axiosConfig);
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
            let res = await axios.post('https://floating-thicket-57272.herokuapp.com/users/createLocation',locationData, axiosConfig);
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
            await axios.post('https://floating-thicket-57272.herokuapp.com/users/deleteNews', data, axiosConfig);
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
            await axios.post('https://floating-thicket-57272.herokuapp.com/users/deleteEvent', data, axiosConfig);
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
            await axios.post('https://floating-thicket-57272.herokuapp.com/users/deleteLocation', data, axiosConfig);
            await getLocations();
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
                            return <div key={item.id} className='list-item'>
                                <p className='list-item-content'>{item.Headline}</p>
                                <button className='list-item-button' onClick={()=>deleteNews(item.id)}>delete this news</button>
                                </div>
                        })}
                    </div>
                </div>
                <hr /><hr />
                <div className='section'>
                    <div className='new-input'>
                        <label className='title'>Add New Event</label><br /><br />
                        <input className='input-field' placeholder='headline' name='headline' value={eventInput.headline} onChange={handleEventInput} /><br />
                        <textarea className='input-des-field' placeholder='description' name='description' value={eventInput.description} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='date' name='date' value={eventInput.date} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='time' name='time' value={eventInput.time} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='location' name='location' value={eventInput.location} onChange={handleEventInput} /><br />
                        <button onClick={handleEventSubmit}>Submit New Event</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Events List (Headline)</label>
                        {events.map((item)=>{
                            return <div key={item.id} className='list-item'>
                                <p className='list-item-content'>{item.Headline}</p>
                                <button className='list-item-button' onClick={()=>deleteEvent(item.id)}>delete this event</button>
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
                            return <div key={item.id} className='list-item'>
                                <p className='list-item-content'>{item.Location} | {item.County} | Priority: {item.Priority}</p>
                                <button className='list-item-button' onClick={()=>deleteLocation(item.id)}>delete this location</button>
                                </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Login
