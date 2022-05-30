import api from "./api";

export async function getAccomplishments(range) {
  try {
    const response = await api({
      url:
        "/accomplishments?filters[date][$gte]=" +
        range[0] +
        "&filters[date][$lte]=" +
        range[1],
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}

export async function getAccomplishmentsByUserId(id, range) {
  var filter = "";
  for (var x = 0; x < id.length; x++) {
    var fil = "filters[employeeId][$eq]=" + id[x] + "&";
    filter += fil;
  }
  filter = filter.slice(0, -1);
  try {
    const response = await api({
      url:
        "/accomplishments?filters[date][$gte]=" +
        range[0] +
        "&filters[date][$lte]=" +
        range[1] +
        "&" +
        filter,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}

export async function getAccomplishment(id) {
  try {
    const response = await api({
      url: "/accomplishments/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}

export async function createAccomplishment(accom) {
  try {
    const response = await api({
      url: "/accomplishments",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      data: { data: accom },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}

export async function updateAccomplishment(id, editedAccom) {
  try {
    const response = await api({
      url: "/accomplishments/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "put",
      data: { data: editedAccom },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteAcomplishment(id) {
  try {
    const response = await api({
      url: "/accomplishments/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "delete",
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}
