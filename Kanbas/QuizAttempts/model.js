import mongoose from 'mongoose';
import attemptSchema from './schema.js';

const Attempt = mongoose.model('Attempt', attemptSchema);

export default Attempt;
