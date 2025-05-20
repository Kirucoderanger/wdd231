const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    {
      sectionNumber: 1,
      enrolled: 88,
      instructor: "Brother Bingham",
    },
    {
      sectionNumber: 2,
      enrolled: 81,
      instructor: "Sister Shultz",
    },
    {
      sectionNumber: 3,
      enrolled: 95,
      instructor: "Sister Smith",
    },
  ],
  changeEnrollment: function (sectionNumber, add = true) {
    // Find the section with the given section number
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNumber == sectionNumber
    );
    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
      //renderSections(this.sections);
    }
  },
};

export default byuiCourse;
// This module defines a course object with properties and methods to manage course sections and enrollment.
// It includes a method to change the enrollment count for a specific section.
// The course object is exported for use in other modules.
// The code also includes a function to render the sections in the HTML document.
// The course object contains the course code, name, and an array of sections.