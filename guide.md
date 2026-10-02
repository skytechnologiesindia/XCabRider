# Development & Architecture Guide: Styling, Colors, Exports & Imports

> **MANDATORY REFERENCE FOR ALL NEW SCREENS & COMPONENTS**  
> Before creating, modifying, or running any new screen or component in this codebase, refer to and strictly follow the patterns, rules, and blueprints detailed in this guide.

---

## 1. Executive Architecture Overview

This codebase uses a **Utility-First Design System** built directly on native React Native primitives without relying on third-party utility engines (like Tailwind or styled-components).

```
src/
├── assets/
│   ├── colors/
│   │   └── index.js         # Single source of truth for color hex codes
│   ├── styles/
│   │   └── index.js         # Atomic utility StyleSheet (spacing, typography, layout)
│   ├── icons/
│   │   └── index.js         # Centralized icon require(...) mappings
│   └── images/
│       └── index.js         # Centralized image require(...) mappings
├── component/
│   ├── shared/              # Reusable generic UI (Button, Header, Card, Input)
│   │   ├── Button.js
│   │   ├── TitleHeader.js
│   │   └── index.js         # Barrel re-exporting all shared components
│   └── [FeatureFolder]/     # Feature-specific components
│       └── index.js         # Barrel re-exporting feature components
└── screen/
    ├── [ScreenFolder]/      # Feature screens
    │   ├── ScreenName.js
    │   └── index.js         # Barrel re-exporting screens
```

### Core Tenets:
1. **Centralized Colors**: Every color is defined in `src/assets/colors/index.js` and imported as `colors`. Never write hardcoded hex values in JSX.
2. **Centralized Atomic Utilities**: Margins, paddings, typography, and flex layouts are defined in `src/assets/styles/index.js` and imported as `styles`.
3. **Hybrid Style Array Pattern**: Local styles compose global utilities with minimal inline component objects: `style={[styles.mb16, styles.pdh12, { ...inlineDefaults }, style]}`.
4. **No Unnecessary `StyleSheet.create`**: Avoid creating 100-200 line `StyleSheet.create` objects at the bottom of every file. Use the hybrid utility pattern instead.
5. **Strict Directory Barrels (`index.js`)**: Every folder containing screens or components must have an `index.js` barrel using `export { default as Name } from './Name'`. Consumers import from the folder path, not directly from individual files.

---

## 2. Colors Architecture (`src/assets/colors/index.js`)

All colors are declared in a flat dictionary and exported as default.

### 2.1 The Rules
- **No Raw Hex in JSX**: Never write `color: '#F4C430'` or `backgroundColor: '#FFFFFF'`. Always write `color: colors.primary` or `backgroundColor: colors.white`.
- **Property Access**: Always import `colors` and access properties via `colors.propertyName`.
- **Alpha Channels / Overlays**: Define overlays with 8-digit hex tokens (`#000000CC`, `#00000040`) inside `colors`, instead of writing raw `rgba(...)` strings inline.

### 2.2 Template: `src/assets/colors/index.js`
```javascript
const colors = {
  // Brand / Theme
  primary: '#F4C430',
  primaryDark: '#D4A017',
  secondary: '#121314',

  // Neutrals & Greys
  white: '#FFFFFF',
  black: '#000000',
  darkGrey: '#121314',
  mediumGrey: '#656056',
  lightGrey: '#848077',
  grey50: '#FAF7F0',
  grey100: '#F2EFE8',
  grey200: '#ECE6D8',
  border: '#ECE6D8',
  background: '#FFFFFF',

  // Status & Feedback
  success: '#4CAF50',
  error: '#EB5757',
  warning: '#FF9800',

  // Alpha / Overlays (8-digit hex)
  overlayDark: '#000000CC',   // 80% black
  overlayMedium: '#00000073', // 45% black
  overlayLight: '#00000026',  // 15% black
};

export default colors;
```

---

## 3. Global Atomic Utility System (`src/assets/styles/index.js`)

Spacing and typography follow a predictable, atomic scale.

### 3.1 Spacing Scale (Step of 4: `4` to `48`)
- **Outer Margins**: `m4`, `m8`, `m12`, `m16`, `m20`, `m24`, `m28`, `m32`, `m36`, `m40`, `m44`, `m48`
- **Directional Margins**:
  - `mt4` to `mt48` (`marginTop`)
  - `mb4` to `mb48` (`marginBottom`)
  - `ml4` to `ml48` (`marginLeft`)
  - `mr4` to `mr48` (`marginRight`)
  - `mh4` to `mh48` (`marginHorizontal`)
  - `mv4` to `mv48` (`marginVertical`)
