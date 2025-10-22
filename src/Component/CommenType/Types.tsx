// Cart Product Data Types
import {InputHTMLAttributes} from 'react'

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    tags: string[];
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
}

export type Review = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}



export type ResponseType = {
    product:Product,
    quantity:number
} 

export type CartType = {
  [num:number]:number
}


//User Types (DummyJSON compatible)
export type User = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    domain: string;
    ip: string;
    address: {
        address: string;
        city: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        postalCode: string;
        state: string;
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            postalCode: string;
            state: string;
        };
    };
    ein: string;
    ssn: string;
    userAgent: string;
};

// Authentication Types
export type AuthResponse = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
};

// Cart Types (DummyJSON compatible)
export type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
    thumbnail: string;
};

export type Cart = {
    id: number;
    products: CartItem[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

// Post Types (for blog/news)
export type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
};

// Comment Types (for product reviews)
export type Comment = {
    id: number;
    body: string;
    postId: number;
    user: {
        id: number;
        username: string;
    };
};

// Quote Types (for testimonials)
export type Quote = {
    id: number;
    quote: string;
    author: string;
};

// Todo Types (for wishlist)
export type Todo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

// Recipe Types (for food products)
export type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
};

  //Alert Types


 export type AlertType = {
    message: string;
    type: string;
  };

 export type AlertContextType = {
    alert?: AlertType;
    setAlert?: (a: AlertType) => void;
    RemoveAlert?: () => void;
  }


  //Input Values

export type FormikValues= {
    username:string ,
    password:string
  }



 export type valuesType={
    FULLNAME:string,
    EMAIL:string,
    USERNAME:string,
    PASSWORD:string,
    CONFIRM:string
  }

 export type SignUptypes =
  | {
      values: valuesType;
      errors: valuesType;
      touched: valuesType;
      handleSubmit: () => void;
      handleChange: () => void;
      handleBlur: () => void;
    } & InputHTMLAttributes<HTMLInputElement>;


    export type Signintypes =
    | {
        values: FormikValues;
        errors: FormikValues;
        touched: FormikValues;
        handleSubmit: () => void;
        handleChange: () => void;
        handleBlur: () => void;
      } & InputHTMLAttributes<HTMLInputElement>;

     export  type SignProp = {
        user :User,
        setUser:(u:User)=>void;
        RemoveAlert:()=>void;
        isLoggedIn:boolean;
        alert:AlertType;
        setAlert:(alert:AlertType)=>void;
      
      }