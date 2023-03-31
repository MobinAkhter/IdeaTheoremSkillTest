import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";

const App = () => {

  const [values, setValues] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  })
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const inputs = [ {
    id:1,
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
    errorMessage: "Full Name should not be empty, not have symbols or spaces.",
    label: "Full Name",
    pattern: "^[A-Za-z0-9]{3,16}$",
    // If the line below is commented, the API returns back with the error message which is correct.
    required: true,
  },
  {
    id:2,
    name: "contactNumber",
    type: "text",
    placeholder: "Contact Number",
    errorMessage: "Contact number should not be empty, and it needs to be in Canadian format",
    label: "Contact Number",
    pattern: "^\(?([2-9][0-9]{2})\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$",
    required: true,

  },
  {
    id:3,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Sorry, this email address is not valid. Please try again.",
    label: "Email Address",
    required: true,

  },
  {
    id:4,
    name: "birthday",
    type: "date",
    placeholder: "Birthday",
    errorMessage: "Please enter your birth date",
    label: "Birthday",
    required: true,
  },
  {
    id:5,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password should be 8 characters in length and must contain at least 1 uppercase 1 lowercase and 1 digit ",
    label: "Password",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$",
    required: true,

  },
  {
    id:6,
    name: "confirmPassword",
    type: "password",
    placeholder: "Password",
    errorMessage: "Passwords do not match",
    label: "Confirm Password",
    pattern: values.password,
    required: true,

  },
]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { full_name: values.fullName, contact_number: values.contactNumber, email: values.email, date_of_birth: values.birthday, password: values.password };
    const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.status === 200) {
      setAlertType('success');
      setAlertMessage(result.title + ': ' + result.description);
    } else {
      setAlertType('error');
      setAlertMessage(result.error);
      setAlertMessage(result.title + ': ' + result.description);

    }
  };
  const handleCancel = () => {
  setValues({
    fullName: "",
    contactNumber: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
};

  const OnChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
  <div className="App">
    <form onSubmit={handleSubmit}>
      <p>Create User Account</p>
      {inputs.map((input) => (
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={OnChange}/>
      ))}
      <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
      
      <button type="submit" className="submit">Submit</button>
    </form>
    {alertMessage && (
        <div className={alertType === 'success' ? 'alert success' : 'alert error'}>
          {alertMessage}
        </div>
      )}
  </div>
  )
}

export default App;