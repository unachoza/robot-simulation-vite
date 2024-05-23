export type Direction = "north" | "east" | "south" | "west";
export type Index = { x: number; y: number };

export interface RobotState {
	direction: Direction;
	location?: Index | null;
	left: number;
	top: number;
}
