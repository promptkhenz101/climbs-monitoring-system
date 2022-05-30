export function setJwtStorage(data) {
  localStorage.setItem("clmJwt", data.jwt);
  localStorage.setItem("clmUserId", data.id);
  localStorage.setItem("clmName", data.name);
  localStorage.setItem("clmPolicy", data.policyId);
  localStorage.setItem("clmPosition", data.positionId);
  localStorage.setItem("clmArea", data.areaId);
}

export function getJwtStorage() {
  return {
    clmJwt: localStorage.getItem("clmJwt"),
    clmUserId: localStorage.getItem("clmUserId"),
    clmName: localStorage.getItem("clmName"),
    clmPolicy: localStorage.getItem("clmPolicy"),
    clmPosition: localStorage.getItem("clmPosition"),
    clmArea: localStorage.getItem("clmArea"),
  };
}

export function clearJwtStorage() {
  localStorage.removeItem("clmJwt");
  localStorage.removeItem("clmUserId");
  localStorage.removeItem("clmName");
  localStorage.removeItem("clmPolicy");
  localStorage.removeItem("clmPosition");
  localStorage.removeItem("clmArea");
}
