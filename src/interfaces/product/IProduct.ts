import IProductPrice from "@/interfaces/product/IProductPrice";
import IProductImage from "@/interfaces/product/IProductImage";

export default interface IProduct {
  id: string;
  name: string;
  code: string;
  price: IProductPrice;
  image: IProductImage;
  material: number;
}
