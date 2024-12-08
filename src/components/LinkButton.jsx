import React from "react";
import PropTypes from 'prop-types'; 
import { Box } from "@mui/material";

const LinkButton = ( { onClick, children, color, onlyHoverUnderline, sx, disabled } ) => {
  return (
    <Box
      onClick={(e) => !disabled && onClick(e)} 
      sx={{
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "text.disabled" : (color || 'tertiary.main'),
        textDecoration: onlyHoverUnderline ? 'none' : 'underline',
        "&:hover": {
          color: disabled ? "text.disabled" : '#0a58ca',
          textDecoration: 'underline'
        },
        ...(sx || {})
      }}
    >
      {children}
    </Box>
  );
};

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  color: PropTypes.string
}

export default LinkButton;