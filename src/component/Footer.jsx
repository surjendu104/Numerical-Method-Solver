import React from 'react'
import '../styles/Footer.css'
import logo from '../assets/logo-2-new.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-left'>
            <div className="logo">
                <img src={logo} />
            </div>
            <div>
                <div className="footer-site-name">
                    Numé Hlpr
                </div>
                <div className='footer-site-slogan'>
                    Your one stop numerical methods solver
                </div>
            </div>
        </div>
        <div className='footer-right'>
            <div className="footer-about">
                <div id='about'>About</div>
                <a href='' target='_blank'>features</a>
                <a href='' target='_blank'>support</a>
                
            </div>
            <div className="footer-project">
                <div id='about'>Project</div>
                <a href='https://www.github.com' target='_blank'>github</a>
                <a href='https://www.github.com' target='_blank'>contribute</a>
            </div>
        </div>
    </div>
  )
}

export default Footer;