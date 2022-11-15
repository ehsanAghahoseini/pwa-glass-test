
function CheckUserAuth(){

const ISSERVER = typeof window === "undefined";

  if(!ISSERVER) {
    if(localStorage.getItem("token") && localStorage.getItem("id") && localStorage.getItem("email")) return true
    else return false
  }
}

export default CheckUserAuth;
