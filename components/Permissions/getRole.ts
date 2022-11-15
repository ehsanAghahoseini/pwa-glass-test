
export function getRole() {
  if(localStorage.getItem("role")){
    const role: any = localStorage.getItem("role")
    return role
    }
  }