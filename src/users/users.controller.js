"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
// users.controller.ts
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../../../../../../../src/guard/jwt.guard");
var common_2 = require("@nestjs/common");
var roles_decorator_1 = require("../role/roles.decorator");
var roles_guard_1 = require("../role/roles.guard");
var user_entity_1 = require("./entity/user.entity");
var UsersController = function () {
    var _classDecorators = [(0, common_1.Controller)('user')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _register_decorators;
    var _verifyEmail_decorators;
    var _login_decorators;
    var _logout_decorators;
    var _getMe_decorators;
    var _getAllUsers_decorators;
    var _getUser_decorators;
    var _updateUser_decorators;
    var _deleteUser_decorators;
    var _forgotPassword_decorators;
    var _resetPassword_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        UsersController_1.prototype.register = function (dto) {
            return this.authService.register(dto);
        };
        UsersController_1.prototype.verifyEmail = function (dto) {
            return this.authService.verifyEmail(dto);
        };
        UsersController_1.prototype.login = function (dto) {
            return this.authService.login(dto);
        };
        UsersController_1.prototype.logout = function () {
            return this.authService.logout();
        };
        UsersController_1.prototype.getMe = function (req) {
            return this.authService.getMe(req.user);
        };
        UsersController_1.prototype.getAllUsers = function () {
            return this.authService.getAllUsers();
        };
        UsersController_1.prototype.getUser = function (id) {
            return this.authService.getUserById(id);
        };
        UsersController_1.prototype.updateUser = function (id, body) {
            return this.authService.updateUser(id, body);
        };
        UsersController_1.prototype.deleteUser = function (id) {
            return this.authService.deleteUser(id);
        };
        UsersController_1.prototype.forgotPassword = function (dto) {
            return this.authService.forgotPassword(dto);
        };
        UsersController_1.prototype.resetPassword = function (dto) {
            return this.authService.resetPassword(dto);
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _register_decorators = [(0, common_1.Post)('register')];
        _verifyEmail_decorators = [(0, common_1.Post)('verify-email')];
        _login_decorators = [(0, common_1.Post)('login')];
        _logout_decorators = [(0, common_1.Post)('logout'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard)];
        _getMe_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard)];
        _getAllUsers_decorators = [(0, common_1.Get)('admin/users'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN)];
        _getUser_decorators = [(0, common_1.Get)('admin/users/:id'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN)];
        _updateUser_decorators = [(0, common_2.Put)('admin/users/:id'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN)];
        _deleteUser_decorators = [(0, common_2.Delete)('admin/users/:id'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN)];
        _forgotPassword_decorators = [(0, common_1.Post)('forgot-password')];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password')];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: function (obj) { return "verifyEmail" in obj; }, get: function (obj) { return obj.verifyEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMe_decorators, { kind: "method", name: "getMe", static: false, private: false, access: { has: function (obj) { return "getMe" in obj; }, get: function (obj) { return obj.getMe; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllUsers_decorators, { kind: "method", name: "getAllUsers", static: false, private: false, access: { has: function (obj) { return "getAllUsers" in obj; }, get: function (obj) { return obj.getAllUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUser_decorators, { kind: "method", name: "getUser", static: false, private: false, access: { has: function (obj) { return "getUser" in obj; }, get: function (obj) { return obj.getUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: function (obj) { return "updateUser" in obj; }, get: function (obj) { return obj.updateUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteUser_decorators, { kind: "method", name: "deleteUser", static: false, private: false, access: { has: function (obj) { return "deleteUser" in obj; }, get: function (obj) { return obj.deleteUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
