import axios from "axios";
import { CartType, User } from './CommenType/Types'

type paramType = {
  sortBy?: string;
  sortType?: string;
  q?: string;
  skip?: string;
  limit?: string;
}
// const Base_url = "https://myeasykart.codeyogi.io"
// const Base_url = "https://ecommercebackend1-n7nkxlhf.b4a.run"
const Base_url = "https://dummyjson.com"

export function ApiDataDummy(sort?: string, searchQuery?: string, skip?: string, sortType?: string) {
  let param: paramType = {};
  if (sort) {
    param.sortBy = sort;
  }
  if (sortType) {
    param.sortType = sortType;
  }
  if (skip) {
    param.skip = skip;
  }
  param.limit = "30"; // Set default limit to 30

  // Use search endpoint if there's a search query, otherwise use products endpoint
  const endpoint = searchQuery ? "/products/search" : "/products";
  if (searchQuery) {
    param.q = searchQuery;
  }

  return axios.get(Base_url + endpoint, {
    params: param,
  });
}

export function SingleProduct(id?: string) {
  return axios.get(Base_url+"/product/" + (id && id));
}

// [1,2,3]

export function getProductByIds(ids: string[]) {
  // DummyJSON doesn't support bulk product requests, so we'll make individual requests
  const promises = ids.map(id => getProductById(id));
  return Promise.all(promises).then(responses => ({
    data: responses.map(response => response.data)
  }));
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
      // Return empty array if no carts or no products
      if (!response.data.carts || response.data.carts.length === 0) {
        return [];
      }
      
      // Get the first cart's products and transform them to match our format
      const firstCart = response.data.carts[0];
      if (!firstCart.products || firstCart.products.length === 0) {
        return [];
      }
      
      // Transform products to match our cart format
      return firstCart.products.map((product: any) => ({
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          // Add other required Product fields with defaults
          description: '',
          discountPercentage: product.discountPercentage || 0,
          rating: 0,
          stock: 0,
          brand: '',
          category: '',
          images: [product.thumbnail]
        },
        quantity: product.quantity
      }));
    });
}

// ===== DUMMYJSON API FUNCTIONS =====

// Products API (already working)
export function getAllProducts(limit = 30, skip = 0, search = "", category = "") {
  const params: any = { limit, skip };
  if (search) params.q = search;
  if (category) params.category = category;
  
  return axios.get(Base_url + "/products", { params });
}

export function getProductById(id: string) {
  return axios.get(Base_url + `/products/${id}`);
}

export function getProductsByCategory(category: string) {
  return axios.get(Base_url + `/products/category/${category}`);
}

export function searchProducts(query: string) {
  return axios.get(Base_url + `/products/search?q=${query}`);
}

// Users API
export function getAllUsers(limit = 30, skip = 0) {
  return axios.get(Base_url + "/users", { 
    params: { limit, skip } 
  });
}

export function getUserById(id: string) {
  return axios.get(Base_url + `/users/${id}`);
}

export function createUser(userData: Partial<User>) {
  return axios.post(Base_url + "/users/add", userData);
}

export function updateUser(id: string, userData: Partial<User>) {
  return axios.put(Base_url + `/users/${id}`, userData);
}

export function deleteUser(id: string) {
  return axios.delete(Base_url + `/users/${id}`);
}

// Authentication API
export function loginUser(username: string, password: string) {
  return axios.post(Base_url + "/user/login", {
    username,
    password
  });
}

export function refreshToken(token: string) {
  return axios.post(Base_url + "/auth/refresh", {
    token
  });
}

// Carts API
export function getAllCarts(limit = 30, skip = 0) {
  return axios.get(Base_url + "/carts", { 
    params: { limit, skip } 
  });
}

export function getCartById(id: string) {
  return axios.get(Base_url + `/carts/${id}`);
}

export function getUserCarts(userId: string) {
  return axios.get(Base_url + `/carts/user/${userId}`);
}

export function createCart(cartData: any) {
  return axios.post(Base_url + "/carts/add", cartData);
}

export function updateCart(id: string, cartData: any) {
  return axios.put(Base_url + `/carts/${id}`, cartData);
}

export function deleteCart(id: string) {
  return axios.delete(Base_url + `/carts/${id}`);
}

// Posts API (for blog/news)
export function getAllPosts(limit = 30, skip = 0) {
  return axios.get(Base_url + "/posts", { 
    params: { limit, skip } 
  });
}

export function getPostById(id: string) {
  return axios.get(Base_url + `/posts/${id}`);
}

export function getUserPosts(userId: string) {
  return axios.get(Base_url + `/posts/user/${userId}`);
}

export function createPost(postData: any) {
  return axios.post(Base_url + "/posts/add", postData);
}

export function updatePost(id: string, postData: any) {
  return axios.put(Base_url + `/posts/${id}`, postData);
}

export function deletePost(id: string) {
  return axios.delete(Base_url + `/posts/${id}`);
}

// Comments API (for product reviews)
export function getAllComments(limit = 30, skip = 0) {
  return axios.get(Base_url + "/comments", { 
    params: { limit, skip } 
  });
}

export function getCommentById(id: string) {
  return axios.get(Base_url + `/comments/${id}`);
}

export function getPostComments(postId: string) {
  return axios.get(Base_url + `/comments/post/${postId}`);
}

export function createComment(commentData: any) {
  return axios.post(Base_url + "/comments/add", commentData);
}

export function updateComment(id: string, commentData: any) {
  return axios.put(Base_url + `/comments/${id}`, commentData);
}

export function deleteComment(id: string) {
  return axios.delete(Base_url + `/comments/${id}`);
}

// Quotes API (for testimonials)
export function getAllQuotes(limit = 30, skip = 0) {
  return axios.get(Base_url + "/quotes", { 
    params: { limit, skip } 
  });
}

export function getQuoteById(id: string) {
  return axios.get(Base_url + `/quotes/${id}`);
}

export function getRandomQuote() {
  return axios.get(Base_url + "/quotes/random");
}

// Todos API (for wishlist)
export function getAllTodos(limit = 30, skip = 0) {
  return axios.get(Base_url + "/todos", { 
    params: { limit, skip } 
  });
}

export function getTodoById(id: string) {
  return axios.get(Base_url + `/todos/${id}`);
}

export function getUserTodos(userId: string) {
  return axios.get(Base_url + `/todos/user/${userId}`);
}

export function createTodo(todoData: any) {
  return axios.post(Base_url + "/todos/add", todoData);
}

export function updateTodo(id: string, todoData: any) {
  return axios.put(Base_url + `/todos/${id}`, todoData);
}

export function deleteTodo(id: string) {
  return axios.delete(Base_url + `/todos/${id}`);
}

// Recipes API (for food products)
export function getAllRecipes(limit = 30, skip = 0) {
  return axios.get(Base_url + "/recipes", { 
    params: { limit, skip } 
  });
}

export function getRecipeById(id: string) {
  return axios.get(Base_url + `/recipes/${id}`);
}

// Image API (for dynamic placeholders)
export function getPlaceholderImage(width = 200, height = 200, text = "") {
  const params: any = { width, height };
  if (text) params.text = text;
  
  return axios.get(Base_url + "/image", { 
    params,
    responseType: 'blob'
  });
}

