let mongoose = require('mongoose'),
    Schema =  mongoose.Schema,
    userSchema = new Schema({
        name : { type : String , required : true },
        occupation : String,
        email : { type : String , required : true },
        user : { type : String , required : true },
        password : { type : String , required : true },
        department : { type : Schema.Types.ObjectId, ref : 'User' },
        reports : [{ type : Schema.Types.ObjectId , ref : 'Report'}]
    }),
    departmentSchema = new Schema({
        name : { type : String , required : true },
        users : [{ type : Schema.Types.ObjectId , ref : 'User'}],
        persons : [{ type : Schema.Types.ObjectId , ref : 'Person'}]
    }),
    reportSchema = new Schema({
        subject : String,
        description : { type : String },
        attachFile : { type : String },
        createAt : { type : Date },
        updateAt : { type : Date },
        state : {
            type : String,
            enum : ["En proceso", "Hecho", "Abierto"]
        },
        user : { type : Schema.Types.ObjectId , ref : 'User'},
        person : { type : Schema.Types.ObjectId , ref : 'Person'}
    }),
    personSchema = new Schema({
        name : { type : String, required : true },
        email : { type : String, required : true },
        reports : [{ type : Schema.Types.ObjectId , ref : 'Report'}]
    }),
    userModel = mongoose.model('User',userSchema),
    departmentModel = mongoose.model('Department',departmentSchema),
    reportModel = mongoose.model('Report', reportSchema),
    personModel = mongoose.model('Person', personSchema);

mongoose.connect('mongodb://localhost/asistenciadb');

module.exports.userModel = userModel;
module.exports.departmentModel = departmentModel;
module.exports.reportModel = reportModel;
module.exports.personModel = personModel;

