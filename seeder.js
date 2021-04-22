//const db = require("./database/mongoDB");
const faker = require("faker");
const user = require("./models/User");
//const tweet = require("./models/Tweet");

faker.locale = "es";

/* function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
 */
const data = () => {
  //para cada nuevo usuario -> esto es un for?
  for (let i = 0; i < 15; i++) {
    //hacer uno nuevo con faker
    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    user.create(newUser);
    console.log(newUser);
  }
  //crear ese nuevo usuario con los datos generados -> nueva const que guarda todo lo anterior
};

//cargar nuevo usuario a la base de datos
data();
module.exports = data;
