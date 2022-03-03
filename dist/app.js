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
    let markdownDir = path_1.default.join(__dirname, "..", "markdown");
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
    let { content, fileName } = req.body;
    let data = "Hello this is file";
    let p = path_1.default.join(__dirname, "..", `markdown/${fileName}`);
    try {
        let file = yield (0, promises_1.writeFile)(p, JSON.stringify(content));
        res.json({ message: "new file created.", filenName: p });
    }
    catch (ex) {
        res.json({ message: ex.message });
    }
}));
app.get('/file/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = path_1.default.join(__dirname, "..", `/markdown/${req.params.filename}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFHYixzREFBOEI7QUFDOUIsZ0RBQXVCO0FBRXZCLDBDQUFnRDtBQUVoRCxxQ0FBdUM7QUFFdkMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO0FBQ3JDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO0FBRTdCLE1BQU07QUFDTixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM5QixJQUFJLFdBQVcsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDeEQsSUFBRztRQUNELElBQUksSUFBSSxHQUFJLE1BQU0sSUFBQSxrQkFBTyxFQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztLQUU1QjtJQUFDLE9BQU0sRUFBRSxFQUFDO1FBQ1QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztLQUNqQztBQUVILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBR0gsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFFbkMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRXBDLElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFBO0lBQy9CLElBQUksQ0FBQyxHQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDM0QsSUFBRztRQUNELElBQUksSUFBSSxHQUFJLE1BQU0sSUFBQSxvQkFBUyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDdkQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUV4RDtJQUFDLE9BQU0sRUFBRSxFQUFDO1FBQ1QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztLQUNqQztBQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBRzVDLElBQUksQ0FBQyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUV0RSxJQUFHO1FBQ0QsSUFBSSxPQUFPLEdBQUksTUFBTSxJQUFBLHNCQUFZLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FFbkI7SUFBQyxPQUFNLEVBQUUsRUFBQztRQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBU0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMifQ==