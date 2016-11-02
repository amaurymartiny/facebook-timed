import React from 'react'
import { connect } from 'react-redux'
import { fetchTracks } from '../../actions'
import { TrackList } from '../../components'

class TrackContainer extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.tracks) //eslint-disable-line
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
  tracks: React.PropTypes.object.isRequired,
  fetchTracks: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { tracks } = state.entities
  return {
    tracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer)
