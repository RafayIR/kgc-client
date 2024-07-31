import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

export default function Denied() {
    let navigate = useNavigate();


    // useEffect(() => {
    //     
    // }, [])


    return (
        <>
            <h1 className="my-2 text-black font-bold text-2xl">
                Looks like you've found the
                doorway to the great nothing
            </h1>

            <div>
                <Button variant='outlined' onClick={() => { navigate(`/`, { replace: true }); }}>
                    Home
                </Button>
            </div>
        </>
    )


}