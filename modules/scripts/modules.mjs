//import { byuiCourse } from "./Course.mjs";
import byuiCourse from "./Course.mjs";
//import { setSectionSelection } from "./Sections.mjs";
import { populateSections } from "./Sections.mjs";
import { setTitle, renderSections } from "./Output.mjs";



document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
    //renderSections(this.sections);
});
document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
    //renderSections(this.sections);
});

setTitle(byuiCourse);
//setSectionSelection(byuiCourse.sections);
populateSections(byuiCourse.sections);
renderSections(byuiCourse.sections);