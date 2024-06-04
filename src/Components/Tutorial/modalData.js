import image from "../../assets/slide2pic.png";
import gif from "../../assets/giphy.webp";
export const modalData = [
  {
    heading: "Welcome to Pathfinding Visualizer",
    subheading:
      "This tutorial will guide you through the features and functionality of the tool, helping you understand various pathfinding algorithms and how they work.",
    text: `You can skip the tutorial by clicking the "Skip Tutorial" button or go on to the next slide using the 'Next" button.`,
    image,
  },
  {
    heading: "What is a Path Finding Algorithm?",
    subheading:
      "A path finding algorithm is a computational method used to find the shortest or most efficient route between two points in a graph or grid.This visualizer helps to show the working of such algorithms.",
    text: "Here we have a 2D grid which represents a network of nodes interconnected with each other.Each cell represents a node and traveling from one cell to another has a cost of 1.",
    image,
  },
  {
    heading: "Selecting an Algorithm",
    subheading:
      'Select any algorithm you like from the "Algorithms" drop down menu to visualize it.',
    text: "It is important to note that some algorithms are unweighted, meaning they ignore the cost of turns and node weights, while others are weighted and do consider these factors. Furthermore, not all algorithms ensure the shortest possible path.",
    image: gif,
  },
  {
    heading: "Introducing the Algorithms",
    subheading: "Exploring as Far as Possible",
    list: [
      {
        name: "Dijkstra's Algorithm",
        type: "weighted",
        info: "The father of pathfinding algorithms; guarantees the shortest path.",
      },
      {
        name: "A* Algorithm",
        type: "weighted",
        info: "A versatile algorithm leveraging heuristic estimates for optimal pathfinding in weighted graphs.",
      },
      {
        name: "Greedy Best-First Search",
        type: "weighted",
        info: "Efficiently explores paths guided by heuristic evaluations, often yielding good solutions but not guaranteed to be optimal.",
      },
      {
        name: "Breadth-First Search (BFS)",
        type: "unweighted",
        info: "Systematically explores all nodes level by level, ensuring optimal solutions for unweighted graphs.",
      },
      {
        name: "Depth-First Search (DFS)",
        type: "unweighted",
        info: "Traverses as far as possible along each branch before backtracking, suitable for tasks like topological sorting and maze generation.",
      },
    ],
    image,
  },
  {
    heading: "Interact with the Grid",
    subheading: `Click to add a wall and hold 'W' while clicking to add weight. Explore various maze and pattern options from the "Mazes & Patterns" drop-down menu.`,
    text: "Walls act as barriers, prohibiting paths from crossing through them. Conversely, weights increase traversal cost but are not impassable. In this application, navigating through a weighted node incurs a cost of 15.",
    image,
  },
  {
    heading: "Dragging nodes",
    subheading: "Click and drag the start and target nodes to move them.",
    text: "Keep in mind that even after an algorithm completes its run, you can still drag nodes around. This feature enables you to instantly visualize different paths on the grid.",
    image,
  },
  {
    heading: "More Features To Explore",
    subheading:
      "Leverage the navbar buttons to visualize algorithms and perform various actions seamlessly!",
    text: 'Easily manage your path finding experience using the navbar buttons. Clear the current path, reset walls and weights, clear the entire board, and adjust visualization speed—all at your fingertips. To revisit this tutorial, simply click "Path finding Visualizer" at the top.',
    image,
  },
  {
    heading: "Adjusting Settings",
    subheading: "Fine-Tune Your Experience",
    text: "Adjust settings such as grid size, speed of visualization, and algorithm parameters to better understand their behavior and optimize performance.",
    image,
  },
  {
    heading: "Finish",
    subheading: "Ready to Start?",
    text: "You are now ready to start exploring and visualizing pathfinding algorithms. Experiment with different settings and algorithms to see how they work in various scenarios.",
    image,
  },
];
