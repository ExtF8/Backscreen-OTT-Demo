import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../app/index';
import DetailsScreen from '../app/details';
import PlayerScreen from '../app/player';

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
    }),
    useLocalSearchParams: () => ({
        id: '1',
    }),
    Link: ({ children }: { children?: React.ReactNode }) => children,
}));

jest.mock('expo-video', () => ({
    useVideoPlayer: () => ({
        play: jest.fn(),
        replace: jest.fn(),
        status: 'idle',
    }),
    VideoView: ({ children }: { children?: React.ReactNode }) => children,
}));

jest.mock('expo', () => ({
    useEvent: () => ({}),
}));

describe('Navigation Flow', () => {
    it('renders Home -> Details -> Player screens without crashing', () => {
        expect(() => render(<HomeScreen />)).not.toThrow();
        expect(() => render(<DetailsScreen />)).not.toThrow();
        expect(() => render(<PlayerScreen />)).not.toThrow();
    });
});
