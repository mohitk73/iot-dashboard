const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;

const serviceAccount = require('./firebaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-dashboard-94029-default-rtdb.firebaseio.com"
});

const db = admin.database();
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const snapshot = await db.ref('/machine_health').once('value');
  const data = snapshot.val();
  res.render('dashboard', { data });
});

app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});
