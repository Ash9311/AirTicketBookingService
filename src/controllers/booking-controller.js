const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const { response } = require('express');
const bookingService = new BookingService();
const {createChannel,publishMessage} = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY} = require('../config/serverConfig');

class BookingController{

    constructor(){
        
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const data = {message: 'Success'};
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:'Successfully punlished the event'
        });
    }
    

    async create (req, res) {
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
}



module.exports =   BookingController