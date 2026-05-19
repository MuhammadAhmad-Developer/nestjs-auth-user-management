"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSchema = exports.Feedback = exports.FeedbackStatus = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var FeedbackStatus;
(function (FeedbackStatus) {
    FeedbackStatus["ACTIVE"] = "ACTIVE";
    FeedbackStatus["REVIEWING"] = "REVIEWING";
    FeedbackStatus["COMPLETED"] = "COMPLETED";
})(FeedbackStatus || (exports.FeedbackStatus = FeedbackStatus = {}));
var Feedback = function () {
    var _classDecorators = [(0, mongoose_1.Schema)({ timestamps: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _adminReply_decorators;
    var _adminReply_initializers = [];
    var _adminReply_extraInitializers = [];
    var _isNotified_decorators;
    var _isNotified_initializers = [];
    var _isNotified_extraInitializers = [];
    var Feedback = _classThis = /** @class */ (function () {
        function Feedback_1() {
            this.user = __runInitializers(this, _user_initializers, void 0);
            this.message = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.status = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.adminReply = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _adminReply_initializers, void 0));
            this.isNotified = (__runInitializers(this, _adminReply_extraInitializers), __runInitializers(this, _isNotified_initializers, void 0));
            __runInitializers(this, _isNotified_extraInitializers);
        }
        return Feedback_1;
    }());
    __setFunctionName(_classThis, "Feedback");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true })];
        _message_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _status_decorators = [(0, mongoose_1.Prop)({ enum: FeedbackStatus, default: FeedbackStatus.ACTIVE })];
        _adminReply_decorators = [(0, mongoose_1.Prop)()];
        _isNotified_decorators = [(0, mongoose_1.Prop)({ default: false })];
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _adminReply_decorators, { kind: "field", name: "adminReply", static: false, private: false, access: { has: function (obj) { return "adminReply" in obj; }, get: function (obj) { return obj.adminReply; }, set: function (obj, value) { obj.adminReply = value; } }, metadata: _metadata }, _adminReply_initializers, _adminReply_extraInitializers);
        __esDecorate(null, null, _isNotified_decorators, { kind: "field", name: "isNotified", static: false, private: false, access: { has: function (obj) { return "isNotified" in obj; }, get: function (obj) { return obj.isNotified; }, set: function (obj, value) { obj.isNotified = value; } }, metadata: _metadata }, _isNotified_initializers, _isNotified_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Feedback = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Feedback = _classThis;
}();
exports.Feedback = Feedback;
exports.FeedbackSchema = mongoose_1.SchemaFactory.createForClass(Feedback);
