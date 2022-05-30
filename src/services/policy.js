import api from "./api";

export async function getPolicies() {
  try {
    const response = await api({
      url: "/policies",
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

export async function getPolicy(id) {
  try {
    const response = await api({
      url: "/policies/" + id,
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
