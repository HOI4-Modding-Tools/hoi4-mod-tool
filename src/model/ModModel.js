"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModModel = /** @class */ (function () {
    function ModModel(descriptor, equipment) {
        this._equipment = {};
        this._descriptor = descriptor;
        this._equipment = equipment;
    }
    Object.defineProperty(ModModel.prototype, "descriptor", {
        get: function () {
            return this._descriptor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModModel.prototype, "equipment", {
        get: function () {
            return this._equipment;
        },
        enumerable: false,
        configurable: true
    });
    ;
    return ModModel;
}());
exports.default = ModModel;
//# sourceMappingURL=ModModel.js.map