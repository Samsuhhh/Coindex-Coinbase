import React from 'react';
import './footer.css'



function Footer({currUser}) {
    let foot;

    if (!currUser) {
        foot = (
            <div id='footer-wrapper'>
                <div id='anchor-container'>
                    <a id='anchor' href='https://github.com/Samsuhhh/Coindex-Coinbase' rel='noreferrer' target='_blank' style={{ textDecoration: "none", marginRight: "10px" }}>
                        <div>Project Repo</div>
                    </a>
                    <br></br>
                    <a id='anchor' href='https://github.com/Samsuhhh/' rel='noreferrer' target='_blank' style={{ textDecoration: "none" }}>
                        <div>Sam's Github</div>
                    </a>
                    <br></br>
                    <a id='anchor' href='https://www.linkedin.com/in/samsuhhh/' rel='noreferrer' target='_blank' style={{ textDecoration: "none" }}>
                        <div>LinkedIn</div>
                    </a>
                </div>
            </div>
        )
    } else {
        foot = (
            <div id='pixel-footer-wrapper'>
                <div id='anchor-container'>
                    <a id='anchor' href='https://github.com/Samsuhhh/Coindex-Coinbase' rel='noreferrer' target='_blank'>
                        <div>Project Repo</div>
                    </a>
                    <br></br>
                    <a id='anchor' href='https://github.com/Samsuhhh/' rel='noreferrer' target='_blank'>
                        <div>Sam's Github </div>
                    </a>
                    <br></br>
                    <a id='anchor' href='https://www.linkedin.com/in/samsuhhh/' rel='noreferrer' target='_blank'>
                        <div>LinkedIn</div>
                    </a>
                    <br></br>
                </div>
            </div>
        )
    }

    return (
       <>
        {foot}
       </>
    )
}

export default Footer 