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
const node_fs_1 = require("node:fs");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
// App
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let markdownDir = path_1.default.resolve(process.cwd() + "/markdown");
    try {
        let file = yield (0, promises_1.readdir)(markdownDir);
        res.json({ markdown: file });
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
app.get('/api/posts', (req, res) => {
    res.send([{ name: "Rasel" }]);
});
app.post('/file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { content, filenName } = req.body;
    let data = "Hello this is file";
    let p = path_1.default.resolve(process.cwd() + `/markdown/${filenName}`);
    try {
        let file = yield (0, promises_1.writeFile)(p, JSON.stringify(content));
        res.json({ message: "new file created.", filenName: p });
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
app.get('/file/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = path_1.default.resolve(process.cwd() + `/markdown/${req.params.filename}`);
    try {
        let content = yield (0, node_fs_1.readFileSync)(p, "utf-8");
        res.send(content);
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFHYixzREFBOEI7QUFDOUIsZ0RBQXVCO0FBRXZCLDBDQUFnRDtBQUVoRCxxQ0FBdUM7QUFFdkMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO0FBQ3JDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO0FBRTdCLE1BQU07QUFDTixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM5QixJQUFJLFdBQVcsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQTtJQUMzRCxJQUFHO1FBQ0QsSUFBSSxJQUFJLEdBQUksTUFBTSxJQUFBLGtCQUFPLEVBQUMsV0FBVyxDQUFDLENBQUE7UUFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBRTVCO0lBQUMsT0FBTSxFQUFFLEVBQUM7UUFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0tBQ2pDO0FBRUgsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFHSCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUVuQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFckMsSUFBSSxJQUFJLEdBQUcsb0JBQW9CLENBQUE7SUFDL0IsSUFBSSxDQUFDLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsYUFBYSxTQUFTLEVBQUUsQ0FBQyxDQUFBO0lBQzlELElBQUc7UUFDRCxJQUFJLElBQUksR0FBSSxNQUFNLElBQUEsb0JBQVMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3ZELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7S0FFeEQ7SUFBQyxPQUFNLEVBQUUsRUFBQztRQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUU1QyxJQUFJLENBQUMsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxhQUFhLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUV4RSxJQUFHO1FBQ0QsSUFBSSxPQUFPLEdBQUksTUFBTSxJQUFBLHNCQUFZLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FFbkI7SUFBQyxPQUFNLEVBQUUsRUFBQztRQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBU0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMifQ==