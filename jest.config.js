/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
	testPathIgnorePatterns: ["dist/"],
	moduleFileExtensions: ["ts", "js"],
	preset: "ts-jest",
};
