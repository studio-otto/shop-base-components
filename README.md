# shop-base-components
Base components for Shopify Vue site

## Install

Create `.npmrc` file in project directory
```
@studio-otto:registry=https://npm.pkg.github.com
```

Install package
```bash
yarn add @studio-otto/shop-base-components
```

## Components

### Announcement Bar

description goes here

```
  <announcement-bar
      :enabled="true"
      backgroundColor="#220e89"
      :slides="[{ url: `https://google.com`, text: 'Hello world' }, { url: `https://github.com`, text: 'Lorem ipsum dolor sit amet' }]"
      textColor="#FFF"
    />
```
