import api from "./api";

export async function getUserIdByPositionId(id) {
  var userIds = [];
  var filter = "";
  for (var x = 0; x < id.length; x++) {
    var fil = "filters[positionId][$eq]=" + id[x] + "&";
    filter += fil;
  }
  filter = filter.slice(0, -1);

  try {
    const response = await api({
      url: "/users?" + filter,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "get",
    });

    var users = response.data;

    for (var x = 0; x < users.length; x++) {
      userIds.push(users[x].id);
    }

    return { success: true, data: userIds };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function getUsersById(id) {
  var filter = "";
  for (var x = 0; x < id.length; x++) {
    var fil = "filters[id][$eq]=" + id[x] + "&";
    filter += fil;
  }
  filter = filter.slice(0, -1);

  try {
    const response = await api({
      url: "/users?" + filter,
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

export async function getUser(id) {
  try {
    const response = await api({
      url: "/users/" + id,
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

export async function getUsers() {
  try {
    const response = await api({
      url: "/users",
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

export async function createUser(newUser) {
  try {
    const response = await api({
      url: "/users",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "post",
      data: newUser,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response.data.error.message };
  }
}

export async function updateUser(id, data) {
  try {
    const response = await api({
      url: "/users/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "put",
      data: data,
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response.data.error.message };
  }
}
