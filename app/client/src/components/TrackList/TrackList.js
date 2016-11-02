import React from 'react'

const TrackList = ({ tracks }) =>
  <div>
    <h3>Tracked websites ({Object.keys(tracks).length}):</h3>
    <ul>
      {Object.keys(tracks).map(key =>
        <li key={key}>
          <a href={tracks[key].website.url} target="_blank"><h4>{tracks[key].website.name}</h4></a>
          <p>Today: {tracks[key].timeTrackedToday}</p>
          <p>Total: {tracks[key].timeTrackedTotal}</p>
        </li>
      )}
    </ul>
  </div>

TrackList.propTypes = {
  tracks: React.PropTypes.object.isRequired
}

export default TrackList