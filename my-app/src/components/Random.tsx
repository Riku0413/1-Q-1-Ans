import Papa from 'papaparse';

export type PrefecturalCapital = {
  capital: string;
  prefecture: string;
};

// const prefecturalCapitalsWithPrefecture: PrefecturalCapital[] = [
//   { capital: "札幌", prefecture: "北海道" },
//   { capital: "青森", prefecture: "青森県" },
//   { capital: "盛岡", prefecture: "岩手県" },
//   { capital: "仙台", prefecture: "宮城県" },
//   { capital: "秋田", prefecture: "秋田県" },
//   { capital: "山形", prefecture: "山形県" },
//   { capital: "福島", prefecture: "福島県" },
//   { capital: "水戸", prefecture: "茨城県" },
//   { capital: "宇都宮", prefecture: "栃木県" },
//   { capital: "前橋", prefecture: "群馬県" },
// ];

async function getRandomPrefecturalCapitals(count: number, area = "全地域"): Promise<PrefecturalCapital[]> {
  try {
    const response = await fetch('data.csv');
    const csvData = await response.text();
    const parsedData = await Papa.parse(csvData, { header: true });
    // const prefecturalCapitalsWithPrefecture = parsedData.data as PrefecturalCapital[];
    const prefecturalCapitalsWithPrefecture = await parsedData.data.filter(
      (item: any) => area === "全地域" || item.area === area
    ) as PrefecturalCapital[];
    await console.log(prefecturalCapitalsWithPrefecture);

    const randomStrings: PrefecturalCapital[] = [];
    const usedIndices = new Set<number>();

    while (randomStrings.length < count && usedIndices.size < prefecturalCapitalsWithPrefecture.length) {
      const randomIndex = Math.floor(Math.random() * prefecturalCapitalsWithPrefecture.length);

      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomStrings.push(prefecturalCapitalsWithPrefecture[randomIndex]);
      }
    }

    return randomStrings;
  } catch (error) {
    console.error('Error fetching or parsing CSV data:', error);
    return [];
  }
}

export default getRandomPrefecturalCapitals;
