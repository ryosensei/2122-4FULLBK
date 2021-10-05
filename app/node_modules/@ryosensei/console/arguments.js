// VERBOSE
let v = 0;
if (process.argv.indexOf("-vvv") !== -1) {
    v = 3;
} else if (process.argv.indexOf("-vv") !== -1) {
    v = 2;
} else if (process.argv.indexOf("-v") !== -1) {
    v = 1;
}
const VERBOSE = v;

module.exports = VERBOSE;