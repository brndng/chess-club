# chess
A chess app from scratch. Challenge friends and play at your convenience.

# instructions to run locally

<!-- https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/
When dealing with asynchronous web applications, your actions should generally describe effects. That is, your action should describe a change that has happened in your system. For example, a user logged on, some data was loaded, an API call was started, an error was encountered, etc. -->

<!-- componentDidMount() {
  const { position } = this.props;
  const position = this.props.position; 
    //saving a reference to the value at this time

  console.log(position);
}
/vs/
componentDidMount() {
  this.props.position

  console.log(this.props.position)
} -->



<!-- # notes
reduce reducers?
babel polyfill in webpack?
'startup file'?
https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
# stories
signs up: POST
/users/signup

logs in: POST
/users/login

logs out: POST
/users/logout

views own/another's profile: GET
/users/profile/:user_id

searches for other user: GET
/users/:user_id

visits friends page: GET
/friends/

requests friend: POST
/friends/request

accepts friend: PUT
/friends/accept

declines friend: DELETE
/friends/decline

vists games page: GET
/games/

accesses past or current game: GET
/games/:game_id

challenges friend to a game: POST
/games/challenge

accept challange from friend: PUT
/games/accept

declines challenges: DELETE
/games/decline

user makes a move: PUT
/games/update

user finishes a game: PUT
/games/save

