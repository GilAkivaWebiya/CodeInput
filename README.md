# OTP Inputs with SMS

[![npm version](https://badge.fury.io/js/otp-react-code-input.svg)](https://badge.fury.io/js/otp-react-code-input)

This npm package provides a disruptive solution for creating OTP code inputs with SMS functionality.

## Installation

### Install the package using npm and yarn:

```bash
npm install otp-react-code-input
```

or

```bash
yarn add otp-react-code-input
```
## 
```ruby
enum InputMode {
  NONE = 'none',
  TEXT = 'text',
  TEL = 'tel',
  URL = 'url',
  EMAIL = 'email',
  NUMERIC = 'numeric',
  DECIMAL = 'decimal',
  SEARCH = 'search',
}
```
## Api


| Name  | type | Required | default | 
| ------------- | ------------- | ------------- | ------------- |
| length  | Content Cell  | true | - | 
| height  | number  | true | - |
| width  | number  | true | - |
| isError  | boolean  | false | false |
| onChange  | (newValue: string) => void  | true | - |
| focus  | boolean  | false | false |
| inputMode  | inputMode | false | InputMode.TEXT |

## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License
This package is licensed under the MIT License.
