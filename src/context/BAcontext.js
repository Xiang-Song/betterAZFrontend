import React, { useState } from 'react';


const BAContext = React.createContext([{}, () => {}]);

const BAProvider = (props) => {
    const [state, setState] = useState({
       banner: [{Headline:''}],
       news: [{Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: ''}],
       events:[{Headline: '', Description: '', Date: '', Time: '', Location: ''}],
       locations:[{Location: '', Address: '', Hours: '', Days: '', Priority: '', County: ''}],
       detailNews: {Headline: '', Textbody:'', Date: '', Source: '', ImageLink: '', VideoLink: ''},
       error:''
    });
    return (
      <BAContext.Provider value={[state, setState]}>
        {props.children}
      </BAContext.Provider>
    );
  }
  
  export { BAContext, BAProvider };