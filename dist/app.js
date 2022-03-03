'use strict';
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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
// App
const app = (0, express_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = path_1.default.join(__dirname, "..");
    try {
        let file = yield (0, promises_1.readdir)(p);
        res.json({ files: file });
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
app.get('/api/posts', (req, res) => {
    res.send([{ name: "Rasel" }]);
});
app.post('/file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = "Hello this is file";
    let p = path_1.default.join(__dirname, "..", "newfile.md");
    try {
        let file = yield (0, promises_1.writeFile)(p, JSON.stringify(data));
        res.json({ message: "new file created.", path: p });
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFHYixzREFBOEI7QUFDOUIsZ0RBQXVCO0FBRXZCLDBDQUFnRDtBQUVoRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUE7QUFDckMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7QUFFN0IsTUFBTTtBQUNOLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzlCLElBQUksQ0FBQyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xDLElBQUc7UUFDRCxJQUFJLElBQUksR0FBSSxNQUFNLElBQUEsa0JBQU8sRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FFekI7SUFBQyxPQUFNLEVBQUUsRUFBQztRQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7S0FDakM7QUFFSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQztBQUdILEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFBO0lBQy9CLElBQUksQ0FBQyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNoRCxJQUFHO1FBQ0QsSUFBSSxJQUFJLEdBQUksTUFBTSxJQUFBLG9CQUFTLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0tBRW5EO0lBQUMsT0FBTSxFQUFFLEVBQUM7UUFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQVFILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDIn0=