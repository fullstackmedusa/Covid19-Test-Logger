const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const testSchema = new Schema(
    {
        test_type: {
            type: String,
            enum: ["PCR", "Rapid Antigen"],
            default: "PCR",
            required: true,
        },
        date_tested: {
            type: Date,
            default: Date.now,
        },
        result: {
            type: String,
            enum: ["Positive", "Negative"],
            default: "Negative",
            required: true
        }
    })

const profileSchema = new Schema(
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
            type: String,
            enum: ["Vaccinated", "Unvaccinated"],
            default: "Unvaccinated",
            required: true,
        },
        vaccine: {
            type: String,
            enum: ["N/A", "BioNTech Pfizer", "Moderna, NIAID", "Johnson & Johnson", "Oxford-AstraZeneca"],
            default: "N/A",
            required: true,

        },
        tests: [testSchema]

    })


module.exports = {
    Profile: mongoose.model("Profile", profileSchema),
    Test: mongoose.model("Test", testSchema)
};

