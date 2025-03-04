const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(routes);
app._router.stack.forEach((r: any) => {
  if (r.route) console.log(`Registered route: ${r.route.path}`);
  else if (r.name === 'router') {
    r.handle.stack.forEach((subRoute: any) => {
      if (subRoute.route) console.log(`Registered sub-route: ${subRoute.route.path}`);
    });
  }
});

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
