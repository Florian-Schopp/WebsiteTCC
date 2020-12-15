import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/'>How it works</Link>
                        <Link to='/Simulation'>Simulation</Link>
                        <a href='/docu/index.html'>Documentation</a>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/notavailible'>Contact</Link>
                        <Link to='/notavailible'>Team</Link>
                        <Link to='/notavailible'>Destinations</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Petrobras</h2>
                        <a target="_blank" href='https://petrobras.com.br/pt/'>Website</a>
                        <a target="_blank" href='https://petrobras.com.br/pt/nossas-atividades/principais-operacoes/bacias/bacia-de-campos.htm'>Platforms</a>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <a target="_blank" href='http://www.instagram.com/petrobras'>Instagram</a>
                        <a target="_blank" href='https://www.facebook.com/petrobras'>Facebook</a>
                        <a target="_blank" href='https://www.youtube.com/user/canalpetrobras'>Youtube</a>
                        <a target="_blank" href='https://twitter.com/petrobras'>Twitter</a>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                        </Link>
                    </div>
                    <small className='website-rights'>USP © 2020</small>

                </div>
            </section>
        </div>
    );
}

export default Footer;