import React from 'react'

const TrackList = ({ tracks }) =>
  <div>
    <h3>Tracked websites ({tracks.length}):</h3>
    <ul>
      {tracks.map(track =>
        <li key={track.website._id}>
          <a href={track.website.url} target="_blank"><h4>{track.website.name}</h4></a>
          <p>Today: {track.timeSpentToday}</p>
          <p>Total: {track.timeSpentTotal}</p>
        </li>
      )}
    </ul>
  </div>

TrackList.propTypes = {
  tracks: React.PropTypes.array.isRequired
}

export default TrackList