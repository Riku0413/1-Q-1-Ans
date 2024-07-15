import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import getRandomPrefecturalCitys from "../utils/Random";
import { PrefecturalCity } from "../utils/Random";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation } from "react-router-dom";

type PrefecturalCityAnswer = PrefecturalCity & {
  answer: string;
};

const mapping: { [key: string]: string } = {
  all: "全地域",
  tohoku: "東北",
  kanto: "関東",
  chubu: "中部",
  kinki: "近畿",
  chugoku: "中国",
  shikoku: "四国",
  kyushu: "九州",
};

function Quiz() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState("");
  const [questionAndAnswer, setQuestionAndAnswer] = useState<
    PrefecturalCityAnswer[]
  >([]);
  const [currentSet, setCurrentSet] = useState<PrefecturalCity[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const areas = queryParams.get("area");
  const area = mapping[areas ?? "all"];
  const total = 3;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isDisabled) return;
      setIsDisabled(true);
      if (value === currentSet[count - 1]["prefecture"]) {
        setMessage("正解⭕️");
      } else {
        setMessage(`❌ 正解は ${currentSet[count - 1]["prefecture"]}`);
      }

      setTimeout(() => {
        setMessage("");
        setValue("");
        setCount(count + 1);
        setIsDisabled(false);
      }, 1000);

      const newQuestionAndAnswer: PrefecturalCityAnswer = {
        city: currentSet[count - 1].city,
        prefecture: currentSet[count - 1].prefecture,
        answer: value,
      };

      setQuestionAndAnswer([...questionAndAnswer, newQuestionAndAnswer]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // 初回のレンダリング後、だけマウント
  useEffect(() => {
    async function main() {
      try {
        const prefecturalCitys = await getRandomPrefecturalCitys(total, area);
        console.log(prefecturalCitys);
        setCurrentSet(prefecturalCitys);
      } catch (error) {
        console.error("Error fetching or processing citys:", error);
      }
    }
    main();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      {count <= total ? (
        <>
          {count}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                textAlign: "center",
                lineHeight: "64px",
                width: "90%",
                maxWidth: "300px",
              }}
            >
              {message ? <Box>{message}</Box> : currentSet[count - 1]?.city}
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "20px"
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter Here"
              variant="outlined"
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              disabled={isDisabled}
              sx={{ width: "90%", maxWidth: "300px" }}
            />
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <h2>
            結果:{" "}
            {questionAndAnswer.reduce((acc, cur) => {
              if (cur.answer === cur.prefecture) {
                return acc + 1;
              } else {
                return acc;
              }
            }, 0)}{" "}
            / {total}
          </h2>
          <TableContainer
            component={Paper}
            sx={{ width: "90%", maxWidth: "500px" }}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>番号</TableCell>
                  <TableCell>市名</TableCell>
                  <TableCell>正答</TableCell>
                  <TableCell>回答</TableCell>
                  <TableCell>判定</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionAndAnswer.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.city}
                    </TableCell>
                    <TableCell>{row.prefecture}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>
                      {row.prefecture === row.answer ? "⭕️" : "×"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <a href={`/quiz?area=${area}`}>Play Again</a>
          <br />
          <a href={`/`}>Back to Home</a>
        </Box>
      )}
    </Box>
  );
}

export default Quiz;
