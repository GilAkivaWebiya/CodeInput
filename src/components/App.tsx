import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'

export type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
interface CodeInputProps {
  length: number
  height: number
  width: number
  isError?: boolean
  onChange: (newValue: string) => void
  focus?: boolean
  inputMode?: InputMode
  type?: 'text' | 'number'
}
enum KEY_CODE {
  SHIFT = 'Shift',
  META = 'Meta',
  CONTROL = 'Control',
  ALT = 'Alt',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowUp',
  CAPS_LOCK = 'CapsLock',
  SPACE = ' ',
  ENTER = 'Enter',
}
enum ACTIONS {
  ADD = 'add',
  DELETE = 'delete',
}

const BACK_SPACE = 8
const DELETE = 46

const CodeInput: React.FC<CodeInputProps> = ({
  length,
  width,
  height,
  isError = false,
  onChange,
  focus = false,
  inputMode = 'text',
  type = 'text',
}) => {
  const [value, setValue] = useState<string[]>([])
  const [currentValue, setCurrentValue] = useState<string | null>(null)
  const [isPaste, setIsPaste] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const refs: React.RefObject<HTMLInputElement>[] = useMemo(
    () => new Array(length).fill('x').map(() => React.createRef()),
    [length],
  )

  const handleFocus = (_: React.RefObject<HTMLInputElement>, index: number) => () => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const stateCallback = {
    delete: (index: number) => {
      if (value.length - 1 === index) {
        if (index === 0) setValue([])
        setActiveIndex(index)
      } else if (index - 1 >= 0) {
        const element = refs[index].current

        if (element?.value.length) {
          setActiveIndex(index)
        } else {
          setActiveIndex(index - 1)
        }
      }
    },
    add: (index: number, targetValue: string) => {
      if (isPaste && targetValue === 'v') {
        setIsPaste(false)
        return
      }
      const clonedValue = [...value]
      const { ALT, SHIFT, META, CONTROL, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CAPS_LOCK, SPACE, ENTER } =
        KEY_CODE
      const shouldIgnoreInput = [
        ALT,
        SHIFT,
        META,
        CONTROL,
        ARROW_LEFT,
        ARROW_RIGHT,
        ARROW_UP,
        ARROW_DOWN,
        CAPS_LOCK,
        SPACE,
        ENTER,
      ].includes(targetValue as KEY_CODE)
      if (shouldIgnoreInput) return
      if (targetValue) clonedValue[index] = targetValue
      setCurrentValue(targetValue)
      setValue(clonedValue)
    },
  }

  const handleInput = (index: number) => (e: React.KeyboardEvent) => {
    const state = [DELETE, BACK_SPACE].includes(+e.keyCode) ? ACTIONS.DELETE : ACTIONS.ADD
    const element = refs[activeIndex].current
    if (!element) return
    const elementLength = element.value?.length
    const isAddAndEmpty = state === ACTIONS.ADD && elementLength < 1
    const isDeleteAndHaveValue = state === ACTIONS.DELETE && index === refs.length - 1 && elementLength

    if (isAddAndEmpty || isDeleteAndHaveValue) return
    stateCallback[state](index, e.key)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let clonedValue = [...value]
    let numberValue
    if (type === 'number') {
      const input = event.target.value
      numberValue = input.replace(/\D/g, '') + ''
    }
    const targetValue = numberValue ?? event.target.value
    const userAgentString = navigator.userAgent.toLocaleLowerCase()

    const isSafari = userAgentString.indexOf('safari') > -1
    if (targetValue === KEY_CODE.SPACE) return
    if (isSafari && targetValue.length > 1 && targetValue.length <= 2) {
      const currentIndex = value.length
      const isIndexLessThenLength = currentIndex >= length
      const isValueFull = value.length === length
      if (isIndexLessThenLength || isValueFull) return
      const code = targetValue.split('')
      if (currentIndex === 0) {
        clonedValue = [...code]
      } else {
        clonedValue[currentIndex] = code[1]
        setActiveIndex(currentIndex)
      }
    } else if (targetValue.length > 1) {
      clonedValue = targetValue.split('')
      setActiveIndex(length - 1)
    } else if (targetValue !== '') {
      clonedValue[index] = targetValue
      setCurrentValue(targetValue)
    } else if (index === value.length - 1) {
      clonedValue.pop()

      if (activeIndex - 1 < 0) setActiveIndex((prevActiveIndex) => prevActiveIndex)
      else setActiveIndex((prevActiveIndex) => prevActiveIndex - 1)
    } else {
      clonedValue[index] = targetValue
      setCurrentValue(targetValue)

      if (activeIndex - 1 < 0) setActiveIndex((prevActiveIndex) => prevActiveIndex)
      else setActiveIndex((prevActiveIndex) => prevActiveIndex - 1)
    }

    setValue(clonedValue)
  }

  useEffect(() => {
    const element = refs[activeIndex].current
    if (!element) return
    element.setSelectionRange(0, element.value.length)
    element.focus()
  }, [activeIndex, refs])

  useEffect(() => {
    if (currentValue) {
      if (activeIndex + 1 < length) {
        setActiveIndex(activeIndex + 1)
      }
      setCurrentValue(null)
    }
  }, [activeIndex, currentValue, length, onChange, refs, value])

  useEffect(() => {
    const stringValue = value.join('')
    onChange(stringValue)
  }, [value, onChange])

  useEffect(() => {
    const element = refs[0].current
    if (!element) return
    element.focus()
  }, [refs])

  return (
    <>
      <Box component='form' sx={{ display: 'flex', marginInline: 'auto', gap: '6px' }}>
        {refs.map((ref, index) => (
          <Box
            autoFocus={index === 0 && focus}
            component='input'
            autoCapitalize='off'
            autoComplete={index === 0 ? 'one-time-code' : 'one-time-code'}
            sx={{
              width,
              height,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isError ? '#F10303' : '#000000',
              textAlign: 'center',
              fontFamily: 'Montserrat',
              fontSize: '55px',
              fontWeight: 100,
              boxShadow: '0px 0px 13px rgba(0, 0, 0, 0.13)',
              borderRadius: '0',
              padding: 0,
            }}
            maxLength={index === 0 ? length : 1}
            value={value[index] || ''}
            key={index}
            inputMode={inputMode}
            type='text'
            ref={ref}
            onFocus={handleFocus(ref, index)}
            onClick={handleFocus(ref, index)}
            onKeyDown={handleInput(index)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event, index)
            }}
          />
        ))}
      </Box>
    </>
  )
}
export default CodeInput
