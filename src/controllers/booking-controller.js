const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const { response } = require('express');
const bookingService = new BookingService();

const create = async(req,res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        console.log("FROM FLIGHT CONTROLLER", response);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        console.log("FROM BOOKING CONTROLLER",error);
        return res.status(error.StatusCode).json({
            message: error.message,
            success: true,
            err:error.explanation,
            data:{}
        });
    }
}   

module.exports = {
    create
}