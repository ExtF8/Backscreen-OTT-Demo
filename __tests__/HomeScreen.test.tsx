import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../app/index';

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
    useLocalSearchParams: () => ({}),
    Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HomeScreen', () => {
    it('renders movie titles from catalog', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Big Buck Bunny (HLS)')).toBeTruthy();
        expect(getByText('Sintel (MP4)')).toBeTruthy();
    });
});
