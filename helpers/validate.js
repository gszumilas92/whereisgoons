import { WOODS, SHORELINE, CUSTOMS, LIGHTHOUSE } from '../constants'

export const parsedLocation = (location) => {
    const str = ''
    const theLocation = str + location
    return theLocation.toUpperCase()
}

export const isLocationValid = (parsedLocation) => {
    const possibleLocations = [WOODS, SHORELINE, CUSTOMS, LIGHTHOUSE]
    return !possibleLocations.includes(parsedLocation)
}
