const Booking = require("./../Model/bookingModel");
const booking = require("./../Model/bookingModel");
const Movie = require("./../Model/movieModel");
const catchAsync = require("./../Utils/catchAsync");

exports.createBooking = catchAsync(async (req, res, next) => {
  const { movie, user, price, seatNo, showTime, BookingDate, amount, token } =
    req.body;

  let data = {
    token: token,
    amount: amount,
  };

  let config = {
    headers: {
      Authorization: `key ${process.env.KHALTI_TEST_SECRET_KEY}`,
    },
  };

  console.log(data);

  const finalPayment = await axios.post(
    "https://khalti.com/api/v2/payment/verify/",
    data,
    config
  );
  console.log(`Final payment is: ${finalPayment.data}`);

  const bookData = await Booking.create({
    movie: finalPayment.data.product_identity,
    user: req.user._id,
    price,
    seatNo,
    bookingDate,
    showTime,
    transactionId: finalPayment.data.idx,
  });

  res.status(200).json({
    status: "success",
    data: bookData,
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const data = await Booking.find();
  res.statu(200).json({
    status: "success",
    data,
  });
});

exports.checkSeatAvailability = catchAsync(async (req, res, next) => {
  const { movieName, date, time } = req.body;

  const movie = await Movie.findOne({ _id: movieName });
  console.log(date, time);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie not found!",
    });
  }

  const pipeLine = [
    {
      $match: {
        movie: movie._id,
        bookingDate: { $eq: date },
        showTime: { $eq: time },
      },
    },
    {
      $unwind: "$seatNo",
    },
      {
          $project: {
              seatNo: 1,
              movie: 1
        }
    },
    ];
    
    const result = await Booking.aggregate(pipeline);
    res.status(200).json({
        status: 'success',
        data: result
    })
});

