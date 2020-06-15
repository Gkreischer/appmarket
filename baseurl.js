const DEV = true;
var DOMAIN = '';
if(DEV){
    DOMAIN = `http://192.168.0.20:3001/api`;
} else {
    DOMAIN = `https://gkreischer.tech:3001/api`;
}

 export default DOMAIN;