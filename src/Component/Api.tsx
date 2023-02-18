import axios from "axios";
import { CartType } from './CommenType/Types'

type paramType = {
  sortBy?: string;
  sortType?: string;
  search?: string;
  page?: string
}

export function ApiDataDummy(sort?: string, Query?: string, page?: string, sortType?: string) {
  let param: paramType = {};
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

export function SingleProduct(id?: string) {
  return axios.get("https://myeasykart.codeyogi.io/product/" + (id && id));
}

// [1,2,3]

export function getProductByIds(ids: string[]) {
  const IdsArray = ids.join();
  return axios.get("https://myeasykart.codeyogi.io/products/bulk", {
    params: { ids: IdsArray },
  });
}

export function saveCart(cart: CartType) {
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
    .get("https://myeasykart.codeyogi.io/carts", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      return response.data;
    });

}

