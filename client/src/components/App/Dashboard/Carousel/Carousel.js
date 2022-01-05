import React, { useState, useEffect } from 'react';
import ParkDetails from './ParkDetails/ParkDetails';
import ParkName from './ParkName/ParkName';
// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']

export default function Carousel({ data }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [parkDetails, setParkDetails] = useState(data[0]);
  const images = data.map((el) => el.images[0].url);  

  useEffect(() => {
    // only update state once in a child component (carousel) when that state is based on props from a parent component (dashboard's fetch to the API), useEffect is the key with the data as a dependency
    setParkDetails(data[0]);
  }, [data]);

  // We are using react ref to 'tag' each of the images. Below will create an array of
  // objects with numbered keys. We will use those numbers (i) later to access a ref of a
  // specific image in this array.
  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = images.length;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
      setParkDetails(data[0]);
    } else {
      scrollToImage(currentImage + 1);
      setParkDetails(data[currentImage + 1]);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
      setParkDetails(data[totalImages - 1]);
    } else {
      scrollToImage(currentImage - 1);
      setParkDetails(data[currentImage - 1]);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  // const arrowStyle =
  //   'absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center';
  const arrowStyle =
    'absolute text-white text-2xl z-10 h-10 w-10 rounded-full opacity-60 flex items-center justify-center';

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = (isLeft) => (
    <button
      type='button'
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{ top: '45%' }}
    >
      <span
        className='outlineText font-bold text-5xl'
        role='img'
        aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}
      >
        {isLeft ? '<' : '>'}
      </span>
    </button>
  );

  return (
    // Images are placed using inline flex. We then wrap an image in a div
    // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
    // Finally the image itself will be 100% of a parent div. Outer div is
    // set with position relative, so we can place our cotrol buttons using
    // absolute positioning on each side of the image.
    <div className='flex-auto p-12 flex justify-center w-screen md:w-1/2 items-center'>
      <div className='relative w-full'>
        <span className='text-yellow-900 dark:text-yellow-50 table mx-auto my-4'>
          Park {currentImage + 1} of {totalImages}
        </span>
        {parkDetails && <ParkName park={parkDetails} />}

        <div className='carousel mt-8 mb-8'>
          {sliderControl(true)}
          {images.map((img, i) => (
            <div
              className='max-h-192 flex-shrink-0 w-full'
              key={img}
              ref={refs[i]}
            >
              <img
                // onLoad={setParkDetails(data[0])}
                src={img}
                key={img}
                className='h-full mx-auto'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    images[Math.floor(Math.random() * images.length)];
                }}
              />
            </div>
          ))}
          {sliderControl()}
        </div>

        {parkDetails && <ParkDetails park={parkDetails} />}
      </div>
    </div>
  );
}
