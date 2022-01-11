const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema (
    {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
     name: {
         type: String,
        required: true,
     }, 
    vaccination_status: {
        type: Boolean,
        default: false,
    },
    vaccine: {
        type: String,
        enum: ["N/A", "BioNTech Pfizer", "Moderna, NIAID", "Johnson & Johnson", "Oxford-AstraZeneca" ],
        default: "N/A",
        required: true,

    }
})

module.exports = mongoose.model("Profile", profileSchema);

