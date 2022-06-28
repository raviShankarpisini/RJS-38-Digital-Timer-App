// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {time: 25, minutes: 25, seconds: 0, isPaused: true}

  timeCountDown = () => {
    const {minutes, seconds, time} = this.state
    if (minutes === 0 && seconds === 0) {
      this.setState({isPaused: true, minutes: time, seconds: 0})
      clearInterval(this.timerID)
    }
    if (seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    } else if (seconds === 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }))
    }
  }

  decreaseTime = () => {
    const {isPaused, minutes} = this.state
    if (isPaused && minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.time - 1,
        time: prevState.time - 1,
        seconds: 0,
      }))
    }
  }

  increaseTime = () => {
    const {isPaused} = this.state
    if (isPaused) {
      this.setState(prevState => ({
        minutes: prevState.time + 1,
        time: prevState.time + 1,
        seconds: 0,
      }))
    }
  }

  resetTime = () => {
    clearInterval(this.timerID)
    this.setState({minutes: 25, time: 25, seconds: 0, isPaused: true})
  }

  pauseOrStart = () => {
    const {isPaused} = this.state
    this.setState(prevState => ({isPaused: !prevState.isPaused}))
    // here we have to take !isPaused but we taken isPaused because state update is completed later
    // ,it wont updated immediately
    // and there is a lag in 1 second because of complete rotation of the cycle
    if (isPaused) {
      this.timerID = setInterval(this.timeCountDown, 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  render() {
    const {minutes, seconds, isPaused, time} = this.state
    const textInTimer = isPaused ? 'Paused' : 'Running'
    const pauseOrStartText = isPaused ? 'Start' : 'Pause'
    const srcImg = isPaused
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const altText = isPaused ? 'play icon' : 'pause icon'

    const minutesString = minutes > 9 ? minutes : `0${minutes}`
    const secondsString = seconds > 9 ? seconds : `0${seconds}`
    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="running-timer-container">
              <div className="round-time-circle">
                <h1 className="running-time">
                  {minutesString}:{secondsString}
                </h1>
                <p className="paused-text">{textInTimer}</p>
              </div>
            </div>
            <div className="text-container">
              <div className="start-reset-container">
                <div>
                  <button
                    type="button"
                    className="start-icon-container"
                    onClick={this.pauseOrStart}
                  >
                    <img src={srcImg} alt={altText} className="pause-icon" />
                    <p className="paused-text">{pauseOrStartText}</p>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="start-icon-container"
                    onClick={this.resetTime}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="pause-icon"
                      alt="reset icon "
                    />
                    <p className="paused-text">Reset</p>
                  </button>
                </div>
              </div>
              <p className="set-timer">Set Timer Limit</p>
              <div className="increase-decrease-container">
                <button
                  type="button"
                  className="plus-and-minus-button"
                  onClick={this.decreaseTime}
                >
                  -
                </button>
                <p className="count">{time}</p>
                <button
                  type="button"
                  className="plus-and-minus-button"
                  onClick={this.increaseTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
