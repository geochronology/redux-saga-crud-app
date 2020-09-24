import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default function NewUserForm({ onSubmit }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    onSubmit({ firstName, lastName })

    setFirstName('')
    setLastName('')
  }

  const handleFirstNameChange = e => setFirstName(e.target.value)

  const handleLastNameChange = e => setLastName(e.target.value)

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          First Name
        </Label>
        <Input required placeholder="First name" onChange={handleFirstNameChange} value={firstName} />
      </FormGroup>
      <FormGroup>
        <Label>
          Last Name
        </Label>
        <Input required placeholder="Last name" onChange={handleLastNameChange} value={lastName} />
      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">Create</Button>
      </FormGroup>
    </Form >
  )
}
