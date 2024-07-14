import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import getRandomPrefecturalCapitals from "../components/Random";
import { PrefecturalCapital } from "../components/Random";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation } from "react-router-dom";

type PrefecturalCapitalAnswer = PrefecturalCapital & {
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

function Home() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState("");
  const [questionAndAnswer, setQuestionAndAnswer] = useState<
    PrefecturalCapitalAnswer[]
  >([]);
  const [currentSet, setCurrentSet] = useState<PrefecturalCapital[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const areas = queryParams.get("area");
  const area = mapping[areas ?? "all"];
  const total = 10;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isDisabled) return;
      setIsDisabled(true);
      if (value === currentSet[count - 1]["prefecture"]) {
        setMessage("正解！");
      } else {
        setMessage(`不正解、正解は ${currentSet[count - 1]["prefecture"]}`);
      }

      setTimeout(() => {
        setMessage("");
        setValue("");
        setCount(count + 1);
        setIsDisabled(false);
      }, 1000);

      const newQuestionAndAnswer: PrefecturalCapitalAnswer = {
        capital: currentSet[count - 1].capital,
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
        const prefecturalCapitals = await getRandomPrefecturalCapitals(total, area);
        console.log(prefecturalCapitals);
        setCurrentSet(prefecturalCapitals);
      } catch (error) {
        console.error("Error fetching or processing capitals:", error);
      }
    }
    main();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "80%" },
      }}
      noValidate
      autoComplete="off"
    >
      {count <= total ? (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 256,
                height: 64,
              },
            }}
          >
            {count}
            <Paper
              sx={{
                textAlign: "center",
                lineHeight: "64px",
                width: "100%",
              }}
            >
              {currentSet[count - 1]?.capital}
            </Paper>
            {message && <Box>{message}</Box>}
          </Box>
          <TextField
            id="outlined-basic"
            label="Enter Here"
            variant="outlined"
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            disabled={isDisabled}
          />
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
            sx={{ width: "80%", maxWidth: "500px" }}
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
                      {row.capital}
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
          <a href={`/home?area=${area}`}>Play Again</a>
          <br />
          <a href={`/`}>Back to Home</a>
        </Box>
      )}
    </Box>
  );
}

export default Home;
