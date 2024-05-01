const toServer = (data) => {
  return {
    title: data.title,
    description: data.description,
    category: data.category,
    level: data.level,
    rating: data.rating,
    discount: data.discount,
    price: data.price,
    trailer: data.trailer,
    image: {
      url: data.url,
      alt: data.alt,
    },
  };
};

export { toServer };
