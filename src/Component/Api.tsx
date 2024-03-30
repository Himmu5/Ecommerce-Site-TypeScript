import axios from "axios";
import { CartType } from './CommenType/Types'

type paramType = {
  sortBy?: string;
  sortType?: string;
  search?: string;
  page?: string
}
// const Base_url = "https://myeasykart.codeyogi.io"
const Base_url = "https://ecommercebackend1-n7nkxlhf.b4a.run"

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

  return axios.get(Base_url+"/products", {
    params: param,
  });
}

export function SingleProduct(id?: string) {
  return axios.get(Base_url+"/product/" + (id && id));
}

// [1,2,3]

export function getProductByIds(ids: string[]) {
  const IdsArray = ids.join();
  return axios.get(Base_url+"/products/bulk", {
    params: { ids: IdsArray },
  });
}

export function saveCart(cart: CartType) {
  return axios
    .post(
      Base_url+"/carts",
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
    .get(Base_url+"/carts", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      return response.data;
    });

}

