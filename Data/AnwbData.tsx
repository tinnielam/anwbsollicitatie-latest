export default class AnwbData {
  async getAnwbData(type: string): Promise<[]> {
    return await fetch(
      `https://anwbtinlam.tinlam.repl.co/verkeersinformatie${type}`
    )
      .then(res => res.json())
      .then(res => res.map((data: any) => data));
  }

  async getAnwbDataPolylineJams(): Promise<[]> {
    return await fetch(
      `https://anwbtinlam.tinlam.repl.co/verkeersinformatiejams`
    )
      .then(res => res.json())
      .then(res =>
        res.map((verkeersinformatie: any) =>
          verkeersinformatie.segments.map(segments =>
            segments.jams
              .filter(jams => typeof jams.polyline !== "undefined")
              .map(locationJams => console.log(locationJams))
          )
        )
      );
  }
}
