const formatPrice = price =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: price.currency }).format(
    price.amount / 100
  );

export default formatPrice;
