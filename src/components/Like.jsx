import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function IconCheckboxes({isLiked}) {
  const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
  return (
    <div>
      <Tooltip title={`Like`}>
      <Checkbox
      checked={isLiked}
        {...label}
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />} 
        sx={{
          color: `${isDarkMode?"grey":"black"}`,
          transform:"scale(1.3)",
          "&.Mui-checked": {
            color: "red", 
          },
        }}
      />
      </Tooltip>
    </div>
  );
}
