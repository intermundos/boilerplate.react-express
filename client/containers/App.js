import '../static/styles/styles.scss'
import './App.scss'
import React from 'react'
import Chip from 'react-md/lib/Chips'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons/Button'
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'

const App = () => {
  return (
    <div className="app">

      <Button flat label="Hello, World!" />

      <TimePicker
        id="appointment"
        placeholder="Select an appointment time"
        className="md-cell md-cell--bottom"
      />
      <DatePicker
        id="appointment"
        label="Select an appointment date"
        className="md-cell"
      />
    </div>
  )
}

export default App