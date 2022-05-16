import logger from "../../../configs/logger";

 const connect = (createConnection,options) => {
     createConnection(options).then((connection) => {
         logger.info("Psql Connected");
         connection.close();
     }).catch((error) => console.log(error));
 }

 export default {connect}