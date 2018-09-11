import 'tracking'
import 'tracking/build/data/face'
import * as dat from 'dat.gui'

let trackVideo = (video, canvas) => {
  const tracking = global.tracking;
  let videoCanvasContext = canvas.getContext('2d')

  let tracker = new tracking.ObjectTracker('face')    
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track(video, tracker, { camera: true })
  

  tracker.on('track', function(event) {
    videoCanvasContext.clearRect(0, 0, canvas.width, canvas.height)    
    event.data.forEach(function(rect) {
      videoCanvasContext.strokeStyle = '#fff'
      videoCanvasContext.strokeRect(rect.x, rect.y, rect.width, rect.height)
      videoCanvasContext.font = '11px Helvetica'
      videoCanvasContext.fillStyle = "#fff"
      videoCanvasContext.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
      videoCanvasContext.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
    });
  });

  let gui = new dat.gui.GUI()
      gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01)
      gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1)
      gui.add(tracker, 'stepSize', 1, 5).step(0.1)
}

export default trackVideo