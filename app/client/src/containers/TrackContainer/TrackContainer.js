import React from 'react'
import { connect } from 'react-redux'
import { fetchTracks } from '../../actions'
import { TrackList } from '../../components'

class TrackContainer extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTracks()
  }

  render() {
    return (
      <div>
        <TrackList tracks={this.props.tracks} />
      </div>
    )
  }
}

TrackContainer.propTypes = {
  tracks: React.PropTypes.array.isRequired,
  fetchTracks: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { isFetching, tracks, error } = state.track
  return {
    isFetching,
    tracks,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer)
