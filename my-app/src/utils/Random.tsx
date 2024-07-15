import Papa from "papaparse";

export type PrefecturalCity = {
  city: string;
  prefecture: string;
};

async function getRandomPrefecturalCitys(
  count: number,
  area = "全地域"
): Promise<PrefecturalCity[]> {
  try {
    const response = await fetch("data.csv");
    const csvData = await response.text();
    const parsedData = await Papa.parse(csvData, { header: true });
    const prefecturalCitysWithPrefecture = (await parsedData.data.filter(
      (item: any) => area === "全地域" || item.area === area
    )) as PrefecturalCity[];
    await console.log(prefecturalCitysWithPrefecture);

    const randomStrings: PrefecturalCity[] = [];
    const usedIndices = new Set<number>();

    while (
      randomStrings.length < count &&
      usedIndices.size < prefecturalCitysWithPrefecture.length
    ) {
      const randomIndex = Math.floor(
        Math.random() * prefecturalCitysWithPrefecture.length
      );

      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomStrings.push(prefecturalCitysWithPrefecture[randomIndex]);
      }
    }

    return randomStrings;
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    return [];
  }
}

export default getRandomPrefecturalCitys;
