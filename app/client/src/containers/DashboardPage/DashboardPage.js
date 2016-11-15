import React from 'react'
import { connect } from 'react-redux'
import { fetchTracks, checkTrackMessage } from '../../actions'
import { TrackList, ExtensionConnected } from '../../components'

class DashboardPage extends React.Component {
  componentWillMount() {
    // fetch tracks from the server
    this.props.fetchTracks()
  }

  render() {
    return (
      <div>
        <div className="page-header text-center">
          <h1>My Websites</h1>
          <ExtensionConnected isExtensionConnected={this.props.isExtensionConnected} />
        </div>
        <TrackList tracks={this.props.tracks} websites={this.props.websites} />
      </div>
    )
  }
}

DashboardPage.propTypes = {
  isExtensionConnected: React.PropTypes.bool.isRequired,
  tracks: React.PropTypes.object.isRequired,
  websites: React.PropTypes.object.isRequired,
  fetchTracks: React.PropTypes.func.isRequired,
  checkTrackMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { isExtensionConnected } = state.app
  const { tracks, websites } = state.entities
  return {
    isExtensionConnected,
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
