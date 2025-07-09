import React from 'react';
import './Style.css';

const About = () => {
  return (
    <>
      <div className="about-header">
        <h1>About Us</h1>
        <h2>PCS Founder Vision</h2>
        <p>
          &#8594; Let my hands be of service to young freshers.<br /><br />
          &#8594; Let my hands do good work for society. My initiative is to bring joy and a smile to thousands of innocent freshers who are looking for their first job and career opportunity.<br /><br />
          &#8594; Let us join hands in cooperation and support to make this mission and vision successful. Together, let’s make PCS Global the best platform for freshers to begin their careers in India.<br /><br />
          &#8594; Give me your trust for a short duration, and I will help you gain freedom and independence from the challenges of the "fresher" tag after education.
        </p>
      </div>

      <div className="footer">
        <div className="box1">
          <h4>Download</h4>
          <p>Coming soon</p>
        </div>
        <div className="box1">
          <h4>Solutions</h4>
          <p>
            IT Management<br />
            Cyber Security<br />
            Cloud Computing<br />
            IT Consulting<br />
            Software Development<br />
            IT Support
          </p>
        </div>
        <div className="box1">
          <h4>Hire Dedicated Developers</h4>
          <p>
            Hire AngularJS Developers<br />
            Hire ReactJS Developers<br />
            Hire Java Developers<br />
            Hire Python Developers<br />
            Hire React Native Developers<br />
            Hire MEAN Stack Developers
          </p>
        </div>
        <div className="box1">
          <h4>Resources</h4>
          <p>
            Pricing and Plans<br />
            Terms of Service<br />
            Help & FAQ<br />
            Site Map<br />
            Legal Team
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
