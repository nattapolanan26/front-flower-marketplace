import { Carousel } from 'antd';
import c1 from '@/assets/images/carousel/c1.png'
import c2 from '@/assets/images/carousel/c2.png'
import c3 from '@/assets/images/carousel/c3.png'
import c4 from '@/assets/images/carousel/c4.png'

const CarouselSlide = () => {
  const onChange = (_currentSlide: number) => {
      // console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} autoplay>
      <div >
        <img src={c1} alt="Logo" height={'auto'} width={'100%'} />
      </div>
      <div>
        <img src={c2} alt="Logo" height={'auto'} width={'100%'} />
      </div>
      <div>
        <img src={c3} alt="Logo" height={'auto'} width={'100%'} />
      </div>
      <div>
        <img src={c4} alt="Logo" height={'auto'} width={'100%'} />
      </div>
    </Carousel>
  )
}

export default CarouselSlide