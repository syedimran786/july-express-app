const Alumini = require('../models/alumini.model')
const { StatusCodes: { CREATED, OK } } = require('http-status-codes');
const reader = require('xlsx')



let addAlumini = async (req, res, next) => {
    try {
        let { name, yearofpassout, gender, department, profile } = req.body;

        console.log(req.file)

        //! altering the path of file and storing in db
        let port = "http://localhost:4500"
        // let path=req.file.path.replace("public","");
        let path = req.file.path.split("public")[1];
        let imagePath = port + path

        //! altering the path of file and storing in db




        let alumini = await Alumini.create({
            name, yearofpassout, gender, department,
            profile: imagePath
        })

        res.status(CREATED).json({ error: false, message: "Alumini Added Successfully", data: alumini })
    }
    catch (err) {
        next(err)
    }
}

let getAluminis = async (req, res, next) => {
    try {
        let aluminis = await Alumini.find({});
        res.status(OK).json({ error: false, message: "Alumini Fetched Successfully", data: aluminis })

    }
    catch (err) {
        next(err)
    }
}


let addAluminiFromExcel = async (reqq, res, next) => {
    try {



        // Reading our test file
        const file = reader.readFile('./public/uploads/MOCK_DATA.xlsx')

        let data = []

        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }

        // // Printing data
        console.log(data)
        let aluminis=await Alumini.insertMany(data)
        res.status(201).json({error:false,message:"Excel Added Successfully",data:aluminis})
    }
    catch (err) {
        next(err)
    }
}


module.exports = {
    addAlumini,
    getAluminis,
    addAluminiFromExcel
}