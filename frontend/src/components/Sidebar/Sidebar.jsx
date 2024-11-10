import { useState, useEffect } from 'react';
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [goodCount, setGoodCount] = useState(0);
  const [notGoodCount, setNotGoodCount] = useState(0);
  const [itsTrue, setItsTrue] = useState(null); 
  const [isRunning, setIsRunning] = useState(false); 
  const [seconds, setSeconds] = useState(0); 


  useEffect(() => {
    const fetchMachineStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/machine-status');
        const data = await response.json();
        setIsRunning(data.isRunning);
      } catch (error) {
        console.error("Error fetching machine status:", error);
      }
    };
    fetchMachineStatus();

    const intervalId = setInterval(fetchMachineStatus, 3000); 
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRunning]);


  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/status");
        const data = await response.json();
        setGoodCount(data.goodCount);
        setNotGoodCount(data.notGoodCount);

        if (data.lastClicked === 'good') {
          setItsTrue(1); 
        } else if (data.lastClicked === 'notGood') {
          setItsTrue(0); 
        } else {
          setItsTrue(null); 
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
    const intervalId = setInterval(fetchCounts, 3000);

    return () => clearInterval(intervalId);
  }, [goodCount, notGoodCount]);

  return (
    <div className="home">
      <div className='sidebar'>
        <div>
          <h3>Machine Status</h3>
        </div>
      <div className='clock btn-container'>
          <div>{isRunning ? `${Math.floor(seconds / 60)}:${seconds % 60}` : "0:00"}</div>
        </div>
        <div className="part-count">
          <h3>Part count</h3>
        </div>
        <div className="report-btn">
          <div className="cont1">Good: {goodCount}</div>
          <div className="cont2">Not Good: {notGoodCount}</div>
        </div>
       
      </div>

      <div className="main">
        <div className="main-title">
          <h3>Part Status</h3>
        </div>

        <div className={`main-btn1 ${itsTrue === 1 ? 'active-green' : 'inactive-green'}`}>
          OK
        </div>
        <div className={`main-btn2 ${itsTrue === 0 ? 'active-red' : 'inactive-red'}`}>
          Not OK
        </div>

        <div className="part-images">
          <h3>Part Images</h3>
        </div>
        <div className="part-images">
          {itsTrue === 1 ? (
            <>
              <div className="part-image1 grid-item">
                <img src={assets.goodimg1} alt="" />
              </div>
              <div className="part-image2 grid-item">
                <img src={assets.goodimg2} alt="" />
              </div>
              <div className="part-image3 grid-item">
                <img src={assets.goodimg3} alt="" />
              </div>
              <div className="part-image4 grid-item">
                <img src={assets.goodimg4} alt="" />
              </div>
              <div className="part-image5 grid-item">
                <img src={assets.goodimg5} alt="" />
              </div>
              <div className="part-image6 grid-item">
                <img src={assets.goodimg6} alt="" />
              </div>
              <div className="part-image7 grid-item">
                <img src={assets.goodimg7} alt="" />
              </div>
              <div className="part-image8 grid-item">
                <img src={assets.goodimg8} alt="" />
              </div>
            </>
          ) : itsTrue === 0 ? (
            <>
              <div className="part-image1 grid-item">
                <img src={assets.notgoodimg1} alt="" />
              </div>
              <div className="part-image2 grid-item">
                <img src={assets.notgoodimg2} alt="" />
              </div>
              <div className="part-image3 grid-item">
                <img src={assets.notgoodimg3} alt="" />
              </div>
              <div className="part-image4 grid-item">
                <img src={assets.notgoodimg4} alt="" />
              </div>
              <div className="part-image5 grid-item">
                <img src={assets.notgoodimg5} alt="" />
              </div>
              <div className="part-image6 grid-item">
                <img src={assets.notgoodimg6} alt="" />
              </div>
              <div className="part-image7 grid-item">
                <img src={assets.notgoodimg7} alt="" />
              </div>
              <div className="part-image8 grid-item">
                <img src={assets.notgoodimg8} alt="" />
              </div>
            </>
          ) : (
            <div>No images to display</div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Sidebar;
