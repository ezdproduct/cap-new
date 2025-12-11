export const WP_API_ENDPOINTS = [
  {
    group: "AUTH",
    endpoints: [
      { name: "JWT Login", url: "/wp-json/jwt-auth/v1/token", method: "POST" },
      { name: "JWT Validate", url: "/wp-json/jwt-auth/v1/token/validate", method: "POST" }
    ]
  },

  {
    group: "COURSES",
    endpoints: [
      { name: "Course List", url: "/wp-json/tutor/v1/courses", method: "GET" },
      { name: "Course Detail", url: "/wp-json/tutor/v1/courses/{id}", method: "GET" },
      { name: "Course Curriculum", url: "/wp-json/tutor/v1/course-contents/{id}", method: "GET" }
    ]
  },

  {
    group: "TOPIC / LESSON",
    endpoints: [
      { name: "Topics", url: "/wp-json/tutor/v1/topics?course_id={id}", method: "GET" },
      { name: "Lessons In Topic", url: "/wp-json/tutor/v1/lessons?topic_id={id}", method: "GET" },
      { name: "Lesson Detail", url: "/wp-json/tutor/v1/lessons/{lesson_id}", method: "GET" }
    ]
  },

  {
    group: "QUIZ",
    endpoints: [
      { name: "Quiz List", url: "/wp-json/tutor/v1/quizzes?course_id={id}", method: "GET" },
      { name: "Quiz Detail", url: "/wp-json/tutor/v1/quizzes/{quiz_id}", method: "GET" },
      { name: "Quiz Questions", url: "/wp-json/tutor/v1/quiz-questions?quiz_id={id}", method: "GET" }
    ]
  },

  {
    group: "INSTRUCTOR",
    endpoints: [
      { name: "Instructor Detail", url: "/wp-json/tutor/v1/author-information/{user_id}", method: "GET" },
      { name: "Instructor Courses", url: "/wp-json/tutor/v1/instructors/{id}/courses", method: "GET" }
    ]
  },

  {
    group: "REVIEWS",
    endpoints: [
      { name: "Course Rating", url: "/wp-json/tutor/v1/course-rating/{id}", method: "GET" },
      { name: "Course Reviews", url: "/wp-json/tutor/v1/course-reviews?course_id={id}", method: "GET" }
    ]
  },

  {
    group: "MATERIALS",
    endpoints: [
      { name: "Course Materials", url: "/wp-json/tutor/v1/course-materials?course_id={id}", method: "GET" }
    ]
  },

  {
    group: "ANNOUNCEMENTS",
    endpoints: [
      { name: "Course Announcements", url: "/wp-json/tutor/v1/announcements?course_id={id}", method: "GET" }
    ]
  },

  {
    group: "ENROLLMENT",
    endpoints: [
      { name: "Enrolled Students", url: "/wp-json/tutor/v1/enrolled-students?course_id={id}", method: "GET" },
      { name: "Enrollment Status", url: "/wp-json/tutor/v1/enrollments/status?course_id={id}&user_id={user_id}", method: "GET" }
    ]
  },

  {
    group: "USER",
    endpoints: [
      { name: "User Data", url: "/wp-json/wp/v2/users/{id}", method: "GET" },
      { name: "User Meta", url: "/?debug_user={id}", method: "GET" }
    ]
  },

  {
    group: "POST / ALL DATA DEBUG",
    endpoints: [
      { name: "Post Meta Dump", url: "/?debug_course_meta={id}", method: "GET" },
      { name: "Full Options", url: "/wp-json/data/v1/options", method: "GET" },
      { name: "Tutor DB Tables", url: "/wp-json/data/v1/tutor-db", method: "GET" }
    ]
  }
];