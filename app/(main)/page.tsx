import BackToTopBtn from "@/components/BackToTopBtn";
import Advertising from "@/components/Advertising";
import Category from "@/components/Category";
import ArrivalBlock from "@/components/ArrivalBlocks";
import Discount from "@/components/Discount";
import Texts from "@/components/Texts";
import CategoryBannerMain from "@/components/CategoryBannerMain";
import ProductCards from "@/components/ProductCards";
import ProductCardsSec from "@/components/ProductCardsSec";
import CardProducts from "@/components/CardProducts";

export default async function Home() {

  const newDays = new Date("Jan 29, 2025");

  const discount = new Date("Jan 13, 2025");

  return (
    <>

      <div className="flex flex-wrap lg:flex-col gap-10">

        <CategoryBannerMain />

        <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-[40px]">

          <Discount discount={discount} />

          <CardProducts />

        </div>

      </div>

      <Category />

      <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-[60px] mt-[70px]">

        <Texts text_small="This Month" text_big="Best Selling Products" />

        <ProductCards />

      </div>

      <Advertising newDays={newDays} />

      <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-[60px]">

        <Texts text_small="Our Products" text_big="Explore Our Products" />

        <ProductCardsSec />

      </div>

      <ArrivalBlock />

      <BackToTopBtn />

    </>
  );
}
