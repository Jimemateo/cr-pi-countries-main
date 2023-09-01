const server = require("./src/server");
const { conn } = require("./src/db.js");
const { getAllInfo } = require("./src/controllers/countryApi_Db");
const PORT = 3001;

conn
  .sync({ force: false })
  .then(async () => {
    await getAllInfo();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
