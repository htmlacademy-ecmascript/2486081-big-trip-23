function getSumPricePoints(points) {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    sum += points[i].basePrice;
  }
  return sum;
}

function getSumPriceOffers(points, offers) {
  let sum = 0;
  let selectedOffers = [];

  for (let i = 0; i < points.length; i++) {
    const typeOffers = offers.find((offer) => offer.type === points[i].type).offers;
    selectedOffers = (typeOffers.filter((offType) => points[i].offers.includes(offType.id)));

    if (selectedOffers.length === 0) {
      selectedOffers.push({price : 0});
    }

    for (let j = 0; j < selectedOffers.length; j++) {
      sum += selectedOffers[j].price;
    }
    selectedOffers = [];
  }
  return sum;
}

export {getSumPricePoints, getSumPriceOffers};
