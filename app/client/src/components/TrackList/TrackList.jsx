import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import Popover from 'react-bootstrap/lib/Popover'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import './TrackList.less'

/**
 * Transform seconds to hh:mm:ss format
 */
const readableTime = (totalSec) => {
  const hours = parseInt(totalSec / 3600, 10) % 24 // 10 is the radix
  const minutes = parseInt(totalSec / 60, 10) % 60
  const seconds = totalSec % 60
  return (<div className="track">
    <span className="big-number">{(hours < 10 ? `0${hours}` : hours)}</span>h
    <span className="big-number">{(minutes < 10 ? `0${minutes}` : minutes)}</span>m
    <span className="big-number">{(seconds < 10 ? `0${seconds}` : seconds)}</span>s
  </div>)
}

/**
 * Format date string to dd/mm/yyyy
 */
const formatDate = (dateString) => {
  const date = new Date(dateString)
  // TODO: 01/11/2016 instead of 1/11/2016, too lazy now
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` // months are 0-11
}

/**
 * Popover to show future tracked websites
 */
const websitesPopover = (
  <Popover id="popover-new-websites" title="New websites to be added in the next release">
    You can choose to track other websites in the future, including YouTube, Wikipedia,
    Yahoo!, Amazon, Reddit, 9GAG, or&nbsp;
    <a href="mailto:amaury.martiny@gmail.com?subject=Add a new website to track&body=Hello, please add the following website to be tracked: ">
      any website you would like to see tracked
    </a>.
  </Popover>
)


const TrackList = ({ tracks, websites }) =>
  <div>
    {/* only do the map if the websites object is loaded */}
    {Object.keys(websites).length && Object.keys(tracks).map(key =>
      <Col key={key} md={6} sm={12}>
        <Panel
          header={<a href={websites[tracks[key].website].url} target="_blank" rel="noopener noreferrer">
            <h4>{websites[tracks[key].website].name}</h4>
          </a>}
          className="text-center"
        >
          <span>Today:</span>
          {readableTime(tracks[key].today)}
          <hr />
          <span>Since the&nbsp;
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="top"
            overlay={<Tooltip id={`tooltip-${key}`}>{formatDate(tracks[key].startDate)}</Tooltip>}
          >
            <span>beginning</span>
          </OverlayTrigger>:</span>
          {readableTime(tracks[key].total)}
        </Panel>
      </Col>
    )}
    <Col md={6} sm={12}>
      <Panel
        className="text-center add-track-panel" header={
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            rootClose
            overlay={websitesPopover}
          >
            <a><h4>Add a website to track</h4></a>
          </OverlayTrigger>
      }
      >
        <OverlayTrigger
          trigger="click"
          placement="left"
          rootClose
          overlay={websitesPopover}
        >
          <Glyphicon glyph="ban-circle" />
        </OverlayTrigger>
      </Panel>
    </Col>
  </div>

TrackList.propTypes = {
  tracks: React.PropTypes.object.isRequired,
  websites: React.PropTypes.object.isRequired
}

export default TrackList
