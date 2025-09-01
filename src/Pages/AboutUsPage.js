import React from 'react';
import { useParams } from 'react-router-dom';

const AboutUsPage = () => {
        const { color } = useParams();
        const allowedColors = ['red', 'blue'];
        const bgColor = allowedColors.includes(color) ? color : 'white';

        return (
        <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", lineHeight: "1.6", backgroundColor: bgColor,  color: bgColor === 'white' ? 'black' : 'white'}}>
            <h1>About Us</h1>
            <p>
                Welcome to <strong>Blue Horizon Innovations</strong>, a fictional company dedicated
                to creating imaginative and forward-thinking solutions for the modern world.
                Founded in 2020, we’ve quickly become known for our creative approach to problem-solving
                and our unwavering commitment to quality.
            </p>
            <p>
                Our mission is simple: to blend technology, design, and human-centered thinking
                into products and services that inspire and improve everyday life.
                Whether it’s developing futuristic concepts or refining existing ideas,
                we believe in pushing boundaries while keeping our feet firmly on the ground.
            </p>
            <p>
                With a diverse team of innovators, designers, and dreamers,
                <strong> Blue Horizon Innovations </strong> thrives on collaboration and curiosity.
                Every project is an opportunity to learn, grow, and bring a little more magic into the world.
            </p>
            <h3>Our Values</h3>
            <ul>
                <li>Creativity and Innovation</li>
                <li>Integrity in all we do</li>
                <li>Collaboration across disciplines</li>
                <li>Commitment to excellence</li>
            </ul>
            <p>
                Thank you for taking the time to learn more about us.
                We look forward to building the future — together.
            </p>
        </div>
    );
};

export default AboutUsPage;