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
exports.UserSchema = exports.User = exports.UserRole = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STUDENT"] = "STUDENT";
})(UserRole || (exports.UserRole = UserRole = {}));
var User = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _isVerified_decorators;
    var _isVerified_initializers = [];
    var _isVerified_extraInitializers = [];
    var _verificationToken_decorators;
    var _verificationToken_initializers = [];
    var _verificationToken_extraInitializers = [];
    var _verificationTokenExpiry_decorators;
    var _verificationTokenExpiry_initializers = [];
    var _verificationTokenExpiry_extraInitializers = [];
    var _lastLogin_decorators;
    var _lastLogin_initializers = [];
    var _lastLogin_extraInitializers = [];
    var _resetPasswordToken_decorators;
    var _resetPasswordToken_initializers = [];
    var _resetPasswordToken_extraInitializers = [];
    var _resetPasswordExpiry_decorators;
    var _resetPasswordExpiry_initializers = [];
    var _resetPasswordExpiry_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.role = __runInitializers(this, _role_initializers, void 0);
            this.name = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.isVerified = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _isVerified_initializers, void 0));
            this.verificationToken = (__runInitializers(this, _isVerified_extraInitializers), __runInitializers(this, _verificationToken_initializers, void 0));
            this.verificationTokenExpiry = (__runInitializers(this, _verificationToken_extraInitializers), __runInitializers(this, _verificationTokenExpiry_initializers, void 0));
            this.lastLogin = (__runInitializers(this, _verificationTokenExpiry_extraInitializers), __runInitializers(this, _lastLogin_initializers, void 0));
            this.resetPasswordToken = (__runInitializers(this, _lastLogin_extraInitializers), __runInitializers(this, _resetPasswordToken_initializers, void 0));
            this.resetPasswordExpiry = (__runInitializers(this, _resetPasswordToken_extraInitializers), __runInitializers(this, _resetPasswordExpiry_initializers, void 0));
            __runInitializers(this, _resetPasswordExpiry_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _role_decorators = [(0, mongoose_1.Prop)({ enum: UserRole, default: UserRole.STUDENT })];
        _name_decorators = [(0, mongoose_1.Prop)()];
        _email_decorators = [(0, mongoose_1.Prop)({ unique: true })];
        _password_decorators = [(0, mongoose_1.Prop)()];
        _isVerified_decorators = [(0, mongoose_1.Prop)({ default: false })];
        _verificationToken_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _verificationTokenExpiry_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _lastLogin_decorators = [(0, mongoose_1.Prop)()];
        _resetPasswordToken_decorators = [(0, mongoose_1.Prop)()];
        _resetPasswordExpiry_decorators = [(0, mongoose_1.Prop)()];
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _isVerified_decorators, { kind: "field", name: "isVerified", static: false, private: false, access: { has: function (obj) { return "isVerified" in obj; }, get: function (obj) { return obj.isVerified; }, set: function (obj, value) { obj.isVerified = value; } }, metadata: _metadata }, _isVerified_initializers, _isVerified_extraInitializers);
        __esDecorate(null, null, _verificationToken_decorators, { kind: "field", name: "verificationToken", static: false, private: false, access: { has: function (obj) { return "verificationToken" in obj; }, get: function (obj) { return obj.verificationToken; }, set: function (obj, value) { obj.verificationToken = value; } }, metadata: _metadata }, _verificationToken_initializers, _verificationToken_extraInitializers);
        __esDecorate(null, null, _verificationTokenExpiry_decorators, { kind: "field", name: "verificationTokenExpiry", static: false, private: false, access: { has: function (obj) { return "verificationTokenExpiry" in obj; }, get: function (obj) { return obj.verificationTokenExpiry; }, set: function (obj, value) { obj.verificationTokenExpiry = value; } }, metadata: _metadata }, _verificationTokenExpiry_initializers, _verificationTokenExpiry_extraInitializers);
        __esDecorate(null, null, _lastLogin_decorators, { kind: "field", name: "lastLogin", static: false, private: false, access: { has: function (obj) { return "lastLogin" in obj; }, get: function (obj) { return obj.lastLogin; }, set: function (obj, value) { obj.lastLogin = value; } }, metadata: _metadata }, _lastLogin_initializers, _lastLogin_extraInitializers);
        __esDecorate(null, null, _resetPasswordToken_decorators, { kind: "field", name: "resetPasswordToken", static: false, private: false, access: { has: function (obj) { return "resetPasswordToken" in obj; }, get: function (obj) { return obj.resetPasswordToken; }, set: function (obj, value) { obj.resetPasswordToken = value; } }, metadata: _metadata }, _resetPasswordToken_initializers, _resetPasswordToken_extraInitializers);
        __esDecorate(null, null, _resetPasswordExpiry_decorators, { kind: "field", name: "resetPasswordExpiry", static: false, private: false, access: { has: function (obj) { return "resetPasswordExpiry" in obj; }, get: function (obj) { return obj.resetPasswordExpiry; }, set: function (obj, value) { obj.resetPasswordExpiry = value; } }, metadata: _metadata }, _resetPasswordExpiry_initializers, _resetPasswordExpiry_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
