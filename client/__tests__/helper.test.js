const { defaultValues, exportData } = require('../helper')

const fakeTable = { rows: [{ cells: [1, 2, 3] }] }

describe('defaultValues', () => {
  test('regionId === 1', () => {
    const fakeIds = { regionId: 1 }
    defaultValues(fakeIds)
    expect(fakeIds.sectionId).toBe(1)
  })

  test('regionId === 2', () => {
    const fakeIds = { regionId: 2 }
    defaultValues(fakeIds)
    expect(fakeIds.sectionId).toBe(15)
  })
})

describe('exportData', () => {
  test('function has been called', () => {
    const fakeGetById = jest.spyOn(document, 'getElementById')
    fakeGetById.mockImplementation(() => fakeTable)
    function makeAnchor(target) {
      return {
        target,
        setAttribute: jest.fn((key, value) => (target[key] = value)),
        click: jest.fn(),
      }
    }
    const anchor = makeAnchor({ href: '#', download: '' })
    const fakeCreateElement = jest.spyOn(document, 'createElement')
    fakeCreateElement.mockReturnValue(anchor)
    const setAttributeSpy = jest.spyOn(anchor, 'setAttribute')
    const clickSpy = jest.spyOn(anchor, 'click')
    const appendChildSpy = jest.spyOn(document.body, 'appendChild')
    appendChildSpy.mockImplementation(() => jest.fn())
    exportData()
    expect(setAttributeSpy).toHaveBeenCalledTimes(2)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
})
