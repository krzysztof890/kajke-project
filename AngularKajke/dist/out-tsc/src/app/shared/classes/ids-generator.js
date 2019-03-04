var IdsGenerator = /** @class */ (function () {
    function IdsGenerator() {
    }
    /**
     * Zwraca unikalny identyfikator
     */
    IdsGenerator.getUniqueID = function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    return IdsGenerator;
}());
export { IdsGenerator };
//# sourceMappingURL=ids-generator.js.map