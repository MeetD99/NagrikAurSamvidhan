import {React, useState, useEffect} from 'react'

const ProgressBar = ({value, maxValue}) => {
    const fill = (value/maxValue)*100;
  return (
    <div className='progress-bar-container'>
        <div className="progress-bar">
            <div style={{
                height: "100%",
                width: `${fill}%`,
                backgroundColor: "#a66cff",
                transition: "width 0.5s"
            }} className='progress'></div>
            <span>{Math.round(fill)}%</span>
        </div>
    </div>
  )
}

export default ProgressBar