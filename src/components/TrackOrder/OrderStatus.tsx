import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    CheckCircle,
    LocalShipping,
    Inventory,
    Schedule,
    Cancel
} from '@mui/icons-material';
import { Order } from '../../types/order';

interface OrderStatusProps {
    order: Order;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ order }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'processing':
                return <Inventory sx={{ color: 'warning.main' }} />;
            case 'shipped':
            case 'in_transit':
                return <LocalShipping sx={{ color: 'info.main' }} />;
            case 'out_for_delivery':
                return <LocalShipping sx={{ color: 'primary.main' }} />;
            case 'delivered':
                return <CheckCircle sx={{ color: 'success.main' }} />;
            case 'cancelled':
                return <Cancel sx={{ color: 'error.main' }} />;
            default:
                return <Schedule sx={{ color: 'grey.500' }} />;
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'processing':
                return 'warning';
            case 'shipped':
            case 'in_transit':
                return 'info';
