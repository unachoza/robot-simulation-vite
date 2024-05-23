# Toy Robot Simulator

This application simulates a toy robot moving on a 5x5 square tabletop.

## Description

-   This application simulates a toy robot moving on a 5x5 square tabletop.
-   The tabletop has no obstructions.
-   The robot can move freely on the tabletop but must not fall off.
-   Clicking on a table space will PLACE the robot on the table at the clicked position
    (using X, Y coordinates), facing north.
-   The origin (0,0) is at the SOUTH WEST corner of the table (bottom left).
-   The first valid command is a PLACE command. Subsequent commands can be
    issued in any order, including another PLACE command (i.e. you can click another
    space and it would place the original toy robot on that space).
-   MOVE will move the toy robot one space forward in the direction it is currently
    facing.
-   LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without
    changing the position of the robot.
-   REPORT will announce the X,Y position and F (facing direction) of the robot.
-   A robot not on the table ignores commands.
-   Commands can be issued via buttons on the page or arrow keys
-   Provide test instructions to exercise the application.

## Constraints

-   The toy robot must not fall off the table during movement. This also includes the
    initial placement of the toy robot. (i.e. clicking off the table should do nothing)
-   Any move that would cause the robot to fall must be ignored.

## Example Input and Output

```bash
a)
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
b)
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
c)
PLACE 1,2,North
MOVE
MOVE
RIGHT
MOVE
REPORT
Output: 2,4,East
```

## Deliverables

-   This can be built in any frontend framework or library that you’re comfortable
    with. (i.e. angular, react, vue, ember, etc.)
-   The source files, the test data and any test code in a git repo.
-   [BONUS] Add some styles, or optionally use both buttons and arrow keys
-   Timebox: Try not to spend more than 4 hours on this exercise.

## Getting Started

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your system to run this project. You can download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the Repository**

    First, clone the repository to your local machine:

    ```bash
    git clone https://github.com/unachoza/robot-simulation-vite.git
    cd robot-simulation-vite
    ```

2. **Install Dependencies**

    Run the following command in the project directory to install the required dependencies:

    ```bash
    npm install
    ```

3. **Configuration**

    No additional configuration is required for the basic functionality.

## Process

I chose React + TypeScript with Vite to build this app. I really like how much Typescript makes you think more deeply the code you are writing and it makes your code easier for others to read

I searched for Robot png, “toy robot png front, side and back”. Using an image really looks nice and makes it obvious to the user the robot is rotating.

If I had more time, I would add some error messages for the user, like some UI that said 'the robot is on the edge and you can't keep pressing move' I thought about using my Modal component, but I felt it might be too annoying / disruptive.

I would also finish my validator function(currently not working / unfinished) to have a full e2e test of the app using the test data.

See the live project at [this link](https://robot-simulation-vite.vercel.app/)
The app is response to screensize changes; but when trying the deploy link, it's not always accurate on mobile. Let me know what you think !

Thank you for the opportunity! I hope to continue this conversation and further discuss what I can bring to Rohirium
