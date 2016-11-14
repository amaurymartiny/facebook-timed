import React from 'react'
import { connect } from 'react-redux'
import { fetchTracks, checkTrackMessage } from '../../actions'
import { TrackList } from '../../components'

class TrackContainer extends React.Component {
  componentWillMount() {
    // fetch tracks from the server
    this.props.fetchTracks()
    // check for new HTML5 messages coming from content script
    this.props.checkTrackMessage()
  }

  render() {
    return (
      <div>
        <TrackList tracks={this.props.tracks} websites={this.props.websites} />
      </div>
    )
  }
}

TrackContainer.propTypes = {
  tracks: React.PropTypes.object.isRequired,
  websites: React.PropTypes.object.isRequired,
  fetchTracks: React.PropTypes.func.isRequired,
  checkTrackMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { tracks, websites } = state.entities
  return {
    tracks,
    websites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => dispatch(fetchTracks()),
    checkTrackMessage: () => dispatch(checkTrackMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer)
