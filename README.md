# Base Components
Studio Otto base components for Nuxt.js

## Install

Create `.npmrc` file in project directory
```
@studio-otto:registry=https://npm.pkg.github.com
```

Install package
```bash
yarn add @studio-otto/shop-base-components
```

## Publishing

- `npm version patch`
- `yarn build`
- `npm publish`

## Components

### Animated Value
```
import { AnimatedValue } from '@studio-otto/shop-base-components'

<animated-value :value="value" />
```

### Announcement Bar

description goes here

```
import { AnnouncementBar } from '@studio-otto/shop-base-components'

  <announcement-bar
      :enabled="true"
      backgroundColor="#220e89"
      :slides="[{ url: `https://google.com`, text: 'Hello world' }, { url: `https://github.com`, text: 'Lorem ipsum dolor sit amet' }]"
      textColor="#FFF"
    />
```