- **Paddings** (prefix `pd` / `p`):
  - `p4` to `p48` (`padding`)
  - `pdt4` to `pdt48` (`paddingTop`)
  - `pdb4` to `pdb48` (`paddingBottom`)
  - `pdl4` to `pdl48` (`paddingLeft`)
  - `pdr4` to `pdr48` (`paddingRight`)
  - `pdh4` to `pdh48` (`paddingHorizontal`)
  - `pdv4` to `pdv48` (`paddingVertical`)

### 3.2 Typography Scale
- **Type Sizes (`ts`)**: `ts10` through `ts25` (e.g. `ts14: { fontSize: 14 }`, `ts16: { fontSize: 16 }`).
- **Font Weights (`fw`)**: `fw400`, `fw500`, `fw600`, `fw700`, `fwBold`.
- **Headings**: `h1` through `h6` with platform typography normalization.

### 3.3 Layout & Common UI Atoms
- `flex1: { flex: 1 }`
- `fdRow: { flexDirection: 'row' }`
- `center: { justifyContent: 'center', alignItems: 'center' }`
- `alignCenter: { alignItems: 'center' }`
- `justifyBetween: { justifyContent: 'space-between' }`
- `separator: { height: 1, backgroundColor: colors.border }`
- `icon16`, `icon20`, `icon24`, `icon32`, `icon48` with `{ resizeMode: 'contain' }`

---

## 4. The "Hybrid Style Array" Composition Pattern

Instead of defining monolithic `StyleSheet.create` definitions per component, styles are composed using React Native's array syntax in a **strict 4-tier hierarchy**:

```jsx
<TouchableOpacity
  activeOpacity={0.8}
  onPress={onPress}
  style={[
    // Tier 1: Global structural utilities (margins, paddings, flex)
    styles.fdRow,
    styles.alignCenter,
    styles.pdh16,
    styles.pdv12,

    // Tier 2: Component-specific inline style object (dimensions, colors, borders)
    {
      backgroundColor: colors.primary,
      borderRadius: 14,
      height: 50,
    },

    // Tier 3: Conditional utility styles
    isDisabled ? styles.mb4 : styles.mb16,

    // Tier 4: Prop overrides from parent (DIY rule for reusable components)
    style,
  ]}
>
  <Text
    style={[
      // Tier 1: Utility typography defaults
      styles.ts16,
      styles.fw700,

      // Tier 2: Inline typography colors
      { color: colors.darkGrey, textAlign: 'center' },

      // Tier 3: Forwarded text style prop
      textStyle,
    ]}
  >
    {label}
  </Text>
</TouchableOpacity>
```

### Why Avoid Local `StyleSheet.create`?
- Only use local `StyleSheet.create` when absolutely necessary (e.g. complex native animations, PanResponders, or absolute positioning overlays).
- Avoids writing 150+ lines of duplicate boilerplate at the bottom of every component.
- Keeps styling localized, visual, and fast to refactor.

---

## 5. Component Export & Import Architecture

### 5.1 Component Exports
1. **Single Default Export Per File**: UI components and screens must be declared with arrow functions and exported as default:
   ```javascript
   const BookRideButton = ({ vehicle, onPress, style }) => {
     return ( ... );
   };
   export default BookRideButton;
   ```
2. **Memoize High-Frequency / List Items**: Wrap feed cards, list rows, and frequent rerender items in `React.memo`:
   ```javascript
   const RideCard = React.memo(({ vehicle, isSelected, onSelect }) => {
     return ( ... );
   });
   export default RideCard;
   ```
3. **Named Exports for Utilities**: Helper functions, API builders, and constant arrays use named exports:
   ```javascript
   export const DEFAULT_VEHICLES = [ ... ];
   export const formatCurrency = (amount) => `₹${amount}`;
   ```

### 5.2 Directory Barrels (`index.js`)
**Strict Rule:** Every directory containing more than one component or screen MUST have an `index.js` file that re-exports its contents:

```javascript
// src/component/Home/TripBooking/index.js
export { default as TripBooking } from './TripBooking';
export { default as LocationDetails } from './LocationDetails';
export { default as RouteMap } from './RouteMap';
export { default as RideOptions } from './RideOptions';
export { default as BookRideButton } from './BookRideButton';
export { default as TripFeatures } from './TripFeatures';
export { default as TripHeader } from './TripHeader';
```

### 5.3 Component Imports
1. **Import from Folder Barrels**: Always import from the directory path instead of reaching into specific sibling files:
   ```javascript
   // ✅ CORRECT: Destructured from directory barrel
   import { BookRideButton, LocationDetails, RideOptions } from '../../component/Home/TripBooking';
   import { Button, TitleHeader } from '../../component/shared';

   // ❌ INCORRECT: Direct individual file imports
   import BookRideButton from '../../component/Home/TripBooking/BookRideButton';
   import LocationDetails from '../../component/Home/TripBooking/LocationDetails';
   ```

