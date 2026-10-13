// Pending integration into the V8.33 review overlay.
const coin = events.find(e => e.id === 'H062');
if (coin) {
  coin.title = 'Pilatusmynt, Tiberius år 17 (30 e.Kr.)';
  coin.start = 30;
  coin.end = 30;
  coin.source = 'https://rpc.ashmus.ox.ac.uk/coins/1/4968';
}
