# Laravel Form Validation

[![downloads](https://badgen.net/npm/dt/laravel-form-validation)](http://npm-stats.com/~packages/laravel-form-validation)
[![npm-version](https://badgen.net/npm/v/laravel-form-validation)](https://www.npmjs.com/package/laravel-form-validation)
[![github-tag](https://badgen.net/github/tag/ankurk91/laravel-form-validation)](https://github.com/ankurk91/laravel-form-validation/)
[![license](https://badgen.net/github/license/ankurk91/laravel-form-validation)](https://yarnpkg.com/en/package/laravel-form-validation)
[![tests](https://github.com/ankurk91/laravel-form-validation/workflows/tests/badge.svg)](https://github.com/ankurk91/laravel-form-validation/actions)
[![codecov](https://codecov.io/gh/ankurk91/laravel-form-validation/branch/master/graph/badge.svg)](https://codecov.io/gh/ankurk91/laravel-form-validation)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

This package make use of AJAX to validate your forms with backend logic.

| Vue.js version | Package version | Branch          |
| :---           | :---:           | ---:           | 
| 2.x            | 1.x             | [1.x](https://github.com/ankurk91/laravel-form-validation/tree/v1.x) |
| 3.x            | 2.x             | master          |

## Installation
```bash
# yarn
yarn add laravel-form-validation

# npm
npm install laravel-form-validation 
```

## Usage
An example using Vue.js and Bootstrap v4.x
```html
<template>
    <form @submit.prevent="submit">

        <!-- Display a global message if there are any errors -->
        <div class="alert alert-danger my-3" v-show="form.$errors.any()">
            Please check the form and try again!
        </div>
        
        <div class="form-group">
            <label>Name</label>
            <input type="text" 
                class="form-control" 
                v-model="user.name" 
                :class="{ 'is-invalid': form.$errors.has('name') }"
                @keyup="form.$errors.clear('name')">
            
            <!-- Display first error for a field -->
            <div class="invalid-feedback" v-show="form.$errors.has('name')">
              {{ form.$errors.first('name') }}
            </div>
        </div>
        
        <div class="form-group">
            <label>Avatar</label>
            <div class="custom-file">
                
                <!-- Transform File object to FormData() automatically -->
                <input type="file"                                       
                    id="input-avatar" 
                    accept="image/*"
                    :class="{ 'is-invalid': form.$errors.has('avatar') }"
                    @change="user.avatar = $event.target.files[0]">
                <label class="custom-file-label" for="input-avatar">Choose image...</label>
                
                <!-- Display all errors for a field -->
                <div class="invalid-feedback" v-show="form.$errors.has('avatar')">
                  <div v-for="message in form.$errors.get('name')">{{ message }}</div>
                </div>
            </div>
        </div>
        
        <!-- Get file upload progress percentage using form.$progress -->
        <div class="progress" v-show="form.$pending">
            <div class="progress-bar" :style="{ width: form.$progress + '%' }">{{ form.$progress }}%</div>
        </div>    
        
        <!-- Prevent re-submit using form.$pending -->
        <button type="submit" :disabled="form.$pending">Submit</button>
    </form>
</template>

<script>
import Form from 'laravel-form-validation';

export default {
    data() {
        return {
            user: {name: 'Joy', avatar: null},
            form: new Form()
        }
    },

    methods: {
        submit() {
            this.form.post('/profile', this.user)
                .then(response => {
                    // This is the data returned from your server
                    console.log(response);
                })
                .catch(error => {
                    // Handle errors
                });
        }
    }
}
</script>
```

## API
You can take a look at individual classes and their methods
* [Form](./src/Form.ts)
* [Errors](./src/Errors.ts)

## Vue.js helpers
This package comes with two helpers to work with [bootstrap css](https://getbootstrap.com/docs/4.5/components/forms/#how-it-works)
### Register in one shot
You can register the component and directive
```js
import {VueFormPlugin} from "laravel-form-validation";
app.use(VueFormPlugin)
```
### IsInvalid directive
Setup global directive manually
```js
import { IsInvalidDirective } from 'laravel-form-validation';
app.directive('invalid', IsInvalidDirective);
```
Use on form inputs, you must specify `name` attribute on your input fields
```html
<input type="email" v-invalid="form.$errors" name="email">
```

### FieldError component
Setup global component manually
```js
import { FieldErrorComponent } from 'laravel-form-validation';
app.component('field-error', FieldErrorComponent);
```
Use in forms to show validation message for specific field
```html
<field-error :bag="form.$errors" field="email"></field-error>
```

## Customize `axios` instance (optional)
The package uses [axios](https://github.com/axios/axios) for making AJAX requests, 
you can pass your own axios instance and Form class will start using it.
```js
// app.js
import axios from 'axios';
import Form from 'laravel-form-validation';
// Make your modifications
axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Form.$defaults.axios = axios;
```

### Acknowledgements
This package is highly inspired by various other similar implementations:
* [form-backend-validation](https://github.com/spatie/form-backend-validation)
* [form-object](https://github.com/sahibalejandro/form-object)
* [vform](https://github.com/cretueusebiu/vform)

## Testing
* This package is using [Jest](https://github.com/facebook/jest) for testing.
* Tests can be found in `__test__` folder.
* Execute tests with this command `yarn test`

## License
[MIT](LICENSE.txt) License
