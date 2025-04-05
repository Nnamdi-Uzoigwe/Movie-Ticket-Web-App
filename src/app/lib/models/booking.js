import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    bookedSeat: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
                required: true
            },
            seatNo: String,  
        
        }
    ]
});



export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
