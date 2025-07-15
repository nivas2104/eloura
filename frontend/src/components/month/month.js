import './month.css';
import React, { useState, useEffect, useRef } from 'react';
import ooty from './ooty.jpg';
import shimla from './shimla.jpg';
import manali from './manali.jpg';

export default function Month() {
    const [isVisible, setIsVisible] = useState(false);
    const servicesRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (
                servicesRef.current &&
                window.scrollY + window.innerHeight >=
                    servicesRef.current.offsetTop + 100 // slight offset
            ) {
                setIsVisible(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <div className="main" ref={servicesRef}>
            <h1>Top Places to Visit in APRIL</h1>
            <div className={`box-main ${isVisible ? 'animate' : ''}`}>
                <a href='http://localhost:3000/travel/ooty' className='box-link'><div className="box animate-from-left">
                    <img src={ooty} className='ooty' alt='ooty' />
                    <h3 className='headb'>OOTY</h3>
                    <p>Cool climate will keep you chilled in Ooty</p>
                </div></a>
                <a href='http://localhost:3000/travel/shimla' className='box-link'><div className="box animate-from-right">
                    <img src={shimla} className='ooty' alt='shimla' />
                    <h3 className='headb'>SHIMLA</h3>
                    <p>The Himalayas will keep your eyes wide open</p>
                </div></a>
                <a href='http://localhost:3000/travel/manali' className='box-link'><div className="box animate-from-left">
                    <img src={manali} className='ooty' alt='manali' />
                    <h3 className='headb'>MANALI</h3>
                    <p>The snow will take you back to childhood</p>
                </div></a>
            </div>
        </div>
    );
}
