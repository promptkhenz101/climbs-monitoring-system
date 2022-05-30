import api from "./api";

export async function getPosition(id) {
  try {
    const response = await api({
      url: "/positions/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function getPositionIdByAreaId(id) {
  var posIds = [];
  try {
    const response = await api({
      url: "/positions?filters[areaId][$eq]=" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    var pos = response.data.data;
    for (var x = 0; x < pos.length; x++) {
      posIds.push(pos[x].id);
    }

    return { success: true, data: posIds };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function getPositions() {
  try {
    const response = await api({
      url: "/positions",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
