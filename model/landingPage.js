import heroSchema from './landingPageComponents/hero.js';
import featureSchema from './landingPageComponents/feature.js';

import mongoose, { Schema } from 'mongoose';

const landingPageSchema= new mongoose.Schema({
    heroSection : {
        type: heroSchema
    },
    featureSection : {
        type: featureSchema
    }

    
}) 

export default mongoose.model('landingPage',landingPageSchema);
