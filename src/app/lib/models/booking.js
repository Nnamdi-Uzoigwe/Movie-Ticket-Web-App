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
                ref: "user", // Reference to the User model
                required: true
            },
            seatNo: {
                type: String,
                required: true
            }
        }
    ]
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
