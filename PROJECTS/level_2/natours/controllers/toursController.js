const Tour = require('../models/tourSchema');

/* CREATE */
exports.createTour = async (req, res) => {
    try {
        console.log(req.body); /* Always console to figure out the shape of the req body */

        /*
        const newTour = new Tour({});
        newTour.save();
        */
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            success: true,
            message: "New Tour created successfully",
            tour: newTour
        });

    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
}

/* READ */
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        if (!tours || tours.length == 0) {
            return res.status(404).json({
                success: false,
                message: "No tours found!",
            });
        }
        res.status(200).json({
            success: true,
            message: `Successfully fetched all ${tours.length} tours.`,
            tours
        });
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
}

/* Quering */
/*
exports.getAllTours = async (req, res) => {
    try {

        // filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el]);


        // advanced filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        console.log(JSON.parse(queryStr))

        const query = Tour.find(JSON.parse(queryStr))

        // sorting
        if(req.query.sort) {
            query = query.sort(req.query.sort)
        }

        // limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select(''-__v)
        }

        // PAGINATION, page 1 : 1-10, page 2 : 11-20, page 3 : 21-30 etc

        const page = req.query.page * 1 || 1; // string * 1 gives number
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit; // if we are in page 2 then 2 - 1 = 1 i.e 1-10

        query = query.skip(skip).limit(limit)

        if(req.query.page) {
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) throw new Error('This page does not exist');
        }

        const tours = await query;

        if (!tours || tours.length == 0) {
            return res.status(404).json({
                success: false,
                message: "No tours found!",
            });
        }
        res.status(200).json({
            success: true,
            message: `Successfully fetched all ${tours.length} tours.`,
            tours
        });
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
}
*/

exports.getTourByID = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successfully fetched tour",
            tour
        });
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
}

/* UPDATE : Patch */
exports.updateTour = async (req, res) => {
    try {
        console.log(req.body)
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        /* 
        findByIdAndUpdate(whichToUpdate, whatToUpdate, {options}) 
        new : true, returns updated documents, new is depricated use returnDocument

        runValidators : true, runs mongoose schea validation, by default doesn't run in update maybe 
        */

        res.status(200).json({
            success: true,
            message: "Successfully updated tour",
            data: { tour }
        });

    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
}

/* DELETE */
exports.deleteTour = async (req, res) => {
    try {
        /* Common Practice : neither save deleted item nor send that deleted item to client. */
        await Tour.findByIdAndDelete(req.params.id)
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found!",
            });
        }
        res.status(204).json({
            success: true,
            message: "Successfully deleted tour"
        });
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
}