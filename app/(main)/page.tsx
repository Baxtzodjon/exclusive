import Services from "@/components/Services";
import BackToTopBtn from "@/components/BackToTopBtn";
import Advertising from "@/components/Advertising";
import Category from "@/components/Category";
import ArrivalBlock from "@/components/ArrivalBlocks";
import CategoryBanner from "@/components/CategoryBanner";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/models/product";
import DynamicCard from "@/components/DynamicCard";
import ReviewInp from "@/components/ReviewInp";
import CardItem from "@/components/CardItem";
import Discount from "@/components/Discount";
import Counter from "@/components/Counter";
import StarRating from "@/components/StarRating";
import CardItemMain from "@/components/CardItemMain";
import Texts from "@/components/Texts";
import CategoryBannerMain from "@/components/CategoryBannerMain";
import ProductCards from "@/components/ProductCards";
import ProductCardsSec from "@/components/ProductCardsSec";

export default async function Home() {

  const res = await fetch('http://localhost:3000/api/product');

  const { data } = await res.json();

  const newDays = new Date("Jan 29, 2025");

  const discount = new Date("Jan 13, 2025");

  console.log(data);

  return (
    <>

      <div className="flex flex-wrap lg:flex-col gap-10">  {/* mt-[60px] mb-[80px] */}

        {/* <Link href="/admin" target="_blank">Admin Dashboard</Link>

        <Link href="123">Click me!</Link> */}

        {/* <Link href="/checkout">Click me!</Link> */}

        {/* <StarRating /> */}

        <CategoryBannerMain />

        <Discount discount={discount} />

        <div className="flex items-center justify-center flex-wrap gap-[30px]">

          {/* {
            data.map((item: Product) => (

              <CardItem item={item} key={item._id} />

            ))
          } */}

          <CardItemMain />

        </div>

      </div>

      {/* {
        data.map((item: Product) => (
          <CardItem item={item} />
        ))
      } */}

      <Category />

      <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-[60px] mt-[70px]">

        <Texts text_small="This Month" text_big="Best Selling Products" />

        {/* <CardItemMain /> */}

        <ProductCards />

      </div>

      <Advertising newDays={newDays} />

      <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-[60px]">

        <Texts text_small="Our Products" text_big="Explore Our Products" />

        {/* <CardItemMain /> */}

        <ProductCardsSec />

      </div>

      <ArrivalBlock />

      {/* <Category />

      <Advertising newDays={newDays} />

      <ArrivalBlock />

      <Services />
      
      <BackToTopBtn /> */}

      {/* <ReviewInp />

      <DynamicCard /> */}

    </>
  );
}
