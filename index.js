"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var mongodb_1 = require("mongodb");
var body_parser_1 = require("body-parser");
-body_parser_1["default"];
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = /*process.env.PORT ||*/ 3000;
var uri = /*process.env.MONGO_URI ||*/ "mongodb://root:root@localhost:27017/";
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: false }));
//Connect to mongodb
var client = new mongodb_1.MongoClient(uri);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var db = client.db("student");
var profile = db.collection("profile");
app.get('/', function (req, res) {
    res.send('Hello from express and typescript');
});
// GET all student data
app.get("/get", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile.find().toArray()];
            case 1:
                result = _a.sent();
                res.status(200).send(JSON.stringify(result));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).send(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET data by id
app.get("/get/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile.findOne({ "_id": req.params.id })];
            case 1:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST student data
app.post("/post", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile.insertOne({
                        "_id": req.body._id,
                        "name": req.body.name,
                        "age": req.body.age,
                        "address": req.body.address,
                        "created_date": new Date(),
                        "updated_date": new Date()
                    })];
            case 1:
                _a.sent();
                res.status(201).send({ "status": "SUCCESS" });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PUT student data
app.put("/put/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile.updateOne({ _id: req.params.id }, {
                        $currentDate: {
                            updated_date: true
                        },
                        $set: req.body
                    })];
            case 1:
                _a.sent();
                res.status(201).send({ "status": "UPDATE ".concat(req.params.id, " SUCCESS") });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE student data
app["delete"]("/del/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile.deleteOne({ _id: req.params.id })];
            case 1:
                _a.sent();
                res.status(201).send({ "status": "DELETE ".concat(req.params.id, " SUCCESS") });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).send(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE all data
app["delete"]("/keepout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile.deleteMany({})];
            case 1:
                _a.sent();
                res.status(201).send({ "status": "DELETE ALL DATA SUCCESS" });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).send(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () { return console.log("App listening on PORT ".concat(port)); });
