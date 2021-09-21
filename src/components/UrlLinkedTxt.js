import React from 'react'

const UrlLinkedTxt = ({str}) => {

    const urlRegex = /(<http?[^\s]+)|(www?[^\s]+)/gi;
    const cleanUrl = (url) => {
        let s1 = url.match(/<http.*>/)[0].split('//')[1].slice(0,-1); 
        if(s1.includes("?")){
            s1 = s1.split("?")[0]
        }
        return s1;
    }

    if(str.match(/<http.*>/)){
        const regex = str.match(urlRegex);
        const shownLink = [];
        const hrefLink = [];
        let plainTxt = [];
        let start = 0;
        for (let i of regex){
            // shownLink.push(i.match(/<http.*>/)[0].split('//')[1].slice(0,-1))
            shownLink.push(cleanUrl(i));
            hrefLink.push(i.match(/<http.*>/)[0].slice(1,-1));
            plainTxt.push(str.slice(start, str.indexOf(i)));
            start = str.indexOf(i) + i.length;
        }
        plainTxt.push(str.slice(start, ));
        
        return(<>
            {plainTxt.map((item, index)=>{
                return(
                    <span key={index}>{item}{regex[index] 
                        ? <a href={hrefLink[index]} target='_blank'>{shownLink[index]}</a> 
                        : null}</span>
                )
            })}
        </>)
    } else {
        return <>{str}</>
    }
}

export default UrlLinkedTxt
