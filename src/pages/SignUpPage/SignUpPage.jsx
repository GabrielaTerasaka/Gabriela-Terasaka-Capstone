// // import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
// import "./LoginSignUpPage.scss";

// import React from "react";
// import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import HomeHeader from "../../components/HomeHeader";
// // import HeroBanner from "../../components/HeroBanner";
// // import CardSection from "../../components/CardSection";
// import HomeFooter from "../../components/HomeFooter";
// import UserForm from "../../components/UserForm";

// export default class LoginSignUpPage extends React.Component {
//   state = {
//     isSignUp: null,
//     // isErrorFirstName: false,
//     // isErrorLastName: false,
//     // isErrorEmail: false,
//     // isErrorPassword: false,
//     // isErrorConfirmPassword: false,
//     // confirmPasswordMessage: null,
//     // passwordEntered: null,
//     // resetForm: "",
//   };

//   // handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const { firstName, lastName, email, password, confirmPassword } = e.target;
//   //   if (
//   //     !firstName.value ||
//   //     !lastName.value ||
//   //     !email.value ||
//   //     !password.value ||
//   //     !confirmPassword.value
//   //   ) {
//   //     let msg = "required";
//   //     if (confirmPassword.value !== password.value) {
//   //       msg = "does not match password";
//   //     }
//   //     this.setState({
//   //       isErrorFirstName: firstName.value ? false : true,
//   //       isErrorLastName: lastName.value ? false : true,
//   //       isErrorEmail: email.value ? false : true,
//   //       isErrorPassword: password.value ? false : true,
//   //       isErrorConfirmPassword:
//   //         confirmPassword.value && confirmPassword.value !== password.value
//   //           ? false
//   //           : true,
//   //       confirmPasswordMessage: msg,
//   //     });
//   //   }
//   //   e.target.reset();
//   // };

//   // handleChange = (e) => {
//   //   const inputName = e.target.name;
//   //   if (inputName === "confirmPassword") {
//   //     let msg = "required";
//   //     console.log(e.target.value);
//   //     console.log(this.state.passwordEntered);
//   //     if (e.target.value !== this.state.passwordEntered) {
//   //       msg = "does not match password";
//   //       this.setState({
//   //         confirmPasswordMessage: msg,
//   //         [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: true,
//   //       });
//   //     } else {
//   //       this.setState({
//   //         [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: false,
//   //       });
//   //     }
//   //   } else if (inputName === "password") {
//   //     this.setState({
//   //       [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: false,
//   //       passwordEntered: e.target.value,
//   //     });
//   //   } else {
//   //     this.setState({
//   //       [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: false,
//   //     });
//   //   }
//   // };

//   componentDidMount() {
//     this.setState({
//       isSignUp: this.props.match.path === "/signup" ? true : false,
//     });
//   }
//   componentDidUpdate() {
//     if (this.state.isSignUp === true && this.props.match.path === "/signup") {
//       return;
//     } else if (
//       this.state.isSignUp === false &&
//       this.props.match.path === "/signin"
//     ) {
//       return;
//     }
//     this.setState({
//       isSignUp: this.props.match.path === "/signup" ? true : false,
//     });
//   }

//   render() {
//     const {
//       isSignUp,
//       // isErrorFirstName,
//       // isErrorLastName,
//       // isErrorEmail,
//       // isErrorPassword,
//       // isErrorConfirmPassword,
//       // confirmPasswordMessage,
//       // resetForm,
//     } = this.state;
//     return (
//       <>
//         {/* {this.state.isSignUp && ( */}
//         <div>
//           <HomeHeader />
//           <section className="sign">
//             <div className="sign__wrapper">
//               <h1 className="sign__title">
//                 {isSignUp ? "Create a New Account" : "Login"}
//               </h1>
//               {isSignUp ? (
//                 <UserForm isSignUp={isSignUp} />
//               ) : (
//                 <UserForm isSignUp={isSignUp} />
//               )}
//             </div>
//           </section>

//           <HomeFooter />
//         </div>
//         {/* )} */}
//       </>
//     );
//   }
// }
import "./SignUpPage.scss";

import React from "react";

import HomeHeader from "../../components/HomeHeader";
import HomeFooter from "../../components/HomeFooter";
import UserForm from "../../components/UserForm";

export default function SignUpPage() {
  return (
    <>
      <HomeHeader />
      <section className="sign">
        <div className="sign__wrapper">
          <h1 className="sign__title">Create a New Account</h1>
          <UserForm isSignUp={true} />
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
