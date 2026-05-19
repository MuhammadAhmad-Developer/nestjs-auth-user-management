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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
// users.service.ts
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var user_entity_1 = require("./entity/user.entity");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(userModel, jwtService) {
            this.userModel = userModel;
            this.jwtService = jwtService;
        }
        UsersService_1.prototype.register = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, hashed, verificationToken, verificationTokenExpiry;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userModel.findOne({ email: dto.email })];
                        case 1:
                            existing = _b.sent();
                            if (existing)
                                throw new common_1.ConflictException('Email already in use');
                            return [4 /*yield*/, bcrypt.hash(dto.password, 10)];
                        case 2:
                            hashed = _b.sent();
                            verificationToken = crypto.randomBytes(32).toString('hex');
                            verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.userModel.create({
                                    name: dto.name,
                                    email: dto.email,
                                    password: hashed,
                                    role: (_a = dto.role) !== null && _a !== void 0 ? _a : user_entity_1.UserRole.STUDENT,
                                    isVerified: false, //  ADD THIS
                                    verificationToken: verificationToken,
                                    verificationTokenExpiry: verificationTokenExpiry,
                                })];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.sendVerificationEmail(dto.email, dto.name, verificationToken)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, {
                                    message: 'Registration successful. Please check your email to verify your account.',
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.verifyEmail = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findOne({
                                verificationToken: dto.token,
                                verificationTokenExpiry: { $gt: new Date() },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.BadRequestException('Invalid or expired verification token');
                            user.isVerified = true;
                            user.verificationToken = undefined;
                            user.verificationTokenExpiry = undefined;
                            return [4 /*yield*/, user.save()];
                        case 2:
                            _a.sent();
                            token = this.signToken(user);
                            return [2 /*return*/, {
                                    message: 'Email verified successfully',
                                    data: { token: token },
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.login = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isMatch, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findOne({ email: dto.email })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.UnauthorizedException('Invalid email or password');
                            return [4 /*yield*/, bcrypt.compare(dto.password, user.password)];
                        case 2:
                            isMatch = _a.sent();
                            if (!isMatch)
                                throw new common_1.UnauthorizedException('Invalid email or password');
                            if (user.isVerified !== true) {
                                throw new common_1.UnauthorizedException('Please verify your email before logging in');
                            }
                            user.lastLogin = new Date();
                            return [4 /*yield*/, user.save()];
                        case 3:
                            _a.sent();
                            token = this.signToken(user);
                            return [2 /*return*/, {
                                    message: 'Login successful',
                                    data: { token: token },
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.logout = function () {
            return { message: 'Logged out successfully' };
        };
        UsersService_1.prototype.getMe = function (user) {
            return {
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                    lastLogin: user.lastLogin,
                },
            };
        };
        UsersService_1.prototype.signToken = function (user) {
            return this.jwtService.sign({
                sub: user._id,
                email: user.email,
                role: user.role,
            });
        };
        UsersService_1.prototype.sendVerificationEmail = function (email, name, token) {
            return __awaiter(this, void 0, void 0, function () {
                var transporter, verifyUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transporter = nodemailer.createTransport({
                                host: process.env.SMTP_HOST,
                                port: Number(process.env.SMTP_PORT) || 587,
                                secure: false,
                                auth: {
                                    user: process.env.SMTP_USER,
                                    pass: process.env.SMTP_PASS,
                                },
                                tls: {
                                    rejectUnauthorized: false,
                                },
                            });
                            verifyUrl = "".concat(process.env.FRONTEND_URL, "/verify-email?token=").concat(token);
                            return [4 /*yield*/, transporter.sendMail({
                                    from: "\"Your App\" <".concat(process.env.SMTP_USER, ">"),
                                    to: email,
                                    subject: 'Verify your email address',
                                    html: "\n        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <h2>Hi ".concat(name, ", welcome!</h2>\n          <p>Please verify your email address by clicking the button below:</p>\n          <a href=\"").concat(verifyUrl, "\" \n             style=\"display: inline-block; padding: 12px 24px; background-color: #4F46E5; \n                    color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;\">\n            Verify Email\n          </a>\n          <p>Or copy this link: <a href=\"").concat(verifyUrl, "\">").concat(verifyUrl, "</a></p>\n          <p>This link expires in 24 hours.</p>\n        </div>\n      "),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // GET ALL USERS
        UsersService_1.prototype.getAllUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userModel.find().select('-password')];
                });
            });
        };
        // GET SINGLE USER
        UsersService_1.prototype.getUserById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findById(id).select('-password')];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.BadRequestException('User not found');
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        // UPDATE USER
        UsersService_1.prototype.updateUser = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, data, {
                                new: true,
                            }).select('-password')];
                        case 1:
                            updated = _a.sent();
                            if (!updated)
                                throw new common_1.BadRequestException('User not found');
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        // DELETE USER
        UsersService_1.prototype.deleteUser = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var deleted;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findByIdAndDelete(id)];
                        case 1:
                            deleted = _a.sent();
                            if (!deleted)
                                throw new common_1.BadRequestException('User not found');
                            return [2 /*return*/, { message: 'User deleted successfully' }];
                    }
                });
            });
        };
        UsersService_1.prototype.forgotPassword = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, token, expiry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findOne({ email: dto.email })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('User not found');
                            }
                            token = crypto.randomBytes(32).toString('hex');
                            expiry = new Date(Date.now() + 15 * 60 * 1000);
                            user.resetPasswordToken = token;
                            user.resetPasswordExpiry = expiry;
                            return [4 /*yield*/, user.save()];
                        case 2:
                            _a.sent();
                            // 👉 Send email (or just return token for Postman testing)
                            return [2 /*return*/, {
                                    message: 'Reset token generated',
                                    token: token,
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.resetPassword = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userModel.findOne({
                                resetPasswordToken: dto.token,
                                resetPasswordExpiry: { $gt: new Date() },
                            })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('Invalid or expired token');
                            }
                            _a = user;
                            return [4 /*yield*/, bcrypt.hash(dto.newPassword, 10)];
                        case 2:
                            _a.password = _b.sent();
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpiry = undefined;
                            return [4 /*yield*/, user.save()];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, {
                                    message: 'Password reset successful',
                                }];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
