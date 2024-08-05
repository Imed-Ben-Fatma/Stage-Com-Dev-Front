const BASE_URL = 'http://localhost:3000';

export function posteImages(images) {
  const getImageSrc = (image) => image && image.url ? `${BASE_URL}${image.url}` : '/images/unnamed.png';

  return (
    <div className="container mx-auto p-4 lg:p-4">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[0])}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[1])}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[2])}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[3])}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[4])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
