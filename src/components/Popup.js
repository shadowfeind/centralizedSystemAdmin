import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "10px",
    height: "20px",
  },
  paper: { minWidth: "600px" },
});

const Popup = ({ title, children, openPopup, setOpenPopup }) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth maxWidth="lg" open={openPopup} transitionDuration={800}>
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h5 style={{ flexGrow: 1, margin: "10px 0" }}>{title}</h5>{" "}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenPopup(false)}
            className={classes.button}
          >
            <ClearIcon fontSize="small" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
