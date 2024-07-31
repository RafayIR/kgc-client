import { Button, Checkbox, FormControlLabel, TextField, MenuItem, Input, Box } from '@mui/material';

export const fieldComponents = {
    code: { component: TextField, style: { width: '24%', marginRight: '8px' }, errorKey: 'code' },
    name: { component: TextField, style: { width: '37%', marginRight: '8px' }, errorKey: 'name' },
    email: { component: TextField, style: { width: '37%' }, errorKey: 'email' },
    address_1: { component: TextField, style: { width: '49.25%', paddingRight: '6px' }, errorKey: 'address_1' },
    address_2: { component: TextField, style: { width: '50%' } },
    city: { component: TextField, style: { width: '32.5%', marginRight: '10px' }, errorKey: 'city' },
    stateProvince: { component: TextField, style: { width: '32.5%', marginRight: '10px' }, errorKey: 'stateProvince' },
    zipPostal: { component: TextField, style: { width: '32.5%' }, errorKey: 'zipPostal' },
    country: { component: TextField, style: { width: '49.5%', marginRight: '10px' }, errorKey: 'country' },
    region: { component: TextField, style: { width: '49%' }, errorKey: 'region' },
    phone: { component: TextField, style: { width: '49.5%', marginRight: '10px' }, errorKey: 'phone' },
    fax: { component: TextField, style: { width: '49%' }, errorKey: 'fax' },
    ntn: { component: TextField, style: { width: '49%' }, errorKey: 'ntn' },
    inputText: { component: TextField, style: { width: '100%' } },
    list: { component: TextField, style: { width: '50%' }, isSelect: true },
    billing_list: { component: TextField, style: { width: '49.5%' }, isSelect: true, useVendorInfo: true },
    checkbox: { component: FormControlLabel, isCheckbox: true, style: { width: '49.5%' }, }
};