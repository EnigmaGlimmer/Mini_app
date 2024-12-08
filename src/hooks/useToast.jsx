import React from 'react';
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const defaultMs = 6000;
const defaultType = 'error';

const useToast = () => {
    const addToast = (message, opt = { type: "error", ms: defaultMs }) => {
        const ms = 6000000; //opt?.ms || defaultMs;
        const closeButton = opt?.closeButton;
        const type = opt?.type || defaultType;
        const closeButtonNode = props => (
            <Button 
                variant="contained" 
                color="primary"
                onClick={e => { props.closeToast(); closeButton?.onClick && closeButton?.onClick(e); }}
                sx={{ whiteSpace: "nowrap", width: "fit-content", px: 1, px: 2, minWidth: 0 }}
            >
                {closeButton?.title || "-"}
            </Button>
        );

        toast(message, {
            type: type,
            autoClose: ms,
            closeButton: closeButton ? (
                closeButtonNode 
            ) : true,
            icon: false,
        })
    }

    return {
        addToast
    }
};

export default useToast;