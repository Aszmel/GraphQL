// import { configure } from "enzyme";
const Enzyme = require("enzyme");
// const configure = require("enzyme");
// import Adapter from "enzyme-adapter-react-16";
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

// module.exports = {
//   moduleFileExtensions: ["js", "jsx", "json", "vue"],
//   transform: {
//     "^.+\\.vue$": "vue-jest",
//     ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
//       "jest-transform-stub",
//     "^.+\\.(js|jsx)?$": "babel-jest"
//   },
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1"
//   },
//   snapshotSerializers: ["jest-serializer-vue"],
//   testMatch: [
//     "<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))"
//   ],
//   transformIgnorePatterns: ["<rootDir>/node_modules/"]
// };
