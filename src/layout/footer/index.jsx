import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function FooterCopyRight() {
    return (
        <div>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://www.kaysons-group.com" target="_blank">
                    kaysons Group
                </Link>
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    )
}

export default FooterCopyRight