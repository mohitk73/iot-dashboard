const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  "https://iot-dashboard-94029-default-rtdb.firebaseio.com"
});

const db = admin.database();

function sendData() {
  const data = {
    temperature: parseFloat((Math.random() * 60 + 20).toFixed(2)),
    vibration: parseFloat((Math.random() * 5).toFixed(2)),
    power: parseFloat((Math.random() * 200 + 100).toFixed(2))
  };

  db.ref('/machine_health').set(data);
  console.log("Data sent:", data);
}

setInterval(sendData, 3000); 
