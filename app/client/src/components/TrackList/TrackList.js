import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import './TrackList.less'

/**
 * Transform seconds to hh:mm:ss format
 */
const readableTime = (totalSec) => {
  const hours = parseInt( totalSec / 3600 ) % 24
  const minutes = parseInt( totalSec / 60 ) % 60
  const seconds = totalSec % 60
  return <div className="track">
    <span className="big-number">{(hours < 10 ? '0' + hours : hours)}</span>h
    <span className="big-number">{(minutes < 10 ? '0' + minutes : minutes)}</span>m
    <span className="big-number">{(seconds  < 10 ? '0' + seconds : seconds)}</span>s
  </div>
}

const TrackList = ({ tracks, websites }) =>
  <div>
    {Object.keys(tracks).map(key =>
      <Col key={key} md={6} sm={12}>
        <Panel
          header={<a href={websites[tracks[key].website].url} target="_blank"><h4>{websites[tracks[key].website].name}</h4></a>}
          className="text-center"
        >
          <span>Today:</span>
          {readableTime(tracks[key].today)}
          <hr />
          <span>Since the beginning:</span>
          {readableTime(tracks[key].total)}
        </Panel>
      </Col>
    )}
  </div>

TrackList.propTypes = {
  tracks: React.PropTypes.object.isRequired,
  websites: React.PropTypes.object.isRequired
}

export default TrackList
