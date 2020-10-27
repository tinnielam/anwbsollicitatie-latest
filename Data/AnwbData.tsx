export default class AnwbData {
  getAnwbData(type: string): Promise<[]> {
    return fetch(`https://anwbtinlam.tinlam.repl.co/verkeersinformatie${type}`)
      .then(res => res.json())
      .then(res => res.map((data: any) => data));
  }

  getAnwbDataTotalTraffic(): Promise<[]> {
    return fetch(
      `https://api.anwb.nl/v1/incidents?apikey=QYUEE3fEcFD7SGMJ6E7QBCMzdQGqRkAi&polylines=true&polylineBounds=true&totals=true`
    )
      .then(res => res.json())
      .then(res => res.map((data: any) => data));
  }
}
