import React from 'react';
import './feedback.css'; // Import the CSS file
import user1 from './user.jpg'
import user2 from './user_2.jpg'
import user3 from './user_3.jpg'

function Feedback() {
    return (
        <section className="testimonial">
            <div className="container">
                <h2 className="section-title">Join the Adventure, Read Our Reviews</h2>
                <div className="testimonial-wrapper">
                    <div className="testimonial-list">
                        <div>
                            <img src={user1} className="testimonial-user-image" alt="User"/>
                            <p className="testimonial-content">"I had an amazing time on my tour with tour. ”</p>
                            <div className="testimonial-user-name">Nivas</div>
                            <div className="testimonial-user-job">Gym Trainer</div>
                        </div>
                        <div>
                            <img src={user2} className="testimonial-user-image" alt="User"/>
                            <p className="testimonial-content">"It's a very good organization. I highly recommend tour.”</p>
                            <div className="testimonial-user-name">Saketh</div>
                            <div className="testimonial-user-job">Editor</div>
                        </div>
                        <div>
                            <img src={user3} className="testimonial-user-image" alt="User"/>
                            <p className="testimonial-content">"A Good Website For Travel Plans”</p>
                            <div className="testimonial-user-name">Prem</div>
                            <div className="testimonial-user-job">Priest</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feedback;