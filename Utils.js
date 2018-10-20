class Utils {
    static NotEmpty(str) {
        if (str === null) {
            return false;
        }

        if (str === undefined) {
            return false;
        }

        if (str === '') {
            return false;
        }

        return true;
    };
}

module.exports = Utils;