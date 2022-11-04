export function formatRupiah(number: number) {
  const numberWithCommas = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `Rp${numberWithCommas}`;
}
