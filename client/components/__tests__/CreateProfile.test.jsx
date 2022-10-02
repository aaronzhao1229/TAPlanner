import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
const { screen, render } = require('@testing-library/react')
import { uploadProfile } from '../../apis/user.api'

require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'
import CreateProfile from '../CreatProfile'
import Nav from '../Nav'
jest.mock('../Nav')
jest.mock('react-redux')
jest.mock('react-router-dom')
jest.mock('../../apis/user.api')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

Nav.mockReturnValue(<></>)

const fakeUser = { email: '1234@gmail.com', auth0Id: '1234' }
const fakeUserWithFirstname = {
  email: '1234@gmail.com',
  auth0Id: '1234',
  firstName: 'Will',
}
const fakeDispatch = jest.fn()
const fakeNavigate = jest.fn()

const file = new File(['random'], 'values.png', {
  type: 'image/png',
})
global.URL.createObjectURL = () => 'random'

describe('<CreateProfile />', () => {
  it('click upload image renders image on page', async () => {
    useSelector.mockReturnValue(fakeUser)
    render(<CreateProfile />)
    const imageInput = screen.getByTestId('uploadImage')
    await userEvent.upload(imageInput, file)
    expect(screen.queryByTestId('testImage')).toBeTruthy()
  })

  it('click remove image button', async () => {
    useSelector.mockReturnValue(fakeUser)

    render(<CreateProfile />)
    const imageInput = screen.getByTestId('uploadImage')
    await userEvent.upload(imageInput, file)
    const button = screen.getByRole('button', { name: /remove/i })
    await userEvent.click(button)
    expect(screen.queryByTestId('testImage')).toBeFalsy()
  })

  it('click submit button', async () => {
    useSelector.mockReturnValue(fakeUser)
    useDispatch.mockReturnValue(fakeDispatch)
    uploadProfile.mockImplementation(() => Promise.resolve('done'))
    render(<CreateProfile />)
    const imageInput = screen.getByTestId('uploadImage')
    await userEvent.upload(imageInput, file)
    await userEvent.type(screen.getByLabelText(/first/i), 'William')
    await userEvent.type(screen.getByLabelText(/last/i), 'Wilson')
    await userEvent.type(screen.getByLabelText(/location/i), 'Chch')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(fakeDispatch).toHaveBeenCalledWith({
      payload: {
        auth0Id: '1234',
        firstName: 'William',
        lastName: 'Wilson',
        location: 'Chch',
      },
      type: 'UPDATE_LOGGED_IN_USER',
    })
  })

  it('console.error', async () => {
    useSelector.mockReturnValue(fakeUser)
    useDispatch.mockReturnValue(fakeDispatch)
    uploadProfile.mockImplementation(() =>
      Promise.reject(new Error('something wrong'))
    )
    console.error.mockImplementation(() => {})
    render(<CreateProfile />)
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(console.error).toHaveBeenCalledWith('something wrong')
  })

  it('navigate has been called if user includes firstName property', async () => {
    useSelector.mockReturnValue(fakeUserWithFirstname)
    useDispatch.mockReturnValue(fakeDispatch)
    useNavigate.mockReturnValue(fakeNavigate)
    render(<CreateProfile />)
    expect(fakeNavigate).toHaveBeenCalled()
  })
})
