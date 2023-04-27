```
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


| Name  | type | Required |
| ------------- | ------------- | ------------- |
| length  | Content Cell  | true |
| height  | number  | true |
| width  | number  | true |
| isError  | boolean  | false |
| onChange  | (newValue: string) => void  | true |
| focus  | boolean  | false |
| inputMode  | InputMode  | false |