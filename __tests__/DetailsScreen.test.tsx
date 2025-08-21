import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import DetailsScreen from '../app/details';

// Mock router and params
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
}));

describe('DetailsScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the movie details correctly', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'bbb-hls' });
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

        const { getByText } = render(<DetailsScreen />);

        expect(getByText('Big Buck Bunny (HLS)')).toBeTruthy();
        expect(getByText('Short animated film used as a demo stream.')).toBeTruthy();
        expect(getByText('Play')).toBeTruthy();

        // Simulate button press
        fireEvent.press(getByText('Play'));
        expect(mockPush).toHaveBeenCalledWith({ pathname: '/player', params: { id: 'bbb-hls' } });
    });

    it('shows fallback error if movie not found', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'invalid' });
        const { getByText } = render(<DetailsScreen />);

        expect(getByText('Movie not found')).toBeTruthy();
    });
});
