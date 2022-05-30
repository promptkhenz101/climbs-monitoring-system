import api from "./api";
import { setJwtStorage } from "./localstorage";
import { getPosition } from "./position";

export async function login(identifier, password) {
  try {
    const response = await api({
      url: "/auth/local",
      method: "post",
      data: {
        identifier: identifier,
        password: password,
      },
    });

    setJwtStorage({
      jwt: response.data.jwt,
    });

    const position = await getPosition(response.data.user.positionId);

    setJwtStorage({
      jwt: response.data.jwt,
      id: response.data.user.id,
      name: response.data.user.name,
      policyId: response.data.user.policyId,
      positionId: response.data.user.positionId,
      areaId: position.data.data.attributes.areaId,
    });

    return { success: true, data: response.data };
  } catch (error) {

    return { success: false };
  }
}

export async function getPolicy(id) {
  try {
    const response = await api({
      url:
        "/policy-positions?populate[users_permissions_user][filters][id][$eq]=" +
        id +
        "&populate=policy",
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
