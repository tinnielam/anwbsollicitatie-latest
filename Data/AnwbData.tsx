class AnwbData {
  async getAnwbData(type: string): Promise<[]> {
    return await fetch(
      `https://anwbtinlam.tinlam.repl.co/verkeersinformatie${type}`
    )
      .then(res => res.json())
      .then(res => res.map((data: any) => data));
  }
}

export default AnwbData;
