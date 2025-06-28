import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    CircularProgress,
    Grid,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Search, LocalShipping } from '@mui/icons-material';
import { Order } from '../../types/order';
import OrderStatus from './OrderStatus';
import ShippingDetails from './ShippingDetails';
import DeliveryTimeline from './DeliveryTimeline';
import OrderSummary from './OrderSummary';

const TrackOrder: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [trackingInput, setTrackingInput] = useState('');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mock data for demonstration
    const mockOrder: Order = {
        id: '1',
        orderNumber: 'ORD-2024-001234',
        status:
