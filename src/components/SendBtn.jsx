import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function IconLabelButtons({...props}) {
  return (
      <Button {...props} variant="contained" endIcon={<SendIcon />} >
      </Button>
  );
}
