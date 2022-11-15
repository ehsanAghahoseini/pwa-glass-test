
export function checkPermission(key: any) {
  const role: any = localStorage.getItem("role")
  if (role == 1) {
    const userPermission: any = JSON.parse(String(localStorage.getItem("roles")))
    if (key == "allowed") return true
    for (var i of userPermission) {      
      if (i.name == key) {
        return true
      }
    }
    return false
  }
  else {
    return true
  }
}