// let startX = 0,
//   startY = 0,
//   newX = 0,
//   newY = 0;
// export const dragDrop = (i, j) => {
//   const res = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);
//   res.addEventListener("mousedown", mouseDown);
//   console.log(res.getBoundingClientRect());
// };
// const mouseDown = (e) => {
//   // client X and Y are position of mouse pointer
//   startX = e.clientX;
//   startY = e.clientY;
//   document.addEventListener("mousemove", mouseMove);
//   document.addEventListener("mouseup", mouseUp);
// };
// const mouseMove = (e) => {
//   newX = startX - e.clientX;
//   newY = startY - e.clientY;
//   startX = e.clientX;
//   startY = e.clientY;
// };
// const mouseUp = (e) => {};
