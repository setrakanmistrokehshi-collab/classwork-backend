import mongoose from "mongoose";
const cohortfourSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
       phoneNumber: {type: String, required: false, unique: true},
        img:{type: String, required: false},
        password: {type: String, required: true},
        country: {type: String, required: false},
        state: {type: String, required: false },
        
    }, 
    {timestamps: true}
)

const cohortfour = mongoose.model("cohortfour", cohortfourSchema )
export default cohortfour