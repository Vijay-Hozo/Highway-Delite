const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema(
    {
        waste_type: {
            type: String,
            required: true
        },
        waste_quantity: {
            type: Number,
            required: true
        },
        waste_location: {
            type: String,
            required: true
        },
        waste_date: {
            type: Date,
            required: true
        },
        waste_time: {
            type: String,
            required: true
        },
        waste_price : {
            type: Number,
            // required: true
        }
    }
)

const WasteModel = mongoose.model("Waste", WasteSchema);
module.exports = WasteModel;