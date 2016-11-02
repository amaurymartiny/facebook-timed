import React from 'react'

const TrackList = ({ tracks }) =>
  <div>
    <h3>Tracked websites ({tracks.result ? Object.keys(tracks.result).length : 0}):</h3>
    <ul>
      {tracks.result && Object.keys(tracks.result).map(key =>
        <li key={tracks.result[key].website._id}>
          <a href={tracks.result[key].website.url} target="_blank"><h4>{tracks.result[key].website.name}</h4></a>
          <p>Today: {tracks.result[key].timeTrackedToday}</p>
          <p>Total: {tracks.result[key].timeTrackedTotal}</p>
        </li>
      )}
    </ul>
  </div>

TrackList.propTypes = {
  tracks: React.PropTypes.object.isRequired
}

export default TrackList