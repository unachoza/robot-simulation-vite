export type CommandType = {
	command: string;
	location?: number[];
	direction?: string;
};

export type OutputDataType = {
	location: number[];
	direction: string;
};

export type TestDataType = {
	input: CommandType[];
	output: OutputDataType;
};

export const testData: TestDataType[] = [
	{
		input: [{ command: "PLACE", location: [0, 0], direction: "NORTH" }, { command: "MOVE" }, { command: "REPORT" }],
		output: { location: [0, 1], direction: "NORTH" },
	},
	{
		input: [{ command: "PLACE", location: [0, 0], direction: "NORTH" }, { command: "LEFT" }, { command: "REPORT" }],
		output: { location: [0, 0], direction: "WEST" },
	},
	{
		input: [
			{ command: "PLACE", location: [1, 2], direction: "NORTH" },
			{ command: "MOVE" },
			{ command: "MOVE" },
			{ command: "RIGHT" },
			{ command: "MOVE" },
			{ command: "REPORT" },
		],
		output: { location: [2, 4], direction: "EAST" },
	},
];
