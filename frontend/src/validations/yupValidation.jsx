import * as Yup from "yup";

// validation for user sign up
export const validationSchema = Yup.object({
  title: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Title cannot have adjacent spaces")
    .required("Please enter title"),
  role: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Role cannot have adjacent spaces")
    .required("Please enter role"),
  location: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Location cannot have adjacent spaces")
    .required("Please enter location"),
  salary: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Salary cannot have adjacent spaces")
    .required("Please enter salary"),
 
});


export const initialValues = {
    title:"",
    role:"",
    location:"",
    salary:""
  };
