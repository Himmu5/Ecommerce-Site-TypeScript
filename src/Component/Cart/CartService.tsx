import { 
  getAllCarts, 
  getCartById, 
  getUserCarts, 
  createCart, 
  updateCart, 
  deleteCart 
} from '../Api';
import { Cart, CartItem } from '../CommenType/Types';
import AuthService from './AuthService';

class CartService {
  private static instance: CartService;
  private currentCart: Cart | null = null;
  private localCart: CartItem[] = [];

  private constructor() {
    this.loadLocalCart();
  }

  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  private loadLocalCart(): void {
    if (typeof window !== 'undefined') {
      const cartStr = localStorage.getItem('localCart');
      if (cartStr) {
        this.localCart = JSON.parse(cartStr);
      }
    }
  }

  private saveLocalCart(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('localCart', JSON.stringify(this.localCart));
    }
  }

  private clearLocalCart(): void {
    this.localCart = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('localCart');
    }
  }

  // Add item to cart (local or remote)
  public async addToCart(productId: number, quantity: number = 1): Promise<void> {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      // User is logged in - use remote cart
      await this.addToRemoteCart(productId, quantity);
    } else {
      // User not logged in - use local cart
      this.addToLocalCart(productId, quantity);
    }
  }

  private addToLocalCart(productId: number, quantity: number): void {
    const existingItem = this.localCart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
    } else {
      // For local cart, we'll need to fetch product details
      // This is a simplified version - in a real app, you'd fetch the product
      const newItem: CartItem = {
        id: productId,
        title: `Product ${productId}`, // This would be fetched from API
        price: 0, // This would be fetched from API
        quantity,
        total: 0,
        discountPercentage: 0,
        discountedPrice: 0,
        thumbnail: ''
      };
      this.localCart.push(newItem);
    }
    
    this.saveLocalCart();
  }

  private async addToRemoteCart(productId: number, quantity: number): Promise<void> {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) return;

      // Get user's existing cart or create new one
      let cart = await this.getUserCart();
      
      if (!cart) {
        // Create new cart
        cart = await this.createNewCart();
      }

      // Add item to cart
      const existingProduct = cart.products.find(p => p.id === productId);
      
      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.total = existingProduct.price * existingProduct.quantity;
      } else {
        // Add new product to cart
        // Note: In a real implementation, you'd fetch product details first
        const newItem: CartItem = {
          id: productId,
          title: `Product ${productId}`,
          price: 0,
          quantity,
          total: 0,
          discountPercentage: 0,
          discountedPrice: 0,
          thumbnail: ''
        };
        cart.products.push(newItem);
      }

      // Update cart totals
      this.calculateCartTotals(cart);
      
      // Save to remote
      await updateCart(cart.id.toString(), cart);
      this.currentCart = cart;
    } catch (error) {
      console.error('Failed to add to remote cart:', error);
      // Fallback to local cart
      this.addToLocalCart(productId, quantity);
    }
  }

  // Remove item from cart
  public async removeFromCart(productId: number): Promise<void> {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      await this.removeFromRemoteCart(productId);
    } else {
      this.removeFromLocalCart(productId);
    }
  }

  private removeFromLocalCart(productId: number): void {
    this.localCart = this.localCart.filter(item => item.id !== productId);
    this.saveLocalCart();
  }

  private async removeFromRemoteCart(productId: number): Promise<void> {
    if (!this.currentCart) return;

    this.currentCart.products = this.currentCart.products.filter(p => p.id !== productId);
    this.calculateCartTotals(this.currentCart);
    
    await updateCart(this.currentCart.id.toString(), this.currentCart);
  }

  // Update item quantity
  public async updateQuantity(productId: number, quantity: number): Promise<void> {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      await this.updateRemoteQuantity(productId, quantity);
    } else {
      this.updateLocalQuantity(productId, quantity);
    }
  }

  private updateLocalQuantity(productId: number, quantity: number): void {
    const item = this.localCart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.saveLocalCart();
    }
  }

  private async updateRemoteQuantity(productId: number, quantity: number): Promise<void> {
    if (!this.currentCart) return;

    const item = this.currentCart.products.find(p => p.id === productId);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.calculateCartTotals(this.currentCart);
      await updateCart(this.currentCart.id.toString(), this.currentCart);
    }
  }

  // Get current cart
  public getCart(): Cart | CartItem[] {
    const user = AuthService.getCurrentUser();
    return user ? (this.currentCart || { products: [], total: 0, discountedTotal: 0, userId: user.id, totalProducts: 0, totalQuantity: 0 }) : this.localCart;
  }

  // Get cart items count
  public getCartItemCount(): number {
    const user = AuthService.getCurrentUser();
    if (user && this.currentCart) {
      return this.currentCart.totalQuantity;
    } else {
      return this.localCart.reduce((total, item) => total + item.quantity, 0);
    }
  }

  // Get cart total
  public getCartTotal(): number {
    const user = AuthService.getCurrentUser();
    if (user && this.currentCart) {
      return this.currentCart.discountedTotal;
    } else {
      return this.localCart.reduce((total, item) => total + item.total, 0);
    }
  }

  // Clear cart
  public async clearCart(): Promise<void> {
    const user = AuthService.getCurrentUser();
    
    if (user && this.currentCart) {
      await deleteCart(this.currentCart.id.toString());
      this.currentCart = null;
    } else {
      this.clearLocalCart();
    }
  }

  // Get user's cart from remote
  private async getUserCart(): Promise<Cart | null> {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) return null;

      const response = await getUserCarts(user.id.toString());
      const carts = response.data.carts;
      
      if (carts && carts.length > 0) {
        this.currentCart = carts[0]; // Use first cart
        return carts[0];
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get user cart:', error);
      return null;
    }
  }

  // Create new cart
  private async createNewCart(): Promise<Cart> {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const newCart: Cart = {
      id: 0, // Will be set by API
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: user.id,
      totalProducts: 0,
      totalQuantity: 0
    };

    const response = await createCart(newCart);
    return response.data;
  }

  // Calculate cart totals
  private calculateCartTotals(cart: Cart): void {
    cart.totalProducts = cart.products.length;
    cart.totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
    cart.total = cart.products.reduce((total, item) => total + item.total, 0);
    cart.discountedTotal = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
  }

  // Sync local cart to remote when user logs in
  public async syncLocalCartToRemote(): Promise<void> {
    if (this.localCart.length === 0) return;

    const user = AuthService.getCurrentUser();
    if (!user) return;

    try {
      let cart = await this.getUserCart();
      if (!cart) {
        cart = await this.createNewCart();
      }

      // Add local cart items to remote cart
      for (const localItem of this.localCart) {
        const existingItem = cart.products.find(p => p.id === localItem.id);
        if (existingItem) {
          existingItem.quantity += localItem.quantity;
          existingItem.total = existingItem.price * existingItem.quantity;
        } else {
          cart.products.push(localItem);
        }
      }

      this.calculateCartTotals(cart);
      await updateCart(cart.id.toString(), cart);
      this.currentCart = cart;
      this.clearLocalCart();
    } catch (error) {
      console.error('Failed to sync local cart:', error);
    }
  }
}

export default CartService.getInstance();
