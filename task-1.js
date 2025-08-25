const student = {
  name: 'Asha Sharma',
  roll: 12,
  age: 18,
  courses: ['Mathematics', 'Physics', 'Chemistry'],
  address: { city: 'Mumbai', pin: '400001' }
};

function printStudent(s) {
  console.log(`Name   : ${s.name}`);
  console.log(`Roll   : ${s.roll}`);
  console.log(`Age    : ${s.age}`);
  console.log(`Courses: ${s.courses.join(', ')}`);
  console.log(`City   : ${s.address?.city ?? 'N/A'}`);
  console.log('-----------------------------');
}

printStudent(student);
