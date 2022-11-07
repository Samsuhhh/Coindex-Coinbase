import React from 'react';
import './footer.css'


function Footer() {

    return (
        <div id='footer-wrapper'>
            <a id='anchor' href='https://github.com/Samsuhhh/Coindex-Coinbase' target='_blank' style={{ textDecoration: "none", marginRight:"10px" }}>
                <div>Project Repo</div>
            </a>
            <br></br>
            <a id='anchor' href='https://github.com/Samsuhhh/' target='_blank' style={{textDecoration:"none"}}>
                <div>Sam's Github</div>
            </a>
        </div>
    )
}

export default Footer 