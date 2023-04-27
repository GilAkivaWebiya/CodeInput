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

## API 


| Prop  | Type | Required | Default | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| length  | Content Cell  | Yes | - | The length of the OTP. Users will be allowed to input exactly this number of characters. |
| height  | number  | Yes | - | The height of the input field in pixels. |
| width  | number  | Yes | - | The width of the input field in pixels. |
| isError  | boolean  | No | false | Indicates whether an error state should be displayed for the input field. |
| onChange  | (newValue: string) => void  | Yes | - | A callback function that will be invoked whenever the OTP value changes. |
| focus  | boolean  | No | false | Determines whether the input field should receive focus when the component is rendered. | 
| inputMode  | InputMode | No | 'text' | Specifies the type of input mode for the field. Available options are: text/numeric. |

## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License
This package is licensed under the MIT License.