2. **Standard Import Order**:
   ```javascript
   // 1. React & React Native core
   import React, { useState, useEffect, useRef } from 'react';
   import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

   // 2. Third-party packages
   import FastImage from '@d11/react-native-fast-image';

   // 3. Centralized Assets & Design Tokens
   import colors from '../../assets/colors';
   import styles from '../../assets/styles';
   import images from '../../assets/images';

   // 4. Reusable Shared Components (from barrels)
   import { Button, TitleHeader } from '../../component/shared';

   // 5. Feature Components (from barrels)
   import { LocationDetails, RideOptions } from '../../component/Home/TripBooking';

   // 6. Navigation, Contexts & Hooks
   import { useAuth } from '../../context/AuthContext';

   // 7. Utils & API
   import { formatCurrency } from '../../utils/helpers';
   ```

---

## 6. Pre-Flight Checklist (Check Before Running!)

Before testing or running any new screen or component, review this checklist:

- [ ] **Colors Centralized**: Are all colors coming from `colors.name`? (No raw hex codes in JSX like `#FFF` or `#121314`).
- [ ] **Utility Spacing Used**: Are margins and paddings using `styles.m*`, `styles.p*`, `styles.pdh*`, etc.?
- [ ] **Hybrid Style Array Ordered Correctly**:
  `[styles.utility, { inlineProperties }, conditionalStyles, forwardedStyle]`
- [ ] **Prop Forwarding Supported**: Does the component accept `style` and `textStyle` (if applicable) and place them at the end of the style array?
- [ ] **Registered in Barrel**: Is the component exported in its folder's `index.js`?
- [ ] **Barrels Used for Importing**: Are components imported from their parent folder barrel instead of direct filenames?
- [ ] **Default Export**: Is the component exported as `export default ComponentName`?
- [ ] **No Dead Code / Dummy Logs**: Are all unnecessary `console.log` statements, unused imports, and dummy fallbacks removed?

---

## 7. Ready-to-Use Blueprints & Templates

### 7.1 Reusable Component Blueprint
```javascript
// src/component/shared/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import colors from '../../assets/colors';
import styles from '../../assets/styles';

const CustomButton = ({
  label,
  onPress,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.fdRow,
        styles.alignCenter,
        styles.center,
        styles.pdh16,
        styles.pdv12,
        {
          backgroundColor: disabled ? colors.mediumGrey : colors.primary,
          borderRadius: 14,
          height: 50,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text
          style={[
            styles.ts16,
            styles.fw700,
            { color: colors.darkGrey },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
```

### 7.2 Screen Blueprint
```javascript
// src/screen/home/HomeScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';

// Assets
import colors from '../../assets/colors';
import styles from '../../assets/styles';

// Shared & Feature Components (from barrels)
import { CustomButton } from '../../component/shared';
import { TripBooking } from '../../component/Home/TripBooking';

const HomeScreen = ({ navigation }) => {
  const [isBookingVisible, setIsBookingVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.flex1, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.pdh20, styles.pdt16, styles.pdb32]}
      >
        <View style={[styles.mb16, styles.p16, { backgroundColor: colors.white, borderRadius: 16 }]}>
          <Text style={[styles.ts20, styles.fwBold, styles.mb8, { color: colors.darkGrey }]}>
            Book a Ride
          </Text>
          <Text style={[styles.ts14, { color: colors.mediumGrey }]}>
            Select your pickup and drop location to view fare estimates.
          </Text>
        </View>

        <CustomButton
          label="Choose Vehicle"
          onPress={() => setIsBookingVisible(true)}
          style={styles.mt8}
        />
      </ScrollView>

      <TripBooking
        visible={isBookingVisible}
        onClose={() => setIsBookingVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
```

---

## 8. Anti-Patterns & Traps Summary

| Anti-Pattern | Consequence | How to Fix |
| :--- | :--- | :--- |
| **Forgotten Barrel Export** | Consumers must import directly via long paths. Breaks consistency. | Always add every newly created component to its folder's `index.js`. |
| **Hardcoded Hex Colors** | Themes, dark mode, or rebranding will break or require editing dozens of files. | Always use `colors.name` from `src/assets/colors`. |
| **Monolithic `StyleSheet.create`** | Redundant styling code, slow prototyping, bloated component files. | Use atomic utilities from `src/assets/styles` + inline specifics. |
| **Missing Prop Forwarding** | Parent components cannot adjust margins or positioning of child components. | Always accept `style` (and `textStyle`) and put it last in the style array. |
| **Bypassing Barrels on Import** | Inconsistent imports, fragile relative path refactoring. | Import destructured from the directory path (e.g. `from '../../component/shared'`). |
