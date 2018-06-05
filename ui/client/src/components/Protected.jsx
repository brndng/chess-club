import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeUser } from '../actions/';

class Protected extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   const { userId } = this.props;
   console.log('​Protected -> componentDidMount -> userId', userId);
  }

  render() {  
    const { component: Component } = this.props;
    return <Component {...this.props} />
  }
}

const mapStateToProps = ({ userId }) => {
  return { userId }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ storeUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Protected);

// const withSession = (WrappedComponent) => class extends Component {
//   constructor(props) {
//     super(props)
//     // const { userId } = this.props;
//     this.state = {
//       // hasFetchedCurrentUser: userId === null ? false : true,
//       hasFetchedCurrentUser: true,
//       isLoading: auth.isAuthenticated ? false : true,
//     }
//   }

//   // async componentDidMount() { 
//   //   const { storeUser } = this.props;
//   //   const { hasFetchedCurrentUser } = this.state;
//   //   console.log('CDM refresh, hasFetchedCurrentUser ', hasFetchedCurrentUser)   

//   //   if (!hasFetchedCurrentUser) {
//   //     try {
//   //       const user = await axios.get('http://localhost:3000/users/current');
//   //       console.log('USER FROM BACKEND', user);
//   //       if (user.status === 200) {
//   //         storeUser(user.data);
//   //         auth.authenticate(() => {
//   //           this.setState({ 
//   //             isLoading: false, 
//   //             hasFetchedCurrentUser: true 
//   //           });
//   //         })
//   //       } else {
//   //         auth.isAuthenticated = false;
//   //         this.setState({ hasFetchedCurrentUser: true });
//   //       }
//   //     } catch (err) {
//   //       console.log('err from PrivateRoute', err)
//   //     }
//   //   }
//   // }

//   render() {
//     console.log('THISPROPS FROM WITH SESSIOn',this.props)
//     // return this.state.isLoading
//     //   ? <div>Loading...</div>
//     //   : <WrappedComponent {...this.props} />
//     return <WrappedComponent {...this.props} />;
//   }
// }