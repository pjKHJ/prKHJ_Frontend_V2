import eslintConfiguration from "@khj/eslint-configs";

export default [
	{
		ignores: ["dev-dist/**"],
	},
	
	...eslintConfiguration,
];
