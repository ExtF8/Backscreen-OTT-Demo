module.exports = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@expo/vector-icons)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['@testing-library/react-native'],
    // setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
