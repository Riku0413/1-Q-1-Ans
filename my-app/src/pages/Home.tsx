import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function Home() {
  const navigate = useNavigate();
  const [area, setArea] = useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setArea(event.target.value as string);
  };

  const onClick = () => {
    navigate(`/quiz?area=${area}`);
  };

  return (
    <div id="sidebar">
      <h1>1問1答</h1>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">地域</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={area}
            label="地域"
            onChange={handleChange}
          >
            <MenuItem value={"all"}>全地域</MenuItem>
            <MenuItem value={"tohoku"}>東北</MenuItem>
            <MenuItem value={"kanto"}>関東</MenuItem>
            <MenuItem value={"chubu"}>中部</MenuItem>
            <MenuItem value={"kinki"}>近畿</MenuItem>
            <MenuItem value={"chugoku"}>中国</MenuItem>
            <MenuItem value={"shikoku"}>四国</MenuItem>
            <MenuItem value={"kyushu"}>九州</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: "20px", display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={onClick}>
          Start
        </Button>
      </Box>
    </div>
  );
}

// 普通にdomのルーティングうざすぎる
// グロバステート使うために、まず全体をMyContext.Providerで囲む
// それと同じファイルで、contextを作る
// それによって全ファイルでグローバルステートを使えるようになる
// それなのに、domのせいで、indexファイルでツリーの根っこを作ることを強いられる
// 結果として、グロバステート更新のための関数をindexで定義しないといけない

// そもそもcontextが使いづらすぎ。
