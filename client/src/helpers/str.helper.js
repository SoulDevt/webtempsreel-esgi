String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const StrHelper = {
    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
    