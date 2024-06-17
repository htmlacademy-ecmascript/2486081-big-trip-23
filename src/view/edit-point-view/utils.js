function adaptToLowerCase(string) {
  return string.toLowerCase();
}

function getIdOffer(pointsType, offersType) {
  return (pointsType.indexOf(offersType) + 1);
}

export {adaptToLowerCase, getIdOffer};
