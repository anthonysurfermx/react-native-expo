import { registerRootComponent } from 'expo';
import { Buffer } from 'buffer';
import 'react-native-get-random-values';

import { TextDecoder, TextEncoder } from 'text-encoding';
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;



global.Buffer = Buffer;

/*
polyfill()
*/

import App from './App';

// Register the root component
registerRootComponent(App);
