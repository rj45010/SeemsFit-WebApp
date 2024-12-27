import React from 'react';
import './css/AboutUs.css';

const AboutUs = () => {
  return (
    <section className="container">
      <div className='div'>
        <h5 className='h5'>About Me</h5>
        <p className='detail'>
        Welcome to <b>Seems fit</b>, your trusted companion on the journey to achieving your fitness goals! As the sole creator behind Seemsfit, I understand that every individual's path to a healthier, stronger self is unique and deeply personal. That's why I've dedicated myself to developing a workout tracker designed to support and empower you at every step.
        I'm also committed to regularly expanding the library of pre-planned workouts, ensuring that you always have new options and variety to explore as your fitness journey evolves.
        Thank you for choosing Seemsfit as your fitness partner. Your trust and support mean the world to me as I continue to build and improve the platform for you. Together, we'll make great strides toward achieving your fitness aspirations!
        </p>
      </div>
      <div className='div'>
        <h5 className='h5'>Mission</h5>
        <p className='detail'>
        My mission is straightforward - to empower you to optimize your workouts and achieve your fitness goals efficiently. Whether you're an experienced athlete or just beginning your fitness journey, Seemsfit is here to provide you with the tools, guidance, and insights needed for success.
        </p>
      </div>
      <div className='div'>
      <h5 className='h5'>Future Scope</h5>
        <p className='detail'>
          At <b>Seems fit</b>, I envision a future where your fitness journey is not just supported but completely personalized. Here's a glimpse of what's to come:
        </p>
        <ul>
        <li className='detail'>
            <b>More Comprehensive Workout Tracking:</b> Workout tracking is already available, and I'm continuously working to enhance it. Soon, more advanced features will be added, allowing you to create, customize, and track your workouts even more effectively.
          </li>
          <br />
          <li className='detail'>
            <b>Suplement Shop:</b> A shop where you can purchase protein supplements and health products that I personally trust and have used. This will ensure you have access to reliable and effective products to complement your fitness journey.
          </li>
        </ul>
        <p className='detail'>
          The goal is to evolve Seems fit into a comprehensive platform that not only supports but enhances your path to a healthier, stronger you. Stay tuned for these exciting updates as Seems fit grows alongside you!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;