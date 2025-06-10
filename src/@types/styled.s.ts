import 'styled-components';
import { defaultTheme as MyDefaultTheme } from '../styles/theme/default';

type ThemeType = typeof MyDefaultTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}