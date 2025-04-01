const mongoose = require('mongoose');
const { URI } = require('../config/db');
const User = require('../models/user'); // Assuming User is the Student model
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

mongoose.set('debug', true);

async function seedDatabase() {
  try {
    console.log("🔄 Connecting to MongoDB Atlas...");
    
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000
    });
    console.log(`✅ Connected to DB: ${mongoose.connection.db.databaseName}`);

    // 1. Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log("🗑️  Existing data cleared");

    // 2. Seed students
    const student1 = await User.create({
      username: 'student1',
      personId: new mongoose.Types.ObjectId() // Replace with actual personId if needed
    });
    const student2 = await User.create({
      username: 'student2',
      personId: new mongoose.Types.ObjectId() // Replace with actual personId if needed
    });
    console.log(`👨‍🎓 Students created: ${student1._id}, ${student2._id}`);

    // 3. Seed courses
    const [course1, course2] = await Course.create([
      { courseName: 'Database Systems', credits: 3, instructorId: student1._id },
      { courseName: 'Web Development', credits: 4, instructorId: student2._id }
    ]);
    console.log(`📚 Courses created: ${course1._id}, ${course2._id}`);

    // 4. Seed enrollments
  // 4. Seed enrollments
console.log('Creating enrollments...');
console.log('StudentID 1:', student1._id, 'CourseID 1:', course1._id);
console.log('StudentID 2:', student2._id, 'CourseID 2:', course2._id);

const enrollment1 = await Enrollment.create({
  EnrollmentID: new mongoose.Types.ObjectId(),
  StudentID: student1._id,
  CourseID: course1._id,
  EnrollmentDate: new Date(),
  Grade: 'A'
});

console.log('Enrollment 1 created:', enrollment1);

const enrollment2 = await Enrollment.create({
  EnrollmentID: new mongoose.Types.ObjectId(),
  StudentID: student2._id,
  CourseID: course2._id,
  EnrollmentDate: new Date(),
  Grade: 'B'
});

console.log('Enrollment 2 created:', enrollment2);

    const enrollment2 = await Enrollment.create({
      EnrollmentID: new mongoose.Types.ObjectId(),
      StudentID: student2._id,
      CourseID: course2._id,
      EnrollmentDate: new Date(),
      Grade: 'B'
    });

    console.log(`📝 Enrollments created: ${enrollment1.EnrollmentID}, ${enrollment2.EnrollmentID}`);

    // 5. Verify
    const counts = {
      users: await User.countDocuments(),
      courses: await Course.countDocuments(),
      enrollments: await Enrollment.countDocuments()
    };
    console.log('✔ Verification:', counts);

  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
}

seedDatabase();