import { post, get } from "./index.js";

export function leavesList() {
  return get("/leave").then((res) => res);
}

export function leavesAdd(body) {
  return post("/addLeave", body).then((res) => res);
}

export function leavesEdit(body) {
  return post("/updateLeave", body).then((res) => res);
}

export function leavesDelete(id) {
  return post("/deleteLeave", id).then((res) => res);
}
