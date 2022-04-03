const mongoose = require("mongoose");
const { Schema } = mongoose;

const broj = {
    required:true,
    type:Number,
}

const logUlazSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        comments: String,
        image: String,
        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        latitude: {
            ...broj,
            min: -90,
            max: 90,
        },
        longitude: {
            ...broj,
            min: -180,
            max: 180,
        },
        visitDate: {
            required: true,
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const LogUlaz=mongoose.model("collections",logUlazSchema);
module.exports = LogUlaz;