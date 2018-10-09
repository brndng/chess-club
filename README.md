# Chess Club

![checkmate](https://user-images.githubusercontent.com/31902206/46249044-2622cd00-c3d7-11e8-91b2-ffaaebe8dc4b.gif)

Built with Node.js + Express.js, React.js + Redux, Websockets, and PostgreSQL.

## Features

- Real-time gameplay with game data persistence
- Archived games enabling move-by-move replay
- Beginner-friendly coordinates and move hints
- Documentation of moves using Figurine Algebraic Notation
- Middleware that protects backend API from unauthorized tampering
- Decoupled rules module used by both the front-end and back-end

## Instructions to run locally

Dependencies: Node.js, PostgreSQL

```
git clone https://github.com/brndng/chess-club.git
replace DATABASE_URL in .env with local credentials
npm run setup
npm run dev
http://localhost:3000
```

## Deployed version

https://chess-club.herokuapp.com
