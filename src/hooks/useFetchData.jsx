import React, { useEffect } from 'react'

function useFetchData(data, fetchAction, setData, dispatch) {
    useEffect(() => {
        if (data && data.length > 0) {
            setData(data);
        } else {
            dispatch(fetchAction());
        }
    }, [data, fetchAction, setData, dispatch]);

}

export default useFetchData