import React, { Component } from 'react'
import trackVideo from '../../utils/trackVideo'


class Demo extends Component {    
    render () {
      return (
        <div>
            <video ref="video" width="640" height="480" preload={1} autoPlay loop muted></video>            
            <canvas ref="outputCanvas" id="videoLayer" width="640" height="480" style={{display: 'block'}} ></canvas>            
        </div>
      )
    }
    componentDidMount(){          
        trackVideo(this.refs.video, this.refs.outputCanvas)
    }     
}

export default Demo