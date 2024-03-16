import React, { Component, ReactNode , ButtonHTMLAttributes, ChangeEvent } from "react";
import { useParams } from "react-router";
import { SingleProduct } from "../Api";
import { withCart } from "../Provider/WithProvider";
import { ResponseType ,Product } from '../CommenType/Types'
import Loading from "./Loading";
import Button from "../Ui-Component/Button/Button";
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from "react-router-dom";
import convertImageUrl from "../../util/Converter";

type Param = {
  id?:string
}

type P={
  addToCart:(id:number , quantity:number)=>void;
  cartTotal:number;
  updateCart:()=>void;
  totalproduct:ResponseType[];
  params:Param;
} 

type S = {
  Quantity:number;
  response?:Product
}

function withRouter(Component:React.ComponentType<P>){
  return (props:P) => <Component {...props} params={useParams()} />;
}


class ProductDetail extends Component<P,S> {
  constructor(props:P) {
    super(props);
    this.state = {
      Quantity: 1,
      response: undefined,
    };
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount(): void {
    let id = this.props.params.id;
    SingleProduct(id).then((res) => {
      this.setState({ response: res.data });
    });
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void {
      if(prevProps.params.id != this.props.params.id){
        SingleProduct(this.props.params.id).then((res) => {
          this.setState({ response: res.data });
        });
      }
  }

  handleClick(e:any) {
    let id = +e.target.id;
    console.log(id, this.state.Quantity);
    this.props.addToCart(id, this.state.Quantity);
    this.setState({Quantity : 1});
  }

  render(): ReactNode {

    if(!this.state.response){
      return <Loading />
    }

    return (
      <div className="flex flex-col max-w-5xl mx-auto mt-5 mb-10 px-5 sm:px-0 bg-white shadow-md">
        
        <Link
          to="/"
          className="self-start pl-1 pr-1 pt-1 pb-1 m-1 sm:m-2 hover:bg-blue-500  bg-red-400  rounded-full  "
        >
          <IoMdArrowRoundBack className="text-3xl text-white " />
        </Link>

        <div className="  flex flex-col ">
          <div>
            <div className="sm:flex sm:gap-10 p-3 space-y-3 sm:space-y-0 sm:p-16 sm:pt-5 sm:pb-5">
              <div className=" aspect-square">
                <img
                  src={convertImageUrl(this.state.response.thumbnail)}
                  alt=""
                  className="h-full w-full object-cover sm:shadow-md "
                />
              </div>

              <div className="text-gray-700 space-y-5 sm:w-1/2">
                <p className="text-gray-400 text-sm">
                  Home / {this.state.response.category} / {this.state.response.title}
                </p>
                <h1 className="text-4xl">{this.state.response.title}</h1>
                <p className="text-xl font-bold">${this.state.response.price}.00</p>
                <p>{this.state.response.description}</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="w-12 pl-1 pr-1 pt-1 pb-1 border rounded-md"
                    min={1}
                    value={this.state.Quantity}
                    onChange={(e)=>{this.setState({Quantity : +e.target.value})}}
                  />
                  <Button
                    id={(this.state.response.id).toString()}
                    className="pl-4 pr-4 pt-1 pb-1 rounded-md bg-red-400 text-white hover:bg-red-500"
                    onClick={this.handleClick}
                  >
                    Add To Cart
                  </Button>
                </div>
                <hr />
                <p>
                  Category:
                  <span className="text-red-400">{this.state.response.category}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between sm:pl-16 sm:pr-16 max-w-6xl mx-auto pl-3 pr-3 pb-5 pt-5">
              <Link to={"/Component/Cards/Card/" + (+this.state.response.id - 1)}>
                {+this.state.response.id > 1 && (
                  <button className="pl-4 pr-4 pt-2 pb-2 text-white bg-red-400 hover:bg-blue-400 rounded-md">
                    Previous
                  </button>
                )}
              </Link>
              <Link to={"/Component/Cards/Card/" + (+this.state.response.id + 1)}>
                <button className="pl-4 pr-4 pt-2 pb-2 text-white bg-red-400 hover:bg-blue-400 rounded-md">
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCart(withRouter(ProductDetail));
