import './hero.css';
import travelVideo from './travelvideo.mp4'; // Import your video file here

export default function Hero() {
    return (
        <div className='hero-main'>
            <div className="videocover">
                <video autoPlay muted loop className="video1">
                    <source src={travelVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <h1 className="title">"EXPERIENCE THE NEXT GENERATION OF TRAVEL"</h1>
            </div>
        </div>
    );
}
