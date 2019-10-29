const express = require('express');
const router = express.Router();



router.get('/annuity/futureValue',(req,res,next)=>{
    const annuity = {
        _cashFlowAtPeriod1: req.body.cashFlowAtPeriod1,
        _rateOfReturn: req.body.rateOfReturn,
        _noOfPeriod: req.body.noOfPeriod,
        _periodicPayment: req.body.periodicPayment
    }
    const _fvFromPaymentAtT0 = +annuity._cashFlowAtPeriod1 * Math.pow((+annuity._rateOfReturn + +1),+annuity._noOfPeriod);
    const _fvFromPeriodicPayment = +(+(Math.pow((+1 + +req.body.rateOfReturn),+req.body.noOfPeriod)-+1)/annuity._rateOfReturn) * +annuity._periodicPayment;
    const _totalFv = +_fvFromPaymentAtT0 + +_fvFromPeriodicPayment;
res.status(200).json({
    "message":"Successful",
    createdAnnuity:annuity,
    futureValueFromInitialCash:_fvFromPaymentAtT0,
    futureValueFromPeriodicPayment:_fvFromPeriodicPayment,
    totalFutureValue:_totalFv
    }
);
});

router.get('/annuity/presentValue',(req,res,next)=>{
    const annuity = {
        _cashFlowAtPeriod1: req.body.cashFlowAtPeriod1,
        _rateOfReturn: req.body.rateOfReturn,
        _noOfPeriod: req.body.noOfPeriod,
        _periodicPayment: req.body.periodicPayment
    }
    const _pvFromInitialCash = +annuity._cashFlowAtPeriod1 / +(Math.pow((+1 + +annuity._rateOfReturn),+annuity._noOfPeriod));
    const _pvFromPeriodicPayment = +annuity._periodicPayment*+((+1 - +(Math.pow((+1 + + annuity._rateOfReturn),+ -annuity._noOfPeriod)))/+annuity._rateOfReturn); 
    const _total = +_pvFromInitialCash + +_pvFromPeriodicPayment;
res.status(200).json({
    "message":"Successful",
    createdAnnuity:annuity,
    presentValueFromInitialCash:_pvFromInitialCash,
    presentValueFromPeriodicPayment:_pvFromPeriodicPayment,
    total: _total
    }
);
});

router.get('/annuity/loanPayment',(req,res,next)=>{
    const annuity = {
        _presentValue: req.body.presentValue,
        _ratePerPeriod: req.body.ratePerPeriod,
        _noOfPeriod: req.body.noOfPeriod
    }
    const _payment = +(annuity._ratePerPeriod*annuity._presentValue)/+(+1 - +Math.pow(1 + +annuity._ratePerPeriod,- +annuity._noOfPeriod));
res.status(200).json({
    "message":"Successful",
    createdAnnuity:annuity,
    payment:_payment
    }
);
});

router.get('/annuity/fvGrowingAnnuity',(req,res,next)=>{
    const annuity = {
        _firstPayment: req.body.firstPayment,
        _ratePerPeriod: req.body.ratePerPeriod,
        _growthRate: req.body.growthRate,
        _noOfPeriod: req.body.noOfPeriod
    }
    const _fvGrowingAnnuity = +annuity._firstPayment * +(+(+(+Math.pow((+1 + +annuity._ratePerPeriod),annuity._noOfPeriod)) - +(+Math.pow((+1 + +annuity._growthRate),annuity._noOfPeriod)))/+(+annuity._ratePerPeriod - +annuity._growthRate))
res.status(200).json({
    "message":"Successful",
    createdAnnuity:annuity,
    fvGrowingAnnuity:_fvGrowingAnnuity
    }
);
});
module.exports = router;