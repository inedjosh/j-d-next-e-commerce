import Carousel, { CarouselItem } from "./Carousel";

function UseCarousel() {
  return (
    <div className="mt-2">
      <Carousel>
        <CarouselItem>
          <img
            className="w-full object-cover h-full md:h-700"
            src="https://imgaz1.chiccdn.com/os/202207/20220711094215_385.jpg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            className="w-full object-cover h-full md:h-700"
            src="https://imgaz1.chiccdn.com/os/202207/20220706211653_817.jpg"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
}

export default UseCarousel;
