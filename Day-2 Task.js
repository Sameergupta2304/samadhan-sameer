function findHighestMarks(marks) {
    return Math.max(...marks);
}

// Example usage
const marks = [85, 92, 78, 96, 88, 74, 91, 83];
const highest = findHighestMarks(marks);

console.log("Marks array:", marks);
console.log("Highest marks:", highest);
