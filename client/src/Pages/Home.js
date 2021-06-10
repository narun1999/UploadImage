import React from 'react';
import "./Home.css"
import { Slide } from 'react-slideshow-image';
import image1 from "../uploads/image2.jpg"
import image2 from "../uploads/image3.jpg"
import 'react-slideshow-image/dist/styles.css'

const Home = () => (
  <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div className="image-container">
              <img src={image1} alt=" " />
            </div>
  
          </div>
          <div className="each-slide">
            <div className="image-container">
              <img src={image2} alt=" "/>
            </div>
  
          </div>

        </Slide>
      </div>
);


export default Home;
