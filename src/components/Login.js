import React, {useState, useEffect} from 'react'
import api from '../api/api'
import './login.css'

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [inputValue, setInputValue] = useState({username: '', password:''});
    const [error, setError] = useState('');
    const [bannerInput, setBannerInput] = useState({headline: ''});
    const [newsInput, setNewsInput] = useState({headline: '', textbody:'', date: '', source: '', imageLink: '', videoLink: ''});
    const [eventInput, setEventInput] = useState({headline: '', description: '', date: '', time: '', location: '', county: '', streetNumber: '', streetName: '', city: '', lat: '', lng: ''});
    const [locationInput, setLocationInput] = useState({location: '', address: '', hours: '', days: '', priority: '', county: '' });
    const [twitterInput, setTwitterInput] = useState({twitter: ''});
    const [fbInput, setFbInput] = useState({facebook: ''});
    const [banner, setBanner] = useState([{Headline: ''}]);
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventError, setEventError] = useState('');
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

    const handleCountyInput = (e) => {
        setEventInput({
            ...eventInput,
            county: e.target.value
        })
    }

    const handleEventSubmit = async ()=>{
        let {headline, description, date, time, location, county, streetNumber, streetName, city, lat, lng} = eventInput;
        let eventData = {Headline: headline, Description: description, Date: date, Time: time, Location: location, County: county, StreetNumber: streetNumber, StreetName: streetName, City: city, Lat: lat, Lng: lng};
        let token = localStorage.getItem('JWT');
        let axiosConfig = {headers: {Authorization: "JWT " + token}};
        
        if (eventData.Date !=='' 
            && eventData.Headline !==''
            && eventData.County !== '' 
            && ((eventData.StreetName !=='' && eventData.StreetNumber !== '' && eventData.City !== '') || (eventData.Location !=='' && eventData.Lat !== '' && eventData.Lng !== ''))){
            try {
                await api.post('/users/createEvent',eventData, axiosConfig);
                setEventInput({headline: '', description: '', date: '', time: '', location: '', county: '', streetNumber: '', streetName: '', city: '', lat: '', lng: ''});
                setEventError('')
                await getEvents();
                console.log(events)
            } catch(error){
                console.error(error.response.data)
            }
        } else {
            setEventError("please fill all required fields(headline, date, County and fill one location combination), if you have question about location fields, please contact @ 'erickramer102@gmail.com' ")
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

    const sortCounty = (arr) => {
        let result = [];
        if (arr.indexOf('Maricopa') !== -1){
            result[0] = 'Maricopa';
            arr.splice(arr.indexOf('Maricopa'),1);
        }
        if (arr.indexOf('Pima') !== -1){
            result.push('Pima');
            arr.splice(arr.indexOf('Pima'),1);
        }
        arr.sort((a,b)=>(a > b) ? 1 : -1)
        for (let i of arr){
            result.push(i)
        }
        return result
        }

    const groupBy = (items, key) => items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]:[
            ...(result[item[key]] || []),
            item,
          ]
        }),
        {},
      );

    const eventsByCounty = groupBy(events, 'County');

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
                        <input className='input-field' placeholder='headline (required)' name='headline' value={eventInput.headline} onChange={handleEventInput} /><br />
                        <textarea className='input-text-field' placeholder='description' name='description' value={eventInput.description} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='date (required)' name='date' value={eventInput.date} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='time' name='time' value={eventInput.time} onChange={handleEventInput} /><br />
                        <label style={{color: 'blue'}}>For the location, You need fill either all three fields for streetNumber, streetName, city or another three fields for location, latitude, longitude</label>
                        <input className='input-field' placeholder='streetNumber' name='streetNumber' value={eventInput.streetNumber} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='streetName' name='streetName' value={eventInput.streetName} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='city' name='city' value={eventInput.city} onChange={handleEventInput} /><br />
                        <p>OR</p>
                        <input className='input-field' placeholder='location' name='location' value={eventInput.location} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='latitude' name='lat' value={eventInput.lat} onChange={handleEventInput} /><br />
                        <input className='input-field' placeholder='longitude' name='lng' value={eventInput.lng} onChange={handleEventInput} /><br />
                        <hr />
                        <label>Select County, required</label>
                        <select value={eventInput.county} onChange={handleCountyInput}>
                            <option value = ''> County </option>
                            <option value='Maricopa'>Maricopa</option>
                            <option value='Pima'>Pima</option>
                            <option value='Apache'>Apache</option>
                            <option value='Cochise'>Cochise</option>
                            <option value='Coconino'>Coconino</option>
                            <option value='Gila'>Gila</option>
                            <option value='Graham'>Graham</option>
                            <option value='Greenlee'>Greenlee</option>
                            <option value='La Paz'>La Paz</option>
                            <option value='Mohave'>Mohave</option>
                            <option value='Navajo'>Navajo</option>
                            <option value='Pinal'>Pinal</option>
                            <option value='Santa Cruz'>Santa Cruz</option>
                            <option value='Yavapai'>Yavapai</option>
                            <option value='Yuma'>Yuma</option>
                        </select>
                        <br />
                        {eventError ? <p style={{color: 'red'}}>{eventError}</p> : null}
                        <button onClick={handleEventSubmit}>Submit New Event</button>
                    </div>
                    <div className='current-list'>
                        <label className='title'>Current Events List (Headline, sorted by county then by date)</label>
                        <hr />
                        {sortCounty(Object.keys(eventsByCounty)).map((k, index)=>{
                            return<div key={index}>
                                <span style={{fontWeight: 'bolder'}}>{k}</span>
                                <hr />
                                {eventsByCounty[k].sort((a, b) => (a.Date > b.Date) ? 1 : -1).map((ev)=>{
                                    return <div key={ev.id}>
                                    <div className='list-item'>
                                    <p className='list-item-content'>{ev.Headline} @ {ev.Date.split('T')[0].split('-')[1]}-{ev.Date.split('T')[0].split('-')[2]}-{ev.Date.split('T')[0].split('-')[0]}</p>
                                    <button className='list-item-button' onClick={()=>deleteEvent(ev.id)}>delete this event</button>
                                    <p>Notary: <input type="checkbox" name="notary" value="notary" defaultChecked={ev.notary} onChange={(e)=>handleNotaryChange(e, ev.id)} /></p>
                                    <p>Petition: <input type="checkbox" name="petition" value="petition" defaultChecked={ev.petition} onChange={(e)=>handlePetitionChange(e, ev.id)} /></p>
                                    </div>
                                    <hr />
                                    </div>
                                })}
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
