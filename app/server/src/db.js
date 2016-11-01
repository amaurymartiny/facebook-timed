import mongoose from 'mongoose';

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
  mongoose.connect('mongodb://localhost/timed-dev');

	callback();
}
