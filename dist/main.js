/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_node_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_node_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let AppModule = class AppModule {
};
AppModule = __decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Module)({
        imports: [
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "haosql",
                database: "freebe-local",
                entities: [_node_node_entity__WEBPACK_IMPORTED_MODULE_3__.Node],
                synchronize: true,
            }),
            _node_node_module__WEBPACK_IMPORTED_MODULE_2__.NodeModule,
        ],
    })
], AppModule);



/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeModule: () => (/* binding */ NodeModule)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _node_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _node_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let NodeModule = class NodeModule {
};
NodeModule = __decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Module)({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__.TypeOrmModule.forFeature([_node_entity__WEBPACK_IMPORTED_MODULE_4__.Node])],
        controllers: [_node_controller__WEBPACK_IMPORTED_MODULE_2__.NodeController],
        providers: [_node_service__WEBPACK_IMPORTED_MODULE_3__.NodeService],
    })
], NodeModule);



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeController: () => (/* binding */ NodeController)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;


let NodeController = class NodeController {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    findAll() {
        return this.nodeService.findAll();
    }
    getLatest() {
        return this.nodeService.getLatest();
    }
    findOne(id) {
        return this.nodeService.findOne(+id);
    }
    create(node) {
        return this.nodeService.create(node);
    }
    update(id, node) {
        return this.nodeService.update(+id, node);
    }
    remove(id) {
        return this.nodeService.remove(+id);
    }
};
__decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], NodeController.prototype, "findAll", null);
__decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Get)("latest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], NodeController.prototype, "getLatest", null);
__decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Get)(":id"),
    __param(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], NodeController.prototype, "findOne", null);
__decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Post)(),
    __param(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Partial !== "undefined" && Partial) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], NodeController.prototype, "create", null);
__decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Put)(":id"),
    __param(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Param)("id")),
    __param(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof Partial !== "undefined" && Partial) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], NodeController.prototype, "update", null);
__decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Delete)(":id"),
    __param(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], NodeController.prototype, "remove", null);
NodeController = __decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Controller)("node"),
    __metadata("design:paramtypes", [typeof (_a = typeof _node_service__WEBPACK_IMPORTED_MODULE_1__.NodeService !== "undefined" && _node_service__WEBPACK_IMPORTED_MODULE_1__.NodeService) === "function" ? _a : Object])
], NodeController);



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeService: () => (/* binding */ NodeService)
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;




let NodeService = class NodeService {
    constructor(nodeRepository) {
        this.nodeRepository = nodeRepository;
    }
    findAll() {
        return this.nodeRepository.find();
    }
    findOne(id) {
        return this.nodeRepository.findOne({ where: { id } });
    }
    getLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const [latestNode] = yield this.nodeRepository.find({
                order: { id: "DESC" },
                take: 1,
            });
            return latestNode || null;
        });
    }
    create(node) {
        return this.nodeRepository.save(node);
    }
    update(id, node) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nodeRepository.update(id, node);
            return this.findOne(id);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nodeRepository.delete(id);
        });
    }
};
NodeService = __decorate([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __param(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_1__.InjectRepository)(_node_entity__WEBPACK_IMPORTED_MODULE_3__.Node)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_2__.Repository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_2__.Repository) === "function" ? _a : Object])
], NodeService);



/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node)
/* harmony export */ });
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;


let Node = class Node {
};
__decorate([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Node.prototype, "id", void 0);
__decorate([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Node.prototype, "x", void 0);
__decorate([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Node.prototype, "y", void 0);
__decorate([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.CreateDateColumn)({
        type: "datetime",
        transformer: {
            from: (date) => (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(date, "yyyy-MM-dd HH:mm:ss"),
            to: (date) => date,
        },
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Node.prototype, "createdAt", void 0);
__decorate([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.UpdateDateColumn)({
        type: "datetime",
        transformer: {
            from: (date) => (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(date, "yyyy-MM-dd HH:mm:ss"),
            to: (date) => date,
        },
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Node.prototype, "updatedAt", void 0);
Node = __decorate([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)()
], Node);



/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("date-fns");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_0__.NestFactory.create(_app_module__WEBPACK_IMPORTED_MODULE_2__.AppModule);
        const config = new _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.DocumentBuilder()
            .setTitle("FreeBe Dao")
            .setDescription("FreeBe Dao Task Api")
            .setVersion("1.0")
            .build();
        const document = _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.SwaggerModule.createDocument(app, config);
        _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.SwaggerModule.setup("api", app, document);
        yield app.listen(3001);
    });
}
bootstrap();

/******/ })()
;