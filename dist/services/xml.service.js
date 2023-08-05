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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertXmlToJson = exports.downloadFile = void 0;
const zlib_1 = __importDefault(require("zlib"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
const sax_1 = __importDefault(require("sax"));
function downloadFile(url, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'accept-encoding': 'gzip,deflate',
            },
        });
        return new Promise((resolve, reject) => {
            const writeStream = fs_1.default.createWriteStream(filePath);
            const inputStream = new stream_1.Readable({
                read() {
                    this.push(response.data);
                    this.push(null);
                },
            });
            const gunzip = zlib_1.default.createGunzip();
            inputStream.pipe(gunzip).pipe(writeStream);
            gunzip.on('error', (error) => {
                console.error('Error during gunzip:', error);
                reject(error);
            });
            writeStream.on('finish', () => {
                resolve();
            });
            writeStream.on('error', (error) => {
                console.error('Error writing to file:', error);
                reject(error);
            });
        });
    });
}
exports.downloadFile = downloadFile;
function convertXmlToJson(xmlPath) {
    const saxStream = sax_1.default.createStream(true);
    let jsonData = {};
    let currentElement = null;
    let currentText = '';
    saxStream.on('opentag', (node) => {
        currentElement = {};
    });
    saxStream.on('text', (text) => {
        currentText = text.trim();
    });
    saxStream.on('closetag', (node) => {
        currentElement[node.name] = currentText;
        currentText = '';
        if (node.name === 'Prices') {
            jsonData = currentElement;
        }
    });
    saxStream.on('end', () => {
        console.log('Parsing complete!');
    });
    saxStream.on('error', (err) => {
        console.error('Error parsing XML:', err);
    });
    const stream = fs_1.default.createReadStream(xmlPath, { encoding: 'utf8' });
    stream.pipe(saxStream);
    return new Promise((resolve, reject) => {
        stream.on('end', () => {
            resolve(jsonData);
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
}
exports.convertXmlToJson = convertXmlToJson;
