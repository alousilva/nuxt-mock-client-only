# nuxt-mock-client-only

> Example of a client-only component in Nuxt

Original article written [here](https://dev.to/alousilva/how-to-mock-nuxt-client-only-component-with-jest-47da).

## Problem

Let's say you are working on a Nuxt project with SSR and there's a component that you want/need to render **only** on the client side. This situation may arise because you need to integrate, for instance, a 3rd party application.

Fortunately, Nuxt has a neat component that does exactly that: `<client-only>`

As seen on the [official Nuxt docs](https://nuxtjs.org/api/components-client-only/):
> This component is used to purposely render a component only on client-side.

For this particular example, let's imagine you have the index page with just two components: **Component A** and **Component B** (the one you need to be rendered only on the client side).

### Index page

```html
<template>
  <div class="container">
    <div>
      <h1 class="title">
        nuxt-mock-client-only
      </h1>
      <div class="components">
        <ComponentA />
        <client-only>
          <ComponentB />
        </client-only>
      </div>
    </div>
  </div>
</template>
```

### Component A

```html
<template>
  <div class="component-a">
    <p>Hello from component A!</p>
  </div>
</template>
```

### Component B

```html
<template>
  <div class="component-b">
    <p>Hello from component B!</p>
  </div>
</template>
```

You then run the `generate` command in order to generate the static pages and you get the following html inside the body tag:

```html
<div data-server-rendered="true" id="__nuxt">
  <!---->
  <div id="__layout">
    <div>
      <div class="container">
        <div>
          <h1 class="title">
            nuxt-mock-client-only
          </h1>
          <div class="components">
            <div class="component-a" data-v-363149cc>
              <p data-v-363149cc>Hello from component A!</p>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Ok, cool, the `client-only` strategy worked flawlessly. We are only seeing the component A in the html!

But what happens when you run the unit tests? Let's try one simple test:

```js
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages';

describe('Index', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.element).toMatchSnapshot();
  });
});
```

Well... :sweat::sweat:

```
console.error node_modules/vue/dist/vue.common.dev.js:630
    [Vue warn]: Unknown custom element: <client-only> - did you register the component correctly? For recursive components, make sure to provide
 the "name" option.
    
    found in
    
    ---> <Anonymous>
           <Root>
```

Oops.. jest does not recognize that `client-only` component.

## vue-test-utils stubs to the rescue

Yeah, as the header suggests, we will use the stubs prop in order to mock this `client-only` component.

More about vue-test-utils config stubs [here](https://vue-test-utils.vuejs.org/api/config.html#stubs).

Having in mind that another client only rendering situation may be needed somewhere else in the project, you could create a mocked component to be used as part of your jest configuration.

### Steps to do it

1) Create a setup config file, for example, setup.jest.js, under `utils/tests/setup-jest.js`

2) Add the following content to the newly created setup file:

```js
import { config } from '@vue/test-utils';

// Mock Nuxt client-side component
config.stubs['client-only'] = '<div><slot /></div>';
```

3) Go to your `jest.config.js` file and add the `setupFiles` prop like so:

```js
setupFiles: ['<rootDir>/utils/tests/setup-jest.js'],
```

**Note**: You can check more about the `setupFiles` [here in the official docs](https://jestjs.io/docs/en/next/configuration#setupfiles-array).

#### Important information about step 2

For simplicity sake, I just set directly the mocked html (as a string) to the `config.stubs['client-only']`, but you should use the following approach (I'm saying you should simply because stubs that use strings are deprecated and will be removed from the next vue-test-utils major release):

1) Create a mock vue file - myAwesomeClientOnlyMock.vue

```vue
<template>
  <div>
    <slot />
  </div>
</template>
```

2) Import it inside the setup-jest.js file and use it like this:

```js
import { config } from '@vue/test-utils';
import myAwesomeClientOnlyMock from 'wherever you saved your mocked vue file';

// Mock Nuxt client-side component
config.stubs['client-only'] = myAwesomeClientOnlyMock;
```

Run the test again and the `client-only` component will be mocked with no issues at all :heavy_check_mark:

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
