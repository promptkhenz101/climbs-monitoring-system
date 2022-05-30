import api from "./api";

export async function getReports(range) {
  try {
    const response = await api({
      url:
        "/reports?filters[date][$gte]=" +
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

export async function getReportsByUserId(id, range) {
  var filter = "";
  for (var x = 0; x < id.length; x++) {
    var fil = "filters[employeeId][$eq]=" + id[x] + "&";
    filter += fil;
  }
  filter = filter.slice(0, -1);
  try {
    const response = await api({
      url:
        "/reports?filters[date][$gte]=" +
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

export async function getReport(id) {
  try {
    const response = await api({
      url: "/reports/" + id,
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

export async function createReport(report) {
  try {
    const response = await api({
      url: "/reports",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      data: { data: report },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function updateReport(id, editedReport) {
  try {
    const response = await api({
      url: "/reports/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "put",
      data: { data: editedReport },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function deleteReport(id) {
  try {
    const response = await api({
      url: "/reports/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("clmJwt"),
      },
      method: "delete",
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
