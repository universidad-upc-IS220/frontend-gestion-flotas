//
//
// import React, { Component } from 'react';
//
// const AppContext = React.createContext({
//   isLoggedIn: false,
//   user: {},
// });
//
// class AppProvider extends Component {
//
//   state = {
//     isLoggedIn: false,
//     user: {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
//   };
//
//   fetchToken = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.setState({ isLoggedIn: true });
//     }
//   };
//
//   fetchUser = async () => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       this.setState({
//         isLoggedIn: true,
//         user: JSON.parse(user)
//       });
//     }
//   };
//
//   render() {
//     return (
//       <AppContext.Provider>
//         {this.props.children}
//       </AppContext.Provider>
//     );
//   }
//
// }

export const Hola = ()=> {
  return (
    <div>
      <h1>Hola</h1>
    </div>
  )
}
