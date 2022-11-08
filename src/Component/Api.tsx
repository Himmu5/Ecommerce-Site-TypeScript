import axios from "axios";

export function ApiDataDummy(sort, Query, page, sortType) {
  let param = {};
  if (sort) {
    param.sortBy = sort;
  }
  if (sortType) {
    param.sortType = sortType;
  }
  if (Query) {
    param.search = Query;
  }
  if (page) {
    param.page = page;
  }

  return axios.get("https://myeasykart.codeyogi.io/products", {
    params: param,
  });
}

export function SingleProduct(id) {
  return axios.get("https://myeasykart.codeyogi.io/product/" + id);
}

// [1,2,3]

export function getProductByIds(ids) {
  const IdsArray = ids.join();
  return axios.get("https://myeasykart.codeyogi.io/products/bulk", {
    params: { ids: IdsArray },
  });
}

export function saveCart(cart) {
  return axios
    .post(
      "https://myeasykart.codeyogi.io/carts",
      { data: cart },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      return response.data;
    });
}

export function getCart() {
  return axios
    .get("https://myeasykart.codeyogi.io/carts",{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }) .then((response) => {
      return response.data;
    });
   
}
