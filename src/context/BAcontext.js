import React, { useState } from 'react';


const BAContext = React.createContext([{}, () => {}]);

const BAProvider = (props) => {
    const [state, setState] = useState({
       banner: [{Headline:''}],
       news: [{Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: ''}],
       events:[{Headline: '', Description: '', Date: '', Time: '', Location: '', notary: null, petition: null}],
       locations:[{Location: '', Address: '', Hours: '', Days: '', Priority: '', County: ''}],
       twitter: [{twitter: ''}],
       facebook: [{facebook: ''}],
       error:''
    });
    return (
      <BAContext.Provider value={[state, setState]}>
        {props.children}
      </BAContext.Provider>
    );
  }
  
  export { BAContext, BAProvider };